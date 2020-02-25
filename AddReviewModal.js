import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TextInput, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import {styles, ratingYellow} from './Styles.js';

export default class AddReviewModal extends Component {
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


      <Text style={styles.paragraph}>Enter a title</Text>
      <TextInput onChangeText={(text) => this.setState({title: text})} style={styles.formInput}/>

      <Text style={styles.paragraph}>Leave your comment</Text>
      <TextInput onChangeText={(text) => this.setState({comment: text})} style={styles.formInput}/>

      <Text style={styles.paragraph}>Select a rating</Text>

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