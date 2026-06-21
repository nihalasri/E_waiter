import React, { useState, useEffect } from "react";

const OrderPrepare = ({ orderId, onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [status, setStatus] = useState("Preparing");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/order/status/${orderId}`);
        const data = await response.json();
        if (response.ok) {
          setTimeLeft(data.remaining_cancel_time);
          setStatus(data.status);
        }
      } catch (err) {
        console.error("Error fetching order status:", err);
      }
    };
    if (orderId) {
      fetchStatus();
      const interval = setInterval(fetchStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [orderId]);

  useEffect(() => {
    if (timeLeft > 0 && status !== "Cancelled") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, status]);

  const handleCancel = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/order/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId }),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus("Cancelled");
        setMessage("Order cancelled successfully.");
      } else {
        setMessage(data.error || "Failed to cancel order.");
      }
    } catch (err) {
      setMessage("Error connecting to server. Ensure app.py is running on http://127.0.0.1:5000");
    }
  };

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
              boxShadow: "0 4px 15px rgba(205, 162, 80, 0.4)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(205, 162, 80, 0.6)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(205, 162, 80, 0.4)";
            }}
          >
            Start Ordering
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="glass" style={{ padding: "40px", textAlign: "center" }}>
        <ion-icon
          name={status === "Cancelled" ? "close-circle-outline" : status === "Completed" ? "restaurant-outline" : status === "Confirmed" ? "checkmark-circle-outline" : "time-outline"}
          style={{
            fontSize: "4rem",
            color: status === "Cancelled" ? "var(--accent)" : status === "Completed" ? "#fbbf24" : status === "Confirmed" ? "#10b981" : "var(--primary)",
          }}
        ></ion-icon>
        <h2 style={{ margin: "20px 0", color: status === "Completed" ? '#fbbf24' : status === "Confirmed" ? '#10b981' : 'inherit' }}>
          {status === "Cancelled" ? "Order Cancelled" : status === "Completed" ? "Order Preparation Done!" : status === "Confirmed" ? "Order Confirmed!" : "Order Preparing..."}
        </h2>
        <p>Order ID: #{orderId}</p>

        {status !== "Cancelled" && status !== "Completed" && (
          <>
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

            {timeLeft > 0 && (
              <div style={{ marginTop: "30px" }}>
                <p style={{ fontSize: "0.9rem", color: "#94a3b8", marginBottom: "15px" }}>
                  You can cancel within: {timeLeft}s
                </p>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: "12px 24px",
                    background: "rgba(255, 71, 87, 0.2)",
                    border: "1px solid var(--accent)",
                    color: "var(--accent)",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "var(--accent)";
                    e.target.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "rgba(255, 71, 87, 0.2)";
                    e.target.style.color = "var(--accent)";
                  }}
                >
                  Cancel Order
                </button>
              </div>
            )}
          </>
        )}

        {status === "Completed" && (
          <div style={{ marginTop: "20px" }}>
            <p style={{ fontSize: "1.1rem", color: "#e2e8f0", marginBottom: "30px", fontWeight: "300" }}>
               Ready to serve! We hope you enjoy your meal. Happy Dining! ✨
            </p>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
                <button 
                  onClick={() => onNavigate('menu')}
                  style={{
                      padding: "12px 24px",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "0.3s"
                  }}
                  onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                  onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                >
                    Your Next Order
                </button>
                <button 
                  onClick={() => onNavigate('bill')}
                  style={{
                      padding: "12px 24px",
                      background: "var(--primary)",
                      border: "none",
                      color: "white",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "0.3s",
                      boxShadow: "0 4px 15px rgba(205, 162, 80, 0.4)"
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                    Pay Bill
                </button>
            </div>
          </div>
        )}

        {message && (
          <p
            style={{
              marginTop: "20px",
              color: status === "Cancelled" ? "var(--accent)" : "#10b981",
            }}
          >
            {message}
          </p>
        )}

        {status === "Cancelled" && (
            <button 
                onClick={() => onNavigate('menu')}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    background: "var(--primary)",
                    border: "none",
                    color: "white",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}
            >
                Back to Menu
            </button>
        )}
      </div>
      <style>{`
                @keyframes progress {
                    0% { width: 0%; transform: translateX(0); }
                    50% { width: 50%; }
                    100% { width: 100%; transform: translateX(100%); }
                }
            `}</style>
    </div>
  );
};

export default OrderPrepare;
