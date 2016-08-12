/*******************************************************************************
 * Created by Kami on 2016/4/18.
 * Copyright (c) 2015-2016. Himmelt All rights reserved.
 * https://opensource.org/licenses/MIT
 ******************************************************************************/

const fs = require('fs');

let libpath = (gamedir, lib)=> {
    if (lib.natives == null) {
        let split = lib.name.split(':'), path = gamedir + '/libraries/';
        if (split.length != 3) return 'error';
        path += split[0].replace(/\./g, '/');
        path += '/' + split[1] + '/' + split[2] + '/' + split[1] + '-' + split[2] + '.jar';
        return path + ';';
    } else {
        unzip(lib);
        return '';
    }
};
let unzip = (lib)=> {

};

exports.launch = (gamedir, username, uuid, version, xmx, code)=> {

    try{
        let jsonfile = gamedir + "/versions/" + version + "/" + version + ".json",
            launch = ['-Xmn128m', '-Xmx' + xmx, '-Dcheck=' + code],
            mine = JSON.parse(fs.readFileSync(jsonfile, "utf-8")),
            length = mine.libraries.length, classpath = '';
        while (--length) {
            let path = libpath(gamedir, mine.libraries[length]);
            if (path == 'error') {
                return ['error'];
            } else {
                classpath += path;
            }
        }
        // if null ???
        if (mine.jar != null && mine.jar.endsWith('.jar')) {
            classpath += gamedir + '/versions/' + mine.jar + '/' + mine.jar;
        } else {
            classpath += gamedir + '/versions/' + mine.id + '/' + mine.id + '.jar';
        }
        launch.push('-Djava.library.path=' + jsonfile.replace('.json', '-natives'));
        launch.push('-cp', classpath);
        launch.push(mine.mainClass);
        launch.push('--uuid', uuid);
        launch.push('--width', '854');
        launch.push('--height', '480');
        launch.push('--version', version);
        launch.push('--gameDir', gamedir);
        launch.push('--username', username);
        launch.push('--assetsDir', gamedir + '/assets');
        launch.push('--userType', 'Legacy');
        launch.push('--assetIndex', mine.assetIndex.id);
        launch.push('--accessToken', uuid);
        launch.push('--versionType', 'SoraClient');
        return launch;
    } catch (e) {
        console.log(e);
        return ['error'];
    }
};