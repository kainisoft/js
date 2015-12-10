Tools = React.createClass({
    getInitialState() {
        return {
            objectTypes: [
                'Учреждение',
                'Транспорт',
                'Природа',
                'Территория',
                'Инфраструктура',
                'Человек',
                'Неопределённый' // TODO take from database
            ]
        };
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
                                <select name="type" defaultValue={this.state.objectTypes} multiple={true} onChange={null} id="object-type" size="7" className="form-control col-xs-4">
                                    {this.state.objectTypes.reduce(( carry, item ) => {
                                        carry.push(<option key={item} value={item}>{item}</option>);

                                        return carry;
                                    }, [])}
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
});
