<template>
  <section class="container">
    <div class="top">
      <h1 class="title">Mixin Network Monitor</h1>
    </div>
    <div class="nodelist-title">~ Online Nodes ~</div>
    <div class="nodelist">
      <template v-if="onlineMixinNodes.length !== 0">
        <div class="node-wrapper" v-for="node in onlineMixinNodes">
          <node :data="node"></node>
        </div>
      </template>
      <template v-else>
        <div class="hint" >
          None.
        </div>
      </template>
    </div>
    <div class="nodelist-title">~ Can't be reached ~</div>
    <div class="nodelist">
      <template v-if="offlineMixinNodes.length !== 0">
        <div class="node-wrapper" v-for="node in offlineMixinNodes">
          <node :data="node"></node>
        </div>
      </template>
      <template v-else>
        <div class="hint" >
          None.
        </div>
      </template>
    </div>
    <div class="footer">
      <div class="datetime">Last updated: {{updatedAt}}</div>
      <div class="meta">
        <a v-tooltip="'wei@fox.one'" href="#">Contacts</a> · <a class="source" style="opacity: 1" href="https://github.com/fox-one/foxone-network-monitor">Github</a></div>
    </div>
  </section>
</template>

<script>

import Node from '~/components/node'

export default {
  components: {
    Node
  },
  async mounted () {
    const result = await this.$axios.$get('//node.f1ex.io/nodes-status.json?id=' + (Date.now() + Math.random()), {
      withCredentials: true
    })
    // const result = require('~/static/mocking.json')
    this.nodes = result.nodes
    console.log(result)
    this.updatedAt = new Date(result.updatedAt).toLocaleString()
  },
  data () {
    return {
      nodes: [],
      updatedAt: new Date(),
    }
  },
  computed: {
    onlineMixinNodes () {
      var nodes = this.nodes.filter((x) => x.rpc_result.code === 0)
      nodes.sort((a, b) => {
        return (a.name > b.name ? 1 : -1)
      })
      return nodes
    },
    offlineMixinNodes () {
      var nodes = this.nodes.filter((x) => x.rpc_result.code !== 0)
      nodes.sort((a, b) => {
        return (a.name > b.name ? 1 : -1)
      })
      return nodes
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  background: rgba(242, 243, 244, 1);
  display: flex;
  /* justify-content: center; */
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 32px;
  color: #35495e;
  letter-spacing: 1px;
}

.top {
  margin: 40px 0;
}

.nodelist-title {
  margin: 40px 0 20px 0;
  opacity: 0.6;
}
.nodelist {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 10px;
  max-width: 800px;
  /* text-align: left; */
  justify-content: center;
}

.node-wrapper {
  float: left;
  margin: 4px;
  /* width: 400px; */
  width: 100%;
}
.hint {
  padding: 0 0 40px 0;
  opacity: 0.6;
  font-size: 14px;
}

.footer {
  margin: 40px 0 40px 0;
  font-size: 12px;
}
.footer > .datetime {
  opacity: 0.6;
}
.footer > .meta {
  color: #999;
}
</style>
