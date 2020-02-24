import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';


/*
Reviews:
Title
Comment
Rating

VoteTotal (upvotes - downvotes)
Replies (list of Text)
*/


const testReviews = [
  {title: "My First Review",
  comment: "This is a test review, this company is my favorite.",
  rating: 4,
  voteTotal: 0,
  Replies: []
  }
]

export default function App() {
  return (
    <View style={styles.container}>
      <Text>MyCompany Reviews</Text>

      
      <FlatList
      data={testReviews}
      renderItem={({item}) => <Review {...item}/>}
      />

    </View>
  );
}

class Review extends Component {

  render() {
    return(
      <View>
        <Text>{this.props.title}</Text>
        <Text>{this.props.comment}</Text>

        <Text>{this.props.rating}</Text>

        <Text>{this.props.voteTotal}</Text>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20
  },
});
