<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Establecimiento extends Model
{
    use SoftDeletes;

    protected $table = 'establecimientos';
    protected $fillable = [
        'plan_id',
        'documento',
        'nombre',
        'actividad',
        'direccion',
        'email',
        'telefono',
        'logo',
        'capacidad',
        'estancia',
        'cierre',
        'estado',
        'publicar'
    ];
    protected $dates = ['deleted_at'];

    protected $appends = ['plan'];

    public function getPlanAttribute()
    {
        return Plan::find($this->plan_id)->nombre;
    }

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
