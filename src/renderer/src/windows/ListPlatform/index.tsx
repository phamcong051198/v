import { PlatformType } from '@shared/types'
import { useEffect, useMemo, useState } from 'react'

export default function ListPlatform() {
  const [searchTerm, setSearchTerm] = useState('')
  const [listPlatForm, setListPlatForm] = useState<PlatformType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await window.electron.ipcRenderer.invoke('GetListPlatform')
      setListPlatForm(data)
    }

    fetchData()

    return () => {
      window.electron.ipcRenderer.removeAllListeners('GetListPlatform')
    }
  }, [])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredData = useMemo(
    () => listPlatForm.filter((item) => item.url.toLowerCase().includes(searchTerm.toLowerCase())),
    [listPlatForm, searchTerm]
  )

  const addInfoWeb = (platform: PlatformType) => {
    window.electron.ipcRenderer.send('AddPlatForm', platform)
  }

  return (
    <div className="h-full">
      <div className="h-full py-1 flex flex-col gap-1">
        <div className="flex items-center">
          <p className="mx-1.5">URL to search</p>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search URL"
            className="h-7 w-1/2 bg-white border border-gray-400 focus-visible:ring-blue-500 focus:outline-none pl-2"
          />
        </div>
        <div className="flex-1 border border-zinc-500 bg-white">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border border-gray-500 text-start pl-2">URL</th>
                <th className="border border-gray-500 text-start pl-2">Platform</th>
                <th className="border border-gray-500 text-start pl-2">Add</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((platform) => (
                <tr key={platform.id}>
                  <td className="border border-gray-500 text-start pl-1.5 hover:bg-blue-500 hover:text-white">
                    {platform.url}
                  </td>
                  <td className="border border-gray-500 text-start pl-1.5 hover:bg-blue-500 hover:text-white">
                    {platform.name}
                  </td>
                  <td
                    className="border border-gray-500 text-start pl-1.5 underline text-blue-700 cursor-pointer hover:bg-blue-500 hover:text-white"
                    onClick={() => addInfoWeb(platform)}
                  >
                    Add
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
