/**
 * @desc: centralise the paginator to the parent div
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paginator from './Paginator';

const PaginatorCenter = ({ classes, limit, total, pageCount, currentPage, handlePageChange }) => {
  return (
    <div className="paginator" className={classes.parent}>
    {/* <Typography>why no t showing</Typography> */}
      <div className={classes.child}>
        <Paginator
          limit={limit}
          pageCount={pageCount}
          total={total}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          styling="default"
        />
      </div>
    </div>
  )
}

const styles = {
  parent: {
    marginTop: '20px',
    padding: '20px',
    position: 'relative'
  },
  child: {
    margin: '0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}

export default withStyles(styles)(PaginatorCenter)
