<script setup lang="ts">
import ContextMenu from '@/components/ContextMenu/index.vue'
interface IMenuItem {
  label: string
  id: number
}
const menuOuter: Array<IMenuItem> = [
  { label: '菜单1', id: 1 },
  { label: '菜单2', id: 2 },
  { label: '菜单3', id: 3 }
]
const menuInner: Array<IMenuItem> = [
  { label: '菜单A', id: 1 },
  { label: '菜单B', id: 2 },
  { label: '菜单C', id: 3 }
]

const handleSelect = (menuItem: IMenuItem) => {
  alert(`点击了${menuItem.label}`)
}
</script>

<template>
  <ContextMenu :menu="menuOuter" @select="handleSelect">
    <div class="box-outer">
      <ContextMenu :menu="menuInner" @select="handleSelect">
        <div class="box-inner"></div>
        <template #菜单A>
          <span>自定义菜单A</span>
        </template>
      </ContextMenu>
    </div>
  </ContextMenu>
</template>

<style scoped lang="scss">
.box-outer {
  width: 600px;
  height: 600px;
  background-color: aqua;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-inner {
    width: 300px;
    height: 300px;
    background-color: blueviolet;
  }
}
</style>
