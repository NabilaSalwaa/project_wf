<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SetorSampah extends Model
{
    protected $table = 'setoran_sampah';
    
    protected $fillable = [
        'user_id',
        'jenis_sampah',
        'berat',
        'harga_per_kg',
        'total_harga',
        'foto_sampah',
        'status',
        'catatan'
    ];

    protected $casts = [
        'berat' => 'decimal:2',
        'harga_per_kg' => 'decimal:2',
        'total_harga' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
