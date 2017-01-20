const React = require('react');
const Menu = require('antd/lib/menu');
const Icon = require('antd/lib/icon');
const consts = require('../js/consts');

class Component extends React.Component {
    constructor() {
        super();
        this.state = {current: consts.pages.game};
    }

    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[consts.pages.game]} onClick={e => {
                this.props.onClick(e.key, e.key == this.state.current);
                this.state.current = e.key;
            }}>
                <Menu.Item key={consts.pages.game}>
                    <Icon type="user"/>
                    <span className="nav-text">Game</span>
                </Menu.Item>
                <Menu.Item key={consts.pages.config}>
                    <Icon type="video-camera"/>
                    <span className="nav-text">Config</span>
                </Menu.Item>
                <Menu.Item key={consts.pages.system}>
                    <Icon type="upload"/>
                    <span className="nav-text">System</span>
                </Menu.Item>
                <Menu.Item key={consts.pages.guide}>
                    <Icon type="user"/>
                    <span className="nav-text">Guide</span>
                </Menu.Item>
                <Menu.Item key={consts.pages.donate}>
                    <Icon type="heart-o"/>
                    <span className="nav-text">Donate</span>
                </Menu.Item>
                <Menu.Item key={consts.pages.about}>
                    <Icon type="team"/>
                    <span className="nav-text">About</span>
                </Menu.Item>
            </Menu>
        );
    }
}

module.exports = Component;
