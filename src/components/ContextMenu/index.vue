<script lang="ts">
interface MenuItem {
  label: string
  [key: string]: any
}
</script>
<script setup lang="ts" generic="T extends MenuItem">
import { computed, ref, type CSSProperties, type Ref } from 'vue'
import useContextMenu from './useContextMenu'

const containerRef = ref<HTMLDivElement>()
const menuRef = ref<HTMLDivElement>()
const { x, y, visiable } = useContextMenu(containerRef as Ref<HTMLDivElement>, menuRef as Ref<HTMLDivElement>)
const menuStyle = computed<CSSProperties>(() => ({
  left: x.value + 'px',
  top: y.value + 'px'
}))

defineProps<{
  menu: Array<T>
}>()

const emit = defineEmits<{
  select: [menuItem: T]
}>()
const handleClick = (menuItem: T) => {
  emit('select', menuItem)
}
</script>
<template>
  <div class="context-menu-wrap" ref="containerRef">
    <slot />
    <Teleport to="body">
      <ul class="context-menu" :style="menuStyle" v-show="visiable" ref="menuRef">
        <li v-for="menuItem of menu" :key="menuItem.label" @click="handleClick(menuItem)">
          <slot :name="menuItem.label">{{ menuItem.label }}</slot>
        </li>
      </ul>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
$menuItemHeight: 30px;
.context-menu-wrap {
  display: inline-block;
}
.context-menu {
  position: fixed;
  display: block;
  list-style-type: none;
  background-color: #fff;
  border-radius: 4px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  box-shadow: 2px 2px 2px 1px #0000001a;
  li {
    padding-left: 20px;
    padding-right: 20px;
    height: $menuItemHeight;
    line-height: $menuItemHeight;
    user-select: none;
    cursor: pointer;
  }
}
</style>
