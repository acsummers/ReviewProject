import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TextInput, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import AddReviewModal from './AddReviewModal.js';

import {styles, ratingYellow} from './Styles.js';

/*
Reviews:
Title
Comment
Rating

VoteTotal (upvotes - downvotes)
Replies (list of Text)
*/


var testReviews = [
  {title: "My First Review",
  comment: "This is a test review, this company is my favorite.",
  rating: 4,
  voteTotal: 0,
  replies: []
  }
]

export default function App() {
  return (
    <AppHome/>
  )
}


class AppHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addReviewsVisible: false

    }
  }

  render() {
    return (
      <View style={styles.container}>

       <AddReviewModal 
        closeModal={() => this.setState({addReviewsVisible: false})} 
        modalVisible={this.state.addReviewsVisible}
        submitReview={(title, comment, rating) => testReviews.push({title: title, comment: comment, rating: rating, voteTotal: 0, replies: []})}/>

       <Text style={styles.homeTitle} >MyCompany Reviews</Text>
  
      
       <FlatList
       data={testReviews}
       renderItem={({item}) => <Review {...item}/>}
       />

      
      <TouchableOpacity onPress={() => this.setState({addReviewsVisible: true})} style={{...styles.actionButton, ...styles.actionButtonActive}}>
       <Text>Add New Review</Text>
      </TouchableOpacity>



     </View>
    );
  }

}



class Review extends Component {
  constructor(props) {
    super(props)

    renderStars = (rating) => {
      var toReturn = []

      for (var i = 0; i<rating; i++)
          toReturn.push(<MaterialCommunityIcons 
              name="star"
              size={24} 
              color={ratingYellow}
            />);
      
      return toReturn
    }

  }

  render() {
    return(
      <View>
        <Text style={styles.header}>{this.props.title}</Text>
        <Text style={styles.paragraph}>{this.props.comment}</Text>

        
        <View style={{flexDirection: 'row'}}>
          { 
           renderStars(this.props.rating)
          }
        </View>


        <View style={{flexDirection: 'row'}}>


          <MaterialCommunityIcons name={"arrow-up-bold-outline"} size={32} color={"green"}/>
          <Text style={styles.paragraph}>{this.props.voteTotal}</Text>
          <MaterialCommunityIcons name={"arrow-down-bold-outline"} size={32} color={"red"}/>
        </View>



      </View>
    )
  }

}



