import { http } from "../utils/http";
// 获取列表
export const getPageList = (id, data): Promise<any> => {
  return http.get("/menu/list/" + id, { params: data });
};
// 添加
export const create = (data): Promise<any> => {
  return http.post("/menu/create", { data });
};
// 修改
export const update = (id, data): Promise<any> => {
  return http.post("/menu/update/" + id, { data });
};
// 删除
export const deleteBatch = (data): Promise<any> => {
  return http.post("/role/delete", { data });
};
// 删除
export const deleteById = (id): Promise<any> => {
  return http.get("/menu/delete/" + id);
};
// 修改状态
export const updateStatus = (id, data): Promise<any> => {
  return http.get("/menu/updateHidden/" + id, { params: data });
};
