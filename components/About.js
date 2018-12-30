import React, { Component } from 'react';
import {ScrollView, View, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseURL } from '../shared/baseURL';
import { Loading } from './Loading';


const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

function History() {
    return(
        <Card title='Our History'>
            <Text>
                {`Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong. Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                \nThe restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.`}
            </Text>
        </Card>
    )
}

class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    }

    render() {
        const renderLeaders = ({item, index}) => {
            return(
                <ListItem style={{display: 'flex'}}
                key={index}
                title={item.name}
                subtitle={item.description}
                subtitleNumberOfLines={12}
                hideChevron={true} // hide right arrow in the list
                leftAvatar={{ source: {uri: baseURL + item.image }}}
                />
            );
        };

        if(this.props.leaders.isLoading) {
            return (
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        } else if (this.props.leaders.errMess) {
            return (
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        } else {
        return(
            <View>
                <ScrollView>
                <History />
                <Card
                    title='Corporate Leadership'
                >
                <FlatList 
                    data={this.props.leaders.leaders}
                    renderItem={renderLeaders} 
                    keyExtractor={item => item.id.toString()} // Expects a string
                />
                </Card>
                </ScrollView>
            </View>
        );
    }
}

}

export default connect(mapStateToProps)(About);