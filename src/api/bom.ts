import { http } from "../utils/http";
// 获取列表
export const getPageList = (data): Promise<any> => {
  return http.get("/bom/list", { params: data });
};

// 修改
export const update = (id, data): Promise<any> => {
  return http.post("/bom/update/" + id, { data });
};
// 删除
export const deleteBatch = (data): Promise<any> => {
  return http.post("/bom/delete", { data });
};
// 删除
export const deleteById = (id): Promise<any> => {
  return http.get("/bom/delete/" + id);
};
// 修改状态
export const updateStatus = (id, data): Promise<any> => {
  return http.get("/bom/updateStatus/" + id, { params: data });
};
// 删除
export const bomSelect = (): Promise<any> => {
  return http.get("/bom/bomSelect");
};
