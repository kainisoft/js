Meteor.publish('objects', function() {
    return Objects.find({});
});

Objects.allow({
    insert: function( userId, doc ) {
        return !!userId;
    }
});

Meteor.methods({
    addObject( object ){
        if ( object.validate() ) {
            object.save();

            return object;
        }

        object.throwValidationException();
    }
});
