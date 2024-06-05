import { ref, onMounted, onUnmounted, type Ref, nextTick } from 'vue'
const useContextMenu = (containerRef: Ref<HTMLDivElement>, menuRef: Ref<HTMLDivElement>) => {
  const visiable = ref(false)
  const x = ref(0)
  const y = ref(0)
  onMounted(() => {
    containerRef.value.addEventListener('contextmenu', showMenu)
    window.addEventListener('contextmenu', hideMenu, true)
    window.addEventListener('click', hideMenu)
  })
  onUnmounted(() => {
    containerRef.value.removeEventListener('contextmenu', showMenu)
    window.removeEventListener('contextmenu', hideMenu, true)
    window.removeEventListener('click', hideMenu)
  })
  /* 显示菜单 */
  const showMenu = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    visiable.value = true
    nextTick(() => {
      const { clientX, clientY } = e
      const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menuRef.value
      const { clientWidth: windowWidth, clientHeight: windowHeight } = document.documentElement
      // 水平超出
      const maxX = windowWidth - menuWidth
      const maxY = windowHeight - menuHeight
      if (clientX > maxX) {
        x.value = maxX
      } else {
        x.value = e.clientX
      }
      // 垂直超出
      if (clientY > maxY) {
        y.value = maxY
      } else {
        y.value = e.clientY
      }

      // 动画
      menuRef.value.style.transition = 'none'
      menuRef.value.style.height = 0 + 'px'
      requestAnimationFrame(() => {
        menuRef.value.style.transition = 'height .3s'
        menuRef.value.style.height = menuHeight + 'px'
      })
    })
  }

  /* 隐藏菜单 */
  const hideMenu = () => {
    visiable.value = false
  }
  return { visiable, x, y }
}
export default useContextMenu
