import React, { Component } from 'react';
import AvailableItemsJSON from '../availableItems/items';
import Item from './Item';

class Board extends Component {
    constructor(props){
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(){
        return {
            products: AvailableItemsJSON.products
        }
    }

    removeItem(i){
        const arr = this.state.items
    }
    
    eachItem(item, i){
        return (
            {
                name: item.name,
                price: item.price,
                currency: item.currency
            }
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
                <tr>
                  <td>koko</td>
                  <td>Anna</td>
                  <td>Pitt</td>
                </tr>
              </tbody>
            </table>
            </div>
        )
    }
}

export default Board;