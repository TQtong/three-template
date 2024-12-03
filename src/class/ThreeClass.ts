import {
  Vector2,
  AxesHelper,
  Clock,
  GridHelper,
  Raycaster,
  type WebGLRendererParameters,
  Color
} from 'three'

import { WebGPURendererParameters } from 'three/src/renderers/webgpu/WebGPURenderer.js'

import { OrbitControls } from 'three/examples/jsm/Addons.js'

import BaseClass from './BaseClass'

export default class ThreeClass extends BaseClass {

  control!: OrbitControls
  stats!: Stats
  raycaster!: Raycaster
  mouse!: Vector2
  clock!: Clock

  constructor(container: HTMLDivElement, isWebGPU = false, renderConfig: WebGLRendererParameters | WebGPURendererParameters | undefined = undefined) {
    super(container,isWebGPU,renderConfig)
  }

  public createControl() {
    this.control = new OrbitControls(this.camera, this.renderer.domElement)
  }

  public createStats() {
    this.stats = new Stats()
    this.container.appendChild(this.stats.dom)
  }

  public createRaycaster() {
    this.raycaster = new Raycaster()
  }

  public createMouse() {
    this.mouse = new Vector2()
  }

  public createClock() {
    this.clock = new Clock()
  }

  public createAxesHelper(size = 20) {
    const axesHelper = new AxesHelper(size)
    this.scene.add(axesHelper)
  }

  public createGridHelper(size = 20, divisions = 20, color1 = 'pink', color2 = 'purple') {
    const gridHelper = new GridHelper(size, divisions, color1, color2)
    this.scene.add(gridHelper)
  }

  public changeRenderBackgroundColor(color:Color | string | number = 0x000000, alpha = 1) {
    this.renderer.setClearColor(new Color(color), alpha)
  }

  public render(renderFunction: Function | undefined = undefined) {
    renderFunction ? renderFunction() : this.animation()
  }

  public setDamping() {
    this.control.enableDamping = true
    this.control.dampingFactor = 0.05
  }

  public setReactiveViewport() {
    window.addEventListener('resize', () => {
      this.width = this.container.clientWidth
      this.height = this.container.clientHeight
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.width, this.height)
    })
  }

  private animation() {
    this.stats && this.stats.update()
    this.control && this.control.update()
    this.renderer.render(this.scene, this.camera)
    
    requestAnimationFrame(this.animation.bind(this))
  }
}