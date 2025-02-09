import React, { useState, useEffect } from 'react';
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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useSelectFlights } from '../context/SelectFlights';
import { Button } from '@mui/material';

type FlightResponse = {
  ScheduleID: string;
  FlightNumber: number;
  AircraftType: string;
  AircraftTailNumber: string;
  DepartureAirport: string;
  ArrivalAirport: string;
  DepartureTime: string;
  ArrivalTime: string;
  status: string;
  DepartureDates: string;
};

const FlightRow = ({ data }: { data: FlightResponse }) => {
  const [open, setOpen] = React.useState(false);
  const { selectedFlights, setSelectedFlights } = useSelectFlights();

  return (
    <React.Fragment>
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' },
          '&:last-child td, &:last-child th': { border: 0 }
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
          {data.FlightNumber}: {data.DepartureAirport} - {data.ArrivalAirport}
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
              Aircraft Type: {data.AircraftType}
              <br />
              Aircraft Tail Number: {data.AircraftTailNumber}
              <br />
              Departure Time: {data.DepartureTime}
              <br />
              Arrival Time: {data.ArrivalTime}
              <br />
              {/* List of departure dates */}
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {JSON.parse(data.DepartureDates.replaceAll("'", '"')).map((date: string) => {
                  const labelId = `checkbox|${data.FlightNumber}|${date}|${data.ScheduleID}`;
                  return (
                    <ListItem key={labelId} disablePadding className="m-0 p-0">
                      <ListItemButton
                        className="h-6"
                        onClick={() => {
                          setSelectedFlights((draft) => {
                            const index = draft.indexOf(labelId);
                            if (index > -1) draft.splice(index, 1);
                            else draft.push(labelId);
                          });
                        }}
                        dense
                      >
                        <ListItemIcon className="m-0 p-0">
                          <Checkbox
                            className="m-0 p-0"
                            edge="start"
                            size="small"
                            checked={selectedFlights.includes(labelId)}
                            tabIndex={-1}
                            disableRipple
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={date} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default function Flights() {
  const [data, setData] = useState<FlightResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const { selectedFlights, setSelectedFlights } = useSelectFlights();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/flights');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div>Fetching data...</div>
      ) : (
        <div className="m-4 h-screen max-w-lg overflow-y-scroll rounded-xl border-2 border-black p-4">
          <Table aria-label="available flights table" size="small">
            {/* Table Header */}
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Available Flights</TableCell>
              </TableRow>
            </TableHead>

            {/* Body rows */}
            <TableBody>
              {data.map((row) => (
                <FlightRow key={row.ScheduleID} data={row} />
              ))}
            </TableBody>
          </Table>
          <br />
          <Button variant="contained" onClick={() => setSelectedFlights([])}>
            Clear All Flights
          </Button>
          <Button
            onClick={() => {
              const flights: {
                flightNumber: string;
                date: string;
                scheduleID: string;
              }[] = [];
              selectedFlights.forEach((flight) => {
                // console.log(flight);
                const flightNumber = flight.split('|')[1];
                const date = flight.split('|')[2];
                const scheduleID = flight.split('|')[3];
                flights.push({ flightNumber, date, scheduleID });
              });

              console.log(`Cancelling the flights: ${JSON.stringify(flights)}`);
              fetch('http://127.0.0.1:5000/flights', {
                method: 'DELETE',
                body: JSON.stringify(flights)
              });
            }}
          >
            Cancel Flights
          </Button>
        </div>
      )}
    </>
  );
}
