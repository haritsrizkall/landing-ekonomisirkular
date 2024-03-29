
import { Html, Head, Main, NextScript } from 'next/document'
const gtag = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_GA_MEASUREMENT_ID}`;


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
            <script async src={gtag} />
            <script 
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `
              }}
            />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}
