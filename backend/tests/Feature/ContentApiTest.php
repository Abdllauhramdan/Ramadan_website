<?php

namespace Tests\Feature;

use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContentApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_content_endpoint_returns_full_structure(): void
    {
        $this->seed(DatabaseSeeder::class);

        $response = $this->getJson('/api/content');

        $response->assertOk()
            ->assertJsonStructure([
                'site' => ['name' => ['ar', 'en'], 'phone', 'whatsapp', 'email', 'workingHours', 'social'],
                'hero' => ['title' => ['ar', 'en'], 'image', 'ctaPrimary', 'ctaSecondary'],
                'about' => ['title', 'body', 'points'],
                'contact' => ['title', 'subtitle'],
                'stats' => [['id', 'value', 'label']],
                'services' => [['id', 'icon', 'title', 'description']],
                'projects' => [['id', 'title', 'category', 'image', 'location']],
                'whyUs' => [['id', 'icon', 'title', 'text']],
            ]);
    }

    public function test_content_reflects_bilingual_values(): void
    {
        $this->seed(DatabaseSeeder::class);

        $this->getJson('/api/content')
            ->assertJsonPath('site.name.ar', 'رمضان')
            ->assertJsonPath('site.name.en', 'RAMADAN')
            ->assertJsonPath('services.0.title.en', 'Engineering & Design');
    }

    public function test_content_is_publicly_accessible_without_auth(): void
    {
        $this->getJson('/api/content')->assertOk();
    }
}
