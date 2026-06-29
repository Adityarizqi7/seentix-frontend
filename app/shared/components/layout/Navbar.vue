<template>
    <header class="sticky top-0 z-999 w-full border-b px-16">
        <div class="font-montserrat flex 6xs:flex-col gap-2 h-17 6xs:h-[9rem] items-center justify-between 6xs:justify-center">
            <section class="header__logo-wrapper">
                <h1 class="font-bold logo-app montserrat">SEENTIX</h1>
            </section>
            <section class="header__menu hidden lg:block">
                <nav class="flex items-center gap-4">
                    <NuxtLink
                        v-for="menu in menus"
                        :key="menu.to"
                        :to="menu.to"
                        :class="[
                            'transition-colors duration-150 hover:font-semibold',
                            route.path === menu.to
                            ? 'text-teal-500 font-semibold px-4 py-1.5 rounded-lg bg-teal-600/10 hover:bg-teal-600/20'
                            : 'text-gray-600'
                        ]"
                    >
                        {{ menu.name }}
                    </NuxtLink>
                </nav>
            </section>
            <section class="header__action-auth flex items-center gap-5">
                <LocaleButton />
                <UDropdownMenu 
                    v-if="isLogin"
                    size="lg"
                    :items="items"
                    :content="{
                        align: 'start'
                    }"
                    :ui="{
                        content: 'w-32',
                        itemLabel: 'font-montserrat'
                    }"
                >
                    <button class="cursor-pointer">
                        <UAvatar src="https://github.com/nuxt.png" />
                    </button>
                </UDropdownMenu>
                <div v-else class="action-auth__button flex items-center gap-5">
                    <NuxtLink to="/signin">Masuk</NuxtLink>
                    <BaseButton label="Daftar" to="/signup" />
                </div>
                <!-- <div v-else></div> -->
            </section>
        </div>
    </header>
</template>

<script setup lang="js">
    const route = useRoute();

    const isLogin = false;

    const menus = [
        { name: 'Beranda', to: '/' },
        { name: 'Temukan', to: 'discover' },
    ];

    const items = computed(() => [
        [
            {
                label: 'Profile',
                icon: 'i-lucide-user'
            },
        ],
        [
            {
                label: 'Logout',
                icon: 'i-lucide-log-out',
                color: 'error',
            }
        ]
    ]);
</script>

<style scoped>
    header {
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
        border-bottom-color: rgb(229, 231, 235);
    }
</style>