# Example Vue 2 plugin with devtools integration

Usage in app:

```js
import Vue from 'vue'
import App from './App.vue'
import MyAwesomePlugin from 'my-awesome-plugin'

Vue.use(MyAwesomePlugin)

new Vue({
  render: h => h(App),
  myPlugin: true,
}).$mount('#app')
```
