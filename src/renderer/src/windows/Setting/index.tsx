import { useEffect, useState } from 'react'
import BoxLabel from '@renderer/layouts/BoxLabel'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function Setting() {
  const [profitMin, setProfitMin] = useState<number | string>()
  const [profitMax, setProfitMax] = useState<number | string>()
  const [gameType, setGameType] = useState<string>('None')

  useEffect(() => {
    const fetchData = async () => {
      const data = await window.electron.ipcRenderer.invoke('GetDataSetting')
      if (data.length > 0) {
        setProfitMin(data[0].profitMin || 0)
        setProfitMax(data[0].profitMax || 0)
        setGameType(data[0].gameType || 'None')
      }
    }

    fetchData()

    return () => {
      window.electron.ipcRenderer.removeAllListeners('GetDataSetting')
    }
  }, [])

  const handleChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setProfitMin(value)
  }

  const handleChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setProfitMax(value)
  }

  const handleChangeGameType = (value: string) => {
    setGameType(value)
  }

  const handleSaveSetting = () => {
    window.electron.ipcRenderer.send('SaveSettingWindow', {
      profitMin,
      profitMax,
      gameType
    })
  }

  return (
    <div className="p-3 h-full flex flex-col">
      <div className="grid gap-3.5 grid-cols-2">
        <BoxLabel label="Basic Setting" className=" w-full">
          <div className="flex flex-col my-4 mx-3 gap-2">
            <div className="flex  items-center justify-between">
              <div>Odds Type</div>
              <Select defaultValue="Malay">
                <SelectTrigger className="w-[140px] h-6 bg-white rounded-none border-gray-500 focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none border-gray-500 focus:ring-0">
                  <SelectItem value="Malay">Malay</SelectItem>
                  <SelectItem value="HongKong">HongKong</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex">
                <input type="checkbox" name="" id="" />
                <label htmlFor="" className="ml-1.5">
                  Block Red Card
                </label>
              </div>
              <input
                type="number"
                name=""
                id=""
                className="w-16 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
              />
              <label htmlFor="">to</label>
              <input
                type="number"
                name=""
                id=""
                className="w-16 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex">
                <input type="checkbox" name="" id="" />
                <label htmlFor="" className="ml-1.5">
                  Stop Betting Before Start Minute
                </label>
              </div>
              <input
                type="number"
                name=""
                id=""
                className="w-16 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
              />
            </div>
            <div className="flex">
              <input type="checkbox" name="" id="" />
              <label htmlFor="" className="ml-1.5">
                Don&apos;t Contra to Same Sportbook
              </label>
            </div>
            <div className=" flex items-center justify-between">
              <p className="font-bold">Profit Commission</p>
              <input
                type="number"
                id="quantity"
                name="quantity"
                step="0.1"
                className="w-16 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                value={profitMin}
                onChange={handleChangeMin}
              />
              <p className="font-bold">to</p>
              <input
                type="number"
                id="quantity"
                name="quantity"
                step="0.1"
                className="w-16 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                value={profitMax}
                onChange={handleChangeMax}
              />
            </div>
          </div>
        </BoxLabel>
        <BoxLabel label="Total Goal Range(RunningGameOnly)" className="w-full">
          <div className="flex flex-col my-4 mx-3 gap-2">
            <div className="flex items-center justify-between">
              <div className="flex">
                <input type="checkbox" name="" id="" />
                <label htmlFor="" className="ml-1.5">
                  Check Total Goal
                </label>
              </div>
              <input
                type="number"
                name=""
                id=""
                className="w-16 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
              />
              <label htmlFor="">to</label>
              <input
                type="number"
                name=""
                id=""
                className="w-16 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
              />
            </div>
            <div className="flex ">
              <input type="checkbox" name="" id="" />
              <label htmlFor="" className="ml-1.5">
                Check Score List
              </label>
            </div>
          </div>
        </BoxLabel>
        <BoxLabel label="Game Type" className="w-full">
          <RadioGroup
            value={gameType}
            onValueChange={handleChangeGameType}
            className="flex h-full justify-center items-center"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Running" id="Running" className="bg-white" />
              <Label htmlFor="Running">Running</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Today" id="Today" className="bg-white" />
              <Label htmlFor="Today">Today</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Early" id="Early" className="bg-white" />
              <Label htmlFor="Early">Early</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="None" id="None" className="bg-white" />
              <Label htmlFor="None">None</Label>
            </div>
          </RadioGroup>
        </BoxLabel>
        <BoxLabel label="Game Type Scheduler" className="w-full">
          <div className="px-5 py-4">
            <div className="flex gap-1.5">
              <input type="checkbox" name="" />
              <label htmlFor="Running1">Running</label>
            </div>
            <div className="flex gap-1.5">
              <input type="checkbox" name="" />
              <label htmlFor="Today1">Today</label>
            </div>
            <div className="flex gap-1.5">
              <input type="checkbox" name="" />
              <label htmlFor="Early1">Early</label>
            </div>
          </div>
        </BoxLabel>
      </div>
      <div className="flex-1 mt-4">
        <BoxLabel label="General Setting" className=" w-full">
          <div className="pl-2 pr-5 pt-5 py-2 flex flex-col gap-3.5">
            <BoxLabel label="1st Half" className=" w-full">
              <div className="flex gap-6 px-6 py-3">
                <div className="flex gap-2">
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Bet 0 - 45 Minutes</label>
                </div>
                <div className="flex gap-2">
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Bet First Half</label>
                </div>
                <div className="flex gap-2">
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Bet Full Time</label>
                </div>
              </div>
              <div className="flex px-4 pb-4 justify-around ">
                <div className="">
                  <label className="mr-6">Betting From (Minutes)</label>
                  <input
                    type="number"
                    name=""
                    id=""
                    className="w-20 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                  />
                </div>
                <div className="">
                  <label className="mr-6">Betting Until (Minutes)</label>
                  <input
                    type="number"
                    name=""
                    id=""
                    className="w-20 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                  />
                </div>
              </div>
            </BoxLabel>
            <BoxLabel label="2nd Half" className=" w-full">
              <div className="flex gap-6 px-6 py-3">
                <div className="flex gap-2">
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Bet 45 - 90 Minutes</label>
                </div>
                <div className="flex gap-2">
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Bet Half Time</label>
                </div>
              </div>
              <div className="flex px-4 pb-4 justify-around ">
                <div className="">
                  <label className="mr-6">Betting From (Minutes)</label>
                  <input
                    type="number"
                    name=""
                    id=""
                    className="w-20 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                  />
                </div>
                <div className="">
                  <label className="mr-6">Betting Until (Minutes)</label>
                  <input
                    type="number"
                    name=""
                    id=""
                    className="w-20 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                  />
                </div>
              </div>
            </BoxLabel>
            <div className="flex gap-2 ">
              <BoxLabel label="Betting Mode" className="w-72">
                <div className="px-10 py-10 ">
                  <RadioGroup defaultValue="Normal" className="">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Normal" id="Normal" className="bg-white" />
                      <Label htmlFor="Normal">Normal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Today" id="Today" className="bg-white" />
                      <Label htmlFor="Today">Average Profit & Loss</Label>
                    </div>
                  </RadioGroup>
                  <div className="mt-2 flex">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className="ml-2.5 font-semibold">
                      Amount Rounding
                    </label>
                  </div>
                </div>
              </BoxLabel>

              <div className="flex-1">
                <BoxLabel label="Odds Setting (Malay Odds)" className="w-full">
                  <div className="px-4 py-4 flex flex-col gap-1">
                    <div className="flex justify-between">
                      <div className="flex">
                        <input type="checkbox" name=" " id="" />
                        <label htmlFor="" className="ml-3">
                          Don&apos;t Bet when odds {'<'}{' '}
                        </label>
                      </div>
                      <input
                        type="number"
                        name=""
                        id=""
                        className="w-16 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                      />
                    </div>
                    <div className="flex justify-between">
                      <div className="flex">
                        <input type="checkbox" name=" " id="" />
                        <label htmlFor="" className="ml-3">
                          Don&apos;t Bet when odds {'>'}
                        </label>
                      </div>
                      <input
                        type="number"
                        name=""
                        id=""
                        className="w-16 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                      />
                    </div>
                    <div className="flex justify-between">
                      <div className="flex">
                        <input type="checkbox" name=" " id="" />
                        <label htmlFor="" className="ml-3">
                          Don&apos;t Bet when Game Commission {'>'}
                        </label>
                      </div>
                      <input
                        type="number"
                        name=""
                        id=""
                        className="w-16 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                      />
                    </div>
                    <div className="flex justify-between">
                      <div className="flex">
                        <input type="checkbox" name=" " id="" />
                        <label htmlFor="" className="ml-3">
                          Don&apos;t Bet when Game Commission {'<'}
                        </label>
                      </div>
                      <input
                        type="number"
                        name=""
                        id=""
                        className="w-16 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                      />
                    </div>
                  </div>
                </BoxLabel>
              </div>
            </div>
            <BoxLabel label="Bet Amount Randomizer" className=" w-full">
              <div className="flex pt-2 pb-1 ">
                <div className="flex pl-3">
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="" className="ml-3">
                    Enable Randomizer
                  </label>
                </div>
                <p className="ml-60">Effective Bet Amount: (eg $500)</p>
              </div>
              <div className="flex gap-4 px-8 py-3">
                <div>
                  <label htmlFor="">From (0% -100%)</label>
                  <input
                    type="number"
                    name=""
                    id=""
                    className="w-14 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 ml-2"
                  />
                </div>
                <div>
                  <label htmlFor="">To (100% -200%)</label>
                  <input
                    type="number"
                    name=""
                    id=""
                    className="w-14 outline-none bg-white rounded-none border border-gray-500 focus:ring-0  ml-2"
                  />
                </div>
                <p className="font-bold text-gray-500 ml-20">$500 - $500</p>
              </div>
            </BoxLabel>
          </div>
        </BoxLabel>
      </div>
      <div className="text-right mt-1.5 mr-3 ">
        <Button
          variant="outline"
          className=" border rounded-none border-solid border-blue-500 py-0 px-8 leading-none h-7"
          onClick={handleSaveSetting}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
