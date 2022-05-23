import { http } from "../utils/http";
// 获取列表
export const getPageList = (data): Promise<any> => {
  return http.get("/process/list", { params: data });
};
// 添加
export const create = (data): Promise<any> => {
  return http.post("/process/create", { data });
};
// 修改
export const update = (id, data): Promise<any> => {
  return http.post("/process/update/" + id, { data });
};
// 删除
export const deleteBatch = (data): Promise<any> => {
  return http.post("/process/delete", { data });
};
// 修改状态
export const updateStatus = (id, data): Promise<any> => {
  return http.get("/process/updateStatus/" + id, { params: data });
};
// 获取列表
export const getProcessSelect = (id): Promise<any> => {
  return http.get("/process/processType/" + id);
};
