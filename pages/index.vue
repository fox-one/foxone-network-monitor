<template>
  <section class="content">
    <div class="top">
      <h1 class="title page-title">Mixin Network Monitor</h1>
    </div>
    <div class="nodelist-title section-title">Planning Nodes: 4</div>
    <div class="nodelist">
      <template v-for="mgr in managers">
        <div class="node-wrapper">
          <div class="empty-node">
            <a @click="viewMgr(mgr, $event)" class="node-mgr" :class="mgr.class" >
              <span class="circle">
                <span class="outer-circle"></span>
                <span class="inner-circle"></span>
              </span>
              <img class="node-mgr-icon" :src="mgr.icon" />
              <span class="node-mgr-name">{{mgr.name}}</span>
            </a>
          </div>
        </div>
      </template>
    </div>
    <div class="nodelist-title section-title">{{'Online Nodes: ' + onlineMixinNodes.length}}</div>
    <!-- <div class="nodelist-legends">
      <div class="legend legend-topology">
        <div class="legend-label">topology</div>
        <div></div>
      </div>
    </div> -->
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
    <div class="nodelist-title section-title">{{"Can't be reached: " + offlineMixinNodes.length}}</div>
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
import { Tabbar, TabbarItem } from 'vant'
import Node from '~/components/node'

export default {
  components: {
    Node,
  },
  async mounted () {
    const result = await this.$axios.$get('https://node.f1ex.io/mixin-nodes-stat.json?id=' + (Date.now() + Math.random()))
    // const result = require('../static/mocking.json')
    let nodes = []
    let max = 0
    let min = Number.MAX_SAFE_INTEGER

    for (let ix = 0; ix < result.nodes.length; ix++) {
      const node = result.nodes[ix]
      let statData = node.stat.data
      if (statData) {
        if (statData.graph.topology < min) {
          min = statData.graph.topology
        }
        if (statData.graph.topology > max) {
          max = statData.graph.topology
        }
      }
    }

    for (let ix = 0; ix < result.nodes.length; ix++) {
      let node = result.nodes[ix]
      node.level = parseInt((node.stat.data.graph.topology - min) / (max - min) * 6)
      nodes.push(node)
    }
    this.nodes = nodes
    this.updatedAt = new Date(result.updatedAt).toLocaleString()
  },
  data () {
    return {
      nodes: [],
      managers: [{
        name: 'F1EX',
        icon: require('~/assets/images/f1ex.png'),
        link: 'https://www.jianshu.com/p/ae8f7f6696d1',
        class: 'flicker'
      }, {
        name: 'B1',
        icon: require('~/assets/images/b1.png'),
        link: 'https://b1.run/mixin',
      }, {
        name: 'ExinPool',
        icon: require('~/assets/images/exinpool.png'),
        mixinId: '7000101761',
      }, {
        name: 'SS',
        icon: require('~/assets/images/ss.png'),
        mixinId: '7000101762',
      }],
      updatedAt: new Date(),
    }
  },
  computed: {
    onlineMixinNodes () {
      var nodes = this.nodes.filter((x) => x.stat.code === 0 && x.stat.data.version)
      nodes.sort((a, b) => {
        return (a.name > b.name ? 1 : -1)
      })
      return nodes
    },
    offlineMixinNodes () {
      var nodes = this.nodes.filter((x) => x.stat.code !== 0 || !x.stat.data.hasOwnProperty('version'))
      return nodes
    },
  },
  methods: {
    viewMgr (mgr, evt) {
      evt.preventDefault()
      if (mgr.link) {
        window.location.href = mgr.link
      } else {
        alert('Search "' + mgr.mixinId + '" in Mixin Messenger.')
      }
    }
  }
}
</script>

<style>

.nodelist {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 10px;
  max-width: 800px;
}
.node-wrapper {
  float: left;
  margin: 2px;
}

.empty-node {
  display: flex;
  cursor: pointer;
}
.empty-node .node-mgr {
  background: white;
  flex: 1;
  box-shadow: 0 1px 0 0 rgb(92, 198, 255), 0 0px 3px 0 rgba(92, 198, 255, 0.2);
  position: relative;
  width: 84px;
}
.empty-node .node-mgr:last-child {
  margin-right: 0px;
}
.empty-node .node-mgr-icon {
  height: 64px;
  width: 64px;
  display: block;
  padding: 10px;
  margin: 0 auto;
  border-radius: 99em;
  position: relative;
  z-index: 9;
}
.empty-node .node-mgr-name {
  width: 100%;
  display: block;
  padding: 8px 0;
  font-size: 14px;
  color: rgba(0,0,0,0.6);
  background: rgba(196, 148, 148, 0.08);
  text-align: center;
}
.empty-node .node-mgr.flicker .circle {
  /* animation: rotatecircle 4s linear; */
  position: absolute;
  top: 7px;
  left: 50%;
  margin-left: -25px;
  background: #fff;
  border-radius: 99em;
  height: 48px;
  width: 48px;
}
.empty-node .node-mgr.flicker .outer-circle {
  background-color: transparent;
  border: 4px solid rgba(0, 187, 255, 0.2);
  opacity: .9;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  border-radius: 99em;
  width: 56px;
  height: 56px;
  position: absolute;
  margin-top: -3px;
  margin-left: -3px;
  display: block;
  /* animation: spinPulse 3s infinite ease-in-out; */
}
.empty-node .node-mgr.flicker .inner-circle {
  background-color: transparent;
  border: 1px solid rgba(0, 187, 255, 0.6);
  opacity: .9;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-radius: 99em;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0px;
  left: 0px;
  /* animation: spinoffPulse 1s infinite linear; */
}
.hint {
  padding: 0 0 40px 4px;
  opacity: 0.4;
  font-size: 14px;
  text-align: center;
  display: block;
}

.footer {
  margin: 40px 0 40px 0;
  font-size: 12px;
  text-align: center;
}
.footer > .datetime {
  opacity: 0.6;
}
.footer > .meta {
  color: #999;
}

@keyframes spinPulse {
  0% { transform:rotate(160deg); opacity:0; box-shadow:0 0 1px rgb(0, 187, 255); }
	50% { transform:rotate(145deg); opacity:1;}
	100% { transform:rotate(-320deg); opacity:0; }
}
@keyframes spinoffPulse {
  0% { transform:rotate(0deg); }
	100% { transform:rotate(360deg); }
}
@keyframes rotatecircle {
  0% { transform:rotate(0deg); }
  100% { transform:rotate(-360deg); }
}
</style>
