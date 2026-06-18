<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\WhyUs;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class SectionsApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Sanctum::actingAs(User::create([
            'name' => 'Admin', 'email' => 'a@a.com', 'password' => bcrypt('x'),
        ]));
    }

    public function test_settings_singleton_update(): void
    {
        $this->putJson('/api/settings', [
            'phone' => '+963 11 9999',
            'name' => ['ar' => 'RAMADAN', 'en' => 'RAMADAN'],
        ])->assertOk()->assertJsonPath('data.phone', '+963 11 9999');

        $this->assertDatabaseHas('settings', ['phone' => '+963 11 9999']);
    }

    public function test_hero_singleton_update(): void
    {
        $this->putJson('/api/hero', [
            'title' => ['ar' => 'عنوان', 'en' => 'Title'],
            'cta_primary' => ['ar' => 'ابدأ', 'en' => 'Start'],
        ])->assertOk()->assertJsonPath('data.title.en', 'Title');
    }

    public function test_about_singleton_update_with_points(): void
    {
        $this->putJson('/api/about', [
            'points' => [['id' => 'p1', 'ar' => 'نقطة', 'en' => 'Point']],
        ])->assertOk()->assertJsonPath('data.points.0.en', 'Point');
    }

    public function test_services_crud(): void
    {
        $res = $this->postJson('/api/services', [
            'icon' => 'ruler',
            'title' => ['ar' => 'خدمة', 'en' => 'Service'],
        ])->assertCreated();

        $id = $res->json('data.id');
        $this->putJson("/api/services/{$id}", ['icon' => 'brush'])
            ->assertOk()->assertJsonPath('data.icon', 'brush');
        $this->deleteJson("/api/services/{$id}")->assertOk();
        $this->assertDatabaseCount('services', 0);
    }

    public function test_stats_and_why_us_create(): void
    {
        $this->postJson('/api/stats', ['value' => '99+', 'label' => ['ar' => 'ع', 'en' => 'X']])
            ->assertCreated();
        $this->assertDatabaseCount('stats', 1);

        $this->postJson('/api/why-us', ['icon' => 'shield', 'title' => ['ar' => 'ع', 'en' => 'X'], 'text' => ['ar' => 'ن', 'en' => 'T']])
            ->assertCreated();
        $this->assertDatabaseCount('why_us', 1);
    }

    public function test_why_us_update_and_delete(): void
    {
        $w = WhyUs::create(['icon' => 'clock', 'title' => ['ar' => 'ع', 'en' => 'X'], 'text' => ['ar' => 'ن', 'en' => 'T']]);
        $this->putJson("/api/why-us/{$w->id}", ['icon' => 'spark'])
            ->assertOk()->assertJsonPath('data.icon', 'spark');
        $this->deleteJson("/api/why-us/{$w->id}")->assertOk();
    }
}
