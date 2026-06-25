<script setup>
import { RouterLink } from 'vue-router';

const hotList = [
  '国产大模型再次刷新推理速度纪录',
  '多家平台上线以旧换新补贴专区',
  '春运后旅游市场迎来错峰高性价比窗口',
  '城市马拉松赛事报名人数同比增长 41%',
  '跨境电商物流时效优化，海外仓加速布局',
];
</script>

<template>
  <main class="simple-page">
    <section class="simple-panel card">
      <RouterLink class="back-link" to="/">返回首页</RouterLink>
      <h1>热榜</h1>
      <ul class="rank hot-rank">
        <li v-for="(item, index) in hotList" :key="item">
          <span class="rank-index">{{ index + 1 }}</span>
          <a href="#">{{ item }}</a>
        </li>
      </ul>
    </section>
  </main>
</template>
