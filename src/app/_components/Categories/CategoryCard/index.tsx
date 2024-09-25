'use client'
import React from 'react'
import Link from 'next/link'

import { Category, Media } from '../../../../payload/payload-types'
import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

type CategoryCardProps = {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const media = category.media as Media
  const { setCategoryFilters } = useFilter()
 

  return (
<<<<<<< HEAD
    <Link 
      href="/products" 
      className={classes.card} 
      onClick={() => setCategoryFilters([category.id])}
    >
      {media.url ? (
        <img src={media.url} alt={category.title} style={{height:"260px",width:"240px"}} />
      ) : (
        <div className={classes.placeholder}>No Image Available</div>
      )}
=======
    <Link
      href="/products"
      className={classes.card}
      onClick={() => setCategoryFilters([category.id])}
    >
      <img
        src={media.url}
        alt={category.title}
        className={classes.image} 
      />
>>>>>>> d343c9eed293f4e1db86c9904c1c68e365ed849a
      <p className={classes.title}>{category.title}</p>

    </Link>
  )
}

export default CategoryCard;
