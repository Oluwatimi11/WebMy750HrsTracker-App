import { Spin, Empty } from "antd";
import PropTypes from "prop-types";
import React from "react";

import styles from "./mobile-table.module.scss";
import { composeClasses, isNotEmptyArray } from "../../../../../utils/utils/utils";

/**
 * MobileTable Component.
 * @param {object} props - The component props.
 * @param {boolean} props.allowOnRowClick - Whether to allow row click.
 * @param {Array} props.columns - Array of table columns.
 * @param {Array} props.dataSource - Array of table dataSource objects.
 * @param {boolean} props.loading - Whether the table is in loading state.
 * @param {Function} props.renderItemHeaderCell - Function to render item header cell.
 * @param {Function} props.renderItemValueCell - Function to render item value cell.
 * @param {React.Element} props.mobileDropdownIcon - Dropdown icon element.
 * @param {Function} props.onClickItem - Function to handle item click.
 * @param {string} props.tableClass - Additional class for the table.
 * @param {Function} props.parseItemClass - Function to parse item class.
 * @param {Function} props.parseItemRowClass - Function to parse item row class.
 * @return {React.Element} MobileTable component.
 */
const MobileTable = ({
  allowOnRowClick,
  dataSource,
  columns,
  loading,
  renderItemHeaderCell,
  renderItemValueCell,
  renderMobileIcon,
  onClickItem,
  parseItemClass,
  parseItemRowClass,
  tableClass,
}) => {
  /**
   * Handles the click event on an item.
   * @param {Object} item - The item object.
   * @return {void}
   */
  const handleClickItem = (item) => {
    if (allowOnRowClick && onClickItem && typeof onClickItem === "function") {
      onClickItem(item);
    }
  };

  /**
   * Renders an icon based on the provided item
   * @param {Object} item - The item object.
   * @return {React.Element|null} The rendered icon element or null if renderMobileIcon is falsy.
   */
  const renderIcon = (item) => {
    if (
      renderMobileIcon &&
      typeof renderMobileIcon === "function"
    ) {
      return renderMobileIcon(item);
    }
    return null;
  };

  if (loading) {
    return (
      <div className={styles.loading_or_emptyTable}>
        <Spin />
      </div>
    );
  }

  if (!isNotEmptyArray(dataSource))
    return (
      <div className={styles.loading_or_emptyTable}>
        <Empty />
      </div>
    );

  return (
    <div>
      <div
        aria-label="Mobile Table"
        className={composeClasses(styles.mobileTable, tableClass)}
      >
        {dataSource?.map((item, itemIndex) => {
          return (
            <div
              aria-label="Table Item"
              className={composeClasses(
                styles["mobileTableItem"],
                allowOnRowClick ? styles["mobileTableItemHover"] : "",
                parseItemClass(item)
              )}
              key={`row-${itemIndex}`}
              onClick={() => handleClickItem(item)}
            >
              {renderIcon(item)}
              {columns?.map((header, rowIndex) => {
                return (
                  <div
                    className={composeClasses(
                      styles["mobileTableItemRow"],
                      parseItemRowClass(header, item, itemIndex)
                    )}
                    key={`item-${rowIndex}`}
                  >
                    <div className={styles["mobileTableItemHeaderCell"]}>
                      {renderItemHeaderCell(header, item, itemIndex)}
                    </div>
                    <div className={styles["mobileTableItemValueCell"]}>
                      {renderItemValueCell(header, item, itemIndex)
                        ? renderItemValueCell(header, item, itemIndex)
                        : `N/A`}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

MobileTable.defaultProps = {
  allowOnRowClick: false,
  loading: false,
  renderMobileIcon: () => {},
  parseItemClass: () => "",
  parseItemRowClass: () => "",
  tableClass: "",
};

MobileTable.propTypes = {
  allowOnRowClick: PropTypes.bool,
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool,
  onClickItem: PropTypes.func.isRequired,
  parseItemClass: PropTypes.func,
  parseItemRowClass: PropTypes.func,
  renderItemHeaderCell: PropTypes.func.isRequired,
  renderItemValueCell: PropTypes.func.isRequired,
  renderMobileIcon: PropTypes.func,
  tableClass: PropTypes.string,
};

export default MobileTable;
