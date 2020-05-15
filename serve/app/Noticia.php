<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Noticia extends Model
{
    use SoftDeletes;

    protected $table = "noticias";
    protected $primaryKey = 'noticia_id';

    protected $dates = ['deleted_at'];

    public function empresa()
    {
        return $this->belongsTo('App\Empresa', 'empresa_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
