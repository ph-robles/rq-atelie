"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TestSupabase() {
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        supabase
            .from("products")
            .select("*")
            .then((res) => {
                console.log("SUPABASE RESPONSE:", res)
                setData(res.data)
                setError(res.error)
            })
    }, [])

    return (
        <pre style={{ padding: 20 }}>
            {JSON.stringify({ data, error }, null, 2)}
        </pre>
    )
}