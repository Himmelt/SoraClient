/*******************************************************************************
 * Created by Himmelt on 2016/8/6.
 * Copyright (c) 2015-2016. Himmelt All rights reserved.
 * https://opensource.org/licenses/MIT
 ******************************************************************************/

const React = require('react');
const ReactDOM = require('react-dom');
const { Row, Col } = require('antd');
const MenuBar = require('./menubar');
const TopBar = require('./topbar');
const Container = require('./container');
const fs = require('fs');
const marked = require('marked');

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
                parent.setState({ mark: marked(data) });
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