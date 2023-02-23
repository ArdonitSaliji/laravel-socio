<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user extends Model
{
    protected $table = 'users';
    protected $fillable = ['firstName', 'lastName', 'email', 'password', 'picturePath', 'friends', 'location', 'occupation', 'viewedProfile', 'impressions'];
    
    use HasFactory;
}