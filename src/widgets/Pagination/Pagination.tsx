import "./Pagination.scss"
import next from "../../shared/UI/SVG/Vector/Next.svg"
import prev from "../../shared/UI/SVG/Vector/Prev.svg"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ICardApi } from "../../shared/api/CardApi"
import { IRedux } from "../../app/Redux/Store/Index"
import { useSearchParams } from "react-router-dom"

const Pagination = () => {
    const [searchPrams, setSearchParams] = useSearchParams()
    const products = useSelector((state: IRedux) => state.product.posts)
    const rlen = useSelector((state: IRedux) => state.product.length)
    const [len, setLength] = useState<number[]>([])

    useEffect(() => {
        setLength(new Array(Math.ceil(rlen / 16)).fill(1))
    }, [products])

    const paginFn = (id: number) => {
        searchPrams.set("page", String(id))
        setSearchParams(searchPrams)
    }

    const paginNext = (num: number) =>{
        let page = Number(searchPrams.get("page"))
        
        if(page>1 && num<0){
            searchPrams.set('page', String(page + num))
            setSearchParams(searchPrams)
        }

        if(page<len.length && num>0){
            searchPrams.set('page', String(page + num))
            setSearchParams(searchPrams)
        }
    }

    return (
        <div className="Pagination">
            <button onClick={()=>paginNext(-1)} className="Pagination__button">
                <img src={prev} />
            </button>
            <div className="Pagination__pages">
                {len?.map((key, i) => (
                    <div
                        className={
                            searchPrams.get("page")?.includes(String(i + 1))
                                ? "Pagination__active"
                                : "Pagination__default"
                        }
                        onClick={() => paginFn(i + 1)}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            <button onClick={()=>paginNext(1)} className="Pagination__button">
                <img src={next} alt="" />
            </button>
        </div>
    )
}

export default Pagination