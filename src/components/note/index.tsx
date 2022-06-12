import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Paper, IconButton, Chip } from '@mui/material';
import './note.scss';

export const Note = ({ note: { title, tags }, index, openModal }: NoteProps) => {
  return (
    <Paper className="editor_note" id={String(index)} onClick={() => openModal(index, 'show')}>
      <div className="editor_note_main-wrapper">
        {title}
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
      </div>
      <div className="editor_note_tags-wrapper">
        {tags.map((tag, index) => (
          <Chip className="tag" key={tag + index} label={`#${tag}`} variant="outlined" />
        ))}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            openModal(index, 'addTag');
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
    </Paper>
  );
};
