(function() {
  'use strict'

  var plugin = {
    install: function(Vue, server) {

      // Every component will have this
      Vue.mixin({
        created: function() {
          this.$feathers = server

          // Setting up the services
          this.$services = server.services

          if(!this.$options.feathers)
            return

          // Setting up the events
          var keys = Object.keys(this.$options.feathers) // services, IE9+
          for(var i = 0; i < keys.length; i++) {
            var service = this.$options.feathers[keys[i]]
            var ekeys = Object.keys(service) // handlers

            for(var k = 0; k < ekeys.length; k++) {
              server.service(keys[i]).on(ekeys[k], service[ekeys[k]].bind(this))
            }
          }
        },

        beforeDestroy: function() {
          // Removing the events
          if(!this.$options || !this.$options.feathers)
            return

          var keys = Object.keys(this.$options.feathers) // services, IE9+
          for(var i = 0; i < keys.length; i++) {
            var service = this.$options.feathers[keys[i]]
            var ekeys = Object.keys(service) // handlers

            for(var k = 0; k < ekeys.length; k++) {
              server.service(keys[i]).removeListener(ekeys[k], service[ekeys[k]].bind(this))
            }
          }
        }
      })
    }
  }

  if(typeof exports === 'object' && typeof module === 'object') {
    module.exports = plugin
  } else if(typeof define === 'function' && define.amd) {
    define(function () { return plugin })
  } else if (typeof window !== 'undefined') {
    window.VueAsyncData = plugin
  }
})()