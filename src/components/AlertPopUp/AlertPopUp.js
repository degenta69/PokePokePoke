import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import "./AlertPopUp.css"
import { useRecoilState } from 'recoil';
import alertPopUpAtom from '../../Atoms/alertPopUpAtom';

export default function AlertPopUp() {
  const [open, setOpen] = useRecoilState(alertPopUpAtom);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
        severity='error'
        color='error'
        variant='filled'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="large"
              onClick={() => {
                setOpen(false);
              }}
            >
              <p style={{fontSize:'21px', fontWeight:'900'}}>X</p>
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Sorry! We Don't Have That Pokemon yet.
        </Alert>
      </Collapse>
    </Box>
  );
}
