const getConfig = require("vuepress-bar");

const { sidebar } = getConfig({
  addReadMeToFirstGroup: false,
  maxLevel: Number.MAX_VALUE,
});
module.exports = {
  head: [
    [
      "link", // 设置 favicon.ico，注意图片放在 public 文件夹下
      { rel: "icon", href: "icon.png" },
    ],
  ],
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
    sidebar,
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
    [
      "vuepress-plugin-code-copy",
      {
        selector: 'div[class*="language-"] pre',
        align: "bottom",
        color: "#59b870",
        backgroundTransition: false,
        backgroundColor: "#0075b8",
        successText: "Copied!",
      },
    ],
    [
      "cursor-effects",
      {
        size: 2, // size of the particle, default: 2
        shape: "star", // ['star' | 'circle'], // shape of the particle, default: 'star'
        zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ],
    [
      "dynamic-title",
      {
        // showIcon: "../public/icon.png",
        showText: "客官欢迎回来~",
        // hideIcon:
        //   "https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae",
        hideText: "客官不要走嘛~",
        recoverTime: 2000,
      },
    ],
  ],
};
