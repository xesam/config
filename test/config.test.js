const Config = require('../src/Config');

describe('simple', () => {
    it('test sync', () => {
        const cfg = new Config('t1', '1.json5');
        cfg.loadSync();
        expect(cfg.name).toBe('t1');

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
        const cfg = new Config('t1', '1.json5');
        cfg.dump({ val: 100 }).then(res => {
            return cfg.load();
        }).then(res => {
            return expect(res.val).toBe(100);
        });
    })

    it('test home config file', () => {
        const cfg = new Config('home');
        cfg.dump({ val: 100 }).then(res => {
            return cfg.load();
        }).then(res => {
            return expect(res.val).toBe(100);
        });
    })

    it('test default config file', () => {
        const cfg = new Config();
        cfg.dump({ val: 100 }).then(res => {
            return cfg.load();
        }).then(res => {
            return expect(res.val).toBe(100);
        });
    })
});