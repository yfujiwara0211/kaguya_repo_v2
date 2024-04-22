from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime

def get_user_by_email(db: Session, name: str):
    return db.query(models.User).filter(models.User.email == name).first()

def create_user(db: Session, user: schemas.UserCreate, hashed_password: str):  # hashed_password 引数を追加 , hushed_password: str
    db_user = models.User(company=user.company,
                          address=user.address,
                          phonenumber=user.phonenumber,
                          email=user.email,
                          industry=user.industry,
                          employees=user.employees,
                          username=user.username,
                          hashed_password=hashed_password
                          ) # hashed_password を指定してユーザーを作成
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def submit_answers(db: Session, answers: schemas.Answers, token: str):
    answer_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    q1_answers_str = ",".join(answers.q1_answer)
    q7_answers_str = ",".join(answers.q7_answer)
    q9_answers_str = ",".join(answers.q9_answer)

    db_answer = models.Answer(
        answer_date=answer_datetime,
        goal=q1_answers_str,
        team_structure=answers.q2_answer,
        solo_work=answers.q3_answer,
        remote_work=answers.q4_answer,
        solo_web=answers.q5_answer,
        web_mtg=answers.q6_answer,
        atmosphere=q7_answers_str,
        color=answers.q8_answer,
        well_being=q9_answers_str,
        office_capacity=answers.q10_answer,
        office_size=answers.q11_answer,
        token=token,  # トークンを保存
    )
    db.add(db_answer)
    db.commit()
    db.refresh(db_answer)
    return db_answer

def get_products_by_category(db: Session, category: str):
    return db.query(models.Product).filter(models.Product.category == category).all()

def get_answers_by_id(db: Session, id: int):
    return db.query(models.Answer).filter(models.Answer.id == id).first()

def score_products(products, answers):
    for product in products:
        product.score = 0
        # 解析してカンマ区切りの値をリストに変換
        goals = answers.goal.split(',')
        team_structure = answers.team_structure.split(',')
        atmospheres = answers.atmosphere.split(',')
        well_being_elements = answers.well_being.split(',')

        # ループ処理で属性があれば加算
        for key in goals:
            product.score += getattr(product, f'goal_{key}', 0) if hasattr(product, f'goal_{key}') else 0
        for key in team_structure:
            product.score += getattr(product, f'team_structure_{key}', 0) if hasattr(product, f'team_structure_{key}') else 0
        for key in atmospheres:
            product.score += getattr(product, f'atmosphere_{key}', 0) if hasattr(product, f'atmosphere_{key}') else 0
        for key in well_being_elements:
            product.score += getattr(product, f'well_being_{key}', 0) if hasattr(product, f'well_being_{key}') else 0

        # 実際の値を使用してスコア計算
        product.score += 1 / (1 + abs(product.solo_work - answers.solo_work))
        product.score += 1 / (1 + abs(product.remote_work - answers.remote_work))
        product.score += 1 / (1 + abs(product.solo_web - answers.solo_web))
        product.score += 1 / (1 + abs(product.web_mtg - answers.web_mtg))

    return sorted(products, key=lambda x: x.score, reverse=True)[:12]