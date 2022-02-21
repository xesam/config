const path = require('path');
const fs = require('fs');
const writeFile = require('write-file-promise');
const readFiles = require('read-files-promise');
const json5 = require('json5');

const ENCODING = 'utf-8';
let NAME_SEQ = 0;

function nextSeq() {
    NAME_SEQ++;
    return NAME_SEQ;
}

function getUserHome() {
    return process.env.HOME || process.env.USERPROFILE;
}

class Config {
    constructor(name, configPath) {
        if (name) {
            this.name = name;
        } else {
            this.name = `Config$${nextSeq()}`;
        }
        if (typeof configPath === 'function') {
            configPath = configPath(name);
        }
        this._configPath = this.getConfigPath(name, configPath);
    }

    getConfigPath(name, configPath) {
        if (configPath) {
            return path.resolve(process.cwd(), configPath);
        } else {
            return path.resolve(getUserHome(), `${name}.json5`);
        }
    }

    load() {
        return readFiles([this._configPath], {encoding: ENCODING})
            .then(json5.parse);
    }

    loadSync() {
        const data = fs.readFileSync(this._configPath, ENCODING);
        return json5.parse(data);
    }

    dump(data) {
        return writeFile(this._configPath, json5.stringify(data, null, 4), {encoding: ENCODING})
            .then(()=>{
                return data;
            });
    }

    dumpSync(data) {
        fs.writeFileSync(this._configPath, json5.stringify(data, null, 4), {encoding: ENCODING});
    }
}

module.exports = Config;