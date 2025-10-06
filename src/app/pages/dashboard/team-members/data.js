/* eslint-disable camelcase */

import TeamMembersIconWrapper from "../../../components/atoms/team-members-icon-wrapper/team-members-icon-wrapper.component";
import columnStyles from "../../../components/molecules/tables/table-wrapper/column-styles.module.scss";

export const renderRoles = (roles) => roles?.map(role => role?.name).join(', ')

export const teamMembersColumns = [
  {
    title: <p className={columnStyles.table_title}>Team Members</p>,
    dataIndex: "name",
    key: "name",
    render: (name) => {
      return <div className={columnStyles.table_content}>
        {name || "N/A"}
      </div>
    }
  },

  {
    title: <p className={columnStyles.table_title}>Tag</p>,
    dataIndex: "roles",
    key: "roles",
    render: (roles) => {
      return (
      <div className={columnStyles.table_content}>
          {renderRoles(roles) || "N/A"}
      </div>
    )}
  },

  {
    dataIndex: "id",
    key: "id",
    render: (id, record) => {
      return (
        <div className={columnStyles.table_contentAction}>
          <TeamMembersIconWrapper data={record} id={id} />
        </div>
      );
    },
  },
];

export const mobileTeamMembersColumns = [
  { key: "name", label: "Team Member" },
  { key: "roles", label: "Tag" },
];

export const renderMobileTeamMembersHeader = (header) => header?.label;

export const renderMobileTeamMembersCell = (header, item) => {
  if(header.key === 'roles') return renderRoles(item[header.key])
  return item[header.key]
}

export const renderMobileTeamMembersIcon = (item) => {
  return <TeamMembersIconWrapper data={item} id={item?.id} />;
};
