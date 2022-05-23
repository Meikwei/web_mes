import { http } from "../utils/http";
// 获取列表
export const getPageList = (data): Promise<any> => {
  return http.get("/bomDetail/list", { params: data });
};
// 修改
export const update = (id, data): Promise<any> => {
  return http.post("/bomDetail/update/" + id, { data });
};
