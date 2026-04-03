<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

import MicRecorder from '@/services/microphone/MicRecorder';

const app = ref<MicRecorder | null>(null);

const isRecording = ref(false);
const volume = ref(0);
const audioUrl = ref<string | null>(null);

const start = () => {
  app.value!.start();
};
const stop = () => {
  app.value!.stop();
};

onMounted(() => {
  app.value = new MicRecorder();
  app.value!.setIsRecording = (flg) => {
    isRecording.value = flg;
  };
  app.value!.setVolume = (val) => {
    volume.value = val;
  };
  app.value!.setAudioUrl = (val) => {
    audioUrl.value = val;
  };
});
onUnmounted(() => {
  app.value!.stop();
});
</script>

<template>
  <div class="app-card space-y-4">
    <h2>🎤 マイクテスト</h2>

    <div class="space-x-5">
      <button @click="start" :disabled="isRecording" class="app-btn-primary">
        録音開始
      </button>

      <button @click="stop" :disabled="!isRecording" class="app-btn-primary">
        停止
      </button>

      <span v-if="isRecording">録音中</span>
    </div>

    <p>音量: {{ volume }}</p>

    <div v-if="audioUrl">
      <h3>録音結果</h3>
      <audio :src="audioUrl" controls />
    </div>
  </div>
</template>
