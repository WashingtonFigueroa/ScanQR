<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Empresa extends Model
{
    use SoftDeletes; 

    protected $table = "empresas";
    protected $primaryKey = 'empresa_id';

    protected $fillable = [
        'nombre',
        'eslogan',
        'actividad',
        'direccion',
        'telefono',
        'email',
        'web',
        'detalle',
        'coordenadas',
        'logo',
        'estado',
        'updated_at'
    ];
    protected $dates = ['deleted_at'];

    public function productos()
    {
        return $this->hasMany('App\Producto');
    }
   
    public function deneficios()
    {
        return $this->hasMany('App\Beneficio');
    }

    public function noticias()
    {
        return $this->hasMany('App\Noticia');
    }
}
