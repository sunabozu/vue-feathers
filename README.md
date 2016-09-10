# vue-feathers

> Integration with the Feathers framework for Vue.js

**NOTE:** It's supposed to be compatible both with Vue 1.x and 2.x. It requires IE9+ or Safari 5+

### Install

``` bash
npm install vue-feathers --save
```

### Usage

``` js
// Include it as a CommonJS module
var Vue = require('vue')
var vueFeathers = require('vue-feathers')

// And plug it in
Vue.use(vueFeathers)
```

If you're using hooks on the client, you should include different version of this plugin:

``` js
import vueFeathers from 'vue-feathers/vue-feathers-hooks'
```

If you want to use the standard `feather-authentication` plugin, you can just pass the [authentication parameters](http://docs.feathersjs.com/authentication/readme.html#client-side) during the initialisation:

``` js
Vue.use(vueFeathers, {
  auth: {storage: window.localStorage}
})
```

You can set your own remote host for SocketIO (by default your current host is used):

``` js
Vue.use(vueFeathers, {
  host: 'http://api.example.com'
})
```

Now in every component you get a new property called `$services`, which allows you to interact with all of your Feathers services:

``` js
this.$services.messages.find()

// or

this.$services.messages.create(...)
```

To subscribe on the [events](http://docs.feathersjs.com/real-time/events.html) your services generate, you just need to use a separate `feathers` section in your component:

``` js
export default {
  data() {
    return {
      ...
    }
  },

  methods: {
    ...
  }

  feathers: { // here is our section
    messages: { // here is the subsection for the 'messages' service
      created(data) {
        ...
      },

      updated(data) {
        ...
      }
    }
  }
}
```

Vue-feathers does all the clean up before your component is destroyed (using the `removeListener` function).

In case you need to do something more complex, there is a `$feathers` property for that:

``` js
this.$feathers.service('messages').on(...)
```

### License

[MIT](http://opensource.org/licenses/MIT)
