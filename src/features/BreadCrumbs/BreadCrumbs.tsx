import { FC } from "react";
import { Link } from "react-router-dom";
import './BreadCrumbs.scss'
import crumb from '../../shared/UI/SVG/Crumbs/Crumb.svg'

interface IArrs{
    arr:TArr[]
}
type TArr={
    name:string,
    link: string
}

const Breadcrumbs:FC<IArrs> = ({arr}) => {
  
    return (
      <div className="BreadCrumbs">
        {arr.map(({name, link})=>(
            <Link key={link} to={`${link}`}>
                {name} <img src={crumb}/> {''}
            </Link>
        )
        )}
      </div>
    );
  };
  
  export default Breadcrumbs;