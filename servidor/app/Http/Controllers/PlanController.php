<?php

namespace App\Http\Controllers;

use App\Plan;
use Illuminate\Http\Request;

class PlanController extends Controller
{ 
    public function index()
    {
        $plans = Plan::all();
        return response()->json($plans, 200);
    }

    public function store(Request $request)
    {
        $plan = Plan::create($request->all());
        return response()->json($plan, 201);
    }

    public function show($id)
    {
        return response()->json(Plan::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $plan = Plan::find($id);
        $plan->update($request->all());
        return response()->json($plan, 200);
    }

    public function destroy($id)
    {
        $plan = Plan::find($id);
        $plan->delete();
        return response()->json($plan, 200);
    }
}
