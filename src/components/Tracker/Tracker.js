import React, { Component } from "react";
import fire from '../../config/Fire';
class Tracker extends Component {

    logout = () => {
        fire.auth().signOut();
    }

    render() {
        return (
            <div className="tracker">
                <button onClick={this.logout}> Exit </button>
            </div>
        );
    }
}

export default Tracker;