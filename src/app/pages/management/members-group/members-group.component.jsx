import React, { Fragment } from "react";
import MembersHeader from "../../../components/molecules/members-header/members-header.component";
import MembersAction from "../../../components/molecules/members-action/members-action.component";
import MembersFooter from "../../../components/molecules/members-footer/members-footer.component";
import Image from "../../../components/atoms/image/image.component";
import styles from "./members-group.module.scss";
import { memberData } from "../../../assets/data/member";

const layoutImage =
  "https://res.cloudinary.com/dftu6mjmt/image/upload/v1711389523/750HoursTracker/Frame_1000008033_zwm56r.png";

const MembersGroup = () => {
  return (
    <Fragment>
      <MembersHeader />
      <div>
        <div>
          <Image
            className={styles["sidenav__logo"]}
            url={layoutImage}
            altName="logo-image"
          />
        </div>
        <div className={styles["members__main"]}>
          <div className={styles["members__main--div"]}>
            <h2 className={styles["members__main--head"]}>Welcome to the <br />my750hrstracker Community!</h2>
            <p className={styles["members__main--para"]}>
              Here at 750hrs, we believe that collaboration and connection are
              key to success. That's why we'rethrilled to have you join our
              vibrant community of real estate professionals!
            </p>
            <p className={styles["members__main--para"]}>As a member of the my750hrstracker community, you'll enjoy:</p>
          </div>
          <div className={styles["members__card--body"]}>
            <div className={styles["members__div"]}>
              {memberData.map((el, i) => {
                const { index, title, content } = el;
                const contentParts = content.split(/<\/?ul>|<\/?li>/);

                return (
                  <div
                    key={`members_${index}`}
                    className={styles["members__card"]}
                  >
                    <div className={styles["members__card--head"]}>
                      <div className={styles["members__card--indicator"]}></div>
                      <h3 className={styles["members__card--head-3"]}>
                        {title}
                      </h3>
                    </div>
                    <div className={styles["members__card--body"]}>
                      {contentParts.map((part, partIndex) => (
                        <p
                          key={`mid_${index}_${partIndex}`}
                          className={styles["members__card--para"]}
                        >
                          {part}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
              ;
            </div>
          </div>
          <div className={styles["members__sub"]}>
            <h4 className={styles["members__sub--head"]}>
              Become a part of something bigger <br />and join our thriving community
              today!
            </h4>
            <p className={styles["members__sub--para"]}>Here are some ways to get involved:</p>
            <ul className={styles["members__ul"]}>
              <li className={styles["members__li"]}>
                Join our forum and introduce yourself <a href="#" className={styles["members__sub--link"]}>Link to forum here.</a>
              </li>
              <li className={styles["members__li"]}>
                Follow us on social media for the latest updates and
                announcements.
              </li>
            </ul>
            <p className={styles["members__para"]}>We look forward to seeing you there!</p>
          </div>
        </div>
      </div>
      <MembersAction />
      <MembersFooter />
    </Fragment>
  );
};

export default MembersGroup;
