<?php

namespace App\Http\Controllers;

use App\Establecimiento;
use Illuminate\Http\Request;

class EstablecimientoController extends Controller
{
    public function index()
    {
        $establecimientos = Establecimiento::orderBy('id', 'desc')->get();
        return response()->json($establecimientos, 200);
    }

    public function store(Request $request)
    {
        $establecimiento = Establecimiento::create($request->all());
        return response()->json($establecimiento, 201);
    }

    public function show($id)
    {
        return response()->json(Establecimiento::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $establecimiento = Establecimiento::find($id);
        $establecimiento->update($request->all());
        return response()->json($establecimiento, 200);
    }

    public function destroy($id)
    {
        $establecimiento = Establecimiento::find($id);
        $establecimiento->delete();
        return response()->json($establecimiento, 200);
    }
}
