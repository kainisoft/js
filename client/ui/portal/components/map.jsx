/**
 * Portal map component
 */
PoratlMap = React.createClass({
    propTypes: {
        objects: React.PropTypes.array.isRequired,
        options: React.PropTypes.object
    },

    mixins: [ReactMeteorData],


    getInitialState() {
        return {
            objectItem: new MapObject()
        }
    },

    componentDidMount() {
        // Load google map after attach component on page
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

    /**
     * Marker or map click handler
     * @param objectItem
     */
    onObjectItemEditClick( objectItem ) {
        this.setState({objectItem});
        $('#createObject').modal('show');
    },

    /**
     * Map click handler. Add new object
     */
    onAddNewObjectClick() {
        this.onObjectItemEditClick(new MapObject());
    },

    /**
     * Map click handler. Add new object
     * @param mapModel
     */
    mapClickHandler( mapModel ) {
        var objectItem = new MapObject();
        objectItem.set('latitude', mapModel.latLng.lat());
        objectItem.set('longitude', mapModel.latLng.lng());
        this.onObjectItemEditClick(objectItem);
    },

    /**
     * Marker click handler
     * @param id
     */
    markerClickHandler( id ) {
        var objectItem = Objects.findOne(id);
        this.onObjectItemEditClick(objectItem);
    },

    /**
     * Marker move handler. Set new position
     * @param id
     * @param lat
     * @param lng
     */
    markerMovedHandler( id, lat, lng ) {
        var objectItem = Objects.findOne(id);
        objectItem.set('latitude', lat);
        objectItem.set('longitude', lng);
        Meteor.call('addObject', objectItem);
    },

    render() {
        if ( this.data.loaded ) {
            return (<div>
                <GoogleMap
                    name="mymap"
                    markers={this.props.objects}
                    options={this.data.mapOptions}
                    mapClickHandler={this.mapClickHandler}
                    markerClickHandler={this.markerClickHandler}
                    markerMovedHandler={this.markerMovedHandler}
                />
                    <div id="createObject" className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div className="modal-dialog modal-lg" role="document">
                            <CreateObject objectItem={this.state.objectItem}/>
                        </div>
                    </div>
                </div>
            );
        }

        return <div>Loading map...</div>
    }
});

/**
 * Map component
 */
GoogleMap = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        markers: React.PropTypes.array.isRequired,
        options: React.PropTypes.object.isRequired,
        mapClickHandler: React.PropTypes.func.isRequired,
        markerClickHandler: React.PropTypes.func.isRequired,
        markerMovedHandler: React.PropTypes.func.isRequired
    },

    componentDidMount() {
        // Prepare map after mount
        GoogleMaps.create({
            name: this.props.name,
            element: ReactDOM.findDOMNode(this),
            options: this.props.options
        });
        GoogleMaps.ready(this.props.name, function( map ) {
            this.addMarkers(map);
            this.fitBounds();
            map.instance.addListener('click', this.props.mapClickHandler);
        }.bind(this));
    },

    addMarkers( map ) {
        if ( this.props.markers.length === 0 ) {
            return;
        }

        var cmp = this;
        this._markers || (this._markers = []);
        this._markers.forEach(( marker ) => {
            marker.setMap(null);
        });
        this._markers = [];

        this.props.markers.forEach(( marker ) => {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(marker.latitude, marker.longitude),
                map: map.instance,
                draggable: true,
                id: marker._id,
                icon: '/asset/img/' + marker.type + '.png'
            });

            google.maps.event.addListener(marker, 'click', function() {
                cmp.props.markerClickHandler(this.id);
            });
            google.maps.event.addListener(marker, 'dragend', function( mapModel ) {
                cmp.props.markerMovedHandler(this.id, mapModel.latLng.lat(), mapModel.latLng.lng());
            });
            cmp._markers.push(marker);
        });
    },

    fitBounds() {
        if ( !this._markers ) {
            return;
        }

        var bounds = new google.maps.LatLngBounds();
        this._markers.forEach((marker) => {
            bounds.extend(marker.getPosition());
        });
        GoogleMaps.get(this.props.name).instance.fitBounds(bounds);
    },

    render() {
        var style = {
            width: 800,
            height: 500
        };

        var map = GoogleMaps.get(this.props.name);

        if ( map ) {
            this.addMarkers(map);
        }

        return <div style={style} className="map-container well"></div>;
    }
});
