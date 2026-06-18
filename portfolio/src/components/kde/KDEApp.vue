<script setup lang="ts">
import { defineAsyncComponent, computed, ref } from 'vue';
import type { KdeApp } from '@/types/kde/app';
import { useKdeWindowsStore } from '@/stores/kde/appsStore';

const app = defineModel<KdeApp>({ required: true });
const store = useKdeWindowsStore();

const asyncComponent = computed(() => defineAsyncComponent(app.value.component));

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | null;

const RESIZE_ZONE = 6;
const resizeDirection = ref<ResizeDirection>(null);
const windowCursor = ref('default');

const cursorMap: Record<NonNullable<ResizeDirection>, string> = {
  n: 'n-resize',
  s: 's-resize',
  e: 'e-resize',
  w: 'w-resize',
  ne: 'ne-resize',
  nw: 'nw-resize',
  se: 'se-resize',
  sw: 'sw-resize',
};

function getResizeDirection(e: MouseEvent, el: HTMLElement): ResizeDirection {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const w = rect.width;
  const h = rect.height;

  const onLeft = x <= RESIZE_ZONE;
  const onRight = x >= w - RESIZE_ZONE;
  const onTop = y <= RESIZE_ZONE;
  const onBottom = y >= h - RESIZE_ZONE;

  if (onTop && onLeft) return 'nw';
  if (onTop && onRight) return 'ne';
  if (onBottom && onLeft) return 'sw';
  if (onBottom && onRight) return 'se';
  if (onTop) return 'n';
  if (onBottom) return 's';
  if (onLeft) return 'w';
  if (onRight) return 'e';
  return null;
}

function handleRootMouseDown(event: MouseEvent): void {
    store.focus(app.value.metaData.id);
    handleResizeMouseDown(event);
}

function handleMouseMove(e: MouseEvent): void {
  if (app.value.maximized) return;
  const el = e.currentTarget as HTMLElement;
  const dir = getResizeDirection(e, el);
  resizeDirection.value = dir;
  windowCursor.value = dir ? cursorMap[dir] : 'default';
}

function handleResizeMouseDown(e: MouseEvent): void {
  if (app.value.maximized) return;
  const dir = resizeDirection.value;
  if (!dir) return;

  e.stopPropagation();

  const startX = e.clientX;
  const startY = e.clientY;
  const startPos = { ...app.value.position };
  const startSize = { ...app.value.size };

  function onMouseMove(ev: MouseEvent): void {
    const dx = ev.clientX - startX;
    const dy = ev.clientY - startY;

    if (dir!.includes('e')) {
      app.value.size.width = startSize.width + dx;
    }
    if (dir!.includes('s')) {
      app.value.size.height = startSize.height + dy;
    }
    if (dir!.includes('w')) {
      app.value.size.width = startSize.width - dx;
      app.value.position.x = startPos.x + dx;
    }
    if (dir!.includes('n')) {
      app.value.size.height = startSize.height - dy;
      app.value.position.y = startPos.y + dy;
    }
  }

  function onMouseUp(): void {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function handleDrag(event: MouseEvent): void {
  if (event.detail >= 2) return;
      store.focus(app.value.metaData.id);
        if (resizeDirection.value) {
        handleResizeMouseDown(event);
        return;
    }
  if (app.value.maximized) {
    let dragged = false;
    const startX = event.clientX;
    const startY = event.clientY;

    function onMouseMove(e: MouseEvent): void {
      if (!dragged) {
        const dx = Math.abs(e.clientX - startX);
        const dy = Math.abs(e.clientY - startY);
        if (dx < 5 && dy < 5) return;
        dragged = true;
        store.maximize(app.value.metaData.id);
        app.value.position = {
          x: e.clientX - app.value.size.width / 2,
          y: e.clientY - 20,
        };
      } else {
        app.value.position = {
          x: e.clientX - app.value.size.width / 2,
          y: e.clientY - 20,
        };
      }
    }

    function onMouseUp(): void {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return;
  }

  const startX = event.clientX - app.value.position.x;
  const startY = event.clientY - app.value.position.y;

  function onMouseMove(e: MouseEvent): void {
    app.value.position.x = e.clientX - startX;
    app.value.position.y = e.clientY - startY;
  }

  function onMouseUp(e: MouseEvent): void {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    const threshold = 20;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (e.clientY <= threshold) {
      store.maximize(app.value.metaData.id);
    } else if (app.value.position.x <= threshold) {
      app.value.position = { x: 0, y: 0 };
      app.value.size = { width: vw / 2, height: vh };
      app.value.savedPosition = undefined;
      app.value.savedSize = undefined;
    } else if (app.value.position.x + app.value.size.width >= vw - threshold) {
      app.value.position = { x: vw / 2, y: 0 };
      app.value.size = { width: vw / 2, height: vh };
      app.value.savedPosition = undefined;
      app.value.savedSize = undefined;
    }
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function handleDoubleClick(): void {
  store.maximize(app.value.metaData.id);
}
</script>

<template>
    <div
        class="kde_app"
        :class="{ 'kde_app--maximized': app.maximized }"
        :style="app.maximized ? {zIndex: app.zIndex} : {
            width: app.size.width + 'px',
            height: app.size.height + 'px',
            top: app.position.y + 'px',
            left: app.position.x + 'px',
            zIndex: app.zIndex,
            cursor: windowCursor,
        }"
        @mousemove="handleMouseMove"
        @mousedown="handleRootMouseDown"
    >
        <div
            class="kde_app__header"
            @mousedown.stop="handleDrag"
            @dblclick="handleDoubleClick"
            @mousemove="handleMouseMove"
        >            
            <span class="kde_app__title">{{ app.metaData.name }}</span>
            <div class="kde_app__controls">
                <button class="kde_app__control kde_app__control--minimize" @click="store.minimize(app.metaData.id)">_</button>
                <button class="kde_app__control kde_app__control--maximize" @click="store.maximize(app.metaData.id)">[]</button>
            </div>
        </div>
        <div class="kde_app__content">
            <component :is="asyncComponent" v-bind="app.props" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.kde_app {
    overflow: hidden;
    background-color: #ff0000;
    position: absolute;
    outline: 2px solid #555;
}

.kde_app__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    color: #fff;
    padding: 0.5rem;
    user-select: none;
}

.kde_app__title {
    font-size: 1.2rem;
    font-weight: bold;
    pointer-events: none;
}

.kde_app__controls {
    display: flex;
    gap: 0.5rem;
}

.kde_app__control {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
}

.kde_app__control--minimize {
    color: #ff0;
}

.kde_app__control--maximize {
    color: #0f0;
}

.kde_app__control--close {
    color: #f00;
}

.kde_app--maximized {
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
}
</style>