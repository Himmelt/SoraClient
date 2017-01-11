const React = require('react');
const ReactDOM = require('react-dom');
const Col = require('antd/lib/col');
const Row = require('antd/lib/row');
const MenuBar = require('./layout/menubar');
const TopBar = require('./layout/topbar');
const Container = require('./layout/container');
const fs = require('fs');
const ipcR = require('electron').ipcRenderer;
const style = {
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderColor: require('./js/styles').index
};
class Layout extends React.Component {
    constructor() {
        super();
        this.state = {index: 1};
        this.handleMenu = this.handleMenu.bind(this);
    }

    handleMenu(key) {
        console.log("Fuck", key);
        this.setState({index: key});
    }

    render() {
        return (
            <div>
                <TopBar/>
                <Row type="flex">
                    <MenuBar fuckTest={this.handleMenu}/>
                    <Container index={this.state.index}/>
                </Row>
            </div>
        )
    }
}

ReactDOM.render(<Layout/>, document.getElementById('root'));
let body = document.getElementById('body');
body.style.borderStyle = style.borderStyle;
body.style.borderWidth = style.borderWidth;
body.style.borderColor = style.borderColor;
