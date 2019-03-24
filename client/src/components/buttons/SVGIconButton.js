import React from 'react';
import Fab from '@material-ui/core/Fab';
import SvgIcon from '@material-ui/core/SvgIcon';

const SVGIconButton = ({ href, color="#ffffff", fontSize, pathName, ...rest }) => {
  return (
    <Fab
      style={{boxShadow: 'none', background: 'transparent'}}
      href={href}
      {...rest}
    >
      <SvgIcon style={{color: `${color}`, fontSize: `${fontSize}`}}>
        <path d={pathName} />
      </SvgIcon>
    </Fab>
  )
}

export default SVGIconButton;
