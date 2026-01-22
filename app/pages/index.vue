<template>
    <div class="min-h-screen  text-black">
        <Header />

        <div class="flex">
            <aside class="w-72  border-r border-gray-200 px-5 py-6 overflow-y-auto">
                <!-- EMLAK -->
                <div class="mb-6">
                    <h2 class="flex items-center gap-2 text-[11px] font-semibold uppercase text-black mb-3">
                        <UIcon name="i-heroicons-home" class="w-4 h-4 text-black" />
                        Emlak
                    </h2>
                    <ul class="space-y-1 text-sm">
                        <li class="sidebar-item">Konut</li>
                        <li class="sidebar-item">İş Yeri</li>
                        <li class="sidebar-item">Arsa</li>
                        <li class="sidebar-item">Konut Projeleri</li>
                        <li class="sidebar-item">Bina</li>
                        <li class="sidebar-item">Devre Mülk</li>
                        <li class="sidebar-item">Turistik Tesis</li>
                    </ul>
                </div>

                <!-- VASITA -->
                <div class="mb-6">
                    <h2 class="flex items-center gap-2 text-[11px] font-semibold uppercase text-black mb-3">
                        <UIcon name="i-heroicons-truck" class="w-4 h-4 text-black" />
                        Vasıta
                    </h2>
                    <ul class="space-y-1 text-sm">
                        <li class="sidebar-item">Otomobil</li>
                        <li class="sidebar-item">Arazi, SUV & Pickup</li>
                        <li class="sidebar-item">
                            Elektrikli Araçlar
                            <span class="block text-[10px] text-black leading-tight">
                                Döngüsel ekonomiye katkı sağlar
                            </span>
                        </li>
                        <li class="sidebar-item">Motosiklet</li>
                        <li class="sidebar-item">Minivan & Panelvan</li>
                        <li class="sidebar-item">Ticari Araçlar</li>
                        <li class="sidebar-item">Kiralık Araçlar</li>
                        <li class="sidebar-item">Deniz Araçları</li>
                        <li class="sidebar-item">Hasarlı Araçlar</li>
                        <li class="sidebar-item">Karavan</li>
                        <li class="sidebar-item">Klasik Araçlar</li>
                        <li class="sidebar-item">Hava Araçları</li>
                        <li class="sidebar-item">ATV</li>
                        <li class="sidebar-item">UTV</li>
                        <li class="sidebar-item">Engelli Plakalı Araçlar</li>
                    </ul>
                </div>

                <!-- YEDEK PARÇA -->
                <div class="mb-6">
                    <h2 class="flex items-center gap-2 text-[11px] font-semibold uppercase text-black mb-3">
                        <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4 text-black" />
                        Yedek Parça & Aksesuar
                    </h2>
                    <ul class="space-y-1 text-sm">
                        <li class="sidebar-item">Otomotiv Ekipmanları</li>
                        <li class="sidebar-item">Motosiklet Ekipmanları</li>
                        <li class="sidebar-item">Deniz Aracı Ekipmanları</li>
                    </ul>
                </div>

                <!-- İKİNCİ EL -->
                <div class="mb-6">
                    <h2 class="flex items-center gap-2 text-[11px] font-semibold uppercase text-black mb-3">
                        <UIcon name="i-heroicons-shopping-bag" class="w-4 h-4 text-black" />
                        İkinci El & Alışveriş
                    </h2>
                    <ul class="space-y-1 text-sm">
                        <li class="sidebar-item">Bilgisayar</li>
                        <li class="sidebar-item">Cep Telefonu & Aksesuar</li>
                        <li class="sidebar-item">Ev Dekorasyon</li>
                        <li class="sidebar-item">Ev Elektroniği</li>
                        <li class="sidebar-item">Giyim & Aksesuar</li>
                        <li class="sidebar-item">Spor</li>
                        <li class="sidebar-item">Ofis & Kırtasiye</li>
                        <li class="sidebar-item">Diğer Her Şey</li>
                    </ul>
                </div>
            </aside>


            <main class="flex-1 px-6 py-6">

                <div class="mb-8 relative group w-full max-w-9xl mx-auto rounded-2xl ">
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
                        class=" rounded-lg border border-gray-200 overflow-hidden shadow-sm relative group/card">
                        <div class="overflow-hidden aspect-4/3">
                            <img :src="`https://picsum.photos/400/300?random=${i + 100}`"
                                class="w-full h-full object-cover  transition-transform duration-300 cursor-pointer" />
                        </div>
                        <div class="p-3">
                            <p class="text-[11px] font-medium line-clamp-2 mb-1 text-black">Öne çıkan ilan başlığı örneği {{ i }}
                            </p>
                            <p class="text-[10px] text-black">Ankara / Çankaya</p>
                        </div>
                    </div>
                </div>

                <div class="mb-6 flex items-center gap-3">
                    <span class="w-1.5 h-5 bg-emerald-600 rounded-full"></span>
                    <h2 class="text-base font-semibold tracking-tight text-black">Anasayfa Vitrini</h2>
                </div>

                <div class="grid gap-x-4 gap-y-6 grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
                    <div v-for="i in 16" :key="i"
                        class="rounded-lg overflow-hidden border-gray-300 border cursor-pointer">
                        <div class="aspect-4/3 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                            <img :src="`https://picsum.photos/280/210?random=${i + 200}`"
                                class="w-full h-full object-cover" />
                        </div>
                        <div class="px-2 pt-2 pb-3">
                            <div class="text-[11px] leading-snug text-black line-clamp-2">Kurumsal ilan başlığı
                                örneği {{ i }}</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
const items = [
    'https://picsum.photos/1200/800?random=1',
    'https://picsum.photos/1200/800?random=2',
    'https://picsum.photos/1200/800?random=3',
    'https://picsum.photos/1200/800?random=4'
]

const sections = [
    { title: 'Emlak', icon: 'i-heroicons-home', items: ['Konut', 'İş Yeri', 'Arsa', 'Bina'] },
    { title: 'Vasıta', icon: 'i-heroicons-truck  ', items: ['Otomobil', 'Motosiklet', 'Ticari Araçlar'] },
    { title: 'İkinci El', icon: 'i-heroicons-shopping-bag', items: ['Bilgisayar', 'Telefon', 'Giyim'] }
]
</script>

<style scoped>
.sidebar-item {
    padding: 6px 10px;
    border-radius: 6px;
    color: #000000;
    cursor: pointer;
    transition: all 0.15s ease;
}

.sidebar-item:hover {
    background-color: #ecfdf5;
    color: #047857;
}
</style>