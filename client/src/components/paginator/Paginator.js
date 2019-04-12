import React, { Component } from 'react';
import classNames from 'classnames';
import Pagination from 'react-paginating';
import { withStyles } from '@material-ui/core';

class Paginator extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      classes,
      total,
      limit,
      pageCount,
      currentPage,
      handlePageChange,
      styling
    } = this.props;

    return (
      <Pagination
        total={total}
        limit={limit}
        pageCount={pageCount}
        currentPage={currentPage}
      >
        {({
          pages,
          currentPage,
          hasNextPage,
          hasPreviousPage,
          previousPage,
          nextPage,
          getPageItemProps
        }) => (
          <div>

            {hasPreviousPage && (
              <button
                className={classNames(
                  {[classes.default_direction_btn]: styling==="default"},
                )}
                {...getPageItemProps({
                  pageValue: previousPage,
                  onPageChange: handlePageChange
                })}
              >
                <strong>{'<'}</strong>
              </button>
            )}

            {pages.map(page => {
              let activePage = null;
              if (currentPage === page) {
                activePage = { color: '#5d5d5d' };
              }
              return (
                <button
                  className={classNames(
                    {[classes.default_num_btn]: styling==="default"},
                    {[classes.panel_num_btn]: styling==="panel"}
                  )}
                  key={page}
                  style={activePage}
                  {...getPageItemProps({
                    pageValue: page,
                    onPageChange: handlePageChange
                  })}
                >
                  {page}
                </button>
              );
            })}

            {hasNextPage && (
              <button
                className={classNames(
                  {[classes.default_direction_btn]: styling==="default"},
                  {[classes.panel_direction_btn]: styling==="panel"}
                )}
                {...getPageItemProps({
                  pageValue: nextPage,
                  onPageChange: handlePageChange
                })}
              >
                <strong>{`>`}</strong>
              </button>
            )}

          </div>
        )}
      </Pagination>
    );
  }
}

const styles = () => ({
  default_num_btn: {
    fontSize: '18px',
    fontFamily: '"Raleway", serif',
    padding: '10px',
    border: 'none',
    color: '#d0cfcf',
    backgroundColor: '#f7f7f7',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none'
    }
  },
  default_direction_btn: {
    fontSize: '18px',
    fontFamily: '"Raleway", serif',
    padding: '10px',
    border: 'none',
    color: '#6F9283',
    cursor: 'pointer',
    backgroundColor: 'green',
    '&:focus': {
      outline: 'none'
    }
  },
  panel_num_btn: {
    fontSize: '15px',
    fontFamily: '"Raleway", serif',
    padding: '7px',
    border: 'none',
    color: '#d0cfcf',
    cursor: 'pointer',
    backgroundColor: '#cdc6a5',
    '&:focus': {
      outline: 'none'
    }
  },
  panel_direction_btn: {
    fontSize: '15px',
    fontFamily: '"Raleway", serif',
    padding: '7px',
    border: 'none',
    color: 'green',
    cursor: 'pointer',
    backgroundColor: '#cdc6a5',
    '&:focus': {
      outline: 'none'
    }
  }
})

export default withStyles(styles)(Paginator);
