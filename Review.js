import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TextInput, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import AddReviewModal from './AddReviewModal.js';

import {styles, ratingYellow} from './Styles.js';


export default class Review extends Component {
  constructor(props) {
    super(props)

    this.state = {
      upvoted: false,
      downvoted: false,
      addingReply: false,
      currentReplyText: "",
      repliesVisible: false
    }

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

      if (this.state.downvoted == true) {
          this.props.incrementVote(1)
        }

      if (this.state.upvoted == false) { 
        this.setState({downvoted: false, upvoted: true})
        this.props.incrementVote(1)
        
      }
      else {
        this.setState({downvoted: false, upvoted: false})
        this.props.incrementVote(-1)
      }
    }

    downvoteClicked = () => {

      if (this.state.upvoted == true) {
        this.props.incrementVote(-1)
      }

      if (this.state.downvoted == false) { 
        this.setState({downvoted: true, upvoted: false})
        this.props.incrementVote(-1)
      }
      else {
        this.setState({downvoted: false, upvoted: false})
        this.props.incrementVote(1)
      }
    }

    this.submitReply = () => {
      this.props.submitReply(this.state.currentReplyText)
      this.setState({addingReply: false, currentReplyText: ""})
    }



  }

  render() {
    return(
      <View style={styles.reviewCard}>
        <Text style={{...styles.header, marginBottom: 5}}>{this.props.title}</Text>
        <Text style={{...styles.paragraph, marginBottom: 5}}>{this.props.comment}</Text>

        
        <View style={{marginBottom: 5, flexDirection: 'row'}}>
          { 
           renderStars(this.props.rating)
          }
        </View>


        <View style={{flexDirection: 'row', marginBottom: 5}}>


          <TouchableOpacity onPress={upvoteClicked}>
            <MaterialCommunityIcons name={this.state.upvoted === true ? "arrow-up-bold" : "arrow-up-bold-outline"} size={32} color={"green"}/>
          </TouchableOpacity>

          <Text style={{...styles.paragraph,width:20, textAlign:'center', alignSelf:'center'}}>{this.props.voteTotal}</Text>

          <TouchableOpacity onPress={downvoteClicked}>
            <MaterialCommunityIcons name={this.state.downvoted === true ? "arrow-down-bold" : "arrow-down-bold-outline"} size={32} color={"red"}/>
          </TouchableOpacity>
        </View>


        <View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.setState({repliesVisible: !this.state.repliesVisible})} style={{flex: 1, flexDirection: 'row', alignItems:'center', justifyContent: 'center'}}><Text>{!this.state.repliesVisible ? "See" : "Hide"} {String(this.props.replies.length)} Replies</Text><MaterialIcons name={"add"} size={16}/></TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({addingReply: !this.state.addingReply})} style={{flex: 1, justifyContent: 'center'}}><Text style={{textAlign: 'center'}}>{!this.state.addingReply ? "Add Reply" : "Hide adding reply"}</Text></TouchableOpacity>
          </View>

          {this.state.addingReply ? <TextInput onChangeText={(text) => this.setState({currentReplyText: text})} onEndEditing={this.submitReply} style={styles.formInput}/> : <View/>}

          {this.state.repliesVisible ? this.props.replies.map(reply => <Text>{reply}</Text> ) : <View/>}

        </View>



      </View>
    )
  }

}