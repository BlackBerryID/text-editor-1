import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper, IconButton } from '@mui/material';
import './note.scss';

export const Note = ({ note, index, openModal }: NoteProps) => {
  return (
    <Paper className="editor_note" id={String(index)} onClick={() => openModal(index, 'show')}>
      {note.title}
      <div className="button-wrapper">
        <IconButton
          color="info"
          onClick={(e) => {
            e.stopPropagation();
            openModal(index, 'edit');
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon color="error" />
        </IconButton>
      </div>
    </Paper>
  );
};
