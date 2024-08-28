// Define the type for a carousel item
interface CarouselItem {
  image: string;
  path: string;
  title: string;
}

// Define the data with the correct types
export const homeCarouselData: CarouselItem[] = [
  {
    image: "https://i.ibb.co/LkDZhTR/2.png",
    path: "/movie/Watch?category=Watch",
    title: "Watch Movie",
  },
  {
    image: "https://i.ibb.co/kgyXp2c/1.png",
    path: "/anime/Watch?category=top",
    title: "Top Anime",
  },
  {
    image: "https://i.ibb.co/mzT1JHw/3.png",
    path: "/movie/Watch?category=Watch",
    title: "Watch Again",
  },
];
