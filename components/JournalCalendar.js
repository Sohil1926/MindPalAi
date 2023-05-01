import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const JournalCalendar = ({ year, month, journalData, navigation }) => {
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
      //   console.log(weeksArray);
    };

    calculateWeeks();
    // console.log(journalData);
  }, [year, month]);
  const goToJournalEntry = (day) => {
    let monthPaddedWith0 = month < 10 ? `0${month}` : month;
    let dayPaddedWith0 = day < 10 ? `0${day}` : day;
    const fullDate = `${year}-${monthPaddedWith0}-${dayPaddedWith0}`;
    const journal = journalData[fullDate];
    if (journal) {
      // console.log(journal);
      navigation.navigate('JournalEntry', { key: fullDate });
    } else {
      alert(`No journal on ${fullDate}`);
    }
  };
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
          {week.map((day, index) => {
            const formattedDate = `${year}-${
              month < 10 ? `0${month}` : month
            }-${day < 10 ? `0${day}` : day}`;
            return (
              <View style={styles.day} key={index}>
                <TouchableOpacity onPress={() => goToJournalEntry(day)}>
                  <Text style={styles.dayText}>{day || ''}</Text>
                  {journalData[formattedDate] && (
                    <Image
                      source={{
                        uri: journalData[formattedDate]?.image,
                      }}
                      style={styles.calendarImage}
                    />
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {},
  calendarImage: {
    width: 40,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
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

export default JournalCalendar;
