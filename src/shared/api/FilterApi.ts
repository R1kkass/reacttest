import axios from "axios"

export interface IFilterApi {
    id?: string
    title: string
    array: IArray[]
    type?: string[]
}

export interface IArray{
    name: string
}

export interface IFilterApiData {
    data: IFilterApi[]
}

export const FilterApi = async () => {
    const res: IFilterApiData = await axios.get(
        "https://641757421cbdda1fa1577617.mockapi.io/cx/xdgf"
    )
    return res
}

export const FilterApiPost = async (post: IFilterApi) => {
    const res: IFilterApiData = await axios.post(
        "https://641757421cbdda1fa1577617.mockapi.io/cx/xdgf",
        { title: post.title, array: post.array }
    )
    return res
}

export const FilterApiDelte = async (id:number) => {
    const res: IFilterApiData = await axios.delete(
        "https://641757421cbdda1fa1577617.mockapi.io/cx/xdgf/"+id
    )
    return res
}

export const FilterApiPut = async (id:number, post: IFilterApi) => {
    const res: IFilterApiData = await axios.put(
        "https://641757421cbdda1fa1577617.mockapi.io/cx/xdgf/"+id,{
            ...post
        }
    )
    return res
}

