import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { THEME } from '../styles/theme.style';
import { toastError } from '../utils/toastUtils';
import { LinearButton } from './LinearButton';
import { Input } from './Input';
import { StarFullIcon } from './svgs/review/StarFull';
import { StarEmptyIcon } from './svgs/review/StarEmpty';
import { PenIcon } from './svgs/Pen';
import { sendReview } from '../queries/TeacherQuery';

export const ReviewModal = ({
  toggleModal,
  teacher,
  setCanPostReview,
  fetchTeacher
}) => {
  const [selectedTeacher, setSelectedTeacher] = useState(teacher)
  const [isLoading, setIsLoading] = useState(false)
  const [rate, setRate] = useState(5)
  const [review, setReview] = useState('')
  const { width, height } = Dimensions.get('window')

  const handleSubmit = async () => {
    if (rate && review && review.length > 0) {
      setIsLoading(true)
      const response = await sendReview(rate, review, selectedTeacher)
      if (response) {
        setIsLoading(false)
        toggleModal(false)
        fetchTeacher()
        setCanPostReview(false)
      }
    } else {
      toastError('Tous les champs doivent être complété')
    }
  }

  const displayStars = () => {
    let stars = []
    for (let index = 1; index < 6; index++) {
      if (rate > index-1) {
        stars = [...stars, (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            onPress={() => setRate(index)}
          >
            <StarFullIcon size={25} />
          </TouchableOpacity>
        )]
      } else {
        stars = [...stars, (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            onPress={() => setRate(index)}
          >
            <StarEmptyIcon size={25} />
          </TouchableOpacity>
        )]
      }
    }
    return stars
  }

  return (
    <Modal
      useNativeDriverForBackdrop
      hasBackdrop
      deviceWidth={width}
      deviceHeight={height + 50}
      useNativeDriver
      animationInTiming={100}
      animationOutTiming={100}
      backdropTransitionOutTiming={0}
      style={{
        margin: 0,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }}
      coverScreen
      isVisible={true}
      backdropColor="rgba(0, 0, 0, 0.6)"
      statusBarTranslucent
      onBackdropPress={() => toggleModal(isLoading)}
    >
      <View style={styles.modal}>
        <Text style={styles.description}>New review</Text>
        <View style={styles.starsArea}>
          <Text style={styles.rate}>Note :</Text>
          <View style={styles.stars}>
            {displayStars()}
          </View>
        </View>
        <Input
          placeholder='Laissez un commentaire...'
          defaultValue={review}
          onChangeText={(text) => setReview(text)}
        >
          <PenIcon size={20} />
        </Input>
        {isLoading &&
          <ActivityIndicator
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }}
            size={'large'} color={THEME.colors.primary}
          />
        }
        <LinearButton
          title='Envoyer'
          onPress={handleSubmit}
          disabled={isLoading}
        />
        <LinearButton
          title='Annuler'
          primary={THEME.colors.white}
          secondary={THEME.colors.white}
          color={THEME.colors.primary}
          marginBottom={0}
          onPress={() => toggleModal(isLoading)}
          disabled={isLoading}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    maxHeight: hp('70%'),
    width: wp('85%'),
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 10,
    backgroundColor: THEME.colors.bg,
    borderRadius: 5,
    padding: 25
  },
  description: {
    color: THEME.colors.gray,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 15
  },
  rate: {
    fontWeight: 'bold',
    color: THEME.colors.darkGray,
    marginBottom: 10,
    alignSelf: 'flex-end'
  },
  starsArea: {
    flexDirection: 'row',
  },
  stars: {
    flexDirection: 'row',
    marginLeft:5
  },
})

