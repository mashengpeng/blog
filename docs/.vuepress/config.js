module.exports = {
  title: "MSP 知识库",
  description: "MSP 知识库",
  theme: "reco",
  base: "/blog/",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  themeConfig: {
    lastUpdated: "上次更新", // string | boolean
    subSidebar: "auto",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "MSP",
        items: [{ text: "Github", link: "https://github.com/mashengpeng" }],
      },
    ],
    sidebar: [
      {
        title: "欢迎学习",
        path: "/",
        collapsable: false, // 不折叠
        children: [{ title: "学前必读", path: "/" }],
      },
      {
        title: "欢迎学习",
        path: "/handbook/third",
      },
      {
        title: "基础学习",
        path: "/handbook/first",
        collapsable: true, // 不折叠
        children: [
          { title: "first", path: "/handbook/first" },
          { title: "second", path: "/handbook/second" },
        ],
      },
    ],
  },
  plugins: [
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment
          const moment = require("moment");
          moment.locale(lang);
          return moment(timestamp).fromNow();
        },
      },
    ],
  ],
};
