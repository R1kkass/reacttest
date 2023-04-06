import { FC, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import {
    FilterApi,
    FilterApiPut,
    IArray,
    IFilterApi,
    IFilterApiData,
} from "../../shared/api/FilterApi"
import Modal from "../../shared/UI/Modal/Modal"
import "./EditModal.scss"

interface IModalEditPanel {
    visible: boolean
    setVisible: (bol: boolean) => void
    post?: IFilterApi
    callback: () => void
}

const ModalEditPanel: FC<IModalEditPanel> = ({
    callback,
    post,
    visible,
    setVisible,
}) => {
    const [type, setType] = useState<IArray[]>(post?.array || [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFilterApi>()

    const onSubmit = (data: IFilterApi) => {
        console.log(post)
        let dat = { ...data, array: type }
        FilterApiPut(Number(post?.id) || 0, dat).then((e) => {
            callback()
            setVisible(false)
        })
    }
    const refType = useRef<HTMLInputElement>(null)

    const addType = () => {
        if (refType?.current?.value) {
            setType([...type, { name: refType.current.value }])
        }
    }

    useEffect(() => {
        setType(post?.array || [])
    }, [post])

    const delte = (id: number) => {
        setType(
            type?.filter((key, i) => {
                return i != id
            })
        )
    }

    return (
        <Modal visible={visible} callback={() => setVisible(false)}>
            <div className="ModalAdd__form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>
                            Название
                            <input
                                defaultValue={post?.title}
                                placeholder="Название"
                                {...register("title", {
                                    required: "⚠ Введите название",
                                    maxLength: 30,
                                })}
                            />
                        </label>
                        <p className="Error">{errors?.title?.message}</p>
                    </div>
                    <div>
                        <label>
                            Название
                            <input ref={refType} placeholder="Тип" />
                        </label>
                        <div className="EditModal__params">
                            {type?.map((key, i) => (
                                <div key={key.name + i}>
                                    <p>{key.name}</p>
                                    <button onClick={() => delte(i)}>Х</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {Object.keys(errors).length || type.length ? (
                        <span>Поля пусты</span>
                    ) : (
                        ""
                    )}
                    <button onClick={(e) => {addType();e.preventDefault()}}>Добавить в тип</button>

                    <input type="submit" />
                </form>
            </div>
        </Modal>
    )
}

export default ModalEditPanel
