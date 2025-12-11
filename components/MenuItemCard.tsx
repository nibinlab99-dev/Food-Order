"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { MenuItem } from "@/types/cart";

type MenuItemProps = MenuItem;

export default function MenuItemCard({ id, name, description, price, image }: MenuItemProps) {
    const { addToCart } = useCart();
    const handleAddToCart = () => {
        addToCart({ id, name, description, price, image });
    }
    return (
        <div className="border rounded-lg p-4 shadow-lg">
            <Image src={image} alt={name} width={400} height={300} className="w-full h-48 object-cover rounded-t-lg mb-4" />
            <h2 className="text-xl font-bold mb-2">{name}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-lg font-semibold">${price.toFixed(2)}</p>
            <button
                onClick={handleAddToCart}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
                Add to Cart
            </button>
        </div>
    )
}