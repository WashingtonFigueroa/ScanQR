<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstablecimientosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('establecimientos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('plan_id');
            $table->foreign('plan_id')
            ->references('id')
            ->on('plans')
            ->onDelete('cascade');
            $table->string('documento')->nullable();
            $table->string('nombre');
            $table->string('actividad')->nullable();
            $table->string('direccion');
            $table->string('email');
            $table->string('telefono');
            $table->string('logo')->nullable();
            $table->unsignedInteger('capacidad');
            $table->unsignedInteger('estancia');
            $table->string('cierre');
            $table->boolean('estado')->default(true);
            $table->boolean('publicar')->default(false);
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
        Schema::dropIfExists('establecimientos');
    }
}
