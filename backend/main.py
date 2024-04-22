from fastapi import Depends, FastAPI, HTTPException, Request, Header
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from typing import Union
from typing import Union, List  # Listを追加
from passlib.context import CryptContext  # パスワードのハッシュ化に使用する
from db_control.schemas import ProductRecommendation, UserResponses
from db_control import crud, models, schemas
from db_control.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ハッシュ化に関する設定
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT関連の設定
SECRET_KEY = "ac3d0d4a0e995c3aa293d86e58b1bdeaaaaf98580feeaad48c3f6a2943ac71f2"  # 上記のユーティリティ関数と同じSECRET_KEYを使用してください
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# JWTトークンの作成
def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# ユーザー認証
def authenticate_user(db: Session, email: str, password: str):
    user = crud.get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):  # ハッシュ化されたパスワードを検証
        raise HTTPException(status_code=401, detail="Invalid credentials")  # 認証失敗時にHTTPExceptionを発生させる
    return user

# パスワードの検証
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.User)  # response_modelを修正
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(user.password)
    db_user = crud.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    created_user = crud.create_user(db=db, user=user, hashed_password=hashed_password)
    return created_user # レスポンスをschemas.Userモデルのインスタンスに修正

@app.post("/login")
def login_for_access_token(request: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, request.email, request.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": request.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/submit/")
async def submit_answers(
    answers: schemas.Answers,
    authorization: str = Header(None),  # Authorizationヘッダーを受け取る
    db: Session = Depends(get_db)
):
    try:
        # トークンがBearer形式であることを確認
        if authorization is None or not authorization.startswith("Bearer"):
            raise HTTPException(status_code=401, detail="Unauthorized")
        # トークンを取得
        token = authorization.split(" ")[1]        
        # 回答を処理する
        db_answer = crud.submit_answers(db, answers, token)
        return {"status": "success", "message": "Answers submitted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/recommend/", response_model=List[schemas.ProductRecommendation])
def recommend_products(id: int, category: str, db: Session = Depends(get_db)):
    # 製品をカテゴリに基づいて取得
    products = crud.get_products_by_category(db, category)
    if not products:
        raise HTTPException(status_code=404, detail="No products found in the given category")
    
    # ユーザーの回答を取得
    answers = crud.get_answers_by_id(db, id)
    if not answers:
        raise HTTPException(status_code=404, detail="No answers found for the given ID")

    # ユーザーの回答をスコアリングロジックに適用
    scored_products = crud.score_products(products, answers)
    return [schemas.ProductRecommendation(**prod.__dict__) for prod in scored_products]

    