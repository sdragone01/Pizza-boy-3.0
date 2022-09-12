import React, { Component } from 'react';
import './Main.css';
import fire from '../config/Fire';
import Login from './Forms/Login';
import Register from './Forms/Register';
import Tracker from './Tracker/Tracker';
import Spinner from '../assets/loader.gif';

export default class Main extends Component {

    state = {
        user: 1,
        loding: true,
        formSwitcher: false,
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            } else {
                this.setState({ user: null });
            }
        })
    }


    formSwitcher = (action) => {

        console.log(action)
        this.setState({
            formSwitcher: action === 'register' ? true : false
        })
    }
    render() {

        const form = !this.state.formSwitcher ? <Login /> : <Register />
        if (this.state.user === 1) {
            return (
                <div className="mainBlock">
                    <div className="Spinner">
                        <img src={Spinner} alt="Spinner" className='ImgSpinner' />
                    </div>
                </div>
            )
        } else {

            return (
                <>


                    {!this.state.user ? (
                        < div className="mainBlock" >
                            {form}
                            {!this.state.formSwitcher ?

                                (<span className="underLine">
                                    Not Registered? <button onClick={() => this.formSwitcher(!this.state.formSwitcher ? 'register' : 'login')}
                                        className='linkBtn'>Create an account</button>
                                </span>) : (
                                    <span className="underLine">
                                        Have an account? <button onClick={() => this.formSwitcher(!this.state.formSwitcher ? 'register' : 'login')}
                                            className='linkBtn'>Sign in here</button>
                                    </span>

                                )

                            }

                        </div >) : (<Tracker />)}


                </>

            )
        }


    }
}