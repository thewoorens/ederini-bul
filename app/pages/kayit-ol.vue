<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
const toast = useToast()
import { ref } from 'vue'

// Form alanları
const fields: AuthFormField[] = [
  {
    name: 'fullname',
    type: 'text',
    label: 'Ad Soyad',
    placeholder: 'Adınız ve Soyadınız',
    required: true
  },
  {
    name: 'email',
    type: 'email',
    label: 'E‑posta Adresi',
    placeholder: 'ornek@firma.com',
    required: true
  },
  {
    name: 'password',
    type: 'password',
    label: 'Şifre',
    placeholder: '••••••••',
    required: true
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Şifre Tekrar',
    placeholder: '••••••••',
    required: true
  }
]

// Doğrulama şeması
const schema = z.object({
  fullname: z.string().min(2, 'Ad Soyad en az 2 karakter olmalı'),
  email: z.string().email('Geçerli bir email girin'),
  password: z.string().min(8, 'Şifre en az 8 karakter olmalı'),
  confirmPassword: z.string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"]
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Kayıt yapıldı', payload)
}

// Sosyal giriş butonları
const providers = [
  {
    label: 'Google',
    icon: 'i-simple-icons-google',
    onClick: (_event: MouseEvent) => {
      toast.add({ title: 'Google', description: 'Google ile kayıt yapılıyor...' })
    }
  },
  {
    label: 'Apple',
    icon: 'i-simple-icons-apple',
    onClick: (_event: MouseEvent) => {
      toast.add({ title: 'Apple', description: 'Apple ile kayıt yapılıyor...' })
    }
  }
]

const agree = ref(false)
const showError = ref(false)
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <UPageCard class="w-full max-w-lg p-10 border border-gray-300 rounded-lg shadow-none">

      <!-- Başlık -->
      <div class="mb-8 text-center">
        <h1 class="text-4x1 font-semibold text-gray-900">Kayıt Ol</h1>
        <p class="text-lg text-gray-500 mt-1">
          Kurumsal hesabınızı oluşturun
        </p>
      </div>

      <!-- Form -->
      <UAuthForm
        :schema="schema"
        :fields="fields"
        @submit="onSubmit"
        :providers="providers"
        title=""
        description=""
        class="space-y-10"
        :ui="{
          input: 'h-14 text-xl rounded-lg border border-gray-300 shadow-none focus:ring-0 focus:border-gray-400'
        }"
      />

      <!-- Sözleşme kabul alanı -->
      <div class="mt-4 px-2 text-base text-gray-500 text-center">
        <UCheckbox
          v-model="agree"
          :label="`
            Google veya Apple kimliğinizle devam ederek 
            Sözleşmeyi Kabul Ediyorsunuz.
          `"
          :danger="!agree && showError"
          class="text-gray-500 text-base"
        />
      </div>

      <!-- Alt alan -->
      <div class="mt-6 flex items-center justify-between text-base text-gray-600">
        <NuxtLink to="/giris-yap" class="hover:underline">
          Zaten hesabınız var mı? Giriş Yap
        </NuxtLink href="giris-yap">
      </div>

    </UPageCard>
  </div>
</template>
