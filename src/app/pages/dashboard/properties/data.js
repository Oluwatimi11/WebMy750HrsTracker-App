/* eslint-disable camelcase */

import PropertiesIconWrapper from "../../../components/atoms/properties-icon-wrapper/properties-icon-wrapper.component";
import columnStyles from "../../../components/molecules/tables/table-wrapper/column-styles.module.scss";

export const propertiesColumns = [
  {
    title: <p className={columnStyles.table_title}>Name of Property</p>,
    dataIndex: "name",
    key: "name",
    render: (name) => (
      <div className={columnStyles.table_content}>
        {name || "N/A"}
      </div>
    ),
  },

  {
    title: <p className={columnStyles.table_title}>Address</p>,
    dataIndex: "address",
    key: "address",
    render: (address) => (
      <div className={columnStyles.table_content}>
        {address || "N/A"}
      </div>
    ),
  },

  {
    dataIndex: "id",
    key: "id",
    render: (id, record) => {
      return (
        <div className={columnStyles.table_contentAction}>
          <PropertiesIconWrapper data={record} id={id} />
        </div>
      );
    },
  },
];

export const mobilePropertiesColumns = [
  { key: "name", label: "Name of Property" },
  { key: "address", label: "Address" },
];

export const renderMobilePropertiesHeader = (header) => header?.label;

export const renderMobilePropertiesCell = (header, item) => item[header.key]

export const renderMobilePropertiesIcon = (item) => {
  return <PropertiesIconWrapper data={item} id={item?.id} />;
};


