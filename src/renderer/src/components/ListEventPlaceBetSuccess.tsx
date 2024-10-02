import { useEffect, useState } from 'react'
import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  flexRender,
  ColumnResizeDirection,
  RowData
} from '@tanstack/react-table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { DataPlaceBet } from '@shared/types'
import { cn } from '@renderer/lib/utils'
import { getLastElements } from '@renderer/lib/getLastElements'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

const defaultColumns = [
  {
    accessorKey: 'company',
    header: () => <span>Company</span>,
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'coverage',
    header: () => <span>Coverage</span>,
    footer: (props) => props.column.id,
    size: 70
  },
  {
    accessorKey: 'gameType',
    header: () => <span>Game Type</span>,
    footer: (props) => props.column.id,
    size: 80
  },
  {
    accessorKey: 'score',
    header: () => <span>Score</span>,
    footer: (props) => props.column.id,
    size: 70,
    cell: ({ getValue }) => {
      return <span> {getValue() == null ? '-' : getValue()}</span>
    }
  },
  {
    accessorKey: 'nameLeague',
    header: () => <span>League</span>,
    footer: (props) => props.column.id,
    size: 180
  },
  {
    accessorKey: 'nameHome',
    header: () => <span>Home</span>,
    footer: (props) => props.column.id,
    size: 120,
    cell: ({ row }) => {
      const hdp = row.original.hdp_point
      if (hdp < 0) {
        return <div className="text-red-600">{row.original.nameHome}</div>
      } else {
        return <div className="text-blue-600">{row.original.nameHome}</div>
      }
    }
  },
  {
    accessorKey: 'nameAway',
    header: () => <span>Away</span>,
    footer: (props) => props.column.id,
    size: 120,
    cell: ({ row }) => {
      const hdp = row.original.hdp_point
      if (hdp < 0) {
        return <div className="text-blue-600">{row.original.nameAway}</div>
      } else {
        return <div className="text-red-600">{row.original.nameAway}</div>
      }
    }
  },
  {
    accessorKey: 'bet',
    header: () => <span>Bet</span>,
    footer: (props) => props.column.id,
    size: 120,
    cell: ({ getValue }) => {
      return <span className="text-green-600"> {getValue() as string}</span>
    }
  },
  {
    accessorKey: 'hdp_point',
    header: () => <span>HDP</span>,
    footer: (props) => props.column.id,
    size: 60
  },
  {
    accessorKey: 'odd',
    header: () => <span>Odds</span>,
    footer: (props) => props.column.id,
    size: 60,
    cell: ({ getValue }) => {
      return (
        <span className={cn(getValue() > 0 ? 'text-blue-600' : 'text-red-600')}>
          {getValue() as number}
        </span>
      )
    }
  },
  {
    accessorKey: 'amount',
    header: () => <span>Amount</span>,
    footer: (props) => props.column.id,
    size: 60,
    cell: ({ getValue }) => {
      return <span className="font-bold"> {getValue() as number}</span>
    }
  },
  {
    accessorKey: 'time',
    header: () => <span>Time</span>,
    footer: (props) => props.column.id,
    size: 80
  },
  {
    accessorKey: 'info',
    header: () => <span>Info</span>,
    footer: (props) => props.column.id,
    cell: ({ getValue }) => {
      const value = getValue()
      const className = value === 'Bet Success' ? 'text-blue-600' : 'text-red-600'
      return <span className={className}>{value}</span>
    }
  },
  {
    accessorKey: 'profit',
    header: () => <span>Profit</span>,
    footer: (props) => props.column.id,
    size: 50,
    cell: ({ getValue }) => {
      return (
        <span className={cn(getValue() > 0 ? 'text-blue-600' : 'text-red-600')}>
          {getValue() as number}
        </span>
      )
    }
  },
  {
    accessorKey: 'speed',
    header: () => <span>Speed</span>,
    footer: (props) => props.column.id,
    size: 50
  },
  {
    accessorKey: 'receiptID',
    header: () => <span>Receipt ID</span>,
    footer: (props) => props.column.id,
    size: 100,
    cell: ({ getValue }) => {
      return <span className="px-1.5"> {getValue()}</span>
    }
  },
  {
    accessorKey: 'receiptStatus',
    header: () => <span>Receipt Status</span>,
    footer: (props) => props.column.id,
    size: 100,
    cell: ({ row }) => {
      const receiptID = row.getValue('receiptID')
      return receiptID && receiptID.trim() !== '' ? (
        <span className="text-blue-600"> Confirm</span>
      ) : null
    }
  }
]
const countEvent = 100
export const ListEventPlaceBetSuccess = () => {
  const [data, setData] = useState<DataPlaceBet[]>([])
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])
  const [columnResizeMode] = useState<ColumnResizeMode>('onChange')
  const [columnResizeDirection] = useState<ColumnResizeDirection>('ltr')
  const [openDialog, setOpenDialog] = useState(false)
  const [ticket, setTicket] = useState<DataPlaceBet>()

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    columnResizeDirection,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...row,
                [columnId]: value
              }
            }
            return row
          })
        )
      }
    }
  })

  useEffect(() => {
    const fetch = async () => {
      const data = await window.electron.ipcRenderer.invoke('GetSuccessList')
      const dataConvert = data.flatMap((item: { id: number; idPair: string; dataPair: string }) =>
        JSON.parse(item.dataPair)
      )
      const dataLastElements = getLastElements(dataConvert, countEvent)
      setData(dataLastElements)
    }
    fetch()
  }, [])

  useEffect(() => {
    const handleDataBetList = (_, data: { id: number; dataPair: string }) => {
      setData((prevState) => {
        const dataEvent = JSON.parse(data.dataPair)
        if (prevState.length >= countEvent) {
          return [...dataEvent]
        } else {
          return [...prevState, ...dataEvent]
        }
      })
    }

    window.electron.ipcRenderer.on('DataSuccessList', handleDataBetList)

    return () => {
      window.electron.ipcRenderer.removeAllListeners('DataSuccessList')
    }
  }, [])

  const handleInfoTicket = (data: DataPlaceBet) => {
    setTicket(data)
    setOpenDialog(true)
  }
  return (
    <div className=" h-full py-3 px-2 ">
      <div className=" flex justify-end gap-1 font-bold ">
        <p>Total</p>
        <p>{data.length}</p>
      </div>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden pt-2">
          <div className=" h-full w-full border border-zinc-500 overflow-hidden">
            <div
              style={{ direction: table.options.columnResizeDirection }}
              className="h-full w-full overflow-auto custom-scrollbar"
            >
              <div className="">
                <table
                  {...{
                    style: {
                      width: table.getCenterTotalSize()
                    }
                  }}
                  className="bg-[#f8f6f6] "
                >
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            {...{
                              colSpan: header.colSpan,
                              style: {
                                width: header.getSize()
                              }
                            }}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                            <div
                              {...{
                                onDoubleClick: () => header.column.resetSize(),
                                onMouseDown: header.getResizeHandler(),
                                onTouchStart: header.getResizeHandler(),
                                className: `resizer ${table.options.columnResizeDirection} ${
                                  header.column.getIsResizing() ? 'isResizing' : ''
                                }`,
                                style: {
                                  transform:
                                    columnResizeMode === 'onEnd' && header.column.getIsResizing()
                                      ? `translateX(${
                                          (table.options.columnResizeDirection === 'rtl' ? -1 : 1) *
                                          (table.getState().columnSizingInfo.deltaOffset ?? 0)
                                        }px)`
                                      : ''
                                }
                              }}
                            />
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                      <tr
                        key={row.id}
                        className={`hover:bg-blue-300 ${Math.floor(index / 2) % 2 === 0 ? 'bg-white' : 'bg-gray-200'} `}
                        onClick={() => handleInfoTicket(row.original)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            {...{
                              style: {
                                width: cell.column.getSize()
                              }
                            }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-[350px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Betting ticket information</DialogTitle>
            <DialogDescription className="text-black text-base ">
              <div className="flex">
                <p className="w-36">Company</p>
                <p>: {ticket?.company}</p>
              </div>
              <div className="flex">
                <p className="w-36">Coverage</p>
                <p>: {ticket?.number == 0 ? 'FullTime' : 'FirstHalf'}</p>
              </div>
              <div className="flex">
                <p className="w-36">League</p>
                <p>: {ticket?.nameLeague}</p>
              </div>
              <div className="flex">
                <p className="w-36">Home</p>
                <p>: {ticket?.nameHome}</p>
              </div>
              <div className="flex">
                <p className="w-36">Away</p>
                <p>: {ticket?.nameAway}</p>
              </div>
              <div className="flex">
                <p className="w-36">TypeBet</p>
                <p>: {ticket?.typeOdd}</p>
              </div>
              <div className="flex">
                <p className="w-36">Bet</p>
                <p>: {ticket?.bet}</p>
              </div>
              <div className="flex">
                <p className="w-36">HDP</p>
                <p>: {ticket?.HDP}</p>
              </div>
              <div className="flex">
                <p className="w-36">Odds</p>
                <p>: {ticket?.odd}</p>
              </div>
              <div className="flex">
                <p className="w-36">AmountRange</p>
                <p>: MYR6 - 988</p>
              </div>
              <div className="flex">
                <p className="w-36">Time</p>
                <p>: {ticket?.time}</p>
              </div>
              <div className="flex">
                <p className="w-36">OddsType</p>
                <p>: Malay</p>
              </div>
              <div className="flex">
                <p className="w-36">Info</p>
                <p>: Success</p>
              </div>
              <div className="flex">
                <p className="w-36">ReceiptId</p>
                <p>: Confirm</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
