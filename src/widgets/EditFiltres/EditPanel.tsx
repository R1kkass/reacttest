import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addPost } from "../../app/Redux/Store/product"
import {
    CardApi,
    DeleteCardApi,
    ICardApi,
    ICardData,
} from "../../shared/api/CardApi"
import {
    FilterApi,
    FilterApiDelte,
    FilterApiPut,
    IFilterApi,
    IFilterApiData,
} from "../../shared/api/FilterApi"
import Loader from "../../shared/UI/Loader/Loader"
import EditModal from "../ModalAdd/EditModal"
import ModalAdd from "../ModalAdd/ModalAdd"
import ModalAddFilter from "../ModalFilterEdit/ModalAddFilter"
import "../../pages/AdminPanel/AdminPanel.scss"
import ModalEditPanel from "../ModalEditPanel/ModalEditPanel"
import Toggle from "../../shared/UI/Toggle/Toggle"

const EditPanel = () => {
    const dispatch = useDispatch()
    const postPanel = useSelector((state: any) => state.product.posts)
    const [idEdit, setIdEdit] = useState<number>(0)
    const [visible, setVisible] = useState<boolean>(false)
    const [oneData, setOneData] = useState<IFilterApi>()
    const [loader, setLoader] = useState<boolean>(false)
    const [filtres, setFiltres] = useState<IFilterApi[]>([])

    const delte = (id: number) => {
        setLoader(true)
        FilterApiDelte(id).then(() => {
            FilterApi()
                .then((e: IFilterApiData) => {
                    setFiltres(e.data)
                    setLoader(false)
                })
                .catch(() => {
                    setLoader(false)
                })
        })
    }

    const fetchFilter = () => {
        setLoader(true)
        FilterApi()
            .then((e: IFilterApiData) => {
                setFiltres(e.data)
                setLoader(false)
            })
            .catch(() => {
                setLoader(false)
            })
    }

    useEffect(() => {
        setLoader(true)
        FilterApi()
            .then((e: IFilterApiData) => {
                setFiltres(e.data)
                setLoader(false)
            })
            .catch(() => {
                setLoader(false)
            })
    }, [])

    return (
        <div className="AdminPanel">
            {loader && <Loader />}
            <ModalAddFilter callback={fetchFilter} />
            <ModalEditPanel
                callback={fetchFilter}
                post={oneData}
                visible={visible}
                setVisible={() => setVisible(false)}
            />
            <div className="Filter">
                {filtres?.map(({ title, array, id }) => (
                    <>
                        <div className="Filter__block">
                            <div className="Filter__delete">
                                <h3>{title}</h3>
                                <div>
                                    {" "}
                                    <button
                                        onClick={() => delte(Number(id) || 0)}
                                    >
                                        Удалить фильтер
                                    </button>
                                    <button
                                        onClick={() => {
                                            setVisible(true)
                                            setOneData({ title, array, id })
                                        }}
                                    >
                                        Редактировать фильтер
                                    </button>
                                </div>
                            </div>
                            <Toggle nameBtn="Показать параметры">
                                {array?.map(({ name }) => (
                                    <div className="Filter__text">
                                        <p>{name}</p>
                                    </div>
                                ))}
                            </Toggle>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default EditPanel
