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
                <Carousel className="slider">
                    <div><img src="http://usr.im/600x400?text=幻灯片01"/></div>
                    <div><img src="http://usr.im/600x400?text=幻灯片02"/></div>
                    <div><img src="http://usr.im/600x400?text=幻灯片03"/></div>
                    <div><img src="http://usr.im/600x400?text=幻灯片04"/></div>
                </Carousel>
                <Button onClick={this.handleClick}>
                    启动
                </Button>
                <Button onClick={this.handleClose}>
                    结束
                </Button>
                <p style={{fontSize: 20}}>
                    wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
                </p>
            </div>
        )
    }
}

module.exports = Component;
