import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function RatingSize() {
  return (
    <Stack spacing={1}>
      <Rating name="size-small" defaultValue={4} size="small" />
      {/* <Rating name="size-medium" defaultValue={2} />
      <Rating name="size-large" defaultValue={2} size="large" /> */}
    </Stack>
  );
}