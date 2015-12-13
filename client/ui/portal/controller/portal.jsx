Meteor.subscribe('objects');
Portal = React.createClass({
    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            filter: {
                'Учреждение': true,
                'Транспорт': true,
                'Природа': true,
                'Территория': true,
                'Инфраструктура': true,
                'Человек': true,
                'Неопределённый': true // TODO take from database
            }
        };
    },

    getMeteorData() {
        var filter = Object.keys(this.state.filter).filter(( item ) => {
            return this.state.filter[item] === true;
        });

        return {
            objects: Objects.find({
                type: {$in: filter}
            }).fetch()
        }
    },

    onChangeFilter( filterName, filterValue ) {
        this.setState(React.addons.update(this.state, {
            filter: { [filterName]: {$set: filterValue} }
        }));
    },

    render() {
        return (
            <div className="row">
                <div className="col-sm-4">
                    <Tools filter={this.state.filter} onChangeFilter={this.onChangeFilter} />
                </div>
                <div className="col-sm-4">
                    <PoratlMap objects={this.data.objects} />
                </div>
            </div>
        );
    }
});
