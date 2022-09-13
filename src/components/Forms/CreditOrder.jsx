import React, { Component } from 'react';
import fire from '../../config/Fire';
import { getDatabase, ref, push } from 'firebase/database';
import './NewOrder.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';






export default class CreditOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderNum: '',
            cashTip: '',
            creditTip: '',

            currentUID: fire.auth().currentUser.uid,
        }
    }

    logout = () => {
        fire.auth().signOut();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { orderNum, cashTip, creditTip, currentUID } = this.state;
        const db = getDatabase();
        const userId = this.state.currentUID;
        push(ref(db, 'creditOrders/' + userId), {

            orderNum,
            cashTip,
            creditTip,
            currentUID

        });
        this.setState({
            orderNum: '',
            cashTip: '',
            creditTip: '',
        });
    }

    render() {
        var currentUser = fire.auth().currentUser;

        return (
            <div className="creditOrder">
                <Box sx={{ minWidth: 120 }}>
                    <form onSubmit={this.handleSubmit}>

                        <TextField
                            id="outlined-basic"
                            label="Order #"
                            variant='outlined'
                            name="orderNum"
                            value={this.state.orderNum}
                            onChange={this.handleChange}
                        />


                        <TextField
                            id="outlined-basic"
                            label="Cash Tip"
                            variant='outlined'
                            name="cashTip"
                            value={this.state.cashTip}
                            onChange={this.handleChange}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Credit Tip"
                            variant='outlined'
                            name="creditTip"
                            value={this.state.creditTip}
                            onChange={this.handleChange}
                        />


                        <button type="submit">Submit</button>
                    </form>
                </Box>

            </div>
        );
    }
}




