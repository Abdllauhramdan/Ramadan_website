<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    /** Public: store a contact form submission. */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ]);

        $message = ContactMessage::create($data);

        return response()->json([
            'message' => 'Received',
            'id' => $message->id,
        ], 201);
    }

    /** Admin: list submissions (newest first). */
    public function index()
    {
        return response()->json(ContactMessage::latest()->get());
    }

    /** Admin: mark a message read/unread. */
    public function update(Request $request, ContactMessage $message)
    {
        $data = $request->validate([
            'is_read' => ['required', 'boolean'],
        ]);
        $message->update($data);

        return response()->json($message);
    }

    /** Admin: delete a message. */
    public function destroy(ContactMessage $message)
    {
        $message->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
