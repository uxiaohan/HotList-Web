<template>
  <section class="list-item">
    <header>
      <div class="l">
        <img :src="reqImg(item.name)">
        <h3>{{ item.name }}</h3>
      </div>
      <div class="r"><span>{{ item.sub }}</span></div>
    </header>
    <main>
      <section class="list" :class="{ active: item.data.length > 0 }">
        <div class="main-item" v-for="i in item.data" :key="i.index">
          <a :href="i.url" target="_blank"><i>{{ i.index }}</i>{{ i.title }}</a>
          <span>{{ i.hot }}</span>
        </div>
      </section>
      <div class="loading-pn flex flex-col space-y-3" :class="{ active: item.data.length < 1 }">
        <div class="space-y-2">
          <Skeleton class="h-4 w-[100%]" />
          <Skeleton class="h-4 w-[80%]" />
          <Skeleton class="h-4 w-[90%]" />
          <Skeleton class="h-4 w-[60%]" />
          <Skeleton class="h-4 w-[70%]" />
          <Skeleton class="h-4 w-[50%]" />
          <Skeleton class="h-4 w-[30%]" />
          <Skeleton class="h-4 w-[40%]" />
        </div>
      </div>
    </main>
    <footer :class="{ active: item.data.length > 0 }">
      <span>{{ item.updateStr }}</span>
      <Button class="refresh" variant="outline" size="icon" @click="emit('refreshFn', item)">
        <UpdateIcon />
      </Button>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { UpdateIcon } from '@radix-icons/vue'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
const emit = defineEmits(['refreshFn'])

const props = defineProps<{ item: any }>();
const item = ref<any>(props.item);
const reqImg = (src: string) => new URL(`../../assets/images/${src}.webp`, import.meta.url).href
</script>

<style scoped lang="less">
@import url('ListItem.less');
</style>