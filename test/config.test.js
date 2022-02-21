const Config = require('../src/Config');

describe('simple', () => {
    it('test sync', () => {
        const cfg = new Config('config.test', 'config.test.json5');
        expect(cfg.name).toBe('config.test');

        cfg.dumpSync({
            val: 100
        });
        const a1 = cfg.loadSync();
        expect(a1.val).toBe(100);

        cfg.dumpSync({
            val: 200
        });
        const a2 = cfg.loadSync();
        expect(a2.val).toBe(200);

    })

    it('test async', () => {
        const cfg = new Config('config.test', 'config.test.json5');
        cfg.dump({val: 100}).then(res => {
            return expect(res.val).toBe(100);
        });
    })

    // **** put config.test.json5 in your home directory
    it('test home config file', () => {
        const cfg = new Config('config.test');
        cfg.dump({val: 100}).then(res => {
            return cfg.load();
        }).then(res => {
            return expect(res.val).toBe(100);
        });
    })
});