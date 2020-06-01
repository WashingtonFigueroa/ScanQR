<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCuposTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cupos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('establecimiento_id');
            $table->foreign('establecimiento_id')
                ->references('id')
                ->on('establecimientos')
                ->onDelete('cascade');
            $table->unsignedBigInteger('paquete_id');
            $table->foreign('paquete_id')
                ->references('id')
                ->on('paquetes')
                ->onDelete('cascade');
            $table->unsignedInteger('carga');
            $table->unsignedInteger('gasto');
            $table->unsignedInteger('saldo');
            $table->string('fecha_fin');
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
        Schema::dropIfExists('cupos');
    }
}
