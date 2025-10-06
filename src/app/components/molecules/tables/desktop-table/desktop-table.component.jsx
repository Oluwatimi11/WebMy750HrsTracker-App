import { Table } from "antd";
import PropTypes from "prop-types";
import React from "react";

import styles from "./desktop-table.module.scss";

/**
 * DesktopTable component displays a table for desktop view.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.allowOnRowClick - Indicates whether clicking row triggers an action.
 * @param {Array} props.columns - The configuration of columns in the table.
 * @param {Array} props.dataSource - The data source for the table.
 * @param {Function} [props.handleOnRowClick] - Callback function to handle row click.
 * @param {boolean} props.loading - A flag indicating whether the table is in a loading state.
 * @return {JSX.Element} The rendered DesktopTable component.
 */
const DesktopTable = ({
  allowOnRowClick,
  columns,
  dataSource,
  handleOnRowClick,
  loading,
}) => {
  return (
    <div>
      <div className={styles.desktopTable}>
        <Table
          className={styles.table}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          onRow={(record) => {
            return {
              onClick: () => allowOnRowClick && handleOnRowClick(record),
            };
          }}
          pagination={false}
          rowClassName={styles.table_Row}
          rowKey={(record) => record.id || crypto.randomUUID()}
          scroll={{
            y: 550,
          }}
        />
      </div>
    </div>
  );
};

DesktopTable.defaultProps = {
  allowOnRowClick: false,
  handleOnRowClick: () => {},
};

DesktopTable.propTypes = {
  allowOnRowClick: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  handleOnRowClick: PropTypes.func,
  loading: PropTypes.bool.isRequired,
};

export default DesktopTable;
