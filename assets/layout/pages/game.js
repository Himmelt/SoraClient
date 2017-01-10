/*******************************************************************************
 * Created by Himmelt on 2016/8/8.
 * Copyright (c) 2015-2016. Himmelt All rights reserved.
 * https://opensource.org/licenses/MIT
 ******************************************************************************/

const React = require('react');
const { Button } = require('antd');
const ipcR = require('electron').ipcRenderer;

class Component extends React.Component {
    constructor() {
        super();
    }

    handleClick() {
        // ipcR.send('launch-game');
        console.log(global.config);
    }

    handleClose() {
        ipcR.send('launch-exit');
    }
    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                Button,
                { onClick: this.handleClick },
                '\u542F\u52A8'
            ),
            React.createElement(
                Button,
                { onClick: this.handleClose },
                '\u7ED3\u675F'
            )
        );
    }
}

module.exports = Component;

//# sourceMappingURL=game.js.map