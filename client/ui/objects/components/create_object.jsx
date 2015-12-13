/**
 * Create or edit object component
 */
CreateObject = React.createClass({
    propTypes: {
        objectItem: React.PropTypes.object
    },

    render(){
        return (
            <div className="col-lg-8">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <CreateObjectForm objectItem={this.props.objectItem} />
                    </div>
                </div>
            </div>
        )
    }
});

/**
 * Create or edit object form
 */
CreateObjectForm = React.createClass({
    getInitialState() {
        return {
            type: null,
            name: null,
            description: null,
            latitude: null,
            longitude: null,
            dangerLevel: null
        };
    },

    /**
     * Form submit handler
     * @param event
     */
    onSubmit( event ) {
        event.preventDefault();

        Meteor.call('addObject', this.props.objectItem, ( error ) => {
            if ( error ) {
                var errorMsg = []; // TODO make user friendly feedback
                Object.keys(error.reason).forEach(function( item ) {
                    errorMsg.push(error.reason[item]);
                });
                alert(errorMsg.join('\n'));
            } else {
                $('#createObject').modal('hide');
            }
        });
    },

    handleChange( event ) {
        this.props.objectItem.set(event.target.name, event.target.value);
        this.setState({[event.target.name]: event.target.value});
    },

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="object-type" className="col-sm-2 control-label">Тип</label>
                    <div className="col-sm-10">

                        {/* Render object types */}
                        <select value={this.props.objectItem.get('type')} name="type" onChange={this.handleChange} id="object-type" className="form-control col-xs-4">
                            {this.props.objectItem.getValidObjectTypes().reduce(( carry, item ) => {
                                carry.push(<option key={item} value={item}>{item}</option>);

                                return carry;
                            }, [<option key={null}>Выберите</option>])}
                        </select>

                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="object-name" className="col-sm-2 control-label">Название</label>
                    <div className="col-sm-10">
                        <input value={this.props.objectItem.get('name')} name="name" onChange={this.handleChange} id="object-name" type="text" className="form-control col-xs-4" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="object-description" className="col-sm-2 control-label">Описание</label>
                    <div className="col-sm-10">
                        <textarea value={this.props.objectItem.get('description')} name="description" onChange={this.handleChange} id="object-description" className="form-control col-xs-4"></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="object-location" className="col-sm-2 control-label">Местоположение</label>
                    <div>
                        <div className="col-xs-3">
                            <input value={this.props.objectItem.get('latitude')} name="latitude" onChange={this.handleChange} id="object-location-latitude" type="text" className="form-control" placeholder="Широта" />
                        </div>
                        <div className="col-xs-3">
                            <input value={this.props.objectItem.get('longitude')} name="longitude" onChange={this.handleChange} id="object-location-longitude" type="text" className="form-control" placeholder="Долгота" />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="object-danger-level" className="col-sm-2 control-label">Уровень опасности</label>
                    <div className="col-xs-2">
                        <input value={this.props.objectItem.dangerLevel} name="dangerLevel" onChange={this.handleChange} id="object-danger-level" type="text" className="form-control col-xs-4" placeholder="0-10" />
                    </div>
                </div>
                <div className="pull-right">
                    <input type="submit" value="Добавить" className="btn btn-lg btn-default" />
                </div>
            </form>
        )
    }
});
