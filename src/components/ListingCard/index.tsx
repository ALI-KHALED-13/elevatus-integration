import { Link } from "react-router-dom"
import { IListingCardProps } from "./types"
import Tag from "../Tag"



const ListingCard =({
  title,
  tags,
  location,
  linkProps
}: IListingCardProps)=> {

  return (
    <li>
      <Link {...linkProps}>
        <h3>{title}</h3>
      </Link>
      <p>{location?.country}</p>
      <hr />
      {tags.map((tag, idx)=> (
        <Tag
          text={tag}
          key={idx}
        />
      ))}
    </li>
  )
}

export default ListingCard