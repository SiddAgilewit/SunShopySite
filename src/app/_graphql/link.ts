interface Args {
  disableLabel?: true
  disableAppearance?: true
}

export const LINK_FIELDS = ({ disableAppearance, disableLabel }: Args = {}): string => `{
  ${!disableLabel ? 'label' : ''}
  ${!disableAppearance ? 'appearance' : ''}
  type
  newTab
  url
<<<<<<< HEAD
  icon {
    url
  }
=======
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
  reference {
    relationTo
    value {
      ...on Page {
        slug
      }
    }
  }
}`
