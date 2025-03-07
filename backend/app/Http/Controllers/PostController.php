<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if (is_null($user)) {
            $posts = Post::published()->get();
            return PostResource::collection($posts);
        }

        $posts = $user->posts()->active()->get();
        return PostResource::collection($posts);
    }

    public function show(string $slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        return new PostResource($post);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $post = Post::where('status', "new")->first();
        if ($post) {
            return new PostResource($post);
        }

        $title = sprintf("Nuevo Post %s", date('d/m/Y H:i:s'));
        $content = [
            [
                "id" => "1",
                "type" => "image",
                "content" => null,
                "removable" => false,
            ],
            [
                "id" => "2",
                "type" => "heading_1",
                "content" => $title,
                "removable" => false,
            ],
            [
                "id" => "3",
                "type" => "text",
                "content" => null,
            ]
        ];

        $post = $user->posts()->create([
            'slug' => Str::slug($title),
            'title' => $title,
            'img' => null,
            'content' => $content,
            'status' => "new",
        ]);

        return response()->json(new PostResource($post), 201);
    }

    public function update(Request $request, string $slug)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'img' => 'nullable|string',
            'content' => 'required|array',
            'status' => 'required|in:draft,published',
        ]);

        $post = Post::where('slug', $slug)->firstOrFail();
        $content = collect($request->content);
        if ($request->status === 'published') {
            $content = $this->updateImagesUrl($post, $content);
        }
        $titleBlocks = $content->where("type", "heading_1");
        $imageBlocks = $content->where("type", "image");
        $title = $titleBlocks->first()['content'];
        $image = $imageBlocks->first()['content'];

        $post->update([
            'slug' => Str::slug($title),
            'title' => $title,
            'img' => $image,
            'content' => $content,
            'status' => $request->status,
        ]);

        return new PostResource($post);
    }

    public function uploadImage(Request $request, string $slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        if (!$request->hasFile('image')) {
            return response()->json(['mensaje' => 'No se ha subido ninguna imagen'], 400);
        }

        $image = $request->file('image');
        $name = time() . '_' . $image->getClientOriginalName();
        $route = $image->storeAs("tmp/images/{$post->slug}", $name, "public");
        $route = asset(Storage::url($route));

        return response()->json(['route' => $route], 200);
    }

    private function updateImagesUrl(Post $post, Collection $content)
    {
        $content->transform(function ($block) use ($post) {
            if ($block['type'] === 'image' && str_contains($block['content'], '/storage/tmp/images/')) {
                $tmpRoute = Str::after($block['content'], '/storage/');

                $route = 'images/' . $post->slug . '/' . basename($tmpRoute);

                Storage::disk('public')->move($tmpRoute, $route);

                $block['content'] = asset(Storage::url($route));
            }
            return $block;
        });
        return $content;
    }
}
