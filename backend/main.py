from fastapi import FastAPI
from database import engine, Base
from routes import notes

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(notes.router)

@app.get("/")
def home():
    return {"message": "Notes API running"}
