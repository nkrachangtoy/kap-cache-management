import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { fetchFilters } from "../network/network";
import Grid from "@material-ui/core/Grid";
import { List, ListItem } from "@material-ui/core";

const FilterByPattern: React.FC = () => {
  const [filterSelection, setFilterSelection] = useState<any>({});
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const [showPatterns, setShowPatterns] = useState(false);
  const [availablePatterns, setAvailablePatterns] = useState<any>({
    field0: ["Select a filter"],
  });

  const handleFetchFilters = async (fieldNum: number) => {
    setActiveFilter(fieldNum);
    const data = await fetchFilters(fieldNum, filterSelection);
    setAvailablePatterns({
      ...availablePatterns,
      [`field${fieldNum}`]: data,
    });

    setShowPatterns(true);
  };

  useEffect(() => {
    console.log("FILTER SELECTION >>>", filterSelection);
    console.log("object keys", availablePatterns);
  }, [filterSelection]);

  return (
    <div className="filterPatterns">
      {/* ===== LIST OF FIELDS AND SELECTED PATTERNS ===== */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <List>
            {Object.keys(availablePatterns).map((field, i) => (
              <ListItem
                button
                style={{ backgroundColor: "lightgrey" }}
                key={i}
                onClick={() => handleFetchFilters(i)}
              >
                {filterSelection?.[`field${i}`]
                  ? filterSelection?.[`field${i}`]
                  : field}
              </ListItem>
            ))}
          </List>
          <Button
            className="filterPatterns__buttons"
            onClick={() => {
              setFilterSelection({});
              setAvailablePatterns({ field0: ["Select a filter"] });
            }}
          >
            Reset
          </Button>
        </Grid>
        <Grid item xs={6}>
          {/* ===== PATTERNS AVAILABLE TO BE SELECTED ===== */}
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
                          [`field${activeFilter + 1}`]: "loading...",
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
