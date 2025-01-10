from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.model import Task, Robot, TaskStatus,UserCreate
from config import get_settings
from datetime import datetime
from uuid import UUID
from app.helperFunctions.utils import validate_robot_status,process_command_control,verify_password,hash_password
from app.schemas.schemas import RobotResponse, TaskCreate,TaskResponse,RobotCreate,CommandRequest,Token,UserCreate,UserLogin,UserResponse,UserRegisterResponse
from app.database.database import get_db
from app.helperFunctions.userCRUD import get_user_by_email,create_user
from app.helperFunctions.auth import create_access_token

router = APIRouter()
settings = get_settings()


#user related routes
@router.post("/api/register",response_model=UserRegisterResponse)
def register_new_user(user:UserCreate,db:Session=Depends(get_db)):
    existing_user = get_user_by_email(db=db,email=user.email)
    if existing_user:
        raise HTTPException(status_code=400,detail="Email already registered")
    
    hashed_password = hash_password(user.password)
    db_user = create_user(db=db,email=user.email,password=hashed_password)
    return {"email": db_user.email,"message": "User registered successfully"}



@router.post("/api/login",response_model=UserResponse)
def login(user:UserLogin,db:Session=Depends(get_db)):
    db_user = get_user_by_email(db=db,email=user.email)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    if not verify_password(user.password,db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect password")
    access_token = create_access_token(data={"sub": user.email})
    return {
        "email": db_user.email,
        "access_token": access_token
    }




#tasks relates routes
@router.post("/tasks", response_model=TaskResponse)
async def add_task(task: TaskCreate, db: Session = Depends(get_db)):
    try:
        task_data = task.dict()
        if 'status' in task_data:
            task_data['status'] = task_data['status'].value if isinstance(task_data['status'], TaskStatus) else task_data['status'].lower()
                
        db_task = Task(**task.dict())
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task
    except Exception as e:
        print(f"Error creating task: {str(e)}")
        raise HTTPException(status_code=422, detail=f"Error creating task: {str(e)}")

@router.get("/tasks/{task_id}", response_model=TaskResponse)
async def get_single_task(task_id: UUID, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.get("/tasks", response_model=list[TaskResponse])
async def get_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tasks = db.query(Task).offset(skip).limit(limit).all()
    return tasks




#robots related tasks
@router.get("/robots", response_model=List[RobotResponse])
async def get_robots(db: Session = Depends(get_db)):
    robots = db.query(Robot).all()
    if not robots:
        raise HTTPException(status_code=404, detail="No robots found")
    return robots  # Pydantic models handle conversion due to `from_attributes=True`.

@router.get("/robots/{robot_id}", response_model=RobotResponse)
async def get_single_robot(robot_id: UUID, db: Session = Depends(get_db)):
    robot = db.query(Robot).filter(Robot.id == robot_id).first()
    if not robot:
        raise HTTPException(status_code=404, detail="Robot not found")
    return robot  # Automatically converted to `RobotResponse`.

@router.post("/robots", response_model=RobotResponse)
async def add_robot(robot: RobotCreate, db: Session = Depends(get_db)):
    db_robot = Robot(**robot.dict())  # Creating here  a new Robot entry.
    db.add(db_robot)
    db.commit()
    db.refresh(db_robot)
    return db_robot  # Returning here the saved Robot entry as a `RobotResponse`.

@router.post("/robots/{robot_id}/control")
async def send_control_command(
    robot_id: UUID,
    command: CommandRequest,
    db: Session = Depends(get_db)
):
    # Fetch the robot from the database.
    robot = db.query(Robot).filter(Robot.id == robot_id).first()
    if not robot:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Robot not found")
    validate_robot_status(robot, command)
    result = process_command_control(robot, command)
    db.commit()
    return {
        "status": "success",
        "robot_id": str(robot_id),
        "command": command.command,
        "result": result,
    }