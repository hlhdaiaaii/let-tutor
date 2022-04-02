import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Cell,
  Col,
  Row,
  Table,
  TableWrapper,
} from 'react-native-table-component';
import {generateBookingCellData} from '../../utils/booking';

// import BookingDialog from './booking/bookingDialog';
const today = new Date();
export function TableBooking({data}) {
  const cellData = generateBookingCellData(data);

  const arr = [];
  arr.find();

  const BookingCell = cellData => {
    if (data.timeSlots[cellData.key]) {
      const existData = data.timeSlots[cellData.key].find(
        e => e.startPeriodTimestamp === cellData.startPeriodTimestamp,
      );
    }

    // continue here

    if (item == null) return null;
    if (item.isBooked) {
      const bookedInfo = item.bookingInfo;
      const length = bookedInfo.length;
      if (length != 0 && bookedInfo[length - 1].userId == userInfo.id)
        return Booked();
      return Reverse();
    }
    if (checkAfter2h(new Date(item.startPeriodTimestamp)))
      return <BookBtn item={item} tutor={tutor} navigation={navigation} />;
    return (
      <Text style={{fontWeight: '600', color: 'gray', alignSelf: 'center'}}>
        Book
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {/* <BookingDialog show={showBooking} item={bookingItem} balance={balance} callBack={bookingCallBackDialog} /> */}
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginLeft: 5}}>
              {dataShow.title[1].substring(0, 4)} -{' '}
              {dataShow.title[7].substring(0, 4)}
            </Text>
            <DataTable.Pagination
              numberOfPages={4}
              onPageChange={page => {
                console.log(page);
                if (page < 0 || page > 3) return;
                setPage(page);
              }}
              page={page}
              style={{alignSelf: 'flex-start'}}
            />
          </View>
          <Table borderStyle={{borderWidth: 1}}>
            <Row
              data={state.tableHead}
              widthArr={state.widthArrHeader}
              style={styles.head}
              textStyle={styles.text}
            />
            <TableWrapper style={styles.wrapper}>
              <Col
                data={state.tableTitle}
                style={styles.title}
                textStyle={styles.text}
                heightArr={state.heightArr}
              />
              {/* <Cols data={state.tableData} widthArr={state.widthArr} heightArr={state.heightArr} style={styles.row} textStyle={styles.text} /> */}
              {state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      style={styles.cell}
                      data={BookingCell(cellData)}
                      textStyle={styles.text}
                    />
                  ))}
                </TableWrapper>
              ))}
            </TableWrapper>
          </Table>
        </View>
        {loading && <LoadingIndicator />}
      </ScrollView>
    </View>
  );
}

function BookBtn({item, navigation, tutor}) {
  const [isBooked, setIsBooked] = React.useState(false);
  const callBack = () => {
    setIsBooked(true);
  };
  const onPress = () => {
    navigation.navigate('Booking', {item, tutor, callBack});
  };
  if (isBooked) return Booked();
  return (
    <Text
      style={{textAlign: 'center', fontWeight: '600', color: '#3399ff'}}
      onPress={onPress}>
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

function initDataShow() {
  return {
    title: getListDates(),
    section: initSectionSchedule(14, 35),
    data: Array(7).fill(Array(48).fill(null)),
  };
}

function getListDates() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var result = [''];
  var temp = new Date();
  for (var i = 0; i < 7; i++) {
    temp.setDate(today.getDate() + i);
    const date = temp.getDate() + '/' + (temp.getMonth() + 1);
    const day = daysOfWeek[temp.getDay()];
    result.push(date + '\n' + day);
  }
  return result;
}

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
