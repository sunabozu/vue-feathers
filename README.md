# vue-feathers

> [Feathers](http://feathersjs.com/) is a minimalist real-time web framework written in JavaScript. 
> Vue-Feathers is a plugin for Vue.js that integrates it with Feathers.

**NOTE:** It's supposed to be compatible both with Vue 1.x and 2.x. It requires IE9+ or Safari 5+

### Install

``` bash
npm install vue-feathers --save
```

### Usage

``` js
// Include and set up feathers client
const Feathers = require('feathers/client')
const hooks = require('feathers-hooks')
const authentication = require('feathers-authentication/client')
const socketio = require('feathers-socketio/client')
const io = require('socket.io-client')

const socket = io('http://localhost:3030/')
const feathers = Feathers()
.configure(socketio(socket))
.configure(hooks())
.configure(authentication({storage: window.localStorage}))

// Include it as a CommonJS module
const Vue = require('vue')
const vueFeathers = require('vue-feathers')

// And plug it in
Vue.use(vueFeathers)
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
