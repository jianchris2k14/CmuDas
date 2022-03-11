<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $primaryKey = 'file_id';

    protected $fillable = [
        'code',
        'filename',
        'slug',
        'description',
        'user_id'
    ];
    public $timestamps = false;
    protected $create = ['createdAt'];

    public function getCreatedAtAttribute() {
        return Carbon::createFromTimestamp(strtotime($this->attributes['created_at']))->format('m-d-Y');
    }
    protected $update = ['updatedAt'];
    public function getUpdatedAtAttribute() {
        return Carbon::createFromTimestamp(strtotime($this->attributes['updated_at']))->format('m-d-Y');
    }
}
