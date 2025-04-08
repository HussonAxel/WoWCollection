"use client"

import { useState } from "react";
import { useTRPC } from "@/utils/trpc"; // Correct import based on your example
import { useQuery } from "@tanstack/react-query"; // Correct import

export default function BlizzardPlayableClasses() {
    const [region, setRegion] = useState("us")
    const [locale, setLocale] = useState("en_US"); // Add state for locale if needed
    const trpc = useTRPC();

    const playableClassesQuery = useQuery(
        trpc.blizzard.getPlayableClassesIndex.queryOptions(
            {region, locale},
            {
                staleTime: 5 * 60 * 1000,
            }
        )
    )

    return (
        <div> 
            <h1>
                WoW Playable classes : 
            </h1>
            <section>
            {playableClassesQuery.isLoading && <p>Loading classes...</p>}
            {playableClassesQuery.isError && (
                <p>Error loading playable classes : {playableClassesQuery.error.message}</p>
            )}
            {playableClassesQuery.isSuccess && (
                <div>
                    <h2> Classes : </h2>
                    <ul>
                        {(playableClassesQuery.data as any)?.classes?.map((wowClass: any) => (
                            <li key={wowClass.id}>
                                {wowClass.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            </section>
        </div>
    )
}