/*******************************************************************************
 * Created by Himmelt on 2016/8/7.
 * Copyright (c) 2015-2016. Himmelt All rights reserved.
 * https://opensource.org/licenses/MIT
 ******************************************************************************/

const React = require('react');
const { Menu, Icon } = require('antd');
const SubMenu = Menu.SubMenu;

class MenuBar extends React.Component {
    constructor() {
        super();
        this.state = { current: '1' };
    }

    handleClick(e) {
        this.props.onClick(e.key);
        this.setState({
            current: e.key
        });
    }

    render() {
        return React.createElement(
            Menu,
            { onClick: e => this.handleClick(e),
                style: { width: "200px" },
                defaultOpenKeys: ['game'],
                selectedKeys: [this.state.current],
                mode: 'inline'
            },
            React.createElement(
                SubMenu,
                { key: 'game', title: React.createElement(
                        'span',
                        null,
                        React.createElement(Icon, { type: 'mail' }),
                        React.createElement(
                            'span',
                            null,
                            '\u767B\u9646'
                        )
                    ) },
                React.createElement(
                    Menu.Item,
                    { key: '1' },
                    '\u670D\u52A1\u56681'
                ),
                React.createElement(
                    Menu.Item,
                    { key: '2' },
                    '\u670D\u52A1\u56682'
                )
            ),
            React.createElement(
                SubMenu,
                { key: 'config', title: React.createElement(
                        'span',
                        null,
                        React.createElement(Icon, { type: 'appstore' }),
                        React.createElement(
                            'span',
                            null,
                            '\u6E38\u620F\u914D\u7F6E'
                        )
                    ) },
                React.createElement(
                    Menu.Item,
                    { key: '3' },
                    '\u8BBE\u7F6E1'
                ),
                React.createElement(
                    Menu.Item,
                    { key: '4' },
                    '\u8BBE\u7F6E2'
                )
            ),
            React.createElement(
                SubMenu,
                { key: 'system', title: React.createElement(
                        'span',
                        null,
                        React.createElement(Icon, { type: 'setting' }),
                        React.createElement(
                            'span',
                            null,
                            '\u7CFB\u7EDF\u914D\u7F6E'
                        )
                    ) },
                React.createElement(
                    Menu.Item,
                    { key: '5' },
                    '\u7CFB\u7EDF\u8BBE\u7F6E'
                )
            ),
            React.createElement(
                SubMenu,
                { key: 'guide', title: React.createElement(
                        'span',
                        null,
                        React.createElement(Icon, { type: 'setting' }),
                        React.createElement(
                            'span',
                            null,
                            '\u5173\u4E8E\u7A7A\u5883'
                        )
                    ) },
                React.createElement(
                    Menu.Item,
                    { key: '6' },
                    '\u670D \u89C4'
                ),
                React.createElement(
                    Menu.Item,
                    { key: '7' },
                    '\u57FA\u672C\u77E5\u8BC6'
                )
            ),
            React.createElement(
                SubMenu,
                { key: 'donate', title: React.createElement(
                        'span',
                        null,
                        React.createElement(Icon, { type: 'setting' }),
                        React.createElement(
                            'span',
                            null,
                            '\u8D5E\u52A9\u5217\u8868'
                        )
                    ) },
                React.createElement(
                    Menu.Item,
                    { key: '8' },
                    '\u8D5E\u52A9'
                )
            ),
            React.createElement(
                SubMenu,
                { key: 'about', title: React.createElement(
                        'span',
                        null,
                        React.createElement(Icon, { type: 'setting' }),
                        React.createElement(
                            'span',
                            null,
                            '\u5173\u4E8E\u8F6F\u4EF6'
                        )
                    ) },
                React.createElement(
                    Menu.Item,
                    { key: '9' },
                    '\u5173\u4E8E'
                )
            )
        );
    }
}

module.exports = MenuBar;

//# sourceMappingURL=menubar.js.map