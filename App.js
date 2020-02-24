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

    this.state = {
      upvoted: false,
      downvoted: false
    }
    super(props)

    renderStars = (rating) => {
      var toReturn = []
      var roundedRating = Math.round(rating)

      for (var i = 0; i<rating; i++)
          toReturn.push(<MaterialCommunityIcons 
              name="star"
              size={24} 
              color={ratingYellow}
            />);
      
      return toReturn
    }

    upvoteClicked = () => {
      if (this.state.upvoted == false) { 
        this.setState({downvoted: false, upvoted: true})
        this.props.setVote(1)
      }
      else {
        this.setState({downvoted: false, upvoted: false})
        this.props.setVote(0)
      }
    }

    downvoteClicked = () => {
      if (this.state.downvoted == false) { 
        this.setState({downvoted: true, upvoted: false})
        this.props.setVote(-1)
      }
      else {
        this.setState({downvoted: false, upvoted: false})
        this.props.setVote(0)
      }
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


          <TouchableOpacity onPress={upvoteClicked}>
            <MaterialCommunityIcons name={this.state.upvoted === true ? "arrow-up-bold" : "arrow-up-bold-outline"} size={32} color={"green"}/>
          </TouchableOpacity>

          <Text style={styles.paragraph}>{this.props.voteTotal}</Text>

          <TouchableOpacity onPress={downvoteClicked}>
            <MaterialCommunityIcons name={this.state.downvoted === true ? "arrow-down-bold" : "arrow-down-bold-outline"} size={32} color={"red"}/>
          </TouchableOpacity>
        </View>



      </View>
    )
  }

}



