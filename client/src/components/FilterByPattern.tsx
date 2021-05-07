import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { fetchFilters } from "../network/network";

const FilterByPattern = () => {
  const [filterSelection, setFilterSelection] = useState<any>({});
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [availablePatterns, setAvailablePatterns] = useState<Array<string>>([]);

  const handleFetchFilters = async (fieldNum: number, query?: string) => {
    const data = await fetchFilters(fieldNum, query);
    setAvailablePatterns(data);
    setSelectOpen(true);
  };

  useEffect(() => {
    console.log("FILTER SELECTION >>>", filterSelection);
  }, [filterSelection]);

  return (
    <div className="filterPatterns">
      <Grid container>
        <Grid xs={4} item>
          <div>
            <FormControl>
              <InputLabel id="field0">Field 0</InputLabel>
              <Select
                labelId="field0"
                id="field0"
                autoWidth={true}
                value={filterSelection.filter0}
                onChange={(e) =>
                  setFilterSelection({
                    ...filterSelection,
                    filter0: e.target.value,
                  })
                }
                open={selectOpen}
                onOpen={(e) => {
                  e.preventDefault();
                  handleFetchFilters(0);
                }}
              >
                {availablePatterns?.map((pattern) => (
                  <MenuItem value={pattern}>{pattern}</MenuItem>
                ))}
                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
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
