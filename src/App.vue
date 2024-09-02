<template>
  <section class="www_vvhan_com">
    <header>
      <div class="main">
        <div class="logo">
          <img src="https://q1.qlogo.cn/g?b=qq&nk=1655466387&s=640">
          <span>今日热榜</span>
        </div>
        <h2>提供各站热榜热搜聚合</h2>
      </div>
    </header>
    <main>
      <header>
        <Alert>
          <DrawingPinIcon />
          <AlertTitle>公告</AlertTitle>
          <AlertDescription>
            <p>今日热榜是聚合热榜热搜平台，汇集了各大网站的热榜信息，包括微博热搜、今日头条、知乎日报、澎湃新闻、虎扑步行街、36氪、哔哩哔哩热榜，知乎、IT资讯、虎嗅网、人人都是产品经理热榜百度、抖音热点豆瓣小组精选等。使用
              <a class="git-link" href="https://api.vvhan.com/article/hotlist.html" target="_blank">韩小韩热榜API</a>
              ，可快速接入热榜数据，助力追踪全网热点。
            </p>
            <p>开源地址: <a class="git-link" href="https://github.com/uxiaohan/HotList-Web" target="_blank">HotList-Web</a>
            </p>
          </AlertDescription>
        </Alert>
      </header>

      <section class="hotlist">
        <ListItem v-for="i in hotlistKey" :key="i.name" :item="i" @refreshFn="refreshFn" />
      </section>
    </main>
    <footer>
      <p><img src="./assets/svg/ing.svg"></p>
      <p>
        <a href="https://pages.cloudflare.com" target="_blank" rel="noopener noreferrer"><img
            src="./assets/svg/framework.svg"></a>
        <a href="https://www.cloudflare.com/zh-cn/application-services/products/cdn/" target="_blank"
          rel="noopener noreferrer"><img src="./assets/svg/cdn.svg"></a>
        <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img src="./assets/svg/web.svg"></a>
        <a href="https://api.vvhan.com" target="_blank"><img src="./assets/svg/surppot.svg"></a>
      </p>
    </footer>
  </section>
  <Toaster />
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { DrawingPinIcon } from '@radix-icons/vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import ListItem from '@/components/ListItem/ListItem.vue'
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast();
// 热榜列表
const hotlistKey = ref<any[]>([
  { key: 'wbHot', name: "微博", sub: "热搜榜", data: [] },
  { key: 'toutiao', name: "今日头条", sub: "热点", data: [] },
  { key: 'pengPai', name: "澎湃新闻", sub: "时事", data: [] },
  { key: 'huPu', name: "虎扑", sub: "步行街热帖", data: [] },
  { key: 'zhihuHot', name: "知乎热榜", sub: "热度", data: [] },
  { key: 'zhihuDay', name: "知乎日报", sub: "", data: [] },
  { key: '36Ke', name: "36氪", sub: "24小时热榜", data: [] },
  { key: 'bili', name: "哔哩哔哩", sub: "全站日榜", data: [] },
  { key: 'baiduRD', name: "百度热点", sub: "指数", data: [] },
  { key: 'douyinHot', name: "抖音", sub: "热点榜", data: [] },
  { key: 'douban', name: "豆瓣小组", sub: "讨论精选", data: [] },
  { key: 'itNews', name: "IT之家", sub: "最新资讯", data: [] },
  { key: 'huXiu', name: "虎嗅", sub: "最新资讯", data: [] },
  { key: 'woShiPm', name: "woShiPm", sub: "热榜", data: [] },
])

// 初始化数据请求
const vhInit = async () => {
  try {
    const res = await fetch("https://api.vvhan.com/api/hotlist/all")
    await new Promise((r) => setTimeout(r, 666))
    toast({ title: 'Init', description: '热榜获取成功', });
    const { data } = await res.json()
    hotlistKey.value.forEach((i: any) => {
      const currentItem = data.find((item: any) => item.name == i.name)
      currentItem && (i.data = currentItem.data)
    })
  } catch (error) {
    toast({ description: '今日热榜 获取失败', variant: 'destructive' });
  }
}


// 刷新数据
const updateStatus = ref<boolean>(false)
const refreshFn = async (item: any) => {
  if (updateStatus.value) return;
  updateStatus.value = true;
  item.data = [];
  const res = await fetch(`https://api.vvhan.com/api/hotlist/${item.key}`);
  const { data } = await res.json()
  await new Promise((r) => setTimeout(r, 666))
  item.data = data
  toast({ title: 'Update', description: `${item.name} 更新成功`, });
  updateStatus.value = false;
}
vhInit()

</script>


<style scoped>
@import '@/assets/index.less';
</style>
