/*******************************************************************************
 * Created by Himmelt on 2016/8/7.
 * Copyright (c) 2015-2016. Himmelt All rights reserved.
 * https://opensource.org/licenses/MIT
 ******************************************************************************/

const React = require('react');
const {Menu, Icon} = require('antd');
const SubMenu = Menu.SubMenu;

class MenuBar extends React.Component {
    constructor() {
        super();
        console.log('init', this);
        this.state = {current: '1'};
    }

    handleClick(e) {
        this.setState({
            current: e.key
        });
    }

    render() {
        return React.createElement(
            Menu,
            {
                onClick: e => this.handleClick(e),
                style: {width: "100%"},
                defaultOpenKeys: ['game'],
                selectedKeys: [this.state.current],
                mode: 'inline'
            },
            React.createElement(
                SubMenu,
                {
                    key: 'game', title: React.createElement(
                    'span',
                    null,
                    React.createElement(Icon, {type: 'mail'}),
                    React.createElement(
                        'span',
                        null,
                        '登陆'
                    )
                )
                },
                React.createElement(
                    Menu.Item,
                    {key: '1'},
                    '服务器1'
                ),
                React.createElement(
                    Menu.Item,
                    {key: '2'},
                    '服务器2'
                )
            ),
            React.createElement(
                SubMenu,
                {
                    key: 'config', title: React.createElement(
                    'span',
                    null,
                    React.createElement(Icon, {type: 'appstore'}),
                    React.createElement(
                        'span',
                        null,
                        '游戏配置'
                    )
                )
                },
                React.createElement(
                    Menu.Item,
                    {key: '3'},
                    '设置1'
                ),
                React.createElement(
                    Menu.Item,
                    {key: '4'},
                    '设置2'
                )
            ),
            React.createElement(
                SubMenu,
                {
                    key: 'system', title: React.createElement(
                    'span',
                    null,
                    React.createElement(Icon, {type: 'setting'}),
                    React.createElement(
                        'span',
                        null,
                        '系统配置'
                    )
                )
                },
                React.createElement(
                    Menu.Item,
                    {key: '5'},
                    '系统设置'
                )
            ),
            React.createElement(
                SubMenu,
                {
                    key: 'guide', title: React.createElement(
                    'span',
                    null,
                    React.createElement(Icon, {type: 'setting'}),
                    React.createElement(
                        'span',
                        null,
                        '关于空境'
                    )
                )
                },
                React.createElement(
                    Menu.Item,
                    {key: '6'},
                    '服 规'
                ),
                React.createElement(
                    Menu.Item,
                    {key: '7'},
                    '基本知识'
                )
            ),
            React.createElement(
                SubMenu,
                {
                    key: 'donate', title: React.createElement(
                    'span',
                    null,
                    React.createElement(Icon, {type: 'setting'}),
                    React.createElement(
                        'span',
                        null,
                        '赞助列表'
                    )
                )
                },
                React.createElement(
                    Menu.Item,
                    {key: '8'},
                    '赞助'
                )
            ),
            React.createElement(
                SubMenu,
                {
                    key: 'about', title: React.createElement(
                    'span',
                    null,
                    React.createElement(Icon, {type: 'setting'}),
                    React.createElement(
                        'span',
                        null,
                        '关于软件'
                    )
                )
                },
                React.createElement(
                    Menu.Item,
                    {key: '9'},
                    '关于'
                )
            )
        );
    }
}

module.exports = MenuBar;

//# sourceMappingURL=menubar.js.map