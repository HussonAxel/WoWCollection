import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import BlizzardPlayableClassesList from '@/components/getBlizzardPlayableClasses' // Or correct path/name

export const Route = createFileRoute('/classes')({
  component: ClassesListComponent, // Use this component
})

function ClassesListComponent() { // Renamed for clarity
  const isRootPath = useRouterState({
    select: (state) => state.location.pathname === '/classes'
  })

  return (
    <div>
      {isRootPath && <BlizzardPlayableClassesList />}
      <Outlet />
    </div>
  )
}
