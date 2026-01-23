<template>
  <footer class="bg-slate-50 border-t border-slate-200 pt-16 pb-8 dark:bg-slate-950 dark:border-slate-800">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        <div class="flex flex-col items-start space-y-6">
          <div class="flex items-center gap-3">
            <div class="bg-emerald-600 p-2 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-home" class="w-6 h-6 text-white" />
            </div>
            <span class="text-2xl font-black text-gray-900 tracking-tight dark:text-white">Ederini Bul</span>
          </div>
          <p class="text-sm text-slate-500 leading-relaxed pr-4 dark:text-slate-400">
            Gayrimenkul ve vasıta dünyasında şeffaf veri ve doğru analizle mülkünüzün gerçek değerini keşfedin.
          </p>
        </div>

        <div class="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div v-for="group in footerLinks" :key="group.title" class="flex flex-col items-start">
            <h4 class="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 dark:text-gray-100">
              {{ group.title }}
            </h4>
            <nav class="flex flex-col space-y-4">
              <ULink
                v-for="link in group.links"
                :key="link.label"
                to="#"
                class="text-sm text-slate-500 hover:text-emerald-600 transition-all duration-200 text-left dark:text-slate-400 dark:hover:text-emerald-400"
              >
                {{ link.label }}
              </ULink>
            </nav>
          </div>
        </div>
      </div>

      <div class="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-8">
        <div class="flex items-center">
          <p class="text-xs text-slate-400 font-medium tracking-tight dark:text-slate-500 uppercase">© 2026 Ederini Bul. Tüm Hakları Saklıdır.</p>
        </div>

        <div class="flex items-center gap-4 h-full">
          <USelectMenu
            v-model="selectedLang"
            :options="['Türkçe (TR)', 'English (US)']"
            variant="none"
            class="bg-white dark:bg-slate-900 rounded-xl ring-1 ring-slate-200 dark:ring-slate-800 px-3 w-48 shadow-sm h-12 flex items-center"
            :ui="{ trigger: 'flex items-center h-full w-full' }"
          >
            <template #leading>
              <UIcon name="i-lucide-languages" class="w-5 h-5 text-emerald-500" />
            </template>
          </USelectMenu>

          <div class="p-1 bg-white dark:bg-slate-900 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-800 shadow-sm flex items-center justify-center">
             <UButton
              :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
              color="emerald"
              variant="soft"
              class="rounded-xl px-6 h-10 transition-transform active:scale-95 flex items-center justify-center"
              @click="isDark = !isDark"
            >
              <span class="text-xs font-bold ml-1">{{ isDark ? 'Karanlık' : 'Aydınlık' }}</span>
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const selectedLang = ref('Türkçe (TR)')
const colorMode = useColorMode()

const isDark = computed({
  get () { return colorMode.value === 'dark' },
  set () { colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark' }
})

const footerLinks = [
  {
    title: 'Keşfet',
    links: [
      { label: 'Emlak İlanları' },
      { label: 'Vasıta İlanları' },
      { label: 'Ücretsiz Ekspertiz' },
      { label: 'Fiyat Trendleri' }
    ]
  },
  {
    title: 'Kurumsal',
    links: [
      { label: 'Hakkımızda' },
      { label: 'Kariyer' },
      { label: 'Basın Odası' },
      { label: 'İletişim' }
    ]
  },
  {
    title: 'Yardım',
    links: [
      { label: 'Sıkça Sorulanlar' },
      { label: 'İşlem Rehberi' },
      { label: 'Güvenli Alışveriş' },
      { label: 'Çerez Ayarları' }
    ]
  }
]
</script>