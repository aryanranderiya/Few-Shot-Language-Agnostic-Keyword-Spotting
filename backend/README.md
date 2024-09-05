cd backend (if not in backend folder)

python -m venv .venv

pip install -r requirements.txt

source .venv/Scripts/activate (Windows)

cd app

uvicorn main:app --reload
