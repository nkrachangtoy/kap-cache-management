import React, { useState } from "react";
import FilterByPattern from "./FilterByPattern";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getPatterns } from "../network/network";

const Patterns: React.FC = () => {
  const [value, setValue] = useState(0);
  const [patterns, setPatterns] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const handleGetPatterns = async () => {
    setLoading(true);
    const data = await getPatterns();
    setPatterns(data);
    setLoading(false);
  };

  function TabPanel(props: any) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <div className="patternsDrawer">
      <AppBar position="static" color="inherit">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
          className="patternsDrawer__tab"
          indicatorColor="primary"
        >
          <Tab label="Filter By Pattern" id="view-patterns" />
          <Tab label="View Patterns" id="filter-by-pattern" />
        </Tabs>
      </AppBar>
      {/* Filter By Pattern  */}
      <TabPanel value={value} index={0}>
        <FilterByPattern />
      </TabPanel>
      {/* View Patterns */}
      <TabPanel value={value} index={1}>
        <div className="viewPatterns">
          <p>
            This feature will generate the available key patterns within the
            Redis cache.
          </p>
          <p style={{ color: "red" }}>
            This process may take a few minutes to complete.
          </p>
          <Button className="viewPatterns__button" onClick={handleGetPatterns}>
            Proceed
          </Button>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            {patterns?.map((pattern, i) => (
              <p key={i}>{pattern}</p>
            ))}
          </div>
        )}
      </TabPanel>
    </div>
  );
};

export default Patterns;
