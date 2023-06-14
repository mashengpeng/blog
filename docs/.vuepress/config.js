const getConfig = require("vuepress-bar");

const { sidebar } = getConfig({
  addReadMeToFirstGroup: false,
  maxLevel: Number.MAX_VALUE,
});
module.exports = {
  markdown: {
    lineNumbers: true,
  },
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
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: "mashengpeng/blog",
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "查看源码",

    // 以下为可选的编辑链接选项
    // 假如你的文档仓库和项目本身不在一个仓库：
    // 假如文档不是放在仓库的根目录下：
    docsDir: "docs",
    // 假如文档放在一个特定的分支下：
    docsBranch: "main",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: "Edit",
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
    // [
    //   "vuepress-plugin-nuggets-style-copy",
    //   {
    //     copyText: "复制代码",
    //     tip: {
    //       content: "复制成功!",
    //     },
    //   },
    // ],

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
        showText: "欢迎回来",
        // hideIcon:
        //   "https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae",
        hideText: "加油",
        recoverTime: 2000,
      },
    ],
  ],
};
