import { FC, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { ICardApi } from "../../shared/api/CardApi"
import {
    FilterApi,
    FilterApiPost,
    IArray,
    IFilterApi,
    IFilterApiData,
} from "../../shared/api/FilterApi"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import Modal from "../../shared/UI/Modal/Modal"

const ModalAddFilter: FC<{ callback: () => void }> = ({ callback }) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [paramFilter, setParamFilter] = useState<IArray[]>([])

    const refName = useRef<HTMLInputElement>(null)
    const refSize = useRef<HTMLInputElement>(null)

    const deleteCategory = (id: number) => {
        setParamFilter(
            paramFilter?.filter((param, i) => {
                return i != id
            })
        )
    }

    const addCategory = () => {
        if (refSize?.current?.value) {
            setParamFilter([...paramFilter, { name: refSize?.current?.value }])
            refSize.current.value = ""
        }
    }

    const addParam = () => {
        if (refName?.current?.value) {
            const r: IFilterApi = {
                title: refName?.current?.value || "",
                array: paramFilter,
            }
            FilterApiPost(r).then((e) => {
                setVisible(false)
                callback()
                setParamFilter([])
            })
        }
    }

    return (
        <>
            <MyButton onClick={() => setVisible(true)}>
                Добавить фильтер
            </MyButton>
            <Modal visible={visible} callback={() => setVisible(false)}>
                <div className="ModalAdd__form">
                    <form>
                        <div>
                            <label>
                                Название
                                <input placeholder="Название" ref={refName} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Подкатегория
                                <input
                                    placeholder="Подкатегория"
                                    ref={refSize}
                                />
                            </label>
                        </div>
                        <div className="EditModal__params">
                        {paramFilter?.map((key, i) => (
                            <div >
                                <label>{key.name}</label>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        deleteCategory(i)
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                addCategory()
                            }}
                        >
                            Добавить фильтер
                        </button>
                        <input
                            onClick={(e) => {
                                e.preventDefault()
                                addParam()
                            }}
                            type="submit"
                        />
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default ModalAddFilter
