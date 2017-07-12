import Head from 'next/head'

export default ({ title = 'Kickesport', ogType = 'website', ogTitle = 'หาเพื่อน หาทีม เล่นเกมส์ Dota2 CSO Overwatch Rov', ogDesc = 'Kickesport สังคมของคนเล่นเกมส์', ogImage = 'https://res.cloudinary.com/kickesport/image/upload/v1499875403/Screen_Shot_2560-07-12_at_10.58.21_PM_n8tz6z.png' }) => (
  <Head>
    <title>{ title }</title>

    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta property="og:type" content={ogType} />
    <meta property="og:title" content={ogTitle} />
    <meta property="og:description" content={ogDesc} />
    <meta property="og:image" content={ogImage} />

    <link rel="stylesheet" href="/static/stylesheets/style.css" />
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
  </Head>
)