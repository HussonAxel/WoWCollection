"use client"

import { useState } from "react";
import { useTRPC } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";

export default function PlayableClassDetailsComponent() {
    const { classSlug } = useParams({ from: "/classes/$classSlug" });
    const trpc = useTRPC();
    const [region] = useState("us");
    const [locale] = useState("en_US");

    const classesQuery = useQuery(
      trpc.blizzard.getPlayableClassesIndex.queryOptions(
        { region, locale },
        { staleTime: 60 * 60 * 1000 }
      )
    );

    const classId = (classesQuery.data as any)?.classes?.find(
      (c: any) => c.name.toLowerCase() === classSlug
    )?.id;

    const classDetailsQuery = useQuery(
      trpc.blizzard.getPlayableClassDetails.queryOptions(
        {
          classId: classId || 0,
          region: region,
          locale: locale,
        },
        {
          enabled: !!classId,
          staleTime: 60 * 60 * 1000,
          retry: (failureCount, error: any) => {
            if (error?.data?.code === "NOT_FOUND") {
              return false;
            }
            return failureCount < 3;
          },
        },
      ),
    );

    if (classesQuery.isLoading) {
      return (
        <div>
          <p>Loading class information...</p>
        </div>
      );
    }

    if (!classId) {
      return (
        <div>
          <p className="text-red-600">Invalid Class Name in URL.</p>
          <Link to="/classes" className="text-blue-500 hover:underline mt-2 block">
            &larr; Back to Classes List
          </Link>
        </div>
      );
    }

    return (
      <div>
        <Link to="/classes" className="text-blue-500 hover:underline mb-4 block">
          &larr; Back to Classes List
        </Link>

        {classDetailsQuery.isLoading && <p>Loading details for {classSlug}...</p>}

        {classDetailsQuery.isError && (
          <div>
            <h2 className="text-red-600 font-bold">Error loading class details</h2>
            <p>
              {classDetailsQuery.error?.data?.code === "NOT_FOUND"
                ? `Could not find a playable class "${classSlug}".`
                : `An error occurred: ${classDetailsQuery.error.message}`}
            </p>
          </div>
        )}

        {classDetailsQuery.isSuccess && classDetailsQuery.data && (
          <div>
            <h1 className="text-2xl font-bold mb-2">{(classDetailsQuery.data as any).name}</h1>
            <p><span className="font-semibold">ID:</span> {(classDetailsQuery.data as any).id}</p>
          </div>
        )}
      </div>
    );
  }