<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Store;
use Illuminate\Support\Facades\DB;


class StoresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        for($i = 0; $i < 10; $i++){

            Store::factory()->create([
                'employee_id' => '1',
                'city' => 'città',
                'address' => 'sassaru',
                'zip_code' => '4234',
                'state' => 'Sassaru',
                'long' => DB::raw("ST_GeomFromText('POINT(01 0)',0)"),
                'lat' =>  DB::raw("ST_GeomFromText('POINT(01 0)',0)"),
                'hours' => '453',
                'phone' => '5345324',
            ]);

        }
    }
}
