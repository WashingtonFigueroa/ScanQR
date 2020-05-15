<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // user
        \App\User::create(
            [
                'role' => 'role_admin',
                'cedula' => '1003833447',
                'name' => 'Washington Figueroa',
                'email' => 'test@gmail.com',
                'password' =>  hash('sha256','123456'),
                'direccion' => 'Ibarra',
                'telefono' => '0969191290'
                ]
        );
        // tipo_estados
        \App\Tipo_Estado::create(['nombre' => 'pendiente', 'descripcion' => 'pedido realizado', 'estado' => true ]);
        \App\Tipo_Estado::create(['nombre' => 'proceso', 'descripcion' => 'pedido aceptado', 'estado' => true ]);
        \App\Tipo_Estado::create(['nombre' => 'retirado', 'descripcion' => 'pedido recogido', 'estado' => true ]);
        \App\Tipo_Estado::create(['nombre' => 'por llegar', 'descripcion' => 'pedido en camino', 'estado' => true ]);
        \App\Tipo_Estado::create(['nombre' => 'entregado', 'descripcion' => 'pedido entrregado', 'estado' => true ]);
        \App\Tipo_Estado::create(['nombre' => 'rechazado', 'descripcion' => 'pedido anulado', 'estado' => true ]);
        // presentaciones
        \App\Presentacion::create(['abreviatura' => 'UNI', 'presentacion' => 'Unidad', 'cantidad' => 1, 'descripcion' => '', 'estado' => true ]);
        \App\Presentacion::create(['abreviatura' => 'PAR', 'presentacion' => 'Pareja', 'cantidad' => 2, 'descripcion' => '', 'estado' => true ]);
        \App\Presentacion::create(['abreviatura' => 'SIX PACK', 'presentacion' => '6 Unidad', 'cantidad' => 6, 'descripcion' => '', 'estado' => true ]);

    }
}
