import { createApp } from 'vue'
import Tooltip from './Tooltip.vue'
export type TooltipType = 'success' | 'error' | 'default';

const createTooltip = (message: string, type: TooltipType, timeout: number | null) => {
  // 判断ID为tooltipDom的节点是否存在, 存在就删除
  const tooltipDom = document.getElementById('tooltipDom')
  if (tooltipDom) {
    tooltipDom.remove()
  }
  // 创建Tooltip组件
  const TooltipInstance = createApp(Tooltip, {
    message,
    type
  })
  // 创建tooltipDom节点,并将TooltipInstance(Tooltip)组件 挂载到tooltipDom节点上
  const mountNode = document.createElement('div')
  mountNode.id = 'tooltipDom';
  document.body.appendChild(mountNode)
  TooltipInstance.mount(mountNode)
  // 如果定时参数存在 则 设置n秒后自动卸载
  if (timeout) {
    setTimeout(() => {
      // 卸载Tooltip组件
      TooltipInstance.unmount(mountNode)
      // 删除mountNode节点
      document.body.removeChild(mountNode)
    }, timeout)
  }

}

export default createTooltip