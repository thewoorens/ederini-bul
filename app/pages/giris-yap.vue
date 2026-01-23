<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";
import { ref } from "vue";

const toast = useToast();
const loading = ref(false);

const fields: AuthFormField[] = [
  {
    name: "email",
    type: "email",
    label: "E-posta Adresi",
    placeholder: "ornek@firma.com",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Şifre",
    placeholder: "••••••••",
    required: true,
  },
];

const schema = z.object({
  email: z
    .string({
      required_error: "E-posta adresi gereklidir",
      invalid_type_error: "E-posta adresi bir metin olmalıdır",
    })
    .email("Lütfen geçerli bir e-posta adresi giriniz"),
  password: z
    .string({
      required_error: "Şifre gereklidir",
      invalid_type_error: "Şifre bir metin olmalıdır",
    })
    .min(8, "Şifre en az 8 karakter olmalıdır"),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  loading.value = true;

  try {
    const { data, error } = await useFetch("/api/auth/login", {
      method: "POST",
      body: payload.data,
    });

    if (error.value) {
      throw error.value;
    }

    if (!data.value) {
      throw new Error("Sunucu yanıt vermedi");
    }

    toast.add({
      title: "Başarılı",
      description: "Giriş başarılı, yönlendiriliyorsunuz...",
      color: "green",
      timeout: 2000,
    });

    await navigateTo("/");
  } catch (error: any) {
    const status = error?.statusCode || error?.response?.status;
    const statusMessage = error?.statusMessage || error?.data?.message;

    const messageMap: { [key: string]: string } = {
      "Invalid data": "Lütfen geçerli e-posta ve şifre giriniz",
      "Invalid credentials": "E-posta veya şifre hatalı",
      "Email not verified": "E-posta adresiniz doğrulanmamış",
    };

    let message = messageMap[statusMessage] || statusMessage || "Bir hata oluştu, lütfen tekrar deneyin";

    if (status === 500) {
      message = "Sunucu hatası, lütfen daha sonra tekrar deneyin";
    }

    toast.add({
      title: "Giriş Başarısız",
      description: message,
      color: "red",
      timeout: 3000,
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <UPageCard
      class="w-full max-w-lg p-10 border border-gray-300 rounded-lg shadow-none"
    >
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-semibold text-gray-900">Giriş Yapın</h1>
        <p class="text-sm text-gray-500 mt-1">
          Ederini Bul hesabınıza giriş yapın
        </p>
      </div>

      <UAuthForm
        :schema="schema"
        :fields="fields"
        @submit="onSubmit"
        title=""
        description=""
        :ui="{
          input: 'h-12 text-base focus:border-gray-400',
          button: 'h-12 text-base font-semibold',
        }"
        :loading="loading"
        submit-button-label="Giriş Yap"
      />

      <div class="mt-6 flex justify-between text-sm text-gray-600">
        <NuxtLink to="/sifremi-unuttum" class="hover:underline">
          Şifremi Unuttum
        </NuxtLink>

        <NuxtLink
          to="/kayit-ol"
          class="font-medium text-gray-900 hover:underline"
        >
          Kayıt Ol
        </NuxtLink>
      </div>
    </UPageCard>
  </div>
</template>
