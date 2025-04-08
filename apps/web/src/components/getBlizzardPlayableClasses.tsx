"use client"

import { useState } from "react";
import { useTRPC } from "@/utils/trpc"; // Correct import based on your example
import { useQuery } from "@tanstack/react-query"; // Correct import
import { Link } from "@tanstack/react-router";

export default function BlizzardPlayableClasses() {
    const [region] = useState("us")
    const [locale] = useState("en_US");
    const trpc = useTRPC();

    const playableClassesQuery = useQuery(
        trpc.blizzard.getPlayableClassesIndex.queryOptions(
            { region, locale },
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
                        <ul>
                            {(playableClassesQuery.data as any)?.classes?.map((wowClass: any) => (
                                <Link
                                    key={wowClass.id}
                                    params={{ classSlug: wowClass.name.toLowerCase() }}
                                    to="/classes/$classSlug"
                                    className="block hover:text-blue-500"
                                >
                                    <li>
                                        {wowClass.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        </div>
    )
}