import React from 'react';
import Header from '../../components/Header';
import EventCategory from '../../components/EventCategory';
import EventCard from '../../components/EventCard';
import NavigationDots from '../../components/NavigationDots';
import FloatingActionButton from '../../components/FloatingActionButton';
import image from '/src/assets/imagetest1.png';

export const EventPage = () => {
  const eventCategories = ['Parties', 'Birthday', 'Hangouts'];
  const events = [
    { title: 'Party 1', date: 'Jan 1', description: 'Description 1', imageUrl: '/src/assets/imagetest1.png' },
    { title: 'Party 2', date: 'Jan 2', description: 'Description 2', imageUrl: '/src/assets/imagetest1.png'},
    { title: 'Party 3', date: 'Jan 3', description: 'Description 3', imageUrl: '/src/assets/imagetest1.png'},
  ];

  return (
    <div>
      <Header />
      {eventCategories.map((category, index) => (
        <div key={index}>
          <EventCategory category={category} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {events.map((event, idx) => (
              <EventCard
                key={idx}
                title={event.title}
                date={event.date}
                description={event.description}
                imageUrl={event.imageUrl}
              />
            ))}
          </div>
          <NavigationDots total={3} currentIndex={index} />
        </div>
      ))}
      <FloatingActionButton />
    </div>
  );
};

export default EventPage;
