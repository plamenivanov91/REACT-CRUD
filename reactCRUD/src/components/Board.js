import React, { Component } from 'react';
import Form from './Form';
import Item from './Item';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isReceiving: true,
            isAdding: false
        };

        this.eachItem = this.eachItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    componentDidMount() {
        this.receiveDataFromServer();
    }

    receiveDataFromServer() {
        fetch('https://api.myjson.com/bins/185esz')
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.results.map(product => (
                {
                    "name": `${product.name}`,
                    "price": `${product.price}`,
                    "currency": `${product.currency}`
                }
            )))
            .then(products => this.setState({
                products,
                isReceiving: false
            }))
            .catch(error => console.log('parsing failed', error))
    }

    addItem(item) {
        const arr = this.state.products.slice();
        arr.push(item);
        this.sendDataToServer(arr);
    }

    removeItem(i) {
        const arr = this.state.products.slice();
        arr.splice(i, 1);
        this.sendDataToServer(arr, i);
    }

    updateItem(item, i) {
        const arr = this.state.products.slice();
        arr[i] = item;
        this.sendDataToServer(arr, i);
    }

    eachItem(item, i) {
        return (
            <Item key={i} index={i} deleteTableRow={this.removeItem} 
            ref={(currItem) => { this["currItem" + i] = currItem }}
            updateTableRow={this.updateItem} permissions={this.props.permissions}>
                {item.name}
                {item.price}
                {item.currency}
            </Item>
        );
    }

    sendDataToServer(arr, index) {
        const _self = this;
        if(index === undefined)
            this.setState({ isAdding: true });

        fetch("https://api.myjson.com/bins/185esz", {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "results": arr })
        })
            .then(function () {
                if(index === undefined)
                    _self.setState({ isAdding: false })
                else
                    _self["currItem" + index].setState({ isLoading : false, isUpdating: false });
                _self.setState({ products: arr });
                console.log("Data sent successfully.");
            })
            .catch(error => console.log('parsing failed', error))
    }

    render() {
        const { isReceiving, isAdding, products } = this.state;
        return (
            <div>
                {this.props.permissions.CREATE ? <Form addNewItem={this.addItem} isLoading={isAdding}/> : null}
                <div className="table-responsive">
                    {
                        !isReceiving && products.length > 0 ?

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Currency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(this.eachItem)}
                                </tbody>
                            </table>

                            : 
                            
                            <div className="load-bar">
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default Board;