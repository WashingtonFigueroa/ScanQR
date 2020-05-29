<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Establecimiento extends Model
{
    use SoftDeletes;

    protected $table = 'establecimientos';
    protected $fillable = [
        'documento',
        'nombre',
        'actividad',
        'direccion',
        'email',
        'telefono',
        'logo',
        'estado'
    ];
    protected $dates = ['deleted_at'];

    public function usuarios()
    {
        return $this->hasMany('App\User');
    }

    public function cupos()
    {
        return $this->hasMany('App\Cupo');
    }

    public function noticias()
    {
        return $this->hasMany('App\Noticia');
    }
}
