<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{

    protected $table = 'messages';

    protected $fillable = ['userId', 'friendId', 'chat', 'created_at', 'updated_at'];
    
    use HasFactory;
}