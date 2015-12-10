var authRoutes = FlowRouter.group({
    prefix: '/map',
    triggersEnter: [( context, redirect ) => {
        if ( !Meteor.userId() ) {
            redirect('auth')
        }
    }]
});

authRoutes.route('/', {
    name: 'home',
    action() {
        ReactLayout.render(MainLayout, {content: <ObjectCtrl />});
    }
});

authRoutes.route('/portal', {
    name: 'portal',
    action() {
        ReactLayout.render(MainLayout, {content: <Portal />});
    }
});

FlowRouter.route('/auth', {
    name: 'auth',
    action() {
        ReactLayout.render(MainLayout, {content: <AuthCtrl />});
    }
});

FlowRouter.notFound = {
    action() {
        FlowRouter.go('home')
    }
};
