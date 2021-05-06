import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const FilterByPattern = () => {
  const [filterSelection, setFilterSelection] = useState<any>({});

  //   const handleFetchFilters = async() => {
  //     await
  //   }

  useEffect(() => {
    console.log("FILTER SELECTION >>>", filterSelection);
  }, [filterSelection]);

  return (
    <div className="filterPatterns">
      <Grid container>
        <Grid xs={4} item>
          <div>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Field 1</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                autoWidth={true}
                value={filterSelection.filter1}
                onChange={(e) =>
                  setFilterSelection({
                    ...filterSelection,
                    filter1: e.target.value,
                  })
                }
                onOpen={handleFetchFilters}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid xs={8} item>
          hi!
        </Grid>
      </Grid>
    </div>
  );
};

export default FilterByPattern;
