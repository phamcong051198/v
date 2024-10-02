import { useState, useEffect } from 'react'

export default function ProgressbarTop({ isRunning, closeProgressbar }) {
  const [progress, setProgress] = useState(0)
  let intervalId: NodeJS.Timeout | undefined

  useEffect(() => {
    if (progress < 100 && isRunning) {
      intervalId = setInterval(() => {
        setProgress((prev) => prev + 50)
      }, 90)
    }

    if (progress >= 100) {
      closeProgressbar()
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [progress, isRunning])

  return (
    <div className="absolute top-0 left-0 flex flex-col  w-full">
      <div className="overflow-hidden w-full h-[2px] bg-zinc-800">
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#1c64f2',
            transition: 'width 1s'
          }}
        ></div>
      </div>
      <p className="font-bold text-xs text-blue-500 text-end mr-1 mt-1">Loading. . .</p>
    </div>
  )
}
