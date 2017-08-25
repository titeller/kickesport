import Head from 'next/head'

export default ({ title = 'Kickesport', ogType = 'website', ogTitle = 'หาเพื่อน หาทีม เล่นเกมส์ Dota2 CS:GO Overwatch Rov', ogDesc = 'Kickesport สังคมของคนเล่นเกมส์', ogImage = 'https://res.cloudinary.com/kickesport/image/upload/v1503678929/cover-og_ez43pg.png' }) => (
  <Head>
    <title>{ title }</title>
    <link rel="shortcut icon" type="image/png" href="/static/favicon.ico"/>

    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta property="og:type" content={ogType} />
    <meta property="og:title" content={ogTitle} />
    <meta property="og:description" content={ogDesc} />
    <meta property="og:image" content={ogImage} />

    <link rel="stylesheet" href="/static/stylesheets/style.css" />
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
  </Head>
)