import { http } from "../utils/http";
// 获取列表
export const getPageList = (data): Promise<any> => {
  return http.get("/processType/list", { params: data });
};
// 添加
export const create = (data): Promise<any> => {
  return http.post("/processType/create", { data });
};
// 修改
export const update = (id, data): Promise<any> => {
  return http.post("/processType/update/" + id, { data });
};
// 删除
export const deleteBatch = (data): Promise<any> => {
  return http.post("/processType/delete", { data });
};
// 修改状态
export const updateStatus = (id, data): Promise<any> => {
  return http.get("/processType/updateStatus/" + id, { params: data });
};
// 制程类型
export const processType = (): Promise<any> => {
  return http.get("/processType/type");
};
