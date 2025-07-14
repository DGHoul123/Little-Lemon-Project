import React, { useState, useEffect } from 'react';
import p1 from "./files/greek salad.jpg";
import p2 from "./files/lemon dessert.jpg";
import p3 from "./files/bruchetta.svg";

function Online(){
    const menuItems = [
        {
            id: 'greek-salad',
            name: 'Greek Salad',
            price: 12.99,
            description: 'The famous Greek salad of crispy lettuce, peppers, olives, and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
            image: p1
        },
        {
            id: 'bruschetta',
            name: 'Bruschetta',
            price: 5.99,
            description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
            image: p3
        },
        {
            id: 'lemon-dessert',
            name: 'Lemon Dessert',
            price: 5.00,
            description: 'This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
            image: p2
        },
    ];

    const [cartItems, setCartItems] = useState([]);
    const [showCartMessage, setShowCartMessage] = useState(false);
    const [cartMessage, setCartMessage] = useState('');


    const addToCart = (itemToAdd) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === itemToAdd.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...itemToAdd, quantity: 1 }];
            }
        });
        setCartMessage(`${itemToAdd.name} added to cart!`);
        setShowCartMessage(true);
    };
    const removeFromCart = (itemId) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === itemId);
            if (existingItem && existingItem.quantity > 1) {
                return prevItems.map(item =>
                    item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
                );
            } else {
                return prevItems.filter(item => item.id !== itemId);
            }
        });
        setCartMessage('Item removed from cart.');
        setShowCartMessage(true);
    };

    const calculateCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    useEffect(() => {
        if (showCartMessage) {
            const timer = setTimeout(() => {
                setShowCartMessage(false);
                setCartMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showCartMessage]);

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-inter">

            <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">Our Online Menu</h1>

            {showCartMessage && (
                <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg z-50 transition-opacity duration-300">
                    {cartMessage}
                </div>
            )}

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map(item => (
                        <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-200">
                            <img src={item.image} alt={item.name} className="w-full h-48 object-cover"/>
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-lg font-semibold text-green-700">${item.price.toFixed(2)}</p>
                                </div>
                                <p className="text-gray-600 text-sm mb-4 flex-grow">{item.description}</p>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="w-full bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg hover:bg-yellow-600 transition duration-200 shadow-sm"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-6 self-start">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Your Cart</h2>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500 text-center">Your cart is empty.</p>
                    ) : (
                        <>
                            <ul className="space-y-4 mb-6">
                                {cartItems.map(item => (
                                    <li key={item.id} className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-800">{item.name}</span>
                                            <span className="text-sm text-gray-600">${item.price.toFixed(2)} x {item.quantity}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm hover:bg-red-200 transition"
                                            >
                                                -
                                            </button>
                                            <span className="font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="bg-green-100 text-green-600 px-2 py-1 rounded-md text-sm hover:bg-green-200 transition"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t pt-4 flex justify-between items-center text-xl font-bold text-gray-900">
                                <span>Total:</span>
                                <span>${calculateCartTotal()}</span>
                            </div>
                            <button className="mt-6 w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-200 shadow-md">
                                Proceed to Checkout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}


export default Online;