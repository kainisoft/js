/**
 * Filter tools component
 */
Tools = React.createClass({
    gpropTypes: {
        filter: React.PropTypes.object.isRequired,
        onChangeFilter: React.PropTypes.func.isRequired
    },

    onChangeTypeFilter( event ) {
        this.props.onChangeFilter(event.target.name, event.target.checked);
    },

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Панел управления</h3>
                </div>
                <div className="panel-body">
                    <form className="form-horizontal" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="object-type" className="col-sm-2 control-label">Тип</label>
                            <div className="col-sm-10">
                                <fieldset>

                                    {/* Render possible filters */}
                                    {Object.keys(this.props.filter).reduce(( carry, item ) => {
                                        var imgUrl = '/asset/img/' + item + '.png';
                                        var imgStyle = {
                                            width: 36,
                                            height: 36
                                        };

                                        carry.push(<div key={item}>
                                            <input type="checkbox" checked={this.props.filter[item]} name={item} value={item} onChange={this.onChangeTypeFilter}  />
                                            <img src={imgUrl} style={imgStyle} />
                                            {item}
                                        </div>);

                                        return carry;
                                    }, [])}

                                </fieldset>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
});
