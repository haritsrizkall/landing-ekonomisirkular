import { useRouter } from 'next/router'
import DashboardLayout from '../components/layouts/dashboard_layout'
import '../styles/globals.css'
import 'regenerator-runtime/runtime';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  const router = useRouter()
  
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
