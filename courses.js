const express = require('express')
const router = express.Router();
let courses = [
    { id: 1, title: 'apprendre nodejs', teacher: 'Dr victor', credit: 6 },
    { id: 2, title: 'developpement web', teacher: 'Dr Nji', credit: 6 },
    { id: 3, title: 'algorithmique', teacher: 'Dr Nji', credit: 6 }
];
let nextID = 4;
router.get('/', (req, res) => {
    res.status(200).json(courses);
});
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).json({ error: 'cours non trouver' });
    }
    res.status(200).json(courses);
});
router.post('/', (req, res) => {
    const { id, title, teacher, credit } = req.body;

    if (!id || !title || !teacher || !credit) {
        return res.status(400).json({ error: 'Les champs id, title, teacher et credit sont requis' });
    }

    const newCourse = { id: nextId++, title, teacher, credit };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});
router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).json({ error: 'Cours non trouvé' });
    }

    const { id, title, teacher, credit } = req.body;
    if (id) course.id = id;
    if (title) course.title = title;
    if (teacher) course.teacher = teacher;
    if (credit) course.credit = credit;

    res.status(200).json(course);
});
router.delete('/:id', (req, res) => {
    const index = courses.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Cours non trouvé' });
    }

    courses.splice(index, 1);
    res.status(200).json({ message: 'Cours supprimé avec succès' });
});

module.exports = router;
