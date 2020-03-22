//Главный файл
const express = require('express');
const mongoose = require('mongoose');
const expHandle = require('express-handlebars');
const todoRoutes = require('./routes/todos');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

//Настройка html-движка
const hbs = expHandle.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(todoRoutes);
app.use(express.static(path.join(__dirname, 'src')));

//Запуск приложения м подключение к БД
async function start(){
    try{
        await mongoose.connect('mongodb+srv://admin:admin123@cluster0-w4cha.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log('starting');
        });
    } catch(e){
        console.error(e);
    }
}

start();

