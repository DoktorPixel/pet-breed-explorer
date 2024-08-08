import { useState } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  breed: any;
  apiBaseUrl: string;
}

export const ImageWithFallback = ({
  breed,
  apiBaseUrl,
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(
    `${apiBaseUrl}/${breed?.reference_image_id}.jpg`
  );

  const handleError = () => {
    setImgSrc("https://acmilan.matchwornshirt.com/broken-image-fallback.png");
  };

  return (
    <Image
      src={imgSrc}
      alt={breed?.name}
      className="w-full h-64 object-cover"
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
