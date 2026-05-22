import request from "@/utils/request"

//分页查询员工数据
export const getEmpListApi = (params) => request.get("/emps", { params })

//添加员工
export const addEmpApi = (data) => request.post("/emps", data)

//根据id查询回显员工数据(便于显示员工工作经历)
export const getEmpByIdApi = (id) => request.get(`/emps/${id}`)

//修改员工
export const updateEmpApi = (data) => request.put("/emps", data)

//删除员工
export const deleteEmpApi = (ids) => request.delete("/emps", { params: { ids } })