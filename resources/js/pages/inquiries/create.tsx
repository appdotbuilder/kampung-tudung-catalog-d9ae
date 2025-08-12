import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    sku: string;
    category: {
        name: string;
    };
}

interface Props {
    products: Product[];
    [key: string]: unknown;
}

export default function CreateInquiry({ products }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        company: '',
        country: '',
        phone: '',
        inquiry_type: 'general',
        product_id: '',
        subject: '',
        message: '',
    });

    const countries = [
        'United States', 'United Kingdom', 'Australia', 'Canada', 'Germany', 
        'France', 'Netherlands', 'Singapore', 'Japan', 'South Korea',
        'Malaysia', 'Indonesia', 'Thailand', 'Philippines', 'Vietnam',
        'India', 'China', 'Taiwan', 'Hong Kong', 'Other'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('inquiries.store'));
    };

    return (
        <>
            <Head title="Contact Us - Kampung Tudung" />
            
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
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 text-white py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            📧 Contact Us
                        </h1>
                        <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                            We're here to help international buyers with product inquiries, pricing information, 
                            and bulk order requests. Get in touch with us today!
                        </p>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    🤝 Send Us Your Inquiry
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Fill out the form below and we'll get back to you within 24 hours
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            required
                                        />
                                        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            required
                                        />
                                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            value={data.company}
                                            onChange={(e) => setData('company', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                        {errors.company && <p className="text-red-600 text-sm mt-1">{errors.company}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                        {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                                        Country *
                                    </label>
                                    <select
                                        id="country"
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select your country</option>
                                        {countries.map((country) => (
                                            <option key={country} value={country}>{country}</option>
                                        ))}
                                    </select>
                                    {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
                                </div>

                                {/* Inquiry Details */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Inquiry Details</h3>
                                    
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="inquiry_type" className="block text-sm font-medium text-gray-700 mb-2">
                                                Inquiry Type *
                                            </label>
                                            <select
                                                id="inquiry_type"
                                                value={data.inquiry_type}
                                                onChange={(e) => setData('inquiry_type', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                required
                                            >
                                                <option value="general">General Inquiry</option>
                                                <option value="product">Product-Specific Inquiry</option>
                                                <option value="bulk_order">Bulk Order Request</option>
                                            </select>
                                            {errors.inquiry_type && <p className="text-red-600 text-sm mt-1">{errors.inquiry_type}</p>}
                                        </div>

                                        {data.inquiry_type === 'product' && (
                                            <div>
                                                <label htmlFor="product_id" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Select Product
                                                </label>
                                                <select
                                                    id="product_id"
                                                    value={data.product_id}
                                                    onChange={(e) => setData('product_id', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                >
                                                    <option value="">Select a product</option>
                                                    {products.map((product) => (
                                                        <option key={product.id} value={product.id.toString()}>
                                                            {product.name} ({product.sku})
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.product_id && <p className="text-red-600 text-sm mt-1">{errors.product_id}</p>}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-6">
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Brief subject line for your inquiry"
                                            required
                                        />
                                        {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
                                    </div>

                                    <div className="mt-6">
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Please provide details about your inquiry, including quantity requirements, preferred delivery timeline, and any specific questions..."
                                            required
                                        />
                                        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="text-center pt-6">
                                    <Button 
                                        type="submit" 
                                        size="lg" 
                                        className="bg-purple-600 hover:bg-purple-700 px-12 py-4 text-lg"
                                        disabled={processing}
                                    >
                                        {processing ? '📤 Sending...' : '📧 Send Inquiry'}
                                    </Button>
                                    <p className="text-sm text-gray-500 mt-3">
                                        We'll respond to your inquiry within 24 hours
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Contact Information */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                🌍 Why Choose Kampung Tudung?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quick Response</h3>
                                <p className="text-gray-600">
                                    We respond to all inquiries within 24 hours, ensuring you get the information you need quickly.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🏆</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Products</h3>
                                <p className="text-gray-600">
                                    Premium materials and craftsmanship that meet international quality standards.
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🚢</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Shipping</h3>
                                <p className="text-gray-600">
                                    Reliable shipping to international destinations with tracking and insurance.
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
                        <p className="text-gray-400">
                            Your trusted partner for premium tudung and hats. Serving international buyers with quality and reliability.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}