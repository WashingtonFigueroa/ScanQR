<?php

namespace App\Http\Controllers;

use App\Cupo;
use Illuminate\Http\Request;

class CupoController extends Controller
{
    public function index()
    {
        $cupos = Cupo::orderBy('id', 'desc')->get();
        return response()->json($cupos, 200);
    }

    public function store(Request $request)
    {
        $cupo = Cupo::create($request->all());
        return response()->json($cupo, 201);
    }

    public function show($id)
    {
        return response()->json(Cupo::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $cupo = Cupo::find($id);
        $cupo->update($request->all());
        return response()->json($cupo, 200);
    }

    public function destroy($id)
    {
        $cupo = Cupo::find($id);
        $cupo->delete();
        return response()->json($cupo, 200);
    }
}
