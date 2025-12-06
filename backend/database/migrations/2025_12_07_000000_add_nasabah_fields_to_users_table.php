<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                if (!Schema::hasColumn('users', 'nik')) {
                    $table->string('nik', 16)->nullable()->unique()->after('name');
                }
                if (!Schema::hasColumn('users', 'gender')) {
                    $table->enum('gender', ['Laki-laki', 'Perempuan'])->nullable()->after('address');
                }
                if (!Schema::hasColumn('users', 'birth_date')) {
                    $table->date('birth_date')->nullable()->after('gender');
                }
                if (!Schema::hasColumn('users', 'occupation')) {
                    $table->string('occupation')->nullable()->after('birth_date');
                }
            });
        }
    }

    public function down()
    {
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                if (Schema::hasColumn('users', 'occupation')) $table->dropColumn('occupation');
                if (Schema::hasColumn('users', 'birth_date')) $table->dropColumn('birth_date');
                if (Schema::hasColumn('users', 'gender')) $table->dropColumn('gender');
                if (Schema::hasColumn('users', 'nik')) $table->dropColumn('nik');
            });
        }
    }
};
