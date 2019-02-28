<template>
  <div class="node" :class="isActive ? 'active' : ''">
    <div class="node-info">
      <div class="name">{{data.name}}</div>
      <div class="text">{{data.text}}</div>
      <div class="addr">{{data.host}}</div>
    </div>
    <div class="node-stat">
      <div class="stat-spot" :class="isActive ? 'active' : ''" v-tooltip="{ content: Tooltips }">
        <div class="stat-base"></div>
        <div class="stat-icon"></div>
        <div class="stat-hlight-base"></div>
        <div class="stat-hlight">
          <svg width="22px" height="13px" viewBox="0 0 22 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs>
                  <linearGradient x1="49.9999882%" y1="-13.7086219%" x2="50%" y2="100%" id="linearGradient-1">
                      <stop stop-color="#A2EFFF" stop-opacity="0.234346694" offset="0%"></stop>
                      <stop stop-color="#A8E9FF" stop-opacity="0.0197860054" offset="100%"></stop>
                  </linearGradient>
                  <radialGradient cx="50%" cy="96.988131%" fx="50%" fy="96.988131%" r="102.880891%" gradientTransform="translate(0.500000,0.969881),scale(0.564583,1.000000),rotate(90.000000),translate(-0.500000,-0.969881)" id="radialGradient-2">
                      <stop stop-color="#B4F0FF" stop-opacity="0" offset="0%"></stop>
                      <stop stop-color="#B4F0FF" stop-opacity="0" offset="90.8620845%"></stop>
                      <stop stop-color="#75C9FF" stop-opacity="0.440274004" offset="100%"></stop>
                  </radialGradient>
                  <path d="M4617.01249,456.528949 C4617.0042,456.353675 4617,456.177328 4617,456 C4617,449.924868 4621.92487,445 4628,445 C4634.07513,445 4639,449.924868 4639,456 C4639,456.177328 4638.9958,456.353675 4638.98751,456.528949 C4635.6539,457.101009 4631.92952,457.420833 4628,457.420833 C4624.07048,457.420833 4620.3461,457.101009 4617.01249,456.528949 Z" id="path-3"></path>
              </defs>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Artboard" transform="translate(-4617.000000, -445.000000)">
                      <g id="light">
                          <use fill="url(#linearGradient-1)" xlink:href="#path-3"></use>
                          <use fill="url(#radialGradient-2)" xlink:href="#path-3"></use>
                      </g>
                  </g>
              </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      name: '',
      host: '',
      test: '',
      rpc_result: {},
    }
  },
  computed: {
    isActive() {
      if (this.data.rpc_result && this.data.rpc_result.code === 0) {
        return true
      }
      return false
    },
    Tooltips() {
      if (this.data.rpc_result && this.data.rpc_result.code === 0) {
        return 'Working'
      }
      return this.data.rpc_result.data
    }
  }
}
</script>


<style scoped>
.node {
  text-align: left;
  padding: 10px 20px;
  background: #fff;
  box-shadow: 0 1px 0 0 rgba(0,0,0,0.3), 0 0px 3px 0 rgba(0,0,0,0.06);
  display: flex;
}
.node.active {
  box-shadow: 0 1px 0 0 rgb(92, 198, 255), 0 0px 3px 0 rgba(92, 198, 255, 0.2);
}
.node-info {
  flex: 1;
  margin-right: 40px;
}
.node-stat {
  flex: 0;
  padding: 0 0px 0 20px;
  border-left: 1px solid rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.stat-spot {
  border-radius: 99em;
  /* box-shadow: inset 0 0 20px rgba(0,0,0,0.2); */
  height: 28px;
  width: 28px;
  display: block;
  /* border: 1px solid #979797; */
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.50);
  position: relative;
}

.stat-spot .stat-base {
  position: absolute;
  width: 26px;
  height: 26px;
  top: 1px;
  left: 1px;
  border-radius: 99em;
  z-index: 2;
  background-image: linear-gradient(-180deg, #003963 0%, #002840 100%);
}
.stat-spot .stat-hlight-base {
  position: absolute;
  width: 22px;
  height: 22px;
  top: 3px;
  left: 3px;
  border-radius: 99em;
  z-index: 3;
  background-image: linear-gradient(-180deg, rgba(0,18,29,0.30) 0%, rgba(0,4,7,0.60) 100%);
}
.stat-spot .stat-hlight {
  position: absolute;
  width: 22px;
  height: 22px;
  top: 0px;
  left: 3px;
  z-index: 4;
}
.stat-spot.active {
  box-shadow: 0 1px 10px 0 rgb(92, 198, 255);
}
.stat-spot.active .stat-base {
  background-image: linear-gradient(-180deg, #0080C4 0%, #00EBF8 100%);
}
.stat-spot.active .stat-hlight-base {
  background-image: linear-gradient(-180deg, #0080C4 0%, #00EBF8 100%);
}
.stat-spot.active .stat-hlight-base::before {
  width: 6px;
  height: 6px;
  border-radius: 99em;
  display: block;
  left: 3px;
  bottom: 1px;
  position: absolute;
  background-image: radial-gradient(50% 100%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3)  100%);
  content: ' ';
  z-index: 5;
  /* box-shadow: 0 0 6px #fff; */
}
.name {
  color: rgb(63, 153, 247);
  font-weight: bold;
}
.addr, .text {
  font-size: 14px;
  opacity: 0.6;
}
</style>
