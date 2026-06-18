<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;

/**
 * Authentication logic for the admin dashboard (Sanctum tokens).
 */
class AuthService
{
    /**
     * Validate credentials and issue a personal access token.
     *
     * @throws Exception (401) on invalid credentials
     */
    public function login(array $credentials): array
    {
        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw new Exception('auth.failed', 401);
        }

        $token = $user->createToken('dashboard')->plainTextToken;

        return [
            'token' => $token,
            'user' => ['name' => $user->name, 'email' => $user->email],
        ];
    }

    /**
     * Revoke the current access token.
     */
    public function logout(User $user): void
    {
        $user->currentAccessToken()->delete();
    }

    /**
     * Change the authenticated user's password.
     *
     * @throws Exception (422) when the current password is wrong
     */
    public function changePassword(User $user, string $current, string $new): void
    {
        if (! Hash::check($current, $user->password)) {
            throw new Exception('passwords.current_incorrect', 422);
        }

        $user->update(['password' => Hash::make($new)]);
    }
}
