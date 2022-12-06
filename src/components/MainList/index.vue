<template>
  <el-skeleton :rows="12" animated v-if="Object.keys(ListData).length < 1" style="margin-top: 36px" />
  <div class="ⱦnews-list" v-else>
    <div class="ⱦlist-item" v-for="(item, index) in Object.keys(ListData)" :key="index">
      <transition name="el-fade-in-linear">
        <div class="refd" v-show="ListData[item]['ref']">
          <div class="refround"></div>
        </div>
      </transition>
      <div class="div_s">
        <div class="div_s-title">
          <div class="l">
            <img :src="require(`@/assets/images/item-icon/${item}.png`)" />
            <h3>{{ ListData[item]["title"] }}</h3>
          </div>
          <div class="r">
            <span>{{ ListData[item]["subtitle"] }}</span>
          </div>
        </div>
        <ul class="div_s-con">
          <li v-for="itm in ListData[item]['data']" :key="itm.index">
            <span>{{ itm.index }}</span>
            <div class="item-link" @click="goPage(itm[clientKey])">
              <span>{{ itm.title }}</span>
              <span>{{ itm.hot }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="ref"><img src="@/assets/images/ref.jpg" @click="getDatas(item)" /></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      ListData: {},
      clientKey: "url",
    };
  },
  created() {
    this.clientKey = /Android|iPhone|SymbianOS|Windows Phone|iPad|webOS|BlackBerry|iPod/i.test(navigator.userAgent) ? "mobilUrl" : "url";
    this.getDatas("allJson");
  },
  methods: {
    async getDatas(type) {
      const { ListData } = this;
      ListData[type] && (this.ListData[type]["ref"] = true);
      const {
        data: { success, data },
      } = await axios.get("https://api.vvhan.com/api/hotlist", {
        params: { type },
      });
      if (!success) return this.$notify.error({ title: "Error", offset: 100, message: "数据请求失败" });
      for (const k in data) {
        data[k]["ref"] = false;
      }
      if (type == "allJson") {
        this.ListData = data;
      } else {
        this.ListData[type]["data"] = data;
        this.ListData[type]["ref"] = false;
      }
      this.$notify.success({ title: "Success", offset: 100, message: type == "allJson" ? "初始化完成" : "数据更新成功" });
    },
    goPage(e) {
      window.open(e, "_blank");
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>