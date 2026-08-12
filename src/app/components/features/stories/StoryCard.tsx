import Link from "next/link";
import Image from "next/image";

type StoryCardProps = {
    title : string;
    imageSrc : string;
    imageAlt : string;
    href : string;
}

export default function StoryCard({
    title,
    imageSrc,
    imageAlt,
    href,
}:StoryCardProps) {
    return(
        <Link 
          href={href}
          className="
           group block w-full max-w-[200px]
           overflow-hidden rounded-[30px]
           bg-[#fff1dc]
           shadow-[0_15px_25px_rgba(0,0,0,0.22)]
           transition duration-300
           hover:-translate-y-2
           hover:shadow-[0_22px_35px_rgba(0,0,0,0.28)]">
            <div className="relative aspect-[4/4.3] w-full overflow-hidden">
                <Image 
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 640px) 90vw, 410px"
                  className="object-cover transition duration-500 group-hover:scale-105"/>
            </div>

            <div className="flex min-h-[110px] items-center justify-center px-6 py-5">
                <p className="text-center text-2xl font-bold text-black">
                    {title}
                </p>
            </div>
         </Link>
    )
}