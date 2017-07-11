import Head from 'next/head'

export default ({ title = 'Kickesport' }) => (
  <Head>
    <title>{ title }</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link rel="stylesheet" href="/static/stylesheets/style.css" />
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
  </Head>
)