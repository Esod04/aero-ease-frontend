import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';

import { useFlightRankingRules } from '../../context/FlightRankingRules';

export type TimeRowProps = {
  name: string;
  type: 'arrivalDelay' | 'std';
  data: {
    score: number;
    difference: number;
    enabled: boolean;
    description?: string;
  }[];
};

export const TimeRow = (props: TimeRowProps) => {
  const { setFlightRankingRules } = useFlightRankingRules();

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' }
        }}
      >
        {/* Arrow to expand the row */}
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {/* Title of the type of rule we are displaying */}
        <TableCell component="th" scope="row">
          {props.name}
        </TableCell>
      </TableRow>

      {/* Row that expands */}
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0
          }}
          colSpan={2}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label={`flight-rules-${props.type}`}>
                {/* Table Header */}
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Duration Difference</TableCell>
                    <TableCell align="center">Associated Points</TableCell>
                    <TableCell align="center">Enabled</TableCell>
                  </TableRow>
                </TableHead>

                {/* Body rows */}
                <TableBody>
                  {props.data.map((rule) => (
                    <TableRow key={`flight-rules-${props.type}-${rule.difference}`}>
                      {/* Name of the cell with a tootlip */}
                      <Tooltip title={rule.description}>
                        <TableCell component="th" scope="row">
                          &#60;= {rule.difference} hours
                        </TableCell>
                      </Tooltip>

                      {/* Points and Enabled cells */}
                      <TableCell align="center">
                        <input
                          type="text"
                          placeholder="Points"
                          className="input input-bordered input-sm max-w-sm"
                          value={rule.score}
                          onChange={(e) => {
                            setFlightRankingRules((rules) => {
                              const chosenRule = rules[props.type].find(
                                (r) => r.difference === rule.difference
                              );
                              if (!chosenRule) return;
                              chosenRule.score = +e.target.value;
                            });
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Switch
                          checked={rule.enabled}
                          onChange={() => {
                            setFlightRankingRules((rules) => {
                              const chosenRule = rules[props.type].find(
                                (r) => r.difference === rule.difference
                              );
                              if (!chosenRule) return;
                              chosenRule.enabled = !chosenRule.enabled;
                            });
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
