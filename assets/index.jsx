const React = require('react');
const ReactDOM = require('react-dom');
const Layout = require('antd/lib/layout');
const Header = require('./layout/header');

const _style = function () {
    this.react = {
        height:'100%',
        borderStyle:'solid',
        borderColor:require('./style/global').index,
        borderWidth:'thin'
    };
    this.header = {
        height: 'initial',
        lineHeight: 'initial',
        padding: 5,
        background: require('./style/global').index,
        WebkitAppRegion: 'drag'
    };
}, styles = new _style();

class Component extends React.Component {
    render() {
        return (
            <Layout style={styles.react}>
                <Layout.Header style={styles.header}>
                    <Header/>
                </Layout.Header>
                <Layout>
                    <Layout.Sider>Sider</Layout.Sider>
                    <Layout>
                        <Layout.Content>Content</Layout.Content>
                        <Layout.Footer>Footer</Layout.Footer>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

ReactDOM.render(<Component />, document.getElementById('root'));
