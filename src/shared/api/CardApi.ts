import axios from 'axios'

export interface ICardApi{
    id?: number
    imgURL: string
    size: string
    brand: string
    code: string
    manufacturer: string
    price: number
    name: string
    count?: number
    description?: string
    type?: string[]
}

export interface ICardData{
    data: ICardApi[]
}

export interface ICardDataOne{
    data: ICardApi
}

export const CardApi = async()=>{
    let res:ICardData = await axios.get('https://641757421cbdda1fa1577617.mockapi.io/cx/Market') 
    return res
}

export const DeleteCardApi = async(id:number)=>{
    let res:ICardData = await axios.delete('https://641757421cbdda1fa1577617.mockapi.io/cx/Market/'+id) 
    return res
}

export const AddCardApi = async(post:ICardApi) =>{
    let res:ICardData = await axios.post('https://641757421cbdda1fa1577617.mockapi.io/cx/Market/',{
        ...post
    }) 
    return res
}

export const EditCardApi = async(id: number, post: ICardApi)=>{
    let res:ICardData = await axios.put('https://641757421cbdda1fa1577617.mockapi.io/cx/Market/'+id,{
        ...post
    }) 
    return res
}

export const CardApiId = async (id:string)=>{
    let res:ICardDataOne = await axios.get('https://641757421cbdda1fa1577617.mockapi.io/cx/Market/'+id) 
    return res
}