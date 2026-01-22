<template>
  <header class="h-20 bg-emerald-600 flex items-center px-8 sticky top-0 z-50 border-b border-emerald-700/50">
    <div class="max-w-[1400px] mx-auto w-full flex items-center gap-10">

      <NuxtLink to="/" class="shrink-0 flex flex-col leading-none">
        <span class="text-white font-black text-2xl tracking-tighter">Ederini Bul</span>
      </NuxtLink>

      <div
        class="flex-1 max-w-2xl flex items-center bg-white rounded-lg h-11 overflow-hidden shadow-sm border border-gray-200">
        <UInput variant="none" placeholder="İlan veya kategori ara..." class="flex-1 font-medium text-sm" />


        <UPopover :popper="{ placement: 'bottom-end', offsetDistance: 10 }">
          <UButton variant="ghost" color="gray" label="FİLTRELE" icon="i-heroicons-adjustments-horizontal"
            class="h-full px-4 border-l border-gray-100 text-gray-400 font-bold text-[10px] tracking-widest hover:bg-gray-50 rounded-none transition-none" />

          <template #panel>
            <div class="w-80 p-6 bg-white border border-gray-200 shadow-none">
              <div class="space-y-5">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Arama
                  Seçenekleri</p>

                <div class="space-y-2">
                  <span class="text-[10px] font-bold text-gray-500 uppercase">Kategori</span>
                  <USelectMenu v-model="filter.category" :options="['Emlak', 'Vasıta', 'İkinci El', 'Yedek Parça']"
                    placeholder="Seçiniz" size="sm" />
                </div>

                <div class="space-y-2">
                  <span class="text-[10px] font-bold text-gray-500 uppercase">Fiyat Aralığı</span>
                  <div class="grid grid-cols-2 gap-2">
                    <UInput v-model="filter.minPrice" placeholder="Min TL" type="number" size="sm" />
                    <UInput v-model="filter.maxPrice" placeholder="Max TL" type="number" size="sm" />
                  </div>
                </div>

                <div class="space-y-2">
                  <span class="text-[10px] font-bold text-gray-500 uppercase">Model Yılı</span>
                  <div class="grid grid-cols-2 gap-2">
                    <UInput v-model="filter.minYear" placeholder="Min Yıl" type="number" size="sm" />
                    <UInput v-model="filter.maxYear" placeholder="Max Yıl" type="number" size="sm" />
                  </div>
                </div>

                <div class="space-y-2">
                  <span class="text-[10px] font-bold text-gray-500 uppercase">İlan Sahibi</span>
                  <USelectMenu v-model="filter.from"
                    :options="['Sahibinden', 'Galeriden', 'Emlak Ofisinden', 'Yetkili Bayi']" placeholder="Seçiniz"
                    size="sm" />
                </div>

                <div class="flex flex-col gap-2 pt-2 border-t border-gray-50">
                  <UCheckbox v-model="filter.urgent" label="Sadece Acil İlanlar" />
                  <UCheckbox v-model="filter.video" label="Videolu İlanlar" />
                </div>

                <UButton label="SONUÇLARI GÖSTER" block color="emerald" size="md"
                  class="font-bold text-xs rounded-none transition-none h-10" />
              </div>
            </div>
          </template>
        </UPopover>

        <UButton icon="i-heroicons-magnifying-glass" color="emerald"
          class="h-full px-6 rounded-none border-none shadow-none transition-none" square />
      </div>

      <div class="flex items-center gap-6 shrink-0">
        <div class="flex items-center gap-5 text-[11px]  text-white">
          <UButton class="p-3"  variant="solid" color="neutral" trailing-icon="i-lucide-log-in" size="md">Giriş Yap</UButton>

          <UButton class="p-3" color="neutral" trailing-icon="i-lucide-user-plus" size="md">Kayıt Ol</UButton>

        </div>



      </div>
    </div>
  </header>
</template>

<script setup>
const filter = ref({
  category: null,
  minPrice: null,
  maxPrice: null,
  minYear: null,
  maxYear: null,
  from: null,
  urgent: false,
  video: false
})
const categories = ['Emlak', 'Vasıta', 'İkinci El', 'Yedek Parça']
</script>