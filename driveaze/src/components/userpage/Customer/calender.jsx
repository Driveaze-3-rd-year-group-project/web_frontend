import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/sass/styles.scss';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const eventItems = [
  {
    Date: "7/12/2024",
    Brand: "BMW-X3",
    vehi_no: "CBH-1312",
    detail:"Full service"
  },
  {
    Date: "7/25/2024",
    Brand: "Nissan-Caravan",
    vehi_no: "NC-9033",
    detail:"Full service"
  },
  {
    Date: "7/29/2024",
    Brand: "Toyota-Corolla",
    vehi_no: "WP-8721",
    detail:"Full service"
  },
  // Add more items with content
];

const events = eventItems.map(item => ({
  start: parse(item.Date, 'M/d/yyyy', new Date()), // Parse date string to Date object
  end: parse(item.Date, 'M/d/yyyy', new Date()), // Assuming events are single-day, adjust if needed
  title: `${item.Brand} - ${item.vehi_no}-${item.detail}`, // Combine brand and vehicle number
  // Add other event properties here if needed (e.g., description, color based on status)
}));

const MyCalendar = () => {
    return (
        <div>
          <Tooltip /> {/* Wrap the Calendar with Tooltip */}
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={(event) => ({
              style: {
                whiteSpace: 'nowrap', // Prevent text wrapping
                overflow: 'hidden', // Hide overflow
                textOverflow: 'ellipsis', // Add ellipsis for truncation
              },
              dataTip: event.title, // Set tooltip content
            })}
          />
        </div>
      );
    };


export default MyCalendar;
