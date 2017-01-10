const React = require('react');
const Button = require('antd/lib/button');
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
