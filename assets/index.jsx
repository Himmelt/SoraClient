const React = require('react');
const ReactDOM = require('react-dom');
const Layout = require('antd/lib/layout');
const {Header, Sider, Content, Footer} = Layout;
const consts = require('./js/consts');
const _Title = require('./layout/_title');
const _Menu = require('./layout/_menu');
const _Page = require('./layout/_page');
const _style = function () {
    this.react = {
        height: '100%',
        borderStyle: 'solid',
        borderColor: require('./style/global').index,
        borderWidth: 'thin'
    };
    this.header = {
        height: 'initial',
        lineHeight: 'initial',
        padding: 5,
        background: require('./style/global').index,
        WebkitAppRegion: 'drag'
    };
    this.footer = {
        WebkitAppRegion: 'drag'
    }
}, styles = new _style();

class Component extends React.Component {
    constructor() {
        super();
        this.state = {current: consts.pages.game}
    }

    render() {
        return (
            <Layout style={styles.react}>
                <Header style={styles.header}>
                    <_Title/>
                </Header>
                <Layout>
                    <Sider collapsible>
                        <_Menu onClick={key => {
                            this.setState({current: key})
                        }}/>
                    </Sider>
                    <Layout>
                        <Content>
                            <_Page current={this.state.current}/>
                        </Content>
                        <Footer style={styles.footer}>
                            <div style={{textAlign: 'center'}}>
                                <span>SoraWorld ©2017, Designed by Himmelt.</span>
                            </div>
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

ReactDOM.render(<Component />, document.getElementById('root'));
