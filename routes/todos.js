//Роутинг приложения
const {Router} = require('express');
const router = Router();
const Todo = require('../models/Todo')

//Главная
router.get('/', async (req, res) => {
    const todos = await Todo.find({}).lean();

    res.render('index', {
        title: 'Todos list',
        todos
    });
});
//Создание
router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo'
    });
});
//Запрос на создание
router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    });

    await todo.save();

    res.redirect('/');
});
//Запрос на замену статуса
router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id);
    todo.completed = !!req.body.completed;

    await todo.save();
    
    res.redirect('/');
});

module.exports = router;