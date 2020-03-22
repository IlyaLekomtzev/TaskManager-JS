//Модель задач
const {Schema, model} = require('mongoose');

//Создание модели данных задачи
const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Todo', schema);