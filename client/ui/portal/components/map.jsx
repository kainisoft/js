PoratlMap = React.createClass({
    propTypes: {
        objects: React.PropTypes.array.isRequired,
        options: React.PropTypes.object
    },

    mixins: [ReactMeteorData],

    componentDidMount() {
        GoogleMaps.load();
    },

    getMeteorData() {
        return {
            loaded: GoogleMaps.loaded(),
            mapOptions: GoogleMaps.loaded() && this._mapOptions()
        };
    },

    _mapOptions() {
        return {
            center: new google.maps.LatLng(42.8581463, 74.5701263),
            zoom: 15
        };
    },

    render() {
        if ( this.data.loaded ) {
            return (<GoogleMap name="mymap" markers={this.props.objects} options={this.data.mapOptions} />);
        }

        return <div>Loading map...</div>
    }
});

GoogleMap = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        markers: React.PropTypes.array.isRequired,
        options: React.PropTypes.object.isRequired
    },

    componentDidMount() {
        GoogleMaps.create({
            name: this.props.name,
            element: ReactDOM.findDOMNode(this),
            options: this.props.options
        });

        if ( this.props.markers.length !== 0 ) {
            GoogleMaps.ready(this.props.name, function( map ) {
                this.props.markers.forEach(( marker ) => {
                    new google.maps.Marker({
                        position: new google.maps.LatLng(marker.latitude, marker.longitude),
                        map: map.instance
                    });
                });
            }.bind(this));
        }
    },

    render() {
        var style = {
            width: 800,
            height: 500
        };

        return <div style={style} className="map-container well"></div>
    }
});