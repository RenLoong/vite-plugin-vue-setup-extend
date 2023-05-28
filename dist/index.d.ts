import { Plugin } from 'vite';

interface ExtendOptions {
    /**
     * 启用名称扩展
     * @default true
     */
    name?: boolean;
    /**
     * 启用路径扩展
     * @default true
     */
    path?: boolean;
    /**
     * 启用自动替换/index
     * @default true
     */
    index?: boolean;
    /**
     * 路径连接符
     * @default ''
     */
    pathSeparator?: string;
}
declare const _default: (options?: ExtendOptions) => Plugin;

export { ExtendOptions, _default as default };
