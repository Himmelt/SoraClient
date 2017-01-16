const React = require('react');
const Game = require('./pages/game');
const Config = require('./pages/config');
const System = require('./pages/system');
const Guide = require('./pages/guide');
const Donate = require('./pages/donate');
const About = require('./pages/about');

class Component extends React.Component {
    constructor() {
        super();
    }

    render() {
        let index = this.props.index;
        if (index == 1) {
            return (<Game/>);
        } else if (index == 2) {
            return (<Config/>);
        } else if (index == 3) {
            return (<System/>);
        } else if (index == 4) {
            return (<Guide/>);
        } else if (index == 5) {
            return (<Donate/>);
        } else {
            return (<About/>);
        }
    }
}

module.exports = Component;
