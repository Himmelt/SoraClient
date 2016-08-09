/*******************************************************************************
 * Created by Himmelt on 2016/8/5.
 * Copyright (c) 2015-2016. Himmelt All rights reserved.
 * https://opensource.org/licenses/MIT
 ******************************************************************************/

'use strict';

const electron = require('electron');
const execFile = require('child_process').execFile;

// 应用程序生命周期控制模块
const app = electron.app;
// 本地浏览器窗口创建模块
const BrowserWindow = electron.BrowserWindow;
// 进程通讯
const ipcMain = electron.ipcMain;
// 系统托盘
const Tray = electron.Tray;
const Menu = electron.Menu;
// 对窗口对象使用全局引用,否则窗口会随着js的内存回收而关闭.
let mainWindow;

function createWindow() {
    // 创建浏览器窗口
    mainWindow = new BrowserWindow({
        width: 800, height: 600,
        transparent: false,
        frame: false,
        backgroundColor: '#c2efa4'
    });

    // 加载 index.html
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // 打开调试工具
    // mainWindow.webContents.openDevTools();

    // 窗口关闭时触发
    mainWindow.on('closed', () => {
        // 间接引用 window 对象. 如果你的应用支持多窗口,并存储在一个数组中,
        // 当你删除对应的窗口时,该程序被触发.
        mainWindow = null;
    });
}

// 初始化完毕,准备创建窗口时触发,某些API只能在该事件发生后使用.
app.on('ready', createWindow);

// 退出,当所有窗口都被关闭时触发.
app.on('window-all-closed', () => {
    // 对于OS X系统,应用和相应的菜单栏会一直激活直到用户通过Cmd + Q显式退出
    if (process.platform !== 'darwin') {
        if (appIcon) appIcon.destroy();
        app.quit();
    }
});

// 激活时触发
app.on('activate', () => {
    // 对于OS X系统,当dock图标被点击后会重新创建一个app窗口,并且不会有其他窗口打开
    if (mainWindow === null) {
        createWindow();
    }
});

// 在这里可以继续应用的主要程序代码,也可以放置于单独文件中,在此 require 即可.
let appIcon = null;
let isRunning = false;
let mine;
let launch = [
    '-XX:HeapDumpPath=MojangTricksIntelDriversForPerformance_javaw.exe_minecraft.exe.heapdump',
    '-XX:+UseG1GC',
    '-XX:-UseAdaptiveSizePolicy',
    '-XX:-OmitStackTraceInFastThrow',
    '-Xmn128m',
    '-Xmx2048m',
    '-Djava.library.path=C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/versions/1.10.2/1.10.2-natives',
    '-Dfml.ignoreInvalidMinecraftCertificates=true',
    '-Dfml.ignorePatchDiscrepancies=true',
    '-cp',
    'C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/com/mojang/netty/1.6/netty-1.6.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/oshi-project/oshi-core/1.1/oshi-core-1.1.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/net/java/dev/jna/jna/3.4.0/jna-3.4.0.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/net/java/dev/jna/platform/3.4.0/platform-3.4.0.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/com/ibm/icu/icu4j-core-mojang/51.2/icu4j-core-mojang-51.2.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/net/sf/jopt-simple/jopt-simple/4.6/jopt-simple-4.6.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/com/paulscode/codecjorbis/20101023/codecjorbis-20101023.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/com/paulscode/codecwav/20101023/codecwav-20101023.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/com/paulscode/libraryjavasound/20101123/libraryjavasound-20101123.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/com/paulscode/librarylwjglopenal/20100824/librarylwjglopenal-20100824.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/com/paulscode/soundsystem/20120107/soundsystem-20120107.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/io/netty/netty-all/4.0.23.Final/netty-all-4.0.23.Final.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/com/google/guava/guava/17.0/guava-17.0.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/org/apache/commons/commons-lang3/3.3.2/commons-lang3-3.3.2.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/commons-io/commons-io/2.4/commons-io-2.4.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/commons-codec/commons-codec/1.9/commons-codec-1.9.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/net/java/jinput/jinput/2.0.5/jinput-2.0.5.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/net/java/jutils/jutils/1.0.0/jutils-1.0.0.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/com/google/code/gson/gson/2.2.4/gson-2.2.4.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/com/mojang/authlib/1.5.22/authlib-1.5.22.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/com/mojang/realms/1.9.3/realms-1.9.3.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/org/apache/commons/commons-compress/1.8.1/commons-compress-1.8.1.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/org/apache/httpcomponents/httpclient/4.3.3/httpclient-4.3.3.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/commons-logging/commons-logging/1.1.3/commons-logging-1.1.3.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/org/apache/httpcomponents/httpcore/4.3.2/httpcore-4.3.2.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/it/unimi/dsi/fastutil/7.0.12_mojang/fastutil-7.0.12_mojang.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/org/apache/logging/log4j/log4j-api/2.0-beta9/log4j-api-2.0-beta9.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/org/apache/logging/log4j/log4j-core/2.0-beta9/log4j-core-2.0-beta9.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/org/lwjgl/lwjgl/lwjgl/2.9.4-nightly-20150209/lwjgl-2.9.4-nightly-20150209.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/libraries/org/lwjgl/lwjgl/lwjgl_util/2.9.4-nightly-20150209/lwjgl_util-2.9.4-nightly-20150209.jar;C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/versions/1.10.2/1.10.2.jar',
    'net.minecraft.client.main.Main',
    '--username', 'Himmelt',
    '--version', 'HMCL',
    '--gameDir', 'C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft',
    '--assetsDir', 'C:/Users/Himmelt/Desktop/SoraClient/minecraft/.minecraft/assets',
    '--assetIndex', '1.10',
    '--uuid', '14233482b8dbad97617757a5c31d5872',
    '--accessToken', '14233482b8dbad97617757a5c31d5872',
    '--userType', 'Legacy',
    '--versionType', 'HMCL',
    '--height', '480',
    '--width', '854'
];
// 进程通讯监听
ipcMain.on('put-in-tray', (event)=> {
    appIcon = new Tray('app-icon.png');
    const contextMenu = Menu.buildFromTemplate([{
        label: 'Remove',
        click: function () {
            event.sender.send('tray-removed');
            appIcon.destroy()
        }
    }]);
    appIcon.setToolTip('Electron Demo in the tray.');
    appIcon.setContextMenu(contextMenu)
});
ipcMain.on('remove-tray', ()=> {
    appIcon.destroy()
});
ipcMain.on('app-close', ()=> {
    app.quit();
});
ipcMain.on('app-mini', ()=> {
    BrowserWindow.getFocusedWindow().minimize();
});
ipcMain.on('launch-game', ()=> {
    if (!isRunning) {
        console.log('run');
        mine = execFile('javaw.exe', launch);
        isRunning = true;
        console.log('mine-pid:', mine);
        mine.on('exit', (code)=> {
            console.log('exit!!!!', code);
            isRunning = false;
        });
    }
});
ipcMain.on('launch-exit', ()=> {
    console.log('kill???');
    mine.kill();
});
app.on('quit', (event, code)=> {
    console.log('exit???');
    mine.kill();
});