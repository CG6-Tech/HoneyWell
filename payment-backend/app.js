const express = require('express');
const bodyParser = require('body-parser');
const paymentRotuer = require('./routes/payment');
const { validateAuthorization } = require('./validators/auth');

const app = express();

app.use(bodyParser.json());

app.use(validateAuthorization)

app.use('api/v1/payments', paymentRotuer);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
