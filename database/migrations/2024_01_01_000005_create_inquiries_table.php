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
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('company')->nullable();
            $table->string('country');
            $table->string('phone')->nullable();
            $table->enum('inquiry_type', ['general', 'product', 'bulk_order'])->default('general');
            $table->unsignedBigInteger('product_id')->nullable()->comment('If product-specific inquiry');
            $table->string('subject');
            $table->text('message');
            $table->enum('status', ['new', 'reviewed', 'responded', 'closed'])->default('new');
            $table->timestamp('responded_at')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('email');
            $table->index('inquiry_type');
            $table->index('product_id');
            $table->index(['status', 'created_at']);
            
            // Foreign key
            $table->foreign('product_id')->references('id')->on('products')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};