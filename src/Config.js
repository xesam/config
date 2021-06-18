const path = require('path');
const fs = require('fs');
const writeFile = require('write-file-promise');
const readFiles = require('read-files-promise');
const json5 = require('json5');

const ENCODING = 'utf-8';

class Config {
    constructor(name, configPath) {
        if (!name) {
            throw Error('no config name');
        }
        this.name = name;
        if (typeof configPath === 'function') {
            this._configPath = configPath(name);
        } else {
            this._configPath = this.getConfigPath(name, configPath);
        }
    }

    getConfigPath(name, configPath) {
        if (configPath) {
            return path.resolve(process.cwd(), configPath);
        } else {
            const userHomeDir = process.env.HOME || process.env.USERPROFILE;
            return path.resolve(userHomeDir, `${name}.json5`);
        }
    }

    load() {
        return readFiles([this._configPath], {encoding: ENCODING})
            .then(json5.parse);
    }

    loadSync() {
        try {
            const data = fs.readFileSync(this._configPath, ENCODING);
            return json5.parse(data);
        } catch (e) {
            return {};
        }
    }

    dump(data) {
        return writeFile(this._configPath, json5.stringify(data, null, 4), {encoding: ENCODING});
    }

    dumpSync(data) {
        fs.writeFileSync(this._configPath, json5.stringify(data, null, 4), {encoding: ENCODING});
    }
}

module.exports = Config;