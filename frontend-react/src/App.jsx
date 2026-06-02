import React, { useState } from 'react';
import Home from './components/Home';
import MenuSection from './components/MenuSection';
import BottomNav from './components/BottomNav';
import CartPage from './components/CartPage';
import OrderPrepare from './components/OrderPrepare';
import BillPage from './components/BillPage';
import TopNavbar from './components/TopNavbar';
import AdminPanel from './components/AdminPanel';
import './index.css';

import refreshersImg from './assets/dishes/premium_refreshers.png';
import specialImg from './assets/dishes/premium_special.png';
import startersImg from './assets/dishes/premium_starters.png';
import dessertsImg from './assets/dishes/premium_desserts.png';

const App = () => {
    const [page, setPage] = useState('home');
    
    const [cart, setCart] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({ name: '', mobile: '' });
    const [orderId, setOrderId] = useState(null);
    const [activeCategory, setActiveCategory] = useState("Chef Signature");

    const navigate = (p, cat = "Chef Signature") => {
        setPage(p);
        if (cat) setActiveCategory(cat);
    };

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (!existing) return prev;
            if (existing.quantity > 1) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i);
            }
            return prev.filter(i => i.id !== item.id);
        });
    };

    return (
        <div className="app-shell">
            {page !== 'home' && <TopNavbar onNavigate={navigate} />}
            {page === 'home' && <Home onOrderNow={() => navigate('landing')} />}
            
            {page === 'landing' && (
                <div className="page landing-page">
                    <div className="bento-grid">
                        <div className="bento-item glass item-1" onClick={() => navigate('menu', 'Chef Signature')}>
                            <img src={specialImg} alt="Special" />
                            <div>
                                <h3>Chef's Choice</h3>
                                <p>Signature dishes curated for you</p>
                            </div>
                        </div>
                        <div className="bento-item glass item-2" onClick={() => navigate('menu', 'Veg Starter')}>
                            <img src={startersImg} alt="Starters" />
                            <div>
                                <h3>Starters Paradise</h3>
                            </div>
                        </div>
                        <div className="bento-item glass item-3" onClick={() => navigate('menu', 'Desserts')}>
                            <img src={dessertsImg} alt="Desserts" />
                            <div>
                                <h3>Sweet Bliss</h3>
                            </div>
                        </div>
                        <div className="bento-item glass item-4" onClick={() => navigate('menu', 'Drinks')}>
                            <img src={refreshersImg} alt="Drinks" />
                            <div>
                                <h3>Refreshers</h3>
                            </div>
                        </div>
                    </div>
                    
                    <BottomNav active="home" onNavigate={navigate} />
                </div>
            )}

            {page === 'menu' && (
                <div className="page">
                    <MenuSection 
                        cart={cart}
                        setCart={setCart}
                        addToCart={addToCart} 
                        removeFromCart={removeFromCart}
                        cartCount={cart.length} 
                        onNavigate={navigate} 
                        initialCategory={activeCategory}
                    />
                </div>
            )}

            {page === 'cart' && (
                <div className="page">
                    <CartPage 
                        cart={cart} 
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        customerInfo={customerInfo} 
                        setCustomerInfo={setCustomerInfo} 
                        setPage={setPage}
                        setOrderId={setOrderId}
                    />
                </div>
            )}

            {page === 'orders' && (
                <div className="page">
                    <OrderPrepare orderId={orderId} onNavigate={navigate} />
                </div>
            )}

            {page === 'bill' && (
                <div className="page">
                    <BillPage cart={cart} customerInfo={customerInfo} onNavigate={navigate} orderId={orderId} />
                </div>
            )}

            {page === 'admin' && (
                <div className="page">
                    <AdminPanel onNavigate={navigate} />
                </div>
            )}
        </div>
    );
};

export default App;
