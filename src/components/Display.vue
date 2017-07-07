<template>
  <div class="display" @wheel="wheel">
    <input type="file" v-show="!imageDisplayed" @change="loadImage" multiple/>
    <vue-slider v-if="imageDisplayed" v-model="scale"
                :direction="'vertical'"
                :min="0.1" :max="3.0" :interval="0.1"
                :height="'30%'" :width="15"
                class="scale-slider"></vue-slider>
    <canvas-display v-show="imageDisplayed" :image="image" :scale="scale"></canvas-display>
  </div>
</template>

<script>
  import CanvasDisplay from "./CanvasDisplay/CanvasDisplay";
  import vueSlider from 'vue-slider-component'
  export default {
    components: {
      CanvasDisplay,
      vueSlider
    },
    computed: {
    	imageDisplayed: function() {
    		return this.image && this.image.height;
      }
    },
    name: 'display',
    data () {
      return {
        image: null,
        imageFiles: [],
        scale: 1
      }
    },
    methods: {
    	loadImage: function(event) {
    		let fileReader = new FileReader();
    		fileReader.readAsDataURL(event.target.files.item(0));
    		fileReader.onload = () => {
    			let img = new Image();
    			img.src = fileReader.result;
    			img.onload = () => {
            this.image = img;
          }
        }
      },
      wheel: function(event) {
    		this.scale = parseInt(this.scale*10 + event.wheelDelta/120)/10;
    		if (this.scale < 0.1) this.scale = 0.1;
    		else if (this.scale > 3) this.scale = 3;
      }
    }
  }
</script>

<style scoped>
  .display {
    width: 100%;
    height: 100%;
  }
  .scale-slider {
    position: absolute;
    bottom: 5%;
    right: 5%;
    z-index: 500;
  }
</style>
