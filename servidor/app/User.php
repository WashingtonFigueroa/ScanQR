<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $primaryKey = 'id';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'cargo_id', 'establecimiento_id', 'nombre', 'password', 'email', 'cedula', 'direccion', 'telefono', 'fecha_nacimiento', 'image'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    protected $appends = ['cargo', 'establecimiento', 'con_cupos'];

    public function cargo()
    {
        return $this->belongsTo('App\Cargo', 'id');
    }

    public function establecimiento()
    {
        return $this->belongsTo('App\Establecimiento', 'id');
    }

    public function historiales()
    {
        return $this->hasMany('App\Historial');
    }

    public function getCargoAttribute()
    {
        return Cargo::find($this->cargo_id);
    }

    public function getEstablecimientoAttribute()
    {
        return Establecimiento::find($this->establecimiento_id)->nombre;
    }

    public function getConCuposAttribute()
    {
        $establecimiento_id = User::find($this->getKey())->establecimiento_id;
        $hoy = Carbon::now()->toDateString();
        return Cupo::where('establecimiento_id', $establecimiento_id)
            ->where('estado', 1)
            ->where('saldo', '>', 0)
            ->whereDate('fecha_fin', '>=', $hoy)
            ->exists();
    }
}
