"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Header() {
    const pathname = usePathname();
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/menu', label: 'Menu' }
    ]

    return (
        <header className="border-b border-cyan-400 bg-black">
            <nav className="mx-auto flex items-center justify-between max-w-7xl py-2 px-4">
                <Link
                    className="text-3xl font-bold text-white"
                    href="/"
                >
                    Foodie
                </Link>
                <ul className="flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`text-sm font-semibold leading-6 hover:opacity-90 ${pathname === link.href ? 'text-blue-500' : 'text-white'}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link
                            href="/cart"
                            className="relative text-white hover:opacity-90"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
