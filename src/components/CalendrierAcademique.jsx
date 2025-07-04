'use client'
import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { getAcademicEvents } from '../lib/strapi';
const localizer = momentLocalizer(moment);

const CalendrierAcademique = () => {
    const [events, setEvents] = useState([]);
    const [view, setView] = useState('month');
    const [date, setDate] = useState(new Date());
    const [filters, setFilters] = useState({
        eventType: '',
        level: '',
        department: ''
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchEvents();
    }, [filters]);
    const fetchEvents = async () => {
        try {
            setLoading(true);
            const data = await getAcademicEvents(filters);
            const formattedEvents = data.map((event) => {
                var _a, _b, _c;
                return ({
                    id: event.id,
                    title: event.attributes.title,
                    start: new Date(event.attributes.startDate),
                    end: new Date(event.attributes.endDate),
                    eventType: event.attributes.eventType,
                    color: event.attributes.color,
                    description: event.attributes.description,
                    level: event.attributes.level,
                    department: (_c = (_b = (_a = event.attributes.department) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.name
                });
            });
            setEvents(formattedEvents);
        }
        catch (error) {
            console.error('Erreur lors du chargement des événements:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: event.color,
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
        };
        return { style };
    };
    const exportToCalendar = () => {
        const icsContent = generateICSContent(events);
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'calendrier_academique.ics';
        a.click();
    };
    const generateICSContent = (events) => {
        let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Université//Calendrier Académique//FR\n';
        events.forEach(event => {
            icsContent += `BEGIN:VEVENT\n`;
            icsContent += `DTSTART:${moment(event.start).format('YYYYMMDD[T]HHmmss')}\n`;
            icsContent += `DTEND:${moment(event.end).format('YYYYMMDD[T]HHmmss')}\n`;
            icsContent += `SUMMARY:${event.title}\n`;
            icsContent += `DESCRIPTION:${event.description || ''}\n`;
            icsContent += `UID:${event.id}@universite.edu\n`;
            icsContent += `END:VEVENT\n`;
        });
        icsContent += 'END:VCALENDAR';
        return icsContent;
    };

    if(loading) {
      (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      )
    }
  return (
    <div className='mt-28 h-[120vh] bg'>
      <div className="p-6 max-w-7xl mx-auto h-full">
        <div className="mb-6">
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>Calendrier Académique</h2>
          <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
            <select name="" id=""  value={filters.eventType} 
            onChange={(e) => setFilters(Object.assign(Object.assign({}, filters), { eventType: e.target.value }))}
            className='px-3 py-2 border border-gray-300 rounded-md'
            >
              <option value="">Tous les types</option>
              <option value="exam">Examens</option>
              <option value="vacation">Vacances</option>
              <option value="registration">Inscriptions</option>
              <option value="course">Cours</option>
              <option value="ceremony">Cérémonies</option>
            </select>
            <select name="" id=""  value={filters.eventType} 
            onChange={(e) => setFilters(Object.assign(Object.assign({}, filters), { level: e.target.value }))}
            className='px-3 py-2 border border-gray-300 rounded-md'
            >
              <option value="">Tous les niveaux</option>
              <option value="L1">L1</option>
              <option value="L2">L2</option>
              <option value="L3">L3</option>
              <option value="M1">M1</option>
              <option value="M2">M2</option>
            </select>
            <button onClick={exportToCalendar} className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
              Exporter (.ics)
            </button>
          </div>
        </div>
        <div 
          className={`${loading ? "flex justify-center items-center h-96" : "bg-white rounded-lg shadow-lg p-4"} `}
          style={{height: '600px'}}
        >
          <Calendar 
            localizer = {localizer} 
            events= {events}
            startAccessor= "start"
            endAccessor= "end"
            view = {view} 
            onView= {setView} 
            date= {date} 
            onNavigate= {setDate}
            eventPropGetter= { eventStyleGetter} 
            popup ={ true }
            tooltipAccessor = "description"
            className="h-full"
          />
        </div>
      </div>
    </div>
  )
}

export default CalendrierAcademique


