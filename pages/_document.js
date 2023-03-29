
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html style={{scrollBehavior:'smooth'}}>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
            />
            <title>Ekonomisirkular ID</title>
            <meta
              name='description'
              content='Ekonomi Sirkular ID merupakan platform pertama di Indonesia yang berfokus pada edukasi terkait pentingnya transformasi menuju ekonomi yang lebih berkelanjutan'
            />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}