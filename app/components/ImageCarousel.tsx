// app/components/ImageCarousel.tsx
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type Props = {
    images: string[]
    interval?: number
}

export default function ImageCarousel({ images, interval = 5000 }: Props) {
    const [current, setCurrent] = useState(0)
    const [progress, setProgress] = useState(0)

    // Troca de slide
    useEffect(() => {
        const id = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length)
            setProgress(0)
        }, interval)

        return () => clearInterval(id)
    }, [images.length, interval])

    // Barra de progresso
    useEffect(() => {
        setProgress(0)
        const start = performance.now()

        const tick = (now: number) => {
            const elapsed = now - start
            const pct = Math.min((elapsed / interval) * 100, 100)
            setProgress(pct)
            if (pct < 100) requestAnimationFrame(tick)
        }

        const raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [current, interval])

    return (
        <div className="carousel">

            {/* ── Slides ── */}
            {images.map((src, i) => (
                <div
                    key={src}
                    className={`carousel-slide ${i === current ? "carousel-slide--active" : ""}`}
                >
                    <Image
                        src={src}
                        alt={`Foto ${i + 1}`}
                        fill
                        priority={i === 0}
                        sizes="50vw"
                        style={{ objectFit: "cover" }}
                        className={`carousel-img ${i === current ? "carousel-img--zoom" : ""}`}
                    />
                </div>
            ))}

            {/* ── Indicadores ── */}
            <div className="carousel-indicators">
                {images.map((_, i) => (
                    <button
                        key={i}
                        className="carousel-indicator"
                        onClick={() => { setCurrent(i); setProgress(0) }}
                        aria-label={`Slide ${i + 1}`}
                    >
                        <span
                            className="carousel-indicator-fill"
                            style={{
                                width: i === current
                                    ? `${progress}%`
                                    : i < current ? "100%" : "0%",
                            }}
                        />
                    </button>
                ))}
            </div>

        </div>
    )
}
