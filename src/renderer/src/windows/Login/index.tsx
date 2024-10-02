import { useCallback, useState } from 'react'
import Progressbar from '@renderer/components/Progressbar'

export default function Login() {
  const [isRunning, setIsRunning] = useState(false)
  const [isProgressbar, setProgressbar] = useState(false)

  const CloseLoginWindow = useCallback(() => {
    window.electron.ipcRenderer.send('CloseLoginWindow')
  }, [])

  const showProgressbar = useCallback(() => {
    setProgressbar(true)
    setIsRunning(true)
  }, [])

  const closeProgressbar = useCallback(() => {
    setProgressbar(false)
    setIsRunning(false)
    window.electron.ipcRenderer.send('LoginSuccess')
  }, [])

  const handleLogin = useCallback(() => {
    window.electron.ipcRenderer.send('LoginSuccess')
  }, [])

  return (
    <div className="bg-[#001421] h-full text-gray-500 flex flex-col relative">
      <div className=" flex justify-between  px-2 pt-1">
        <p className="underline cursor-pointer hover:text-blue-700" onClick={showProgressbar}>
          Re-Update
        </p>
        <div className="flex items-center ">
          <input type="checkbox" name="" id="checkboxLogin" className=" cursor-pointer" />
          <label htmlFor="checkboxLogin" className="pl-2 cursor-pointer">
            Save Login
          </label>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <p className="font-semibold text-5xl tracking-widest font-serif">B-SOFT</p>
      </div>
      <div className="px-6 py-6 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex">
            <p className="flex-1 font-bold text-slate-300">ID</p>
            <input
              type="text"
              name=""
              id=""
              className="w-36 outline-none text-gray-200  bg-[#374b57] border border-gray-400"
            />
          </div>
          <div className="flex">
            <p className="flex-1 font-bold text-slate-300">Password</p>
            <input
              type="password"
              name=""
              id=""
              className="w-36 outline-none text-gray-200  bg-[#374b57] border border-gray-400"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            className="bg-gray-200 text-black font-bold block h-6 w-28 hover:bg-gray-300"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="bg-gray-200 text-black font-bold block h-6 w-28 hover:bg-gray-300"
            onClick={CloseLoginWindow}
          >
            Cancel
          </button>
        </div>
        {isProgressbar && <Progressbar isRunning={isRunning} closeProgressbar={closeProgressbar} />}
      </div>
    </div>
  )
}
