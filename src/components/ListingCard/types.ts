import { LinkProps } from "react-router-dom";


export interface IListingCardProps {
  title: string;
  tags: string[];
  linkProps: LinkProps & React.RefAttributes<HTMLAnchorElement>;
  location?: {
    country: string
  }
}