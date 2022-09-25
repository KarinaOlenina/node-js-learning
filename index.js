const http = require('http');
const EventEmitter = require('events')

const PORT = process.env.PORT || 8080;

/*const server = http.createServer((req, res) => {
    /!* res.writeHead(200, {
         'content-type': 'text/html; charset=utf-8'
     })*!/
    /!*    res.end('Сервер работает!!!')*!/

     res.writeHead(200, {
     'content-type': 'application/json'
 })
    if (req.url === '/user') {
      return  res.end(JSON.stringify([{
          id: 1,
          name: 'Karina'
          }]
      ));
    } else if (req.url === '/post') {
        return  res.end('Your post!');
    } else   return  res.end('Ooops...')
})*/

//Однако конструкция if else, для разработки не используется, вместо этого используют
// фреймоворки по типу express, nestjs...

// server.listen(PORT, () => console.log(`Server started on ${PORT}`));

// server.on('error', (e) => {
//     if (e.code === 'EADDRINUSE') {
//         console.log('Address in use, retrying...');
//         setTimeout(() => {
//             server.close();
//             server.listen(PORT, () => console.log(`Server started on ${PORT}`));
//         }, 1000);
//     }
// });

// ---------------------------------------

//Своя реализация express:

const emitter = new EventEmitter();


class Router {
    constructor() {
        this.endpoints = {};
    }

    request(method = 'GET', path, handler) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {};
        }
        const endpoints = this.endpoints[path];

        if (endpoints[method]) {
            throw new Error(`[${method}] по адресу ${path} уже существует`);
        }

        endpoints[method] = handler;
        emitter.on(`[${path}]:[${method}]`, (req, res) => {
            handler(req, res)
        })
    }

    get(path, handler) {
        this.request('GET', path, handler);
    }

    post(path, handler) {
        this.request('POST', path, handler);
    }

    put(path, handler) {
        this.request('PUT', path, handler);
    }

    delete(path, handler) {
        this.request('DELETE', path, handler);
    }
}

const router = new Router();
router.get('/user', (req, res) => {
    res.end('YOU SEND REQUEST TO /USER')
})

router.get('/post', (req, res) => {
    res.end('YOU SEND REQUEST TO /POST')
})

const server = http.createServer((req, res) => {
    const emitted = emitter.emit(`[${req.url}]:[${req.method}]`, req, res);
    if (!emitted) {
        res.end('Not found')
    }
    // res.end(req.url);
});

server.listen(PORT, () => console.log(`Server started on ${PORT}`));