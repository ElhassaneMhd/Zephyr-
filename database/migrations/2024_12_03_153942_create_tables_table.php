<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
                Schema::disableForeignKeyConstraints();

        Schema::create('tables', function (Blueprint $table) {
            $table->id();
            $table->string('table_name');
            $table->string('name');
            $table->datetime('date');
            $table->decimal('index');
            $table->decimal('consummation');
            $table->decimal('puissance')->nullable();
            $table->decimal('cos')->nullable();
            $table->foreignId('centre_id')->constrained()->cascadeOnDelete();
            $table->enum('counter' ,['general' ,'divisional'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tables');
    }
};
