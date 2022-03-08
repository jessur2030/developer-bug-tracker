import { useSelector } from "react-redux";
function NoteItem({ note }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isTeamMember ? "rgba(0,0,0,0.7)" : "#f2f2f2",
        color: note.isTeamMember ? "#fff" : "rgba(0,0,0,0.9)",
      }}
    >
      <h4>
        <span>{user.name}</span>{" "}
      </h4>
      <p>{note.text}</p>
      <div className="note-date">
        {new Date(note.createdAt).toLocaleString("en-US")}
      </div>
    </div>
  );
}

export default NoteItem;
