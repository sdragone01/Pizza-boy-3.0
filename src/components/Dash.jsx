
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { sizing } from '@mui/system';
import './Dash.css'
import fire from '../config/Fire';
import { getDatabase, ref, onValue, query } from "firebase/database";


export default function Dash() {
    var currentUser = fire.auth().currentUser.uid
    const db = getDatabase();
    const cashOrderRef = ref(db, 'cashOrder/' + currentUser)
    onValue(cashOrderRef, (snapshot1) => {
        const data1 = snapshot1.val();
        console.log(data1);
    });
    const creditOrderRef = ref(db, 'creditOrders/' + currentUser)
    onValue(creditOrderRef, (snapshot2) => {
        const data2 = snapshot2.val();
        console.log(data2);

    });






    return (
        <div className="dash">
            <Card sx={{ width: '100%', display: 'inline-block' }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Earned Today
                    </Typography>
                    <Typography variant="h5" component="div">
                        0
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Total
                    </Typography>
                    <Typography variant="body2">
                        0
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">View</Button>
                </CardActions>
            </Card>
        </div>
    );
}
