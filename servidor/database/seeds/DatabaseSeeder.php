<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Cargo;
use App\Establecimiento;
use App\Plan;
use App\Paquete;

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
        // Planes
        Plan::create(['nombre' => 'Establecimiento','detalle' => 'Capacidad maxima 4.000','estado' => true]);
        Plan::create(['nombre' => 'Centro Comercial','detalle' => 'Capacidad maxima 500.000','estado' => true]);
        // empresa
        Establecimiento::create([
            'plan_id' => 1,
            'documento' => '1091780891001',
            'nombre' => 'DTMOWED CIA LTDA',
            'actividad' => 'Desarrollo de Software',
            'direccion' => 'Ibarra',
            'email' => 'info@dtmowed.com',
            'telefono' => '0969191290',
            'logo' => '',
            'capacidad' => '10',
            'estancia' => '60',
            'cierre' => '20:00:00',
            'estado' => true
        ]);
        // user
        User::create(
            [
                'cargo_id' => 1,
                'establecimiento_id' => 1,
                'nombre' => 'Developer',
                'password' => bcrypt('$12345$'),
                'email' => 'test@gmail.com',
                'cedula' => '1003833447',
                'direccion' => 'Ibarra',
                'telefono' => '0969191290',
                'fecha_nacimiento' => '',
                'image' => ''
                ]
        );
        // Paquetes
        Paquete::create(['plan_id' => 1,'cupo' => 1500, 'valor' => 15.00, 'estado' => true]);
        Paquete::create(['plan_id' => 1,'cupo' => 4000, 'valor' => 25.00, 'estado' => true]);
        Paquete::create(['plan_id' => 2,'cupo' => 25000, 'valor' => 250.00, 'estado' => true]);
    }
}
