import React, { Component } from 'react';
import PermissionButton from './PermissionButton';

class Permissions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CREATE: true,
            READ: true,
            UPDATE: false,
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
        this.state[name] = !this.state[name]
        this.setState(this.state);
    }

    render() {
        return (
            <div>
                {Object.keys(this.state).map(this.eachPermissionButton)}
            </div>
        )
    }
}

export default Permissions;