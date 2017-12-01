import React, { Component } from 'react';
import Board from '../components/Board';
import PermissionButton from './PermissionButton';

class Permissions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CREATE: true,
            READ: true,
            UPDATE: true,
            DELETE: true
        };

        this.updateState = this.updateState.bind(this);
        this.eachPermissionButton = this.eachPermissionButton.bind(this);
    }
    
    eachPermissionButton(keyName, keyIndex) {
        return (
            <PermissionButton key={keyIndex} index={keyIndex} currState={this.state[keyName]} updatePermission={this.updateState}>
                {keyName}
            </PermissionButton>
        )
    }

    updateState(name) {
        const obj = this.state;
        obj[name] = !obj[name];
        console.log(name + " permission " + (obj[name] ? "granted" : "denied") + ".");        
        this.setState(obj);
    }

    render() {
        return (
            <div>
                {Object.keys(this.state).map(this.eachPermissionButton)}
                {this.state.READ ? <Board permissions={this.state} /> : null}
            </div>
        )
    }
}

export default Permissions;