import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Badge from "@material-ui/core/Badge";
import Search from "./Search";

interface ToolbarProps {
  handleOpen: () => void;
  toggleDrawer: () => void;
  handleSearch: (query: string) => void;
  handleReset: () => void;
  setOpenPatterns: (open: boolean) => void;
  numSelected: number;
}

const Toolbar: React.FC<ToolbarProps> = ({
  numSelected,
  handleOpen,
  toggleDrawer,
  handleSearch,
  handleReset,
  setOpenPatterns,
}) => {
  return (
    <div className="toolbar">
      <span className="toolbar__header">Results</span>
      <div className="toolbar__actions">
        <Tooltip title="Patterns" placement="top">
          <button
            className="toolbar__button"
            onClick={() => setOpenPatterns(true)}
          >
            #
          </button>
        </Tooltip>
        <Tooltip title="Create" placement="top">
          <button className="toolbar__button" onClick={handleOpen}>
            <AddIcon />
          </button>
        </Tooltip>
        <Tooltip title="Delete" placement="top">
          <button className="toolbar__button" onClick={toggleDrawer}>
            <Badge
              badgeContent={numSelected}
              color="primary"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <DeleteOutlineIcon />
            </Badge>
          </button>
        </Tooltip>
        <Search handleSearch={handleSearch} handleReset={handleReset} />
      </div>
    </div>
  );
};

export default Toolbar;
