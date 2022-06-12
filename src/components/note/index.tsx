import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper, IconButton } from '@mui/material';
import './note.scss';

export const Note = ({ note, index, changeCurrentNote }: NoteProps) => {
  return (
    <Paper className="editor_note" id={String(index)} onClick={() => changeCurrentNote(index)}>
      {note.title}
      <div className="button-wrapper">
        <IconButton color="info">
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon color="error" />
        </IconButton>
      </div>
    </Paper>
  );
};
