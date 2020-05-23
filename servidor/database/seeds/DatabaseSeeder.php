<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Cargo;
use App\Establecimiento;

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
            'Administrador',
            'Coordinador General',
            'Técnico Logístico',
            'Cliente'
        ];
        foreach ($cargos as $cargo) {
            Cargo::create([
                'nombre' => $cargo,
                'descripcion' => $cargo
            ]);
        }
        // empresa
        Establecimiento::create([
            'documento' => '100',
            'nombre' => 'DTMOWED',
            'actividad' => 'Desarrollo de Software',
            'direccion' => 'Ibarra',
            'email' => 'info@dtmowed.com',
            'telefono' => '0969191290',
            'logo' => '',
            'estado' => true
        ]);
        // user
        User::create(
            [
                'cargo_id' => 1,
                'establecimiento_id' => 1,
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
