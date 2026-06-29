<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :external="external"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :disabled="!to ? (disabled || loading) : undefined"
    :class="[
      disabled || loading
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-teal-500 hover:bg-teal-600 cursor-pointer text-white'
    ]"
    class="px-4 py-2 rounded-[8px] font-semibold transition-colors duration-150"
  >
     <span v-if="loading" class="flex items-center gap-2">
      <svg
        class="w-4 h-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      Memuat...
    </span>
    <span v-else>
      {{ label }}
    </span>
  </NuxtLink>
  <button v-else
    @click="handleClick"
    :disabled="!to ? (disabled || loading) : undefined"
    :class="[
      disabled || loading
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-teal-500 hover:bg-teal-600 cursor-pointer text-white'
    ]"
    class="px-4 py-2 rounded-[8px] font-semibold transition-colors duration-150"
  >
     <span v-if="loading" class="flex items-center gap-2">
      <svg
        class="w-4 h-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      Memuat...
    </span>
    <span v-else>
      {{ label }}
    </span>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'Button'
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  to: {
    type: [String, Object],
    default: null,
  },
  external: Boolean,
  target: String,
});

const emit = defineEmits(['emit']);

const handleClick = (event) => {
    if (loading || disabled) return;

    emit('click', event);
};
</script>