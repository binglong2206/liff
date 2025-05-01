import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo')({
  component: DemoLayout,
})

function DemoLayout() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Demos</h1>
      <div className="bg-white p-6 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <Outlet />
      </div>
    </div>
  )
} 