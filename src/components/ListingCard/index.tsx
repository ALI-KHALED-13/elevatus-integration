import { Link } from "react-router-dom"
import { IListingCardProps } from "./types"
import Tag from "../Tag"
import "./styles.css"


const ListingCard =({
  title,
  tags,
  location,
  linkProps
}: IListingCardProps)=> {

  return (
    <Link {...linkProps}>
      <li className="listing-card">
        <h3 className="listing-card__title">{title}</h3>
        {location?.country && <p className="listing-card__country">{location?.country}</p>}
        {tags.map((tag, idx)=> (
          <Tag
            text={tag}
            key={idx}
          />
        ))}
      </li>
    </Link>
  )
}

export default ListingCard