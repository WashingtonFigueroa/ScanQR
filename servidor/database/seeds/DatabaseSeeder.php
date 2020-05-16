<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Cargo;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // cargo
        $cargos = [
            'Sadmin',
            'Coordinador General',
            'Técnico Logístico'
        ];
        foreach ($cargos as $cargo) {
            Cargo::create([
                'nombre' => $cargo,
                'descripcion' => $cargo
            ]);
        }
        // user
        User::create(
            [
                'cargo_id' => 1,
                'nombre' => 'Washington Figueroa',
                'password' => bcrypt('12345'),
                'email' => 'test@gmail.com',
                'cedula' => '1003833447',
                'direccion' => 'Ibarra',
                'telefono' => '0969191290',
                'fecha_nacimiento' => '',
                'image' => ''

                ]
        );
    }
}
