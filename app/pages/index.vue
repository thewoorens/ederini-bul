<template>
  <div class="min-h-screen text-black bg-white">
    <Header />

    <div class="flex max-w-[1440px] mx-auto">
      
      <aside class="w-80 border-r border-gray-200 px-5 py-6 ml-2 no-scrollbar">
        <div v-for="section in sidebarCategories" :key="section.title" class="mb-6">
          <h2 class="sidebar-title">
            <UIcon :name="section.icon" class="w-4 h-4" />
            {{ section.title }}
          </h2>

          <ul class="sidebar-child-wrapper">
            <li 
              v-for="item in (expandedSections.has(section.title) ? section.items : section.items.slice(0, SHOW_LIMIT))" 
              :key="item.label" 
              class="sidebar-item"
            >
              <span>{{ item.label }}</span>
              <span v-if="item.subtext" class="block text-[10px] text-emerald-600 leading-tight">
                {{ item.subtext }}
              </span>
            </li>

            <li 
              v-if="section.items.length > SHOW_LIMIT" 
              @click="toggleSection(section.title)"
              class="sidebar-toggle-btn"
            >
              <span>{{ expandedSections.has(section.title) ? 'Kapat' : 'Tümünü Göster' }}</span>
              <UIcon 
                :name="expandedSections.has(section.title) ? 'i-heroicons-chevron-up-20-solid' : 'i-heroicons-chevron-down-20-solid'" 
                class="w-4 h-4" 
              />
            </li>
          </ul>
        </div>
      </aside>

      <main class="flex-1 px-6 py-6">
        <div class="mb-8 relative group w-full rounded-2xl">
          <UCarousel v-slot="{ item }" fade dots :items="items" :ui="{
            root: 'relative overflow-hidden rounded-2xl shadow-xl',
            container: 'h-87.5',
            controls: 'absolute inset-0 flex items-center justify-between px-16 z-30',
            dots: 'absolute bottom-6 inset-x-0 z-20'
          }" class="w-full">
            <img :src="item" class="w-full h-full object-cover" draggable="false">
          </UCarousel>
        </div>

        <div class="mb-6 flex items-center gap-3">
          <span class="w-1.5 h-5 bg-orange-600 rounded-full"></span>
          <h1 class="text-base font-semibold tracking-tight text-black">Öne Çıkan İlanlar</h1>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-6 gap-5 mb-10">
          <div v-for="i in 6" :key="'featured-' + i"
            class="rounded-lg border border-gray-200 overflow-hidden shadow-sm relative group/card cursor-pointer bg-white">
            <div class="overflow-hidden aspect-4/3">
              <img :src="`https://picsum.photos/400/300?random=${i + 100}`"
                class="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-110" />
            </div>
            <div class="p-3">
              <p class="text-[11px] font-medium line-clamp-2 mb-1 text-black">İlan başlığı örneği {{ i }}</p>
              <p class="text-[10px] text-gray-500">Ankara / Çankaya</p>
            </div>
          </div>
        </div>

        <div class="mb-6 flex items-center gap-3">
          <span class="w-1.5 h-5 bg-emerald-600 rounded-full"></span>
          <h2 class="text-base font-semibold tracking-tight text-black">Anasayfa Vitrini</h2>
        </div>

        <div class="grid gap-x-4 gap-y-6 grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
          <div v-for="i in 64" :key="i"
            class="rounded-lg overflow-hidden border border-gray-200 hover:border-emerald-500 transition-colors cursor-pointer group/vitrin bg-white">
            <div class="aspect-4/3 bg-gray-100 overflow-hidden border-b border-gray-100">
              <img :src="`https://picsum.photos/280/210?random=${i + 200}`"
                class="w-full h-full object-cover group-hover/vitrin:opacity-90 transition-opacity" />
            </div>
            <div class="px-2 pt-2 pb-3 text-center">
              <div class="text-[11px] leading-snug text-black line-clamp-2">Vitrin ilan örneği {{ i }}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const SHOW_LIMIT = 5
const expandedSections = ref(new Set<string>())

const toggleSection = (title: string) => {
  if (expandedSections.value.has(title)) {
    expandedSections.value.delete(title)
  } else {
    expandedSections.value.add(title)
  }
}

