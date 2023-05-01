import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Calendar = ({ year, month, journalData }) => {
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const calculateWeeks = () => {
      const firstDay = new Date(year, month - 1, 1);
      const firstDayIndex = firstDay.getDay();
      const totalDays = new Date(year, month, 0).getDate();
      const weeksArray = [];

      //   console.log(firstDay, firstDayIndex, totalDays);

      let day = 1;
      let week = 0;
      while (day <= totalDays) {
        const daysArray = [];
        if (week === 0) {
          for (let i = 0; i < 7; i++) {
            if (i < firstDayIndex) {
              daysArray.push(null);
            } else {
              daysArray.push(day++);
            }
          }
        } else {
          for (let i = 0; i < 7; i++) {
            if (day <= totalDays) {
              daysArray.push(day++);
            } else {
              daysArray.push(null);
            }
          }
        }
        weeksArray.push(daysArray);
        week++;
      }

      setWeeks(weeksArray);
      console.log(weeksArray);
    };

    calculateWeeks();
  }, [year, month]);

  return (
    <View style={styles.calendar}>
      <View style={styles.weekdays}>
        {weekdays.map((weekday) => (
          <View style={styles.weekday} key={weekday}>
            <Text style={styles.weekdayText}>{weekday[0]}</Text>
          </View>
        ))}
      </View>
      {weeks.map((week, index) => (
        <View style={styles.week} key={index}>
          {week.map((day, index) => (
            <View style={styles.day} key={index}>
              {<Text style={styles.dayText}>{day || ''}</Text>}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {},
  week: {
    flexDirection: 'row',
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
    color: '#fff',
  },
  days: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyDay: {
    // flex: 1,
    height: 40,
  },
  day: {
    // flex: 1,
    width: 49,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  dayText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Calendar;
