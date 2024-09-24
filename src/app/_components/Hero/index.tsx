import React from 'react'

import { Page } from '../../../payload/payload-types'
<<<<<<< HEAD
import { CustomHero } from '../../_heros/CustomHero'
=======
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
import { HighImpactHero } from '../../_heros/HighImpact'
import { LowImpactHero } from '../../_heros/LowImpact'
import { MediumImpactHero } from '../../_heros/MediumImpact'

const heroes = {
  highImpact: HighImpactHero,
  mediumImpact: MediumImpactHero,
  lowImpact: LowImpactHero,
<<<<<<< HEAD
  customHero: CustomHero,
=======
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
}

export const Hero: React.FC<Page['hero']> = props => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
