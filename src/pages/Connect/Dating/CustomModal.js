import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import MyButtons from '../../../component/MyButtons';
import moment from 'moment';
const CustomModal = (props) => {
    const [isVisible, setVisible] = useState(true);
    const [timecounter, setTimecounter] = useState('');
    // remaing time = 24 hrs - (current time - backend time)
    useEffect(() => {
        // var hours = new Date().getHours();  
        // var min = new Date().getMinutes();  
        // var sec = new Date().getSeconds();
        // const Starttime = moment('09/06/2023 10:59:00', "DD/MM/YYYY hh:mm:ss");
        const Starttime = moment().endOf('day')
        setInterval(() => {
            const currentTime = moment();
            const remainingTime = moment(Starttime.diff(currentTime));
            const formatted = remainingTime.format("HH:mm:ss");
            console.log(formatted);
            setTimecounter(formatted)

        }, 1000);
    }, [])
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <TouchableOpacity onPress={() => setVisible(true)} style={{ height: 50, width: '50%', backgroundColor: '#bababa', justifyContent: 'center', alignItems: 'center', marginTop: 90 }}>
                <Text style={{ color: '#FF3B7F', fontWeight: '500', textAlign: 'center' }}>Modal open</Text>
            </TouchableOpacity>

            <Modal
                isVisible={isVisible}
                swipeDirection="down"
                onBackdropPress={() => setVisible(false)}
                onSwipeComplete={(e) => {
                    setVisible(false)
                }}
                scrollTo={() => { }}
                scrollOffset={1}
                propagateSwipe={true}
                coverScreen={false}
                backdropColor='transparent'
                style={styles.Container}
            >
                <View style={styles.mainview}>
                    <View style={styles.childview}>
                        <View style={styles.profilestyle}  >
                            <Image resizeMode='cover'
                                source={require('../../../assets/dating-your-matches-person-image.png')}
                                style={styles.profilePictureStyle}
                            />
                            <View style={styles.heartstyle} >
                                <Image resizeMode='contain' source={require('../../../assets/dating-love-image.png')} style={styles.heartimages} />
                            </View>
                        </View>
                        <View style={styles.secondbox}>
                            <Text style={styles.text1}>Out of Likes!</Text>
                            <Text style={styles.text2}>Your Likes will refill in {timecounter}. Refill your likes now.</Text>
                            <View style={styles.buttonstyle1}>
                                <MyButtons title="CONTINUE (1 LEFT)" height={55} width={'100%'} borderRadius={50} alignSelf="center" press={() => { props.navigation.navigate('DatingProfile') }} marginHorizontal={20} fontSize={14}
                                    titlecolor={Mycolors.BG_COLOR} hLinearColor={['#8d046e', '#e30f50']} />
                            </View>
                            <View style={styles.Ortextlinestyle}>
                                <View style={styles.linestyle}></View>
                                <Text style={styles.text3}>OR</Text>
                                <View style={styles.linestyle} />
                            </View>
                            <View style={styles.buttonstyle2}>
                                <MyButtons title="GET UNLIMITED LIKES" height={55} width={'100%'} borderRadius={50} alignSelf="center" press={() => { props.navigation.navigate('DatingProfile') }} marginHorizontal={20} fontSize={14} borderColor={'#e30f50'} backgroundColor={'white'} borderWidth={2}
                                    titlecolor={'#e30f50'} />
                            </View>
                            <TouchableOpacity onPress={() => setVisible(false)} style={{ marginTop: 15 }}>
                                <Text style={styles.text4}>
                                    NO THANKS
                                </Text>
                            </TouchableOpacity>
                        </View>


                    </View>

                </View>
            </Modal>

        </View>
    )

};
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        margin: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 7
    },
    mainview: {
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingTop: 30,
        padding: 10
    },
    childview: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    profilestyle: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    profilePictureStyle: {
        alignSelf: "center",
        height: 110,
        width: 110,
        borderRadius: 60,
        // top: -(60 + 10),
        borderWidth: 7,
        borderColor: "#fff",
        shadowColor: '#000000',
        shadowRadius: 1,
        shadowOffset: {
            height: 3,
            width: 0
        },
        shadowOpacity: 1,
        elevation: 3,
    },
    heartstyle: {
        justifyContent: 'center',
        alignItems: 'center',
        top: -25,
        backgroundColor: 'white',
        height: 40,
        width: 40,
        borderRadius: 40,
        shadowColor: '#000000',
        shadowRadius: 1,
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0.1,
        elevation: 4,
        zIndex: -999
    },
    heartimages: {
        top: 2,
        height: 25,
        width: 25
    },
    secondbox: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        top: -20
    },
    text1: {
        color: 'black',
        fontWeight: '800',
        textAlign: 'center',
        fontSize: 20
    },
    text2: {
        color: 'black',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 16
    },
    buttonstyle1: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 30
    },
    Ortextlinestyle: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        width: '80%',
        marginTop: 15
    },
    linestyle: {
        backgroundColor: '#e0e0e0',
        height: 1,
        width: '50%',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text3: {
        color: '#e0e0e0',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 10
    },
    buttonstyle2: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 20
    },
    text4: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600'
    }

});
export default CustomModal;