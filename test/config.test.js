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
        const cfg = new Config('config.test.json5');

        const a1 = cfg.loadSync();
        expect(a1).toEqual({
            key_1: 'val_1',
            key_2: {
                key_2_1: {
                    key_2_1_1: 'val_2_1_1'
                },
                key_2_2: 'val_2_2'
            }
        });
    })
    it('test load async', () => {
    })

    it('test load sync', () => {
        const cfg = new Config('config.test', 'config.test.json5');
        cfg.dump({val: 100}).then(res => {
            return expect(res.val).toBe(100);
        });
    })

    it('test load async', () => {
    })
});