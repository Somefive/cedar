<template>
  <div class="navigator-btn" @click="click">
    <icon :name="name" class="align-center" :scale="scale"></icon>
  </div>
</template>

<script>
  export default {
    name: 'navigator-btn',
    props: {
    	name: {
    		type: String,
    		default: 'plus'
      },
      scale: {
    		type: Number,
        default: 2
      }
    },
    data () {
      return {
        fold: true
      }
    },
    methods: {
    	click: function() { this.$emit('click'); }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navigator-btn {
    --diameter: 50px;
    height: var(--diameter);
    width: var(--diameter);
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 0;
    color: white;
    background: #E74C3C;
    transition: all 0.5s;
  }
  .navigator-btn:hover {
    filter: brightness(150%) drop-shadow(3px 3px 5px lightgrey);
    cursor: pointer;
  }
</style>
