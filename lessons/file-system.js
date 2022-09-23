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

fs.writeFile(path.resolve(__dirname, 'test.txt'), '1234 test', (err) => {

    if(err) {
        console.log('ОШИБКА =>', err);
        return;
    }
    console.log('Файл записан')
});

/*appendFile() - записывает новые данные в конец существующего файла, или создает новый */

fs.appendFile(path.resolve(__dirname, 'test.txt'), 'Новые данные', (err) => {

    if(err) {
        console.log('ОШИБКА =>', err);
        return;
    }
    console.log('Данные добавлены в конец файла')
});

/*Данные методы являются асинхронными*/
