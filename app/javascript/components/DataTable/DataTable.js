import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import paginationFactory from 'react-bootstrap-table2-paginator'
import styles from './DataTable.module.scss'

const DataTable = ({
  keyField,
  data,
  columns,
  defaultSearch,
  ...restProps
}) => {
  const { SearchBar } = Search

  return (
    <ToolkitProvider
      keyField={keyField}
      data={data}
      columns={columns}
      bootstrap4
      search={{
        defaultSearch,
      }}
    >
      {({ baseProps, searchProps }) => (
        <>
          <SearchBar {...searchProps} />
          <BootstrapTable
            {...baseProps}
            pagination={paginationFactory({
              hideSizePerPage: true,
            })}
            bordered={false}
            hover
            classes={styles.table}
            wrapperClasses="table-responsive"
            {...restProps}
          />
        </>
      )}
    </ToolkitProvider>
  )
}

export default DataTable
