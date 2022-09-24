const dotenv = require('dotenv');
dotenv.config();

// Создаем класс:
const Emitter = require('events');

// Создаем обьект:

const emitter = new Emitter();

const callback = (data, second, third) => {
    console.log(`Вы прислали сообщение ${data}`);
    console.log(`Вы прислали второй аргумент ${second}`);
}

/*Вешаем обработчик, первый аргумент name, 2 - callback*/
emitter.on('message', callback);

const MESSAGE = process.env.message || '';

/*Вызываем событие с помощью emitter.emit*/
if (MESSAGE) {
    emitter.emit('message', MESSAGE, 123);
} else {
    emitter.emit('message', 'Вы не указали аргументы');
}

/*Удаление слушателей*/
emitter.removeAllListeners();
emitter.removeListener('message', callback)