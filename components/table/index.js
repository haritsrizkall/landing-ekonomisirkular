import { useGlobalFilter, useTable } from "react-table"
import GlobalFilter from "../globalFilter"

const Table = ({
    data,
    columns,
    tableHooks,
    initialState,
}) => {
    const tableInstance = useTable(
        {
          columns, 
          data,
          initialState,
        }, 
        useGlobalFilter,
        tableHooks && tableHooks,
        )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        state,
      } = tableInstance

    return (
        <>
            <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    setGlobalFilter={setGlobalFilter}
                    globalFilter={state.globalFilter}
                />
                <table className="w-full table-auto" {...getTableProps()}>
                <thead className="bg-slate-200">
                  {// Loop over the header rows
                  headerGroups.map((headerGroup, index) => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()} key={index.toString()}>
                      {// Loop over the headers in each row
                      headerGroup.headers.map((column, index) => (
                        // Apply the header cell props
                        <th {...column.getHeaderProps()} className="py-3 px-2 text-left" key={index.toString()}>
                          {// Render the header
                          column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()}>
                  {// Loop over the table rows
                  rows.map(row => {
                    // Prepare the row for display
                    prepareRow(row)
                    return (
                      // Apply the row props
                      <tr {...row.getRowProps()} key={row.id}>
                        {// Loop over the rows cells
                        row.cells.map((cell, index) => {
                          // Apply the cell props
                          return (
                            <td {...cell.getCellProps()} className="px-2 py-4" key={index.toString()}>
                              {// Render the cell contents
                              cell.render('Cell')}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
                </table>
        </>
    )
}

export default Table