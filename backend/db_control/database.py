from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import sqlalchemy

SQLALCHEMY_DATABASE_URL = "sqlite:///./KAGUYA_DB.db"

# user = ''
# password = ''
# host = ''
# database_name = 'kaguya'
# engine = sqlalchemy.create_engine(f'mysql+mysqlconnector://{user}:{password}@{host}/{database_name}')

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = sqlalchemy.orm.declarative_base()