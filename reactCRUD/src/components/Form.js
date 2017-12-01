import React, { Component } from 'react';

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitialState() {
    return {
      name: 'Default Item',
      price: '9.99',
      currency: 'EUR'
    }
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handlePriceChange(event) {
    this.setState({ price: event.target.value });
  }

  handleCurrencyChange(event) {
    this.setState({ currency: event.target.value });
  }

  handleSubmit(event) {
    this.props.addNewItem(this.state);
    this.setState(this.getInitialState());
    event.preventDefault();
  }

  render() {
    const { name, price, currency } = this.state;
    return (
      <form className="form-vertical col-sm-3" onSubmit={this.handleSubmit}>

        <div className="form-group">
          <label>Name: </label>
          <input type="text" className="form-control" value={name} onChange={this.handleNameChange} />
        </div>

        <div className="form-group">
          <label>Price: </label>
          <input type="number" className="form-control" value={price} onChange={this.handlePriceChange} />
        </div>

        <div className="form-group">
          <label>Currency: </label>
          <select className="form-control" value={currency} onChange={this.handleCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <button type="submit" value="Submit" className="btn btn-primary">Add Item</button>
      </form>
    )
  }
}

export default ItemForm;