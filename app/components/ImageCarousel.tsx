"use client"

import { useEffect, useState } from "react"

type ImageCarouselProps = {
    images: string[]
    interval?: number
}

export default function ImageCarousel({
    images,
    interval = 4000,
}: ImageCarouselProps) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length)
        }, interval)

        return () => clearInterval(id)
    }, [images.length, interval])

    return (
        <div className="carousel">
            {images.map((src, i) => (
                <img
                    key={src}
                    src={src}
                    alt=""
                    className={`carousel-img ${i === index ? "active" : ""}`}
                />
            ))}
        </div>
    )
}
