const React = require('react');
const Button = require('antd/lib/button');
const Carousel = require('antd/lib/carousel');
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
                <Carousel effect="fade">
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>
                <Button onClick={this.handleClick}>
                    启动
                </Button>
                <Button onClick={this.handleClose}>
                    结束
                </Button>
                <p style={{fontSize:20}}>
                    wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
                </p>
            </div>
        )
    }
}

module.exports = Component;
