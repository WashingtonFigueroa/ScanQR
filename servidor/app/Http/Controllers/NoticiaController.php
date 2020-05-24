<?php

namespace App\Http\Controllers;

use App\Noticia;
use Illuminate\Http\Request;

class NoticiaController extends Controller
{
    public function index()
    {
        $noticias = Noticia::where('estado', 1)->orderBy('id', 'desc')->get();
        return response()->json($noticias, 200);
    }

    public function store(Request $request)
    {
        $noticia = Noticia::create($request->all());
        return response()->json($noticia, 201);
    }

    public function show($id)
    {
        return response()->json(Noticia::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $noticia = Noticia::find($id);
        $noticia->update($request->all());
        return response()->json($noticia, 200);
    }

    public function destroy($id)
    {
        $noticia = Noticia::find($id);
        $noticia->delete();
        return response()->json($noticia, 200);
    }
}