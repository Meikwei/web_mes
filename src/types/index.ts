/**
 * 后端返回数据格式
 */
export type Response = {
  code?: number;
  data?: any;
  message?: string;
};

interface TransitionRoute {
  // 当前路由动画效果，参考https://next.router.vuejs.org/guide/advanced/transitions.html#transitions
  name: string;
  // 进场动画
  enterTransition: string;
  // 离场动画
  leaveTransition: string;
}
interface MetaRoute {
  // 菜单名称（兼容国际化、非国际化，非国际化的话可以直接title写中文，i18n可写false，也可直接不加i18n这个字段）
  title?: string;
  // 国际化（开启 true、关闭 false）
  icon?: string;
  i18n?: boolean;
  // 是否在菜单中显示（可不写，默认true）
  showLink?: boolean;
  // 菜单升序排序，值越高排的越后（只针对顶级路由，也就是与当前meta平级的component为Layout的路由）
  rank?: number;
  // 是否显示父级菜单
  showParent?: boolean;
  // 路由权限设置
  authority?: Array<string>;
  // 路由组件缓存（开启 true、关闭 false）
  keepAlive?: boolean;
  // 内嵌的iframe链接
  frameSrc?: string;
  // 页面加载动画（有两种形式，一种直接采用vue内置的transitions动画，另一种是使用animate.css写进、离场动画）
  transition?: TransitionRoute;
  // 动态路由可打开的最大数量
  dynamicLevel?: number;
  // 刷新重定向（用于未开启标签页缓存，刷新页面获取不到动态title）
  refreshRedirect?: string;
}
interface ExtraIcon {
  svg: boolean;
  name: string;
}
interface SwitchMenu {
  id?: number;
  partentId?: number;
  // 子路由地址
  path: string;
  // 路由名字（对应不要重复，根当前组件的name保持一致）
  name: string;
  redirect: string;
  meta?: MetaRoute;
  // 菜单名称右侧的额外图标，支持fontawesome、iconfont、element-plus-icon
  extraIcon?: ExtraIcon;
  children?: Array<SwitchMenu>;
}
interface MenuNode {
  id?: number;
  partentId?: number;
  title?: string;
  level?: number;
  sort?: number;
  name?: string;
  icon?: string;
  hidde?: number;
  createTime?: string;
}

class Menu implements MenuNode {}
class SwitchMenuClass implements SwitchMenu {
  id?: number;
  partentId?: number;
  // 子路由地址
  path: string;
  // 路由名字（对应不要重复，根当前组件的name保持一致）
  name: string;
  redirect: string;
  meta?: MetaRoute;
  // 菜单名称右侧的额外图标，支持fontawesome、iconfont、element-plus-icon
  extraIcon?: ExtraIcon;
  constructor(menu: MenuNode) {
    this.id = menu.id;
    this.partentId = menu.partentId;
    this.path = `/${menu.name}`;
    this.name = menu.name;
    this.meta.title = menu.title;
    this.meta.icon = menu.icon;
    this.meta.rank = menu.sort;
    this.meta.i18n = false;
    this.meta.showLink = menu.hidde == 0 ? true : false;
  }
}
