const path = require('path');
const fs = require('fs');
const writeFile = require('write-file-promise');
const readFiles = require('read-files-promise');
const json5 = require('json5');

function getHome() {
    return process.env.HOME || process.env.USERPROFILE;
}

class Config {
    constructor(name, configPath) {
        this.name = name;
        this._configPath = this.getConfigPath(name, configPath);
    }

    getConfigPath(name, configPath) {
        if (configPath) {
            return path.resolve(process.cwd(), configPath);
        } else {
            return this.getDefaultPath(name);
        }
    }

    getDefaultPath(name) {
        if (name) {
            return path.resolve(getHome(), name);
        } else {
            return path.resolve(getHome(), '.config.json5');
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
        return writeFile(this._configPath, json5.stringify(data));
    }

    dumpSync(data) {
        fs.writeFileSync(this._configPath, json5.stringify(data, null, 2), { encoding: "utf-8" });
    }
}

module.exports = Config;
