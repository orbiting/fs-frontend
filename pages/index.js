import React, { Component } from 'react'

import { Loader } from '@project-r/styleguide'
import { withRouter } from 'next/router'

import fetch from 'isomorphic-unfetch'


import createArticleSchema from '@project-r/styleguide/lib/templates/Article'
import createFrontSchema from '@project-r/styleguide/lib/templates/Front'

import Render from '../components/Render'

import { PUBLIC_BASE_URL } from '../lib/constants'

const schemas = {
  article: createArticleSchema(),
  front: createFrontSchema()
}

class FsArticle extends Component {
  static async getInitialProps ({ query }) {
    const res = await fetch(`${PUBLIC_BASE_URL}/mdast/${query.repo}`)
    const mdast = await res.json()

    return {
      mdast
    }
  }
  render () {
    const { mdast } = this.props
    return <Loader loading={!mdast} render={() => (
      <Render mdast={mdast} schema={schemas[mdast.meta.template]} />
    )} />
  }
}

export default FsArticle
