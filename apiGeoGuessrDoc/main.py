from optparse import Option
from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
import jwt
from database import Database
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Cookie

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost:3000",
    "http://localhost:8080",
]

app = FastAPI()
db = Database()
db.create_table_user()


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginItem(BaseModel):
    username: str
    password: str

@app.post("/register")
async def register_user(login_item: LoginItem):
    data = jsonable_encoder(login_item)
    resp = db.register(data["username"],data["password"])
    if resp:
        return {"message": "success"}
    else:
        return {"message":"error"}

@app.get("/")
def read_root():
    return {"Hello": "World"}



SECRET_KEY = "my_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 800

@app.post("/login")
async def login_user(login_item: LoginItem):
    
    data = jsonable_encoder(login_item)
    print(data)
    if db.user_auth(data["username"],data["password"]):
        encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
        return { "message" :"success",'token': encoded_jwt }
    else:
        return {'message':"error",'type':'Login failed'}