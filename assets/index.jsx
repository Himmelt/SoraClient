const React = require('react');
const ReactDOM = require('react-dom');
const Col = require('antd/lib/col');
const Row = require('antd/lib/row');
const MenuBar = require('./layout/menubar');
const TopBar = require('./layout/topbar');
const Container = require('./layout/container');
const fs = require('fs');
const ipcR = require('electron').ipcRenderer;
class Layout extends React.Component {
    constructor() {
        super();
        var parent = this;
        this.state = {mark: "loading", index: 1};
        this.handleMenu = this.handleMenu.bind(this);
        fs.readFile('./readme.md', 'utf-8', function (err, data) {
            if (err) {
                console.log(err, "read readme.md failed!");
                parent.setState({mark: "error:" + err})
            } else {
                parent.setState({mark: data})
            }
        })
    }

    handleMenu(key) {
        console.log("Fuck", key);
        this.setState({index: key});
    }

    render() {
        return (
            <div>
                <Row>
                    <TopBar/>
                </Row>
                <Row type="flex">
                    <Col>
                        <MenuBar onClick={this.handleMenu}/>
                    </Col>
                    <Col style={{color: 'red'}}>
                        <div>
                            <Container index={this.state.index}/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

ReactDOM.render(<Layout />, document.getElementById('root'));
