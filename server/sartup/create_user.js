Meteor.startup(function () {

    // Hard code for creating a user. Never do this on production
    try {
        Accounts.createUser({username:'test', password:'test'});
    }
    catch ( error ) { /* Nothing */ }
});
