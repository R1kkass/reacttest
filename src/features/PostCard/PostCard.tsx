import { Fragment, useContext, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux/es/exports"
import { useSearchParams } from "react-router-dom"
import { IRedux } from "../../app/Redux/Store/Index"
import { filterPost } from "../../app/Redux/Store/product"
import { CardApi, ICardApi, ICardData } from "../../shared/api/CardApi"
import Card from "../../entities/Card/Card"

const PostCard = () => {
    const dispatch = useDispatch()
    const post: ICardApi[] = useSelector((state: IRedux) => state.product.posts)
    const [searchPrams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (!searchPrams.get("page")) {
            searchPrams.set("page", "1")
            setSearchParams(searchPrams)
        }
        CardApi().then((e: ICardData) => {
            dispatch(filterPost(searchPrams))
            localStorage.setItem("products", JSON.stringify(e.data || "[]"))
        })
    }, [])

    if (!post.length) {
        return <h1>Пусто</h1>
    }

    return (
        <>
            {post?.map(
                ({
                    id,
                    imgURL,
                    name,
                    price,
                    manufacturer,
                    code,
                    brand,
                    size,
                }) => (
                    <Fragment key={id}>
                        <Card
                            id={id}
                            imgURL={imgURL}
                            name={name}
                            price={price}
                            manufacturer={manufacturer}
                            code={code}
                            brand={brand}
                            size={size}
                        />
                    </Fragment>
                )
            )}
        </>
    )
}

export default PostCard
