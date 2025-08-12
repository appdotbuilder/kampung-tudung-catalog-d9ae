import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    subcategories?: Category[];
}

interface Product {
    id: number;
    name: string;
    slug: string;
    sku: string;
    description: string;
    images: string[];
    category: Category;
}

interface Props {
    category: Category;
    products: {
        data: Product[];
        links: { url: string | null; label: string; active: boolean }[];
        meta: { total: number; last_page: number };
    };
    subcategories: Category[];
    [key: string]: unknown;
}

export default function CategoryPage({ category, products, subcategories }: Props) {
    return (
        <>
            <Head title={`${category.name} - Kampung Tudung`} />
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <Link href={route('home')} className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">🧕</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Kampung Tudung</h1>
                                    <p className="text-xs text-gray-600">Premium Collection</p>
                                </div>
                            </Link>
                            <nav className="flex items-center space-x-4">
                                <Link 
                                    href={route('home')} 
                                    className="text-gray-700 hover:text-purple-600 font-medium"
                                >
                                    Home
                                </Link>
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

                {/* Breadcrumb */}
                <div className="bg-gray-50 border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <nav className="flex items-center space-x-2 text-sm">
                            <Link href={route('home')} className="text-gray-500 hover:text-gray-700">
                                Home
                            </Link>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-900 font-medium">{category.name}</span>
                        </nav>
                    </div>
                </div>

                {/* Category Header */}
                <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {category.name === 'Tudung' ? '🧕' : '👒'} {category.name} Collection
                        </h1>
                        <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
                            {category.description}
                        </p>
                        <Link href={route('inquiries.create')}>
                            <Button 
                                size="lg" 
                                className="bg-white text-purple-700 hover:bg-purple-50 px-8"
                            >
                                💬 Inquire About This Collection
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Subcategories */}
                {subcategories.length > 0 && (
                    <section className="py-12 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Subcategories</h2>
                            <div className="flex flex-wrap gap-3">
                                {subcategories.map((subcategory) => (
                                    <Badge 
                                        key={subcategory.id}
                                        variant="outline"
                                        className="px-4 py-2 text-sm cursor-pointer hover:bg-purple-50 hover:border-purple-200"
                                    >
                                        {subcategory.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Products Grid */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Products ({products.meta.total})
                            </h2>
                        </div>

                        {products.data.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📦</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                                <p className="text-gray-600 mb-6">
                                    We're currently updating our {category.name.toLowerCase()} collection. 
                                    Please check back soon or contact us for availability.
                                </p>
                                <Link href={route('inquiries.create')}>
                                    <Button>Contact Us for Updates</Button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {products.data.map((product) => (
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

                                {/* Pagination */}
                                {products.meta.last_page > 1 && (
                                    <div className="mt-12 flex justify-center">
                                        <div className="flex items-center space-x-2">
                                            {products.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`px-4 py-2 rounded-lg ${
                                                        link.active
                                                            ? 'bg-purple-600 text-white'
                                                            : link.url
                                                            ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Interested in Our {category.name} Collection?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Contact us for detailed product information, pricing, and bulk order inquiries. 
                            We're here to help international buyers find the perfect products.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={route('inquiries.create')}>
                                <Button size="lg" className="px-8">
                                    📧 Send Inquiry
                                </Button>
                            </Link>
                            <Link href={route('home')}>
                                <Button size="lg" variant="outline" className="px-8">
                                    🏠 Back to Home
                                </Button>
                            </Link>
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
                        <p className="text-gray-400">
                            Your trusted partner for premium tudung and hats. Serving international buyers with quality and reliability.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}