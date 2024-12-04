<?php

namespace Database\Seeders;

use App\Models\Centre;
use App\Models\Table;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        Table::factory(10)->create();
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            "isSuperAdmin" => 'true',
        ]);
        Centre::factory()->create(['name' => 'Mazagan']);
        Centre::factory()->create(['name' => 'Ifrane']);
        Centre::factory()->create(['name' => 'Agadir']);
        Centre::factory()->create(['name' => 'Targa']);
    }
}
