<template>
  <div class="home">
    <h1 class="title">Custom ring constructor</h1>
    <canvas
       ref="view"
      id="view"
      width="500"
      height="500"
      style="border: 1px black solid"
    />
    <input v-model="height" @keypress="NumbersOnly" @input="validateInput" type="text">
  </div>
</template>

<script lang="ts">
import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'

interface ringSettings {
  depth: number,
  bevelEnabled: boolean,
  steps: number,
  curveSegments: number
}

export default {
  name: 'HomeView',
  components: {},
  data(): {
    height: number,
    renderer: any,
    scene: any,
    camera: any,
    mesh: any,
    controls: any
  } {
    return {
      height: 2,
      renderer: null,
      scene: null,
      camera: null,
      mesh: null,
      controls: null
    }
  },
  watch: {
    height() {
      this.render();
    }
  },
  computed: {
    ringSettings(): ringSettings {
      return {
        depth : +this.height,
        bevelEnabled: false,
        steps: 1,
        curveSegments: 60
      }
    }
  },
  methods: {
    render(): void {
      this.scene.remove(this.mesh);
      this.mesh = new THREE.Mesh(
        this.getRingGeometry(this.ringSettings),
        new THREE.MeshPhongMaterial({
            color: "#fffb8a"
        })
      );
      this.scene.add(this.mesh);
      this.renderer.render(this.scene, this.camera);
    },
    getRingGeometry(ringSettings: ringSettings) {
      const outerRadius = 10;
      const innerRadius = 9;

      const arcShape = new THREE.Shape();
      arcShape.moveTo(outerRadius * 2, outerRadius);
      arcShape.absarc(outerRadius, outerRadius, outerRadius, 0, Math.PI * 2, false);

      const holePath = new THREE.Path();
      holePath.moveTo(outerRadius + innerRadius, outerRadius);
      holePath.absarc(outerRadius, outerRadius, innerRadius, 0, Math.PI * 2, true);
      arcShape.holes.push(holePath);

      const geometry = new THREE.ExtrudeGeometry(arcShape, ringSettings);
      geometry.center();
      geometry.rotateX(Math.PI * -.5);

      return geometry;
    },
    validateInput(event) {
      if (isNaN(+event.target.value)) {
        this.height = 1
      }
    },
    NumbersOnly(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    }
  },
  mounted() {
    const animate = () => {
      requestAnimationFrame(animate);
      this.controls.update();
    }
    const view: HTMLCanvasElement = this.$refs.view as HTMLCanvasElement
    this.renderer = new THREE.WebGLRenderer({
      canvas: view,
      antialias: true,
      alpha: true
    });

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(28, 1, 1, 1000);
    this.camera.position.z = 50;
    this.camera.add(new THREE.PointLight(0xffffff, 1, Infinity));
    this.scene.add(this.camera);

    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener("change", this.render);
    this.controls.rotateSpeed = 5.0

    this.mesh = new THREE.Mesh(
      this.getRingGeometry(this.ringSettings),
      new THREE.MeshPhongMaterial({
        color: "#fffb8a"
      })  
    );
    this.scene.add(this.mesh);

    this.render();
    animate();
  }
};
</script>

<style scoped>

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#view {
  border: none !important;
}
</style>