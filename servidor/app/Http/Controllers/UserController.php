<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Controllers\Controller;
use App\User;
use App\QR;
use Illuminate\Support\Facades\Auth;
use File;
use phpseclib\Crypt\Hash;
use Storage;
use Validator;

class UserController extends Controller
{
    public $successStatus = 200;

    public function login()
    {
        if (Auth::attempt(['cuenta' => request('cuenta'), 'password' => request('password')])) {
            $user = Auth::user();
            $updateUser = User::find($user['id']);
            $tokenLog = $user['id'] . '-' . Carbon::now()->toDateTimeString();
            $tokenLog = bcrypt($tokenLog);
            $updateUser->token = $tokenLog;
            $updateUser->save();
            // adjuntar qr
            $qr = QR::where('user_id', '=', $user->id)->first();
            return response()->json([
                'token' => 'Bearer ' . $user->createToken('qr')->accessToken,
                'tokenLog' => $tokenLog,
                'identity' => $user,
                'qr' => $qr
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
        // create qr
        $user_id = User::where('cuenta', '=', $input['cuenta'])->first();
        $qr = new QR;
        $qr->user_id = $user_id->id;
        $qr->codqr = $input['cuenta'];
        $qr->nombre = $input['nombre'];
        $qr->tiempo = 2;
        $qr->save();
        return response()->json([
            'token' => $user->createToken('qr')->accessToken,
            'identity' => $user,
            'qr' => $qr
        ], $this->successStatus);
    }

    public function details()
    {
        $user = Auth::user();
        return response()->json($user, $this->successStatus);
    }

    public function index()
    {
        $usuarios = User::where('cargo_id', '!=', 4)->get();
        if (is_object($usuarios)) {
            $data = array('code' => 200, 'status' => 'success', 'usuarios' => $usuarios);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Lista Vacia');
        }
        return response()->json($data, $data['code']);
    }

    public function listaUsuarios()
    {
        $usuarios = User::all();
        if (is_object($usuarios)) {
            $data = array('code' => 200, 'status' => 'success', 'usuarios' => $usuarios);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Lista Vacia');
        }
        return response()->json($data, $data['code']);
    }

    public function indexClientes()
    {
        $usuarios = User::where('cargo_id', 4)->get();
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
            // create qr
            $user_id = User::where('cuenta', '=', $input['cuenta'])->first();
            $qr = new QR;
            $qr->user_id = $user_id->id;
            $qr->codqr = $input['cuenta'];
            $qr->nombre = $input['nombre'];
            $qr->tiempo = 2;
            $qr->save();
            return response()->json(['code' => 200, 'status' => 'success', 'usuario' => $usuario], 201);
        }
    }

    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            'password' => 'required'
        ]);
        $user = User::find($id);
        $input = $request->all();       
        if ($validate->fails()) {
            $user->update($input);
            // update data qr
            $data = $request->all();
            if ($data['cargo_id'] === 4) {
                $qr = QR::where('user_id', '=', $id)->first();
                $qr->codqr = $data['cuenta'];
                $qr->nombre = $data['nombre'];
                $qr->save();
            }
        } else {
            $input['password'] = bcrypt($input['password']);
            $user->update($input);
            // update data qr
            $data = $request->all();
            if ($data['cargo_id'] === 4) {
                $qr = QR::where('user_id', '=', $id)->first();
                $qr->codqr = $data['cuenta'];
                $qr->nombre = $data['nombre'];
                $qr->save();
            }
        }
        return response()->json($user, 200);
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

    public function upload(Request $request)
    {
        $image = $request->file('file0');
        $validate = Validator::make($request->all(), [
            'file0' => 'required|image|mimes:jpg,jpeg,png,gif'
        ]);
        if (!$image || $validate->fails()) {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'Error al subir la imagen'
            );
        } else {
            $image_name = time() . $image->getClientOriginalName();
            Storage::disk('users')->put($image_name, File::get($image));
            $data = array(
                'code' => 200,
                'status' => 'success',
                'image' => $image_name
            );
        }
        return response()->json($data, $data['code']);
    }

    public function getImage($filename)
    {
        $isset = Storage::disk('users')->exists($filename);
        if ($isset) {
            $file = Storage::disk('users')->get($filename);
            return new Response($file, 200);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Imagen no Existe');
            return response()->json($data, $data['code']);
        }
    }

    public function logout()
    {
        $user = User::find(Auth::id());
        $user->token = null;
        $user->save();
        return \response()->json($user, 200);
    }

    public function revocar()
    {
/*        $user = User::find($id);
        $user->token = null;
        $user->save();*/
        return response()->json(['error_auth' => 'Usted ya inicio sesion en otro dispositivo'], 401);
    }

}
