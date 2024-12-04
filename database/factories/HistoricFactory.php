<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Historic>
 */
class HistoricFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'table_id'=>1,
            "index"=> $this->faker->randomNumber(3),
            "date"=> $this->faker->dateTimeBetween('-1 years', 'now'),
        ];
    }
}
