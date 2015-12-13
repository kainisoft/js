/**
 * Object list component
 */
ObjectList = React.createClass({
    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            objectItem: new MapObject()
        }
    },

    getMeteorData() {
        return {
            objects: Objects.find({}).fetch()
        }
    },

    /**
     * Object item edit button click handler
     * @param objectItem
     */
    onObjectItemEditClick( objectItem ) {
        this.setState({objectItem});
        $('#createObject').modal('show');
    },

    /**
     * Add new object button click handler
     */
    onAddNewObjectClick () {
        this.onObjectItemEditClick(new MapObject());
    },

    render() {
        return (
            <div>
                <div id="createObject" className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div className="modal-dialog modal-lg" role="document">

                        {/* New object component */}
                        <CreateObject objectItem={this.state.objectItem}/>

                    </div>
                </div>
                <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" onClick={this.onAddNewObjectClick}>
                    Добавить
                </button>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Тип</th>
                            <th>Название</th>
                            <th>Уровень опасности</th>
                            <th>Описание</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.data.objects.map(( o ) => {
                            return <ObjectItem key={o._id} objectItem={o} click={this.onObjectItemEditClick}/>;
                        }, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

/**
 * Object item handler
 */
ObjectItem = React.createClass({
    propTypes: {
        objectItem: React.PropTypes.object.isRequired,
        click: React.PropTypes.func.isRequired
    },

    onClick() {
        this.props.click(this.props.objectItem);
    },

    render() {
        return (
            <tr>
                <th>{this.props.objectItem.type}</th>
                <td>{this.props.objectItem.name}</td>
                <td>{this.props.objectItem.dangerLevel}</td>
                <td>{this.props.objectItem.description}</td>
                <td><button onClick={this.onClick} type="button" className="btn btn-xs btn-default">Edit</button></td>
            </tr>
        );
    }
});
