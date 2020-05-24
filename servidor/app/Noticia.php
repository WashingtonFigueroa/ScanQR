<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Noticia extends Model
{
    use SoftDeletes;

    protected $table = 'noticias';
    protected $fillable = [
        'establecimiento_id ',
        'titulo',
        'detalle',
        'fecha_fin',
        'image',
        'estado'
    ];
    protected $dates = ['deleted_at'];

    public function establecimiento()
    {
        return $this->belongsTo('App\Establecimiento', 'id');
    }
}
