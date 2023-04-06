import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useSearchParams } from "react-router-dom"
import { IRedux } from "../../../app/Redux/Store/Index"
import { addPost, filterPost } from "../../../app/Redux/Store/product"
import { FilterApi, IFilterApi, IFilterApiData } from "../../api/FilterApi"
import "./Filter.scss"

const Filter = () => {
    const [filtres, setFilter] = useState<IFilterApi[]>([])
    const product  = useSelector((state:IRedux)=>state.product.posts)
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()

    const filterProductw = (param: string) => {
        let per = searchParams.get("param")
        if (per != param || !per) {
            searchParams.set("param", param)
            searchParams.set("page", "1")
            setSearchParams(searchParams)
        }
        dispatch(filterPost(searchParams))
    }

    useEffect(() => {
        FilterApi().then((e: IFilterApiData) => {
            setFilter(e.data)
        })
    }, [])

    return (
        <div className="Filter">
            {filtres?.map(({ title, array, id }) => (
                <>
                    <div className="Filter__block">
                        <h3  className={
                            searchParams.get("param")?.includes(title)
                                ? "Filter__active"
                                : ""
                        } onClick={()=>filterProductw(title)}>{title}</h3>
                    
                    {array?.map(({ name }) => (
                        <div className="Filter__text">
                            <p >{name}</p>
                        </div>
                    ))}
                    </div>
                </>
            ))}
        </div>
    )
}

export default Filter
