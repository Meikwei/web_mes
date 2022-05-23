// 考虑到在获取上下文和全局挂载实例的时候会用到这个getCurrentInstance
import { ComponentInternalInstance, getCurrentInstance } from "vue";
export default function useCurrentInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const globalProperties = appContext.config.globalProperties;
  return {
    globalProperties
  };
}
//获取路由
// import { useRouter } from "vue-router";
// const route = useRouter();
// console.log(route.currentRoute.value.query);
