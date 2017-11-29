import React, { Component } from 'react';

class Item extends Component {
    constructor(props){
        super(props);
        this.state = {isUpdating: false};
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.renderNormal = this.renderNormal.bind(this);
        this.renderUpdating = this.renderUpdating.bind(this);
    }

    remove(){
        this.props.deleteTableRow(this.props.index);
    }

    update(){
        this.setState({isUpdating: true});
    }

    save(){
        this.props.updateTableRow(
            {
                name: this.nameInput.value,
                price: this.priceInput.value,
                currency: this.currencyInput.value
            },
            this.props.index
        );
        this.setState({isUpdating: false});
    }

    cancel(){
        this.setState({isUpdating: false});
    }

    renderNormal(){
        return(
            <tr>
                <td>{this.props.children[0]}</td>
                <td>{this.props.children[1]}</td>
                <td>{this.props.children[2]}</td>
                <td><button onClick={this.remove} className="btn btn-danger">Delete</button></td>
                <td><button onClick={this.update} className="btn btn-info">Update</button></td>
            </tr>
        )
    }

    renderUpdating(){
        return(
            <tr>
                <td><input type="text" className="form-control" ref = {(el) => {this.nameInput = el}}/></td>
                <td><input type="number" className="form-control" ref = {(el) => {this.priceInput = el}}/></td>
                <td>
                    <select className="form-control" ref = {(el) => {this.currencyInput = el}}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </td>
                <td><button onClick={this.save} className="btn btn-success">Save</button></td>
                <td><button onClick={this.cancel} className="btn btn-warning">Cancel</button></td>
            </tr>
        )
    }

    render() {
        return this.state.isUpdating ? this.renderUpdating() : this.renderNormal();
    }
}

export default Item;