import { carouselQuery } from "@/app/api/generateSanityQueries";
import { fetchPageData } from "@/app/api/useFetchPage";
import { IWork } from "@/data.d";

export const getCarouselData = async (workType?: string) => {
  const type = "carousel";
  const carouselQueryData = carouselQuery(workType);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const carouselData: IWork[] = await fetchPageData(carouselQueryData);
  return carouselData;
};
