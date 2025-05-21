import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface NavItem {
    label: string;
    href: string;
    hasDropdown?: boolean;
}

const NAV_ITEMS: NavItem[] = [
    { label: 'Features', href: '#features', hasDropdown: true },
    { label: 'Integrations', href: '#integrations', hasDropdown: true },
    { label: 'Case Studies', href: '#case-studies', hasDropdown: true },
    { label: 'Resources', href: '#resources', hasDropdown: true },
    { label: 'Affiliates', href: '#affiliates' },
    { label: 'Pricing', href: '#pricing' },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#041200] text-white backdrop-blur-sm">
            <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <div className="flex items-center">
                        <Image
                            src={"/logo.png"}
                            alt="Logo"
                            width={120}
                            height={120}
                        />
                    </div>

                    <div className='flex items-center space-x-7'>
                        <nav className="hidden md:flex space-x-4 lg:space-x-6">
                            {NAV_ITEMS.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="flex items-center text-white/80 hover:text-white px-2 py-1 text-sm transition-colors"
                                >
                                    {item.label}
                                    {item.hasDropdown && (
                                        <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
                                    )}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center">
                            <Button
                                className="bg-[#15803d] hover:bg-[#15803d]/90 text-white font-medium rounded-md"
                            >
                                Login
                            </Button>
                            {/* Mobile menu button */}
                            <button
                                className="ml-4 md:hidden text-white"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-dark-green border-t border-white/10">
                    <div className="px-4 py-2 space-y-1">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="block text-white px-3 py-2 text-base"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}