Navigation = React.createClass({
    logOut(){
        Meteor.logout(function() {
            FlowRouter.go('/auth');
        });
    },
    render() {
        if ( Meteor.user() ) {
            return (
                <nav className="navbar navbar-default navbar-static-top" role="navigation">
                    <div className="container">
                        <div className="container-fluid">
                            <div className="collapse navbar-collapse">
                                <ul className="nav navbar-nav">
                                    <li><a href="/">Объекты</a></li>
                                    <li><a href="/">Геопортал</a></li>
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="javascript://" onClick={this.logOut}>Выйти</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            )
        } else {
            return (<div className="hidden"></div>)
        }
    }
});