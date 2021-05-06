import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Search from "./Search";

interface ToolbarProps {
  handleOpen: () => void;
  toggleDrawer: () => void;
  handleSearch: (query: string) => void;
  handleReset: () => void;
  setOpenPatterns: (open: boolean) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
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
            <DeleteOutlineIcon />
          </button>
        </Tooltip>
        <Tooltip title="Filter" placement="top">
          <button className="toolbar__button" onClick={toggleDrawer}>
            <FilterListIcon />
          </button>
        </Tooltip>
        <Search handleSearch={handleSearch} handleReset={handleReset} />
      </div>
    </div>
  );
};

export default Toolbar;
