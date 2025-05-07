import { StyleSheet, View } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
  imgSource: ImageSource;
  selectedImage?: string;
};

export default function FormImageProfile({ imgSource, selectedImage }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  return(
    <View style={styles.imageWrapper}>
      <Image source={imgSource} style={styles.image} />
    </View>
  );

}

const styles = StyleSheet.create({
  imageWrapper: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});