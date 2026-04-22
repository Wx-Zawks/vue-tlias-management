import request from "@/utils/request"

//分页查询员工数据
export const getEmpListApi = (params) => request.get("/emps", { params })