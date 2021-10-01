import React from 'react';
import {
    StyleSheet,
    View,
    ToastAndroid,
    Linking,
    Platform,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import {connect} from 'react-redux';
import {DateFormat} from '../../helper/DateTimeConvertor';

class TransactionDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionDetails:
                props.route.params && props.route.params.item
                    ? props.route.params.item
                    : null,
        };
    }

    componentDidMount() {}

    navigateBack = () => {
        this.props.navigation.goBack();
    };

    capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    componentDidUpdate(prevProps, prevState) {}

    componentWillUnmount() {}

    render() {
        let {transactionDetails} = this.state;
        let {} = this.props;
        return (
            <View style={styles.rootView}>
                <View
                    style={{
                        height: 40,
                        justifyContent: 'center',
                        paddingHorizontal: 5,
                    }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.navigateBack()}
                        hitSlop={{}}>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>
                            {' < Back'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rootView1}>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: 'black',
                                }}>
                                TRANSACTION ID: #{transactionDetails.id}
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => alert('Copy to clipboard')}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={{
                                        uri: 'https://library.kissclipart.com/20191029/toe/kissclipart-clipboard-icon-copy-icon-duplicate-icon-512897820eac8a9c.png',
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 30,
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: 'black',
                                }}>
                                TRANSACTION DETAIL
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'orange',
                                }}>
                                Tutup
                            </Text>
                        </View>
                    </View>
                    <View style={{marginVertical: 10}}>
                        <View
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '1%',
                                backgroundColor: 'grey',
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 10,
                            }}>
                            <View style={{flex: 0.5}}>
                                <Text style={styles.text1}>
                                    {transactionDetails.beneficiary_bank
                                        ? this.capitalizeFirstLetter(
                                              transactionDetails.beneficiary_bank,
                                          )
                                        : 'beneficiary bank'}{' '}
                                    {'->'}{' '}
                                    {transactionDetails.sender_bank
                                        ? transactionDetails.sender_bank.toUpperCase()
                                        : 'sender bank'}
                                </Text>
                                <Text style={styles.text0}>
                                    -{' '}
                                    {transactionDetails.beneficiary_name
                                        ? transactionDetails.beneficiary_name
                                        : 'beneficiary_name'}
                                </Text>
                                <Text style={styles.text0}>
                                    {transactionDetails.account_number
                                        ? transactionDetails.account_number
                                        : 'account_number'}
                                </Text>
                                <Text style={[styles.text1, {marginTop: 15}]}>
                                    BERITA TRANSFER
                                </Text>
                                <Text style={[styles.text0]}>
                                    {transactionDetails.remark
                                        ? transactionDetails.remark
                                        : 'remark'}
                                </Text>

                                <Text style={[styles.text1, {marginTop: 15}]}>
                                    WAKTU DIBUAT
                                </Text>
                                <Text style={[styles.text0]}>
                                    {transactionDetails.completed_at
                                        ? DateFormat(
                                              transactionDetails.completed_at,
                                          )
                                        : 'date'}
                                </Text>
                            </View>
                            <View style={{flex: 0.5}}>
                                <Text style={[styles.text1]}>NOMINAL</Text>
                                <Text style={[styles.text0]}>
                                    Rp
                                    {transactionDetails.amount
                                        ? transactionDetails.amount
                                        : '0'}
                                </Text>
                                <Text style={[styles.text1, {marginTop: 15}]}>
                                    KODE UNIK
                                </Text>
                                <Text style={[styles.text0]}>
                                    {transactionDetails.unique_code
                                        ? transactionDetails.unique_code
                                        : 'unique_code'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: 'white',
    },
    rootView1: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    tinyLogo: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    text0: {
        fontSize: 16,
    },
    text1: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const mapStateToProps = state => {
    // const {transactionList} = state.SampleReducer;
    return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetails);
