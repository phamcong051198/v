import { useEffect, useState } from 'react'
import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  ColumnResizeDirection,
  RowData
} from '@tanstack/react-table'
import { Button } from '@renderer/components/ui/button'
import BoxLabel from '@renderer/layouts/BoxLabel'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { AccountType } from '@shared/types'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

const defaultColumns: ColumnDef<AccountType>[] = [
  {
    accessorKey: 'No',
    header: () => <span>No</span>,
    footer: (props) => props.column.id,
    cell: ({ row }) => {
      return (
        <div className="px-1 w-full h-full bg-[#f8f6f6] outline-none rounded-none flex items-center justify-center">
          {row.index + 1}
        </div>
      )
    }
  },
  {
    accessorKey: 'loginID',
    header: () => <span>Login ID</span>,
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'password',
    header: () => <span>Password</span>,
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'expiredPassword',
    header: () => <span>Expired Password</span>,
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'loginURL',
    header: () => <span>Login URL</span>,
    footer: (props) => props.column.id,
    cell: ({ getValue }) => {
      return (
        <div className="px-1 bg-[#f8f6f6] hover:border-blue-500 leading-none  ">
          <span> {getValue() as string}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'customIP',
    header: () => <span>Custom IP</span>,
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'proxyIP',
    header: () => <span>Proxy IP</span>,
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'proxyPort',
    header: () => <span>Proxy Port</span>,
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'proxyUsername',
    header: () => <span>ProxyUsername</span>,
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'proxyPassword',
    header: () => <span>ProxyPassword</span>,
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'proxyScope',
    header: () => <span>ProxyScope</span>,
    footer: (props) => props.column.id,
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue()
      const [value, setValue] = useState(initialValue)

      useEffect(() => {
        setValue(initialValue)
      }, [initialValue])

      const handleValueChange = (value: string) => {
        setValue(value)
        table.options.meta?.updateData(index, id, value)
      }

      return (
        <Select defaultValue={value as string} onValueChange={handleValueChange}>
          <SelectTrigger className="w-full border-none outline-none rounded-none bg-[#e7e6e6fb]  focus:border-blue-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="None" className="cursor-pointer">
              None
            </SelectItem>
            <SelectItem value="LoginOnly" className="cursor-pointer">
              LoginOnly
            </SelectItem>
            <SelectItem value="Full" className="cursor-pointer">
              Full
            </SelectItem>
          </SelectContent>
        </Select>
      )
    }
  }
]

const defaultColumn: Partial<ColumnDef<AccountType>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)

    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return (
      <input
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        className="px-1 w-full h-full bg-[#f8f6f6]  outline-none rounded-none focus:ring-0 cursor-pointer focus:border focus:bg-white  focus:border-blue-500 "
      />
    )
  }
}

export const ListAccountByPlatform = () => {
  const [data, setData] = useState<AccountType[]>([])
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])
  const [columnResizeMode] = useState<ColumnResizeMode>('onChange')
  const [columnResizeDirection] = useState<ColumnResizeDirection>('ltr')

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
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
      const listAccountByPlatform = await window.electron.ipcRenderer.invoke(
        'GetListAccountByPlatform'
      )
      setData(listAccountByPlatform)
    }
    fetch()
  }, [])

  const handleCloseAccountList = () => {
    const dataAccountNew = table.getCoreRowModel().rows.map((row) => row.original)
    window.electron.ipcRenderer.send('SaveAccountListWindow', dataAccountNew)
  }

  return (
    <div className=" h-full py-3 px-2 ">
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden pt-2">
          <BoxLabel label="Account List" className=" w-full pt-4  px-2 ">
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
                          {headerGroup.headers.map((header, index) => (
                            <th
                              key={header.id}
                              {...{
                                colSpan: header.colSpan,
                                style: {
                                  width: index === 0 ? '20px' : header.getSize()
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
                                            (table.options.columnResizeDirection === 'rtl'
                                              ? -1
                                              : 1) *
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
                      {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                          {row.getVisibleCells().map((cell, index) => (
                            <td
                              key={cell.id}
                              {...{
                                style: {
                                  width: index === 0 ? '20px' : cell.column.getSize()
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
          </BoxLabel>
        </div>
        <div className="text-right mt-1.5 mr-3">
          <Button
            variant="outline"
            className=" border rounded-none border-solid border-blue-500 py-0 px-8 leading-none h-7"
            onClick={handleCloseAccountList}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
