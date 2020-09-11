const Config = require('../index');

const a = new Config('t1', '1.json5').loadSync();
console.log(a);

new Config('t2', '1.json5').dumpSync({
    b: 20000
})

new Config('t3', '1.json5').load('1.json5').then(res => {
    console.log(res);
})

new Config().load('1.json5').then(res => {
    console.log(res);
})