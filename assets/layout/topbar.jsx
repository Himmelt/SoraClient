const React = require('react');
const Col = require('antd/lib/col');
const Row = require('antd/lib/row');
const Button = require('antd/lib/button');
const ButtonGroup = Button.Group;
const ipcR = require('electron').ipcRenderer;

const Style =function () {
    this.topBar = {
        // height:50,
        background: require('../js/styles').index,
        WebkitAppRegion: 'drag'
    };
    this.logo = {
        maxWidth:150,
        maxHeight:this.topBar.height
    };
    this.btnGroup = {
        float: 'right',
        marginRight: 10
    }
};
const styles = new Style();

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
            <Row style={styles.topBar} type="flex" justify="space-between" align="middle">
                <img src="http://placehold.it/150x50"/>
                <div>Profile</div>
                <ButtonGroup style={styles.btnGroup}>
                    <Button icon="minus" onClick={this.handleMini}/>
                    <Button icon="pushpin" onClick={this.handleTray}/>
                    <Button icon="cross" onClick={this.handleClose}/>
                </ButtonGroup>
            </Row>
        )
    }
}

module.exports = TopBar;
