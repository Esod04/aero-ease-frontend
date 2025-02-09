import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useFlightRankingRules } from '../../context/FlightRankingRules';
import { TimeRow, TimeRowProps } from './TimeRow';
import { GeneralRow, GeneralRowProps } from './GeneralRow';

export default function FlightRankingRules() {
  const { flightRankingRules } = useFlightRankingRules();

  const timeRows: TimeRowProps[] = [
    {
      name: 'Arrival Delay',
      type: 'arrivalDelay',
      data: flightRankingRules.arrivalDelay
    },
    {
      name: 'Scheduled Proposed Flight Delay',
      type: 'std',
      data: flightRankingRules.std
    }
  ];

  const generalRows: GeneralRowProps[] = [
    {
      name: 'City Pair Rules',
      type: 'cityPair',
      data: flightRankingRules.cityPair
    },
    {
      name: 'General Rules',
      type: 'general',
      data: flightRankingRules.general
    }
  ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="flight ranking rules table">
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Ruleset</TableCell>
          </TableRow>
        </TableHead>

        {/* Body rows */}
        <TableBody>
          {timeRows.map((row) => (
            <TimeRow key={row.name} {...row} />
          ))}
          {generalRows.map((row) => (
            <GeneralRow key={row.name} {...row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
