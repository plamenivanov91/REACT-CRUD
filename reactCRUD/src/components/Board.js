import React, { Component } from 'react';
import Form from './Form';
import Item from './Item';

class Board extends Component {
    constructor(props){
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

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        fetch('https://api.myjson.com/bins/185esz')
        .then(response => response.json())
        .then(parsedJSON => parsedJSON.results.map(product => (
            {
                "name" : `${product.name}`,
                "price" : `${product.price}`,
                "currency" : `${product.currency}`
            }
        )))
        .then(products => this.setState({
            products,
            isLoading: false
        }))
        .catch(error => console.log('parsing failed', error))
    }

    addItem(item){
        const arr = this.state.products;
        arr.push(item);

        fetch("https://api.myjson.com/bins/185esz", {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          
            //make sure to serialize your JSON body
            body: JSON.stringify(
                this.state.products
            )
          })

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
        const {isLoading, products} = this.state;
        return (
            <div>
                <Form addNewItem={this.addItem}/>
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
                        {this.state.products.map(this.eachItem)}
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