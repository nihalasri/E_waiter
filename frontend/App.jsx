const { useState, useEffect } = React;

const App = () => {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({ name: "", mobile: "" });
  const [orderId, setOrderId] = useState(null);

  const navigate = (p) => setPage(p);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  return (
    <div className="app-shell">
      {page !== "home" && <TopNavbar />}
      {page === "home" && <Home onOrderNow={() => navigate("landing")} />}

      {page === "landing" && (
        <div className="page landing-page">
          <div className="bento-grid">
            <div
              className="bento-item glass item-1"
              onClick={() => navigate("menu")}
            >
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500"
                alt="Special"
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <h3>Chef's Choice</h3>
                <p>Signature dishes curated for you</p>
              </div>
            </div>
            <div
              className="bento-item glass item-2"
              onClick={() => navigate("menu")}
            >
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500"
                alt="Starters"
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <h3>Starters Paradise</h3>
              </div>
            </div>
            <div
              className="bento-item glass item-3"
              onClick={() => navigate("menu")}
            >
              <img
                src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=400"
                alt="Desserts"
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <h3>Sweet Bliss</h3>
              </div>
            </div>
            <div
              className="bento-item glass item-4"
              onClick={() => navigate("menu")}
            >
              <img
                src="https://images.unsplash.com/photo-1544145945-f904253d0c7b?auto=format&fit=crop&w=400"
                alt="Drinks"
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <h3>Refreshers</h3>
              </div>
            </div>
          </div>

          <BottomNav active="home" onNavigate={navigate} />
        </div>
      )}

      {page === "menu" && (
        <div className="page">
          <MenuSection
            addToCart={addToCart}
            cartCount={cart.length}
            onNavigate={navigate}
          />
        </div>
      )}

      {page === "cart" && (
        <div className="page">
          <CartPage
            cart={cart}
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
            setPage={setPage}
            setOrderId={setOrderId}
          />
        </div>
      )}

      {page === "orders" && (
        <div className="page">
          <OrderPrepare orderId={orderId} onNavigate={navigate} />
        </div>
      )}

      {page === "bill" && (
        <div className="page">
          <BillPage
            cart={cart}
            customerInfo={customerInfo}
            onNavigate={navigate}
            orderId={orderId}
          />
        </div>
      )}
    </div>
  );
};

const TopNavbar = () => (
    <div className="top-navbar">
        <div className="logo-container">
            <ion-icon name="restaurant-outline" style={{ fontSize: '1.8rem', color: 'var(--primary)' }}></ion-icon>
            <span className="website-name">Virtual Waiter</span>
        </div>
    </div>
);

const Home = ({ onOrderNow }) => (
  <div className="home-container">
    <div className="glass home-card">
      <div className="home-content">
        <ion-icon name="restaurant-outline" className="home-icon"></ion-icon>
        <h1 className="home-logo">Virtual Waiter</h1>
        <p className="home-subtitle">
          Experience the future of fine dining. Digital convenience meets gourmet excellence.
        </p>
        <button className="order-now-btn" onClick={onOrderNow}>
          ORDER NOW
        </button>
      </div>
    </div>
  </div>
);

const BottomNav = ({ active, onNavigate }) => (
  <nav className="bottom-nav glass">
    <div
      className={`nav-item ${active === "home" ? "active" : ""}`}
      onClick={() => onNavigate("landing")}
    >
      <ion-icon name="home-outline"></ion-icon>
      <span>Home</span>
    </div>
    <div
      className={`nav-item ${active === "menu" ? "active" : ""}`}
      onClick={() => onNavigate("menu")}
    >
      <ion-icon name="restaurant-outline"></ion-icon>
      <span>Menu</span>
    </div>
    <div
      className={`nav-item ${active === "orders" ? "active" : ""}`}
      onClick={() => onNavigate("orders")}
    >
      <ion-icon name="receipt-outline"></ion-icon>
      <span>Orders</span>
    </div>
    <div
      className={`nav-item ${active === "bill" ? "active" : ""}`}
      onClick={() => onNavigate("bill")}
    >
      <ion-icon name="card-outline"></ion-icon>
      <span>Wait Bill</span>
    </div>
  </nav>
);

