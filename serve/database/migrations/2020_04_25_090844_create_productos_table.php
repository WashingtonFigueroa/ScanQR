<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->bigIncrements('producto_id');
            
            $table->unsignedBigInteger('empresa_id');
            $table->foreign('empresa_id')
                ->references('empresa_id')
                ->on('empresas')
                ->onDelete('cascade');
            $table->unsignedBigInteger('presentacion_id');
            $table->foreign('presentacion_id')
                ->references('presentacion_id')
                ->on('presentaciones')
                ->onDelete('cascade');
        
            $table->string('nombre');
            $table->string('descripcion')->nullable();
            $table->string('imagen')->nullable();
            $table->double('valor');
            $table->integer('stock')->default(0);
            $table->integer('cantidad')->default(0);
            $table->boolean('inventariable')->default(false);
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
        Schema::dropIfExists('productos');
    }
}
