<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                if (!Schema::hasColumn('users', 'phone')) $table->string('phone')->nullable()->after('email');
                if (!Schema::hasColumn('users', 'address')) $table->text('address')->nullable()->after('phone');
                if (!Schema::hasColumn('users', 'role')) $table->string('role')->default('user')->after('address');
                if (!Schema::hasColumn('users', 'is_demo')) $table->boolean('is_demo')->default(false)->after('role');
                if (!Schema::hasColumn('users', 'metadata')) $table->json('metadata')->nullable()->after('is_demo');
            });
        }
    }

    public function down()
    {
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                if (Schema::hasColumn('users', 'metadata')) $table->dropColumn('metadata');
                if (Schema::hasColumn('users', 'is_demo')) $table->dropColumn('is_demo');
                if (Schema::hasColumn('users', 'role')) $table->dropColumn('role');
                if (Schema::hasColumn('users', 'address')) $table->dropColumn('address');
                if (Schema::hasColumn('users', 'phone')) $table->dropColumn('phone');
            });
        }
    }
};
