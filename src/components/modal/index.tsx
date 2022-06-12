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
  addNote,
  editNote,
}: ModalProps) => {
  const [noteTitle, setNoteTitle] = useState<string>();
  const [noteDescription, setNoteDescription] = useState<string>();
  const [tagText, setTagText] = useState<string>('');

  useEffect(() => {
    if (modalMode !== 'addNote') {
      setNoteTitle(currentNote.title);
      setNoteDescription(currentNote.description);
    } else {
      setNoteTitle('');
      setNoteDescription('');
    }
  }, [currentNote, modalMode]);

  const highlightWord = (word: string) => {
    return <span className="bold">{word}</span>;
  };

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
        {modalMode === 'edit' || modalMode === 'addNote' ? (
          <TextField
            multiline
            fullWidth
            label="Note title"
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
        ) : modalMode === 'edit' || modalMode === 'addNote' ? (
          <TextField
            multiline
            fullWidth
            label="Note description"
            value={noteDescription
              ?.split(' ')
              .map((word) => {
                const isTagWord = currentNote.tags.some(
                  (tag) => word.toLocaleLowerCase() === tag.toLocaleLowerCase()
                );
                if (isTagWord) {
                  return `[${word}]`;
                } else {
                  return word;
                }
              })
              .join(' ')}
            onChange={(e) => setNoteDescription(e.target.value)}
            sx={{ mt: '10px' }}
          />
        ) : (
          <TextField
            multiline
            fullWidth
            label="Tag text"
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
              modalMode === 'addTag'
                ? addTag(activeIndex, tagText)
                : modalMode === 'addNote'
                ? addNote({
                    title: noteTitle || 'empty',
                    description: noteDescription || 'empty',
                    tags: [],
                  })
                : editNote(
                    {
                      title: noteTitle || 'empty',
                      description: noteDescription || 'empty',
                      tags: [],
                    },
                    activeIndex
                  );
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
