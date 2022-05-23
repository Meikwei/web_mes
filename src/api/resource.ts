import { http } from "../utils/http";
// 获取资源列表
export const getPageList = (data): Promise<any> => {
  return http.get("/resource/list", { params: data });
};
// 添加资源
export const create = (data): Promise<any> => {
  return http.post("/resource/create", { data });
};
// 修改资源
export const update = (id, data): Promise<any> => {
  return http.post("/resource/update/" + id, { data });
};
// 删除资源
export const deleteBatch = (data): Promise<any> => {
  return http.post("/resource/delete", { data });
};
// 修改角色状态
export const updateStatus = (id, data): Promise<any> => {
  return http.get("/role/updateStatus/" + id, { params: data });
};
