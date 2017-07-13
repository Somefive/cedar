<template>
  <div class="display">
    <input type="file" v-show="!imageDisplayed" @change="loadImageFiles" multiple/>
    <input type="file" v-show="!imageDisplayed" @change="loadJsonFiles" multiple/>
    <div class="display-panel" style="top:0">
      <canvas-display :image="image" :systems="systems"></canvas-display>
    </div>
    <div class="splitting align-center"></div>
    <div class="display-panel" style="bottom:0">
      <canvas-display :image="image" :systems="systems"></canvas-display>
    </div>

  </div>
</template>

<script>
  import CanvasDisplay from "./CanvasDisplay/CanvasDisplay";
  export default {
    components: {
      CanvasDisplay
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
        jsonFiles: [],
        imageNumber: 0,
        scaleUp: 1,
        scaleDown: 1,
        systems: []
      }
    },
    methods: {
    	loadJsonFiles: function(event) {
        for (let i=0;i<event.target.files.length;i+=1) {
          this.jsonFiles.push(event.target.files.item(i));
        }
      },
    	loadImageFiles: function(event) {
    		for (let i=0;i<event.target.files.length;i+=1) {
          this.imageFiles.push(event.target.files.item(i));
        }
    		if (this.imageFiles.length > 0) {
    			this.imageNumber = 0;
    			this.loadImage();
        }
      },
    	loadImage: function() {
    		if (this.jsonFiles.length <= this.imageNumber || this.imageFiles.length <= this.imageNumber)
    			return;
    		let jsonReader = new FileReader();
    		jsonReader.readAsText(this.jsonFiles[this.imageNumber]);
    		jsonReader.onload = () => {
    			let obj = JSON.parse(jsonReader.result);
    			this.systems.splice(0, this.systems.length);
          this.systems.splice(0, 0, ...obj);
    			console.log(this.systems);
          let fileReader = new FileReader();
          fileReader.readAsDataURL(this.imageFiles[this.imageNumber]);
          fileReader.onload = () => {
            let img = new Image();
            img.src = fileReader.result;
            img.onload = () => {
              this.image = img;
//            setTimeout(() => {
//            	this.imageNumber = (this.imageNumber+1)%this.imageFiles.length;
//            	this.loadImage();
//            }, 5000);
            }
          }
        };
      }
    }
  }
</script>

<style scoped>
  .display {
    width: 100%;
    height: 100%;
  }
  .display-panel {
    position: absolute;
    width: 100%;
    height: 50%;
    left: 0;
    background: white;
    overflow: hidden;
  }
  .splitting {
    height: 10px;
    width: 100%;
    background: darkgrey;
  }
  input {
    position: relative;
    z-index: 1000;
  }
</style>
