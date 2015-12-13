Meteor.publish('objects', () => {
    return Objects.find({});
});

Meteor.publish('objectsByFilter', ( filter ) => {
    return Objects.find({
        type: {$in: filter}
    });
});

Objects.allow({
    insert: ( userId, doc ) => {
        return !!userId;
    },
    update: ( userId, doc ) => {
        return !!userId;
    }
});

Meteor.methods({
    addObject( object ) {
        if ( object.validate() ) {
            object.save();

            return object;
        }

        object.throwValidationException();
    }
});
