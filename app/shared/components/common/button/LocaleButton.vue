<template>
  <UDropdownMenu
    size="lg"
    :items="items"
    :content="{
      align: 'start'
    }"
    :ui="{
      content: 'w-max',
      itemLabel: 'font-montserrat'
    }"
  >
    <UButton
        :icon="locale === 'id' ? 'i-circle-flags-id' : 'i-circle-flags-gb'"
        color="neutral"
        variant="outline"
    >
        {{ locale === 'id' ? 'ID' : 'EN'  }}
    </UButton>
  </UDropdownMenu>
</template>

<script setup>
const route = useRoute()
const { locale, setLocale } = useLocale()

const changeLocale = async (lang) => {
  setLocale(lang)
  const path = route.fullPath.replace(/^\/(id|en)/, '')
  await navigateTo(`/${lang}${path}`)
}

const items = computed(() => [
  [
    {
      label: 'Bahasa Indonesia',
      icon: 'i-circle-flags-id',
      onSelect: () => changeLocale('id')
    },
    {
      label: 'English',
      icon: 'i-circle-flags-gb',
      onSelect: () => changeLocale('en')
    }
  ]
])
</script>