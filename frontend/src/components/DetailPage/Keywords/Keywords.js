import React, { Component } from 'react';
import WordCloud from 'react-wordcloud';
import './Keywords.css';

// eslint-disable-next-line react/prefer-stateless-function
class Keywords extends Component {
  render() {
    const words = []
    Object.keys(this.props.keywords).forEach((el) => {
      words.push({text: el, value: this.props.keywords[el]})
    })
    
    const options = {
      rotations: 0,
      rotationAngles: [0, 0],
      deterministic: true,
      spiral: 'archimedean',
      fontSizes: [30, 100],
    };
    const size = [1000, 200];
    let maxKeywordValue = 0;
    words.forEach((keyword) => {
      if (keyword.value > maxKeywordValue) {
        maxKeywordValue = keyword.value;
      }
    });
    const callbacks = {
      getWordColor: (word) => (word.value > Math.log(maxKeywordValue / 2) ? '#000000' : '#AAAAAA'),
    };
    // const expandRatio = 50;
    const expandedWords = [];
    words.forEach((keyword) => {
      expandedWords.push({
        text: keyword.text,
        value: Math.log(keyword.value),
      });
    });
    return (
      <div id="keywords">
        <WordCloud
          id="cloud"
          callbacks={callbacks}
          options={options}
          words={expandedWords}
          size={size}
        />
      </div>
    );
  }
}
export default Keywords;
