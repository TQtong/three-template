import ThreeClass from "./class/ThreeClass";

export const init = (continer: HTMLDivElement) => {
  const threeClass = new ThreeClass(continer);

  threeClass.createControl()
  threeClass.changeRenderBackgroundColor('skyblue')
  threeClass.createAxesHelper()
  threeClass.setReactiveViewport()
  threeClass.createGridHelper()

  threeClass.render()
}