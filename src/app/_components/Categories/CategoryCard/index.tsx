'use client'
import React from 'react'
import Link from 'next/link'

import { Category } from '../../../../payload/payload-types'
import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

type CategoryCardProps = {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const media = category.media as Media
  const { setCategoryFilters } = useFilter()

  return (
    <Link
      href="/products"
      className={classes.card}
      onClick={() => setCategoryFilters([category.id])}
    >
      <img
        src={media.url}
        alt={category.title}
        className={classes.image} // Add a class for styling if needed
      />
      <p className={classes.title}>{category.title}</p>
    </Link>
  )
}

export default CategoryCard
