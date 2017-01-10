const React = require('react');
const Col = require('antd/lib/col');
const Row = require('antd/lib/row');
const Button = require('antd/lib/button');
const ButtonGroup = Button.Group;
const ipcR = require('electron').ipcRenderer;

class TopBar extends React.Component {
    constructor() {
        super();
    }

    handleClose() {
        ipcR.send('app-close');
    }

    handleTray() {
        ipcR.send('put-in-tray');
    }

    handleMini() {
        ipcR.send('app-mini');
    }

    render() {
        return (
            <div className="top-bar">
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={4}>
                        <div>Logo</div>
                    </Col>
                    <Col span={16}>
                        <div>Profile</div>
                    </Col>
                    <Col span={4}>
                        <div>
                            <ButtonGroup>
                                <Button icon="minus" onClick={this.handleMini}/>
                                <Button icon="pushpin" onClick={this.handleTray}/>
                                <Button icon="cross" onClick={this.handleClose}/>
                            </ButtonGroup>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

module.exports = TopBar;
