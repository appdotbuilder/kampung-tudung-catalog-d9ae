<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    /**
     * Display the main catalog page.
     */
    public function index()
    {
        $categories = Category::active()
            ->whereNull('parent_id')
            ->orderBy('sort_order')
            ->with(['subcategories' => function ($query) {
                $query->active()->orderBy('sort_order');
            }])
            ->get();

        $featuredProducts = Product::active()
            ->featured()
            ->with('category')
            ->orderBy('sort_order')
            ->limit(8)
            ->get();

        return Inertia::render('catalog/index', [
            'categories' => $categories,
            'featuredProducts' => $featuredProducts,
        ]);
    }

    /**
     * Display products in a specific category.
     */
    public function show(Category $category)
    {
        $products = Product::active()
            ->where('category_id', $category->id)
            ->with('category')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate(12);

        $subcategories = $category->subcategories()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('catalog/category', [
            'category' => $category,
            'products' => $products,
            'subcategories' => $subcategories,
        ]);
    }
}