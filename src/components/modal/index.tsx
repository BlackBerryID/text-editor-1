import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import './modal.scss';

export const Modal = ({
  note: { title, description },
  isModalOpen,
  closeModal,
  modalMode,
  currentNote,
}: ModalProps) => {
  const [noteTitle, setNoteTitle] = useState<string>();
  const [noteDescription, setNoteDescription] = useState<string>();

  useEffect(() => {
    setNoteTitle(currentNote.title);
    setNoteDescription(currentNote.description);
  }, [currentNote]);

  return (
    <Dialog
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">
        {modalMode === 'show' ? (
          title
        ) : (
          <TextField
            multiline
            fullWidth
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        )}
      </DialogTitle>
      <DialogContent>
        <DialogContentText className="dialog-content_text" id="dialog-description">
          {modalMode === 'show' ? (
            description
          ) : (
            <TextField
              multiline
              fullWidth
              value={noteDescription}
              onChange={(e) => setNoteDescription(e.target.value)}
            />
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {modalMode === 'edit' ? <Button>Save</Button> : null}
        <Button onClick={closeModal}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
