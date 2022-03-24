# Config

a simple json config loader.

## usage

```shell script
npm install @xesam/config
```

### test data

```js
{
  key_1: 'val_1',
  key_2: {
    key_2_1: {
      key_2_1_1: 'val_2_1_1'
    },
    key_2_2: 'val_2_2'
  }
}
```

### load config

search path:

1. absolute path
2. working dir
3. home dir
4. source dir



```javascript
const cfg = new Config('config.demo.json5');
const c = cfg.loadSync("key_2", "key_2_1"); 
console.log(c) //  {key_2_1_1: 'val_2_1_1'}

```

### dump config

```javascript
const cfg = new Config('config.demo.json5');
cfg.dump({ val: 200 }).then(() => {
    ...
});

```