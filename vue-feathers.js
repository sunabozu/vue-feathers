(function() {
  'use strict'

  var feathers = require('feathers/client')
  var socketio = require('feathers-socketio/client')
  var io = require('socket.io-client')

  var socket = io()
  var server = feathers().configure(socketio(socket))

  var plugin = {
    install: function(Vue, opts) {
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

      if(opts && opts.auth) {
        var authentication = require('feathers-authentication/client')
        var hooks = require('feathers-hooks')

        server.configure(hooks())
        server.configure(authentication(opts.auth))
      }
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