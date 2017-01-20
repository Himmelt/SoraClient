const React = require('react');
const Game = require('./pages/game');
const Config = require('./pages/config');
const System = require('./pages/system');
const Guide = require('./pages/guide');
const Donate = require('./pages/donate');
const About = require('./pages/about');
const consts = require('../js/consts');

class Component extends React.Component {
    render() {
        let current = this.props.current;
        if (current == consts.pages.game) {
            return (<Game/>);
        } else if (current == consts.pages.config) {
            return (<Config/>);
        } else if (current == consts.pages.system) {
            return (<System/>);
        } else if (current == consts.pages.guide) {
            return (<Guide/>);
        } else if (current == consts.pages.donate) {
            return (<Donate/>);
        } else {
            return (<About/>);
        }
    }
}

module.exports = Component;
