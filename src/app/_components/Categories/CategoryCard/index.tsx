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
  console.log(media.url)

  return (
    <Link 
      href="/products" 
      className={classes.card} 
      onClick={() => setCategoryFilters([category.id])}
    >
      {media.url ? (
        <img src={media.url} alt={category.title} className={classes.image} />
      ) : (
        <div className={classes.placeholder}>No Image Available</div>
      )}
      <p className={classes.title}>{category.title}</p>

    </Link>
  )
}

export default CategoryCard;
