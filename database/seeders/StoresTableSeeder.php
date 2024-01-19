<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Store;
use Illuminate\Support\Facades\DB;
use App\Helpers\CustomHelper;


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
                'address' => 'sassari',
                'zip_code' => '4234',
                'state' => 'Sassaru',
                'coordinates' => DB::raw("ST_GeomFromText('POINT(" . CustomHelper::getCoordinates('sassari') . ")')"),
                'hours' => '453',
                'phone' => '5345324',
            ]);

        }
    }
}
