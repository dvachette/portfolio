// types/kde/kdeApp.ts
import type { Component } from 'vue';
import type { AppIcon } from './appBar';

export interface KdeApp {
    component: () => Promise<Component>;
    position: { x: number; y: number };
    size: { width: number; height: number };
    savedPosition?: { x: number; y: number };
    savedSize?: { width: number; height: number };
    minimized: boolean;
    maximized: boolean;
    zIndex: number;
    metaData: AppIcon;
    props?: Record<string, unknown>;
}