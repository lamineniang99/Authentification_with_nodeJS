# API d'Authentification Node.js avec Express, Mongoose, JWT et Bcrypt

Cette API d'authentification est conçue pour gérer l'inscription et la connexion des utilisateurs de manière sécurisée en utilisant JSON Web Tokens (JWT) pour l'authentification.

## Fonctionnalités

- Inscription d'un nouvel utilisateur avec validation des données.
- Connexion d'un utilisateur existant avec vérification du mot de passe haché.
- Génération de jetons JWT pour l'authentification des utilisateurs.
- Protection des routes sensibles à l'aide des jetons JWT.
- Stockage sécurisé des informations utilisateur dans une base de données MongoDB avec Mongoose.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- Node.js et npm
- MongoDB

## Installation

1. Clonez ce référentiel sur votre machine locale :


2. Installez les dépendances en exécutant la commande suivante dans le répertoire racine du projet : npm install 


3. Configurez votre base de données MongoDB dans le dossier `config`  et dans le fichier databas.js en remplaçant `MONGODB_URL` par votre URL MongoDB.

## Utilisation

1. Démarrez le serveur en exécutant la commande suivante : npm start


2. L'API sera accessible à l'adresse `http://localhost:3000`.

## Routes

- `POST /auth/signup`: Permet à un utilisateur de s'inscrire. Requiert un corps de requête JSON avec les champs `email` et `password`.
- `POST /auth/login`: Permet à un utilisateur de se connecter. Requiert un corps de requête JSON avec les champs `email` et `password`.

## Exemple de Requêtes

1. Inscription d'un nouvel utilisateur :

```json
POST /auth/signup
{
    "email": "utilisateur@example.com",
    "password": "motdepasse"
}

2. connexion d'un  utilisateur :

POST /auth/login
{
    "email": "utilisateur@example.com",
    "password": "motdepasse"
}

3. Sécurité
- Les mots de passe des utilisateurs sont hachés avant d'être stockés dans la base de données.
- Les jetons JWT sont générés avec une expiration et ne contiennent pas de données sensibles.
- Les routes sensibles sont protégées en vérifiant la validité du jeton JWT.

