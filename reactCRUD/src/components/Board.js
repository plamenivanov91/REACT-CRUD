import React, { Component } from 'react';
import AvailableItemsJSON from '../availableItems/items';
import Item from './Item';

class Board extends Component {
    constructor(props){
        super(props);
        this.state = this.getInitialState();

        this.eachItem = this.eachItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    getInitialState(){
        return {
            products: AvailableItemsJSON.products
        }
    }
    // "name" : "TV",
    // "price" : 1000,
    // "currency" : "USD"
    removeItem(i){
        const arr = this.state.products;
        arr.splice(i, 1);
        this.setState({products: arr});
    }
    
    eachItem(item, i){
        return (
            <Item key={i} index={i} deleteTableRow={this.removeItem}>
            {item.name}
            {item.price}
            {item.currency}
            </Item>
        );
    }

    render() {
        return (
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
        )
    }
}

export default Board;