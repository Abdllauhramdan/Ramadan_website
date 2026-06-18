<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ContactMessageApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_anyone_can_submit_a_contact_message(): void
    {
        $this->postJson('/api/contact-messages', [
            'name' => 'Ahmad',
            'email' => 'ahmad@example.com',
            'message' => 'I need a consultation',
        ])->assertCreated()->assertJsonPath('status', 'success');

        $this->assertDatabaseHas('contact_messages', ['name' => 'Ahmad']);
    }

    public function test_contact_message_requires_name_and_message(): void
    {
        $this->postJson('/api/contact-messages', ['email' => 'a@b.com'])
            ->assertStatus(422)
            ->assertJsonPath('status', 'error');
    }

    public function test_guest_cannot_list_messages(): void
    {
        $this->getJson('/api/contact-messages')->assertUnauthorized();
    }

    public function test_admin_can_list_and_mark_read_and_delete(): void
    {
        Sanctum::actingAs(User::create([
            'name' => 'Admin', 'email' => 'a@a.com', 'password' => bcrypt('x'),
        ]));

        $msg = ContactMessage::create(['name' => 'Sara', 'message' => 'Hi']);

        $this->getJson('/api/contact-messages')->assertOk()->assertJsonCount(1, 'data');

        $this->putJson("/api/contact-messages/{$msg->id}", ['is_read' => true])
            ->assertOk()
            ->assertJsonPath('data.is_read', true);

        $this->deleteJson("/api/contact-messages/{$msg->id}")->assertOk();
        $this->assertDatabaseCount('contact_messages', 0);
    }
}
