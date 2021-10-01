import React from 'react';
import {
    StyleSheet,
    View,
    ToastAndroid,
    Linking,
    Platform,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    Image,
    Modal,
} from 'react-native';
import {connect} from 'react-redux';
import {GetTransactionListFromAPI} from '../../actionFunction/SampleFunction';
import TransactionListCard from '../../component/cards/TransactionListCard';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: null,
            searchStatus: false,
            searchedDataList: [],
            showFilterModal: false,
            filterType: 0,
        };
    }

    componentDidMount() {
        this.props.getTransactionListData();
    }

    handleTransactionListClick = item => {
        if (Object.keys(item).length !== 0) {
            this.props.navigation.navigate('TransactionDetails', {item});
        } else {
            alert('error in fetching details');
        }
    };

    onChangeInput = text => {
        if (text && text.length > 0) {
            this.setState({searchStatus: true}, () => {
                let textLowerCase = text.toLowerCase();
                let tempList = this.props.transactionList.filter(
                    (item, index) =>
                        item.beneficiary_name
                            .toLowerCase()
                            .includes(textLowerCase) ||
                        item.beneficiary_bank
                            .toLowerCase()
                            .includes(textLowerCase) ||
                        item.sender_bank.toLowerCase().includes(textLowerCase),
                );
                this.setState({searchedDataList: tempList});
            });
        } else {
            this.setState({
                searchStatus: false,
                searchedDataList: [],
            });
        }
    };

    selectFilterType = id => {
        if (id !== this.state.filterType) {
            console.log('filter', id);
            this.setState({filterType: id, showFilterModal: false});
        }
    };

    handleFilterList = transactionDataList => {
        let tempList = transactionDataList;
        if (this.state.filterType > 0) {
            console.log('do filter', tempList);
            if (this.state.filterType === 1) {
                tempList.sort((a, b) =>
                    (a['beneficiary_name'] || '')
                        .toString()
                        .localeCompare(
                            (b['beneficiary_name'] || '').toString(),
                        ),
                );
            } else if (this.state.filterType === 2) {
                tempList.sort((a, b) =>
                    (b['beneficiary_name'] || '')
                        .toString()
                        .localeCompare(
                            (a['beneficiary_name'] || '').toString(),
                        ),
                );
            } else if (this.state.filterType === 3) {
                tempList.sort(function (a, b) {
                    return new Date(b.completed_at) - new Date(a.completed_at);
                });
            } else {
                tempList.sort(function (a, b) {
                    return new Date(a.completed_at) - new Date(b.completed_at);
                });
            }
        } else {
            console.log('no filter');
        }
        return tempList;
    };

    componentDidUpdate(prevProps, prevState) {}

    componentWillUnmount() {}

    renderHeader = () => {
        return (
            <View style={{marginBottom: 5}}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-512.png',
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={text => this.onChangeInput(text)}
                            value={this.state.searchText}
                            placeholder="Cari nama, bank, atau nominal"
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                                this.setState({showFilterModal: true})
                            }
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Text style={{color: 'orange'}}>FILTER</Text>
                            <Image
                                style={styles.downArrow}
                                source={{
                                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVRYuVEhfFaKRNvHGbwBCQ9anScYHudE3-cw&usqp=CAU',
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    renderModal = () => {
        let filterValue = this.state.filterType;
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showFilterModal}
                onRequestClose={() => {
                    this.setState({showFilterModal: false});
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{marginBottom: 20}}
                            onPress={() => this.selectFilterType(0)}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={
                                        filterValue === 0
                                            ? styles.selectedRadio
                                            : styles.unSelectedRadio
                                    }
                                />
                                <Text style={{marginLeft: 10}}>Sort</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{marginBottom: 20}}
                            onPress={() => this.selectFilterType(1)}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={
                                        filterValue === 1
                                            ? styles.selectedRadio
                                            : styles.unSelectedRadio
                                    }
                                />
                                <Text style={{marginLeft: 10}}>Name A - Z</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{marginBottom: 20}}
                            onPress={() => this.selectFilterType(2)}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={
                                        filterValue === 2
                                            ? styles.selectedRadio
                                            : styles.unSelectedRadio
                                    }
                                />
                                <Text style={{marginLeft: 10}}>Name Z - A</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{marginBottom: 20}}
                            onPress={() => this.selectFilterType(3)}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={
                                        filterValue === 3
                                            ? styles.selectedRadio
                                            : styles.unSelectedRadio
                                    }
                                />
                                <Text style={{marginLeft: 10}}>
                                    Latest Date
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => this.selectFilterType(4)}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={
                                        filterValue === 4
                                            ? styles.selectedRadio
                                            : styles.unSelectedRadio
                                    }
                                />
                                <Text style={{marginLeft: 10}}>Late Date</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

    render() {
        let {searchStatus, searchedDataList, filterType} = this.state;
        let {transactionList, transactionListLoaded} = this.props;
        let dataForFlatList = searchStatus
            ? searchedDataList
            : transactionList &&
              transactionList !== 'error' &&
              transactionList.length > 0
            ? transactionList
            : [];
        let filteredArray = this.handleFilterList(dataForFlatList);
        dataForFlatList = filteredArray;
        return (
            <View style={styles.rootView}>
                {this.renderModal()}
                {transactionListLoaded ? (
                    <View style={{flex: 1}}>
                        {this.renderHeader()}
                        <FlatList
                            ref={top => {
                                this.scroll = top;
                            }}
                            key={'#'}
                            data={dataForFlatList}
                            extraData={this.state}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            onViewableItemsChanged={this.onViewableItemsChanged}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReachedThreshold={0.1}
                            removeClippedSubviews={true}
                            initialNumToRender={4}
                            maxToRenderPerBatch={10}
                            windowSize={10}
                            style={{flex: 1, marginTop: 10}}
                            renderItem={({item, index}) => (
                                <View key={'list' + index}>
                                    <TransactionListCard
                                        item={item}
                                        onItemClick={item =>
                                            this.handleTransactionListClick(
                                                item,
                                            )
                                        }
                                    />
                                </View>
                            )}
                        />
                    </View>
                ) : (
                    <Text>Loading Transaction List</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    tinyLogo: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    downArrow: {
        width: 20,
        height: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        color: 'black',
        width: '70%',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9,
    },
    modalView: {
        margin: 20,
        width: '60%',
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'grey',
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    selectedRadio: {
        height: 10,
        width: 10,
        backgroundColor: 'black',
        borderRadius: 10,
    },
    unSelectedRadio: {
        height: 10,
        width: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
    },
});

const mapStateToProps = state => {
    const {transactionList, transactionListLoaded} = state.SampleReducer;
    return {transactionList, transactionListLoaded};
};

const mapDispatchToProps = dispatch => ({
    getTransactionListData: () => dispatch(GetTransactionListFromAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
