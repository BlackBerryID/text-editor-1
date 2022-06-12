import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper, IconButton } from '@mui/material';
import './note.scss';

type Note = {
  title: string;
  description: string;
};

type NoteProps = {
  note: Note;
  index: number;
};

export const Note = ({ note, index }: NoteProps) => {
  return (
    <Paper className="editor_note" id={String(index)}>
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
