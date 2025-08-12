<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create main categories
        $tudungCategory = Category::create([
            'name' => 'Tudung',
            'slug' => 'tudung',
            'description' => 'Traditional and modern tudung collection for all occasions',
            'sort_order' => 1,
            'is_active' => true,
        ]);

        $hatsCategory = Category::create([
            'name' => 'Hats',
            'slug' => 'hats',
            'description' => 'Stylish hats for fashion and sun protection',
            'sort_order' => 2,
            'is_active' => true,
        ]);

        // Create subcategories for Tudung
        $tudungSubcategories = [
            ['name' => 'Traditional Tudung', 'description' => 'Classic and traditional styles'],
            ['name' => 'Modern Tudung', 'description' => 'Contemporary and fashionable designs'],
            ['name' => 'Prayer Tudung', 'description' => 'Special collection for prayer and worship'],
        ];

        foreach ($tudungSubcategories as $index => $subcategory) {
            Category::create([
                'name' => $subcategory['name'],
                'slug' => Str::slug($subcategory['name']),
                'description' => $subcategory['description'],
                'parent_id' => $tudungCategory->id,
                'sort_order' => $index + 1,
                'is_active' => true,
            ]);
        }

        // Create subcategories for Hats
        $hatSubcategories = [
            ['name' => 'Fashion Hats', 'description' => 'Trendy and stylish hats for everyday wear'],
            ['name' => 'Sun Hats', 'description' => 'Wide-brim hats for sun protection'],
            ['name' => 'Formal Hats', 'description' => 'Elegant hats for special occasions'],
        ];

        foreach ($hatSubcategories as $index => $subcategory) {
            Category::create([
                'name' => $subcategory['name'],
                'slug' => Str::slug($subcategory['name']),
                'description' => $subcategory['description'],
                'parent_id' => $hatsCategory->id,
                'sort_order' => $index + 1,
                'is_active' => true,
            ]);
        }

        // Create sample products for Tudung
        $tudungProducts = [
            [
                'name' => 'Premium Silk Tudung - Elegant Black',
                'description' => 'Luxurious silk tudung in classic black, perfect for formal occasions',
                'detailed_description' => 'This premium silk tudung is crafted from the finest mulberry silk, offering exceptional comfort and elegance. The classic black color makes it versatile for any occasion, from daily wear to special events. The fabric drapes beautifully and provides excellent coverage while maintaining breathability.',
                'sku' => 'KT-SLK001',
                'specifications' => [
                    'Material' => '100% Mulberry Silk',
                    'Dimensions' => '180cm x 70cm',
                    'Colors Available' => ['Black', 'Navy', 'Burgundy'],
                    'Care Instructions' => 'Dry clean only',
                    'Origin' => 'Handcrafted in Malaysia',
                ],
                'is_featured' => true,
            ],
            [
                'name' => 'Cotton Prayer Tudung - Pure White',
                'description' => 'Soft cotton tudung designed specifically for prayer and worship',
                'detailed_description' => 'Made from premium cotton fabric, this prayer tudung offers supreme comfort during prayer sessions. The breathable material ensures you stay comfortable during extended periods of worship. Features a traditional cut that provides full coverage as per Islamic guidelines.',
                'sku' => 'KT-CTN002',
                'specifications' => [
                    'Material' => 'Premium Cotton',
                    'Dimensions' => '170cm x 65cm',
                    'Colors Available' => ['White', 'Cream', 'Light Gray'],
                    'Care Instructions' => 'Machine wash cold, gentle cycle',
                    'Origin' => 'Malaysia',
                ],
                'is_featured' => true,
            ],
            [
                'name' => 'Chiffon Evening Tudung - Royal Blue',
                'description' => 'Elegant chiffon tudung perfect for evening events and special occasions',
                'detailed_description' => 'This stunning chiffon tudung combines modesty with modern elegance. The lightweight fabric flows gracefully and the royal blue color adds sophistication to any outfit. Ideal for weddings, dinner events, and formal gatherings.',
                'sku' => 'KT-CHF003',
                'specifications' => [
                    'Material' => 'High-Quality Chiffon',
                    'Dimensions' => '175cm x 68cm',
                    'Colors Available' => ['Royal Blue', 'Emerald Green', 'Dusty Rose'],
                    'Care Instructions' => 'Hand wash cold, air dry',
                    'Origin' => 'Malaysia',
                ],
                'is_featured' => false,
            ],
        ];

        foreach ($tudungProducts as $index => $productData) {
            Product::create([
                'name' => $productData['name'],
                'slug' => Str::slug($productData['name']) . '-' . Str::lower(Str::random(4)),
                'sku' => $productData['sku'],
                'description' => $productData['description'],
                'detailed_description' => $productData['detailed_description'],
                'images' => [
                    'https://via.placeholder.com/600x600/1f2937/ffffff?text=' . urlencode($productData['name']),
                    'https://via.placeholder.com/600x600/374151/ffffff?text=Side+View',
                    'https://via.placeholder.com/600x600/4b5563/ffffff?text=Detail+View',
                ],
                'category_id' => $tudungCategory->id,
                'specifications' => $productData['specifications'],
                'sort_order' => $index + 1,
                'is_active' => true,
                'is_featured' => $productData['is_featured'],
            ]);
        }

        // Create sample products for Hats
        $hatProducts = [
            [
                'name' => 'Classic Wide Brim Sun Hat - Natural',
                'description' => 'Stylish wide-brim hat providing excellent sun protection',
                'detailed_description' => 'This classic wide-brim sun hat combines style with function. Made from lightweight yet durable materials, it provides excellent UV protection while maintaining a fashionable appearance. Perfect for outdoor activities, beach trips, or garden parties.',
                'sku' => 'KT-HAT001',
                'specifications' => [
                    'Material' => 'Woven Straw',
                    'Brim Width' => '10cm',
                    'Crown Height' => '12cm',
                    'Colors Available' => ['Natural', 'Black', 'Tan'],
                    'Care Instructions' => 'Spot clean only, store flat',
                    'UV Protection' => 'UPF 50+',
                ],
                'is_featured' => true,
            ],
            [
                'name' => 'Elegant Cloche Hat - Vintage Brown',
                'description' => 'Vintage-inspired cloche hat for a timeless, elegant look',
                'detailed_description' => 'Inspired by 1920s fashion, this elegant cloche hat adds a touch of vintage sophistication to any outfit. The classic bell shape and premium felt material create a timeless silhouette that complements both casual and formal attire.',
                'sku' => 'KT-HAT002',
                'specifications' => [
                    'Material' => 'Premium Wool Felt',
                    'Style' => '1920s Cloche',
                    'Crown Depth' => '14cm',
                    'Colors Available' => ['Vintage Brown', 'Charcoal', 'Navy'],
                    'Care Instructions' => 'Professional cleaning recommended',
                    'Origin' => 'Malaysia',
                ],
                'is_featured' => true,
            ],
        ];

        foreach ($hatProducts as $index => $productData) {
            Product::create([
                'name' => $productData['name'],
                'slug' => Str::slug($productData['name']) . '-' . Str::lower(Str::random(4)),
                'sku' => $productData['sku'],
                'description' => $productData['description'],
                'detailed_description' => $productData['detailed_description'],
                'images' => [
                    'https://via.placeholder.com/600x600/8b5cf6/ffffff?text=' . urlencode($productData['name']),
                    'https://via.placeholder.com/600x600/7c3aed/ffffff?text=Side+View',
                    'https://via.placeholder.com/600x600/6d28d9/ffffff?text=Detail+View',
                ],
                'category_id' => $hatsCategory->id,
                'specifications' => $productData['specifications'],
                'sort_order' => $index + 1,
                'is_active' => true,
                'is_featured' => $productData['is_featured'],
            ]);
        }

        // Create additional products using factories
        Product::factory(8)->create(['category_id' => $tudungCategory->id]);
        Product::factory(6)->create(['category_id' => $hatsCategory->id]);
    }
}