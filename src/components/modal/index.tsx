import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
  addTag,
  activeIndex,
}: ModalProps) => {
  const [noteTitle, setNoteTitle] = useState<string>();
  const [noteDescription, setNoteDescription] = useState<string>();
  const [tagText, setTagText] = useState<string>('');

  useEffect(() => {
    setNoteTitle(currentNote.title);
    setNoteDescription(currentNote.description);
  }, [currentNote]);

  const saveHandler = modalMode === 'edit' ? () => {} : addTag;

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => {
        closeModal();
        setTagText('');
      }}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">
        {modalMode === 'edit' ? (
          <TextField
            multiline
            fullWidth
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        ) : (
          title
        )}
      </DialogTitle>
      <DialogContent className="dialog-content_text" id="dialog-description">
        {modalMode === 'show' ? (
          description
        ) : modalMode === 'edit' ? (
          <TextField
            multiline
            fullWidth
            value={noteDescription}
            onChange={(e) => setNoteDescription(e.target.value)}
          />
        ) : (
          <TextField
            multiline
            fullWidth
            label="Write the tag text"
            value={tagText}
            onChange={(e) => setTagText(e.target.value)}
            sx={{ marginTop: '10px' }}
          />
        )}
      </DialogContent>
      <DialogActions>
        {modalMode === 'show' ? null : (
          <Button
            onClick={() => {
              saveHandler(activeIndex, tagText);
              closeModal();
              setTagText('');
            }}
          >
            Save
          </Button>
        )}
        <Button
          onClick={() => {
            closeModal();
            setTagText('');
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
