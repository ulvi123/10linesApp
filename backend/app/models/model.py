from sqlalchemy import Column, String, Float, Boolean, Date, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.database.database import Base
from enum import Enum as PyEnum
from passlib.context import CryptContext
from pydantic import BaseModel


#Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class UserCreate(BaseModel):
    email: str
    password: str
    
    
class UserResponse(BaseModel):
    email: str
    
    class Config:
        orm_mode = True



class TaskStatus(str, PyEnum):
    IDLE = "idle"
    IN_OPERATION = "IN_OPERATION"
    COMPLETED = "completed"
    FAILED = "failed"

class RobotStatus(str, PyEnum):
    PENDING = "pending"
    COMPLETED = "completed"
    IN_PROGRESS = "in_progress"
    CANCELLED = "cancelled"
    MAINTENANCE = "maintenance"
    ERROR = "error"

class RobotCommand(str, PyEnum):
    START = "start"
    STOP = "stop"
    PARK = "park"
    CHARGE = "charge"
    MOVE = "move"
    CALIBRATE = "calibrate"
    
    @classmethod
    def _missing_(cls, value):
        if isinstance(cls, str):
            value = value.lower()
            for item in cls:
                if item.value == value:
                    return item
        return None

class Robot(Base):
    __tablename__ = "robots"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    robot_id = Column(String, unique=True, index=True)
    area = Column(String)
    line_specifications = Column(JSON)
    start_time = Column(Date)
    estimated_completion = Column(Date)
    status = Column(Enum(RobotStatus))
    error_details = Column(String)
    battery_level = Column(Float)
    paint_level = Column(Float)
    current_coordinates = Column(JSON)

class Task(Base):
    __tablename__ = "tasks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)
    status = Column(Enum(TaskStatus))
    location = Column(String)
    area_dimensions = Column(JSON)
    quality_requirements = Column(JSON)

class ParkingSpot(Base):
    __tablename__ = "parking_spots"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    position = Column(JSON)
    is_booked = Column(Boolean, default=False)
    robot_id = Column(String)
    dimensions = Column(JSON)
    
    
