const Config = require('../src/Config');
const path = require('path');

describe('simple', () => {
    it('test getConfigPath', () => {
        const cfg = new Config('');
        expect(cfg.getConfigPath('Config.js')).toEqual(path.resolve(__dirname, '../src/Config.js'));
        expect(cfg.getConfigPath('Config.js')).toEqual(path.resolve(__dirname, '../src/Config.js'));
        expect(cfg.getConfigPath('NotExist.js')).toEqual(path.resolve(process.cwd(), 'NotExist.js'));
        expect(cfg.getConfigPath('/Config.js')).toEqual('/Config.js');
        expect(cfg.getConfigPath('c:/Config.js')).toEqual('c:/Config.js');

    })
    it('test load sync', () => {
        const cfg = new Config('config.demo.json5');
        expect(cfg.loadSync()).toEqual({
            key_1: 'val_1',
            key_2: {
                key_2_1: {
                    key_2_1_1: 'val_2_1_1'
                },
                key_2_2: 'val_2_2'
            }
        });
        expect(cfg.loadSync('key_2', "key_2_1")).toEqual({
            key_2_1_1: 'val_2_1_1'
        });
    })
    it('test load async 1', () => {
        const cfg = new Config('config.demo.json5');
        return cfg.load().then(data => {
            expect(data).toEqual({
                key_1: 'val_1',
                key_2: {
                    key_2_1: {
                        key_2_1_1: 'val_2_1_1'
                    },
                    key_2_2: 'val_2_2'
                }
            });
        });
    })
    it('test load async 2', () => {
        const cfg = new Config('config.demo.json5');
        return cfg.load('key_2', "key_2_1").then(data => {
            expect(data).toEqual({
                key_2_1_1: 'val_2_1_1'
            });
        });
    })

    it('test dump async', () => {
        const cfg = new Config('config.test.json5');
        return cfg.dump({val: 100})
            .then(() => {
                return cfg.load();
            }).then(res => {
                return expect(res.val).toBe(100);
            });
    })

    it('test load async', () => {
        const cfg = new Config('config.test.json5');
        cfg.dumpSync({val: 100});
        return expect(cfg.loadSync()).toEqual({val: 100});
    })
});