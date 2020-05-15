<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\User;

class UserController extends Controller
{
    public function repartidores()
    {
        $repartidores = User::where('role','role_repartidor')->get();
        if (is_object($repartidores)) {
            $data = array('code' => 200,'status' => 'success','repartidores' => $repartidores);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
    return response()->json($data, $data['code']);
    }

    public function clientes()
    {
        $clientes = User::where('role','role_cliente')->get();
        if (is_object($clientes)) {
            $data = array('code' => 200,'status' => 'success','clientes' => $clientes);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
    return response()->json($data, $data['code']);
    }

    public function index()
    {
        $users = User::where('role','role_admin')->get();
        if (is_object($users)) {
            $data = array('code' => 200,'status' => 'success','users' => $users);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
    return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $user = User::where('user_id', '=' ,$id)->first();
        if (is_object($user)) {
            $data = array('code' => 200,'status' => 'success','user' => $user);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
        return response()->json($data, $data['code']);
    }

    public function register (Request $request){
        //recoger los datos 
        $json = $request->input('json', null);
        $params = json_decode($json); //objeto
        $params_array = json_decode($json, true); // array  
        if (!empty($params) && !empty($params_array)){
            $params_array = array_map('trim', $params_array);       
            //validar datos https://stackoverrun.com/es/q/9398908
            $validate = \Validator::make($params_array, [
                'name' => 'required|regex:/^[\pL\s\-]+$/u',
                'email' => 'required|email|unique:users',
                'password' => 'required'
            ]);
            if ($validate->fails()){
                $data = array('status' => 'error','code' => 404,'message' => 'El usuario no se ha creado','errors' => $validate->errors());
            } else {                
                //guardar user
                $pwd = hash('sha256', $params->password);
                $user = new User();                
                $user->role = $params_array['role'];
                $user->cedula = $params_array['cedula'];
                $user->name = $params_array['name'];
                $user->email = $params_array['email'];
                $user->password = $pwd;
                $user->direccion = $params_array['direccion'];
                $user->telefono = $params_array['telefono'];
                $user->fecha_nacimiento = $params_array['fecha_nacimiento'];
                $user->image = $params_array['image'];
                $user->save();                
                $data = array('status' => 'success','code' => 200,'message' => 'Usuario creado','User'=> $user);
            }
        } else {
            $data = array('status' => 'error','code' => 404,'message' => 'Los datos enviados no son correctos');    
        }
        return response()->json($data, $data['code']);
    }

    public function login (Request $request){
        $jwtAuth = new \JwtAuth();
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        if (!empty($params) && !empty($params_array)){
            //Validar esos datos
            $validate = \Validator::make($params_array, [
                'email'	=> 'required|email',
                'password'	=> 'required'
            ]);
            if ($validate->fails()) {
                $singup = array('status' => 'error','code' => 404,
                    'message' => 'El usuario no Identificado',
                    'errors' => $validate->errors());
            } else {
                //Cifrar la password
                $pwd = hash('sha256', $params->password);
                //Devolver token o datos
                $singup = $jwtAuth->singnup($params->email, $pwd);
                if (!empty($params->gettoken)) {
                $singup = $jwtAuth->singnup($params->email, $pwd, true);
                }   
            }
        } else {
            $singup = array('status' => 'error','code' => 404,'message' => 'Los datos enviados no son correctos'); 
        }
        return response()->json($singup, 200);
    }
  
    public function update (Request $request)
    {
        $token = $request->header('Authorization');
        $jwtAuth = new \JwtAuth();
        $checkToken = $jwtAuth->checkToken($token);
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        if ($checkToken && !empty($params_array)) {
          // actualizar data
            //sacar usuario identificado
            $user = $jwtAuth->checkToken($token, true);
          //validar datos
          $validate = \Validator::make($params_array, [
            'name' => 'required|regex:/^[\pL\s\-]+$/u',
            'surname' => 'required|alpha'
           // 'email'	=> 'required|email|unique:users,'.$user->sub
        ]);
        //Quitar los campos que no se quiere se actulicen
        unset($params_array['user_id']);
        unset($params_array['role']);
        unset($params_array['password']);
        unset($params_array['password2']);
        unset($params_array['created_at']);
        unset($params_array['updated_at']);
        unset($params_array['remember_token']);
        // Actualizar datos db
        $user_update = User::where('user_id', $user->sub)->update($params_array);
        //devolver array
        $data = array('code' => 200, 'status' => 'success', 'users' => $user, 'changes' => $params_array);
        } else {
            $data = array( 'code' => 400, 'status' => 'error', 'message' => 'Usuario No Identificado');
        }
        return response()->json($data, $data['code']);
    }

    public function modificar(Request $request, $id)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        if (!empty($params_array)) {
        $validate = \Validator::make($params_array, [
            'name' => 'required|regex:/^[\pL\s\-]+$/u',
            'surname' => 'required|alpha'
        ]);
        //if ($validate->fails()) {
        //    $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el usuario');
       // } else {
            unset($params_array['user_id']);
            unset($params_array['role']);
            unset($params_array['password']);
            unset($params_array['password2']);
            unset($params_array['created_at']);
            unset($params_array['updated_at']);
            unset($params_array['remember_token']);
            $user_update = User::where('user_id','=', $id)->update($params_array);
            $data = array('code' => 200, 'status' => 'success', 'user' => $user_update);
       // }
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function upload(Request $request)
    {
        $image = $request->file('file0');
        //validacion img
        $validate = \Validator::make($request->all(),[
            'file0' => 'required|image|mimes:jpg,jpeg,png,gif'
        ]);
        //guardar imagen
        if (!$image || $validate->fails()) {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'Error al subir la imagen'
            );
        } else {
            $image_name = time().$image->getClientOriginalName();
            \Storage::disk('users')->put($image_name, \File::get($image));
            $data = array(
                'code' => 200,
                'status' => 'success',
                'image' => $image_name
            );
        } 
        return response()->json($data, $data['code']);
    }

    public function getImage ($filename) {
        $isset = \Storage::disk('users')->exists($filename);
        if ($isset) {
            $file = \Storage::disk('users')->get($filename);
            return new Response($file, 200);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Imagen no Existe');
        return response()->json($data, $data['code']);
        }
    }

    public function destroy($id, Request $request)
    {
        $user = User::where('user_id',$id)->first();
        if (!empty($user)) {
            $user->delete();
            $data = array('code' => 200, 'status' => 'success', 'user' => $user);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Usuario no encontrado');
        }
        return response()->json($data, $data['code']);
    }

    public function detail($id){
        $user = User::where('user_id', '=', $id)->first();
        if (is_object($user)) {
            $data = array('code' => 200,'status' => 'success','user' => $user);
        } 
        else {
            $data = array('code' => 404,'status' => 'error','message' => 'Usuario no existe');       
        }
    return response()->json($data, $data['code']);
    }
    

}

