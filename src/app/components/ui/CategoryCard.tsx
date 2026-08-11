import Link from "next/link";
import Image from "next/image";

type CategoryCardProps = {
    title: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
    variant?: "public" | "user";
};

export default function CategoryCard({
    title,
    imageSrc,
    imageAlt,
    href,
    variant = "user"
}: CategoryCardProps) {
    const isUserVariant = variant === "user";
    const imageStyle = isUserVariant
        ? "size-[110px] rounded-[28px]"
        : "aspect-4/5 w-full max-w-[220px] rounded-[30px]";
    const imageSizes = isUserVariant
        ? "110px"
        : "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px";

    return(
        <Link
          href={href}
          className="group flex flex-col items-center">
            <div
              className="
              relative overflow-hidden
              bg-[#f4f1ff]
              shadow-[0_12px_25px_rgba(23,43,88,0.25)]
              transition duration-300
              group-hover:-translate-y-2
              group-hover:shadow-[0_18px_35px_rgba(23,43,88,0.35)]
              ${imageStyle}">
                <Image 
                 src={imageSrc}
                 alt={imageAlt}
                 fill
                 sizes={imageSizes}
                 className="object-cover"/>
            </div>
            <h3 className="mt-5 text-center text-xl font-bold text-[#37276f]">
                {title}
            </h3>
        </Link>
    )
}