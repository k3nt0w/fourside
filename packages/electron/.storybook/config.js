import { configure, addParameters, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import { globalTheme } from 'ui-components'

addParameters({
  backgrounds: [
    {
      name: 'primary',
      value: `${globalTheme.palette.background.default}`,
      default: true
    },
    { name: 'white', value: 'white' }
  ]
})

addDecorator(withKnobs)
addDecorator(muiTheme([globalTheme]))

// automatically import all files ending in *.stories.tsx
configure(require.context('../src', true, /\.stories\.tsx$/), module)
