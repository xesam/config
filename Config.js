function getHome() {
    return process.env.HOME || process.env.USERPROFILE;
}

function getDefaultConfig(name = '') {
    if (name) {
        return `${getHome()}/${name}.json5`;
    } else {
        return `${getHome()}/.config.json5`;
    }
}

class Config {

    constructor(name) {
        this.name = name;
        this._config = getDefaultConfig(this.name);
    }

    load() {
        
    }

    loadSync() {

    }

    dump() {

    }

    dumpSync() {

    }
}

module.exports = Config;

console.log(getHome())