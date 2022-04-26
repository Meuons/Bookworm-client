import React from 'react'
import ReactDOM from 'react-dom'
import {Buffer} from 'buffer';
const base64 = require('base-64');
//webpack.config.js

let deployed = true
let url = ''
if(deployed){
  url = 'https://bookworm-service.herokuapp.com/'
}
else{
  url = 'http://localhost:3000/'
}


class Cart extends React.Component {
    constructor() {
      super();
      this.state = {totalAmount: 0, totalPrice: 0, array:[], email:'', forename:'', surname:'', country:'', zipcode:'', adress:'', id:0};
    }
    
    componentDidMount() {
        //Get all the items
        let total = JSON.parse(localStorage.getItem("total"))
        if(total == null ){
          this.setState({totalAmount: 0, totalPrice: 0})
        }
        else{
        this.setState({totalAmount: total.amount, totalPrice: total.price})
      }
      
    }
    checkout(){
      var total = JSON.parse(localStorage.getItem("total"));  
    
      let items = []
    
        for (var i = 1; i < localStorage.length; i++) {
      var key = localStorage.key(i);
          var value = JSON.parse(localStorage.getItem(key));
          // set iteration key name
          items.push(
        
     
            <tr id={value.id + "cartItem"} >
            <td> <img src={value.image} className="cartImg"></img></td>
            <td>{value.title}</td>
            <td>x{value.amount}</td>
            <td>{value.price} kr</td>
             </tr>)
    
        }
      ReactDOM.render(
    <>        <div id="checkout">
       
      <h2>Checkout</h2>
    <table id="checkoutItems">
        <tr>
            <th>
                Image
            </th>
            <th>
                Title
            </th>
            <th>
                Amount
            </th>
            <th>
                Price
            </th>
        </tr>
      {items}
    </table>
        
        <h3>Total price {total.price} kr</h3> 

        <h2>Delivery options</h2>     
          <form id="checkoutForm">
            <div>
        <label for="forename">Forename</label>
    <input id="forename" type="text" name="forename">
    
    </input>
    <label for="surname">Surname</label>
    <input id="surname" type="text" name="surname">
    
    </input>
    </div>
    <label for="email">Email</label>
    <input id="email"  type="text" name="email">
    
    </input>
    <label for="phone">Phone</label>
    <input id="phone" type="text" name="phone">
    
    </input>
   
    <label for="address">City</label>
    <input id="address"  type="text" name="adress">
    
    </input>
    <label for="street">Street</label>
    <input id="street" type="text" name="street">
    
    </input>
    <label for="zipcode">Zipcode</label>
    <input id="zipcode" type="text" name="zipcode">
    
    </input>
     
    </form>
    <button onClick ={() => {  this.PayPalCheckout() } }>Confirm</button>
    
        </div>

    
</>, document.getElementById('wrapper')
    )
      // use key name to retrieve the corresponding value
        
    
    
    }
    
PayPalCheckout(){
  console.log('paypal')
  var total = JSON.parse(localStorage.getItem("total"));  
      
  let items = []

    
  var key = localStorage.key(i);
      var value = JSON.parse(localStorage.getItem(key));

      let body = `{
        "intent": "CAPTURE",
        "purchase_units": [`
          for (var i = 1; i < localStorage.length; i++) {   


  
       var key = localStorage.key(i);
           var value = JSON.parse(localStorage.getItem(key));
           body +=
           `
           {
            "reference_id": "${value.id}",
            "amount": {
              "currency_code": "SEK",
              "value": ${value.price}
            },
            "payee": {
              "email_address": "sb-w8flu15195334@business.example.com"
            }
          }`
          if(i != localStorage.length - 1){
            body += `,`
          }
       }
         body +=
      `
       ],
        "payer":{
            "email_address":"${document.getElementById("email").value}",
            "name":{
                "given_name":"${document.getElementById("forename").value}",
                "surname":"${document.getElementById("surname").value}"
            },
          "address":{
              "address_line_1":"${document.getElementById("address").value}",
          "postal_code":"${document.getElementById("zipcode").value}",
          "country_code":"SE"
      
          }
        }
      }`
console.log(body)
      let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
    }
      
