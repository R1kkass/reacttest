import { FC } from "react"
import { createPortal } from "react-dom"
import "./LeftBlockMobile.scss"

const LeftBlockMobile: FC<{
    children?: React.ReactNode
    visible: boolean
    setVisible: (bol: boolean) => void
}> = ({ children, visible, setVisible }) => {
    return (
        <>
            {visible
                ? createPortal(
                      <div onClick={()=>setVisible(false)} className="LeftBlockMobile">
                          <div onClick={(e)=>e.stopPropagation()} className="LeftBlockMobile__content">
                              {children}
                          </div>
                      </div>,
                      document.body
                  )
                : ""}
        </>
    )
}

export default LeftBlockMobile
