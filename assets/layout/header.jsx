const React = require('react');
const Row = require('antd/lib/row');
const Button = require('antd/lib/button');
const ipcR = require('electron').ipcRenderer;

const _style = function () {
    this.btn = {
        float: 'right',
        marginRight: 10
    }
}, styles = new _style();

class Component extends React.Component {
    render() {
        return (
            <Row type="flex" justify="space-between" align="middle">
                <img src="http://placehold.it/150x50"/>
                <div>Profile</div>
                <Button.Group style={styles.btn}>
                    <Button icon="minus" onClick={() => {
                        ipcR.send('app-mini')
                    }}/>
                    <Button icon="pushpin" onClick={() => {
                        ipcR.send('put-in-tray')
                    }}/>
                    <Button icon="cross" onClick={() => {
                        ipcR.send('app-close')
                    }}/>
                </Button.Group>
            </Row>
        )
    }
}

module.exports = Component;
