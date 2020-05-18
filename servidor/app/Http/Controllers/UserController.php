<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class UserController extends Controller
{
    public $successStatus = 200;

    public function login()
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            return response()->json([
                'token' => 'Bearer ' . $user->createToken('qr')->accessToken,
                'identity' => $user
            ], $this->successStatus);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }

    public function register(Request $request)
    {
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        return response()->json([
            'token' => $user->createToken('qr')->accessToken,
            'identity' => $user
        ], $this->successStatus);
    }
    public function details()
    {
        $user = Auth::user();
        return response()->json($user, $this->successStatus);
    }

    public function index()
    {
        $usuarios = User::all();
        if (is_object($usuarios)) {
            $data = array('code' => 200, 'status' => 'success', 'usuarios' => $usuarios);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Lista Vacia');
        }
        return response()->json($data, $data['code']);
    }

    public function show($id)
    { 
        $usuario = User::where('id', '=', $id)->first();
        if (is_object($usuario)) {
            $data = array('code' => 200, 'status' => 'success', 'usuario' => $usuario);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Lista Vacia');
        }
        return response()->json($data, $data['code']);
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'nombre' => 'required'
        ]);
        if ($validate->fails()) {
            return response()->json([
                'code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el usuario'
            ]);
        } else {
            $input = $request->all();
            $input['password'] = bcrypt($input['password']);
            $usuario = User::create($input);
            return response()->json(['code' => 200, 'status' => 'success', 'usuario' => $usuario], 201);
        }
    }

    public function update(Request $request, $id)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        if (!empty($params_array)) {
            $validate = Validator::make($params_array, [
                'nombre' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el usuario');
            } else {
                unset($params_array['id']);
                unset($params_array['created_at']);
                unset($params_array['updated_at']);
                $usuario = User::where('id', '=', $id)->update($params_array);
                $data = array('code' => 200, 'status' => 'success', 'usuario' => $usuario);
            }
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $usuario = User::where('id', $id)->first();
        if (!empty($usuario)) {
            $usuario->delete();
            $data = array('code' => 200, 'status' => 'success', 'usuario' => $usuario);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'usuario no encontrado');
        }
        return response()->json($data, $data['code']);
    }
}
