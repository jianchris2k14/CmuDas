<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileLocation extends Model
{
    use HasFactory;

    protected $table = 'file_locations';

    protected $primaryKey = 'file_location_id';

    protected $fillable = [
        'file_location',
        'retention_date',
        'file_id',
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
