import request from "@/utils/request";

//获取部门列表
export const getDeptList = () => request.get("/depts")
