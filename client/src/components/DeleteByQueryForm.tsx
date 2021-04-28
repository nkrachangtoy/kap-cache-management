import React from "react";

interface DeleteByQueryProps {
  handleDeleteByQuery: () => void;
  deleteQuery: string;
  setDeleteQuery: (query: string) => void;
}

const DeleteByQueryForm: React.FC<DeleteByQueryProps> = ({
  handleDeleteByQuery,
  deleteQuery,
  setDeleteQuery,
}) => {
  return (
    <>
      <h4>Delete By Query</h4>
      <hr />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleDeleteByQuery();
          setDeleteQuery("");
        }}
        className="sideDrawer__form"
      >
        <div>
          <input
            type="text"
            placeholder="Delete by Redis pattern"
            onChange={(e) => setDeleteQuery(e.target.value)}
            value={deleteQuery}
          />
          <button type="submit">Bulk Delete</button>
        </div>
        <p className="sideDrawer__warning">
          Warning: This action cannot be undone.
        </p>
      </form>
    </>
  );
};

export default DeleteByQueryForm;
