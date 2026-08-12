import Image from "next/image"
import Link from "next/link"

type CollectionCardProps = {
    imageSrc : string;
    imageAlt : string;
    href : string;
}

export default function CollectionCard({
    imageSrc,
    imageAlt,
    href,
}:CollectionCardProps) {
    return(
        <Link href={href}>
            <div 
              className="
               relative aspect-[7/5] w-full max-w-[280px]
               overflow-hidden rounded-[30px]
               transition duration-300
               hover:-translate-y-2
               hover:shadow-[0_18px_35px_rgba(23,43,88,0.3)]">
                <Image 
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="280px"
                  className="object-cover"/>
            </div>
        </Link>
    )
}