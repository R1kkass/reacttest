import "./Catalog.scss"

import rows from "../../shared/UI/SVG/TypeRender/Rows.svg"
import block from "../../shared/UI/SVG/TypeRender/Block.svg"
import LeftBlockCatalog from "../../widgets/LeftBlockCatalog/LeftBlockCatalog"
import Card from "../../entities/Card/Card"
import PostCard from "../../features/PostCard/PostCard"
import Breadcrumbs from "../../features/BreadCrumbs/BreadCrumbs"
import Sort from "../../widgets/Sort/Sort"
import FilterTop from "../../shared/UI/Filter/FilterTop"
import Pagination from "../../widgets/Pagination/Pagination"

const Catalog = () => {
    return (
        <div data-testid='main-page' className="Catalog">
            <div className="Catalog__broadCrumbs">
                <Breadcrumbs arr={[{ name: "Каталог", link: "/" }]} />
            </div>
            <div className="Catalog__secondLine">
                <div>
                    <h1>Косметика и гигиена</h1>
                </div>
                <div className="Catalog__sort">
                    <div>
                        <Sort />
                    </div>
                    <div className="Catalog__toggle">
                        <button>
                            <img src={rows} />
                        </button>
                        <button>
                            <img src={block} />
                        </button>
                    </div>
                </div>
            </div>
            <FilterTop />
            <div className="Catalog__main">
                <div className="Catalog__sortParams">
                    <LeftBlockCatalog />
                </div>
                <div className="Catalog__product">
                    <PostCard />
                    <Pagination />
                </div>
            </div>
        </div>
    )
}

export default Catalog
