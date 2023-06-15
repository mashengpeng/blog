# 在vue中使用tailwind

在vue的根目录下，安装 Tailwind 及其依赖项（PostCSS &
auto-prefixer）。有可能安装的时候回提示错误导致安装不成功，一般都是缺少其他依赖或版本问题，根据提示说明解决就好，正常都是一次性通过。

```bash
npm install -D tailwindcss postcss autoprefixer
```

生成tailwind css配置文件

```bash
npx tailwindcss init -p
```

在配置文件content中添加所有模板文件的路径\
tailwind.config.js

```javascript
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
```

创建一个tailwindcss.css样式文件，用于初始化并引入tailwindcss的基础样式\
/src/css/tailwindcss.css

```css

@tailwind base;
@tailwind components;
@tailwind utilities;
```

导入css/tailwindcss.css到main.js，这样就让你的项目拥有了Tailwind CSS

```js
import {createApp} from 'vue'
import App from './App.vue'
import "./css/tailwindcss.css"

createApp(App).mount('#app')

```