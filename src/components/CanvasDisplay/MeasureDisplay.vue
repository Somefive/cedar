<template>
  <div class="measure-display"
       :style="{background: background, width: width+'px', left: measure.begin+'px'}">
  </div>
</template>

<script>
  export default {
    name: 'measure-display',
    props: {
    	measure: {
    		type: Object,
        require: true
      },
      background: {
    		type: String,
        default: 'rgba(127,255,127,0.3)'
      }
    },
    computed: {
    	width: function() { return this.measure.end - this.measure.begin; }
    },
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .measure-display {
    position: absolute;
    height: 100%;
    top: 0;
  }
</style>