const MenuSection = ({ addToCart, cartCount, onNavigate }) => {
  const [categories] = useState([
    "Chef Signature",
    "Veg Soup",
    "Non-Veg Soup",
    "Veg Starter",
    "Non-Veg Starter",
    "Sea Food Starter",
    "Pasta",
    "Veg Rice",
    "Non-Veg Rice",
    "Noodles",
    "Gravies",
    "Biryani",
    "Desserts",
    "Drinks",
  ]);
  const [activeCat, setActiveCat] = useState("Chef Signature");
  const [items, setItems] = useState([]);

  useEffect(() => {
    // In a real app, fetch from API. For demo, we use static data matching the backend
    // This is a subset for preview
    const mockItems = [
      {
        id: 1,
        name: "Truffle Risotto",
        category: "Chef Signature",
        price: 450,
      },
      {
        id: 2,
        name: "Lobster Thermidor",
        category: "Chef Signature",
        price: 850,
      },
      {
        id: 3,
        name: "Pan Seared Scallops",
        category: "Chef Signature",
        price: 600,
      },
      { id: 222, name: "Paneer Tikka Royale", category: "Veg Starter", price: 280, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80" },
      { id: 13, name: "Crispy Chilly Babycorn", category: "Veg Starter", price: 190, image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80" },
      { id: 14, name: "Gobi Manchurian", category: "Veg Starter", price: 220, image: "https://images.unsplash.com/photo-1515003322196-76c2188c6af2?auto=format&fit=crop&w=500&q=80" },
      { id: 15, name: "Paneer 65", category: "Veg Starter", price: 240, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80" },
      { id: 16, name: "Mushroom Duplex", category: "Veg Starter", price: 260, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80" },
      { id: 105, name: "Dragon Paneer", category: "Veg Starter", price: 270, image: "https://images.unsplash.com/photo-1626074353723-8888b5ec182f?auto=format&fit=crop&w=500&q=80" },
      { id: 401, name: "Dragon Mushroom", category: "Veg Starter", price: 260, image: "https://images.unsplash.com/photo-1541014741259-df529411bc9a?auto=format&fit=crop&w=500&q=80" },
      { id: 402, name: "Gobi 65", category: "Veg Starter", price: 210, image: "https://images.unsplash.com/photo-1582234372722-50d7cccb01a2?auto=format&fit=crop&w=500&q=80" },
      { id: 403, name: "Mushroom Tikka", category: "Veg Starter", price: 270, image: "https://images.unsplash.com/photo-1510629954389-c1e0da47d414?auto=format&fit=crop&w=500&q=80" },
      { id: 404, name: "Corn Cheese Ball", category: "Veg Starter", price: 230, image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=500&q=80" },
      {
        id: 20,
        name: "Chicken Tikka",
        category: "Non-Veg Starter",
        price: 350,
      },
      { id: 30, name: "Fish Tikka", category: "Sea Food Starter", price: 450 },
    ];
    setItems(mockItems.filter((i) => i.category === activeCat));
  }, [activeCat]);

  return (
    <div className="menu-section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "1.8rem" }}>Our Menu</h2>
        <div
          onClick={() => onNavigate("cart")}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <ion-icon name="cart-outline" style={{ fontSize: "2rem" }}></ion-icon>
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: -5,
                right: -5,
                background: "var(--primary)",
                borderRadius: "50%",
                width: 18,
                height: 18,
                fontSize: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cartCount}
            </span>
          )}
        </div>
      </div>

      <div className="category-tabs">
        {categories.map((c) => (
          <div
            key={c}
            className={`tab ${activeCat === c ? "active" : ""}`}
            onClick={() => setActiveCat(c)}
          >
            {c}
          </div>
        ))}
      </div>

      <div className="dish-grid">
        {items.length > 0 ? (
          items.map((dish) => (
            <div key={dish.id} className="dish-card glass-card glass">
              <img
                className="dish-img"
                src={`https://api.placeholder.com/150?text=${dish.name}`}
                alt={dish.name}
              />
              <div className="dish-name">{dish.name}</div>
              <div className="dish-price">₹{dish.price}</div>
              <button className="add-btn" onClick={() => addToCart(dish)}>
                <ion-icon name="add-outline"></ion-icon>
              </button>
            </div>
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              width: "100%",
              gridColumn: "1/-1",
              color: "#94a3b8",
            }}
          >
            Loading {activeCat} items...
          </p>
        )}
      </div>

      <BottomNav active="menu" onNavigate={onNavigate} />
    </div>
  );
};

const CartPage = ({
  cart,
  customerInfo,
  setCustomerInfo,
  setPage,
  setOrderId,
}) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleConfirm = () => {
    if (!customerInfo.name || !customerInfo.mobile) {
      alert("Please fill in your details");
      return;
    }
    setOrderId(Math.floor(Math.random() * 1000));
    setPage("orders");
  };

  return (
    <div className="form-container">
      <h2 style={{ marginBottom: "20px" }}>Checkout</h2>
      <div className="glass" style={{ padding: "20px", marginBottom: "20px" }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <hr
          style={{
            border: "0.1px solid rgba(255,255,255,0.1)",
            margin: "15px 0",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 600,
          }}
        >
          <span>Total</span>
          <span style={{ color: "var(--accent)" }}>₹{total}</span>
        </div>
      </div>

      <h3 style={{ marginBottom: "10px" }}>Your Details</h3>
      <input
        type="text"
        placeholder="Name"
        value={customerInfo.name}
        onChange={(e) =>
          setCustomerInfo({ ...customerInfo, name: e.target.value })
        }
      />
      <input
        type="tel"
        placeholder="Mobile Number"
        value={customerInfo.mobile}
        onChange={(e) =>
          setCustomerInfo({ ...customerInfo, mobile: e.target.value })
        }
      />

      <button
        className="order-now-btn"
        style={{ width: "100%", marginTop: "10px" }}
        onClick={handleConfirm}
      >
        PLACE ORDER
      </button>
      <button
        className="nav-item"
        style={{
          width: "100%",
          padding: "15px",
          color: "#94a3b8",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setPage("menu")}
      >
        Back to Menu
      </button>
    </div>
  );
};

const OrderPrepare = ({ orderId, onNavigate }) => {
  if (!orderId) {
    return (
      <div className="home-container">
        <div className="glass" style={{ padding: "40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <ion-icon
            name="receipt-outline"
            style={{ fontSize: "5rem", color: "rgba(255,255,255,0.2)", marginBottom: "20px" }}
          ></ion-icon>
          <h2 style={{ margin: "10px 0", fontSize: "1.8rem" }}>No Orders Yet</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", marginBottom: "30px", maxWidth: "80%" }}>
            You haven't ordered anything yet. Place your first order.
          </p>
          <button
            onClick={() => onNavigate("menu")}
            style={{
              padding: "12px 30px",
              background: "var(--primary)",
              border: "none",
              color: "white",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "1.1rem",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.6)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(59, 130, 246, 0.4)";
            }}
          >
            Start Ordering
          </button>
        </div>
        <BottomNav active="orders" onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="glass" style={{ padding: "40px", textAlign: "center" }}>
        <ion-icon
          name="time-outline"
          style={{ fontSize: "4rem", color: "var(--accent)" }}
        ></ion-icon>
        <h2 style={{ margin: "20px 0" }}>Order Preparing...</h2>
        <p>Order ID: #{orderId}</p>
        <p style={{ color: "#94a3b8", margin: "10px 0" }}>
          Estimated Time: 15-20 Minutes
        </p>
        <div
          style={{
            width: "100%",
            height: "4px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "2px",
            overflow: "hidden",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              width: "40%",
              height: "100%",
              background: "var(--primary)",
              animation: "progress 3s infinite ease-in-out",
            }}
          ></div>
        </div>
      </div>
      <style>{`
              @keyframes progress {
                  0% { width: 0%; transform: translateX(0); }
                  50% { width: 50%; }
                  100% { width: 100%; transform: translateX(100%); }
              }
          `}</style>
      <BottomNav active="orders" onNavigate={onNavigate} />
    </div>
  );
};

const BillPage = ({ cart, customerInfo, onNavigate, orderId }) => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const [showPayment, setShowPayment] = React.useState(false);
    const [method, setMethod] = React.useState(null);

    if (!orderId) {
        return (
          <div className="home-container">
            <div className="glass" style={{ padding: "40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <ion-icon
                name="document-text-outline"
                style={{ fontSize: "5rem", color: "rgba(255,255,255,0.2)", marginBottom: "20px" }}
              ></ion-icon>
              <h2 style={{ margin: "10px 0", fontSize: "1.8rem" }}>No Bill Generated Yet</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", marginBottom: "30px", maxWidth: "80%" }}>
                Your bill will appear here once you place your order
              </p>
              <button
                onClick={() => onNavigate("menu")}
                style={{
                  padding: "12px 30px",
                  background: "var(--primary)",
                  border: "none",
                  color: "white",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.6)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(59, 130, 246, 0.4)";
                }}
              >
                Start Ordering
              </button>
            </div>
            <BottomNav active="bill" onNavigate={onNavigate} />
          </div>
        );
    }

    if (method) {
        return (
            <div className="home-container">
                <div className="glass" style={{padding: '40px', textAlign: 'center'}}>
                    <ion-icon name="checkmark-circle-outline" style={{fontSize: '4rem', color: '#22c55e'}}></ion-icon>
                    <h2 style={{margin: '20px 0'}}>Payment {method === 'Cash' ? 'Requested' : 'Successful'}!</h2>
                    <p style={{color: '#94a3b8'}}>
                        {method === 'Cash' 
                            ? "A waiter will be at your table shortly to collect cash." 
                            : "Thank you for your digital payment. Your receipt is being generated."
                        }
                    </p>
                    <button className="order-now-btn" style={{marginTop: '30px'}} onClick={() => window.location.reload()}>Finish</button>
                </div>
            </div>
        );
    }

    return (
        <div className="form-container">
            <div className="glass" style={{padding: '30px', textAlign: 'center'}}>
                <h2 style={{marginBottom: '20px'}}>Final Bill</h2>
                <p style={{color: '#94a3b8'}}>Customer: {customerInfo.name}</p>
                <div style={{margin: '30px 0', textAlign: 'left'}}>
                    {cart.map(item => (
                        <div key={item.id} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem'}}>
                            <span>{item.name} x {item.quantity}</span>
                            <span>₹{item.price * item.quantity}</span>
                        </div>
                    ))}
                    <hr style={{border: '0.1px solid rgba(255,255,255,0.1)', margin: '15px 0'}} />
                    <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '1.2rem'}}>
                        <span>Payable Amount</span>
                        <span style={{color: 'var(--accent)'}}>₹{total}</span>
                    </div>
                </div>

                {!showPayment ? (
                    <button className="order-now-btn" style={{width: '100%'}} onClick={() => setShowPayment(true)}>PAY NOW</button>
                ) : (
                    <div className="page" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                        <h4 style={{marginBottom: '10px'}}>Select Payment Method</h4>
                        <div 
                            className="glass-card glass" 
                            style={{padding: '15px', display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '15px'}}
                            onClick={() => setMethod('UPI')}
                        >
                            <ion-icon name="qr-code-outline" style={{fontSize: '1.5rem', color: 'var(--primary)'}}></ion-icon>
                            <span>Pay via UPI / QR Code</span>
                        </div>
                        <div 
                            className="glass-card glass" 
                            style={{padding: '15px', display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '15px'}}
                            onClick={() => setMethod('Cash')}
                        >
                            <ion-icon name="cash-outline" style={{fontSize: '1.5rem', color: 'var(--accent)'}}></ion-icon>
                            <span>Pay by Cash</span>
                        </div>
                    </div>
                )}
            </div>
            <BottomNav active="bill" onNavigate={onNavigate} />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
