import type { VueConstructor } from 'vue'
import SomeComponent from './SomeComponent.vue'
import { setupDevtools } from './devtools'
import { MyPluginData } from './data'

// Our plugin

declare module 'vue/types/options' {
  // @ts-ignore
  interface ComponentOptions<V extends Vue> {
    myPlugin?: boolean
  }
}


export default {
  install (Vue: VueConstructor, options = {}) {
    const data = Vue.observable<MyPluginData>({
      message: 'hello',
      counter: 0
    })

    let devtools: ReturnType<typeof setupDevtools>

    Vue.mixin({
      computed: {
        $hello () {
          return data.message
        }
      },

      methods: {
        $doSomething () {
          const trackEnd = devtools ? devtools.trackStart('$doSomething') : null
          return new Promise(resolve => {
            setTimeout(() => {
              console.log('done')
              if (trackEnd) trackEnd()
              resolve('done')
            }, 1000)
          })
        }
      }
    })

    Vue.component('SomeComponent', SomeComponent)

    setInterval(() => {
      data.counter += 5
    }, 5000)

    if (process.env.NODE_ENV === 'development' || __VUE_PROD_DEVTOOLS__) {
      Vue.mixin({
        beforeCreate () {
          if (this.$options.myPlugin) {
            devtools = setupDevtools(this, data)
          }
        },
      })
    }
  }
}
