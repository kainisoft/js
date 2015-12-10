Portal = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            objects: Objects.find({}).fetch()
        }
    },

    render() {
        var f = {};
        return (
            <div className="row">
                <div className="col-sm-4">
                    <Tools />
                </div>
                <div className="col-sm-4">
                    <PoratlMap objects={this.data.objects} options={f} />
                </div>
            </div>
        );
    }
});
