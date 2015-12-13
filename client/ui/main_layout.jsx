/**
 * Main layout
 */
MainLayout = React.createClass({
    render() {
        return (
            <div>
                <Navigation />
                <main className="container">{this.props.content}</main>
            </div>
        )
    }
});
