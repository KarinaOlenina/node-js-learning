const fs = require('fs');
const path = require('path');

// СОЗДАНИЕ ФАЙЛОВ

// СИНХРОННО
/*fs.mkdirSync(path.resolve(__dirname, 'dir'));
fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir1', 'dir2', 'dir3'), {recursive: true});*/

// АСИНХРОННО
/*
console.log('START =>');

fs.mkdir(path.resolve(__dirname, 'dir'), (err) => {

    if(err) {
        console.log('ОШИБКА =>', err);
        return;
    }
    console.log('Папка создана')
});

console.log('END =>');*/

// УДАЛЕНИЕ ФАЙЛОВ

// СИНХРОННО
/*fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {

    if(err) {
       throw err;
    }
    console.log('Папка удалена')
});*/

// СОЗДАТЬ И ЗАПИСАТЬ ФАЙЛ

/*writeFile - записывает(перезаписывает если уже что-то есть) данные в файл*/

/*fs.writeFile(path.resolve(__dirname, 'test.txt'), '1234 test', (err) => {

    if(err) {
        console.log('ОШИБКА =>', err);
        return;
    }
    console.log('Файл записан')
});*/

/*appendFile() - записывает новые данные в конец существующего файла, или создает новый */

/*fs.appendFile(path.resolve(__dirname, 'test.txt'), 'Новые данные', (err) => {

    if (err) {
        console.log('ОШИБКА =>', err);
        return;
    }
    console.log('Данные добавлены в конец файла')
});*/

/*Данные методы являются асинхронными*/

//*Создаем свой промис*/

const writeFileAsync = async (path, data) => {

    return new Promise((resolve, reject) => fs.writeFile(path, data, (err) => {
            if (err) {
                return reject(err.message);
            }
            resolve();
        })
    )
}

const appendFileAsync = async (path, data) => {

    return new Promise((resolve, reject) => fs.appendFile(path, data, (err) => {
            if (err) {
                return reject(err.message);
            }
            resolve();
        })
    )
}

/*readFile() - для чтения файлов, принимает 3 аргумента, путь, кодировка и callback - принимает 2 аргумента - err и data*/
const readFileAsync = async (path) => {

    return new Promise((resolve, reject) => fs.readFile(path, {encoding: "utf-8"}, (err, data) => {
            if (err) {
                return reject(err.message);
            }
            resolve(data);
        })
    )
}

/*rm() - удаляет файл, принимает путь и callback*/
/*rmdir() - удаляет папку, принимает путь и callback*/
const removeFileAsync = async (path) => {

    return new Promise((resolve, reject) => fs.rm(path, (err) => {
            if (err) {
                return reject(err.message);
            }
            resolve();
        })
    )
}

/*writeFileAsync(path.resolve(__dirname, 'test.txt'), 'data')
    .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '123'))
    .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '456'))
    .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '789'))
    .then(() => readFileAsync(path.resolve(__dirname, 'test.txt')))
    .then(data => console.log(data))
    .catch(err => console.log('err'));*/

/*removeFileAsync(path.resolve(__dirname, 'test.txt'))
    .then(() => console.log('Файл был удален'))
    .catch(err => console.log('err'));*/

/*Через переменную окружения передать строку, записать ее файл,
 прочитать файл, посчитать количество слов в файле и записать,
 их в новый файл count.txt, затем удалить первый файл*/

const dotenv = require('dotenv');
dotenv.config();

const text = process.env.TEXT || '';


writeFileAsync(path.resolve(__dirname, 'test.txt'), text)
    .then(() => readFileAsync(path.resolve(__dirname, 'test.txt')))
    .then(data => data.split(' ').length)
    .then(count => writeFileAsync(path.resolve(__dirname, 'count.txt'), `Количество слов ${count}`))
    .then(() => removeFileAsync(path.resolve(__dirname, 'test.txt')))
    .then(() => console.log('Файл был удален'))
    .catch(err => console.log('err'));
