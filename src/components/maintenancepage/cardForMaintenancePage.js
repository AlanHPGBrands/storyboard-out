import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BasicCard(props) {
  return (
    <Card sx={{ minWidth: 275,fontFamily:'Roboto, sans-serif' }}>
      <CardContent>
        <Typography sx={{ fontSize: 22 }} color="text.primary" gutterBottom>
          {props.title}
        </Typography>
          {props.children}
      </CardContent>
    </Card>
  );
}