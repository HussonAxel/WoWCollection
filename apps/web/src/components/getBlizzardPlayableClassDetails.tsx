"use client"

import { useState } from "react";
import { useTRPC } from "@/utils/trpc"; // Correct import based on your example
import { useQuery } from "@tanstack/react-query"; // Correct import
import { Link, useParams } from "@tanstack/react-router";

export default function PlayableClassDetailsComponent() {
    const { classSlug: classIdString } = useParams({ from: "/classes/$classSlug" });
  
    const classId = parseInt(classIdString, 10);
    const trpc = useTRPC();
  
    const [region] = useState("us");
    const [locale] = useState("en_US");
  
    const classDetailsQuery = useQuery(
      trpc.blizzard.getPlayableClassDetails.queryOptions(
        {
          classId: classId,
          region: region,
          locale: locale,
        },
        {
          enabled: !isNaN(classId),
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
  
    if (isNaN(classId)) {
      return (
        <div className="container mx-auto p-4">
          <p className="text-red-600">Invalid Class ID in URL.</p>
          <Link to="/classes" className="text-blue-500 hover:underline mt-2 block">
            &larr; Back to Classes List
          </Link>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto p-4">
        <Link to="/classes" className="text-blue-500 hover:underline mb-4 block">
          &larr; Back to Classes List
        </Link>
  
        {classDetailsQuery.isLoading && <p>Loading details for Class ID: {classId}...</p>}
  
        {classDetailsQuery.isError && (
          <div>
            <h2 className="text-red-600 font-bold">Error loading class details</h2>
            <p>
              {/* Display specific message for NOT_FOUND */}
              {classDetailsQuery.error?.data?.code === "NOT_FOUND"
                ? `Could not find a playable class with ID "${classId}".`
                : `An error occurred: ${classDetailsQuery.error.message}`}
            </p>
          </div>
        )}
  
        {classDetailsQuery.isSuccess && classDetailsQuery.data && (
          <div>
            <h1 className="text-2xl font-bold mb-2">{classDetailsQuery.data.name}</h1>
            <p><span className="font-semibold">ID:</span> {classDetailsQuery.data.id}</p>
          </div>
        )}
      </div>
    );
  }