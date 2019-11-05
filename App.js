import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, TouchableHighlight  } from 'react-native';

export default class FetchExample extends React.Component {
  
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    var that = this;    

    return fetch('https://arctic-sound-254923.appspot.com/mobile', {
      method: "GET",
      userAgent: "android"
    })
    .then(function(res){
      res.json().then(function(data) {
        console.log('request succeeded with JSON response', data)

        that.setState({
          isLoading: false,
          dataSource: data,
        }, function(){

        });
      }).catch(function(error) {
        console.log('Data failed', error)
      });
  }).catch(function(error){
      console.log('request failed', error)
  })
  }

  _onPressButton() {
    alert('Open this category (not implemented yet).')
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex:1, justifyContent:'center'}}>
          <Text style={{color: 'blue', fontSize: 24}}>Categories</Text>
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        </View>
      )
    }

    return(
      <View style={{flex:1, justifyContent:'center'}}>
      <Text style={{color: 'blue', fontSize: 24}}>Categories</Text>
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={
            ({item}) => 
            <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
            <View style={{flex:1, flexDirection: 'row', height: 90, margin:5}} onPress={this._onPressButton}>
              <Image source={{uri: "https://arctic-sound-254923.appspot.com/images/" + item.imageId}} style={{flex:1}} />
              <View style={{flex:2.5, marginLeft:10}}>
                <Text style={{color: 'blue', fontSize: 24}}>{item.catName}</Text>
                <Text style={{fontSize: 16}}>{item.catDescription}</Text>
              </View>
            </View>
            </TouchableHighlight>
          }
          keyExtractor={({id}, index) => id}
        />
      </View>
      </View>
    );
  }
}
