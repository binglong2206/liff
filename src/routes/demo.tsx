import { Outlet, createFileRoute } from '@tanstack/react-router'
import ReactAudioPlayer from 'react-audio-player'

export const Route = createFileRoute('/demo')({
  component: DemoLayout,
})

function DemoLayout() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Demos</h1>
      <div className="bg-white p-6 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Music Player Demo</h2>
          <div className="w-full">
            <ReactAudioPlayer
              src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
              controls
              className="w-full"
            />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
} 