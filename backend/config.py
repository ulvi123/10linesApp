from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Robot Parking API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    DB_HOST: str
    DB_PORT: str
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str
    
     #  Supabase settings in case it might be needeed
    SUPABASE_URL: str
    SUPABASE_KEY: str
    
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    class Config:
        orm_mode = True
        env_file = ".env"

def get_settings():
    return Settings()