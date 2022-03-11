<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;

    protected $primaryKey = 'request_id';

    protected $fillable = [
        'description',
        'request_date',
        'status',
        'user_id',
        'file_id'
    ];
    public $timestamps = false;
    protected $append = ['createdAt'];

    public function getCreatedAtAttribute() {
        return Carbon::createFromTimestamp(strtotime($this->attributes['created_at']))->format('m-d-Y');
    }

}
