<template>
  <header
    class="h-20 bg-emerald-600 flex items-center px-8 sticky top-0 z-50 border-b border-emerald-700/50"
  >
    <div
      class="flex items-center justify-center gap-8 max-w-full mx-auto w-full"
    >
      <NuxtLink to="/" class="flex flex-col relative group">
        <span class="text-white font-bold text-3xl">Ederini Bul</span>
        <div
          class="absolute bottom-0 left-0 w-0 h-1 bg-gray-200 rounded-xl group-hover:w-full transition-all duration-300"
        ></div>
      </NuxtLink>

      <div
        class="flex-1 max-w-2xl flex items-center bg-white rounded-lg h-11 overflow-hidden shadow-sm border border-gray-200"
      >
        <UInput
          variant="none"
          placeholder="İlan veya kategori ara..."
          class="flex-1 font-medium text-sm"
        />

        <UButton
          icon="i-heroicons-magnifying-glass"
          color="emerald"
          class="h-full px-6 rounded-none border-none shadow-none transition-none"
          square
        />
      </div>

      <div class="flex items-center shrink-0">
        <div class="flex items-center gap-5 text-[11px] text-white">
          <UButton
            class="p-3 cursor-pointer"
            variant="soft"
            color="neutral"
            trailing-icon="i-lucide-log-in"
            size="md"
            >Giriş Yap</UButton
          >

          <UButton
            class="p-3 cursor-pointer"
            color="secondary"
            trailing-icon="i-lucide-user-plus"
            size="md"
            >Kayıt Ol</UButton
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script setup></script>
