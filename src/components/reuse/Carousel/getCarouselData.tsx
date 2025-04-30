import { carouselQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
import { IWork } from "@/data.d";

export const getCarouselData = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const carouselData: IWork[] = await useFetchPage(carouselQuery);

  return carouselData;
};

export const getCarouselImages = async () => {
  const data = await getCarouselData();

  // Flatten all customImages into a single array
  const allImages = data.flatMap((item) => item.images || []);

  return allImages;
};
