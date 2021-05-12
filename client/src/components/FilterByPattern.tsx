import React, { useState, useEffect } from "react";
import { fetchFilters } from "../network/network";
import { List, ListItem, Grid, CircularProgress } from "@material-ui/core";

const FilterByPattern: React.FC = () => {
  const [filterSelection, setFilterSelection] = useState<any>({});
  const [activeFilter, setActiveFilter] = useState<number>(-1);
  const [showPatterns, setShowPatterns] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [availablePatterns, setAvailablePatterns] = useState<any>(null);

  const handleFetchFilters = async (fieldNum: number) => {
    //conditional: if field has been selected before, delete all fields in filterSelection following
    // required so that it doesn't get sent as a query to Redis
    if (filterSelection[`field${fieldNum}`] !== null) {
      let i = fieldNum;
      while (i <= Object.keys(filterSelection).length + 1) {
        delete filterSelection[`field${i}`];
        i++;
      }
    }

    //fetch filters based on the current ActiveFilter
    setLoading(true);
    setActiveFilter(fieldNum);
    const data = await fetchFilters(fieldNum, filterSelection);
    setAvailablePatterns({
      ...availablePatterns,
      [`field${fieldNum}`]: data,
    });
    setLoading(false);
    setShowPatterns(true);
  };

  const handleFilterSelect = async (pattern: string) => {
    setFilterSelection({
      ...filterSelection,
      [`field${activeFilter}`]: pattern,
    });
  };

  const handleReset = async () => {
    setFilterSelection({});
    setAvailablePatterns(null);
    setActiveFilter(-1);
  };

  useEffect(() => {
    handleFetchFilters(activeFilter + 1);
    // eslint-disable-next-line
  }, [filterSelection]);

  return (
    <div className="filterPatterns">
      {/* ===== LIST OF FIELDS AND SELECTED PATTERNS ===== */}
      <div style={{ textAlign: "center" }}>
        <h2>Filter By Pattern</h2>
        <p>Select a pattern to continue filtering by field</p>
      </div>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <h4>Selected Patterns:</h4>
          <List>
            {filterSelection && (
              <>
                {Object.keys(filterSelection).map((field, i) => (
                  <ListItem
                    button
                    className="filterPatterns__selectedListItem"
                    key={i}
                    onClick={() => handleFetchFilters(i)}
                  >
                    <span className="filterPatterns__selectedText">
                      {filterSelection?.[`field${i}`]}
                    </span>
                  </ListItem>
                ))}
              </>
            )}
          </List>

          {filterSelection.field0 && (
            <div className="filterPatterns__buttonDiv">
              <button className="filterPatterns__buttons" onClick={handleReset}>
                Reset
              </button>
            </div>
          )}
        </Grid>
        <Grid item xs={8} className="filterPatterns__grid">
          {/* ===== PATTERNS AVAILABLE TO BE SELECTED ===== */}
          {/* <h4>ActiveFilter #: {activeFilter}</h4> */}
          <h4>Available Patterns:</h4>
          {loading && (
            <div className="patternsDrawer__loader">
              <CircularProgress style={{ color: "#0484d3" }} />
            </div>
          )}
          {showPatterns && (
            <List>
              {availablePatterns?.[`field${activeFilter}`]?.map(
                (pattern: string, i: number) =>
                  pattern ? (
                    <ListItem
                      key={i}
                      button
                      onClick={() => {
                        handleFilterSelect(pattern);
                      }}
                    >
                      {pattern}
                    </ListItem>
                  ) : (
                    <div className="filterPatterns__buttonDiv">
                      <p>No other patterns found.</p>
                      <button className="filterPatterns__buttons">
                        See Value
                      </button>
                    </div>
                  )
              )}
            </List>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default FilterByPattern;
