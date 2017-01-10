/*******************************************************************************
 * Created by Himmelt on 2016/8/8.
 * Copyright (c) 2015-2016. Himmelt All rights reserved.
 * https://opensource.org/licenses/MIT
 ******************************************************************************/

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
            return React.createElement(Game, null);
        } else if (index == 2) {
            return React.createElement(Config, null);
        } else if (index == 3) {
            return React.createElement(System, null);
        } else if (index == 4) {
            return React.createElement(Guide, null);
        } else if (index == 5) {
            return React.createElement(Donate, null);
        } else {
            return React.createElement(About, null);
        }
    }
}

module.exports = Component;

//# sourceMappingURL=container.js.map