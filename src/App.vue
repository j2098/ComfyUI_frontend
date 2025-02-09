<template>
  <router-view v-if="ready" />
  <ProgressSpinner
    v-if="isLoading"
    class="absolute inset-0 flex justify-center items-center h-screen"
  />
  <GlobalDialog />
  <BlockUI full-screen :blocked="isLoading" />
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import BlockUI from 'primevue/blockui'
import ProgressSpinner from 'primevue/progressspinner'
import { computed, onMounted, ref, watchEffect } from 'vue'

import GlobalDialog from '@/components/dialog/GlobalDialog.vue'
import config from '@/config'
import { useWorkspaceStore } from '@/stores/workspaceStore'

import { electronAPI, isElectron, isEmbedded } from './utils/envUtil'
import { FlowConfig } from './constants/flowConfig'

const workspaceStore = useWorkspaceStore()
const isLoading = computed<boolean>(() => workspaceStore.spinner)
const handleKey = (e: KeyboardEvent) => {
  workspaceStore.shiftDown = e.shiftKey
}
const ready = ref(!isEmbedded());
useEventListener(window, 'keydown', handleKey)
useEventListener(window, 'keyup', handleKey)

const showContextMenu = (event: PointerEvent) => {
  const { target } = event
  switch (true) {
    case target instanceof HTMLTextAreaElement:
    case target instanceof HTMLInputElement && target.type === 'text':
      // TODO: Context input menu explicitly for text input
      electronAPI()?.showContextMenu({ type: 'text' })
      return
  }
}

onMounted(() => {
  window['__COMFYUI_FRONTEND_VERSION__'] = config.app_version
  console.log('ComfyUI Front-end version:', config.app_version)

  if (isElectron()) {
    document.addEventListener('contextmenu', showContextMenu)
  }
})
watchEffect((onCleanup) => {
  if (isEmbedded()) {
    const listener = (event: any) => {
      const data = event.data;
      if (!data || !data.type) return;
      if (data.type === 'init' && data.workflow) {
        console.log('init', data);
        sessionStorage.clear();
        localStorage.clear();
        localStorage.setItem('workflow', data.workflow);
        FlowConfig.flowId = data.flowId;
        ready.value = true;
      }
    }
    window.addEventListener('message', listener);
    onCleanup(() => {
      window.removeEventListener('message', listener);
    });
  }
})
</script>
