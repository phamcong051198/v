import ProgressbarTop from '@renderer/components/ProgressbarTop'
import { useCallback, useState } from 'react'

export default function InitApp() {
  const [isRunning, setIsRunning] = useState(true)
  const [isProgressbar, setProgressbar] = useState(true)

  const closeProgressbar = useCallback(() => {
    setProgressbar(false)
    setIsRunning(false)
    window.electron.ipcRenderer.send('InitAppSuccess')
  }, [])

  return (
    <div className="bg-[#01070a] h-full flex flex-col">
      <div className="flex flex-1 justify-around items-center mt-6">
        <div className="text-gray-500 font-bold text-6xl tracking-[5px] leading-none">BSoft</div>
        <div className="text-[#c67107]">
          <p className="font-semibold text-2xl">BSoftBet </p>
          <p className="text-xl  mb-4">Vietnam </p>
          <p className="leading-none">Version 1.24.4.25 </p>
          <p className="leading-none">copyright © 2024 </p>
        </div>
      </div>
      {isProgressbar && (
        <ProgressbarTop isRunning={isRunning} closeProgressbar={closeProgressbar} />
      )}
    </div>
  )
}
