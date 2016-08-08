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
        return React.createElement(
            'div',
            {className: 'top-bar'},
            React.createElement(
                Row,
                {type: 'flex', justify: 'space-around', align: 'middle'},
                React.createElement(
                    Col,
                    {span: 4},
                    React.createElement(
                        'div',
                        null,
                        'Logo'
                    )
                ),
                React.createElement(
                    Col,
                    {span: 16},
                    React.createElement(
                        'div',
                        null,
                        'Profile'
                    )
                ),
                React.createElement(
                    Col,
                    {span: 4},
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            ButtonGroup,
                            null,
                            React.createElement(Button, {icon: 'minus', onClick: this.handleMini}),
                            React.createElement(Button, {icon: 'pushpin', onClick: this.handleTray}),
                            React.createElement(Button, {icon: 'cross', onClick: this.handleClose})
                        )
                    )
                )
            )
        );
    }
}

module.exports = TopBar;

//# sourceMappingURL=topbar.js.map