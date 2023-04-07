import { createPortal } from "react-dom"
import "./Loader.scss"

const Loader = () => {
    return (
        <>
            {createPortal(
                <div data-testid="loader" className="Loader">
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}

export default Loader
