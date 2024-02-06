import React, { useState } from 'react'
import FormInput from '../components/FormInput';
import axios from 'axios';

const client = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/payments`,
    headers: {
        Authorization: 'Basic ' + Buffer.from(process.env.REACT_APP_API_USERNAME + ':' + process.env.REACT_APP_API_PASSWORD).toString('base64')
    }
});


interface PaymentState {
    paymentInit?: boolean,
    success?: boolean,
    errorMessage?: string | null
}

function PaymentsPage() {
    const [paymentStatus, setPaymentStatus] = useState<PaymentState>({ paymentInit: false, success: false, errorMessage: null });

    const [values, setValues] = useState<any>({
        name: "",
        cardnumber: "",
        expirationdate: "",
        cvv: "",
        amount: "",
    });

    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "Card Holder Name",
            errorMessage: "Please inter Card Holder Name",
            label: "Name",
            required: true,
        },
        {
            id: 2,
            name: "cardnumber",
            type: "number",
            placeholder: "Card Number",
            errorMessage: "Please inter Card Number",
            label: "Card Number",
            required: true,
        },
        {
            id: 3,
            name: "expirationdate",
            type: "date",
            placeholder: "Expiration Date",
            label: "Expiration Date",
        },
        {
            id: 4,
            name: "cvv",
            type: "number",
            placeholder: "CVV",
            errorMessage: "Please enter 3 digit CVV",
            label: "CVV",
            required: true,
        },
        {
            id: 5,
            name: "amount",
            type: "number",
            placeholder: "Amount",
            errorMessage: "Please Paymet Amount",
            label: "Amount",
            required: true,
        },
    ];

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setPaymentStatus({ paymentInit: true })

        const paymentDetails = {
            name: values.name,
            cardnumber: parseInt(values.cardnumber),
            expirationdate: values.expirationdate,
            cvv: parseInt(values.cvv),
            amount: parseInt(values.amount),
        }

        const response = await client.post('pay', paymentDetails)

        if (response.status === 200) {
            setPaymentStatus({ success: true, errorMessage: null })
        } else {
            setPaymentStatus({ success: true, errorMessage: response.data.message })
        }

    };

    const onChange = (e: any) => {
        setValues({ ...values, [e.target.name]: e.target.value });

        if (e.target.name.cardnumber.length > 2) {
            getCard(e.target.name.cardnumber)
        }
    };


    async function getCard(cardnumber: any) {
        const cardRes = await client.get(`getcards?cardNumber=${cardnumber}`);


        if (cardRes.status == 200) {
            setValues(cardRes.data)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='payemt-card'>

                {paymentStatus.paymentInit && <div>
                    {
                        paymentStatus.success && <h2 className='success-txt'>Payment made Successfully</h2>
                    }

                    {
                        paymentStatus.errorMessage && <h2 className='fail-txt'>Payment made Failed: {paymentStatus.errorMessage}</h2>
                    }
                </div>}
                <h1>Payments</h1>
                <FormInput
                    key={inputs[0].id}
                    {...inputs[0]}
                    value={values[inputs[0].name] as any}
                    onChange={onChange}
                />
                <FormInput
                    key={inputs[1].id}
                    {...inputs[1]}
                    value={values[inputs[1].name] as any}
                    onChange={onChange}
                />

                <div className='row'>
                    <FormInput
                        key={inputs[2].id}
                        {...inputs[2]}
                        value={values[inputs[2].name] as any}
                        onChange={onChange}
                    />
                    <FormInput
                        key={inputs[3].id}
                        {...inputs[3]}
                        value={values[inputs[3].name] as any}
                        onChange={onChange}
                    />
                </div>
                <FormInput
                    key={inputs[4].id}
                    {...inputs[4]}
                    value={values[inputs[4].name] as any}
                    onChange={onChange}
                />

                <button className='submit'>Submit</button>
            </form>

        </div>
    )
}

export default PaymentsPage
