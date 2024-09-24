'use client'

import React from 'react'

import { AuthProvider } from '../_providers/Auth'
import { CartProvider } from '../_providers/Cart'
<<<<<<< HEAD
import { FilterProvider } from './Filter'
=======
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
<<<<<<< HEAD
        <FilterProvider>
          <CartProvider>{children}</CartProvider>
        </FilterProvider>
=======
        <CartProvider>{children}</CartProvider>
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
      </AuthProvider>
    </ThemeProvider>
  )
}
