const React = require('react');
const ReactDOM = require('react-dom');
const { Row, Col } = require('antd');
const MenuBar = require('./layout/menubar');
const TopBar = require('./layout/topbar');
const Container = require('./layout/container');
const fs = require('fs');
const ipcR = require('electron').ipcRenderer;

class Layout extends React.Component {
    constructor() {
        super();
        var parent = this;
        this.state = { mark: "loading", index: 1 };
        this.handleMenu = this.handleMenu.bind(this);
        fs.readFile('./readme.md', 'utf-8', function (err, data) {
            if (err) {
                console.log(err, "read readme.md failed!");
                parent.setState({ mark: "error:" + err });
            } else {
                parent.setState({ mark: data });
            }
        });
    }

    handleMenu(key) {
        console.log("Fuck", key);
        this.setState({ index: key });
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                Row,
                null,
                React.createElement(TopBar, null)
            ),
            React.createElement(
                Row,
                { type: 'flex' },
                React.createElement(
                    Col,
                    null,
                    React.createElement(MenuBar, { onClick: this.handleMenu })
                ),
                React.createElement(
                    Col,
                    { style: { color: 'red' } },
                    React.createElement(
                        'div',
                        null,
                        React.createElement(Container, { index: this.state.index })
                    )
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(Layout, null), document.getElementById('root'));

//# sourceMappingURL=index.js.map