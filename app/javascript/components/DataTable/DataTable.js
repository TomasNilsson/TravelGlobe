import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import styles from './DataTable.module.scss'

const DataTable = (tableProps) => (
  <BootstrapTable
    pagination={paginationFactory()}
    bootstrap4
    bordered={false}
    hover
    classes={styles.table}
    wrapperClasses="table-responsive"
    {...tableProps}
  />
)

export default DataTable
