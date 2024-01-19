<?php
namespace App\Helpers;
use GuzzleHttp\Client;


class CustomHelper
{
    public static function getCoordinates($request)
    {
        $client = new Client(['verify' => false]);

        try {
            $response = $client->get('https://api.tomtom.com/search/2/geocode/'. $request .'.json', [
                'query' => [

                    'key' => 'BJn2pmnX1Y20KpKZAZYCLf4m1Gzqu2bG',
                ],
            ]);


            $data = json_decode($response->getBody()->getContents(), true);

            $latitude = $data['results'][0]['position']['lat'];
            $longitude = $data['results'][0]['position']['lon'];

            $coordinates = $latitude.' '.$longitude;

            return $coordinates;

            return ['lat' => number_format($latitude, 2), 'lon' => number_format($longitude, 2)];

            } catch (\Exception $e) {
              $errorMessage = $e->getMessage();

              return response()->json(['error' => $errorMessage], 500);
            }
    }
}
