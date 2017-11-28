import React, { Component } from 'react';

class Item extends Component {
    constructor(){
        super();
        console.log(ItemsJson.products);
    }
    render() {
        return (
            <tr>
                <td>koko</td>
                <td>Anna</td>
                <td>Pitt</td>
            </tr>
        )
    }
}

export default Item;