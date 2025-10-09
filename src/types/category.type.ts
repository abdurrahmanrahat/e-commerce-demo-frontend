export type TCategory = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  subCategories: TSubCategory[];
};

export type TSubCategory = {
  _id: string;
  name: string;
  slug: string;
};
