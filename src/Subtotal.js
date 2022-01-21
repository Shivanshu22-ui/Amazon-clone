import React from 'react'
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from './reducer';
import {useHistory} from 'react-router-dom';

function Subtotal() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history =useHistory();
    return (
        <div className="subtotal">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p>
                Subtotal ({basket?.length} items): <strong>{value}</strong>
              </p>
              <small className="subtotal__gift">
                <input type="checkbox" /> This order contains a gift
              </small>
            </>
          )}
          decimalScale={2} // just go upto 2 decimal places while addition
          value={getBasketTotal(basket)} // The total money
          displayType={"text"}
          thousandSeparator={true}  // display total money with commas so that amout is easier to read
          prefix={"$"}
        />
  
        <button onClick={e=>history.push("/payment")} >Proceed to Checkout</button>
      </div>
    )
}

export default Subtotal; 
