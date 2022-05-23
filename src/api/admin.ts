import { http } from "../utils/http";
// 获取用户列表
export const getPageList = (data): Promise<any> => {
  return http.get("/admin/list", { params: data });
};
// 添加用户
export const register = (data): Promise<any> => {
  return http.post("/admin/register", { data });
};
// 修改用户
export const update = (id, data): Promise<any> => {
  return http.post("/admin/update/" + id, { data });
};
// 删除用户
export const deleteById = (id): Promise<any> => {
  return http.post("/admin/delete/" + id);
};
// 修改用户状态
export const updateStatus = (id, data): Promise<any> => {
  return http.post("/admin/updateStatus/" + id, { params: data });
};
