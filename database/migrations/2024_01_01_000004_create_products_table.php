<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('sku')->unique()->comment('Product code/SKU');
            $table->text('description');
            $table->text('detailed_description')->nullable();
            $table->json('images')->nullable()->comment('Array of image URLs');
            $table->unsignedBigInteger('category_id');
            $table->json('specifications')->nullable()->comment('Material, size, color options etc.');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
            
            // Indexes for performance
            $table->index('slug');
            $table->index('sku');
            $table->index('category_id');
            $table->index(['is_active', 'is_featured']);
            $table->index(['category_id', 'is_active', 'sort_order']);
            
            // Foreign key
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};