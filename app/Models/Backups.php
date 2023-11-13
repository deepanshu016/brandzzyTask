<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Backups extends Model
{
    use HasFactory;
    protected  $fillable = ['backup_file','backup_time'];
}
