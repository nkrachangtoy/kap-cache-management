import React, { useState } from "react";

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
  const [confirmDelete, showConfirmDelete] = useState<boolean>(false);

  return (
    <>
      <h4 style={{ textAlign: "center" }}>Delete By Query</h4>
      <form className="sideDrawer__form">
        <input
          type="text"
          placeholder="Delete by Redis pattern"
          onChange={(e) => setDeleteQuery(e.target.value)}
          value={deleteQuery}
          style={{ marginBottom: "10px" }}
        />

        {!confirmDelete && (
          <div className="sideDrawer__buttonBlock">
            <button
              onClick={(e) => {
                e.preventDefault();
                showConfirmDelete(!confirmDelete);
              }}
              className="sideDrawer__button-delete"
            >
              Delete
            </button>
          </div>
        )}
        {confirmDelete && (
          <div>
            <p className="sideDrawer__warning">
              This action cannot be undone. Please confirm this delete.
            </p>
            <div className="sideDrawer__buttonBlock">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  showConfirmDelete(!confirmDelete);
                }}
                className="sideDrawer__button-cancel"
              >
                Cancel
              </button>
              <button
                className="sideDrawer__button-delete"
                onClick={(event) => {
                  event.preventDefault();
                  handleDeleteByQuery();
                  setDeleteQuery("");
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default DeleteByQueryForm;
