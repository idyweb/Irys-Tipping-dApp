FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY backend/pyproject.toml /app/pyproject.toml

RUN pip install --upgrade pip && \
    pip install fastapi==0.115.0 uvicorn[standard]==0.30.6 pydantic==2.8.2 python-dotenv==1.0.1 psycopg2-binary==2.9.9

COPY backend /app

EXPOSE 8000

CMD ["python", "uvicorn_app.py"]
