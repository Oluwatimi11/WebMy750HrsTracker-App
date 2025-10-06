import React from "react";
import styles from "./claim.module.scss";

const Claim = () => {
  return (
    <div className={styles["claim__div"]}>
      <div className={styles["claim__div--top"]}>
        <div className={`${styles["claim__card"]}`}>
          <div className={styles["claim__card--head"]}>
            <div className={styles["claim__card--indicator"]}></div>
            <h3 className={styles["claim__card--head-3"]}>
              Who can claim REPS?
            </h3>
          </div>
          <div className={styles["claim__card--body"]}>
            <p className={styles["claim__card--para"]}>
              <ul>
                <li>
                  {" "}
                  You must spend more than 750 hours in qualified real estate
                  activities per fiscal year.
                </li>
                <li>
                  {" "}
                  You must spend more time in real estate than any of your other
                  jobs combined.
                </li>
                <li>
                  {" "}
                  At least 500 of the 750 hours must be spent materially
                  participating in rental properties that you own.
                </li>
              </ul>
              <br />
              <br />
              *Note: the categories available in my750hrstracker are suggestions
              only. Some CPAs will agree and some will disagree. We advise you
              to log MORE than the bare minimum hours in the case that some of
              these categories are not deemed acceptable in an audit.*
            </p>
          </div>
        </div>
        <div className={`${styles["claim__card"]}`}>
          <div className={styles["claim__card--head"]}>
            <div className={styles["claim__card--indicator"]}></div>
            <h3 className={styles["claim__card--head-3"]}>
              Important points when filing your tax return
            </h3>
          </div>
          <div className={styles["claim__card--body"]}>
            <p className={styles["claim__card--para"]}>
              Occupation: your occupation should be listed as Real Estate
              Professional
              <br />
              <br />
              Election: an election should be included with your tax return to
              aggregate your rental properties as a single activity. This will
              allow you to add your hours spent on each rental property.
              <br />
              <br />
              Desinate: mark each rental property as REPS to have those losses
              offset W2 income
              <br />
              <br />
              Questions?
              <br />
              <br />
              Talk to a CPA knowledgeable in real estate for clarification
            </p>
          </div>
        </div>
      </div>

      <div className={styles["claim__div--bottom"]}>
        <div className={`${styles["claim__card"]}`}>
          <div className={styles["claim__card--head"]}>
            <div className={styles["claim__card--indicator"]}></div>
            <h3 className={styles["claim__card--head-3"]}>
              Will I have a tax benefit by claiming REPS?
            </h3>
          </div>
          <div className={styles["claim__card--body"]}>
            <p className={styles["claim__card--para"]}>
              You might if you have more than $150,000 adjusted gross income +
              rental investment losses.
              <br />
              <br /> In this case, claiming REPS will allow you to use rental
              losses to offset W2 and other income (including your spouse's
              income if filing jointly)
            </p>
          </div>
        </div>
        <div className={`${styles["claim__card"]}`}>
          <div className={styles["claim__card--head"]}>
            <div className={styles["claim__card--indicator"]}></div>
            <h3 className={styles["claim__card--head-3"]}>
              What is the most important part of claiming REPS?
            </h3>
          </div>
          <div className={styles["claim__card--body"]}>
            <p className={styles["claim__card--para"]}>
              Clear and consistent DOCUMENTATION of your REPS activity time in
              real time, along with maintaining supporting evidence of those
              activities...
              <br />
              your REPS hours up to date with my750hrstracker! Continue to see
              tips on using this app.
              <br />
              <br /> LLC and its owners, presenters, and employees are not in
              the business of providing personal, financial, tax, legal or
              investment advice and specifically disclaims any liability, loss
              or risk, which is incurred as a consequence, either directly or
              indirectly, by the use of any of the information contained in this
              app.
              <br />
              <br />
              my750hrstracker its website, and any online tools, if any, do NOT
              provide ANY legal, accounting, securities, investment, tax or
              other professional services advice and are not intended to be a
              substitute for meeting with professional advisors.
              <br /> <br />
              If legal advice or other expert assistance is required, the
              services of competent, licensed and certified professionals should
              be sought. In addition, my750hrstracker does not endorse ANY
              specific investments, investment strategies, advisors, or
              financial service firms.*
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Claim;
