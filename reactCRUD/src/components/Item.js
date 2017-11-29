import React, { Component } from 'react';

class Item extends Component {
    constructor(props){
        super(props);

        this.remove = this.remove.bind(this);
        // this.addTableData = this.addTableData.bind(this);
    }
    
    remove(){
        this.props.deleteTableRow(this.props.index);
    }

    // addTableData(){}

    render() {
        return (
            <tr>
                <td>{this.props.children[0]}</td>
                <td>{this.props.children[1]}</td>
                <td>{this.props.children[2]}</td>
                <td><button onClick={this.remove} className="btn btn-danger">Delete</button></td>
                <td><button className="btn btn-info">Update</button></td>
            </tr>
        )
    }
}

export default Item;