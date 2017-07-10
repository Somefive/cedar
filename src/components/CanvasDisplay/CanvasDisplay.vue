<template>
  <div @wheel="wheel" class="canvas-display-container" ref="display">
    <vue-slider v-if="imageDisplayed"
                v-model="scale"
                :direction="'vertical'"
                :min="0.1" :max="5.0" :interval="0.1"
                :height="'75%'" :width="15"
                class="scale-slider"></vue-slider>
    <div class="canvas-display" v-show="imageDisplayed"
         @mousedown="startMove" @mouseup="endMove"
         @mousemove="move" @mouseleave="endMove"
         @touchstart="startMove" @touchmove="move" @touchend="endMove"
         :style="{transform: transform, 'transform-origin': transformOrigin}">
      <canvas ref="canvas"></canvas>
      <div class="systems-display" ref="systems" :style="{height: canvasHeight+'px', width: canvasWidth+'px'}">
        <system-display v-for="(system, index) in systems" :system="system" :key="index"></system-display>
      </div>
    </div>
  </div>
</template>

<script>
  import SystemDisplay from "./SystemDisplay";
  import vueSlider from 'vue-slider-component'
  export default {
    components: {SystemDisplay, vueSlider},
    name: 'canvas-display',
    props: {
      image: {
      	required: true
      },
      systems: {
      	type: Array,
        default: function() {
        	return [
            {
              begin: 0,
              end: 200,
              measures: [{begin: 0, end: 50}, {begin: 60, end:280}]
            },
            {
              begin: 250,
              end: 500,
              measures: [{begin: 60, end: 250}, {begin: 260, end:480}]
            }
          ]
        }
      }
    },
    computed: {
    	transform: function() {
    		return 'translate('+this.offsetX+'px,'+this.offsetY+'px) scale('+this.scale+') ';
      },
      transformOrigin: function() {
    		return (this.transformOriginX) + "px " + (this.transformOriginY) + "px";
      },
      imageDisplayed: function() {
        return this.image && this.image.height;
      }
    },
    data () {
      return {
        offsetX: 0,
        offsetY: 0,
        transformOriginX: 0,
        transformOriginY: 0,
        canvasHeight: 0,
        canvasWidth: 0,
        scale: 1
      }
    },
    watch: {
    	image: function (newImage) {
    		let ctx = this.$refs.canvas.getContext('2d');
    		this.canvasHeight = newImage.height;
    		this.canvasWidth = newImage.width;
    		this.$refs.canvas.height = this.canvasHeight;
        this.$refs.canvas.width = this.canvasWidth;
        ctx.drawImage(newImage, 0, 0, this.canvasWidth, this.canvasHeight);
        this.transformOriginX = this.$refs.display.clientWidth/2;
        this.transformOriginY = this.$refs.display.clientHeight/2;
        this.scaleToFit();
      },
      scale: function(newScale) {
        this.fitXY();
      }
    },
    methods: {
      startMove: function(event) {
    		let clientX = event.clientX, clientY = event.clientY;
    		if (event.touches && event.touches.length > 0) {
          clientX = event.touches[0].clientX, clientY = event.touches[0].clientY;
        }
        if (clientX && clientY) {
          this.shiftX = clientX - this.offsetX;
          this.shiftY = clientY - this.offsetY;
          this.moving = true;
        }
      },
      move: function(event) {
        let clientX = event.clientX, clientY = event.clientY;
        if (event.touches && event.touches.length > 0) {
          clientX = event.touches[0].clientX, clientY = event.touches[0].clientY;
        }
    		if (clientX && clientY && this.moving) {
          this.offsetX = clientX - this.shiftX;
          this.offsetY = clientY - this.shiftY;
          this.fitXY();
        }
      },
      endMove: function(event) {
    		this.move(event);
        this.moving = false;
      },
      fitXY: function() {
        let beginX = this.transformOriginX*(this.scale-1), dx = this.canvasWidth*this.scale - this.$refs.display.clientWidth;
      	if (dx > 0) {
          this.offsetX = Math.max((this.$refs.display.clientWidth-this.canvasWidth*this.scale)+beginX, this.offsetX);
          this.offsetX = Math.min(beginX, this.offsetX);
        } else {
          this.offsetX = Math.max((this.$refs.display.clientWidth-this.canvasWidth*this.scale)+beginX+dx, this.offsetX);
      		this.offsetX = Math.min(beginX-dx, this.offsetX);
        }
        let beginY = this.transformOriginY*(this.scale-1), dy = this.canvasHeight*this.scale - this.$refs.display.clientHeight;
      	if (dy > 0) {
          this.offsetY = Math.max((this.$refs.display.clientHeight-this.canvasHeight*this.scale)+beginY, this.offsetY);
          this.offsetY = Math.min(beginY, this.offsetY);
        } else {
          this.offsetY = Math.max((this.$refs.display.clientHeight-this.canvasHeight*this.scale)+beginY+dy, this.offsetY);
          this.offsetY = Math.min(beginY-dy, this.offsetY);
        }
      },
      scaleToFit() {
      	let _scale = Math.min(this.$refs.display.clientWidth/this.canvasWidth, this.$refs.display.clientHeight/this.canvasHeight);
      	_scale = parseInt(_scale*10)/10;
      	this.scale = Math.min(5, Math.max(0.1, _scale));
      },
      wheel: function(event) {
        let delta = (event.deltaX+event.deltaY+event.deltaZ)>0?-1:1;
        this.scale = parseInt(this.scale*10+delta)/10;
        if (this.scale < 0.1) this.scale = 0.1;
        else if (this.scale > 5) this.scale = 5;
      }
    }
  }
</script>

<style scoped>
  .canvas-display {
    height: 100%;
    width: 100%;
    position: absolute;
  }
  .canvas-display:hover {
    cursor: move;
  }
  canvas {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
  }
  .systems-display {
    position: absolute;
    z-index: 200;
    top: 0;
    left: 0;
  }
  .scale-slider {
    position: absolute;
    bottom: 5%;
    right: 5%;
    z-index: 700;
  }
  .canvas-display-container {
    width: 100%;
    height: 100%;
  }
</style>
