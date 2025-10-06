import React from "react";
import styles from "./using.module.scss";
import { usingData } from "../../../../assets/data/tips";

const Usings = () => {
  return (
    <div className={styles["usings__div"]}>
      {usingData.map((el, i) => {
        const { index, title, content } = el;
        const contentParts = content.split("<p>");

        return (
          <div key={`usings_${index}`} className={styles["usings__card"]}>
            <div className={styles["usings__card--head"]}>
              <div className={styles["usings__card--indicator"]}></div>
              <h3 className={styles["usings__card--head-3"]}>{index}({title})</h3>
            </div>
            <div className={styles["usings__card--body"]}>
            {contentParts.map((part, partIndex) => (
                <p
                  key={`mid_${index}_${partIndex}`}
                  className={styles["usings__card--para"]}
                >
                  {part}
                </p>
              ))}
            </div>
          </div>
        );
      })};
    </div>
  );
};

export default Usings;
