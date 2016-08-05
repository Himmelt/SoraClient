/**
 * Created by Kami on 2016/4/18.
 */

function getJavaArgs(user,version,javax,code) {
    const gameDir = ".minecraft";
    var launch = "javaw -Xincgc -Xmn128m -Xmx"+javax+"m "+"-Dcheck="+code+" ",
        file = require("fs"),path = gameDir+"\\versions\\"+version+"\\"+version+".json";
    try{
        var mine = JSON.parse(file.readFileSync(path,"utf-8"));
        launch += "-Djava.library.path=\""+gameDir+"\\versions\\"+mine.id+"\\"+mine.id+"-natives\"" +
            " -Dfml.ignoreInvalidMinecraftCertificates=true -Dfml.ignorePatchDiscrepancies=true -cp \"";
        for (var i=0;i<mine.libraries.length;i++) {
            if (mine.libraries[i].natives == null) {
                launch += getLibsPath(mine.libraries[i].name);
            }
            else {
                //解压本地包
            }
        }
        if(mine.jar!=null && mine.jar != ""){
            launch += gameDir+"\\versions\\"+mine.jar+"\\"+mine.jar+".jar\" ";
        }
        else {
            launch += gameDir+"\\versions\\"+mine.id+"\\"+mine.id+".jar\" ";
        }
        launch += mine.mainClass += " ";
        var mcarg = mine.minecraftArguments
            .replace("${auth_player_name}",user)
            .replace("${version_name}", version)
            .replace("${game_directory}", "\""+gameDir+"\"")
            .replace("${game_assets}", "\""+gameDir+"\\assets\"")
            .replace("${assets_root}", "\""+gameDir+"\\assets\"")
            .replace("${user_type}", "Legacy")
            .replace("${assets_index_name}", mine.assets)
            .replace("${auth_uuid}","14233482b8dbad97617757a5c31d5872")
            .replace("${auth_access_token}","14233482b8dbad97617757a5c31d5872")
            .replace("${user_properties}", "{}");
        return launch + mcarg;
    }
    catch (exception){
        console.log(exception);
    }
}
function getLibsPath(lib) {
  var split = lib.split(':'),lib_path = ".minecraft\\libraries\\";//0 包; 1 名字; 2 版本
  if(split.length != 3){
    return "fuck";
  }
  lib_path += split[0].replace(/\./g,'\\');
  lib_path += "\\" + split[1] + "\\" + split[2] + "\\" + split[1] + "-" + split[2] + ".jar;";
  return lib_path;
}

exports.launch = function (user,version,javax,code) {
    var exec = require('child_process').exec;
    exec(getJavaArgs(user,version,javax,code),function (error) {
        if(error){
            console.log(error);
            alert(error);
        }
        else {
            console.log("success");
        }
    });
};