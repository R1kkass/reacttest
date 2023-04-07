import { FC, useState } from "react"
import { createPortal } from "react-dom"
import MyButton from "../Buttons/MyButton/MyButton"
import './Modal.scss'

const Modal: FC<{
    children: React.ReactNode
    visible: boolean
    callback?: () => void
}> = ({ visible, children, callback }) => {
    return (
        
        <>
        {visible ? 
        createPortal(
            <div className="Modal" onClick={callback}>
            <div className="Modal__content" onClick={(e:React.MouseEvent)=>e.stopPropagation()}>{children}</div>
        </div>,
            document.body
        )
        :''
        }
        </>
    )
}

export default Modal
