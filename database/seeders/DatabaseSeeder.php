<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\GroupType;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Cortisol Admin',
            'username' => 'admin',
            'email' => 'admin@cortisol.test',
        ]);

        $type = GroupType::create(['type' => 'Public']);

        $group = Group::create([
            'name' => 'General Discussion',
            'code' => 'general',
            'group_type_id' => $type->id,
            'creator_id' => $user->id,
        ]);

        $group->users()->attach($user->id);

        Post::create([
            'title' => 'Welcome to Cortisol!',
            'content' => 'This is the first post on the platform. Start discussing, voting, and sharing.',
            'user_id' => $user->id,
            'group_id' => $group->id,
        ]);

        Post::create([
            'title' => 'How to use this platform',
            'content' => 'Join groups, post interesting content, and upvote the best stuff.',
            'user_id' => $user->id,
            'group_id' => $group->id,
        ]);
    }
}
