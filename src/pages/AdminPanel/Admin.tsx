import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import AdminPanel from '../../widgets/AdminPanel/AdminPanel'
import EditPanel from '../../widgets/EditFiltres/EditPanel'
import './Admin.scss'

const elArr=[{
    id: 1,
    element: <AdminPanel/>
},
{
    id: 2,
    element: <EditPanel/>
}
]

const Admin = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [el, setEl] = useState<any>(null)

    const switchFn = (id: number)=>{
        let res = elArr.filter((el)=>{
            return el.id==id
        })
        setEl(res[0].element)
        searchParams.set('type', String(id))
        setSearchParams(searchParams)
    }

    useEffect(()=>{
        if(searchParams.get('type')){
            switchFn(Number(searchParams.get('type')))
        }
    },[])

    return (
        <div className="Admin">
            <div className="Admin__tabs">
                <div className={searchParams.get('type')=='1' ? 'Active' : ''} onClick={()=>switchFn(1)}>
                    <h3 >Продукты</h3>
                </div>
                <div className={searchParams.get('type')=='2' ? 'Active' : ''} onClick={()=>switchFn(2)}>
                    <h3>Категории</h3>
                </div>
            </div>
            <div className='Admin__window'>
                {el}
            </div>
        </div>
    )
}

export default Admin
