<?php

namespace App\Services;

use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Handles secure storage of uploaded images on the "public" disk.
 * Validates mime/extension, blocks double extensions and path traversal,
 * and returns a publicly accessible URL.
 */
class FileUploadService
{
    private array $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

    private array $allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg'];

    /**
     * Store an uploaded image and return its public URL.
     *
     * @throws Exception when the file fails validation
     */
    public function uploadImage(UploadedFile $file, string $folder = 'images'): string
    {
        $originalName = $file->getClientOriginalName();

        // Reject double extensions (e.g. file.php.jpg)
        if (preg_match('/\.[^.]+\./', $originalName)) {
            throw new Exception('general.notAllowedAction', 403);
        }

        $mimeType = $file->getClientMimeType();
        $extension = strtolower($file->getClientOriginalExtension());

        if (! in_array($mimeType, $this->allowedMimeTypes, true) || ! in_array($extension, $this->allowedExtensions, true)) {
            throw new Exception('general.invalidFileType', 422);
        }

        // Random, sanitized file name to avoid collisions and traversal
        $fileName = preg_replace('/[^A-Za-z0-9_\-]/', '', Str::random(32));
        $folder = preg_replace('/[^A-Za-z0-9_\-]/', '', $folder) ?: 'images';

        $path = $file->storeAs($folder, $fileName . '.' . $extension, 'public');

        return Storage::disk('public')->url($path);
    }

    /**
     * Delete a previously stored public file by its URL (best effort).
     */
    public function deleteByUrl(?string $url): void
    {
        if (! $url) {
            return;
        }

        $prefix = Storage::disk('public')->url('');
        if (Str::startsWith($url, $prefix)) {
            $path = ltrim(Str::after($url, $prefix), '/');
            Storage::disk('public')->delete($path);
        }
    }
}
