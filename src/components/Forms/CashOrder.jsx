import React, { Component } from 'react';
import fire from '../../config/Fire';
import { getDatabase, ref, child, push, update } from 'firebase/database';
import './NewOrder.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';






export default class CashOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {

            orderNum: '',
            cashDue: '',
            cashReceived: '',

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
        const { orderNum, cashDue, cashReceived, currentUID } = this.state;
        const db = getDatabase();


        push(ref(db, 'cashOrders/' + currentUID), {
            orderNum,
            cashDue,
            cashReceived,
            currentUID


        });
        this.setState({
            orderNum: '',
            cashDue: '',
            cashReceived: '',


        });
    }

    render() {
        var currentUser = fire.auth().currentUser;

        return (
            <div className="cashOrder">
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
                            label="Cash Due"
                            variant='outlined'
                            name="cashDue"
                            value={this.state.cashDue}
                            onChange={this.handleChange}
                        />



                        <TextField
                            id="outlined-basic"
                            label="Cash Recieved"
                            variant='outlined'
                            name="cashReceived"
                            value={this.state.cashReceived}
                            onChange={this.handleChange}
                        />






                        <button type="submit">Submit</button>
                    </form>
                </Box>

            </div>
        );
    }
}




