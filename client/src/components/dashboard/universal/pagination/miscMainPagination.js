import React, { Fragment } from "react";
import ReactPaginate from 'react-paginate';
import "./styles.css";

const PaginationGeneralHelper = ({ itemsPerPage, loopingData, currentPage, pageCount, setItemOffset, setCurrentPage }) => {

    const handlePageClick = ({ selected }) => {
        // offset for pagination
        const newOffset = (selected * itemsPerPage) % loopingData.length;
        // change pagination "offset"
        setItemOffset(newOffset);
        // change current page
        setCurrentPage(selected);
    }

    return (
        <Fragment>
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel="..."
                breakClassName="page-item pagination-custom-page-item"
                breakLinkClassName="page-link pagination-custom-link"
                pageCount={pageCount}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName="pagination justify-content-center container-classname-pagination-custom"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item customized-pagination-page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item customized-next-pagination"
                nextLinkClassName="page-link pagination-next-link-classname"
                activeClassName="active active-tabbed-pagination"
                hrefBuilder={(page, pageCount, selected) =>
                    page >= 1 && page <= pageCount ? `/page/${page}` : '#'
                }
                hrefAllControls
                forcePage={currentPage}
                onClick={(clickEvent) => handlePageClick(clickEvent)}
            />
        </Fragment>
    );
}
export default PaginationGeneralHelper;