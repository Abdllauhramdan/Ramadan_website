<?php

namespace App\Services;

use App\Models\About;
use App\Models\ContactSetting;
use App\Models\Hero;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Stat;
use App\Models\WhyUs;

/**
 * Builds the aggregated, public-facing content payload consumed by the
 * React site in a single request. Shape uses the front-end's camelCase keys.
 */
class ContentService
{
    public function getPublicContent(): array
    {
        $settings = Setting::first();
        $hero = Hero::first();
        $about = About::first();
        $contact = ContactSetting::first();

        return [
            'site' => $settings ? [
                'name' => $settings->name,
                'tagline' => $settings->tagline,
                'logo' => $settings->logo,
                'phone' => $settings->phone,
                'whatsapp' => $settings->whatsapp,
                'email' => $settings->email,
                'address' => $settings->address,
                'workingHours' => $settings->working_hours,
                'social' => $settings->social,
            ] : null,

            'hero' => $hero ? [
                'badge' => $hero->badge,
                'title' => $hero->title,
                'subtitle' => $hero->subtitle,
                'image' => $hero->image,
                'ctaPrimary' => $hero->cta_primary,
                'ctaSecondary' => $hero->cta_secondary,
            ] : null,

            'about' => $about ? [
                'title' => $about->title,
                'lead' => $about->lead,
                'body' => $about->body,
                'image' => $about->image,
                'points' => $about->points,
            ] : null,

            'contact' => $contact ? [
                'title' => $contact->title,
                'subtitle' => $contact->subtitle,
            ] : null,

            'stats' => Stat::orderBy('sort')->get()->map(fn ($s) => [
                'id' => (string) $s->id,
                'value' => $s->value,
                'label' => $s->label,
            ]),

            'services' => Service::orderBy('sort')->get()->map(fn ($s) => [
                'id' => (string) $s->id,
                'icon' => $s->icon,
                'title' => $s->title,
                'description' => $s->description,
            ]),

            'projects' => Project::orderBy('sort')->get()->map(fn ($p) => [
                'id' => (string) $p->id,
                'title' => $p->title,
                'category' => $p->category,
                'image' => $p->image,
                'year' => $p->year,
                'location' => $p->location,
                'description' => $p->description,
            ]),

            'whyUs' => WhyUs::orderBy('sort')->get()->map(fn ($w) => [
                'id' => (string) $w->id,
                'icon' => $w->icon,
                'title' => $w->title,
                'text' => $w->text,
            ]),
        ];
    }
}
