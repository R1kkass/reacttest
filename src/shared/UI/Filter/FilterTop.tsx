import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { IRedux } from "../../../app/Redux/Store/Index"
import { addPost, filterPost } from "../../../app/Redux/Store/product"
import { FilterApi, IFilterApi, IFilterApiData } from "../../api/FilterApi"
import "./Filter.scss"

const url = new URLSearchParams(window.location.search)

const FilterTop = () => {
    const [filtres, setFilter] = useState<IFilterApi[]>([])

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
            let per = searchParams.get("param")
            if (per) {
                filterProductw(per)
            }
        })
    }, [])

    return (
        <div className="Catalog__thirdLine">
            {filtres?.map(({ title, array, id }) => (
                <>
                    <div
                        className={
                            searchParams.get("param")?.includes(title)
                                ? "Catalog__active"
                                : ""
                        }
                        key={title}
                        onClick={() => filterProductw(title)}
                    >
                        <p>{title}</p>
                    </div>
                </>
            ))}
        </div>
    )
}

export default FilterTop
