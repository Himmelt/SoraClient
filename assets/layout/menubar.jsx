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
        this.state = {current: '1'};
    }

    handleClick(e) {
        this.props.onClick(e.key);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Menu onClick={e=>this.handleClick(e)}
                  style={{width: "200px"}}
                  defaultOpenKeys={['game']}
                  selectedKeys={[this.state.current]}
                  mode="inline"
            >
                <SubMenu key="game" title={<span><Icon type="mail"/><span>登陆</span></span>}>
                    <Menu.Item key="1">服务器1</Menu.Item>
                    <Menu.Item key="2">服务器2</Menu.Item>
                </SubMenu>
                <SubMenu key="config" title={<span><Icon type="appstore"/><span>游戏配置</span></span>}>
                    <Menu.Item key="3">设置1</Menu.Item>
                    <Menu.Item key="4">设置2</Menu.Item>
                </SubMenu>
                <SubMenu key="system" title={<span><Icon type="setting"/><span>系统配置</span></span>}>
                    <Menu.Item key="5">系统设置</Menu.Item>
                </SubMenu>
                <SubMenu key="guide" title={<span><Icon type="setting"/><span>关于空境</span></span>}>
                    <Menu.Item key="6">服 规</Menu.Item>
                    <Menu.Item key="7">基本知识</Menu.Item>
                </SubMenu>
                <SubMenu key="donate" title={<span><Icon type="setting"/><span>赞助列表</span></span>}>
                    <Menu.Item key="8">赞助</Menu.Item>
                </SubMenu>
                <SubMenu key="about" title={<span><Icon type="setting"/><span>关于软件</span></span>}>
                    <Menu.Item key="9">关于</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

module.exports = MenuBar;