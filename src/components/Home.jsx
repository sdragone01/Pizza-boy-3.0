
import NewOrder from './Forms/NewOrder';
import NewCreditOrder from './Forms/NewCreditOrder';
import fire from '../config/Fire';
import './Home.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Dash from './Dash';

import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';

export default function Home() {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);




    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const currentUser = fire.auth().currentUser;
    const logOut = () => {
        fire.auth().signOut();
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>

                <AppBar position="static">
                    <Toolbar>
                        <LocalPizzaOutlinedIcon sx={{ mr: 2 }} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Hello, {currentUser.displayName}
                        </Typography>
                        <Button variant="contained" onClick={logOut}> Log Out </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Dash />

            <br />
            <NewOrder />
            <NewCreditOrder />
        </>
    );
}