<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Employee;
use DateTime;


class EmployeeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $data = new DateTime('2024-01-19');
        $data->format('Y-m-d');
        Employee::factory()->create([
            "first_name" => "pietro",
            "last_name" => "mur",
            "email" => "mur",
            "password" => "mur",
            "role" => "mur",
            "birth_date" =>  $data

        ]);
    }
}
