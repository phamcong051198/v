import PlusCircle from '@renderer/icons/plus-circle'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import { DataPlatformType, SportsBookType } from '@shared/types'
import { DetailSportsBook } from '@renderer/components/DetailSportsBook'

export const SportsBook = () => {
  const [dataSportBook, setDataSportBook] = useState<DataPlatformType[]>([])
  const [listSportsBook, setListSportsBook] = useState<SportsBookType[]>([])
  const [selectedSportsBook, setSelectedSportsBook] = useState<SportsBookType>()

  useEffect(() => {
    const fetch = async () => {
      const listSportsBook = await window.electron.ipcRenderer.invoke('GetListSportBook')
      setListSportsBook(listSportsBook)

      const sportsBookAction = listSportsBook.find(
        (sportsBook: SportsBookType) => sportsBook.status === 1
      )
      setSelectedSportsBook(sportsBookAction)
    }
    fetch()

    return () => {
      window.electron.ipcRenderer.removeAllListeners('GetListSportBook')
    }
  }, [])

  useEffect(() => {
    const fetch = async () => {
      const data = await window.electron.ipcRenderer.invoke('GetDataSportsBook')
      setDataSportBook(data)
    }
    fetch()
  }, [selectedSportsBook])

  useEffect(() => {
    const listener = (_, data: DataPlatformType[]) => {
      setDataSportBook(data)
    }

    window.electron.ipcRenderer.on('DataSportsBook', listener)
    return () => {
      window.electron.ipcRenderer.removeAllListeners('DataSportsBook')
    }
  }, [])

  const addSportsBook = () => {
    window.electron.ipcRenderer.send('ShowListPlatform')
  }

  const handleSelectSportsBook = (sportsBook: SportsBookType) => {
    setSelectedSportsBook(sportsBook)
    window.electron.ipcRenderer.send('SelectSportsBook', sportsBook.id)
  }
  console.log('123213', dataSportBook)
  return (
    <div className="flex flex-col">
      <div className="pb-1.5">
        <div
          className=" cursor-pointer  border border-transparent hover:bg-blue-200 hover:border hover:border-blue-300  flex items-center w-40"
          onClick={addSportsBook}
        >
          <PlusCircle className="text-green-500 size-6 inline-block " />
          <h4 className="text-blue-800 font-extrabold cursor-pointer inline-block text-sm leading-none">
            Add SportsBook
          </h4>
        </div>
      </div>
      <div className="flex h-5 items-center text-sm mb-4">
        {listSportsBook.map((sportsBook: SportsBookType) => {
          const isSelected = selectedSportsBook?.id === sportsBook.id
          return (
            <div key={sportsBook.id} className="flex justify-between">
              <div className={`border ${isSelected ? 'border-gray-400' : 'border-transparent'}`}>
                <button
                  className={`px-2 border ${
                    isSelected
                      ? 'border-gray-500 border-r-gray-300 border-b-gray-300'
                      : 'border-transparent'
                  }`}
                  onClick={() => handleSelectSportsBook(sportsBook)}
                >
                  {sportsBook.name}
                </button>
              </div>
              <Separator orientation="vertical" className=" bg-gray-500 mx-3 py-3" />
            </div>
          )
        })}
      </div>
      <div>
        {selectedSportsBook && (
          <>
            <h2 className="text-lg font-bold">{selectedSportsBook.name} - Details</h2>
            <div className="mt-4">
              {dataSportBook
                .filter((platform) => platform.sportsBook === selectedSportsBook.name)
                .map((platform) => (
                  <DetailSportsBook key={platform.id} platform={platform} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
