"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/menu', label: 'Menu' }
    ]
    return (
        <header className="border-b border-cyan-400 bg-black">
            <nav className="mx-auto flex items-center justify-between max-w-7xl py-2">
                <Link 
                    className="text-3xl font-bold text-white"
                    href="/"
                    >
                    Foodie
                </Link>
                <ul className="flex gap-8">
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
                </ul>
            </nav>
        </header>
    )
}
