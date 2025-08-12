<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInquiryRequest;
use App\Models\Inquiry;
use App\Models\Product;
use Inertia\Inertia;

class InquiryController extends Controller
{
    /**
     * Show the form for creating a new inquiry.
     */
    public function create()
    {
        $products = Product::active()
            ->with('category')
            ->orderBy('name')
            ->get(['id', 'name', 'sku', 'category_id']);

        return Inertia::render('inquiries/create', [
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created inquiry.
     */
    public function store(StoreInquiryRequest $request)
    {
        Inquiry::create($request->validated());

        return redirect()->back()->with('success', 'Thank you for your inquiry! We will get back to you soon.');
    }
}