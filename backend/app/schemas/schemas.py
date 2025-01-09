from pydantic import BaseModel, Field, field_validator,ValidationInfo
from typing import Optional, Dict, Any
from datetime import date
from enum import Enum
from uuid import UUID

class TaskStatus(str, Enum):
    IDLE = "idle"
    IN_OPERATION = "IN_OPERATION"
    COMPLETED = "completed"
    FAILED = "failed"

class RobotStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    IN_PROGRESS = "in_progress"
    CANCELLED = "cancelled"
    MAINTENANCE = "maintenance"
    ERROR = "error"

class RobotCommand(str, Enum):
    START = "start"
    STOP = "stop"
    PARK = "park"
    CHARGE = "charge"
    MOVE = "move"
    CALIBRATE = "calibrate"

class StripingSpecifications(BaseModel):
    line_width_mm: float = Field(example=100, description="Width of the line in millimeters")
    paint_color: str = Field(example="white", description="Color of the paint")
    pattern_type: str = Field(example="standard", description="Type of line pattern")
    spacing_mm: float = Field(example=200, description="Spacing between lines in millimeters")
    angle_degrees: float = Field(example=90, description="Angle of the line in degrees")

class RobotBase(BaseModel):
    robot_id: str = Field(..., pattern="^RB\\d{3}$", min_length=5, max_length=5)
    area: str
    line_specifications: StripingSpecifications
    status: RobotStatus
    battery_level: float = Field(..., ge=0, le=100)
    paint_level: float = Field(..., ge=0, le=100)
    current_coordinates: Dict[str, float] = Field(default_factory=lambda: {"x": 0, "y": 0})

class RobotCreate(RobotBase):
    pass

class RobotUpdate(RobotBase):
    start_time: Optional[date] = None
    estimated_completion: Optional[date] = None
    error_details: Optional[str] = None

    @field_validator("estimated_completion")
    def completion_after_start(cls, v, values):
        if 'start_time' in values and v and values['start_time']:
            if v < values['start_time']:
                raise ValueError('Completion time must be after start time')
        return v

class RobotResponse(RobotBase):
    id: UUID
    start_time: Optional[date] = None
    estimated_completion: Optional[date] = None
    error_details: Optional[str] = None

    class Config:
        from_attributes = True

class TaskBase(BaseModel):
    name: str
    status: TaskStatus
    location: str
    area_dimensions: Dict[str, float] = Field(..., description="Dimensions of the area to be striped")
    quality_requirements: Dict[str, float] = Field(
        default_factory=lambda: {
            "line_straightness": 95.0,
            "paint_thickness": 90.0
        }
    )

class TaskCreate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: UUID

    class Config:
        from_attributes = True

class CommandRequest(BaseModel):
    command: RobotCommand
    parameters: Dict[str, Any] = {}
    priority: int = Field(default=1, ge=1, le=9)

    @field_validator("parameters", mode="before")
    def validate_command_parameters(cls, v, info: ValidationInfo):
        command = info.data.get("command")
        if not v:
            raise ValueError(f"{command} command requires parameters.")
        
        if command == RobotCommand.MOVE:
            if "destination" not in v:
                raise ValueError("Move command requires a 'destination' parameter")
        elif command == RobotCommand.PARK:
            if "parking_spot" not in v:
                raise ValueError("Park command requires a 'parking_spot' parameter")
        elif command == RobotCommand.CHARGE:
            if "charge_station" not in v:
                raise ValueError("Charge command requires a 'charge_station' parameter")
        elif command == RobotCommand.CALIBRATE:
            if "calibration_station" not in v:
                raise ValueError("Calibrate command requires a 'calibration_station' parameter")
        elif command == RobotCommand.START:
            if "task" not in v:
                raise ValueError("Start command requires a 'task' parameter")
        elif command == RobotCommand.STOP:
            if "task" not in v:
                raise ValueError("Stop command requires a 'task' parameter")
        return v


class ParkingSpotBase(BaseModel):
    position: Dict[str, float] = Field(..., example={"x": 0, "y": 0})
    dimensions: Dict[str, float] = Field(..., example={"length": 2, "width": 2})

    @field_validator("position")
    def validate_position(cls, v):
        if "x" not in v or "y" not in v:
            raise ValueError("Position must have x and y coordinates")
        return v

class ParkingSpotCreate(ParkingSpotBase):
    pass

class ParkingSpotUpdate(ParkingSpotBase):
    is_booked: Optional[bool] = None
    robot_id: Optional[str] = None

class ParkingSpotResponse(ParkingSpotBase):
    id: UUID
    is_booked: bool
    robot_id: Optional[str] = None

    class Config:
        from_attributes = True

class MovementCommand(BaseModel):
    destination: Dict[str, float] = Field(..., example={"x": 10, "y": 20})
    speed: float = Field(default=1.0, ge=0.0, le=1.0)
    route_kind: str = Field(
        default="optimal",
        pattern="^(optimal|safe|energy_saving)$",
    )
    
    
class UserCreate(BaseModel):
    email: str
    password: str
    
class UserCreate(BaseModel):
    email: str
    password: str
    
    
class UserResponse(BaseModel):
    email: str
    access_token:str
    
    class Config:
        orm_mode = True
        
        
class UserRegisterResponse(BaseModel):
    email:str
    
    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str