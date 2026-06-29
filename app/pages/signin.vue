<template>
    <section class="signup-component">
        <div class="signup-wrapper grid min-h-svh lg:grid-cols-2">
            <article class="auth-banner bg-green-200 hidden lg:block">
                <NuxtImg src="/images/auth/auth-banner.webp" class="w-full h-svh object-cover object-center" />
            </article>
            <article class="form-signup-wrapper font-montserrat flex flex-col gap-4 p-6 md:p-10">
                <nav class="form-navigation-header flex items-center">
                    <NuxtLink class="font-semibold logo-app" to="/">SEENTIX</NuxtLink>
                </nav>
                <div class="form-box flex flex-1 items-center justify-center">
                    <div class="w-full max-w-120">
                        <div class="form-box-header text-center">
                            <header class="font-bold text-[1.45rem]">Masuk SeenTIX</header>
                            <h3 class="font-normal text-[14px] mt-1">Masuk ke Akun anda untuk menjelajahi seluruh fitur di SeenTIX.</h3>
                        </div>
                        <div class="form-detail flex justify-center items-center mt-8 mb-8">
                            <UForm
                                :state="form"
                                @submit="handleCreateAccount"
                                :schema="signupSchema"
                                class="w-full"
                            >
                                <UFormField label="Nama Lengkap" name="full_name" class="mb-6" :ui="{
                                    label: 'mb-2 font-semibold'
                                }">
                                    <UInput v-model="form.full_name" class="w-full shadow-xs" placeholder="Senecca Salvatus" />
                                </UFormField>
            
                                <UFormField label="Email" name="email" class="mb-6" :ui="{
                                    label: 'mb-2 font-semibold'
                                }">
                                    <UInput v-model="form.email" class="w-full shadow-xs" placeholder="senecca@gmail.com" />
                                </UFormField>
            
                                <UFormField label="Kata Sandi" name="password" class="mb-6" :ui="{
                                    label: 'mb-2 font-semibold'
                                }">
                                    <UInput
                                        v-model="form.password"
                                        :type="show ? 'text' : 'password'"
                                        :ui="{ trailing: 'pe-1' }"
                                        class="w-full"
                                    >
                                        <template #trailing>
                                        <UButton
                                            color="neutral"
                                            variant="link"
                                            size="sm"
                                            :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                            :aria-label="show ? 'Hide password' : 'Show password'"
                                            :aria-pressed="show"
                                            aria-controls="password"
                                            @click="show = !show"
                                        />
                                        </template>
                                    </UInput>
                                </UFormField>
                                <UFormField label="Konfirmasi Kata Sandi" name="password" class="mb-7" :ui="{
                                    label: 'mb-2 font-semibold'
                                }">
                                <UInput
                                        v-model="form.password_confirmation"
                                        :type="show ? 'text' : 'password'"
                                        :ui="{ trailing: 'pe-1' }"
                                        class="w-full"
                                    >
                                        <template #trailing>
                                        <UButton
                                            color="neutral"
                                            variant="link"
                                            size="sm"
                                            :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                            :aria-label="show ? 'Hide password' : 'Show password'"
                                            :aria-pressed="show"
                                            aria-controls="password"
                                            @click="show = !show"
                                        />
                                        </template>
                                    </UInput>
                                </UFormField>
            
                                <BaseButton
                                    label="Masuk"
                                    :loading="loading"
                                    type="submit"
                                    class="w-full"
                                />
                            </UForm>
                        </div>
                        <nav class="form-navigation-footer text-center">
                            <h3 class="text-neutral-500 text-sm">bELUM punya akun SeenTIX? <NuxtLink class="text-blue-500 hover:underline underline-offset-2" to="/signup">Daftar disini.</NuxtLink></h3>
                        </nav>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>

<script setup>
    import { signupSchema } from '../modules/auth/schemas/signup.schema'

    definePageMeta({
        middleware: ['guest']
    })

    useSeoMeta({
        title: 'Daftar - Seentix',
        description: 'Ayo! Buat Akunmu Sendiri dan Jelajahi Acara Kesukaanmu di SeenTIX.',
    });

    const form = reactive({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const loading = ref(false);
    const show = ref(false);

    const handleCreateAccount = async () => {
        loading.value = true
        try {
            const response = await AuthService.signup(form)
            console.log(response, 'hahaha');
        } finally {
            loading.value = false
        }
    };
</script>