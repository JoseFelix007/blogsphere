<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'content' => $this->content,
            'img' => $this->img,
            'slug' => $this->slug,
            'status' => $this->status,
            'title' => $this->title,
            'user' => new UserResource($this->user),
            'created_at' => $this->created_at,
        ];
    }
}
