<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Noticia extends Model
{
    use SoftDeletes;

    protected $table = 'noticias';
    protected $fillable = [
        'establecimiento_id',
        'titulo',
        'detalle',
        'fecha_fin',
        'image',
        'estado'
    ];
    protected $dates = ['deleted_at'];

    protected $appends = ['establecimiento', 'logo'];

    public function establecimiento()
    {
        return $this->belongsTo('App\Establecimiento', 'id');
    }

    public function getEstablecimientoAttribute() {
        return Establecimiento::find($this->establecimiento_id)->nombre;
    }

    public function getLogoAttribute() {
        return Establecimiento::find($this->establecimiento_id)->logo;
    }
}
