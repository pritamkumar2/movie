import { Pattern } from "@/components/ui/pattern";
import { SiteHeader } from "@/components/navbar/site-header";
import * as Craft from "@/components/ui/craft";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getInfoURL } from "@/config/url";
import DetailsContainer from "@/components/containers/movie/details";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { HomeFeatures } from "@/components/features";
import Image from "next/image";
import Trending from "@/components/sections/anime/trending";
import { HomeBannerCarousel } from "@/components/banner/Carousel";
import MovieSearch from "@/components/searchAll/searchAll";
type Post = {
  title: string;
  content: React.ReactNode;
  date: string;
};

const posts: Post[] = [
  {
    title: "Enjoytown v2 Released!",
    content: (
      <>
        <p>
          Hey EnjoyTown users! In the past few months we have worked day and night for v2 of EnjoyTown. 
          Here are some of the main changes:
        </p>
        <ul>
          <li>- Manga has been added</li>
          <li>- Improved UI and speed for a better experience</li>
          <li>- Added more providers for movies and TV shows</li>
        </ul>
      </>
    ),
    date: "2024-07-24",
  },
  {
    title: "Exciting Updates Ahead!",
    content: (
      <>
        <p>
          Hey movie-watch fans! We&apos;ve got some thrilling news to share with you.
          Get ready for some major upgrades coming your way:
        </p>
        <ul>
          <li>- A fresh new UI design for a more immersive experience</li>
          <li>- Improved performance for seamless streaming</li>
          <li>- Expanded library with even more movies, series, and animes</li>
        </ul>
        <p>
          Stay tuned for these exciting updates and more! We can&apos;t wait to enhance your streaming experience on EnjoyTown.
        </p>
      </>
    ),
    date: "2024-08-05",
  },
];

const getTrendingMovies = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=e39d4404bc82afa196d49c77c4e4fcfa&region=IN`
    );

    if (!res.ok) {
      throw new Error(`Error fetching trending movies: ${res.statusText}`);
    }

    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("No trending movies found.");
    }

    // Filter the movies to include only those with Indian origin or specific genres
    const indianMovies = data.results.filter((movie: any) => {
      const isIndianLanguage =
        movie.original_language === "hi" || // Hindi language
        movie.original_language === "ta" || // Tamil language
        movie.original_language === "te"; // Telugu language

      const hasIndianGenres = movie.genre_ids.includes(18); // Example: Genre ID 18 is for Drama, common in Indian cinema

      return isIndianLanguage || hasIndianGenres;
    });

    return indianMovies.slice(0, 9); // Return the top 9 Indian movies
  } catch (error) {
    console.error(error);
    return []; // Return an empty array if there's an error
  }
};

export default async function Home() {
  const id = "801688";
  const data = await get_movie_info(id);
  const trendingMovies = await getTrendingMovies();

  return (
    <>
      <Pattern variant="checkered" />
      <SiteHeader />
      <div className="mx-auto max-w-4xl p-4">
        <section className="flex h-[75vh] items-center md:h-[50vh]">
          <div className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-6xl font-bold">
              Explore movies, TV series, and animes!
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">
              EnjoyTown is a streaming platform for people who like to
              <br />
              watch millions of movies, series, and animes for free. Go down to
              watch.
            </p>
            <div className="flex gap-2">
              <Button disabled>
                <Link href={`/auth/register`}>working up</Link>
              </Button>
              <Link href={`/changelog`}>
                <Button variant="outline">Changelog</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <section className="pb-12 py-8">
        <div className="mx-auto aspect-auto w-full max-w-6xl overflow-hidden rounded-md border bg-background shadow-lg dark:shadow-none md:aspect-">
          <Suspense fallback={<Skeleton className="h-full w-full" />}>
            <DetailsContainer data={data} id={id} embed />
          </Suspense>
        </div>
      </section>

      <section>
        <HomeBannerCarousel/>
      </section>

      {/* Trending Movies Section */}
      <section className="pb-12 py-8">
      <div className="flex justify-center mt-8 mb-16 text-4xl"> <h3>Latest Trending movie</h3> </div>

        <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-md border bg-background shadow-lg dark:shadow-none">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 gap-4">
            {trendingMovies.map((movie :any, index:any) => (
              <Link href={`/movie/${encodeURIComponent(movie.id)}`} key={index}>
                <div className="text-center items-center hover:scale-105 transition-all duration-300">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    width={160}
                    height={240}
                    className="h-auto w-full object-cover transition-all aspect-[3/4] rounded-md"
                    alt={movie.title}
                  />
                  <h3 className="text-sm font-semibold mt-2">
                    {movie.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href={`/movie`}>
              <Button variant="outline">More</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* {search section} */}
      
      <section>
<MovieSearch/>
      </section>

      {/* {trending anime section} */}

<section>
<div className="flex justify-center mt-8 mb-16 text-4xl"> <h3>Latest Trending Anime</h3> </div>
  <Trending/>

  <div className="flex justify-center mt-8">
            <Link href={`/anime`}>
              <Button variant="outline">More</Button>
            </Link>
          </div>
</section>
      <HomeFeatures />
      <section className="space-y-8">
        <Craft.Section>
          <Craft.Container>
            <section className="py-8" id="posts">
              <div className="mx-auto max-w-6xl space-y-8">
                <div className="flex flex-col items-center space-y-2">
                  <h2 className="text-2xl font-bold">Latest Posts</h2>
                  <p className="w-2/3 text-center text-muted-foreground">
                    Find out the latest info on what has been updated.
                  </p>
                </div>
              </div>
            </section>
            {posts.map((post, index) => (
              <div
                key={index}
                className="rounded-lg border bg-gradient-to-b from-transparent to-muted/30 p-6 shadow-md mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-sm">{post.date}</p>
                </div>
                {post.content}
              </div>
            ))}
          </Craft.Container>
        </Craft.Section>
      </section>
    </>
  );
}

const get_movie_info = async (id: any) => {
  const res = await fetch(getInfoURL(id), { next: { revalidate: 21620 } });
  const data = await res.json();
  return data;
};
