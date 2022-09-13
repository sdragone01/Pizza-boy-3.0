
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { sizing } from '@mui/system';
import './Dash.css'
import fire from '../config/Fire';
import { getDatabase, ref, onValue, query, orderByChild } from "firebase/database";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Dash() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    var currentUser = fire.auth().currentUser.uid
    const db = getDatabase();
    var totalCashDue = [];
    var totalCashReceived = [];
    var totalCashTip = [];
    var totalCreditTip = [];
    var orderNums = [];

    const cashOrderData = query(ref(db, 'cashOrders/' + currentUser));
    onValue(cashOrderData, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            totalCashDue.push(childData.cashDue)
            totalCashReceived.push(childData.cashReceived)
            orderNums.push(childData.orderNum)


        });

    });

    const creditOrderData = query(ref(db, 'creditOrders/' + currentUser));
    onValue(creditOrderData, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            totalCashTip.push(childData.cashTip)
            totalCreditTip.push(childData.creditTip)
            orderNums.push(childData.orderNum)


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
    const fixedTotalTips = totalTips.toFixed(2);

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
                        ${fixedTotalTips}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Total Cash Due To Ally
                    </Typography>
                    <Typography variant="h5" component="div">
                        ${fixedDue}
                    </Typography>

                </CardContent>
                <div>
                    <Button onClick={handleOpen}>View Orders</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Todays Orders
                            </Typography>
                            <hr />
                            <ul>
                                {orderNums.map((orderNum) => (
                                    <li>{orderNum}</li>
                                ))}

                            </ul>
                        </Box>
                    </Modal>
                </div>
            </Card>
        </div>
    );
}
