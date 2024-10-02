import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

import { Checkbox } from '@renderer/components/ui/checkbox'
import BoxLabel from '@renderer/layouts/BoxLabel'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'

export const AccountPair = () => {
  return (
    <div className="relative h-full pt-4 pb-16 px-2.5 flex">
      <div className=" h-full w-full border border-zinc-300 flex">
        <div className="flex flex-col">
          <div className="flex-1 flex py-3.5 px-2 overflow-hidden">
            <div className="flex ">
              <div className="flex flex-col ">
                <div>Account1</div>
                <div className="flex-1 border border-gray-500 w-96 bg-white py-1 custom-scrollbar overflow-y-auto"></div>
              </div>
              <div className="flex flex-col">
                <div>Account2</div>
                <div className="flex-1 border border-gray-500 w-96 bg-white py-1 custom-scrollbar overflow-y-auto"></div>
              </div>
            </div>
            <div className="flex flex-col gap-1 py-5 pl-6">
              <button className="border border-zinc-400 w-44 font-bold text-blue-700  bg-[#cbc7c7] hover:bg-[#b4b3b3]">
                Add {'>'}
              </button>
              {/* <button className="border border-zinc-400 w-44 font-bold text-red-500 bg-[#cbc7c7] hover:bg-[#b4b3b3]">
                {'<'}Remove
              </button>
              <button className="border border-zinc-400 w-44 font-bold text-blue-700 bg-[#cbc7c7] hover:bg-[#b4b3b3]">
                Add All {'>>'}
              </button> */}
              <button className="border border-zinc-400 w-44 font-bold text-red-500 bg-[#cbc7c7] hover:bg-[#b4b3b3]">
                {'<<'}Remove All
              </button>
              {/* <button className="border border-zinc-400 w-44 font-bold text-blue-700 bg-[#cbc7c7] hover:bg-[#b4b3b3]">
                Add Selection {'>>>'}
              </button>
              <button className="border border-zinc-400 w-44 font-bold text-black bg-[#fab8b8] hover:bg-[#f7a3a3]">
                Clear Invalid Account
              </button> */}
            </div>
          </div>
          <div className="h-[495px] px-1 mb-0">
            <BoxLabel label="Bet Setting" className="w-[860px]">
              <div className="flex gap-10">
                <div className="px-6">
                  <h1 className="text-xl font-bold py-2.5 text-center">SportsBook</h1>
                  <div className="flex gap-3 mb-2">
                    <div className="flex items-center gap-6">
                      <p>Bet Amount: $</p>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        step="0.100"
                        className="w-24 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                      <p>Ignore HDP Better Odds</p>
                    </div>
                  </div>
                  <div className="flex gap-4 mb-8">
                    <div className="flex items-center gap-1">
                      <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                      <p>Check Odds</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="mr-2">Malay</p>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        step="0.100"
                        className="w-16 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="mx-1">to</p>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        step="0.100"
                        className="w-16 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1">
                      <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                      <p>Bet</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                      <p>Contra</p>
                    </div>
                    <p>Amount Rounder Setting</p>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                    <p>Min Bet</p>
                  </div>
                </div>
                <div className="text-xl font-bold py-2.5 text-center">VS</div>
                <div className="px-6">
                  <h1 className="text-xl font-bold py-2.5 text-center">SportsBook</h1>
                  <div className="flex gap-3 mb-2">
                    <div className="flex items-center gap-6">
                      <p>Bet Amount: $</p>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        step="0.100"
                        className="w-24 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                      <p>Ignore HDP Better Odds</p>
                    </div>
                  </div>
                  <div className="flex gap-4 mb-8">
                    <div className="flex items-center gap-1">
                      <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                      <p>Check Odds</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="mr-2">Malay</p>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        step="0.100"
                        className="w-16 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="mx-1">to</p>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        step="0.100"
                        className="w-16 outline-none bg-white rounded-none border border-gray-500 focus:ring-0 "
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1">
                      <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                      <p>Bet</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                      <p>Contra</p>
                    </div>
                    <p>Amount Rounder Setting</p>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                    <p>Min Bet</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <div className="w-[800px]">
                    <h1 className="text-lg font-bold py-2.5 text-center">SelectSportBook</h1>
                    <div className="pl-3">
                      <BoxLabel label="General Setting" className="h-full w-full">
                        <div className="py-8 ">
                          <RadioGroup className=" flex justify-center">
                            <div className="flex flex-col gap-3">
                              <div className="flex gap-20">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="bet-all"
                                    id="bet-all"
                                    className="bg-white"
                                  />
                                  <Label htmlFor="bet-all">Bet All</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no-bet" id="no-bet" className="bg-white" />
                                  <Label htmlFor="no-bet">No Bet</Label>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="bet-selected"
                                  id="bet-selected"
                                  className="bg-white"
                                />
                                <Label htmlFor="bet-selected">Bet Selected</Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                      </BoxLabel>
                    </div>
                  </div>
                  <div className="w-[800px]">
                    <h1 className="text-lg font-bold py-2.5 text-center">SelectSportBook</h1>
                    <div className="pr-3">
                      <BoxLabel label="General Setting" className="h-60  w-full">
                        <div className="py-8 ">
                          <RadioGroup className=" flex justify-center">
                            <div className="flex flex-col gap-3">
                              <div className="flex gap-20">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="bet-all"
                                    id="bet-all"
                                    className="bg-white"
                                  />
                                  <Label htmlFor="bet-all">Bet All</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no-bet" id="no-bet" className="bg-white" />
                                  <Label htmlFor="no-bet">No Bet</Label>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="bet-selected"
                                  id="bet-selected"
                                  className="bg-white"
                                />
                                <Label htmlFor="bet-selected">Bet Selected</Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                      </BoxLabel>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-[800px]">
                    <div className="pl-3">
                      <BoxLabel label="Detail Setting" className="h-full w-full">
                        <div className="flex p-4">
                          <div className="flex-1 flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>FT PK</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>FT Put</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>FT Eat</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>FT Over</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>FT Under</p>
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>Half PK</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>Half Put</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>Half Eat</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>Half Over</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>Half Under</p>
                            </div>
                          </div>
                        </div>
                      </BoxLabel>
                    </div>
                  </div>
                  <div className="w-[800px]">
                    <div className="pr-3">
                      <BoxLabel label="Detail Setting" className="h-full w-full">
                        <div className="flex p-4">
                          <div className="flex-1 flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>FT PK</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>FT Put</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>FT Eat</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>FT Over</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>FT Under</p>
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>Half PK</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>Half Put</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>Half Eat</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>Half Over</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900" />
                              <p>Half Under</p>
                            </div>
                          </div>
                        </div>
                      </BoxLabel>
                    </div>
                  </div>
                </div>
              </div>
            </BoxLabel>
          </div>
        </div>
        <div className="flex-1 py-3.5 px-2 flex flex-col gap-2">
          <div className="flex-1">
            <div className="h-full flex flex-col">
              <div>Combination</div>
              <div className="flex-1 border border-gray-500 w-full bg-blue-50 py-1 custom-scrollbar overflow-y-auto "></div>
            </div>
          </div>
          {/* <div className=" flex justify-end">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p>Account 1</p>
                <input
                  type="text"
                  name=""
                  id=""
                  className="outline-none border rounded-none border-solid border-gray-500  w-[200px]"
                  value={`${selectAccountPair ? selectAccountPair?.platform1Name + '-' + (selectAccountPair?.account1Name ?? '') : ''}`}
                />
              </div>
              <div className="flex items-center gap-2">
                <p>Account 2</p>
                <input
                  type="text"
                  name=""
                  id=""
                  className="outline-none border rounded-none border-solid border-gray-500 w-[200px]"
                  value={`${selectAccountPair ? selectAccountPair?.platform2Name + '-' + (selectAccountPair?.account2Name ?? '') : ''}`}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className=" border rounded-none border-solid border-blue-500 w-[70px] leading-none h-5"
                >
                  Save
                </Button>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="absolute bottom-5 right-5">
        <Button
          variant="outline"
          className=" border rounded-none border-solid border-blue-500 py-0 px-8 leading-none h-7 font-bold"
        >
          Exit
        </Button>
      </div>
      <AlertDialog open={false}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error Pair Account</AlertDialogTitle>
            <AlertDialogDescription>
              The two pair accounts must be different and have never been paired
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>OK</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
