# 📚 API REST — Gestion des Cours

API REST construite avec **Node.js** et **Express** pour gérer une liste de cours universitaires. Elle permet de consulter, ajouter, modifier et supprimer des cours via des requêtes HTTP.

---
 Structure du projet

```
projet/
├── server.js          # Point d'entrée de l'application
└── routes/
    └── courses.js     # Routes de l'API pour les cours
```

---

## ⚙️ Prérequis

- [Node.js](https://nodejs.org/) v14 ou supérieur
- npm (inclus avec Node.js)

---

##  Installation et démarrage

**1. Cloner ou télécharger le projet**
```bash
git clone <url-du-repo>
cd <nom-du-dossier>
```

**2. Installer les dépendances**
```bash
npm install express
```

**3. Lancer le serveur**
```bash
node server.js
```

Le serveur démarre sur **http://localhost:3000**

---

## 🔌 Endpoints disponibles

### Vérifier que le serveur tourne
```
GET /
```
Retourne un message de confirmation et la liste des endpoints disponibles.

---

### Récupérer tous les cours
```
GET /api/courses
```
Retourne la liste complète des cours.

---

### Récupérer un cours par ID
```
GET /api/courses/:id
```
Retourne le cours correspondant à l'ID fourni. Retourne une erreur 404 si le cours n'existe pas.

---

### Ajouter un nouveau cours
```
POST /api/courses
```
**Corps de la requête (JSON) :**
```json
{
  "title": "Nom du cours",
  "teacher": "Nom du professeur",
  "credit": 6
}
```
Tous les champs sont **obligatoires**. Retourne le cours créé avec son ID auto-généré.

---

### Modifier un cours existant
```
PUT /api/courses/:id
```
**Corps de la requête (JSON) — champs à modifier :**
```json
{
  "title": "Nouveau titre",
  "teacher": "Nouveau professeur",
  "credit": 4
}
```
Seuls les champs fournis seront mis à jour. Retourne le cours modifié.

---

Supprimer un cours
```
DELETE /api/courses/:id
```
Supprime le cours correspondant à l'ID. Retourne un message de confirmation.

---

Données initiales

Au démarrage, l'API contient trois cours de démonstration :

| ID | Titre               | Enseignant | Crédits |
|----|---------------------|------------|---------|
| 1  | Apprendre Node.js   | Dr Victor  | 6       |
| 2  | Développement web   | Dr Nji     | 6       |
| 3  | Algorithmique       | Dr Nji     | 6       |

>  Les données sont stockées **en mémoire**. Elles sont réinitialisées à chaque redémarrage du serveur.

---

 Exemple de test avec curl

```bash
# Lister tous les cours
curl http://localhost:3000/api/courses

# Ajouter un cours
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"title":"Réseaux","teacher":"Dr Kamga","credit":4}'

# Modifier un cours
curl -X PUT http://localhost:3000/api/courses/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Node.js avancé"}'

# Supprimer un cours
curl -X DELETE http://localhost:3000/api/courses/2
```

---

 Bugs connus dans le code actuel

- **`GET /api/courses/:id`** : retourne toute la liste des cours au lieu du seul cours trouvé (ligne `res.status(200).json(courses)` devrait être `res.status(200).json(course)`).
- **`POST /api/courses`** : le champ `id` est demandé dans la validation mais l'ID est en réalité auto-généré (`nextID`). De plus, `nextId` est mal orthographié (`nextId` au lieu de `nextID`), ce qui provoque une erreur à l'ajout.

---

 Technologies utilisées

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
