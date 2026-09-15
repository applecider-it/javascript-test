<script setup lang="ts">
import { ref } from 'vue';
import { fetchAddressByZip, sanitizeZipCode } from '@/services/zipcode/zipcode';
import { Prefectures } from '@/services/zipcode/prefectures';

const zipCode = ref<string>('');
const errorMessage = ref<string>('');
const loading = ref<boolean>(false);

const pref = ref<string>('');
const address2 = ref<string>('');
const address3 = ref<string>('');

const trace = ref<string>('');

/** 検索処理 */
const searchAddress = async (): Promise<void> => {
  errorMessage.value = '';
  trace.value = '';
  loading.value = true;

  const result = await fetchAddressByZip(zipCode.value);

  if (result.success) {
    trace.value = JSON.stringify(result.data, null, 2);

    pref.value = result.data.prefcode;
    address2.value = result.data.address2;
    address3.value = result.data.address3;
  } else {
    errorMessage.value = result.message;
  }

  loading.value = false;
};

const onChangeZipCode = () => {
  zipCode.value = sanitizeZipCode(zipCode.value);
};
</script>

<template>
  <div class="space-y-5">
    <div class="space-x-3">
      <label for="zip">郵便番号（7桁）:</label>
      <input
        id="zip"
        v-model="zipCode"
        @change="onChangeZipCode"
        type="text"
        class="app-form-input w-auto"
      />
      <button
        :disabled="loading"
        @click="searchAddress"
        class="app-btn-primary"
      >
        {{ loading ? '検索中...' : '検索' }}
      </button>
    </div>

    <div class="space-x-3">
      <select v-model="pref" class="app-form-input w-auto">
        <option value="" disabled>選択してください</option>
        <option v-for="[code, name] in Prefectures" :key="code" :value="code">
          {{ name }}
        </option>
      </select>

      <input type="text" v-model="address2" class="app-form-input w-auto" />
      <input type="text" v-model="address3" class="app-form-input w-auto" />
    </div>

    <div v-if="errorMessage" class="text-red-400">{{ errorMessage }}</div>
    <pre v-if="trace">{{ trace }}</pre>
  </div>
</template>
