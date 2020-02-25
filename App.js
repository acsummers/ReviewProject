import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TextInput, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import AddReviewModal from './AddReviewModal.js';
import Review from './Review.js';

import {styles, ratingYellow} from './Styles.js';


//Disables warnings
console.disableYellowBox = true;

var initialReviews = [
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
      addReviewsVisible: false,
      reviews: initialReviews
    }

    this.voteIncrementFactory = (review) => {
      return (increment) => {
        review.voteTotal = review.voteTotal + increment
        this.setState({reviews: this.state.reviews})
      }
    }
  
    this.submitReplyFactory = (review) => { 

      return (reply) => {
        if (reply.length > 0) {
          review.replies.push(reply)
          this.setState({reviews: this.state.reviews})
        }

      }
    }

    this.submitReview = (title, comment, rating) => {
      var tempReviews = this.state.reviews
      tempReviews.push({title: title, comment: comment, rating: rating, voteTotal: 0, replies: []})
      this.setState({reviews: tempReviews})
    }
  }

  render() {
    return (
      <View style={styles.container}>

       <AddReviewModal 
        closeModal={() => this.setState({addReviewsVisible: false})} 
        modalVisible={this.state.addReviewsVisible}
        submitReview={this.submitReview}/>

       <Text style={styles.homeTitle} >MyCompany Reviews</Text>
  
      
       <FlatList
       data={this.state.reviews}
       extraData={this.state.reviews.map(x => x.voteTotal)}
       renderItem={({item}) => <Review submitReply={this.submitReplyFactory(item)} incrementVote={this.voteIncrementFactory(item)} {...item}/>}
       />

      
      <TouchableOpacity onPress={() => this.setState({addReviewsVisible: true})} style={{...styles.actionButton, ...styles.actionButtonActive}}>
       <Text>Add New Review</Text>
      </TouchableOpacity>



     </View>
    );
  }

}






