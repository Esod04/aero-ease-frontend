import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PNRRankingRules from './PNRRankingRules';
import FlightRankingRules from './FlightRankingRule/FlightRankingRules';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="rules-tabpanel"
      hidden={value !== index}
      id={`rules-tabpanel-${index}`}
      aria-labelledby={`rules-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function RuleSet() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="m-2 rounded-lg border border-black p-2">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="ranking rules tab switch">
          <Tab label="PNR Ranking Rules" sx={{ textTransform: 'none' }} />
          <Tab label="Flight Ranking Rules" sx={{ textTransform: 'none' }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PNRRankingRules />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FlightRankingRules />
      </CustomTabPanel>
    </Box>
  );
}
