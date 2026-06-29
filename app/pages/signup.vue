<template>
    <section class="signup-component">
        <div class="signup-wrapper flex items-center">
            <article class="auth-banner w-[50%]">
                <NuxtImg src="/images/auth/auth-banner.webp" class="auth-banner" />
            </article>
            <article class="form-signup-wrapper">
            </article>
        </div>
    </section>
</template>

<script>
    useSeoMeta({
        title: 'Daftar - Seentix',
        description: 'Ayo! Buat akunmu sendiri dan jelajahi acara sesukamu di SeenTIX.',
    });
</script>

<style>
    .auth-banner {
        height: 100vh;
    }
</style>