<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePedidosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->bigIncrements('pedido_id');

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')
                ->references('user_id')
                ->on('users')
                ->onDelete('cascade');
            $table->unsignedBigInteger('producto_id');
            $table->foreign('producto_id')
                ->references('producto_id')
                ->on('productos')
                ->onDelete('cascade');
            $table->unsignedBigInteger('tipo_estado_id');
            $table->foreign('tipo_estado_id')
                ->references('tipo_estado_id')
                ->on('tipo_estados')
                ->onDelete('cascade');

            $table->double('valor')->nullable();
            $table->double('cantidad')->nullable();
            $table->double('total')->nullable();
            $table->string('descripcion')->nullable();
            $table->string('direccion_entrega')->nullable();
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
        Schema::dropIfExists('pedidos');
    }
}
