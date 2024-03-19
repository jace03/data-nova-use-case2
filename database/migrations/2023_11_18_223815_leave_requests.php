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
        Schema::create('leave_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('leaveTypes', 25);
            $table->dateTime('startDate');
            $table->dateTime('endDate');
            $table->float('daysTotal');
            $table->string('reason', 20);
            $table->timestamp('dayRequested')->useCurrent();
            $table->string('status', 20);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
