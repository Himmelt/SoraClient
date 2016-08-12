/*******************************************************************************
 * Created by Himmelt on 2016/8/5.
 * Copyright (c) 2015-2016. Himmelt All rights reserved.
 * https://opensource.org/licenses/MIT
 ******************************************************************************/

'use strict';

const electron = require('electron');
const execFile = require('child_process').execFile;
const minemc = require('./assets/js/minemc');

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
        mine = execFile('javaw.exe', minemc.launch('minecraft/.minecraft', 'Him',
            '14233482b8dbad97617757a5c31d5872', '1.10.2', '2048m', 'qwq'));
        isRunning = true;
        console.log('mine:', mine.spawnargs);
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