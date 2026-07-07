<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// "Request a Quote" catering form (frontend: CateringPage.tsx)
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('catering_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->date('event_date');
            $table->unsignedInteger('guests');
            $table->string('package')->nullable();
            $table->text('notes')->nullable();
            $table->string('status')->default('new');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('catering_requests');
    }
};
