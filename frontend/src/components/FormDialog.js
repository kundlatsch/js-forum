import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({
  open,
  handleClose,
  title,
  info,
  textField,
  handleReturn,
}) {

  const [promptValue, setPromptValue] = useState("");

  const setReturnValue = () => {
    handleReturn(promptValue);
  }

  return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {info}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type={textField}
            onChange={(e) => {
              setPromptValue(e.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setReturnValue();
            handleClose();
          }} color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  );
}
