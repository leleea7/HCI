import FlipCard from 'react-native-flip-card'

<FlipCard 
  style={styles.card}
  friction={6}
  perspective={1000}
  flipHorizontal={true}
  flipVertical={false}
  flip={false}
  clickable={true}
  onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
>
  
  <View style={styles.face}>
    <Text>La domanda della carta (TODO: card creation)</Text>
  </View>
  
  <View style={styles.back}>
    <Text>The answer</Text>
  </View>
</FlipCard>
export default FlipCard; 