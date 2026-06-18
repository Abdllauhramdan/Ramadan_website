<?php

namespace App\Services;

use App\Models\ContactMessage;
use Illuminate\Database\Eloquent\Collection;

class ContactMessageService
{
    /** Public: store a new contact submission. */
    public function store(array $data): ContactMessage
    {
        return ContactMessage::create($data);
    }

    /** Admin: list submissions, newest first. */
    public function list(): Collection
    {
        return ContactMessage::latest()->get();
    }

    /** Admin: mark a message read/unread. */
    public function updateStatus(bool $isRead, int $id): ContactMessage
    {
        $message = ContactMessage::findOrFail($id);
        $message->update(['is_read' => $isRead]);

        return $message;
    }

    /** Admin: delete a message. */
    public function delete(int $id): void
    {
        ContactMessage::findOrFail($id)->delete();
    }
}
