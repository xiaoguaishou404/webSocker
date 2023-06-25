<template>
  <img alt="Vue logo" src="./assets/logo.png">

  <button @click="sendMsg">
    send</button>
  <button @click="reconnectTest">
    reconnectTest</button>
</template>

<script setup>
import Ws from './Ws'
let ws = null


function wsConnect() {
  // 为了手机调试，所以动态了ip，方便手机通过wifi访问电脑
  ws = Ws.create(`ws://${window.location.hostname}:8000`, wsReConnect)
}
function wsReConnect() {
  if (ws.reconnectingTimer) {
    // 可能存在出多个重连计时器，所以先清除
    clearTimeout(ws.reconnectingTimer)
    ws.reconnectingTimer = null
    wsConnect()
  }
}

const sendMsg = () => {
  ws.sendMsg({
    mode: 'MESSAGE',
    msg: 'hello'
  })
}
function reconnectTest() {
  ws.close()
}
wsConnect()
</script>

<!-- 
<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->
