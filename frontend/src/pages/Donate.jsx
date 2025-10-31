import React, { useState } from 'react';
// import { usePaystackPayment } from 'react-paystack';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

import axios from 'axios';

// PAYSTACK_PUBLIC_KEY
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY; 

// console log to quickly verify (remove after testing)
console.log("Paystack Public Key Loaded:", PAYSTACK_PUBLIC_KEY ? "Yes" : "No/Undefined");

export default function Donate() {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState(500); // Default donation: 500 NGN or local currency unit
    const [name, setName] = useState('');
    const [message, setMessage] = useState(null);

    // Paystack Configuration Object
    // const config = {
    //     reference: (new Date()).getTime().toString(),
    //     email: email,
    //     amount: amount * 100, // Paystack requires amount in Kobo/Cents (smallest unit)
    //     publicKey: PAYSTACK_PUBLIC_KEY,
    //     currency: 'GHS',
    //     metadata: {
    //         custom_fields: [
    //             {
    //                 display_name: 'Donor Name',
    //                 variable_name: 'donor_name',
    //                 value: name
    //             }
    //         ]
    //     }
    // };

    // Callback function on successful payment
    const onSuccess = (reference) => {
        // You would typically verify this transaction on your backend here
        setMessage(`Thank you for your donation! Reference: ${reference.reference}`);
        setEmail('');
        setName('');
        setAmount(500); // Reset form
    };

    // Callback function on close
    const onClose = () => {
        setMessage("Payment window closed. You can try again.");
    };

    // Initialize the Paystack hook
    // const initializePayment = usePaystackPayment(config);

    const handlePayment = async (e) => {
        e.preventDefault();
        setMessage(null);
        if (!email || !amount || !name) {
            setMessage("Please fill out all fields.");
            return;
        }

        if (!PAYSTACK_PUBLIC_KEY) {
            setMessage("Error: Paystack Public Key is missing.");
            return;
        }

        try {
        // 💡 1. Call backend initiation route
        const res = await axios.post('/api/donate/initiate', {
            email: email,
            amount: amount * 100, //  amount in Pesewas (minor unit)
            currency: 'GHS' // currency code
        });

        const { authorization_url, reference } = res.data;

        // 2. Open the Paystack URL returned by the backend
        // initiates the payment and sets up the webhook on Paystack's side.
        window.location.href = authorization_url;
        
    } catch (err) {
        const errMsg = err.response?.data?.msg || 'Could not initiate transaction with the server.';
        setMessage(`Payment Error: ${errMsg}`);
    }

        // Open the Paystack payment modal
        // initializePayment(onSuccess, onClose);
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <Card className="w-[400px]">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-indigo-700">Support SafeSpace 🙏</CardTitle>
                    <CardDescription>
                        Your generosity helps us keep the platform anonymous and secure.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePayment} className="grid gap-4">
                        
                        <div className="grid gap-2">
                            <Label htmlFor="name">Your Name (Optional)</Label>
                            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Anonymous Supporter" />
                        </div>
                        
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="amount">Donation Amount (e.g., in your local currency)</Label>
                            <Input 
                                id="amount" 
                                type="number" 
                                value={amount} 
                                onChange={(e) => setAmount(Number(e.target.value))} 
                                min="100" // Minimum amount, adjust as needed
                                required 
                            />
                        </div>

                        {message && (
                            <p className={`text-sm text-center ${message.includes('Thank you') ? 'text-green-600' : 'text-red-600'}`}>
                                {message}
                            </p>
                        )}

                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                            Donate Now
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}