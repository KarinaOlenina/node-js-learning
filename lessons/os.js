const os = require('os');

/* для запуска нескольких экземпляров Node.js, которые могут распределять рабочие нагрузки
   между потоками своих приложений. */
const cluster = require('cluster');

/*Возвращает строку платформы ОС,
  Возможные значения: 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', и 'win32'.*/
console.log(os.platform());

/*Возвращает архитектуру процессора ОС. Возможные значения: 'arm', 'arm64', 'ia32', 'mips',
'mipsel', 'ppc', 'ppc64', 's390', 's390x', и 'x64'.*/
console.log(os.arch());

/*Возвращает массив объектов, содержащих информацию о каждом логическом ядре процессора.*/
console.log(os.cpus());

/*Зная количество ядер, мы можем запускать разное количество процессов, что-бы расспараллелить
нагрузку. Желательно оставить 2 ядра, что-бы они были заняты операционной системой.*/
/*console.log(os.cpus().length);

const cpus = os.cpus()

for (let i = 0; i < cpus.length - 2; i++) {
    const CPUcore = cpus[i];
    console.log('Запустить еще один Node.js процесс')
}*/

/* cluster.isMaster - Истинно, если процесс является основным.*/
/* cluster.fork() - создает новый рабочий процесс. Возможно вызвать только из основного процесса.*/
if (cluster.isMaster) {
    for (let i = 0; i < os.cpus().length - 2; i++) {
        cluster.fork();
        cluster.on('exit', (worker) => {
            console.log(`Воркер с pid = ${worker.process.pid} умер`);
            cluster.fork();
        })
    }
} else {
    console.log(`Воркер с pid ${process.pid} запущен`);

    setImmediate(() => {
        console.log(`Воркер с pid ${process.pid} все еще работает`);
    }, 5000)
}
