const fs = require('fs');
exports.Config = function (path) {
    this.path = path;
    this.cfg = {
        username: "username",
        password: "password"
    };
    this.load = () => {
        let data;
        try {
            data = fs.readFileSync(this.path, {encoding: "utf8", flag: "r"});
        } catch (e) {
            console.log(e);
        }
        if (data) {
            this.parse(JSON.parse(data));
        }
    };
    this.save = () => {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.cfg, null, 2));
        } catch (e) {
            console.log(e);
        }
    };
    this.parse = (json) => {
        for (let key in this.cfg) {
            if (json[key]) this.cfg[key] = json[key];
        }
    };
    this.load();
};
