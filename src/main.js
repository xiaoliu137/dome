const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const keyword = ref('');
    const activeChannel = ref('推荐');

    const channels = ['推荐', '热点', '科技', '财经', '体育', '娱乐', '汽车', '游戏', '国际', '军事'];
    const topLinks = ['热榜', '视频', '关注', '我的'];
    const miniNews = [
      'AI 助手进入办公场景，企业协同效率提升 32%',
      '新能源车渗透率再创新高，产业链景气度保持强势',
      '春季招聘开启，数字化岗位需求持续增长',
    ];
    const newsList = [
      {
        title: '多地文旅联动推出夜游路线，城市活力指数明显抬升',
        source: '政务观察',
        reads: '2.1万阅读',
        time: '8分钟前',
        theme: 'linear-gradient(145deg, #dbeafe, #ece7ff)',
      },
      {
        title: '半导体设备板块回暖，产业投资进入新一轮扩张期',
        source: '科技前沿',
        reads: '1.7万阅读',
        time: '16分钟前',
        theme: 'linear-gradient(145deg, #cffafe, #e0e7ff)',
      },
      {
        title: '欧洲杯预选赛焦点战：高压逼抢体系成胜负关键变量',
        source: '体坛速报',
        reads: '9800阅读',
        time: '29分钟前',
        theme: 'linear-gradient(145deg, #dcfce7, #dbeafe)',
      },
    ];
    const ranks = [
      '国产大模型再次刷新推理速度纪录',
      '多家平台上线以旧换新补贴专区',
      '春运后旅游市场迎来错峰高性价比窗口',
      '城市马拉松赛事报名人数同比增长 41%',
      '跨境电商物流时效优化，海外仓加速布局',
    ];
    const topics = ['人工智能', '低空经济', '黄金走势', '华语电影', '职场趋势', '新能源车'];

    const filteredNews = computed(() => {
      const word = keyword.value.trim();
      if (!word) {
        return newsList;
      }

      return newsList.filter((item) => item.title.includes(word) || item.source.includes(word));
    });

    const selectChannel = (channel) => {
      activeChannel.value = channel;
    };

    const search = () => {
      keyword.value = keyword.value.trim();
    };

    return {
      keyword,
      activeChannel,
      channels,
      topLinks,
      miniNews,
      filteredNews,
      ranks,
      topics,
      selectChannel,
      search,
    };
  },
  template: `
    <header class="topbar">
      <div class="topbar-inner">
        <div class="logo">今日资讯</div>
        <form class="search" @submit.prevent="search">
          <input v-model="keyword" type="text" placeholder="搜索你感兴趣的新闻" />
          <button type="submit">搜索</button>
        </form>
        <nav class="top-actions">
          <a v-for="link in topLinks" :key="link" href="#">{{ link }}</a>
        </nav>
      </div>
    </header>

    <main class="layout">
      <aside class="channels card">
        <a
          v-for="channel in channels"
          :key="channel"
          class="channel-item"
          :class="{ active: channel === activeChannel }"
          href="#"
          @click.prevent="selectChannel(channel)"
        >
          {{ channel }}
        </a>
      </aside>

      <section class="feed">
        <article class="hero card">
          <div class="hero-main">
            <p>实时快讯 · {{ activeChannel }}</p>
            <h2>城市夜经济复苏，周末消费热度持续攀升</h2>
            <p>多地发布促消费政策，餐饮、文旅、演出等场景热度明显提升。</p>
          </div>
          <div class="hero-side">
            <div v-for="item in miniNews" :key="item" class="mini-news">{{ item }}</div>
          </div>
        </article>

        <article class="card">
          <a v-for="item in filteredNews" :key="item.title" class="news-item" href="#">
            <div>
              <h3 class="news-title">{{ item.title }}</h3>
              <div class="news-meta">
                <span>{{ item.source }}</span>
                <span>{{ item.reads }}</span>
                <span>{{ item.time }}</span>
              </div>
            </div>
            <div class="thumb" :style="{ background: item.theme }"></div>
          </a>
          <div v-if="filteredNews.length === 0" class="empty-state">没有找到相关新闻</div>
        </article>
      </section>

      <aside class="right">
        <section class="panel card">
          <h3>热榜</h3>
          <ul class="rank">
            <li v-for="(item, index) in ranks" :key="item">
              <span class="rank-index">{{ index + 1 }}</span>
              <a href="#">{{ item }}</a>
            </li>
          </ul>
        </section>

        <section class="panel card">
          <h3>猜你想看</h3>
          <div class="topic-tags">
            <span v-for="topic in topics" :key="topic">{{ topic }}</span>
          </div>
        </section>
      </aside>
    </main>
  `,
}).mount('#app');
