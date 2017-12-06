import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = { isUpdating: false, isLoading: false };
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.renderNormal = this.renderNormal.bind(this);
        this.renderUpdating = this.renderUpdating.bind(this);
        this.renderLoadingBar = this.renderLoadingBar.bind(this);
    }

    remove() {
        this.setState({ isLoading: true });
        this.props.deleteTableRow(this.props.index);
    }

    update() {
        this.setState({ isUpdating: true });
    }

    save() {
        if(!(this.nameInput.value === this.props.children[0] && this.priceInput.value === this.props.children[1] && this.currencyInput.value === this.props.children[2])){
            this.props.updateTableRow(
                {
                    name: this.nameInput.value,
                    price: this.priceInput.value,
                    currency: this.currencyInput.value
                },
                this.props.index
            );
            this.setState({ isLoading: true });
        }else{
            this.setState({ isUpdating: false });
        }
    }
    
    cancel() {
        this.setState({ isUpdating: false });
    }

    renderLoadingBar(){
        return(
            <td colSpan="3">
                <div className="load-bar">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </td>
        )
    }

    renderNormal() {
        const { isLoading } = this.state;
        const { DELETE, UPDATE } = this.props.permissions;
        return (
            <tr>
                {isLoading ? this.renderLoadingBar() : null}
                {!isLoading ? <td>{this.props.children[0]}</td> : null}
                {!isLoading ? <td>{this.props.children[1]}</td> : null}
                {!isLoading ? <td>{this.props.children[2]}</td> : null}
                { DELETE ? <td><button onClick={this.remove} disabled={isLoading} className="btn btn-danger">Delete</button></td> : null}
                { UPDATE ? <td><button onClick={this.update} disabled={isLoading} className="btn btn-info">Update</button></td> : null}
            </tr>
        )
    }

    renderUpdating() {
        const { isLoading } = this.state;
        return (
            <tr>
                {isLoading ? this.renderLoadingBar() : null}
                {!isLoading ? <td><input type="text" defaultValue={this.props.children[0]} className="form-control" ref={(el) => { this.nameInput = el }} /></td> : null}
                {!isLoading ? <td><input type="number" defaultValue={this.props.children[1]} className="form-control" ref={(el) => { this.priceInput = el }} /></td> : null}
                {!isLoading ? <td>
                    <select className="form-control" defaultValue={this.props.children[2]} ref={(el) => { this.currencyInput = el }}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </td> : null}
                <td><button onClick={this.save} disabled={isLoading} className="btn btn-success">Save</button></td>
                <td><button onClick={this.cancel} disabled={isLoading} className="btn btn-warning">Cancel</button></td>
            </tr>
        )
    }

    render() {
        return this.state.isUpdating ? this.renderUpdating() : this.renderNormal();
    }
}

export default Item;