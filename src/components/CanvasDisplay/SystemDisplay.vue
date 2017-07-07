<template>
  <div class="system-display"
       :style="{background: background, height: height+'px', top: system.begin+'px'}">
  </div>
</template>

<script>
  export default {
    components: {},
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
    	height: function() { return this.system.end - this.system.begin; }
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
