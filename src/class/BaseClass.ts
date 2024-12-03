import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  type WebGLRendererParameters,
} from 'three'

import { WebGPURendererParameters } from 'three/src/renderers/webgpu/WebGPURenderer.js'
import WebGPURenderer from 'three/src/renderers/webgpu/WebGPURenderer.js'
import WebGPU from 'three/examples/jsm/capabilities/WebGPU.js'

export default class BaseClass {
  container: HTMLDivElement
  width: number
  height: number

  isWebGPU: boolean = false

  scene!: Scene
  camera!: PerspectiveCamera

  renderConfig:
    | WebGLRendererParameters
    | WebGPURendererParameters
    | undefined
  renderer!: WebGLRenderer | WebGPURenderer

  constructor(
    container: HTMLDivElement,
    isWebGPU:boolean,
    renderConfig:
      | WebGLRendererParameters
      | WebGPURendererParameters
      | undefined
  ) {
    this.container = container

    this.width = container.clientWidth
    this.height = container.clientHeight

    this.isWebGPU = isWebGPU

    this.renderConfig = renderConfig

    this.init()
  }

  private init() {
    this.initScene()
    this.initCamera()
    this.isWebGPU
      ? this.initWebGPURenderer(this.renderConfig as WebGPURendererParameters)
      : this.initWebGLRenderer(this.renderConfig as WebGLRendererParameters)
  }

  private initScene() {
    this.scene = new Scene()
  }

  private initCamera() {
    this.camera = new PerspectiveCamera(75, this.width / this.height, 0.1, 1000)
    this.camera.position.z = 5
  }

  private initWebGLRenderer(renderConfig: WebGLRendererParameters | undefined) {
    this.renderer = new WebGLRenderer(renderConfig)

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.container.appendChild(this.renderer.domElement)
  }

  private initWebGPURenderer(
    renderConfig: WebGPURendererParameters | undefined
  ) {
    if (WebGPU.isAvailable() === false) {
      alert('WebGPU is not available')
      throw new Error('WebGPU is not available')
    }

    this.renderer = new WebGPURenderer(renderConfig)

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.container.appendChild(this.renderer.domElement)
  }
}
