<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'posts';
    protected $primaryKey = 'postId';

    protected $fillable = ['userId', 'firstName', 'lastName', 'location', 'description', 'picturePath', 'userPicturePath'];
    
    use HasFactory;

    public function likes()
    {
        return $this->hasMany(Like::class, 'post_id');
    }
        
}