import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { THEME } from '../styles/theme.style';
import { Routes } from '../constants/routes';
import { useTranslation } from 'react-i18next';
import { CODES } from '../constants/global';
import Clipboard from '@react-native-community/clipboard'
import { toastInfos } from '../utils/toastUtils';

export const Message = (props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { id, content, created_at, type } = props.item
  const { firstname, lastname, isMe, avatar } = props

  const handlePressLong = () => {
    Clipboard.setString(content);
    toastInfos(t('chat.copy'))
  }

  const date = new Date(created_at)
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const unit = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const format = `${hours}:${minutes} ${unit}`
  return (
    <View style={[styles.message, { alignSelf: isMe ? 'flex-end' : 'flex-start' }]}>
      {!isMe &&
        <View style={{ paddingRight: 5 }}>
          <Image
            source={{ uri: avatar }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 25,
              backgroundColor: THEME.colors.noPic
            }}
          />
        </View>
      }
      <View style={{ flex: 1 }}>
        <View style={[styles.header, { alignSelf: isMe ? 'flex-end' : 'flex-start' }]}>
          <Text style={styles.author}>{firstname} {lastname}</Text>
          <Text style={styles.date}>{format}</Text>
        </View>
        {type.includes('image') ?
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => Linking.openURL(content)}
          >
            <View style={styles.imgArea}>
              <Image
                source={{ uri: content }}
                style={styles.img}
                resizeMode="stretch"
              />
            </View>
          </TouchableOpacity>
          :
          type === 'text' ?
            <TouchableOpacity
              style={[styles.content, { backgroundColor: isMe ? THEME.colors.white : THEME.colors.primary, alignSelf: isMe ? 'flex-end' : 'flex-start', borderTopLeftRadius: isMe ? 10 : 0, borderTopRightRadius: isMe ? 0 : 10 }]}
              activeOpacity={0.75}
              onLongPress={handlePressLong}
            >
              <Text style={[styles.text, { color: isMe ? THEME.colors.gray : THEME.colors.white }]}>{content}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => Linking.openURL(content)}
            >
              <View style={styles.imgArea}>
              <Image
                source={{ uri: 'https://www.computerhope.com/jargon/t/text-file.png' }}
                style={styles.file}
                resizeMode='center'
                />
                </View>
            </TouchableOpacity>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  message: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row'
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    flex: 1
  },
  header: {
    flexDirection: 'row'
  },
  author: {
    color: THEME.colors.gray,
    marginBottom: 5,
    fontSize: 12
  },
  date: {
    color: THEME.colors.blueGray,
    fontSize: 8,
    paddingTop: 4,
    paddingLeft: 5
  },
  text: {
    fontSize: 13
  },
  imgArea: {
    borderRadius: 10,
    width: 150,
    height: 150
  },
  img: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: THEME.colors.noPic
  },
  file: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: THEME.colors.bg
  }
})