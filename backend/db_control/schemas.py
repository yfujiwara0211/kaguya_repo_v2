from pydantic import BaseModel
from typing import List

class LoginRequest(BaseModel):
    email: str
    password: str

class UserCreate(BaseModel):
    company:str
    username:str
    address:str
    phonenumber:str
    email:str
    password:str
    industry:str
    employees:str

class User(BaseModel):
    id:int
    company:str
    username:str
    address:str
    phonenumber:str
    email:str
    industry:str
    employees:str
    hashed_password: str
    
    class Config:
        orm_mode = True

class Answers(BaseModel):
    q1_answer: List[str]  # Q1 の複数の回答をリストで受け取る
    q2_answer: str  # Q2 の回答を文字列で受け取る
    q3_answer: float  # Q3 の回答を数値で受け取る
    q4_answer: float  # Q4 の回答を数値で受け取る
    q5_answer: float  # Q5 の回答を数値で受け取る
    q6_answer: float  # Q6 の回答を数値で受け取る
    q7_answer: List[str]  # Q7 の複数の回答をリストで受け取る
    q8_answer: str  # Q8 の回答を文字列で受け取る
    q9_answer: List[str]  # Q9 の複数の回答をリストで受け取る
    q10_answer: int   # Q10 の回答を数値で受け取る
    q11_answer: int  # Q11 の回答を数値で受け取る


# 商品のスキーマ
class Product(BaseModel):
    product_id: int
    category: str
    score: float = 0.0

class ProductRecommendation(BaseModel):
    product_id: int
    product_name: str
    image: str
    price : int

class UserResponses(BaseModel):
    category: str
    color: str
    goals: List[str]
    team_structure: List[str]
    atmospheres: List[str]
    well_being_elements: List[str]
    solo_work: float
    remote_work: float
    solo_web: float
    web_mtg : float