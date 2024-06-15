import Image from "next/image";

interface PromoBannerProps {
  src: string;
  alt: string;
}

const PromoBanner = ({ src, alt }: PromoBannerProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      height={0}
      width={0}
      className="h-auto w-full object-contain"
      sizes="100%"
      quality={100}
    />
  );
};

export default PromoBanner;
