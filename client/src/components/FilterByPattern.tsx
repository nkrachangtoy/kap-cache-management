import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { fetchFilters } from "../network/network";

const FilterByPattern: React.FC = () => {
  const [filterSelection, setFilterSelection] = useState<any>({
    filter0: "",
    filter1: "",
    filter2: "",
  });
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [availablePatterns, setAvailablePatterns] = useState<any>({});

  const handleFetchFilters = async (fieldNum: number, query?: string) => {
    console.log("reached");
    const data = await fetchFilters(fieldNum, query);
    setAvailablePatterns({ ...availablePatterns, [`field${fieldNum}`]: data });
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
                open={selectOpen}
                onOpen={(e) => {
                  e.preventDefault();
                  handleFetchFilters(0);
                }}
                onChange={(e) => {
                  setFilterSelection({
                    ...filterSelection,
                    filter0: e.target.value,
                  });
                  setSelectOpen(false);
                }}
              >
                {availablePatterns?.field0?.map((pattern: any) => (
                  <MenuItem value={pattern}>{pattern}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {filterSelection.filter0 && (
              <FormControl>
                <InputLabel id="field1">Field 0</InputLabel>
                <Select
                  labelId="field1"
                  id="field1"
                  autoWidth={true}
                  value={filterSelection.filter1}
                  open={selectOpen}
                  onOpen={(e) => {
                    e.preventDefault();
                    handleFetchFilters(1);
                  }}
                  onChange={(e) => {
                    setFilterSelection({
                      ...filterSelection,
                      filter1: e.target.value,
                    });
                    setSelectOpen(false);
                  }}
                >
                  {availablePatterns?.field1?.map((pattern) => (
                    <MenuItem value={pattern}>{pattern}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
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
