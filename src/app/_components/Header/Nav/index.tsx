'use client'

import React from 'react'
import Link from 'next/link'

<<<<<<< HEAD
import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
=======
import { Header as HeaderType, User } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  return (
<<<<<<< HEAD
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
=======
    <nav
      className={[
        classes.nav,
        // fade the nav in on user load to avoid flash of content and layout shift
        // Vercel also does this in their own website header, see https://vercel.com
        user === undefined && classes.hide,
      ]
        .filter(Boolean)
        .join(' ')}
    >
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="none" />
      })}
      <CartLink />
      {user && <Link href="/account">Account</Link>}
      {!user && (
<<<<<<< HEAD
        <Button
          el="link"
          href="/login"
          label="Login"
          appearance="primary"
          onClick={() => (window.location.href = '/login')}
        />
      )}
      {user && <CartLink />}
=======
        <React.Fragment>
          <Link href="/login">Login</Link>
          <Link href="/create-account">Create Account</Link>
        </React.Fragment>
      )}
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
    </nav>
  )
}
