import React from 'react'

import { renderMdast } from 'mdast-react-render'
import visit from 'unist-util-visit'
import { fontFamilies } from '@project-r/styleguide'

import { css } from 'glamor'
import 'glamor/reset'

css.global('html', { boxSizing: 'border-box' })
css.global('*, *:before, *:after', { boxSizing: 'inherit' })

css.global('body', {
  width: '100%',
  fontFamily: fontFamilies.sansSerifRegular
})

const Render = ({ mdast, schema }) => {
  return renderMdast(mdast, schema)
}

export default Render
