import React,{useState, useEffect} from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from './axios';
import { db } from "./firebase";


function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket]) 

    console.log(clientSecret);
    console.log('👱', user);
    

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details   
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    
    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation
            console.log("payment intent is",paymentIntent);
            // db
            // .collection('users')
            // .doc(user?.uid)
            // .collection('orders')
            // .doc(paymentIntent.id)
            // .set({
            //     basket: basket,
            //     amount: paymentIntent.amount,
            //     created: paymentIntent.created
            // })
            
            setSucceeded(true);
            setError(null)
            setProcessing(false)
            
            dispatch({
                type: 'EMPTY_BASKET'
            })
            
            history.replace('/orders')
        })
        // console.log("payment intent outside the f is",paymentIntent);

    }

  return (
    <div className='payment'>
    <div className='payment__container'>
        <h1>
            Checkout (
                <Link to="/checkout">{basket?.length} items</Link>
                )
        </h1>


        {/* Payment section - delivery address */}
        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Delivery Address</h3>
            </div>
            <div className='payment__address'>
                <p>{user?.email}</p>
                <p>401/3, Lekha Nagar </p>
                <p>Meerut cantt, India</p>
            </div>
        </div>

        {/* Payment section - Review Items */}
        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Review items and delivery </h3>
            </div>
            <div className='payment__items'>
                {basket.map(item => (
                    <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                    />
                ))}
            </div>
        </div>
    

        {/* Payment section - Payment method */}
        <div className='payment__section'>
            <div className="payment__title">
                <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
                    {/* Stripe magic will go */}

                    <form onSubmit={handleSubmit}>
                    {/* <form > */}
                        <CardElement onChange={handleChange}/>
                        {/* <CardElement /> */}

                        <div className='payment__priceContainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                        </div>

                          {/* Errors */}
                        {error && <div>{error}</div>}
                    </form>
            </div>
        </div>
    </div>
</div>
  )
}
export default Payment;
