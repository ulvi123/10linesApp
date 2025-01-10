from datetime import datetime
from fastapi import HTTPException,status
from app.models.model import ( RobotStatus,
    RobotCommand
)
from app.schemas.schemas import CommandRequest
from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


#Helper functions
    
#checks robot status
def validate_robot_status(robot: dict, command: CommandRequest):
    if robot.battery_level < 20:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Robot battery level is low")
    if robot.paint_level < 15:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Robot paint level is low")


def calculate_distance(point_a: dict, point_b: dict):
    return ((point_a["x"] - point_b["x"]) ** 2 + (point_a["y"] - point_b["y"]) ** 2) ** 0.5


def process_command_control(robot: dict, command_request: CommandRequest):
    command = command_request.command
    params = command_request.parameters if command_request.parameters else None
    
    command_handlers = {
        RobotCommand.START: handle_start_command,
        RobotCommand.STOP: handle_stop_command,
        RobotCommand.PARK: handle_park_command,
        RobotCommand.CHARGE: handle_charge_command,
        RobotCommand.MOVE: handle_move_command
    }
    
    handler = command_handlers.get(command)
    if handler is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid command")
    
    return handler(robot, params)


def handle_start_command(robot: dict, params: dict = None):
    if robot.status != RobotStatus.PENDING:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Can only start a pending robot")
    robot.status = RobotStatus.IN_PROGRESS
    return {"message": "Robot started successfully"}



def handle_stop_command(robot: dict, params: dict) -> dict:
    if robot.status != RobotStatus.IN_PROGRESS:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Can only stop a running robot")
    robot.status = RobotStatus.COMPLETED
    return {"message": "Robot stopped successfully"}


def handle_park_command(robot: dict, params: dict) -> dict:
    if "parking_spot" not in params:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing parking spot")
    
    parking_spot = params["parking_spot"]
    if not isinstance(parking_spot, dict):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Parking spot should be a dictionary with 'x' and 'y' coordinates")
    if "x" not in parking_spot or "y" not in parking_spot:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing 'x' or 'y' in parking spot")
    
    if robot.status != RobotStatus.IN_PROGRESS:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Can only park a running robot")

    robot.status = RobotStatus.PARKED
    robot.current_coordinates = parking_spot  # Assuming parking_spot is a valid coordinate dict

    return {"message": "Robot parked successfully", "coordinates": robot.current_coordinates}



def handle_charge_command(robot: dict, params: dict) -> dict:
    valid_states = [RobotStatus.COMPLETED, RobotStatus.PENDING]
    if robot.status not in valid_states:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Can only charge robots that are COMPLETED or PENDING")
    
    robot.battery_level = 100.0
    return {"message": "Robot charging initiated"}


def handle_move_command(robot: dict, params: dict) -> dict:
    if "destination" not in params:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Move command requires destination parameter")
    if robot.status != RobotStatus.IN_PROGRESS:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Can only move robots that are IN_PROGRESS")
    
    distance = calculate_distance(robot.current_coordinates, params["destination"])
    robot.current_coordinates = params["destination"]
    
    return {
        "message": f"Robot moving to {params['destination']}",
        "distance_traveled": distance
    }


def hash_password(password:str):
    return pwd_context.hash(password)

def verify_password(plain_password:str,hashed_password:str):
    return pwd_context.verify(plain_password,hashed_password)
