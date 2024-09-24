import React from 'react'
import { Metadata } from 'next'
<<<<<<< HEAD
import Image from 'next/image'
import Link from 'next/link'

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
=======

import { Gutter } from '../../_components/Gutter'
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { RecoverPasswordForm } from './RecoverPasswordForm'

import classes from './index.module.scss'

export default async function RecoverPassword() {
  return (
<<<<<<< HEAD
    <section className={classes.recoverPassword}>
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

          <Link href="/login" className={classes.backLink}>
            <Image src="/assets/icons/arrow-left.svg" alt="left arrow" width={24} height={24} />
            <p>Back</p>
          </Link>
          <div className={classes.formTitle}>
            <h3>Forgot Password</h3>
          </div>
          <RecoverPasswordForm />
        </div>
      </div>
    </section>
=======
    <Gutter className={classes.recoverPassword}>
      <RecoverPasswordForm />
    </Gutter>
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
  )
}

export const metadata: Metadata = {
  title: 'Recover Password',
  description: 'Enter your email address to recover your password.',
  openGraph: mergeOpenGraph({
    title: 'Recover Password',
    url: '/recover-password',
  }),
}
