(function( $, logic )
{'use strict';

    this.document.addEventListener('DOMContentLoaded', function()
    {
        logic.call(this, $)
    }.bind(this));
}.call(window, jQuery, function( $, ud )
{'use strict';

	var root = this;

    function extend( d, b )
    {
        d.prototype = Object.create(b.prototype);
        d.prototype.constructor = d;
    }

    function bind( context )
    {
        return function( f )
        {
            return function()
            {
                return f.apply(this, arguments);
            }.bind(context);
        };
    }

    function foreach( arr, f, context )
    {
        if ( Array.isArray(arr) )
        {
            arr.forEach(f, context);
        }
        else
        {
            [].forEach.call(arr, f, context);
        }
    }
}));
