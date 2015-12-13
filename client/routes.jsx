// Routes only for authorized users
var authRoutes = FlowRouter.group({
    prefix: '/map',
    triggersEnter: [( context, redirect ) => {
        if ( !Meteor.userId() ) {
            redirect('auth')
        }
    }]
});

// Objects page (home page)
authRoutes.route('/', {
    name: 'home',
    action() {
        ReactLayout.render(MainLayout, {content: <ObjectCtrl />});
    }
});

// View objects on map
authRoutes.route('/portal', {
    name: 'portal',
    action() {
        ReactLayout.render(MainLayout, {content: <Portal />});
    }
});

// Authorization page
FlowRouter.route('/auth', {
    name: 'auth',
    action() {
        ReactLayout.render(MainLayout, {content: <AuthCtrl />});
    }
});

// If page not found redirect to authorization page
FlowRouter.notFound = {
    action() {
        FlowRouter.go('home')
    }
};
