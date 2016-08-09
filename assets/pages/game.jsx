/*******************************************************************************
 * Created by Himmelt on 2016/8/8.
 * Copyright (c) 2015-2016. Himmelt All rights reserved.
 * https://opensource.org/licenses/MIT
 ******************************************************************************/

const React = require('react');
const {Button} = require('antd');
const ipcR = require('electron').ipcRenderer;

class Component extends React.Component {
    constructor() {
        super();
    }

    handleClick() {
        ipcR.send('launch-game');
    }

    handleClose() {
        ipcR.send('launch-exit');
    }
    render() {
        return (
            <div>
                <Button onClick={this.handleClick}>
                    启动
                </Button>
                <Button onClick={this.handleClose}>
                    结束
                </Button>
            </div>
        )
    }
}

module.exports = Component;