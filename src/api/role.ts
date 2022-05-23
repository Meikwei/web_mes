import { http } from "../utils/http";
// 获取角色列表
export const getPageList = (data): Promise<any> => {
  return http.get("/role/list", { params: data });
};
// 添加角色
export const create = (data): Promise<any> => {
  return http.post("/role/create", { data });
};
// 修改角色
export const update = (id, data): Promise<any> => {
  return http.post("/role/update/" + id, { data });
};
// 删除角色
export const deleteBatch = (data): Promise<any> => {
  return http.post("/role/delete", { data });
};
// 修改角色状态
export const updateStatus = (id, data): Promise<any> => {
  return http.get("/role/updateStatus/" + id, { params: data });
};
