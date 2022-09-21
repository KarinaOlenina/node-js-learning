
// PATH
const path = require('path');

// METHODS:

// JOIN
console.log('Склеить участки пути:', path.join(__dirname, 'first', 'second'));

// RESOLVE
console.log('Получить абсолютный путь (__dirname НЕ работает) =>', path.resolve(__dirname, '/first', 'second'));
console.log('Получить абсолютный путь =>', path.resolve('first', 'second'));

// PARSE
const fullPath = path.resolve('first', 'second');
console.log('Парсинг пути =>', path.parse(fullPath));

// SEP
console.log('Разделитель в ОС (операционной системе) =>', path.sep);

// IsABSOLUTE
console.log('Проверка на абсолютный путь =>', path.isAbsolute('first/second'));

// BASENAME
console.log('Название файла =>', path.basename(fullPath));

// EXTNAME
console.log('Расширение файла =>', path.extname(fullPath));

// -----------------------------------------------------------

const siteURL = 'http://localhost8080/users?id=5123';

const url = new URL(siteURL);

console.log('Информация об url =>', url);
