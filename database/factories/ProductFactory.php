<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tudungNames = [
            'Elegant Silk Tudung',
            'Cotton Prayer Tudung',
            'Chiffon Evening Tudung',
            'Printed Casual Tudung',
            'Premium Satin Tudung',
            'Lightweight Summer Tudung',
        ];

        $hatNames = [
            'Classic Fedora Hat',
            'Wide Brim Sun Hat',
            'Vintage Cloche Hat',
            'Modern Bucket Hat',
            'Elegant Derby Hat',
            'Casual Baseball Cap',
        ];

        $allNames = array_merge($tudungNames, $hatNames);
        $name = $this->faker->randomElement($allNames);
        $sku = 'KT-' . strtoupper(Str::random(6));

        return [
            'name' => $name,
            'slug' => Str::slug($name) . '-' . Str::lower(Str::random(4)),
            'sku' => $sku,
            'description' => $this->faker->paragraph(),
            'detailed_description' => $this->faker->paragraphs(3, true),
            'images' => [
                'https://via.placeholder.com/600x600/f3f4f6/6b7280?text=' . urlencode($name),
                'https://via.placeholder.com/600x600/e5e7eb/374151?text=View+2',
                'https://via.placeholder.com/600x600/d1d5db/1f2937?text=Detail+View',
            ],
            'category_id' => Category::factory(),
            'specifications' => [
                'Material' => $this->faker->randomElement(['Premium Cotton', 'Silk Blend', 'Chiffon', 'Polyester']),
                'Size' => $this->faker->randomElement(['One Size', 'Small', 'Medium', 'Large']),
                'Colors Available' => $this->faker->randomElements(['Black', 'White', 'Navy', 'Brown', 'Gray', 'Burgundy'], random_int(2, 4)),
                'Care Instructions' => 'Hand wash cold, air dry',
            ],
            'sort_order' => $this->faker->numberBetween(0, 100),
            'is_active' => true,
            'is_featured' => $this->faker->boolean(30), // 30% chance of being featured
        ];
    }

    /**
     * Indicate that the product is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }
}