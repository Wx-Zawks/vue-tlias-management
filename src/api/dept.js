import request from "@/utils/request";

//获取部门列表
export const getDeptListApi = () => request.get("/depts")

//添加部门
export const addDeptApi = (data) => request.post("/depts", data)

//根据id查询部门
export const getDeptByIdApi = (id) => request.get(`/depts/${id}`)

//修改部门
export const updateDeptApi = (data) => request.put(`/depts`, data)

//删除部门
export const deleteDeptApi = (id) => request.delete('/depts', { params: { id }})