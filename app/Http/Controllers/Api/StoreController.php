<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStoreRequest;
use App\Http\Requests\UpdateStoreRequest;
use App\Models\Store;
use App\Http\Resources\StoreResource;

use App\Helpers\CustomHelper;
use Illuminate\Support\Facades\DB;


class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return StoreResource::collection(
            Store::query()->orderBy('id', 'desc')->paginate(10)
        );

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStoreRequest $request)
    {

        $request['hours'] = $request['opening'] . ' - ' . $request['closing'];
        $validatedData = $request->validated();

        $validatedData['hours'] = $request['hours'];
        $coordinates = DB::raw("(ST_GeomFromText('POINT(".CustomHelper::getCoordinates($request['address']). ")'))");

        $validatedData['coordinates'] = $coordinates;
        $store = Store::create($validatedData);

        return response(new StoreResource($store), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Store $store)
    {
        return new StoreResource($store);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStoreRequest $request, Store $store)
    {
        $request['hours'] = $request['opening'] . ' - ' . $request['closing'];
        if($request->address != $store["address"]){
            $coordinates = "ST_GeomFromText('POINT(" . CustomHelper::getCoordinates($request['address']) . ")')";
            $request["coordinates"] = $coordinates;
        }

        $data = $request->validated();
        $data['hours'] = $request['hours'];
        $store->update($data);


        return new StoreResource($store);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Store $store)
    {
        $store->delete();

        return response('', 201);
    }
}
