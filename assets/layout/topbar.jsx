/*******************************************************************************
 * Created by Himmelt on 2016/8/7.
 * Copyright (c) 2015-2016. Himmelt All rights reserved.
 * https://opensource.org/licenses/MIT
 ******************************************************************************/

const React = require('react');
const {Button, Row, Col} = require('antd');
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