      fetch(url + 'paypalcreateorder', requestOptions
      )
      .then(async response => { 
              const data = await response.json();
              requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
              fetch(url + 'paypalapproveorder', requestOptions
              )
              .then(async response => { 
                      const data = await response.json();
                      console.log(data)
                      document.getElementsByTagName("html")[0].innerHTML = data
                      document.body.setAttribute("style", "display:block")
                      let links = document.body.getElementsByTagName('a')
                      let forms = document.body.getElementsByTagName('form')
                      console.log(forms)
                      console.log(links.length)
              
         
                      for(let i=0; i<links.length; i++){
                          console.log(links[i].href)
                          links[i].setAttribute('href', links[i].href.replace('http://localhost:3001', 'https://paypal.com'));
                          console.log(links[i].href)
                      }
                      forms[0].setAttribute('action', forms[0].action.replace('http://localhost:3001', 'https://paypal.com'))
                      document.getElementById('antiClickjack').remove()
                  if (!response.ok) {
          
                      const error = (data && data.message) || response.statusText;
                      return Promise.reject(error);
                  }
                 //Store all the items from the database in an array
        
                  
              })
              .catch(error => {
                  this.setState({ errorMessage: error.toString() });
                  console.error('There was an error!', error);
              });
        
          if (!response.ok) {
  
              const error = (data && data.message) || response.statusText;
              return Promise.reject(error);
          }
         //Store all the items from the database in an array

          
      })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
      });



      
   
   
    
}
    KlarnaCheckout(){
     

      var total = JSON.parse(localStorage.getItem("total"));  
      console.log(total)
      let items = []
    
        
     
          var value = JSON.parse(localStorage.getItem(key));
 
             let orderTaxAmount = 0;
  
       let body = `{
          "purchase_country": "se",
          "purchase_currency": "SEK",
          "locale": "sv-se",
          "order_amount": ${total.price*100},
          "order_tax_amount": ${total.tax*100},
          "order_lines": [`
          for (var i = 1; i < localStorage.length; i++) {   
       
            var key = localStorage.key(i);
                var value = JSON.parse(localStorage.getItem(key));
                console.log(value)
                console.log(value.amount)
                let unitPrice = value.price / value.amount

              let totalTaxAmount = value.price*0.8 / 4
              body +=
                `
              {
                  "type": "physical",
                  "reference": "19-402-USA",
                  "name": "${value.title}",
                  "quantity":${value.amount},
                  "quantity_unit": "pcs",
                  "unit_price": ${unitPrice*100},
                  "tax_rate": 2500,
                  "total_amount": ${value.price*100},
                  
                  "total_tax_amount": ${totalTaxAmount*100}
              }`
              if(i != localStorage.length - 1){
                body += `,`
              }
            }
              body +=
           `
            ],
          "merchant_urls": {
            "terms": "https://www.example.com/terms.html",
            "checkout": "https://www.example.com/checkout.html?order_id={checkout.order.id}",
            "confirmation": "${url}client-app/?order_id={checkout.order.id}",
            "push": "https://www.example.com/api/push?order_id={checkout.order.id}"
          }
        }`
         
        
    
        console.log(body);

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body
      }

      fetch(url + 'KlarnaCheckout', requestOptions
      )
      .then(async response => { 
              const data = await response.json();
          console.log(data);
           let container
          let htmlSnippet = {__html:data.html_snippet}
          console.log(htmlSnippet);
          ReactDOM.render(
            <>  
      <div dangerouslySetInnerHTML={htmlSnippet} id="my-checkout-container"></div>
            </>, document.getElementById('wrapper')
            )
            var checkoutContainer = document.getElementById('my-checkout-container')
           
            var scriptsTags = checkoutContainer.getElementsByTagName('script')
            console.log(scriptsTags)
            // This is necessary otherwise the scripts tags are not going to be evaluated
            for (var i = 0; i < scriptsTags.length; i++) {
              console.log('loop')
                var parentNode = scriptsTags[i].parentNode
                var newScriptTag = document.createElement('script')
                newScriptTag.type = 'text/javascript'
                newScriptTag.text = scriptsTags[i].text
                parentNode.removeChild(scriptsTags[i])
                parentNode.appendChild(newScriptTag)
            }
            
           
           /* localStorage.clear() 
            console.log('clear') */

          if (!response.ok) {
  
              const error = (data && data.message) || response.statusText;
              return Promise.reject(error);
          }
         //Store all the items from the database in an array

          
      })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
      });
    

   
    }
     
    
