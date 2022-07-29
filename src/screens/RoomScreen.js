import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, RefreshControl } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from '../components/svgs/ArrowLeft';
import { THEME } from '../styles/theme.style';
import { getRoom, getRoomMessages } from '../queries/ChatQuery';
import { Message } from '../components/Message';
import { SendIcon } from '../components/svgs/Send';
import { LinkIcon } from '../components/svgs/Link';
import { useSocket } from '../hooks/useSocket';
import { resetCurrentMessagesAction, setCurrentMessagesAction, setCurrentRoomAction } from '../redux/chat';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { Buffer } from "buffer";

export const RoomScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { lang } = useSelector(s => s.app);
  const { user } = useSelector(s => s.user);
  const { room, messages } = useSelector(s => s.chat);
  const [content, setContent] = useState('')
  const [refreshing, setRefreshing] = useState(false);

  const { id } = route.params;

  const { emitNewMessage } = useSocket()

  const fetchRoom = async () => {
    setRefreshing(true)
    const res = await getRoom(id)
    if (res) {
      setRefreshing(false)
      dispatch(setCurrentRoomAction(res))
    }
  }

  const fetchMessages = async () => {
    setRefreshing(true)
    const res = await getRoomMessages(id)
    if (res) {
      setRefreshing(false)
      dispatch(setCurrentMessagesAction(res.reverse()))
    }
  }

  useEffect(() => {
    fetchRoom()
    fetchMessages()
    return () => {
      dispatch(resetCurrentMessagesAction())
    }
  }, [])

  const keyExtractor = useCallback(({ id }) => `message-${id}`, []);

  const renderMessage = ({ item, index }) => <Message key={index} item={item} isMe={user.id === item.userId} firstname={room.users && room.users.find(user => user.id === item.userId)?.firstname} lastname={room.users && room.users.find(user => user.id === item.userId)?.lastname} avatar={room.users && room.users.find(user => user.id === item.userId)?.avatar} />

  const handleChange = (value) => {
    setContent(value)
  }

  const handleFileSelect = useCallback(async (room) => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      if (response) {
        RNFS.readFile(response[0].uri, 'base64')
          .then(res => {
            let files = [{
              uri: response[0].uri,
              type: response[0].type,
              name: response[0].name,
              data: Buffer.from(res, 'base64'),
              base64:true
            }]
            emitNewMessage('', room.id, user.id, response[0].type, files)
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = () => {
    if (content.length > 0) {
      const res = emitNewMessage(content, room.id, user.id, 'text', [])
      if (res) {
        setContent('')
      }
    }
  }

  const onRefresh = useCallback(() => {
    fetchMessages()
  }, []);

  return (
    <View style={styles.contain}>
      <View style={styles.topSection}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <ArrowLeftIcon size={35} color={THEME.colors.gray} />
        </TouchableOpacity>
        <Text style={styles.roomName}>{room.name}</Text>
      </View>
      <View style={styles.bottomSection}>
        <FlatList
          data={messages}
          style={{ paddingHorizontal: '8%' }}
          renderItem={renderMessage}
          keyExtractor={keyExtractor}
          inverted
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        //contentContainerStyle={{ flexDirection: 'column-reverse' }}
        />
        {!refreshing && messages.length === 0 &&
          <Text style={styles.noDatas}>{t('chat.nomess')}</Text>
        }
        <View style={styles.messageArea}>
          <View style={styles.completeInput}>
            <TextInput
              style={styles.input}
              placeholder={t('chat.type')}
              defaultValue={content}
              placeholderTextColor={THEME.colors.gray}
              onChangeText={(value) => handleChange(value)}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.file}
              onPress={() => handleFileSelect(room)}
            >
              <LinkIcon size={20} color={THEME.colors.blueGray} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.submit}
              onPress={handleSubmit}
              disabled={content.length === 0}
            >
              <View style={[styles.submitBtn, { backgroundColor: content.length === 0 ? THEME.colors.lightGray : THEME.colors.primary, }]}>
                <SendIcon size={22} color={THEME.colors.white} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'center'
  },
  topSection: {
    // flex: 1,
    backgroundColor: THEME.colors.white,
    flexDirection: 'row'
  },
  bottomSection: {
    borderTopWidth: 1,
    borderColor: THEME.colors.lightGray,
    flex: 9
  },
  back: {
    width: '25%',
    padding: '8%',
    paddingBottom: '3%',
    paddingTop: '10%',
    backgroundColor: THEME.colors.white
  },
  messageArea: {
    padding: 15
  },
  completeInput: {
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: THEME.colors.lightGray,
  },
  input: {
    backgroundColor: THEME.colors.lightGray,
    color: THEME.colors.gray,
    flex: 1,
    borderRadius: 25,
    paddingLeft: 15,
    height: 45
  },
  file: {
    backgroundColor: THEME.colors.lightGray,
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submit: {
    backgroundColor: THEME.colors.lightGray,
    padding: 5,
    height: 45,
    width: 45,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25
  },
  submitBtn: {
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  roomName: {
    color: THEME.colors.gray,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    paddingTop: '11%',
  },
  noDatas: {
    color: THEME.colors.darkGray,
    position: 'absolute',
    alignSelf: 'center',
    top: 70
  }
})