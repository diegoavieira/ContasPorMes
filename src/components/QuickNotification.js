import React, { Component } from 'react';
import { StyleSheet, Text, Animated, Easing, TouchableOpacity } from 'react-native';

class QuickNotification extends Component {
  state = {
    animatedValue: new Animated.Value(0)
  }

  componentDidMount() {
    const { animatedValue } = this.state;
    this._getAnimated(1);
  }

  _getAnimated = (toValue) => {
    const { animatedValue } = this.state;
    const { onCloseButton } = this.props;
    Animated.timing(
      animatedValue,
      {
        toValue: toValue,
        duration: 300,
        easing: Easing.cubic
      }
    ).start(() => {
      if (onCloseButton) {
        () => {}
      } else {
        this._onClose();
      };
    });
  }
  
  _onClose = () => {
    const { animatedValue } = this.state;
    const { onCloseButton } = this.props;
    if (onCloseButton) {
      this._getAnimated(0);
    } else {
      setTimeout(() => {
        this._getAnimated(0);
      }, 4000);
    };
  }

  _renderOnCloseButton = () => {
    const { onCloseButton } = this.props;
    if (onCloseButton) {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={this._onClose}
        >
          <Text style={styles.buttonText}>Okay</Text>
        </TouchableOpacity>
      );
    };
    return null;
  }

  render() {
    const { animatedValue } = this.state;
    const { onCloseButton } = this.props;
    const bottom = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-15, 15],
    });
    return (
      <Animated.View
        style={[
          styles.content,
          { opacity: animatedValue },
          { bottom },
          { padding: onCloseButton ? null : 15 }
        ]}
      >
        <Text style={styles.message}>{this.props.message}</Text>
        {this._renderOnCloseButton()}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    left: 15,
    right: 15,
    paddingLeft: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  message: {
    color: '#fff',
    fontSize: 16
  },
  button: {
    padding: 15
  },
  buttonText: {
    fontSize: 16,
    color: '#999'
  }
});

export default QuickNotification;