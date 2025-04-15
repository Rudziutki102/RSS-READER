import { useState } from "react"
import { LoaderCircle } from "lucide-react"

type ImageComponentProps = {
    src: string
    alt: string
}
const ImageComponent = ({ src, alt }: ImageComponentProps) => {
    const [loaded, setIsLoaded] = useState(false)
    return (
        <>
            <img
                className={`size-full object-cover ${loaded ? 'block' : 'hidden'}`}
                src={src}
                alt={alt}
                onLoad={() =>
                    setIsLoaded(true)
                }
            />
            {loaded ? null : (
                <div
                    className="flex justify-center items-center size-full"
                >
                    <LoaderCircle className="dark:text-white size-24 animate-spin" />
                </div>
            )}
        </>


    )
}

export default ImageComponent