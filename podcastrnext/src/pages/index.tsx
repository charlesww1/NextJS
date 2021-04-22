import { useEffect } from "react";
import { Header } from "../components/Header/index";
import { GetStaticProps } from 'next';

/* front desenvolvimento npm run dev
  front producao npm run start
   back npm run server 
   producao npm run build */


// 3 formar de usar API no React/Next
// SPA
// SSR
// SSG

  /* Usando SPA
  export default function Home(props) {
  useEffect(() => {
    fetch('http://localhost:3333/episodes')
      .then(Response => Response.json())
      .then(data => console.log(data))
    }, [])
  }
  */


  /*
    Usando SSR 
export async function getServerSideProps() {
      const response = await fetch('http://localhost:3333/episodes')
      const data = await response.json()
      return {
        props: {
          episodes: data, 
        }
      }
} 
    // Usando SSG
  export async function getStaticProps() {
    const response = await fetch('http://localhost:3333/episodes')
    const data = await response.json()
    return {
      props: {
        episodes: data, 
      },
      revalidate: 60 * 60 * 8,
    }
}
  */

type Episode = {
  id: string;
  title: string;
  members: string;
  //...
}

type HomeProps = {
  episodes: Array<Episode> // episodes: Episode[];
}

export default function Home(props: HomeProps) {

// console.log(props.episodes); | Aparecer json na tela

  return (
    <div>
    <h1>Index</h1>
    <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

  // Usando SSG com Tipagem
  export const getStaticProps: GetStaticProps = async() => {
    const response = await fetch('http://localhost:3333/episodes?_limit=12&_sort_published_at&_order=desc')
    const data = await response.json()
    return {
      props: {
        episodes: data, 
      },
      revalidate: 60 * 60 * 8,
    }
}

