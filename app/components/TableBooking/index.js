import moment from 'moment';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Rows} from 'react-native-table-component';
import {
  Cell,
  Col,
  Row,
  Table,
  TableWrapper,
} from 'react-native-table-component';
import {useStore} from '../../store';
import {checkAfter2Hours, generateBookingCellData} from '../../utils/booking';

export function TableBooking({data, page}) {
  console.log('data');
  console.log(data);

  const userInfo = useStore(state => state.userInfo);

  const cellsData = generateBookingCellData(data, page);

  console.log('cellsData');
  console.log(cellsData);

  const BookingCell = cellData => {
    if (data.timeSlots[cellData.key]) {
      const existTimeSlot = data.timeSlots[cellData.key].find(
        e => e.startPeriodTimestamp === cellData.startPeriodTimestamp,
      );

      if (existTimeSlot) {
        if (existTimeSlot.isBooked) {
          const bookedInfo = existTimeSlot.bookingInfo;
          const length = bookedInfo.length;
          if (length != 0 && bookedInfo[length - 1].userId == userInfo.id) {
            return Booked();
          }
          return Reverse();
        } else {
          if (checkAfter2Hours(existTimeSlot.startPeriodTimestamp)) {
            return <BookBtn />;
          }
          return (
            <Text
              style={{fontWeight: '600', color: 'gray', alignSelf: 'center'}}>
              Book
            </Text>
          );
        }
      }
    } else
      return (
        <Text style={{fontWeight: '600', color: 'gray', alignSelf: 'center'}}>
          N/A
        </Text>
      );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View>
          <Table borderStyle={{borderWidth: 1}}>
            <Row
              data={[''].concat(data.heads)}
              //   data={data.heads}
              widthArr={[100].concat(Array(7).fill(60))}
              //   widthArr={Array(7).fill(60)}
              style={styles.head}
              textStyle={styles.text}
            />
            <TableWrapper style={styles.wrapper}>
              <Col
                data={data.titles}
                style={styles.title}
                textStyle={styles.text}
                heightArr={Array(data.titles.length).fill(28)}
              />
              <Rows
                data={cellsData.map((rowData, index) => {
                  return rowData.map((cellData, cellIndex) => {
                    return BookingCell(cellData);
                  });
                })}
                textStyle={styles.text}
                widthArr={Array(7).fill(60)}
                heightArr={Array(data.titles.length).fill(28)}
              />

              {/* {cellsData.map((rowData, index) => {
                return (
                  <TableWrapper key={index} style={styles.row}>
                    {rowData.map((cellData, cellIndex) => {
                      return (
                        <Cell
                          key={cellIndex}
                          style={styles.cell}
                          data={BookingCell(cellData)}
                          //   data={<Text>{cellIndex}</Text>}
                          textStyle={styles.text}
                        />
                      );
                    })}
                  </TableWrapper>
                );
              })} */}
            </TableWrapper>
          </Table>
        </View>
        {/* {loading && <LoadingIndicator />} */}
      </ScrollView>
    </View>
  );
}

function BookBtn() {
  //   const [isBooked, setIsBooked] = React.useState(false);
  //   const callBack = () => {
  //     setIsBooked(true);
  //   };
  //   const onPress = () => {
  //     navigation.navigate('Booking', {item, tutor, callBack});
  //   };
  //   if (isBooked) return Booked();
  return (
    <Text style={{textAlign: 'center', fontWeight: '600', color: '#3399ff'}}>
      Book
    </Text>
  );
}

const Booked = () => {
  return (
    <Text
      style={{
        color: '#2ECC71',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '600',
        padding: 1,
      }}>
      Booked
    </Text>
  );
};

const Reverse = () => {
  return (
    <Text
      style={{
        color: 'gray',
        textAlign: 'center',
        fontSize: 11,
        fontWeight: '600',
        padding: 1,
      }}>
      Reserved
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  head: {backgroundColor: '#f1f8ff', height: 40},
  wrapper: {flexDirection: 'row'},
  title: {width: 100, backgroundColor: '#f6f8fa'},
  row: {height: 28},
  rowHeader: {height: 50},
  text: {textAlign: 'center', fontSize: 13},
  cell: {height: 28, width: 60, backgroundColor: 'white'},
});
