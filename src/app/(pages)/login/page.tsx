import React from 'react'
import { Metadata } from 'next'
<<<<<<< HEAD
import Image from 'next/image'
import Link from 'next/link'
=======
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import LoginForm from './LoginForm'

import classes from './index.module.scss'

export default async function Login() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent('You are already logged in.')}`,
  })

  return (
<<<<<<< HEAD
    <section className={classes.login}>
      <div className={classes.heroImg}>
        <Link href="/">
          <Image
            src="/logo-black.svg"
            alt="logo"
            width={250}
            height={23}
            className={classes.logo}
          />
        </Link>
      </div>

      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <RenderParams className={classes.params} />

          <div className={classes.formTitle}>
            <h3>Welcome</h3>
            <Image src="/assets/icons/hand.png" alt="hand" width={30} height={30} />
          </div>

          <p>Please login here</p>

          <LoginForm />
        </div>
      </div>
    </section>
=======
    <Gutter className={classes.login}>
      <RenderParams className={classes.params} />
      <h1>Log in</h1>
      <LoginForm />
    </Gutter>
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
  )
}

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login or create an account to get started.',
  openGraph: mergeOpenGraph({
    title: 'Login',
    url: '/login',
  }),
}
