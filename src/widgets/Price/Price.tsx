import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { IRedux } from "../../app/Redux/Store/Index"
import { addPost, filterPost } from "../../app/Redux/Store/product"
import { ICardApi } from "../../shared/api/CardApi"

const Price = () => {
    const products = useSelector((state: IRedux) => state.product.posts)
    const refMin = useRef<HTMLInputElement>(null)
    const refMax = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()

    const change = () => {
        searchParams.set("priceMin", refMin.current?.value || "")
        searchParams.set("priceMax", refMax.current?.value || "")
        setSearchParams(searchParams)

        dispatch(filterPost(searchParams))
    }

    return (
        <div className="LeftBlockCatalog__counter">
            <input
                onChange={() => change()}
                ref={refMin}
                defaultValue={searchParams.get('priceMin') || 1}
                className="PriceCounter"
            />
            <p> - </p>
            <input
                onChange={() => change()}
                ref={refMax}
                defaultValue={searchParams.get('priceMax') || 10000}
                className="PriceCounter"
            />
        </div>
    )
}

export default Price
