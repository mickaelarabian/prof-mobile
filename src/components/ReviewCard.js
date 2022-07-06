import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import { THEME } from '../styles/theme.style';
import { StarFullIcon } from './svgs/review/StarFull';
import { StarEmptyIcon } from './svgs/review/StarEmpty';
import { StarMiddleIcon } from './svgs/review/StarMiddle';

export const ReviewCard = (props) => {
  const { note, comment, author, date } = props.item

  const displayStars = (note) => {
    let stars = []
    for (let index = 1; index < 6; index++) {
      if(note > index){
        stars = [...stars, <StarFullIcon key={index}/>]
      } else if(note + 0.5 === index){
        stars = [...stars, <StarMiddleIcon key={index}/>]
      } else {
        stars = [...stars, <StarEmptyIcon key={index}/>]
      }
    }
    return stars
  }

  return (
    <View style={[styles.card, { borderTopWidth: props.index !== 0 ? 1 : 0 }]}>
      <Image
        source={{ uri: author.image }}
        style={styles.img}
      />
      <View style={styles.contain}>
        <View style={styles.section}>
          <Text style={styles.title}>{author.firstname} {author.lastname}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>{comment}</Text>
        </View>
        <View style={styles.sectionFlex}>
          {displayStars(note)}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderColor: THEME.colors.lightGray,
    marginHorizontal:10
  },
  contain: {
    flex: 1,
    paddingLeft: 10
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: THEME.colors.noPic
  },
  section: {
    // flex:1
  },
  sectionFlex: {
    flexDirection: 'row',
    marginTop:5
  },
  subjects: {
    flex: 2
  },
  price: {
    flex: 1
  },
  title: {
    color: THEME.colors.black,
    fontWeight: '700'
  },
  date: {
    color: THEME.colors.gray,
    fontSize: 10
  },
  text: {
    color: THEME.colors.black,
    fontSize: 12
  }
})