import request from "@/utils/request"

//分页查询员工数据
export const getEmpListApi = (params) => request.get("/emps", { params })

//添加员工
export const addEmpApi = (data) => request.post("/emps", data)