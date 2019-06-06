<template>
  <div class="container" style="height: 100%">
    <div class="header" style="width: 100%">
      <van-tabs v-model="active" color="rgb(92, 198, 255)" swipeable sticky @change="change">
        <van-tab title="Monitor"></van-tab>
        <van-tab title="Calculator"></van-tab>
        <van-tab title="About"></van-tab>
      </van-tabs>
    </div>
    <div style="padding: 0px">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    change(ix, title) {
      if (ix === 0) {
        this.$router.push('/')
      } else if (ix === 1) {
        this.$router.push('/tools/calculators')
      } else {
        this.$router.push('/about')
      }
    }
  }
}
</script>


<style >
html {
  font-family: Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: rgba(242, 243, 244, 1);
}
html, body, #__nuxt, #__layout {
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

a {
  color: rgb(92, 198, 255);
  text-decoration: none;
}


.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.tooltip {
  display: block !important;
  z-index: 10000;
  font-size: 13px;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}

.top {
  margin: 20px 0;
  text-align: center;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  align-items: center;
}

.van-cell.van-field {
  padding: 0;
}

.panel {
  width: 100%;
}

.page-title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 24px;
  letter-spacing: 1px;
}

.section-title {
  margin: 30px 0 16px 14px;
  opacity: 0.6;
  text-align: left;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
}

.nodelist-legends {
  margin: 0px 0 16px 14px;
  text-align: left;
  border-bottom: 1px solid rgba(0,0,0, 0.06);
  padding-bottom: 10px;
  font-size: 14px;
}
.nodelist-legends  .legend-label {
  opacity: 0.6;
  display: flex;
}

.pane-like {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 3px;
  box-shadow: 0 0 40px rgba(0,0,0, 0.06);
  margin-bottom: 40px;
}
</style>
