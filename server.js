const express = require('express');
const app = express();

app.use(express.json());

// 
const coursesRouter = require('./routes/courses');
app.use('/api/courses', coursesRouter);

// Route racine
app.get('/', (req, res) => {
    res.json({ 
        message: 'MON SERVER EST DEMARRER ET PRET A TRAVAILLER',
        endpoints: '/api/courses'
    });
});

// Gestion des routes inexistantes (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