const items = [
  'https://picsum.photos/1200/800?random=1',
  'https://picsum.photos/1200/800?random=2',
  'https://picsum.photos/1200/800?random=3',
  'https://picsum.photos/1200/800?random=4'
]

const sidebarCategories = [
  {
    title: 'Emlak',
    icon: 'i-heroicons-home',
    items: [
      { label: 'Konut' }, { label: 'İş Yeri' }, { label: 'Arsa' },
      { label: 'Konut Projeleri' }, { label: 'Bina' }, { label: 'Devre Mülk' }, { label: 'Turistik Tesis' }
    ]
  },
  {
    title: 'Vasıta',
    icon: 'i-heroicons-truck',
    items: [
      { label: 'Otomobil' }, { label: 'Arazi, SUV & Pickup' },
      { label: 'Elektrikli Araçlar', subtext: 'Döngüsel ekonomiye katkı sağlıyor' },
      { label: 'Motosiklet' }, { label: 'Minivan & Panelvan' }, { label: 'Ticari Araçlar' },
      { label: 'Kiralık Araçlar' }, { label: 'Deniz Araçları' }, { label: 'Hasarlı Araçlar' },
      { label: 'Karavan' }, { label: 'Klasik Araçlar' }, { label: 'Hava Araçları' },
      { label: 'ATV' }, { label: 'UTV' }, { label: 'Engelli Plakalı Araçlar' }
    ]
  },
  {
    title: 'Yedek Parça, Aksesuar & Tuning',
    icon: 'i-heroicons-cog-6-tooth',
    items: [
      { label: 'Otomotiv Ekipmanları' }, { label: 'Motosiklet Ekipmanları' }, { label: 'Deniz Aracı Ekipmanları' }
    ]
  },
  {
    title: 'İkinci El ve Sıfır Alışveriş',
    icon: 'i-heroicons-shopping-bag',
    items: [
      { label: 'Bilgisayar' }, { label: 'Cep Telefonu' }, { label: 'Fotoğraf' },
      { label: 'Ev Dekorasyon' }, { label: 'Ev Elektroniği' }, { label: 'Giyim' },
      { label: 'Saat' }, { label: 'Anne & Bebek' }, { label: 'Hobi' }
    ]
  },
  {
    title: 'İş Makineleri & Sanayi',
    icon: 'i-heroicons-wrench-screwdriver',
    items: [
      { label: 'İş Makineleri' }, { label: 'Tarım Makineleri' }, { label: 'Sanayi' }, { label: 'Elektrik' }
    ]
  },
  {
    title: 'Özel Ders Verenler',
    icon: 'i-heroicons-academic-cap',
    items: [
      { label: 'Lise & Üniversite' }, { label: 'Yabancı Dil' }, { label: 'Bilgisayar' },
      { label: 'Direksiyon' }, { label: 'Spor' }, { label: 'Sanat' }, { label: 'Müzik' }
    ]
  },
  {
    title: 'İş İlanları',
    icon: 'i-heroicons-briefcase',
    items: [
      { label: 'Avukatlık' }, { label: 'Eğitim' }, { label: 'IT & Yazılım' },
      { label: 'Sağlık' }, { label: 'Satış' }, { label: 'Pazarlama' }, { label: 'Üretim' }
    ]
  },
  {
    title: 'Hayvanlar Alemi',
    icon: 'i-heroicons-bug-ant',
    items: [
      { label: 'Evcil Hayvanlar' }, { label: 'Akvaryum Balıkları' }, { label: 'Büyükbaş' }, { label: 'Küçükbaş' }
    ]
  }
]
</script>

<style scoped>
/* Scrollbar'ı tüm tarayıcılarda gizlemek için */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;  /* IE/Edge */
  scrollbar-width: none;  /* Firefox */
}

.sidebar-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #1a1a1a;
  margin-bottom: 8px;
  margin-top: 4px;
}

.sidebar-child-wrapper {
  margin-left: 1rem;
  border-left: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-item {
  padding: 4px 12px;
  font-size: 13px;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sidebar-item:hover {
  background-color: #f0fdf4;
  color: #059669;
  padding-left: 16px;
}

.sidebar-toggle-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  color: #3b82f6;
  cursor: pointer;
  user-select: none;
}

.sidebar-toggle-btn:hover {
  color: #2563eb;
  text-decoration: underline;
}
</style>