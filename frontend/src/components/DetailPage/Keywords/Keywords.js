import React, { Component } from 'react'
import WordCloud from 'react-wordcloud'
import './Keywords.css'
class Keywords extends Component {

  render() {
    const words = [ // would be given as props in actual implementation
      {
        text: '조금큰',
        value: 64,
      },
      {
        text: '많이작은',
        value: 11,
      },
      {
        text: '기깔나게작은',
        value: 6,
      },
      {
        text: '적당히조그만',
        value: 17,
      },
      {
        text: '적절한',
        value: 30,
      },
      {
        text: '어마무시한',
        value: 130,
      },
      {
        text: '조금큰',
        value: 64,
      },
      {
        text: '많이작은',
        value: 11,
      },
      {
        text: '기깔나게작은',
        value: 6,
      },
      {
        text: '적당히조그만',
        value: 17,
      },
      {
        text: '적절한',
        value: 30,
      },
      {
        text: '진짜겁나어마무시한',
        value: 160,
      },
      {
        text: '조금큰',
        value: 64,
      },
      {
        text: '많이작은',
        value: 11,
      },
      {
        text: '기깔나게작은',
        value: 6,
      },
      {
        text: '적당히조그만',
        value: 17,
      },
      {
        text: '적절한',
        value: 30,
      },
      {
        text: '어마무시한',
        value: 130,
      },
      {
        text: '조금큰',
        value: 64,
      },
      {
        text: '많이작은',
        value: 11,
      },
      {
        text: '기깔나게작은',
        value: 6,
      },
      {
        text: '적당히조그만',
        value: 17,
      },
      {
        text: '적절한',
        value: 30,
      },
      {
        text: '어마무시한',
        value: 130,
      },
    ]
    const options = {
      rotations: 0,
      rotationAngles: [0,0],
      deterministic: true,
      spiral: 'archimedean',
    };
    const size = [400, 100];
    const callbacks = {
      getWordColor: word => word.value > 20 ? '#000000' : '#AAAAAA',
    }
    return (
      <div id>
        <WordCloud
          callbacks={callbacks}
          options={options}
          words={words}
          size={size}
        />
      </div>
    )
  }

}
 export default Keywords;