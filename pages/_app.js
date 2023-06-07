import { useRouter } from 'next/router'
import Script from 'next/script'
import DashboardLayout from '../components/layouts/dashboard_layout'
import '../styles/globals.css'
import 'regenerator-runtime/runtime';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect } from 'react';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    }
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router.events]);
  
  if (router.pathname.includes('dashboard') && !router.pathname.includes('login') && !router.pathname.includes('register')) {
    return (
      <>
      <QueryClientProvider client={queryClient}>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </QueryClientProvider>
      </>
    )
  }
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
    </>
  )
}

export default MyApp
