# Utilise une image officielle Python comme image de base
FROM python:3.9-slim

# Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier requirements.txt dans le répertoire de travail
COPY requirements.txt .

# Installer les dépendances du projet
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du projet dans le répertoire de travail
COPY . .

# Exposer le port que l'application utilisera
EXPOSE 8000

# Collecter les fichiers statiques pour Django
RUN python manage.py collectstatic --noinput

# Commande par défaut pour lancer l'application avec Gunicorn
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


