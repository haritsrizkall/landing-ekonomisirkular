import Head from 'next/head'
import Image from 'next/image'
import About from '../components/landing/about'
import Explore from '../components/landing/explore'
import Footer from '../components/footer'
import Header from '../components/landing/header'
import LetsAssesment from '../components/landing/letsassesment'
import NewsIdeas from '../components/landing/newsideas'
import Research from '../components/landing/research'
import Statistics from '../components/landing/statistics'
import NavbarLanding from '../components/navbar/navbar-landing'
import Hero from '../components/landing/hero'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from 'react'
import axios from 'axios'
import { constant } from '../constant'
import landingApi from '../api/landing'
import { useMutation, useQuery } from 'react-query'
import Loader from '../components/loader'
import sliderApi from '../api/slider'
import ImageAPI from '../api/image'
import { async } from 'regenerator-runtime'
import postAPI from '../api/post'
import { visitorAPI } from '../api/visitor'

export default function Home({newsIdeas, research}) {
  const { isError, isLoading, data: landings, status, error } = useQuery("landings", landingApi.getAllView);
  const { isError: isError2, isLoading: isLoading2, data: sliders, status: status2, error: error2 } = useQuery("sliders", sliderApi.getAll);
  const { isError: isError3, isLoading: isLoading3, data: images, status: status3, error: error3 } = useQuery("imagesLanding", ImageAPI.getPerPage);
  const visitMutation = useMutation(visitorAPI.visit, {
    onSuccess: (data) => {
        console.log("visit success");
    },
    onError: (error) => {
        console.log("visit error");
    }
  });
  
  useEffect(() => {
      visitMutation.mutate();
  }, []);

  if (isLoading || isLoading2 || isLoading3) {
    return (
      <div className='bg-white w-screen box-border overflow-x-hidden'>
        <NavbarLanding/>
        <Loader isVisible={isLoading && isLoading2 && isLoading3}/>
      </div>
    )
  }
    
  return (
    <>
    <Head>
      <title>Ekonomi Sirkular ID</title>
      <meta name='description' content='Ekonomi Sirkular ID merupakan platform pertama di Indonesia yang berfokus pada edukasi terkait pentingnya transformasi menuju ekonomi yang lebih berkelanjutan' />
      <meta name='title' content='Ekonomi Sirkular ID' />
      <meta name="robots" content="index, follow" />
    </Head>
    <div className='bg-white w-screen box-border overflow-x-hidden'>
      <NavbarLanding/>
      <Hero HeroContent={landings ? landings.hero : null} SliderContent={sliders ? sliders : null}/>
      <About AboutContent={landings ? landings.about : null} />
      <Statistics StatisticsContent={landings ? landings.statistics : null}/>
      <Explore ExploreContent={landings ? landings.explore : null} ImageContent={images ? images.landing : null}/>
      {
        newsIdeas && (
          <NewsIdeas newsIdeas={newsIdeas}/>
        )
      }
      {
        research && (
          <Research research={research}/>
        )
      }
      <LetsAssesment 
        backgroundImage={images ? images.landing[1] : null}
        assesmentText={landings ? landings.letsassesment[0].content : null}
      />
      <Footer/>
    </div>
    </>
  )
}

export async function getStaticProps() {
  try {
    const newsIdeas = await postAPI.getPosts([1, 2], 1, 1)
    const research = await postAPI.getPosts([3], 1, 1)

    return {
      props: {
          newsIdeas: newsIdeas.data.length > 0 ? newsIdeas.data[0] : null,
          research: research.data.length > 0 ? research.data[0]: null,
          statusCode: 200
      },
      revalidate: 60
    }
  } catch (error) {
    return {
      props: {
          newsIdeas: {},
          research: {},
          statusCode: 500
      },
      revalidate: 60
  }
  }
}

