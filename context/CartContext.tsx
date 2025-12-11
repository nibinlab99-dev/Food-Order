"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, MenuItem } from '@/types/cart';

// Define what functions our cart will have
type CartContextType = {
    cartItems: CartItem[];
    addToCart: (item: MenuItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
};

// Create the context (the storage box)
const CartContext = createContext<CartContextType | undefined>(undefined);

// This component will wrap our app and provide cart functionality
export function CartProvider({ children }: { children: ReactNode }) {
    // useState stores our cart items
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage when app starts (client-side only)
    useEffect(() => {
        const savedCart = localStorage.getItem('foodie-cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                // eslint-disable-next-line
                setCartItems(parsedCart);
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save cart to localStorage whenever it changes (but not on initial load)
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('foodie-cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isLoaded]);

    // Function to add an item to cart
    const addToCart = (item: MenuItem) => {
        setCartItems((prevItems) => {
            // Check if item already exists in cart
            const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);

            if (existingItem) {
                // If it exists, increase quantity by 1
                return prevItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // If it's new, add it with quantity 1
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    // Function to remove an item from cart
    const removeFromCart = (id: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Function to update quantity
    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) {
            // If quantity is 0 or less, remove the item
            removeFromCart(id);
            return;
        }

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    // Function to clear entire cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Function to get total number of items
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Function to get total price
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalItems,
                getTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// Custom hook to use the cart
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}