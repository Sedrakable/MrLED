import { ICustomImage } from "@/components/reuse/SanityImage/SanityImage";
import { IProject, IWork } from "@/data.d";

export const getRandomItemFromArray = (arr: any[]) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

// Function to shuffle array using Fisher-Yates algorithm

export const getImagesFromWorks = (data: IWork[]): ICustomImage[] => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }
  return data.flatMap((work) =>
    (Array.isArray(work.projects) ? work.projects : [])
      .map(
        (project: IProject) =>
          project?.image && ("image" in project ? project.image : null)
      )
      .filter((image): image is ICustomImage => image !== null)
  );
};
