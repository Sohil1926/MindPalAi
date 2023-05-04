import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

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
  }, [year, month]);
  const goToJournalEntry = (day) => {
    if (day === null) return;
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
                  {journalData[formattedDate]?.image ? (
                    <View
                      style={{
                        borderRadius: 10,
                        width: 40,
                        height: 60,
                        overflow: 'hidden',
                      }}
                    >
                      <ImageBackground
                        source={{ uri: journalData[formattedDate]?.image }}
                        style={{
                          flex: 1,
                          resizeMode: 'cover',
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={styles.dayText}>{day || ''}</Text>
                      </ImageBackground>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: 40,
                        height: 60,
                        backgroundColor: day !== null && 'gray',
                        borderRadius: 10,
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={styles.dayText}>{day || ''}</Text>
                    </View>
                  )}
                  {/* <Text style={styles.dayText}>{day || ''}</Text>
                  {journalData[formattedDate] && (
                    <Image
                      source={{
                        uri: journalData[formattedDate]?.image,
                      }}
                      style={styles.calendarImage}
                    />
                  )} */}
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
  calendarBlockComponent: {},
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
    width: 49,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  dayText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default JournalCalendar;
