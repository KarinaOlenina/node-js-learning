// Readable - Чтение;
// Writable - Запись;
// Duplex - Для чтения и записи Readable + Writable;
// Transform - Такой же как Duplex, но может изменить данные по мере чтения.

const fs = require('fs');
const path = require('path');

/*
fs.readFile(path.resolve(__dirname, 'text.txt'), (err, data) => {
    if (err) {
        throw err;
    } else console.log(data)
})
*/

// Readable
/*const stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), {encoding: "utf-8"});*/

// Один чанк по дефолту 64кб
/*
stream.on('data', (chunk) => {
    console.log(chunk);
})

stream.on('end', () => console.log('Конец чтения'));
stream.on('open', () => console.log('Начало чтения'));
stream.on('error', (e) => console.log(e));*/

// Writable

const writableStream = fs.createWriteStream(path.resolve(__dirname, 'text2.txt'), {encoding: "utf-8"});

for (let i = 0; i < 20; i++) {
    writableStream.write(i + '\n');
}

// Закрытие метода write
/*writableStream.end();
writableStream.close();
writableStream.destroy();
writableStream.on('error');*/

// Метод pipe - Метод readable.pipe()прикрепляет Writable поток readable к Writable. Поток данных
// будет управляться автоматически, чтобы Writable поток назначения не был перегружен более быстрым
// Readable потоком.

