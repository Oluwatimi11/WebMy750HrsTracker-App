import React, { useState } from "react";
import Image from "../../atoms/image/image.component";
import { sideBarTop, sideBarBottom } from "../../../assets/data/nav";
import styles from "./sidenav.module.scss";
import { MdLogout } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {  logout } from "../../../../utils/utils/utils";
import { useGetUser, useUserDetail } from "../../../../hooks/user";

const profileImage =
  "https://res.cloudinary.com/dftu6mjmt/image/upload/v1710765786/750HoursTracker/tracker-auth_hrzsvc.png";
const layoutImage =
  "https://res.cloudinary.com/dftu6mjmt/image/upload/v1710765782/750HoursTracker/tracker-logo_copq4t.png";

const SideNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

	const { email, name, id } = useUserDetail();
	const { data } = useGetUser(id);

	const { profilePic } = data || {};
	const handleLogout = () => {
		logout();
		navigate("/signin");
	}

  return (
		<div className={styles["sidenav"]}>
			<div className={styles["sidenav__top"]}>
				<div className={styles["sidenav__img"]}>
					<Image
						className={styles["sidenav__logo"]}
						url={layoutImage}
						altName="logo-image"
					/>
				</div>
				<div className={styles["sidenav__top--nav"]}>
					{sideBarTop.map((data, index) => (
						<div
							className={styles["sidenav__list"]}
							key={data.id}
						>
							<NavLink
								className={`${styles.sidenav__links} ${
									location.pathname === data.route
										? styles.active
										: ""
								}`}
								to={data.route}
							>
								<i className={styles["sidenav__icon"]}>
									{data.icon}
								</i>
								{data.name}
							</NavLink>
						</div>
					))}
				</div>
			</div>
			<div className={styles["sidenav__bottom"]}>
				<div className={styles["sidenav__bottom--nav"]}>
					<div className={styles["sidenav__top--nav"]}>
						{sideBarBottom.map((data) => (
							<div
								className={styles["sidenav__list"]}
								key={data.id}
							>
								<NavLink
									className={`${styles.sidenav__links} ${
										location.pathname === data.route
											? styles.active
											: ""
									}`}
									to={data.route}
								>
									<i className={styles["sidenav__icon"]}>
										{data.icon}
									</i>
									{data.name}
								</NavLink>
							</div>
						))}
					</div>
				</div>
				<div className={styles["sidenav__user--div"]}>
					<div className={styles["sidenav__user--image"]}>
						<Image
							className={styles["sidenav__user--img"]}
							url={profilePic || profileImage}
							altName="logo-image"
						/>
					</div>
					<div className={styles["sidenav__user--details"]}>
						<h4 className={styles["sidenav__user--details"]}>
							{name}
						</h4>
						<p>{email}</p>
					</div>
					<div
						className={styles["sidenav__user--log"]}
						onClick={handleLogout}
					>
						<i className={styles["sidenav__user--log-icon"]}>
							<MdLogout />
						</i>
					</div>
				</div>
			</div>
		</div>
  );
};

export default SideNav;
