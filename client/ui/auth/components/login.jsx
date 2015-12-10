Login = React.createClass({
    onSubmit( event ) {
        event.preventDefault();

        var username = event.target.username.value;
        var password = event.target.password.value;

        Meteor.loginWithPassword(username, password, function( error ) {
            if ( error ) {
                alert(error.reason); // TODO user friendly
            } else {
                FlowRouter.go('home');
            }
        });
    },
    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="registerUsername" id="username" className="form-control" placeholder="Username" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="registerPassword" id="password" className="form-control" placeholder="Password" />
                        </div>
                        <input type="submit" value="Register" />
                    </form>
                </div>
            </div>
        )
    }
});
