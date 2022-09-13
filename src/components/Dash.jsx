
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
import { getDatabase, ref, onValue, query, orderByChild } from "firebase/database";


export default function Dash() {

    var currentUser = fire.auth().currentUser.uid
    const db = getDatabase();
    var totalCashDue = [];
    var totalCashReceived = [];
    var totalCashTip = [];
    var totalCreditTip = [];

    const cashOrderData = query(ref(db, 'cashOrders/' + currentUser));
    onValue(cashOrderData, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            totalCashDue.push(childData.cashDue)
            totalCashReceived.push(childData.cashReceived)


        });

    });

    const creditOrderData = query(ref(db, 'creditOrders/' + currentUser));
    onValue(creditOrderData, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            totalCashTip.push(childData.cashTip)
            totalCreditTip.push(childData.creditTip)


        });

    });





    var numTotalCashDue = totalCashDue.map(Number);
    var numTotalCashReceived = totalCashReceived.map(Number);
    var numTotalCashTip = totalCashTip.map(Number);
    var numTotalCreditTip = totalCreditTip.map(Number);

    console.log(numTotalCashDue);
    console.log(numTotalCashReceived);
    console.log(numTotalCashTip);
    console.log(numTotalCreditTip);

    var totalCashDueSum = numTotalCashDue.reduce((a, b) => a + b, 0);
    var totalCashReceivedSum = numTotalCashReceived.reduce((a, b) => a + b, 0);
    var totalCashTipSum = numTotalCashTip.reduce((a, b) => a + b, 0);
    var totalCreditTipSum = numTotalCreditTip.reduce((a, b) => a + b, 0);

    console.log(totalCashDueSum);
    console.log(totalCashReceivedSum);
    console.log(totalCashTipSum);
    console.log(totalCreditTipSum);

    var cashOrderTips = totalCashReceivedSum - totalCashDueSum;
    var totalTips = totalCreditTipSum + totalCashTipSum + cashOrderTips;

    console.log(cashOrderTips);
    console.log(totalTips);

    const fixedDue = totalCashDueSum.toFixed(2);
    const fixedReceived = totalCashReceivedSum.toFixed(2);
    const fixedCashTips = cashOrderTips.toFixed(2);
    const fixedCreditTips = totalCreditTipSum.toFixed(2);

    console.log(fixedDue);
    console.log(fixedReceived);
    console.log(fixedCashTips);
    console.log(fixedCreditTips);




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
