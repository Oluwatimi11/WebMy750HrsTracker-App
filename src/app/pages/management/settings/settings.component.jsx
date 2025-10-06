import React, { useState } from "react";
import styles from "./settings.module.scss";
import TopNav from "../../../components/molecules/topnav/topnav.component";
import TopSection from "../../../components/molecules/top-section/top-section.component";
import SecuritySettings from "./security-settings/security-settings.component";
import AccountDetails from "./account-details/account-details.component";
import SubscriptionManager from "./subscription-manager/subscription-manager.component";
import { useStore } from "../../../../store";
import { useChangePassword } from "../../../../hooks/auth";

var topContent = {
  dashboardPage: "Settings",
  searchComponent: false,
  searchTitle: null,
  filterButton: false,
  timer: null,
};

const topList = [
  {
    index: 1,
    name: "Account Details",
    route: "account-details",
  },
  {
    index: 2,
    name: "Security Settings",
    route: "security-settings",
  },
  {
    index: 3,
    name: "Subscription Management",
    route: "subscription-manager",
  },
];

const Settings = () => {
  const [showContent, setShowContent] = useState(topList[0].route);
  const {mutate: changePassword, isPending} = useChangePassword();

  const handlePageChange = (route) => {
    setShowContent(route);
  };

  return (
		<div className={styles["settings"]}>
			<div className={styles["settings__top"]}>
				<div>
					<TopSection content={topContent} />
				</div>
				<TopNav
					topBar={topList}
					onChange={handlePageChange}
					defaultActive={showContent}
				/>
			</div>
			<div className={styles["settings__bottom"]}>
				{showContent === "account-details" ? (
					<AccountDetails />
				) : showContent === "security-settings" ? (
					<SecuritySettings
						changePassword={changePassword}
						isPending={isPending}
					/>
				) : (
					<SubscriptionManager />
				)}
			</div>
		</div>
  );
};

export default Settings;
