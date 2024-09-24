import React from 'react'

import classes from './index.module.scss'

const defaultLabels = {
<<<<<<< HEAD
  singular: 'Doc',
  plural: 'Docs',
}

const defaultCollectionLabels = {
  products: {
    singular: 'Product',
    plural: 'Products',
=======
  plural: 'Docs',
  singular: 'Doc',
}

const defaultCollectionLabels = {
  posts: {
    plural: 'Products',
    singular: 'Product',
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
  },
}

export const PageRange: React.FC<{
  className?: string
<<<<<<< HEAD
  totalDocs?: number
  currentPage?: number
  collection?: string
  limit?: number
  collectionLabels?: {
    singular?: string
    plural?: string
  }
}> = props => {
  const {
    className,
    totalDocs,
    currentPage,
    collection,
    limit,
    collectionLabels: collectionLabelsFromProps,
  } = props

  const indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const { singular, plural } =
=======
  collection?: string
  collectionLabels?: {
    plural?: string
    singular?: string
  }
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = props => {
  const {
    className,
    collection,
    collectionLabels: collectionLabelsFromProps,
    currentPage,
    limit,
    totalDocs,
  } = props

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const { plural, singular } =
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
    collectionLabelsFromProps || defaultCollectionLabels[collection || ''] || defaultLabels || {}

  return (
    <div className={[className, classes.pageRange].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && 'Search produced no results.'}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
<<<<<<< HEAD
        `Showing ${indexStart} - ${indexEnd} of ${totalDocs} ${totalDocs > 1 ? plural : singular}`}
=======
        `Showing ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ''} of ${totalDocs} ${
          totalDocs > 1 ? plural : singular
        }`}
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
    </div>
  )
}
