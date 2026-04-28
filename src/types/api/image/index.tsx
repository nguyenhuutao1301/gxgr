type CreateImageResult = {
  success?: boolean;
  message?: string;
  error?: string;
  path: string;
};
type DeletedImageResult = {
  success: boolean;
  message: string;
  error: string;
};
type Image = {
  _id: string;
  filePath: string;
};
type ImageResult = {
  success: boolean;
  message: "success" | "error" | "not found";
  images: Image[];
};
export type { CreateImageResult, DeletedImageResult, ImageResult, Image };
