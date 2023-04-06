import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { IRedux } from "../../app/Redux/Store/Index"
import { addPost } from "../../app/Redux/Store/product"
import { ICardApi } from "../../shared/api/CardApi"
import "./Sort.scss"

const url = new URLSearchParams(window.location.search)

const Sort = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [sortType, setSortType] = useState<string>(
        searchParams.get("sort") || "По умолчанию"
    )
    const [visible, setVisble] = useState<boolean>(false)
    const product = useSelector((state: IRedux) => state.product.posts)
    const dispatch = useDispatch()

    const sortProduct = (type: string) => {
        let res
        setSortType(type)
        switch (type) {
            case "По убыванию цены":
                res = product.sort((a: ICardApi, b: ICardApi) => {
                    return (Number(b.price) || 0) - (Number(a.price) || 0)
                })
                break
            case "По возрастанию цены":
                res = product.sort((a: ICardApi, b: ICardApi) => {
                    return (Number(a.price) || 0) - (Number(b.price) || 0)
                })
                break
            case "По навзванию (А-Я)":
                res = product.sort((a: ICardApi, b: ICardApi) => {
                    return a?.name?.localeCompare(b?.name)
                })
                break
            case "По названию (Я-А)":
                res = product.sort((a: ICardApi, b: ICardApi) => {
                    return b?.name?.localeCompare(a?.name)
                })
                break
        }
        console.log(res)
        if (!searchParams.get("sort") || searchParams.get('sort')!=type) {
            searchParams.set("sort", type)
            setSearchParams(searchParams.toString())
        }
        dispatch(addPost(res || []))
    }

    useEffect(() => {
        const res = url.get("sort")
        
        if (res) {
            sortProduct(res)
        }
    }, [])

    return (
        <div className="Sort">
            <p>
                Сортировка:{" "}
                <span onClick={() => setVisble((p) => !p)}>{sortType}</span>
            </p>
            {visible && (
                <div className="Sort__toggle">
                    <p
                        onClick={() => {
                            sortProduct("По убыванию цены")
                        }}
                    >
                        По убыванию цены
                    </p>
                    <p
                        onClick={() => {
                            sortProduct("По возрастанию цены")
                        }}
                    >
                        По возрастанию цены
                    </p>
                    <p
                        onClick={() => {
                            sortProduct("По навзванию (А-Я)")
                        }}
                    >
                        По навзванию (А-Я)
                    </p>
                    <p
                        onClick={() => {
                            sortProduct("По названию (Я-А)")
                        }}
                    >
                        По названию (Я-А)
                    </p>
                </div>
            )}
        </div>
    )
}

export default Sort
