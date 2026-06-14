<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Allows the React front-end (served from a different origin/port) to call
    | the API. Token-based auth (Sanctum personal access tokens) is used, so
    | cookies/credentials are not required and a wildcard origin is acceptable.
    | Tighten `allowed_origins` to your real domain in production if you prefer.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
