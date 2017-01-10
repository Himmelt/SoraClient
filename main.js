'use strict';

const electron = require('electron');
const execFile = require('child_process').execFile;
const minemc = require('./assets/js/minecraft');
const Config = require('./assets/js/config').Config;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// 进程通讯
const ipcMain = electron.ipcMain;
// 系统托盘
const Tray = electron.Tray;
const Menu = electron.Menu;
// 对窗口对象使用全局引用,否则窗口会随着js的内存回收而关闭.
let mainWindow;
let config = new Config(app.getPath('userData')+"\\config.json");

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800, height: 600,
        transparent: false,
        frame: false,
        backgroundColor: '#ffffff',
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/assets/index.html`);
    // mainWindow.on('resize',()=>{});
    // mainWindow.on('move',()=>{});
    // mainWindow.on('maximize',()=>{});
    // mainWindow.on('unmaximize',()=>{});
    // mainWindow.on('minimize',()=>{});
    // mainWindow.on('restore',()=>{});
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.webContents.openDevTools();
    });
});
app.on('window-all-closed', () => {
    // 对于OS X系统,应用和相应的菜单栏会一直激活直到用户通过Cmd + Q显式退出
    if (process.platform !== 'darwin') {
        if (appTray) appTray.destroy();
        app.quit();
    }
});
app.on('activate', () => {
    // 对于OS X系统,当dock图标被点击后会重新创建一个app窗口,并且不会有其他窗口打开
    if (mainWindow === null) {
        createWindow();
    }
});
app.on('quit', () => {
    config.save();
});

// 在这里可以继续应用的主要程序代码,也可以放置于单独文件中,在此 require 即可.
let appTray = null;
let isRunning = false;
let mine;

// 进程通讯监听
ipcMain.on('put-in-tray', (event) => {
    if (appTray) return;
    appTray = new Tray('app-icon.png');
    const contextMenu = Menu.buildFromTemplate([{
        label: 'Remove',
        click: function () {
            event.sender.send('tray-removed');
            appTray.destroy()
        }
    }]);
    appTray.setToolTip('Electron Demo in the tray.');
    appTray.setContextMenu(contextMenu)
});
ipcMain.on('remove-tray', () => {
    appTray.destroy()
});
ipcMain.on('app-close', () => {
    app.quit();
});
ipcMain.on('app-mini', () => {
    BrowserWindow.getFocusedWindow().minimize();
});
ipcMain.on('launch-game', () => {
    if (!isRunning) {
        console.log('run');
        mine = execFile('javaw.exe', minemc.launch('minecraft/.minecraft', 'Him',
            '14233482b8dbad97617757a5c31d5872', '1.10.2', '2048m', 'qwq'));
        isRunning = true;
        console.log('mine:', mine.spawnargs);
        mine.on('exit', (code) => {
            console.log('exit!!!!', code);
            isRunning = false;
        });
    }
});
ipcMain.on('launch-exit', () => {
    console.log('kill???');
    //mine.kill();
});
ipcMain.on('config', (event, args) => {
});
