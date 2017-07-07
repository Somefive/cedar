<template>
  <div class="navigator" @drag="drag">
    <navigator-btn v-for="(button, index) in buttons"
                   :name="button.name"
                   :scale="button.scale"
                   :key="index"
                   :style="{
                   	background: button.background,
                   	bottom: fold?0:(index*60)+'px',
                   	'z-index':(600-index),
                   	opacity: (fold && index!=0)?0:1
                   }"
                   @click="button.click">
    </navigator-btn>
  </div>
</template>

<script>
  import NavigatorBtn from "./NavigatorButton";
  export default {
    components: {NavigatorBtn},
    name: 'navigator',
    props: {
    	buttons: {
    		type: Array,
        default: function() {
        	return [
            { name: 'plus', click: () => {this.fold=!this.fold;} },
            { name: 'book', background: '#27AE60', click: () => {this.$emit('route-to', 'hello')} },
            { name: 'plus-circle', background: '#5DADE2', click: () => {this.$emit('route-to', 'hello')} }
          ];
        }
      }
    },
    data () {
      return {
        fold: true
      }
    },
    methods: {
    	drag: function(event) {
    		console.log(event);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navigator {
    position: fixed;
    right: 50px;
    bottom: 50px;
  }
</style>
