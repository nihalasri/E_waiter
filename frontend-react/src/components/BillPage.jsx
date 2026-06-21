import React, { useState, useEffect } from 'react';

const BillPage = ({ cart, customerInfo, onNavigate, orderId }) => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const [showPayment, setShowPayment] = useState(false);
    const [method, setMethod] = useState(null);
    const [orderStatus, setOrderStatus] = useState(null);
    const [showUpiOptions, setShowUpiOptions] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleUpiPayment = (appType) => {
        const upiString = `pa=restaurant@upi&pn=E_Waiter&am=${total}&cu=INR`;
        
        // Attempt to trigger the native app intents or fallback to web
        if (appType === 'gpay') {
            window.location.href = `gpay://upi/pay?${upiString}`;
        } else if (appType === 'phonepe') {
            window.location.href = `phonepe://pay?${upiString}`;
        }

        setIsProcessing(true);
        // Simulating API integration with payment gateway (GPay, PhonePe)
        setTimeout(() => {
            setIsProcessing(false);
            setShowUpiOptions(false);
            setMethod('UPI_Success');
        }, 2500);
    };

    useEffect(() => {
        const fetchStatus = async () => {
            if (!orderId) return;
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/order/status/${orderId}`);
                const data = await response.json();
                if (response.ok) {
                    setOrderStatus(data.status);
                }
            } catch (err) {
                console.error("Error fetching order status:", err);
            }
        };
        fetchStatus();
    }, [orderId]);

    if (!orderId || orderStatus === 'Cancelled') {
        return (
          <div className="home-container">
            <div className="glass" style={{ padding: "40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <ion-icon
                name={orderStatus === 'Cancelled' ? "close-circle-outline" : "document-text-outline"}
                style={{ fontSize: "5rem", color: orderStatus === 'Cancelled' ? "var(--accent)" : "rgba(255,255,255,0.2)", marginBottom: "20px" }}
              ></ion-icon>
              <h2 style={{ margin: "10px 0", fontSize: "1.8rem" }}>{orderStatus === 'Cancelled' ? 'Order Cancelled' : 'No Bill Generated Yet'}</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", marginBottom: "30px", maxWidth: "80%" }}>
                {orderStatus === 'Cancelled' ? 'Your order has been cancelled. No bill is due.' : 'Your bill will appear here once you place your order'}
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
          </div>
        );
    }

    if (isProcessing) {
        return (
            <div className="home-container">
                <div className="glass" style={{padding: '40px', textAlign: 'center'}}>
                    <ion-icon name="sync-outline" style={{fontSize: '4rem', color: '#3b82f6', display: 'inline-block', animation: 'spin 2s linear infinite'}}></ion-icon>
                    <h2 style={{margin: '20px 0'}}>Processing Payment...</h2>
                    <p style={{color: '#94a3b8'}}>Please wait while we confirm with the bank. Do not close this window.</p>
                </div>
                <style>{`
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    if (showUpiOptions) {
        return (
            <div className="home-container">
                <div className="glass" style={{padding: '40px', textAlign: 'center'}}>
                    <h2 style={{margin: '20px 0'}}>Scan to Pay <span style={{ color: "var(--accent)" }}>₹{total}</span></h2>
                    <div style={{ padding: '10px', borderRadius: '15px', display: 'inline-block', margin: '20px 0', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <img 
                            src="/qr-code.png" 
                            alt="Your UPI QR Code" 
                            style={{ display: 'block', width: '200px', height: '200px', borderRadius: '10px' }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=restaurant@upi&pn=E_Waiter&am=${total}&cu=INR`;
                            }}
                        />
                    </div>
                    <p style={{color: '#94a3b8', marginBottom: '20px', fontSize: '0.9rem'}}>Scan with any UPI scanner</p>
                    
                    <div style={{ margin: '30px 0' }}>
                        <p style={{color: '#ffffff', marginBottom: '15px', fontWeight: 'bold'}}>Or Pay using Apps:</p>
                        <div style={{display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap'}}>
                            <button 
                                onClick={() => handleUpiPayment('gpay')}
                                style={{ padding: '12px 25px', background: '#ffffff', border: '1px solid #ddd', borderRadius: '12px', cursor: 'pointer', transition: 'transform 0.2s' }}
                                onMouseOver={e => e.currentTarget.style.transform = "translateY(-3px)"}
                                onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" style={{height: '24px'}} />
                            </button>
                            <button 
                                onClick={() => handleUpiPayment('phonepe')}
                                style={{ padding: '12px 25px', background: '#5f259f', border: 'none', borderRadius: '12px', cursor: 'pointer', transition: 'transform 0.2s' }}
                                onMouseOver={e => e.currentTarget.style.transform = "translateY(-3px)"}
                                onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" style={{height: '24px'}} />
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        style={{ marginTop: '20px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline' }} 
                        onClick={() => setShowUpiOptions(false)}
                    >
                        Change Payment Method
                    </button>
                </div>
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
                            onClick={() => setShowUpiOptions(true)}
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
        </div>
    );
};

export default BillPage;
