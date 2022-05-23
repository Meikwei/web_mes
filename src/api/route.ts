import { http } from "../utils/http";
// 获取列表
export const getPageList = (data): Promise<any> => {
  return http.post("/route/list", { data });
};
// 添加
export const create = (data): Promise<any> => {
  return http.post("/route/create", { data });
};
// 修改
export const update = (id, data): Promise<any> => {
  return http.post("/route/update/" + id, { data });
};
// 删除
export const deleteBatch = (data): Promise<any> => {
  return http.post("/route/delete", { data });
};
// 修改状态
export const updateStatus = (id, data): Promise<any> => {
  return http.get("/route/updateStatus/" + id, { params: data });
};
