import React, { Component } from 'react';
import Form from './Form';
import Item from './Item';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isLoading: true
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
                isLoading: false
            }))
            .catch(error => console.log('parsing failed', error))
    }

    addItem(item) {
        const arr = this.state.products;
        arr.push(item);
        this.sendDataToServer(arr);
    }

    removeItem(i) {
        const arr = this.state.products;
        arr.splice(i, 1);
        this.sendDataToServer(arr);
    }

    updateItem(item, i) {
        const arr = this.state.products;
        arr[i] = item;
        this.sendDataToServer(arr);
    }

    eachItem(item, i) {
        return (
            <Item key={i} index={i} deleteTableRow={this.removeItem} updateTableRow={this.updateItem}>
                {item.name}
                {item.price}
                {item.currency}
            </Item>
        );
    }

    sendDataToServer(arr) {
        const _self = this;

        fetch("https://api.myjson.com/bins/185esz", {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "results": arr })
        })
            .then(function () {
                _self.setState({ products: arr });
                console.log("Data sent successfully.");
            })
            .catch(error => console.log('parsing failed', error))
    }

    render() {
        const { isLoading, products } = this.state;
        return (
            <div>
                <Form addNewItem={this.addItem} />
                <div className="table-responsive">
                    {
                        !isLoading && products.length > 0 ?

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

                            : null
                    }
                </div>
            </div>
        )
    }
}

export default Board;