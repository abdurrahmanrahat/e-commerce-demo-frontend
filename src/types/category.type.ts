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

export type TCategoryUploadData = {
  name: string;
  slug: string;
  image: string | null;
  subCategoryOf: string | null;
};
