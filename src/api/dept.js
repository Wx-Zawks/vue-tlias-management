import request from "@/utils/request";

//获取部门列表
export const getDeptListApi = () => request.get("/depts")

//添加部门
export const addDeptApi = (data) => request.post("/depts", data)