import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DateFormat} from '../../helper/DateTimeConvertor';

const TransactionListCard = props => {
  let {item} = props;

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <View>
      <View
        style={[
          styles.sideColorView,
          {
            backgroundColor: item.status === 'SUCCESS' ? 'green' : 'red',
          },
        ]}
      />
      <View style={styles.rootView}>
        <View style={styles.itemDetails}>
          <View style={{flex: 0.9}}>
            <Text style={styles.text1}>
              {item.beneficiary_bank
                ? capitalizeFirstLetter(item.beneficiary_bank)
                : 'beneficiary_bank'}{' '}
              {'->'}{' '}
              {item.sender_bank
                ? item.sender_bank.toUpperCase()
                : 'sender_bank'}
            </Text>
            <Text style={styles.text2}>{item.beneficiary_name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.text2}>
                Rp{item.amount ? item.amount : 'amount'}
              </Text>
              <View
                style={{
                  height: 5,
                  width: 5,
                  borderRadius: 5,
                  backgroundColor: 'black',
                  marginHorizontal: 5,
                }}
              />
              <Text style={styles.text2}>
                {item.completed_at
                  ? DateFormat(item.completed_at)
                  : 'completed_at'}
              </Text>
            </View>
          </View>
          <View>
            {item.status === 'SUCCESS' ? (
              <TouchableOpacity
                onPress={() => props.onItemClick(item)}
                activeOpacity={0.8}
                style={styles.successButton}>
                <Text style={{color: 'white'}}>Success</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => props.onItemClick(item)}
                activeOpacity={0.8}
                style={styles.pendingButton}>
                <Text style={{color: 'black'}}>Pending</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  sideColorView: {
    position: 'absolute',
    height: '90%',
    width: '1%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    zIndex: 10,
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 16,
  },
  successButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: 'green',
    borderRadius: 7,
  },
  pendingButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'orange',
  },
});

export default TransactionListCard;
