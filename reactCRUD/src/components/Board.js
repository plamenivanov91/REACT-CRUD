import React, { Component } from 'react';
import AvailableItemsJSON from '../availableItems/items';
import Form from './Form';
import Item from './Item';

class Board extends Component {
    constructor(props){
        super(props);
        this.state = this.getInitialState();

        this.eachItem = this.eachItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    getInitialState(){
        return {
            products: AvailableItemsJSON.products
        }
    }
    
    addItem(item){
        const arr = this.state.products;
        arr.push(item);
        this.setState({products: arr});
    }
    
    removeItem(i){
        const arr = this.state.products;
        arr.splice(i, 1);
        this.setState({products: arr});
    }

    updateItem(item, i){
        const arr = this.state.products;
        console.log(item);
        arr[i] = item;
        this.setState({products: arr});
    }
    
    eachItem(item, i){
        return (
            <Item key={i} index={i} deleteTableRow={this.removeItem} updateTableRow={this.updateItem}>
            {item.name}
            {item.price}
            {item.currency}
            </Item>
        );
    }

    render() {
        return (
            <div>
                <Form addNewItem={this.addItem}/>
                <div className="table-responsive">          
                <table className="table">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Currency</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.products.map(this.eachItem)}
                </tbody>
                </table>
                </div>
            </div>
        )
    }
}

export default Board;