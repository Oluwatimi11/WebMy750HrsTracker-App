import React, { useMemo, useState } from "react";
import styles from "./table.module.scss";
import { RiErrorWarningLine, RiDeleteBin5Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { SlOptionsVertical } from "react-icons/sl";
import Pagination from "../pagination/pagination.component";

let PageSize = 10;

const Table = ({
  dataSource,
  dataColumns,
  infoIcon,
  editIcon,
  deleteIcon,
  optionIcon,
  tableHeading,
  paginator,
  submitButton,
  handleEdit,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dataSource.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div>
      {tableHeading ? (
        <div className={styles["table__main--div"]}>
          <h3 className={styles["table__header"]}>{tableHeading}</h3>

          <table className={styles["table__div-1"]}>
            <thead className={styles["table__head"]}>
              <tr className={styles["table__head--row"]}>
                {dataColumns.map((heading, index) => (
                  <th key={`column_${index}`} className={styles["table__th"]}>
                    <div>
                      <span>{heading}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={styles["table__body"]}>
              {currentTableData.map((row, rowIndex) => (
                <tr key={rowIndex} className={styles["table__row"]}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`column_${cellIndex}`}
                      className={styles["table__td"]}
                    >
                      {cell === "Personal" ? (
                        <div
                          className={`${styles["table__td--real"]} ${
                            rowIndex !== dataSource.length - 1
                              ? styles["table__row--border"]
                              : ""
                          }`}
                        >
                          <span>{cell}</span>
                        </div>
                      ) : cell === "Real Estate" ? (
                        <div
                          className={`${styles["table__td--personal"]} ${
                            rowIndex !== dataSource.length - 1
                              ? styles["table__row--border"]
                              : ""
                          }`}
                        >
                          <span>{cell}</span>
                        </div>
                      ) : (
                        <div
                          className={`${styles["table__row--div"]} ${
                            rowIndex !== dataSource.length - 1
                              ? styles["table__row--border"]
                              : ""
                          }`}
                        >
                          <span>{cell}</span>
                        </div>
                      )}
                    </td>
                  ))}
                  <td className={styles["table__icon--div"]}>
                    {optionIcon ? (
                      <i className={styles["table__option--icn"]} id="option">
                        <a href="#">
                          <SlOptionsVertical color="#1B1B1B" />
                        </a>
                      </i>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <table className={styles["table__div"]}>
          <thead className={styles["table__head"]}>
            <tr className={styles["table__head--row"]}>
              {dataColumns.map((heading, index) => (
                <th key={`column_${index}`} className={styles["table__th"]}>
                  <div>
                    <span className={styles["table__head--span"]}>
                      {heading}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles["table__body"]}>
            {currentTableData.map((row, rowIndex) => (
              <tr key={rowIndex} className={styles["table__row"]}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={`column_${cellIndex}`}
                    className={styles["table__td"]}
                  >
                    {cell === "Personal" ? (
                      <div
                        className={`${styles["table__td--real"]} ${
                          rowIndex !== dataSource.length - 1
                            ? styles["table__row--border"]
                            : ""
                        }`}
                      >
                        <span>{cell}</span>
                      </div>
                    ) : cell === "Real Estate" ? (
                      <div
                        className={`${styles["table__td--personal"]} ${
                          rowIndex !== dataSource.length - 1
                            ? styles["table__row--border"]
                            : ""
                        }`}
                      >
                        <span>{cell}</span>
                      </div>
                    ) : (
                      <div
                        className={`${styles["table__row--div"]} ${
                          rowIndex !== dataSource.length - 1
                            ? styles["table__row--border"]
                            : ""
                        }`}
                      >
                        <span>{cell}</span>
                      </div>
                    )}
                  </td>
                ))}
                <td className={styles["table__icon--div"]}>
                  {optionIcon ? (
                    <i className={styles["table__option--icn"]} id="option">
                      <a href="#">
                        <SlOptionsVertical color="#1B1B1B" />
                      </a>
                    </i>
                  ) : null}
                  {infoIcon ? (
                    <i className={styles["table__icon--icn"]} id="info">
                      <a href="#">
                        <RiErrorWarningLine color="#003889" />
                      </a>
                    </i>
                  ) : null}
                  {editIcon ? (
                    <i className={styles["table__icon--icn"]} id="edit">
                      <a href="#" onClick={handleEdit}>
                        <TbEdit color="#FF8300" />
                      </a>
                    </i>
                  ) : null}
                  {deleteIcon && row[1] !== "Owner" ? (
                    <i className={styles["table__icon--icn"]} id="delete">
                      <a href="#">
                        <RiDeleteBin5Line color="#F12525" />
                      </a>
                    </i>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {paginator ? (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={dataSource.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      ) : null}
    </div>
  );
};

export default Table;
