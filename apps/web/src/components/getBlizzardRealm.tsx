"use client"; // Or remove if using file-based routing without app dir

import { useState } from "react";
import { useTRPC } from "@/utils/trpc"; // Correct import based on your example
import { useQuery } from "@tanstack/react-query"; // Correct import

// Assuming you have the blizzardRouter added to your root router
// and the getRealmIndex procedure defined as shown previously.

export default function HomePageBlizzard() {
  const [region, setRegion] = useState("eu"); // Example state for region selection
  const trpc = useTRPC(); // Get the tRPC client instance

  // Use useQuery with the queryOptions from your tRPC procedure
  const realmIndexQuery = useQuery(
    trpc.blizzard.getRealmIndex.queryOptions( // Access procedure via client instance
      { region }, // Input object for the procedure
      {
        // TanStack Query options (optional)
        // enabled: false, // Don't fetch automatically on load if desired
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
        // queryKey is automatically handled by queryOptions
      },
    ),
  );

  return (
    <div>
      <h1>WoW Collection</h1>

      <div>
        <label>
          Select Region:
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="us">US</option>
            <option value="eu">EU</option>
            {/* Add other regions */}
          </select>
        </label>
        {/* Optional: Button to trigger refetch */}
        <button
          onClick={() => realmIndexQuery.refetch()}
          disabled={realmIndexQuery.isFetching}
        >
          {realmIndexQuery.isFetching ? "Fetching..." : "Fetch Realms"}
        </button>
      </div>

      {/* Status Display */}
      {realmIndexQuery.isLoading && <p>Loading realms...</p>}
      {realmIndexQuery.isError && (
        <p>Error loading realms: {realmIndexQuery.error.message}</p>
      )}
      {realmIndexQuery.isSuccess && ( // Use isSuccess for successful data
        <div>
          <h2>Realms ({region.toUpperCase()})</h2>
          {/* Type assertion might be needed if you haven't defined precise output types */}
          {/* Adjust the data structure access based on the actual API response */}
          <ul>
            {(realmIndexQuery.data as any)?.realms?.map((realm: any) => (
              <li key={realm.id}>
                {realm.name.fr_FR} ({realm.slug}) - ID: {realm.id}
              </li>
            ))}
          </ul>
          {/* Uncomment to inspect the raw data */}
          {/* <pre>{JSON.stringify(realmIndexQuery.data, null, 2)}</pre> */}
        </div>
      )}
    </div>
  );
}
