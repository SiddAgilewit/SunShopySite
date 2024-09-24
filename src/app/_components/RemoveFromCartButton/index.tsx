import React from 'react'
<<<<<<< HEAD
import Image from 'next/image'
=======
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1

import { Product } from '../../../payload/payload-types'
import { useCart } from '../../_providers/Cart'

import classes from './index.module.scss'

export const RemoveFromCartButton: React.FC<{
  className?: string
  product: Product
}> = props => {
  const { className, product } = props

  const { deleteItemFromCart, isProductInCart } = useCart()

  const productIsInCart = isProductInCart(product)

  if (!productIsInCart) {
    return <div>Item is not in the cart</div>
  }

  return (
    <button
      type="button"
      onClick={() => {
        deleteItemFromCart(product)
      }}
      className={[className, classes.removeFromCartButton].filter(Boolean).join(' ')}
    >
<<<<<<< HEAD
      <Image
        src="/assets/icons/delete.svg"
        alt="delete"
        width={24}
        height={24}
        className={classes.qtnBt}
      />
=======
      Remove
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
    </button>
  )
}
