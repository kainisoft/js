var authRoutes = FlowRouter.group({
    prefix: '/',
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
    'portal',
    action() {

    }
});

FlowRouter.route('/auth', {
    name: 'auth',
    action() {
        ReactLayout.render(MainLayout, {content: <AuthCtrl />});
    }
});
