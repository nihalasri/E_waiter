import React, { useState, useEffect } from 'react';

const AdminPanel = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'users', 'stock'
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [showAddModal, setShowAddModal] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [newItemCategory, setNewItemCategory] = useState('Chef Signature');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [newItemDescription, setNewItemDescription] = useState('');
    const [imageSource, setImageSource] = useState('file'); // 'file' or 'url'
    const [newItemImageUrl, setNewItemImageUrl] = useState('');
    const [newItemImageFile, setNewItemImageFile] = useState(null);
    const [addingItem, setAddingItem] = useState(false);
    const [addError, setAddError] = useState('');

    const CATEGORIES = [
        "Chef Signature",
        "Veg Soup",
        "Non-Veg Soup",
        "Veg Starter",
        "Non-Veg Starter",
        "Sea Food Starter",
        "Veg Rice",
        "Non-Veg Rice",
        "Veg Noodles",
        "Non-Veg Noodles",
        "Veg Gravy",
        "Non-Veg Gravy",
        "Biryani",
        "Indian Bread",
        "Pasta",
        "Desserts",
        "Drinks",
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        const expectedUser = import.meta.env.VITE_ADMIN_USERNAME || 'Nihal';
        const expectedPass = import.meta.env.VITE_ADMIN_PASSWORD || 'Nihal';
        if (username.trim() === expectedUser && password === expectedPass) {
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('Invalid username or password');
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        setAddingItem(true);
        setAddError('');
        
        try {
            const formData = new FormData();
            formData.append('name', newItemName);
            formData.append('category', newItemCategory);
            formData.append('price', newItemPrice);
            formData.append('description', newItemDescription);
            
            if (imageSource === 'file') {
                if (!newItemImageFile) {
                    throw new Error('Please select an image file to upload.');
                }
                formData.append('image_file', newItemImageFile);
            } else {
                formData.append('image_url', newItemImageUrl);
            }

            const response = await fetch('http://127.0.0.1:5000/api/admin/menu', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to add menu item');
            }

            // Reset form fields
            setNewItemName('');
            setNewItemCategory('Chef Signature');
            setNewItemPrice('');
            setNewItemDescription('');
            setNewItemImageUrl('');
            setNewItemImageFile(null);
            setShowAddModal(false);

            // Fetch updated items
            await fetchData();
            alert('Menu item added successfully!');
        } catch (err) {
            setAddError(err.message);
        } finally {
            setAddingItem(false);
        }
    };



    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            if (activeTab === 'orders') {
                const res = await fetch('http://127.0.0.1:5000/api/admin/orders');
                if (!res.ok) throw new Error('Failed to fetch orders');
                setOrders(await res.json());
            } else if (activeTab === 'users') {
                const res = await fetch('http://127.0.0.1:5000/api/admin/users');
                if (!res.ok) throw new Error('Failed to fetch users');
                setUsers(await res.json());
            } else if (activeTab === 'stock') {
                const res = await fetch('http://127.0.0.1:5000/api/menu');
                if (!res.ok) throw new Error('Failed to fetch menu items');
                setMenuItems(await res.json());
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;
        fetchData();
        const interval = setInterval(() => {
            if (activeTab === 'orders') fetchData();
        }, 10000);
        return () => clearInterval(interval);
    }, [activeTab, isAuthenticated]);

    const updateStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/admin/order/${orderId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) throw new Error('Failed to update status');
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        } catch (err) {
            alert('Error updating status: ' + err.message);
        }
    };

    const toggleStock = async (itemId, currentStatus) => {
        try {
            const newStatus = !currentStatus;
            const response = await fetch(`http://127.0.0.1:5000/api/admin/menu/${itemId}/availability`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_available: newStatus }),
            });
            if (!response.ok) throw new Error('Failed to update stock status');
            setMenuItems(prev => prev.map(item => item.id === itemId ? { ...item, is_available: newStatus } : item));
        } catch (err) {
            alert('Error updating stock: ' + err.message);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return '#10b981'; // Green
            case 'Confirmed': return '#3b82f6'; // Blue
            case 'Preparing': return '#f59e0b'; // Orange
            case 'Cancelled': return '#ef4444'; // Red
            default: return '#6b7280'; // Gray
        }
    };

    const StatusBadge = ({ status }) => (
        <span style={{
            backgroundColor: `${getStatusColor(status)}20`,
            color: getStatusColor(status),
            padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600',
            border: `1px solid ${getStatusColor(status)}40`, display: 'inline-block'
        }}>
            {status}
        </span>
    );

    const TabButton = ({ id, label, icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            style={{
                flex: 1,
                padding: '12px 20px',
                background: activeTab === id ? 'rgba(96, 165, 250, 0.2)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${activeTab === id ? 'rgba(96, 165, 250, 0.4)' : 'rgba(255,255,255,0.1)'}`,
                color: activeTab === id ? '#60a5fa' : '#94a3b8',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
            }}
        >
            <ion-icon name={icon}></ion-icon> {label}
        </button>
    );

    if (!isAuthenticated) {
        return (
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                color: '#f8fafc', fontFamily: "'Inter', sans-serif"
            }}>
                <form onSubmit={handleLogin} style={{
                    background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)', padding: '40px',
                    borderRadius: '20px', width: '100%', maxWidth: '400px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)', animation: 'fadeIn 0.5s ease'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <ion-icon name="shield-checkmark-outline" style={{ display: 'block', margin: '0 auto 10px', fontSize: '4rem', color: '#60a5fa' }}></ion-icon>
                        <h2 style={{ margin: '10px 0 0', fontWeight: '800' }}>Admin Login</h2>
                    </div>

                    {loginError && <div style={{ color: '#ef4444', marginBottom: '15px', textAlign: 'center', fontSize: '0.9rem' }}>{loginError}</div>}

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.9rem' }}>Username</label>
                        <input 
                            type="text" 
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            style={{
                                boxSizing: 'border-box',
                                width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '10px', color: 'white', outline: 'none'
                            }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.9rem' }}>Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{
                                boxSizing: 'border-box',
                                width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '10px', color: 'white', outline: 'none'
                            }}
                            required
                        />
                    </div>

                    <button type="submit" style={{
                        width: '100%', padding: '14px', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', border: 'none',
                        borderRadius: '10px', color: 'white', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer',
                        transition: 'opacity 0.3s ease'
                    }} onMouseOver={e => e.currentTarget.style.opacity = '0.9'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                        Login to Dashboard
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button type="button" onClick={() => onNavigate('home')} style={{
                            background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.9rem',
                            textDecoration: 'underline'
                        }}>Return to Store</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div style={{
            padding: '20px',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
            color: '#f8fafc',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '800', background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Admin Dashboard
                    </h1>
                    <p style={{ margin: '5px 0 0', color: '#94a3b8' }}>Manage System Data</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={() => onNavigate('home')}
                        style={{
                            background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.4)',
                            color: '#60a5fa', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer',
                            backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: '8px',
                            transition: 'all 0.3s ease', fontWeight: 'bold'
                        }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)'}
                        onMouseOut={e => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'}
                    >
                        <ion-icon name="home-outline"></ion-icon> User Panel
                    </button>
                    <button 
                        onClick={fetchData}
                        style={{
                            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                            color: 'white', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer',
                            backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: '8px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                        onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    >
                        <ion-icon name="refresh-outline"></ion-icon> Refresh
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <TabButton id="orders" label="Live Orders" icon="restaurant-outline" />
                <TabButton id="stock" label="Stock & Menu" icon="layers-outline" />
                <TabButton id="users" label="User Data" icon="people-outline" />
            </div>

            {loading && orders.length === 0 && users.length === 0 && menuItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8' }}>Loading Data...</div>
            ) : error ? (
                <div style={{ textAlign: 'center', padding: '50px', color: '#ef4444' }}>Error: {error}</div>
            ) : (
                <>
                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        orders.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                                <ion-icon name="receipt-outline" style={{ fontSize: '3rem', marginBottom: '10px' }}></ion-icon>
                                <h3>No Orders Yet</h3>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                                {orders.map(order => (
                                    <div key={order.id} style={{
                                        background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '24px',
                                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)', transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        animation: 'fadeIn 0.5s ease'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', marginBottom: '16px' }}>
                                            <div>
                                                <h2 style={{ margin: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    #{order.id} <StatusBadge status={order.status} />
                                                </h2>
                                                <p style={{ margin: '8px 0 0', color: '#94a3b8', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <ion-icon name="time-outline"></ion-icon>
                                                    {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fbbf24' }}>₹{order.total_amount}</div>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '8px', borderRadius: '50%', display: 'flex', color: '#60a5fa' }}>
                                                    <ion-icon name="person-outline"></ion-icon>
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '600' }}>{order.customer_name || 'Guest'}</div>
                                                    <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{order.customer_mobile || 'No Number'}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                                            <h4 style={{ margin: '0 0 12px 0', color: '#cbd5e1', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Order Items</h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                {order.items && order.items.map((item, idx) => (
                                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                                                        <span><span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{item.quantity}x</span> {item.name}</span>
                                                        <span style={{ color: '#94a3b8' }}>₹{item.price * item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <select 
                                                    value={order.status}
                                                    onChange={(e) => updateStatus(order.id, e.target.value)}
                                                    style={{
                                                        flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                                                        color: 'white', outline: 'none', cursor: 'pointer', fontSize: '0.95rem'
                                                    }}
                                                >
                                                    <option value="Preparing" style={{ background: '#1e293b' }}>Preparing</option>
                                                    <option value="Confirmed" style={{ background: '#1e293b' }}>Confirmed</option>
                                                    <option value="Completed" style={{ background: '#1e293b' }}>Completed</option>
                                                    <option value="Cancelled" style={{ background: '#1e293b' }}>Cancelled</option>
                                                </select>
                                            </div>
                                            
                                            {order.status === 'Preparing' && (
                                                <button 
                                                    onClick={() => updateStatus(order.id, 'Confirmed')}
                                                    style={{
                                                        background: 'rgba(16, 185, 129, 0.2)',
                                                        color: '#10b981',
                                                        border: '1px solid #10b981',
                                                        padding: '10px',
                                                        borderRadius: '10px',
                                                        cursor: 'pointer',
                                                        fontWeight: 'bold',
                                                        fontSize: '0.95rem',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseOver={e => {
                                                        e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)';
                                                    }}
                                                    onMouseOut={e => {
                                                        e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)';
                                                    }}
                                                >
                                                    <ion-icon name="checkmark-circle-outline" style={{ verticalAlign: 'middle', marginRight: '5px', fontSize: '1.2rem' }}></ion-icon>
                                                    Confirm Order
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}

                    {/* Stock & Menu Tab */}
                    {activeTab === 'stock' && (
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.05)', borderRadius: '20px', padding: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.1)', animation: 'fadeIn 0.5s ease'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
                                <h2 style={{ margin: 0, color: '#c084fc' }}>Manage Stock & Menu</h2>
                                <button 
                                    onClick={() => setShowAddModal(true)}
                                    style={{
                                        background: 'linear-gradient(to right, #10b981, #059669)',
                                        border: 'none',
                                        color: 'white',
                                        padding: '10px 20px',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontWeight: 'bold',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.opacity = 0.9}
                                    onMouseOut={e => e.currentTarget.style.opacity = 1}
                                >
                                    <ion-icon name="add-circle-outline" style={{ fontSize: '1.2rem' }}></ion-icon>
                                    Add New Dish
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                                {menuItems.map(item => (
                                    <div key={item.id} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px',
                                        border: `1px solid ${item.is_available ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                                    }}>
                                        <div>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: item.is_available ? 'white' : '#94a3b8' }}>
                                                {item.name}
                                            </div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
                                                {item.category} • ₹{item.price}
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => toggleStock(item.id, item.is_available)}
                                            style={{
                                                padding: '10px 20px',
                                                borderRadius: '30px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                background: item.is_available ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                                color: item.is_available ? '#10b981' : '#ef4444',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {item.is_available ? 'In Stock' : 'Out of Stock'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Users Data Tab */}
                    {activeTab === 'users' && (
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.05)', borderRadius: '20px', padding: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.1)', animation: 'fadeIn 0.5s ease'
                        }}>
                            <h2 style={{ marginBottom: '20px', color: '#60a5fa' }}>Customer Database</h2>
                            {users.length === 0 ? (
                                <p style={{ color: '#94a3b8' }}>No customer data available yet.</p>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                                    {users.map((user, idx) => (
                                        <div key={idx} style={{
                                            background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '20px',
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                                <div style={{ 
                                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
                                                    width: '50px', height: '50px', borderRadius: '50%',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '1.5rem', fontWeight: 'bold'
                                                }}>
                                                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{user.name || 'Unknown'}</div>
                                                    <div style={{ color: '#94a3b8' }}>M: {user.mobile}</div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
                                                <div>
                                                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Total Orders</div>
                                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{user.total_orders}</div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Total Spent</div>
                                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#fbbf24' }}>₹{user.total_spent}</div>
                                                </div>
                                            </div>
                                            <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '10px', textAlign: 'center' }}>
                                                Last Order: {new Date(user.last_order_date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
            
            {/* Modal for adding new menu item */}
            {showAddModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
                    zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '20px', color: '#f8fafc'
                }}>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '30px', borderRadius: '24px', width: '100%', maxWidth: '500px',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)', position: 'relative',
                        animation: 'fadeIn 0.3s ease', fontFamily: "'Inter', sans-serif"
                    }}>
                        <button 
                            onClick={() => setShowAddModal(false)}
                            style={{
                                position: 'absolute', top: '20px', right: '20px', background: 'none',
                                border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem'
                            }}
                        >
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                        
                        <h2 style={{ margin: '0 0 20px 0', color: '#10b981', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ion-icon name="add-circle-outline"></ion-icon> Add New Dish
                        </h2>

                        {addError && <div style={{ color: '#ef4444', marginBottom: '15px', fontSize: '0.9rem', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px' }}>{addError}</div>}

                        <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.9rem', fontWeight: '600' }}>Dish Name *</label>
                                <input 
                                    type="text" 
                                    value={newItemName}
                                    onChange={e => setNewItemName(e.target.value)}
                                    style={{
                                        boxSizing: 'border-box', width: '100%', padding: '12px',
                                        background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '10px', color: 'white', outline: 'none'
                                    }}
                                    required
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.9rem', fontWeight: '600' }}>Category *</label>
                                    <select 
                                        value={newItemCategory}
                                        onChange={e => setNewItemCategory(e.target.value)}
                                        style={{
                                            boxSizing: 'border-box', width: '100%', padding: '12px',
                                            background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '10px', color: 'white', outline: 'none', cursor: 'pointer'
                                        }}
                                        required
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat} style={{ background: '#0f172a' }}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.9rem', fontWeight: '600' }}>Price (₹) *</label>
                                    <input 
                                        type="number" 
                                        value={newItemPrice}
                                        onChange={e => setNewItemPrice(e.target.value)}
                                        style={{
                                            boxSizing: 'border-box', width: '100%', padding: '12px',
                                            background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '10px', color: 'white', outline: 'none'
                                        }}
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.9rem', fontWeight: '600' }}>Description</label>
                                <textarea 
                                    value={newItemDescription}
                                    onChange={e => setNewItemDescription(e.target.value)}
                                    rows="2"
                                    style={{
                                        boxSizing: 'border-box', width: '100%', padding: '12px',
                                        background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '10px', color: 'white', outline: 'none', resize: 'vertical'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '0.9rem', fontWeight: '600' }}>Image Source</label>
                                <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                        <input 
                                            type="radio" 
                                            name="imageSource" 
                                            value="file" 
                                            checked={imageSource === 'file'}
                                            onChange={() => setImageSource('file')}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <span>Upload File</span>
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                        <input 
                                            type="radio" 
                                            name="imageSource" 
                                            value="url" 
                                            checked={imageSource === 'url'}
                                            onChange={() => setImageSource('url')}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <span>Image URL</span>
                                    </label>
                                </div>

                                {imageSource === 'file' ? (
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={e => setNewItemImageFile(e.target.files[0])}
                                        style={{
                                            boxSizing: 'border-box', width: '100%', padding: '8px',
                                            background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '10px', color: '#cbd5e1', outline: 'none', cursor: 'pointer'
                                        }}
                                        required={imageSource === 'file'}
                                    />
                                ) : (
                                    <input 
                                        type="url" 
                                        placeholder="https://example.com/dish.jpg"
                                        value={newItemImageUrl}
                                        onChange={e => setNewItemImageUrl(e.target.value)}
                                        style={{
                                            boxSizing: 'border-box', width: '100%', padding: '12px',
                                            background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '10px', color: 'white', outline: 'none'
                                        }}
                                        required={imageSource === 'url'}
                                    />
                                )}
                            </div>

                            <button 
                                type="submit" 
                                disabled={addingItem}
                                style={{
                                    width: '100%', padding: '14px',
                                    background: 'linear-gradient(to right, #10b981, #059669)',
                                    border: 'none', borderRadius: '10px', color: 'white',
                                    fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer',
                                    marginTop: '10px', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', gap: '8px', opacity: addingItem ? 0.7 : 1
                                }}
                            >
                                {addingItem ? 'Adding...' : 'Add Menu Item'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default AdminPanel;
