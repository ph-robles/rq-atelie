// app/components/CustomCursor.tsx
"use client"

import { useEffect, useRef } from "react"

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const dot = dotRef.current
        const ring = ringRef.current

        // ✅ early return garante que dot e ring não são null daqui pra baixo
        if (!dot || !ring) return

        let mouseX = 0
        let mouseY = 0
        let ringX = 0
        let ringY = 0
        let raf = 0

        function onMove(e: MouseEvent) {
            mouseX = e.clientX
            mouseY = e.clientY
            // ✅ dot foi verificado acima — seguro usar diretamente
            dot!.style.transform = `translate(${mouseX}px, ${mouseY}px)`
        }

        function animate() {
            ringX += (mouseX - ringX) * 0.12
            ringY += (mouseY - ringY) * 0.12
            // ✅ ring foi verificado acima — seguro usar diretamente
            ring!.style.transform = `translate(${ringX}px, ${ringY}px)`
            raf = requestAnimationFrame(animate)
        }

        function onEnter() { ring!.classList.add("cursor-ring--hover") }
        function onLeave() { ring!.classList.remove("cursor-ring--hover") }
        function onDown() { ring!.classList.add("cursor-ring--click") }
        function onUp() { ring!.classList.remove("cursor-ring--click") }

        const targets = "a, button, .product-card, .carousel-indicator, input"

        function attachHover() {
            document.querySelectorAll<HTMLElement>(targets).forEach((el) => {
                el.addEventListener("mouseenter", onEnter)
                el.addEventListener("mouseleave", onLeave)
            })
        }

        window.addEventListener("mousemove", onMove)
        window.addEventListener("mousedown", onDown)
        window.addEventListener("mouseup", onUp)
        attachHover()
        raf = requestAnimationFrame(animate)

        // Reanexa ao navegar entre páginas
        const observer = new MutationObserver(attachHover)
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener("mousemove", onMove)
            window.removeEventListener("mousedown", onDown)
            window.removeEventListener("mouseup", onUp)
            cancelAnimationFrame(raf)
            observer.disconnect()
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
            <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
        </>
    )
}
