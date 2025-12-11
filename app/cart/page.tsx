"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { cartItems, getTotalPrice, removeFromCart, updateQuantity } = useCart();
    const totalPrice = getTotalPrice();

    // If cart is empty, show a message
    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto py-12 px-4">
                <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
                <div className="text-center py-12">
                    <p className="text-2xl text-gray-600 mb-6">Your cart is empty</p>
                    <Link
                        href="/menu"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg inline-block"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    // If cart has items, show them
    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items - Left side */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 flex gap-4">
                            {/* Item Image */}
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={120}
                                height={120}
                                className="rounded-lg object-cover"
                            />

                            {/* Item Details */}
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                <p className="text-gray-600 mb-2">{item.description}</p>
                                <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
                            </div>

                            {/* Quantity and Remove */}
                            <div className="flex flex-col items-end justify-between">
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 font-semibold"
                                >
                                    Remove
                                </button>
                                <div className="flex items-center gap-2 border rounded-lg">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="px-3 py-1 hover:bg-gray-100 font-bold text-lg"
                                    >
                                        -
                                    </button>
                                    <span className="px-3 font-semibold min-w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-3 py-1 hover:bg-gray-100 font-bold text-lg"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-lg font-bold">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary - Right side */}
                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 sticky top-4">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Items:</span>
                                <span className="font-semibold">{cartItems.length}</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between text-xl font-bold">
                                <span>Total:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg mb-3">
                            Proceed to Checkout
                        </button>
                        <Link
                            href="/menu"
                            className="block text-center text-blue-500 hover:text-blue-700 font-semibold"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}