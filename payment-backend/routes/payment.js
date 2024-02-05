const express = require('express');
const Payment = require('../models/payment');
const { Op } = require('sequelize');
const Cards = require('../models/cards');
const router = express.Router();

// Create a new payment
router.post('/pay', async (req, res) => {
    const { name, cardnumber, expirationdate, cvv, amount } = req.body;

    try {
        const payment = await Payment.create({ name, cardnumber, expirationdate, cvv, amount });
        await Cards.create({ cardnumber, name, expirationdate, cvv });

        const mockApiResponse = await axios.post(`${process.env.PAYMENT_API_URL}/pay`, {
            recipientToken: "v0cdhlxg2dm1zlstkaz6ucaxdrpegspvpg2gqdup3pe3c4wb7z",
            cardNumber: cardnumber,
            cardExpDate: expirationdate,
            cardCVV: cvv,
            currency: "INR",
            amount: amount
        });

        console.log('Mock API Response:', mockApiResponse.data);

        res.json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get card for 3 digit card number
app.get('/getcards', async (req, res) => {
    try {
        const { cardNumber } = req.query;

        if (!cardNumber) {
            return res.status(400).json({ error: 'Card number parameter is required' });
        }

        const payments = await Cards.findAll({
            where: {
                cardnumber: {
                    [Op.like]: `%${cardNumber}%`
                }
            }
        });

        if (payments.length === 0) {
            return res.status(404).json({ message: 'No Card found for the provided card number' });
        }

        res.status(200).json(payments[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});


module.exports = router;
