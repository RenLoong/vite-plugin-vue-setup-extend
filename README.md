# vite-plugin-vue-setup-name-support

使用vue3语法糖（setup）支持name属性作为组件名称
pages目录导出组件时按照目录结构生成组件名称，如：pages/control/site/create.vue => /control/site/create
当组件名称结尾是index时，会自动去掉index，如：/control/site/index => /control/site

## 安装

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
npm i vite-plugin-vue-setup-extend-for-renloong -D
```

## 使用

- 在vite.config.ts文件中配置

```ts
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend-for-renloong'

export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
})
```

- SFC

```html
<template>
  <div>hello world {{ a }}</div>
</template>

<script lang="ts" setup name="App">
  const a = 1
</script>
```

## License

MIT