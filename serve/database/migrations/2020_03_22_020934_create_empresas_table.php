<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpresasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empresas', function (Blueprint $table) {
            $table->bigIncrements('empresa_id');
            $table->string('nombre',120);
            $table->string('eslogan',120)->nullable();
            $table->string('actividad')->nullable();             
            $table->string('direccion',100);
            $table->string('telefono',10);
            $table->string('email',100);
            $table->string('web',100)->nullable();
            $table->string('detalle')->nullable();
            $table->string('coordenadas')->nullable();
            $table->string('logo')->nullable();
            $table->boolean('estado')->default(true);
            $table->softDeletes(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('empresas');
    }
}
