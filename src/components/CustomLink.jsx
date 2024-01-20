import React from 'react'
import { Link } from "react-router-dom";

export default function CustomLink({to,children}) {
  return (
    <Link to={to} className="transition dark:text-dark-subtle dark:hover:text-white hover:text-secondary">{children}</Link>
  )
}
