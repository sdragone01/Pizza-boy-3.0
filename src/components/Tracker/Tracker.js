import React, { Component } from "react";
import fire from '../../config/Fire';
import './Tracker.css';
class Tracker extends Component {

    state = {
        transaction: [],
        money: 0,

        orderNumber: '',
        transactionType: '',
        price: '',
        cashReceived: '',
        cashTip: '',
        creditTip: '',

        currentUID: fire.auth().currentUser.uid,

    }

    logout = () => {
        fire.auth().signOut();
    }

    handleChange = input => e => {
        this.setState({
            [input]: e.target.value !== '0' ? e.target.value : ''
        })
    }

    addNewTransaction = () => {
        const { orderNumber, transactionType, price, cashReceived, cashTip, creditTip, currentUID } = this.state;
        const transaction = {
            orderNumber,
            transactionType,
            price,
            cashReceived,
            cashTip,
            creditTip,
            currentUID

        }
        fire.ds().collection('transactions').add(transaction)
            .then(() => {
                this.setState({
                    orderNumber: '',
                    transactionType: '',
                    price: '',
                    cashReceived: '',
                    cashTip: '',
                    creditTip: '',
                    currentUID: ''

                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {

        var currentUser = fire.auth().currentUser;

        return (
            <div className="trackerBlock">
                <div className="welcome">
                    <span>Hi, {currentUser.displayName}!</span>

                    <button onClick={this.logout}>Logout</button>
                </div>
                <div className="totalMoney"> Money Earned - $1.00</div>
                <div className="newTransactionBlock">
                    <div className="newTransaction">
                        <form>
                            <input
                                type="text"
                                placeholder="Order Number"
                                name="orderNumber"
                                value={this.state.orderNumber}
                                onChange={this.handleChange('orderNumber')}
                            />
                            <br />

                            <div className="inputGroup">
                                <select name="type"
                                    value={this.state.transactionType}
                                    onChange={this.handleChange('transactionType')}>
                                    <option value="0">Type</option>
                                    <option value="cash">Cash</option>
                                    <option value="credit">Credit</option>
                                </select>
                                <br />
                            </div>
                            <input
                                type="text"
                                placeholder="Cash Price"
                                name="price"
                                value={this.state.price}
                                onChange={this.handleChange('price')}
                            />
                            <input
                                type="text"
                                placeholder="Cash Received"
                                name="cashReceived"
                                value={this.state.cashReceived}
                                onChange={this.handleChange('cashReceived')}
                            />
                            <input
                                type="text"
                                placeholder="Cash Tip"
                                name="cashTip"
                                value={this.state.cashTip}
                                onChange={this.handleChange('cashTip')}
                            />
                            <input
                                type="text"
                                placeholder="Credit Tip"
                                name="creditTip"
                                value={this.state.creditTip}
                                onChange={this.handleChange('creditTip')}
                            />

                            <button className="addTransaction"
                                onClick={() => this.addNewTransaction()}
                            >Add</button>
                        </form>
                    </div>
                </div>
                <div className="latestTransactions">
                    <p>Orders</p>


                </div>
            </div >
        )
    }



}

export default Tracker;