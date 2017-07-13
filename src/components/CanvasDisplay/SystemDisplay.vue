<template>
  <div class="system-display"
       :style="{background: background, height: height+'px', top: (system.begin+1)+'px'}">
    <measure-display v-for="(measure, index) in measures" :measure="measure" :key="index">
    </measure-display>
  </div>
</template>

<script>
  import MeasureDisplay from "./MeasureDisplay";
  export default {
    components: {MeasureDisplay},
    name: 'system-display',
    props: {
    	system: {
    		type: Object,
        required: true
      },
      background: {
    		type: String,
        default: 'rgba(127,127,127,0.15)'
      }
    },
    computed: {
    	height: function() { return this.system.end - this.system.begin - 2; },
    	measures: function() {
    		let arr = [], length = this.system.barlines?this.system.barlines.length:0;
        for(let i=0;i<length-1;++i) {
        	arr.push({begin: this.system.barlines[i]+1, end: this.system.barlines[i+1]-1})
        }
        return arr;
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .system-display {
    position: absolute;
    width: 100%;
    left: 0;
  }
</style>
