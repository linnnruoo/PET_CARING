import React from 'react';
import Paper from '../paper/Paper';
import { Typography } from '@material-ui/core';

const ProfileCard = ({ first_name, role, rating }) => {
  return (
    <>
      <Paper>
        <Typography gutterBottom variant="h5" style={{ fontWeight: "bold" }}>
        About Me
        </Typography>
        <Typography gutterBottom variant="h2" color="primary">
          Hi I'm {first_name},
          I am a {role === 'petowner' ? 'Pet Owner' : 'Caretaker'}
        </Typography>
      </Paper>
      { role === 'caretaker' && (
      <Paper>
        <Typography gutterBottom variant="h5" style={{ fontWeight: "bold" }}>
        Rating
        </Typography>
        <Typography gutterBottom variant="h2" color="primary">
          {rating === 0 ? "😐" : Array(rating).fill().map(i => "⭐")}
        </Typography>
      </Paper>)
      }
    </>
  )
}

export default ProfileCard;
