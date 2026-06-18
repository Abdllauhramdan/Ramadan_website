<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UploadApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_upload(): void
    {
        $this->postJson('/api/uploads', [])->assertUnauthorized();
    }

    public function test_admin_can_upload_image_and_get_url(): void
    {
        Storage::fake('public');
        Sanctum::actingAs(User::create([
            'name' => 'Admin', 'email' => 'a@a.com', 'password' => bcrypt('x'),
        ]));

        $file = UploadedFile::fake()->image('photo.jpg', 600, 400);

        $res = $this->postJson('/api/uploads', ['image' => $file])
            ->assertCreated()
            ->assertJsonPath('status', 'success')
            ->assertJsonStructure(['data' => ['url']]);

        $this->assertNotEmpty($res->json('data.url'));
        $this->assertGreaterThan(0, count(Storage::disk('public')->allFiles('images')));
    }

    public function test_upload_rejects_non_image(): void
    {
        Storage::fake('public');
        Sanctum::actingAs(User::create([
            'name' => 'Admin', 'email' => 'b@b.com', 'password' => bcrypt('x'),
        ]));

        $file = UploadedFile::fake()->create('malware.php', 10, 'application/x-php');

        $this->postJson('/api/uploads', ['image' => $file])->assertStatus(422);
    }
}
