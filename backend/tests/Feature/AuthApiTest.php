<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::create([
            'name' => 'Admin',
            'email' => 'admin@ramadan-eng.com',
            'password' => Hash::make('ramadan2026'),
        ]);
    }

    public function test_login_with_valid_credentials_returns_token(): void
    {
        $this->admin();

        $this->postJson('/api/login', [
            'email' => 'admin@ramadan-eng.com',
            'password' => 'ramadan2026',
        ])->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonStructure(['data' => ['token', 'user' => ['name', 'email']]]);
    }

    public function test_login_with_invalid_credentials_fails(): void
    {
        $this->admin();

        $this->postJson('/api/login', [
            'email' => 'admin@ramadan-eng.com',
            'password' => 'wrong',
        ])->assertStatus(401)->assertJsonPath('status', 'error');
    }

    public function test_login_validation_errors_use_envelope(): void
    {
        $this->postJson('/api/login', [])
            ->assertStatus(422)
            ->assertJsonPath('status', 'error');
    }

    public function test_protected_route_requires_authentication(): void
    {
        $this->getJson('/api/me')->assertUnauthorized();
        $this->getJson('/api/settings')->assertUnauthorized();
    }

    public function test_me_returns_authenticated_user(): void
    {
        Sanctum::actingAs($this->admin());

        $this->getJson('/api/me')
            ->assertOk()
            ->assertJsonPath('data.email', 'admin@ramadan-eng.com');
    }

    public function test_change_password_requires_correct_current_password(): void
    {
        $user = $this->admin();
        Sanctum::actingAs($user);

        $this->postJson('/api/change-password', [
            'current_password' => 'wrong',
            'new_password' => 'newsecret',
        ])->assertStatus(422);

        $this->postJson('/api/change-password', [
            'current_password' => 'ramadan2026',
            'new_password' => 'newsecret',
        ])->assertOk();

        $this->assertTrue(Hash::check('newsecret', $user->fresh()->password));
    }
}
