// src/routes/classes.$classSlug.tsx - SHOULD LOOK LIKE THIS
import { createFileRoute } from '@tanstack/react-router'
// Make SURE this is the DETAIL component
import BlizzardPlayableClassesDetails from '@/components/getBlizzardPlayableClassDetails' // Or correct path/name

export const Route = createFileRoute('/classes/$classSlug')({
  component: ClassDetailComponent, // Use this component
})

function ClassDetailComponent() { // Renamed for clarity
  return (
    <div className="mt-4">
      {/* Renders the component that shows the details */}
      <BlizzardPlayableClassesDetails />
    </div>
  )
}
