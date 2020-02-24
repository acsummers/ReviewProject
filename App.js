import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TextInput, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


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
       <Text>MyCompany Reviews</Text>
  
      
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


class AddReviewModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: null,
      comment: null,
      rating: null
    }

    this.closeSelf = () => {
      this.setState({title: null, comment: null, rating: null})
      this.props.closeModal()
    }
  }

  render() {
    const reviewSubmittable = (
      this.state.title != null && this.state.title.length > 0 &&
     this.state.comment != null && this.state.comment.length >0 && 
     this.state.rating != null)


    return(
      
      <Modal
      animationType="slide"
      transparent={false}
      visible={this.props.modalVisible}
      >
      
      
      <View style={{alignItems: 'flex-end'}}>

        <TouchableOpacity onPress={this.closeSelf}>
        <MaterialCommunityIcons name={"close"} size={32} color={"black"}/>
        </TouchableOpacity>

      </View>


      <Text>Enter a title</Text>
      <TextInput onChangeText={(text) => this.setState({title: text})} style={styles.formInput}/>

      <Text>Leave your comment</Text>
      <TextInput onChangeText={(text) => this.setState({comment: text})} style={styles.formInput}/>

      <Text>Select a rating</Text>

      <View style={{flexDirection: 'row'}}>


        {[1,2,3,4,5].map( num => 
          (<TouchableOpacity onPress={ () => this.setState({rating: num}) }>

            <MaterialCommunityIcons 
              name={(this.state.rating == null || this.state.rating < num) ? "star-outline" : "star"} 
              size={32} 
              color={(this.state.rating == null || this.state.rating < num) ? "grey" : ratingYellow}
            />

          </TouchableOpacity>
          ))}

      </View>


      <TouchableOpacity
        disabled={!reviewSubmittable} 
        style={ reviewSubmittable ? { ...styles.actionButton, ...styles.actionButtonActive} : styles.actionButton}
        onPress={ () => {
          this.props.submitReview(this.state.title, this.state.comment, this.state.rating)
          this.closeSelf()
      }}>
        <Text>Confirm review</Text>
      </TouchableOpacity>
      

      </Modal>
    )
  }
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


const ratingYellow = "#eedd00"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20
  },
  formInput: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black"
  },
  actionButton: {
    alignItems: 'center', 
    justifyContent: 'center', 
    width:150, 
    height: 50,
    borderColor: '#cccccc',
    borderStyle: 'solid',
    borderWidth: 2,
    alignSelf: 'center'
  },
  actionButtonActive: {
    backgroundColor: 'green'
  },
});
