const path = require('path');
const fs = require('fs');
const writeFile = require('write-file-promise');
const readFiles = require('read-files-promise');
const json5 = require('json5');

const ENCODING = 'utf-8';

function getByKeys(source, ...keys) {
    while (keys.length) {
        const key = keys.shift();
        source = source[key];
    }
    return source;
}

function setByKeys(source, value, ...keys) {
    if (!keys.length) {
        return value;
    }
    while (keys.length > 1) {
        const key = keys.shift();
        source = source[key];
    }
    source[keys[0]] = value;
    return source;
}


function getPath(configPath) {
    if (path.isAbsolute(configPath)) {
        return configPath;
    }
    const workPath = path.resolve(process.cwd(), configPath);
    if (fs.existsSync(workPath)) {
        return workPath;
    }
    const homePath = path.resolve(process.env.HOME || process.env.USERPROFILE, configPath);
    if (fs.existsSync(homePath)) {
        return homePath;
    }
    const dirPath = path.resolve(__dirname, configPath);
    if (fs.existsSync(dirPath)) {
        return dirPath;
    }
    return workPath;
}

class Config {
    constructor(configPath) {
        if (typeof configPath === 'function') {
            this._path = configPath();
        } else {
            this._path = this.getConfigPath(configPath);
        }
    }

    getConfigPath(configPath) {
        return getPath(configPath);
    }

    load(...keys) {
        if (!fs.existsSync(this._path)) {
            return Promise.resolve({});
        }
        return readFiles([this._path], {encoding: ENCODING})
            .then(json5.parse)
            .then(res => {
                return getByKeys(res, ...keys);
            });
    }

    loadSync(...keys) {
        if (!fs.existsSync(this._path)) {
            return {};
        }
        const data = fs.readFileSync(this._path, ENCODING);
        return getByKeys(json5.parse(data), ...keys);
    }

    dump(data, ...keys) {
        return this.load()
            .then(source => {
                source = setByKeys(source, data, ...keys);
                return writeFile(this._path, json5.stringify(source, null, 4), {encoding: ENCODING})
            });
    }

    dumpSync(data, ...keys) {
        let source = this.loadSync();
        source = setByKeys(source, data, ...keys);
        fs.writeFileSync(this._path, json5.stringify(source, null, 4), {encoding: ENCODING});
        return true;
    }
}

module.exports = Config;