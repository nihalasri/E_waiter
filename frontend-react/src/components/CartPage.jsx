import React from 'react';

const CartPage = ({
  cart,
  customerInfo,
  setCustomerInfo,
  setPage,
  setOrderId,
  addToCart,
  removeFromCart
}) => {
  const [countryCode, setCountryCode] = React.useState("+91");
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const countryCodes = [
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+1", country: "USA", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+1", country: "Canada", flag: "🇨🇦" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+7", country: "Russia", flag: "🇷🇺" },
    { code: "+39", country: "Italy", flag: "🇮🇹" },
    { code: "+34", country: "Spain", flag: "🇪🇸" },
    { code: "+55", country: "Brazil", flag: "🇧🇷" },
    { code: "+27", country: "South Africa", flag: "🇿🇦" },
    { code: "+82", country: "South Korea", flag: "🇰🇷" },
    { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+60", country: "Malaysia", flag: "🇲🇾" },
    { code: "+62", country: "Indonesia", flag: "🇮🇩" },
    { code: "+66", country: "Thailand", flag: "🇹🇭" },
    { code: "+84", country: "Vietnam", flag: "🇻🇳" },
    { code: "+63", country: "Philippines", flag: "🇵🇭" },
    { code: "+92", country: "Pakistan", flag: "🇵🇰" },
    { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
    { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
    { code: "+977", country: "Nepal", flag: "🇳🇵" },
    { code: "+20", country: "Egypt", flag: "🇪🇬" },
    { code: "+234", country: "Nigeria", flag: "🇳🇬" },
    { code: "+254", country: "Kenya", flag: "🇰🇪" },
    { code: "+212", country: "Morocco", flag: "🇲🇦" },
    { code: "+90", country: "Turkey", flag: "🇹🇷" },
    { code: "+41", country: "Switzerland", flag: "🇨🇭" },
    { code: "+31", country: "Netherlands", flag: "🇳🇱" },
    { code: "+46", country: "Sweden", flag: "🇸🇪" },
    { code: "+47", country: "Norway", flag: "🇳🇴" },
    { code: "+45", country: "Denmark", flag: "🇩🇰" },
    { code: "+358", country: "Finland", flag: "🇫🇮" },
    { code: "+353", country: "Ireland", flag: "🇮🇪" },
    { code: "+32", country: "Belgium", flag: "🇧🇪" },
    { code: "+43", country: "Austria", flag: "🇦🇹" },
    { code: "+30", country: "Greece", flag: "🇬🇷" },
    { code: "+351", country: "Portugal", flag: "🇵🇹" },
    { code: "+48", country: "Poland", flag: "🇵🇱" },
    { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
    { code: "+36", country: "Hungary", flag: "🇭🇺" },
    { code: "+40", country: "Romania", flag: "🇷🇴" },
    { code: "+359", country: "Bulgaria", flag: "🇧🇬" },
    { code: "+380", country: "Ukraine", flag: "🇺🇦" },
    { code: "+972", country: "Israel", flag: "🇮🇱" },
    { code: "+974", country: "Qatar", flag: "🇶🇦" },
    { code: "+965", country: "Kuwait", flag: "🇰🇼" },
    { code: "+968", country: "Oman", flag: "🇴🇲" },
    { code: "+973", country: "Bahrain", flag: "🇧🇭" },
    { code: "+962", country: "Jordan", flag: "🇯🇴" },
    { code: "+961", country: "Lebanon", flag: "🇱🇧" },
    { code: "+964", country: "Iraq", flag: "🇮🇶" },
    { code: "+98", country: "Iran", flag: "🇮🇷" },
    { code: "+213", country: "Algeria", flag: "🇩🇿" },
    { code: "+216", country: "Tunisia", flag: "🇹🇳" },
    { code: "+218", country: "Libya", flag: "🇱🇾" },
    { code: "+357", country: "Cyprus", flag: "🇨🇾" },
    { code: "+356", country: "Malta", flag: "🇲🇹" },
    { code: "+352", country: "Luxembourg", flag: "🇱🇺" },
    { code: "+354", country: "Iceland", flag: "🇮🇸" },
    { code: "+64", country: "New Zealand", flag: "🇳🇿" },
    { code: "+52", country: "Mexico", flag: "🇲🇽" },
    { code: "+54", country: "Argentina", flag: "🇦🇷" },
    { code: "+56", country: "Chile", flag: "🇨🇱" },
    { code: "+57", country: "Colombia", flag: "🇨🇴" },
    { code: "+51", country: "Peru", flag: "🇵🇪" },
    { code: "+58", country: "Venezuela", flag: "🇻🇪" },
    { code: "+593", country: "Ecuador", flag: "🇪🇨" },
    { code: "+591", country: "Bolivia", flag: "🇧🇴" },
    { code: "+595", country: "Paraguay", flag: "🇵🇾" },
    { code: "+598", country: "Uruguay", flag: "🇺🇾" },
    { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
    { code: "+507", country: "Panama", flag: "🇵🇦" },
    { code: "+502", country: "Guatemala", flag: "🇬🇹" },
    { code: "+503", country: "El Salvador", flag: "🇸🇻" },
    { code: "+504", country: "Honduras", flag: "🇭🇳" },
    { code: "+505", country: "Nicaragua", flag: "🇳🇮" },
    { code: "+1-809", country: "Dominican Republic", flag: "🇩🇴" },
    { code: "+1-787", country: "Puerto Rico", flag: "🇵🇷" },
  ];

  const handleConfirm = async () => {
    if (!customerInfo.name || !customerInfo.mobile) {
      alert("Please fill in your details");
      return;
    }

    // Mobile validation: exactly 10 digits
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(customerInfo.mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    
    try {
      const response = await fetch("http://127.0.0.1:5000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerInfo.name,
          mobile: `${countryCode}${customerInfo.mobile}`,
          items: cart.map(item => ({ id: item.id, quantity: item.quantity }))
        }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setOrderId(data.order_id);
        setPage("orders");
      } else {
        alert(data.error || "Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server. Please ensure that the Python backend (app.py) is running on http://127.0.0.1:5000");
    }
  };

  return (
    <div className="form-container">
      <div className="glass checkout-card">
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Checkout</h2>
        
        <div className="glass cart-items-container">
          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">₹{item.price} each</div>
                  </div>
                  
                  <div className="cart-item-qty">
                    <button 
                      onClick={() => removeFromCart(item)}
                      className="qty-btn"
                    >
                      <ion-icon name="remove-outline"></ion-icon>
                    </button>
                    <span className="qty-val">{item.quantity}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="qty-btn"
                    >
                      <ion-icon name="add-outline"></ion-icon>
                    </button>
                  </div>

                  <div className="cart-item-total">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
              <hr className="cart-divider" />
              <div className="cart-total-row">
                <span>Total Amount</span>
                <span className="total-amount">₹{total}</span>
              </div>
            </>
          ) : (
            <div className="empty-cart-msg" style={{ textAlign: "center" }}>
              Your cart is empty.
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <>
            <div className="checkout-details-section">
              <h3>Personal Details</h3>
              <div className="checkout-input-group">
                <label>Full Name</label>
                <input
                  className="checkout-input"
                  type="text"
                  placeholder="Enter your name"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                  }
                />
              </div>
              
              <div className="checkout-input-group">
                <label>Mobile Number</label>
                <div className="mobile-input-wrapper">
                  <div className="country-code-wrapper">
                    <select 
                      className="country-code-selector" 
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      {countryCodes.map((c, index) => (
                        <option key={`${c.code}-${index}`} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    className="checkout-input"
                    type="tel"
                    maxLength="10"
                    placeholder="70123 45678"
                    value={customerInfo.mobile}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, ''); // Only digits
                      if (val.length <= 10) {
                        setCustomerInfo({ ...customerInfo, mobile: val });
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              className="order-now-btn"
              style={{ width: "100%" }}
              onClick={handleConfirm}
            >
              PLACE ORDER
            </button>
          </>
        )}

        <div 
          className="back-to-menu-link" 
          style={{ textAlign: "center" }}
          onClick={() => setPage("menu")}
        >
          <ion-icon name="arrow-back-outline" style={{ verticalAlign: "middle", marginRight: "5px" }}></ion-icon>
          Return to Menu
        </div>
      </div>
    </div>
  );
};

export default CartPage;
