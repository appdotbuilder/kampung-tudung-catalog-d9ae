import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    sku: string;
    description: string;
    detailed_description: string;
    images: string[];
    category: Category;
    specifications: Record<string, string | string[] | number>;
}

interface Props {
    product: Product;
    relatedProducts: Product[];
    [key: string]: unknown;
}

export default function ProductShow({ product, relatedProducts }: Props) {
    const [selectedImage, setSelectedImage] = useState(0);

    const handleInquireNow = () => {
        router.get(route('inquiries.create'), {
            product_id: product.id,
            inquiry_type: 'product'
        });
    };

    return (
        <>
            <Head title={`${product.name} - Kampung Tudung`} />
            
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
                            <Link 
                                href={route('catalog.category', product.category.slug)} 
                                className="text-gray-500 hover:text-gray-700"
                            >
                                {product.category.name}
                            </Link>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-900 font-medium">{product.name}</span>
                        </nav>
                    </div>
                </div>

                {/* Product Detail */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Product Images */}
                            <div className="space-y-4">
                                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                                    <img 
                                        src={product.images[selectedImage]} 
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                
                                {product.images.length > 1 && (
                                    <div className="grid grid-cols-4 gap-2">
                                        {product.images.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImage(index)}
                                                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                                                    selectedImage === index 
                                                        ? 'border-purple-500' 
                                                        : 'border-transparent hover:border-gray-300'
                                                }`}
                                            >
                                                <img 
                                                    src={image} 
                                                    alt={`${product.name} view ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <Badge variant="outline">
                                            {product.category.name}
                                        </Badge>
                                        <span className="text-sm text-gray-500 font-mono">
                                            SKU: {product.sku}
                                        </span>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                        {product.name}
                                    </h1>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Detailed Description */}
                                {product.detailed_description && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                            📖 Product Details
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {product.detailed_description}
                                        </p>
                                    </div>
                                )}

                                {/* Specifications */}
                                {product.specifications && Object.keys(product.specifications).length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            ⚡ Specifications
                                        </h3>
                                        <div className="bg-gray-50 rounded-lg p-6">
                                            <dl className="space-y-3">
                                                {Object.entries(product.specifications).map(([key, value]) => (
                                                    <div key={key} className="flex flex-col sm:flex-row sm:items-center">
                                                        <dt className="font-medium text-gray-900 sm:w-1/3">
                                                            {key}:
                                                        </dt>
                                                        <dd className="text-gray-600 sm:w-2/3">
                                                            {Array.isArray(value) ? value.join(', ') : value}
                                                        </dd>
                                                    </div>
                                                ))}
                                            </dl>
                                        </div>
                                    </div>
                                )}

                                {/* CTA Buttons */}
                                <div className="space-y-4 pt-6 border-t">
                                    <div className="bg-purple-50 rounded-lg p-6 text-center">
                                        <h3 className="text-lg font-semibold text-purple-900 mb-2">
                                            🌟 Interested in This Product?
                                        </h3>
                                        <p className="text-purple-700 mb-4">
                                            Contact us for pricing, availability, and bulk order information
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                            <Button 
                                                size="lg" 
                                                onClick={handleInquireNow}
                                                className="bg-purple-600 hover:bg-purple-700 px-8"
                                            >
                                                💬 Inquire About This Product
                                            </Button>
                                            <Link href={route('inquiries.create')}>
                                                <Button 
                                                    size="lg" 
                                                    variant="outline" 
                                                    className="w-full sm:w-auto px-8"
                                                >
                                                    📧 General Inquiry
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="py-16 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                                🔗 Related Products
                            </h2>
                            
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {relatedProducts.map((relatedProduct) => (
                                    <Link
                                        key={relatedProduct.id}
                                        href={route('products.show', relatedProduct.slug)}
                                        className="group block"
                                    >
                                        <div className="bg-white rounded-xl shadow-sm group-hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                                            <div className="aspect-square bg-gray-100 overflow-hidden">
                                                <img 
                                                    src={relatedProduct.images[0]} 
                                                    alt={relatedProduct.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {relatedProduct.category.name}
                                                    </Badge>
                                                    <span className="text-xs text-gray-500 font-mono">
                                                        {relatedProduct.sku}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                                                    {relatedProduct.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm line-clamp-2">
                                                    {relatedProduct.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

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