<?php

use App\Http\Controllers\CatalogController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main catalog page (home page)
Route::get('/', [CatalogController::class, 'index'])->name('home');

// Product catalog routes
Route::get('/category/{category}', [CatalogController::class, 'show'])->name('catalog.category');
Route::get('/product/{product}', [ProductController::class, 'show'])->name('products.show');

// Inquiry routes
Route::get('/contact', [InquiryController::class, 'create'])->name('inquiries.create');
Route::post('/contact', [InquiryController::class, 'store'])->name('inquiries.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
