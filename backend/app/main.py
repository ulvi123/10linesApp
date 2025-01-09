from datetime import datetime
from fastapi import HTTPException, status, Depends,FastAPI
from app.routers.routers import router
from config import get_settings, Settings
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


# Initialize FastAPI with settings 
settings = get_settings()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="API for controlling robots that stripe parking lots"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers = ["*"]
)

app.get("/")
def read_root():
    return {"message":"Hello Robot parking App"}


app.include_router(router)
    
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)