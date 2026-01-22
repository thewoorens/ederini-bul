<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
const toast = useToast()

// Form alanları
const fields: AuthFormField[] = [
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
  }
]

// Doğrulama şeması
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  if (!agree.value) {
    showError.value = true
    return
  }
  console.log('Giriş yapıldı', payload)
}

// Sosyal giriş butonları
const providers = [
  {
    label: 'Google',
    icon: 'i-simple-icons-google',
    onClick: () => { toast.add({ title: 'Google', description: 'Google ile giriş yapılıyor...' }) }
  },
  {
    label: 'Apple',
    icon: 'i-simple-icons-apple',
    onClick: () => { toast.add({ title: 'Apple', description: 'Apple ile giriş yapılıyor...' }) }
  }
]

// Sözleşme kabul
import { ref } from 'vue'
const agree = ref(false)
const showError = ref(false)
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <UPageCard class="w-full max-w-lg p-10 border border-gray-300 rounded-lg shadow-none">

      <!-- Başlık -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-semibold text-gray-900">Sisteme Giriş</h1>
        <p class="text-sm text-gray-500 mt-1">
          Kurumsal hesabınız ile giriş yapın
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
        class="space-y-6"
        :ui="{
          input: 'h-10 w text-xl p-1  focus:border-gray-400'
        }"
      />

      <!-- Sözleşme kabul alanı -->
      <div class="mt-4 px-2 text-xs text-gray-500 text-center">
        <UCheckbox
          v-model="agree"
          :label="`
            Google veya Apple kimliğinizle devam ederek 
            Sözleşmeyi Kabul Ediyorsunuz.
          `"
          :danger="!agree && showError"
          class="text-gray-500 text-xs"
         
        />
      </div>

      <!-- Alt alan -->
      <div class="mt-6 flex items-center justify-between text-sm text-gray-600">
        <NuxtLink to="/sifremi-unuttum" class="hover:underline">
          Şifremi Unuttum
          
        </NuxtLink>
        
        <NuxtLink href="kayit-ol" class="font-medium text-gray-900 hover:underline">
          Kayıt Ol
        </NuxtLink>
      </div>

    </UPageCard>
  </div>
</template>
