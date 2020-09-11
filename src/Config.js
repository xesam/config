const path = require('path');
const fs = require('fs');
const writeFile = require('write-file-promise');
const readFiles = require('read-files-promise');
const json5 = require('json5');

class Config {
    constructor(name, configPath) {
        this.name = name;
        this._configPath = this.getConfigPath(name, configPath);
    }

    getConfigPath(name, configPath) {
        if (configPath) {
            return path.resolve(process.cwd(), configPath);
        } else {
            const home = process.env.HOME || process.env.USERPROFILE;
            if (name) {
                return path.resolve(home, `${name}.json5`);
            } else {
                return path.resolve(home, '.config.json5');
            }
        }
    }

    load() {
        return readFiles([this._configPath], { encoding: 'utf-8' })
            .then(json5.parse);
    }

    loadSync() {
        try {
            const data = fs.readFileSync(this._configPath, "utf-8");
            return json5.parse(data);
        } catch (e) {
            return {};
        }
    }

    dump(data) {
        return writeFile(this._configPath, json5.stringify(data), { encoding: 'utf-8' });
    }

    dumpSync(data) {
        fs.writeFileSync(this._configPath, json5.stringify(data, null, 2), { encoding: "utf-8" });
    }
}

module.exports = Config;
