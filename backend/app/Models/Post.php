<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'excerpt',
        'img',
        'content',
        'status',
    ];

    protected $casts = [
        'content' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getContentAttribute($value)
    {
        return json_decode($value);
    }

    public function scopeWithUser($query, User $user)
    {
        return $query->where('user_id', $user->id);
    }

    public function scopeActive($query)
    {
        return $query->whereIn('status', ['draft', 'published']);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
