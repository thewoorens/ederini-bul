<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";
import { ref } from "vue";

const toast = useToast();
const loading = ref(false);
const agree = ref(false);

const fields: AuthFormField[] = [
  {
    name: "name",
    type: "text",
    label: "Ad",
    placeholder: "Adınız",
    required: true,
  },
  {
    name: "surname",
    type: "text",
    label: "Soyad",
    placeholder: "Soyadınız",
    required: true,
  },
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
  {
    name: "confirmPassword",
    type: "password",
    label: "Şifre Tekrar",
    placeholder: "••••••••",
    required: true,
  },
];

const schema = z
  .object({
    name: z
      .string({
        required_error: "Ad gereklidir",
        invalid_type_error: "Ad bir metin olmalıdır",
      })
      .min(1, "Ad boş bırakılamaz")
      .min(2, "Ad en az 2 karakter olmalıdır"),
    surname: z
      .string({
        required_error: "Soyad gereklidir",
        invalid_type_error: "Soyad bir metin olmalıdır",
      })
      .min(1, "Soyad boş bırakılamaz")
      .min(2, "Soyad en az 2 karakter olmalıdır"),
    email: z
      .string({
        required_error: "E-posta adresi gereklidir",
        invalid_type_error: "E-posta adresi bir metin olmalıdır",
      })
      .min(1, "E-posta adresi boş bırakılamaz")
      .email("Lütfen geçerli bir e-posta adresi giriniz"),
    password: z
      .string({
        required_error: "Şifre gereklidir",
        invalid_type_error: "Şifre bir metin olmalıdır",
      })
      .min(1, "Şifre boş bırakılamaz")
      .min(8, "Şifre en az 8 karakter olmalıdır"),
    confirmPassword: z
      .string({
        required_error: "Şifre tekrar gereklidir",
        invalid_type_error: "Şifre tekrar bir metin olmalıdır",
      })
      .min(1, "Şifre tekrar boş bırakılamaz")
      .min(8, "Şifre tekrar en az 8 karakter olmalıdır"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  if (!agree.value) {
    toast.add({
      title: "Uyarı",
      description: "Devam edebilmek için sözleşmeyi kabul etmelisiniz",
      color: "red",
      timeout: 3000,
    });
    return;
  }

  loading.value = true;

  try {
    const { data, error } = await useFetch("/api/auth/register", {
      method: "POST",
      body: {
        email: payload.data.email,
        password: payload.data.password,
        confirmPassword: payload.data.confirmPassword,
        name: payload.data.name,
        surname: payload.data.surname,
      },
    });

    if (error.value) {
      throw error.value;
    }

    if (!data.value) {
      throw new Error("Sunucu yanıt vermedi");
    }

    toast.add({
      title: "Başarılı",
      description:
        "Kayıt başarılı! Lütfen e-posta adresinizi kontrol edin ve hesabınızı doğrulayın.",
      color: "green",
      timeout: 8000,
    });

    setTimeout(() => {
      navigateTo("/giris-yap");
    }, 2000);
  } catch (error: any) {
    const status = error?.statusCode || error?.response?.status;
    const statusMessage = error?.statusMessage || error?.data?.message;

    const messageMap: { [key: string]: string } = {
      "Invalid data": "Lütfen tüm alanları doğru şekilde doldurunuz",
      "Email already exists": "Bu e-posta adresi zaten kayıtlı",
      "Passwords do not match": "Şifreler eşleşmiyor",
      "Temporary email address not allowed":
        "Geçici e-posta adresleri kullanılamaz",
      "Email provider not supported": "Bu e-posta sağlayıcısı desteklenmiyor",
      "Email could not be sent": "E-posta gönderilemedi, lütfen tekrar deneyin",
      "Invalid data format": "Geçersiz veri formatı",
      "Ad gereklidir": "Ad gereklidir",
      "Ad bir metin olmalıdır": "Ad bir metin olmalıdır",
      "Ad boş bırakılamaz": "Ad boş bırakılamaz",
      "Ad en az 2 karakter olmalıdır": "Ad en az 2 karakter olmalıdır",
      "Soyad gereklidir": "Soyad gereklidir",
      "Soyad bir metin olmalıdır": "Soyad bir metin olmalıdır",
      "Soyad boş bırakılamaz": "Soyad boş bırakılamaz",
      "Soyad en az 2 karakter olmalıdır": "Soyad en az 2 karakter olmalıdır",
      "E-posta adresi gereklidir": "E-posta adresi gereklidir",
      "E-posta adresi bir metin olmalıdır": "E-posta adresi bir metin olmalıdır",
      "E-posta adresi boş bırakılamaz": "E-posta adresi boş bırakılamaz",
      "Lütfen geçerli bir e-posta adresi giriniz": "Lütfen geçerli bir e-posta adresi giriniz",
      "Şifre gereklidir": "Şifre gereklidir",
      "Şifre bir metin olmalıdır": "Şifre bir metin olmalıdır",
      "Şifre boş bırakılamaz": "Şifre boş bırakılamaz",
      "Şifre en az 8 karakter olmalıdır": "Şifre en az 8 karakter olmalıdır",
      "Şifre tekrar gereklidir": "Şifre tekrar gereklidir",
      "Şifre tekrar bir metin olmalıdır": "Şifre tekrar bir metin olmalıdır",
      "Şifre tekrar boş bırakılamaz": "Şifre tekrar boş bırakılamaz",
      "Şifre tekrar en az 8 karakter olmalıdır": "Şifre tekrar en az 8 karakter olmalıdır",
    };

    let message =
      messageMap[statusMessage] ||
      statusMessage ||
      "Bir hata oluştu, lütfen tekrar deneyin";

    if (status === 500) {
      message = "Sunucu hatası, lütfen daha sonra tekrar deneyin";
    }

    toast.add({
      title: "Kayıt Başarısız",
      description: message,
      color: "red",
      timeout: 6000,
    });
  } finally {
    loading.value = false;
  }
}

const providers = [
  {
    label: "Google",
    icon: "i-simple-icons-google",
    onClick: (_event: MouseEvent) => {
      toast.add({
        title: "Yakında",
        description: "Google ile kayıt özelliği yakında eklenecek",
        color: "blue",
      });
    },
  },
  {
    label: "Apple",
    icon: "i-simple-icons-apple",
    onClick: (_event: MouseEvent) => {
      toast.add({
        title: "Yakında",
        description: "Apple ile kayıt özelliği yakında eklenecek",
        color: "blue",
      });
    },
  },
];
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <UPageCard
      class="w-full max-w-lg p-10 border border-gray-300 rounded-lg shadow-none"
    >
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-semibold text-gray-900">Kayıt Ol</h1>
        <p class="text-sm text-gray-500 mt-1">
          Ederini Bul hesabınızı oluşturun
        </p>
      </div>

      <UAuthForm
        :schema="schema"
        :fields="fields"
        @submit="onSubmit"
        :providers="providers"
        title=""
        description=""
        :ui="{
          input: 'h-12 text-base focus:border-gray-400',
          button: 'h-12 text-base font-semibold',
        }"
        :loading="loading"
        submit-button-label="Kayıt Ol"
      />

      <div class="mt-4 max-w-xl text-xs text-center">
        <UCheckbox
          v-model="agree"
          label="Kayıt olarak Kullanım Şartları ve Gizlilik Politikasını kabul etmiş olursunuz."
          :color="!agree ? 'red' : 'primary'"
          required
        />
        <p v-if="!agree" class="text-red-500 text-xs mt-1">
          Sözleşmeyi kabul etmelisiniz
        </p>
      </div>

      <div class="mt-6 flex justify-center text-sm text-gray-600">
        <span class="mr-1">Zaten hesabınız var mı?</span>
        <NuxtLink
          to="/giris-yap"
          class="font-medium text-gray-900 hover:underline"
        >
          Giriş Yap
        </NuxtLink>
      </div>
    </UPageCard>
  </div>
</template>
