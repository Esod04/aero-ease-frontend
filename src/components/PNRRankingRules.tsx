import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';

import { usePNRRankingRules } from '../context/PNRRankingRules';

type PNRRowProps = {
  name: string;
  type: 'ssr' | 'class' | 'other';
  data: {
    title: string;
    value: number;
    enabled: boolean;
    description?: string;
  }[];
};

const PNRRuleRow = (props: PNRRowProps) => {
  const { setPNRRankingRules } = usePNRRankingRules();

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
              <Table size="small" aria-label={`pnr-rules-${props.type}`}>
                {/* Table Header */}
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Associated Points</TableCell>
                    <TableCell align="center">Enabled</TableCell>
                  </TableRow>
                </TableHead>

                {/* Body rows */}
                <TableBody>
                  {props.data.map((rule, index) => (
                    <TableRow key={`pnr-rule-${props.type}-${rule.title}`}>
                      {/* Name of the cell with a tootlip */}
                      <Tooltip title={rule.description}>
                        <TableCell component="th" scope="row">
                          {rule.title}
                        </TableCell>
                      </Tooltip>

                      {/* Points and Enabled cells */}
                      <TableCell align="center">
                        <input
                          type="text"
                          placeholder="Points"
                          className="input input-bordered input-sm max-w-sm"
                          value={rule.value}
                          onChange={(e) => {
                            setPNRRankingRules((rules: PNRRankingRules) => {
                              const rule = rules[props.type][index];
                              rule.value = +e.target.value;
                            });
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Switch
                          checked={rule.enabled}
                          onChange={() => {
                            setPNRRankingRules((rules: PNRRankingRules) => {
                              const rule = rules[props.type][index];
                              rule.enabled = !rule.enabled;
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

export default function PNRRankingRules() {
  const { pnrRankingRules } = usePNRRankingRules();

  const rows: PNRRowProps[] = [
    {
      name: 'SSR',
      type: 'ssr',
      data: pnrRankingRules.ssr.map((rule) => ({
        ...rule,
        title: rule.type
      }))
    },
    {
      name: 'Class',
      type: 'class',
      data: pnrRankingRules.class.map((rule) => ({
        ...rule,
        title: rule.class
      }))
    },
    {
      name: 'Other',
      type: 'other',
      data: pnrRankingRules.other
    }
  ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="pnr ranking rules table">
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Ruleset</TableCell>
          </TableRow>
        </TableHead>

        {/* Body rows */}
        <TableBody>
          {rows.map((row) => (
            <PNRRuleRow key={row.name} {...row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
