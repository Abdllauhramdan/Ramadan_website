<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ProjectApiTest extends TestCase
{
    use RefreshDatabase;

    private function actingAsAdmin(): void
    {
        Sanctum::actingAs(User::create([
            'name' => 'Admin',
            'email' => 'admin@ramadan-eng.com',
            'password' => bcrypt('secret'),
        ]));
    }

    public function test_guest_cannot_create_project(): void
    {
        $this->postJson('/api/projects', [])->assertUnauthorized();
    }

    public function test_admin_can_create_project(): void
    {
        $this->actingAsAdmin();

        $payload = [
            'title' => ['ar' => 'مشروع', 'en' => 'Project'],
            'category' => 'buildings',
            'image' => 'https://example.com/p.jpg',
            'year' => '2025',
            'location' => ['ar' => 'دمشق', 'en' => 'Damascus'],
            'description' => ['ar' => 'وصف', 'en' => 'Desc'],
        ];

        $this->postJson('/api/projects', $payload)
            ->assertCreated()
            ->assertJsonPath('data.title.en', 'Project');

        $this->assertDatabaseCount('projects', 1);
    }

    public function test_create_project_rejects_invalid_category(): void
    {
        $this->actingAsAdmin();

        $this->postJson('/api/projects', ['category' => 'invalid'])
            ->assertStatus(422);
    }

    public function test_admin_can_update_project(): void
    {
        $this->actingAsAdmin();
        $project = Project::create(['title' => ['ar' => 'أ', 'en' => 'A'], 'category' => 'decor']);

        $this->putJson("/api/projects/{$project->id}", ['year' => '2030'])
            ->assertOk()
            ->assertJsonPath('data.year', '2030');
    }

    public function test_admin_can_delete_project(): void
    {
        $this->actingAsAdmin();
        $project = Project::create(['title' => ['ar' => 'أ', 'en' => 'A'], 'category' => 'decor']);

        $this->deleteJson("/api/projects/{$project->id}")->assertOk();

        $this->assertDatabaseCount('projects', 0);
    }

    public function test_admin_can_list_projects(): void
    {
        $this->actingAsAdmin();
        Project::create(['title' => ['ar' => 'أ', 'en' => 'A'], 'category' => 'decor']);
        Project::create(['title' => ['ar' => 'ب', 'en' => 'B'], 'category' => 'buildings']);

        $this->getJson('/api/projects')->assertOk()->assertJsonCount(2, 'data');
    }
}
