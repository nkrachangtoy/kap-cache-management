import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const Patterns: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
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
          <Tab label="View Patterns" id="view-patterns" />
          <Tab label="Filter By Pattern" id="filter-by-pattern" />
        </Tabs>
      </AppBar>
      {/* View Patterns */}
      <TabPanel value={value} index={0}>
        <div>
          <p>
            This feature will generate the available key patterns within the
            Redis cache.
          </p>
          <p>This process may take a few minutes to complete</p>
          <Button>Proceed</Button>
        </div>
      </TabPanel>
      {/* Filter By Pattern  */}
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </div>
  );
};

export default Patterns;
