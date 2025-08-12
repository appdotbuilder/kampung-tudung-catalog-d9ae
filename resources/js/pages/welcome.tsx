import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    subcategories: Category[];
}

interface Product {
    id: number;
    name: string;
    slug: string;
    sku: string;
    description: string;
    images: string[];
    category: Category;
    main_image: string;
}

interface Props {
    categories: Category[];
    featuredProducts: Product[];
    [key: string]: unknown;
}

export default function Welcome({ categories, featuredProducts }: Props) {
    return (
        <>
            <Head title="Kampung Tudung - Premium Tudung & Hats for International Buyers" />
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">🧕</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Kampung Tudung</h1>
                                    <p className="text-xs text-gray-600">Premium Collection</p>
                                </div>
                            </div>
                            <nav className="flex items-center space-x-4">
                                <Link 
                                    href={route('inquiries.create')} 
                                    className="text-gray-700 hover:text-purple-600 font-medium"
                                >
                                    Contact Us
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 text-white">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            🧕 Premium Tudung & Hats
                            <span className="block text-2xl md:text-3xl font-light mt-2 text-purple-100">
                                for International Buyers
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
                            Discover our exquisite collection of traditional and modern tudung, plus elegant hats. 
                            Quality craftsmanship meets contemporary design for the global market.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-3 text-lg font-semibold">
                                <a href="#products">🛍️ View Collection</a>
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="border-white text-white hover:bg-white hover:text-purple-700 px-8 py-3 text-lg font-semibold"
                            >
                                <Link href={route('inquiries.create')}>📧 Make Inquiry</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                🏷️ Our Categories
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Browse our carefully curated collections designed for the international market
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={route('catalog.category', category.slug)}
                                    className="group block"
                                >
                                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-transparent group-hover:border-purple-200 transition-all duration-300 group-hover:shadow-lg">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                {category.name === 'Tudung' ? '🧕' : '👒'} {category.name}
                                            </h3>
                                            <div className="text-purple-600 group-hover:text-purple-700">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                                        
                                        {category.subcategories && category.subcategories.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {category.subcategories.map((sub) => (
                                                    <Badge 
                                                        key={sub.id}
                                                        variant="secondary"
                                                        className="bg-white text-purple-700 hover:bg-purple-100"
                                                    >
                                                        {sub.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section id="products" className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                ⭐ Featured Products
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Handpicked premium pieces from our collection, perfect for international buyers
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {featuredProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={route('products.show', product.slug)}
                                    className="group block"
                                >
                                    <div className="bg-white rounded-xl shadow-sm group-hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                                        <div className="aspect-square bg-gray-100 overflow-hidden">
                                            <img 
                                                src={product.images[0]} 
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <Badge variant="outline" className="text-xs">
                                                    {product.category.name}
                                                </Badge>
                                                <span className="text-xs text-gray-500 font-mono">
                                                    {product.sku}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                                {product.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-purple-600 font-medium text-sm">
                                                    View Details
                                                </span>
                                                <div className="text-purple-600 group-hover:text-purple-700">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <p className="text-gray-600 mb-6">Interested in our products? We'd love to hear from you!</p>
                            <Link href={route('inquiries.create')}>
                                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8">
                                    💬 Contact Us for Pricing & Orders
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                ✨ Why International Buyers Choose Us
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🏆</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Quality</h3>
                                <p className="text-gray-600">
                                    Carefully crafted with high-quality materials and attention to detail that meets international standards.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🌍</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Shipping</h3>
                                <p className="text-gray-600">
                                    We ship worldwide with reliable logistics partners, ensuring your products arrive safely.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🤝</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Bulk Orders Welcome</h3>
                                <p className="text-gray-600">
                                    Special pricing and terms available for wholesale and bulk orders. Contact us for custom quotes.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🧕</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Kampung Tudung</h3>
                                <p className="text-sm text-gray-400">Premium Collection</p>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Your trusted partner for premium tudung and hats. Serving international buyers with quality and reliability.
                        </p>
                        <div className="flex justify-center space-x-6">
                            <Link 
                                href={route('inquiries.create')} 
                                className="text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                Contact Us
                            </Link>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-400">
                                📧 Inquiries Welcome
                            </span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}