import React from "react";
import classnames from "classnames";
import { usePagination } from "../../../../hooks/usePagination";
import styles from "./pagination.module.scss";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 pages in pagination range, we shall not render the component
  if (paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];


  return (
    <div className={classnames(styles["pagination-div"], className)}>
      <ul className={classnames(styles["pagination-container"], className)}>
        {/* Left navigation arrow */}
        <li
          className={classnames(styles["pagination-item"], {
            [styles["disabled"]]: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <i className={styles["arrow"]}><RxCaretLeft /></i>
        </li>
        {paginationRange.map((pageNumber, index) => (
          <li
            key={index}
            className={classnames(styles["pagination-item"], {
              [styles["selected"]]: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber === "..." ? (
              <span className={styles["dots"]}>&#8230;</span>
            ) : (
              pageNumber
            )}
          </li>
        ))}
        {/* Right Navigation arrow */}
        <li
          className={classnames(styles["pagination-item"], {
            [styles["disabled"]]: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <i className={styles["arrow"]}><RxCaretRight /></i>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
