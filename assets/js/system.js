const process = require('child_process');
const HCU_SHELL = `"HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Shell Folders"`;
function parseValue(result) {
    let index = result.indexOf('REG_SZ');
    result = result.substr(index + 10);
    index = result.indexOf('\n');
    result = result.substr(0, index - 1);
    return result;
}

exports.desktop = parseValue(process.execSync(`REG QUERY ` + HCU_SHELL + ` /v Desktop`, {encoding: 'utf-8'}));
exports.document = parseValue(process.execSync(`REG QUERY ` + HCU_SHELL + ` /v Personal`, {encoding: 'utf-8'}));
exports.roaming = parseValue(process.execSync(`REG QUERY ` + HCU_SHELL + ` /v AppData`, {encoding: 'utf-8'}));
exports.local = parseValue(process.execSync(`REG QUERY ` + HCU_SHELL + ` /v "Local AppData"`, {encoding: 'utf-8'}));
