import { useState } from "react";
import Image from "next/image";

interface DynamicImageWithFallbackProps {
  breed: any;
  type: "dog" | "cat";
}

export const DynamicImageWithFallback = ({
  breed,
  type,
}: DynamicImageWithFallbackProps) => {
  const apiBaseUrl = `https://cdn2.${
    type === "dog" ? "thedogapi.com" : "thecatapi.com"
  }/images`;

  const [imgSrc, setImgSrc] = useState(
    breed?.reference_image_id
      ? `${apiBaseUrl}/${breed.reference_image_id}.jpg`
      : "https://acmilan.matchwornshirt.com/broken-image-fallback.png"
  );

  const handleError = () => {
    setImgSrc("https://acmilan.matchwornshirt.com/broken-image-fallback.png");
  };

  return (
    <Image
      src={imgSrc}
      alt={breed?.name}
      className="mx-auto w-auto h-auto max-h-[60vh] object-cover"
      width={500}
      height={500}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          handleError();
        }
      }}
      onError={handleError}
    />
  );
};
