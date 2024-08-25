import React from "react"
import { Link, useParams, useLocation } from "react-router-dom"
//initilize useLocation

export default function VanDetail() {
    const params = useParams()
    const location = useLocation()
    //useLocation
    console.log(location)
    //console.log locatin just to see your filter activity
    
    const [van, setVan] = React.useState(null)

    React.useEffect(() => {
        fetch(`/api/vans/${params.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    }, [params.id])


    const search = location.state?.search || ""
    //assign search with "optional "Optional Chaining"
    
    return (
        <div className="van-detail-container">
            <Link
            // when you click :back to all vans, useLocation will be used for state 
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>
            
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}