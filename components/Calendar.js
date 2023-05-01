import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Calendar = ({ year, month }) => {
  const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const days = Array.from({ length: totalDays }, (_, index) => index + 1);
  const emptyDays = Array.from({ length: firstDayIndex }, () => null);

  return (
    <View style={styles.calendar}>
      <View style={styles.weekdays}>
        {weekdays.map((weekday) => (
          <View style={styles.weekday} key={weekday}>
            <Text style={styles.weekdayText}>{weekday}</Text>
          </View>
        ))}
      </View>
      <View style={styles.days}>
        {emptyDays.map((_, index) => (
          <View style={styles.emptyDay} key={`empty-${index}`} />
        ))}
        {days.map((day) => (
          <View style={styles.day} key={`day-${day}`}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    flex: 1,
  },
  weekdays: {
    flexDirection: 'row',
  },
  weekday: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  weekdayText: {
    fontWeight: 'bold',
  },
  days: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyDay: {
    flex: 1,
    height: 40,
  },
  day: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 18,
  },
});

export default Calendar;
