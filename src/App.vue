<template>
  <div class="ⱦmain">
    <MainHead />
    <div class="ⱦtitle">
      <h2>今日热榜</h2>
    </div>
    <MainList />
    <MainFooter />
  </div>
</template>

<script>
import MainHead from "@/components/MainHead";
import MainList from "@/components/MainList";
import MainFooter from "@/components/MainFooter";

export default {
  name: "App",
  components: { MainHead, MainList, MainFooter },
};
</script>