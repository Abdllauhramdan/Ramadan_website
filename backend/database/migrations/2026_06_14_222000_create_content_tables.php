<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Content tables for the RAMADAN website.
 * Bilingual text fields are stored as JSON: {"ar": "...", "en": "..."}.
 */
return new class extends Migration
{
    public function up(): void
    {
        // Site-wide settings (singleton row)
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->json('name')->nullable();
            $table->json('tagline')->nullable();
            $table->string('logo')->nullable();
            $table->string('phone')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('email')->nullable();
            $table->json('address')->nullable();
            $table->json('working_hours')->nullable();
            $table->json('social')->nullable();
            $table->timestamps();
        });

        // Hero section (singleton row)
        Schema::create('heroes', function (Blueprint $table) {
            $table->id();
            $table->json('badge')->nullable();
            $table->json('title')->nullable();
            $table->json('subtitle')->nullable();
            $table->string('image')->nullable();
            $table->json('cta_primary')->nullable();
            $table->json('cta_secondary')->nullable();
            $table->timestamps();
        });

        // About section (singleton row)
        Schema::create('abouts', function (Blueprint $table) {
            $table->id();
            $table->json('title')->nullable();
            $table->json('lead')->nullable();
            $table->json('body')->nullable();
            $table->string('image')->nullable();
            $table->json('points')->nullable(); // array of {id, ar, en}
            $table->timestamps();
        });

        // Contact intro (singleton row)
        Schema::create('contact_settings', function (Blueprint $table) {
            $table->id();
            $table->json('title')->nullable();
            $table->json('subtitle')->nullable();
            $table->timestamps();
        });

        // Stats
        Schema::create('stats', function (Blueprint $table) {
            $table->id();
            $table->string('value')->nullable();
            $table->json('label')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });

        // Services
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('icon')->default('ruler');
            $table->json('title')->nullable();
            $table->json('description')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });

        // Projects
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->json('title')->nullable();
            $table->string('category')->default('buildings'); // buildings|decor|designs
            $table->string('image')->nullable();
            $table->string('year')->nullable();
            $table->json('location')->nullable();
            $table->json('description')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });

        // Why-us features
        Schema::create('why_us', function (Blueprint $table) {
            $table->id();
            $table->string('icon')->default('shield');
            $table->json('title')->nullable();
            $table->json('text')->nullable();
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });

        // Contact form submissions
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('subject')->nullable();
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('why_us');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('services');
        Schema::dropIfExists('stats');
        Schema::dropIfExists('contact_settings');
        Schema::dropIfExists('abouts');
        Schema::dropIfExists('heroes');
        Schema::dropIfExists('settings');
    }
};
