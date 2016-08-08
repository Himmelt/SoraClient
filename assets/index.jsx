/*******************************************************************************
 * Created by Himmelt on 2016/8/6.
 * Copyright (c) 2015-2016. Himmelt All rights reserved.
 * https://opensource.org/licenses/MIT
 ******************************************************************************/

const React = require('react');
const ReactDOM = require('react-dom');
const {Row, Col} = require('antd');
const MenuBar = require('./menubar');
const TopBar = require('./topbar');
const fs = require('fs');
const marked = require('marked');

class Layout extends React.Component {
    constructor() {
        super();
        var parent = this;
        this.state = {mark: "loading", index: 1};
        fs.readFile('./readme.md', 'utf-8', function (err, data) {
            if (err) {
                console.log(err, "read readme.md failed!");
                parent.setState({mark: "error:" + err})
            } else {
                parent.setState({mark: marked(data)})
            }
        })
    }

    render() {
        return (
            <div>
                <Row>
                    <TopBar/>
                </Row>
                <Row>
                    <Col span={5}>
                        <MenuBar/>
                    </Col>
                    <Col span={19} style={{color: 'red'}}>
                        <div>Content</div>
                    </Col>
                </Row>
            </div>
        )
    }
}

ReactDOM.render(<Layout />, document.getElementById('root'));
