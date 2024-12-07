<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description"
        content="This project was originally made by two competent developers Walid Zakan & Elhassane Mehdioui
    To contact : www.linkedin.com/in/walid-zakan-814996257 | www.linkedin.com/in/elhassanmhd
    ">

    <title inertia>{{ config('app.name', 'Zephyr') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap" rel="stylesheet" />
    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/App.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="antialiased">
    @inertia
</body>

</html>
