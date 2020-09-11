# Config

a json5 config loader

## usage

```javascript
const cfg = new Config('t1', '1.json5');
const c = cfg.loadSync(); 
cfg.dumpSync({key:'new value'});

```

or 

```javascript
const cfg = new Config('t1', '1.json5');
cfg.load().then(res => {
    console.log(res);
});
cfg.dump({ val: 100 }).then(res => {
    console.log('dump finished');
});

```