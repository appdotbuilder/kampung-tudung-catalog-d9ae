<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inquiry>
 */
class InquiryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $inquiryTypes = ['general', 'product', 'bulk_order'];
        $countries = [
            'United States', 'United Kingdom', 'Australia', 'Canada', 'Germany', 
            'France', 'Netherlands', 'Singapore', 'Japan', 'South Korea'
        ];

        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->safeEmail(),
            'company' => $this->faker->optional()->company(),
            'country' => $this->faker->randomElement($countries),
            'phone' => $this->faker->optional()->phoneNumber(),
            'inquiry_type' => $this->faker->randomElement($inquiryTypes),
            'product_id' => $this->faker->optional()->randomElement(Product::pluck('id')->toArray()),
            'subject' => $this->faker->sentence(),
            'message' => $this->faker->paragraphs(2, true),
            'status' => $this->faker->randomElement(['new', 'reviewed', 'responded', 'closed']),
            'responded_at' => $this->faker->optional()->dateTimeBetween('-30 days', 'now'),
        ];
    }
}