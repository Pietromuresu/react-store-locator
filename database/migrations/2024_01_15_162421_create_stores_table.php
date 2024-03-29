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
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('employee_id')->nullable();
            $table->foreign('employee_id')
                  ->references('id')
                  ->on('employees')
                  ->onDelete('set null');
            $table->string("city", 55);
            $table->string("address");
            $table->smallInteger("zip_code");
            $table->string("state");
            $table->point("coordinates");
            $table->string("hours");
            $table->string("phone");
            $table->boolean("active")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
