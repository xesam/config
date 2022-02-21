# Config

a simple json config loader.

## usage

```shell script
npm install @xesam/config
```

config.test.json5
```json
{
    val: 100
}
```

### load from input file

```javascript
const cfg = new Config('config.test', 'config.test.json5');
const c = cfg.loadSync(); 
console.log(c.val) // 100 

```

or load from home dir

```javascript
const cfg = new Config('config.test', 'config.test.json5');
cfg.load().then(res => {
    console.log(res.val); // 100
});
cfg.dump({ val: 200 }).then(res => {
    console.log(res.val); // 200
});

```