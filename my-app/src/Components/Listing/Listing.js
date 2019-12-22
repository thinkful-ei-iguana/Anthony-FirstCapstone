import React from "react";
import "../../Styles/Listing.css";
import { Link } from "react-router-dom";

export default function Listing(props) {
  return (
    <div className="Results-item">
      <Link to={"/Listing/" + props.id}>{props.title}</Link>
      <div>{props.owner}</div>
      <div>{props.condition}</div>
      <div>{props.price}</div>
    </div>
  );
}
