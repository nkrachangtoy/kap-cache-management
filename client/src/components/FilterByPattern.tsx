import React, { useState, useEffect } from "react";
import { fetchFilters } from "../network/network";
import {
  List,
  ListItem,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";

const FilterByPattern: React.FC = () => {
  const [filterSelection, setFilterSelection] = useState<any>({});
  const [activeFilter, setActiveFilter] = useState<number>(-1);
  const [showPatterns, setShowPatterns] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [availablePatterns, setAvailablePatterns] = useState<any>(null);

  const handleFetchFilters = async (fieldNum: number) => {
    //set conditional, if field has been selected before, overwrite, not add to query

    //if filterSelection.field[`${fieldNum}`] exists, delete that and all following queries before fetching
    if (filterSelection[`field${fieldNum}`] !== null) {
      let i = fieldNum;
      while (i <= Object.keys(filterSelection).length + 1) {
        console.log(
          "while loop ...> field about to be deleted:",
          filterSelection[`field${i}`]
        );
        delete filterSelection[`field${i}`];
        i++;
      }
      filterSelection[`field${fieldNum}`] = null;
    }

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

  const handleReset = async () => {
    setFilterSelection({});
    setAvailablePatterns(null);
    setActiveFilter(-1);
  };

  // useEffect(() => {
  //   (async () => {
  //     await handleFetchFilters(0);
  //   })();
  // }, []);

  useEffect(() => {
    console.log("FILTER SELECTION >>>", filterSelection);
    console.log("object keys", availablePatterns);
  }, [filterSelection]);

  return (
    <div className="filterPatterns">
      {/* ===== LIST OF FIELDS AND SELECTED PATTERNS ===== */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h1>Filter By Pattern</h1>
          <h4>Selected Patterns:</h4>
          <List>
            {availablePatterns ? (
              Object.keys(availablePatterns).map((field, i) => (
                <ListItem
                  button
                  style={{ backgroundColor: "lightgrey" }}
                  key={i}
                  onClick={() => handleFetchFilters(i)}
                >
                  {filterSelection?.[`field${i}`] && (
                    <span className="filterPatterns__selected">
                      {filterSelection?.[`field${i}`]}
                    </span>
                  )}
                </ListItem>
              ))
            ) : (
              <ListItem style={{ backgroundColor: "lightgrey" }}>
                <span className="filterPatterns__selectNext">
                  none selected
                </span>
              </ListItem>
            )}
          </List>
          <Button className="filterPatterns__buttons" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={() => handleFetchFilters(activeFilter + 1)}>
            Select Next Field
          </Button>
        </Grid>
        <Grid item xs={6}>
          {/* ===== PATTERNS AVAILABLE TO BE SELECTED ===== */}
          <h4>ActiveFilter #: {activeFilter}</h4>
          {loading && <CircularProgress />}
          {showPatterns && (
            <List>
              {availablePatterns?.[`field${activeFilter}`]?.map(
                (pattern: string, i: number) =>
                  pattern ? (
                    <ListItem
                      key={i}
                      button
                      onClick={() => {
                        setFilterSelection({
                          ...filterSelection,
                          [`field${activeFilter}`]: pattern,
                        });
                        setAvailablePatterns({
                          ...availablePatterns,
                          [`field${activeFilter + 1}`]: null,
                        });
                        setShowPatterns(false);
                      }}
                    >
                      {pattern}
                    </ListItem>
                  ) : (
                    <div>
                      <p>No other patterns found.</p>
                      <Button className="filterPatterns__buttons">
                        See Value
                      </Button>
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
