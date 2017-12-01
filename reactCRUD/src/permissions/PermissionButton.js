import React, { Component } from 'react';

class PermissionButton extends Component {
    constructor(props) {
        super(props);
        this.state = { currState: true };

        this.changeState = this.changeState.bind(this);
    }
    
    componentDidMount() {
        this.setState({currState: this.props.currState});
    }

    changeState(){
        this.setState({currState: !this.state.currState});
        this.props.updatePermission(this.props.children);
    }

    render() {
        return (
            <button onClick={this.changeState} className={this.state.currState ? "btn btn-success" : "btn btn-danger"}>{this.props.children}</button>
        )
    }
}

export default PermissionButton;