Cart(){
  if(localStorage.getItem("_klarna_sdid_ch") != null){
    localStorage.removeItem("_klarna_sdid_ch");
  }
    var total = JSON.parse(localStorage.getItem("total"));   
    if(total != null){

   
    let items = []
  
      for (var i = 1; i < localStorage.length; i++) {
    var key = localStorage.key(i);
        var value = JSON.parse(localStorage.getItem(key));
        // set iteration key name
       
        items.push(
          <tr id={value.id + "cartItem"} >
         <td> <img src={value.image} className="cartImg"></img></td>
         <td>{value.title}</td>
         <td>x{value.amount}</td>
         <td>{value.price} kr</td>
          </tr>
          )
  
      }
    ReactDOM.render(
  <>
    <div id="cart">
        <h2>Cart</h2>
      <table id="cartItems">
          <tr>
              <th>
                  Image
              </th>
              <th>
                  Title
              </th>
              <th>
                  Amount
              </th>
              <th>
                  Price
              </th>
          </tr>
        {items}
      </table> 
      <button onClick ={() => { window.location.reload(false); }} >Go back</button>        
        <button onClick ={(event) => { localStorage.clear(); this.Cart(); }} >Clear cart</button>
     

      </div>
      <div id="cartTotal">

      <h3>Total price {total.price} kr</h3>
      <h4>Checkout with:</h4>
     <div> <button id='klarnaBtn' onClick ={() => { this.KlarnaCheckout() }} ><img class='payLogo'src={require('./img/klarna.png')}></img></button></div>
     <div> <button id='paypalBtn' onClick ={() => { this.checkout() }} ><img class='payLogo'src={require('./img/paypal.png')}></img></button></div>

      </div>
      </>
           
      , document.getElementById('wrapper')
  )
    // use key name to retrieve the corresponding value
    }
    else{
      ReactDOM.render(
        <>
          <div id="cart">
              <h2>The cart is empty</h2>
              <button onClick ={() => { window.location.reload(false); }} >Go back</button>
       </div>
            </>
                 
            , document.getElementById('wrapper')
        )
    }    
  
  
  }
  removeItem(id){
   let item = JSON.parse(localStorage.getItem(id));
   console.log(id)
   /*
   let unitPrice = item.price/item.amount
    item.amount --
   item.price = unitPrice * item.amount
    if(item.amount == 0){
      localStorage.removeItem(id)
    }
    else{
      localStorage.setItem(id, JSON.stringify(item))
    }
    let total = JSON.parse(localStorage.getItem("total"))
    total.price -= item.price
    total.tax -= item.price*0.8 / 4
    total.amount --
    if(total.amount == 0){
      localStorage.removeItem("total")
    }
    else{
      localStorage.setItem("total", JSON.stringify(total))
    }*
    ReactDOM.render(
      <>
          <div>
        <button onClick ={() => { this.Cart() }} ><img class="cartIcon" src={require('./img/cart.png')}>
  </img>  <span>{total.amount} </span>
   </button>
        </div>
          </>  
          , document.getElementById('headerCart')
      )*/
      this.Cart()
  }
    render() {
        return(
        <div id="headerCart">
      
        <div>
        <button onClick ={() => { this.Cart() }} ><img class="cartIcon" src={require('./img/cart.png')}>
  </img>  <span>{this.state.totalAmount} </span>
   </button>
        </div>
        </div>
        )
    }
  }

  
  export default Cart
