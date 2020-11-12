import React, { Component } from 'react';
import WordCloud from 'react-wordcloud';
import './Keywords.css';

class Keywords extends Component {
  render() {
    const words = [ // would be given as props in actual implementation
      {
        text: '샤로수길',
        value: 3,
      },
      {
        text: '반세오',
        value: 3,
      },
      {
        text: '새우',
        value: 3,
      },
      {
        text: '정리',
        value: 3,
      },
      {
        text: '추천',
        value: 3,
      },
      {
        text: '볶음밥',
        value: 4,
      },
      {
        text: '비싸',
        value: 4,
      },
      {
        text: '괜찮',
        value: 4,
      },
      {
        text: '라이스페이퍼',
        value: 4,
      },
      {
        text: '보통',
        value: 4,
      },
      {
        text: '분위기',
        value: 4,
      },
      {
        text: '자리',
        value: 4,
      },
      {
        text: '웨이팅',
        value: 6,
      },
      {
        text: '느끼',
        value: 6,
      },
      {
        text: '베트남',
        value: 8,
      },
      {
        text: '쌀국수',
        value: 12,
      },
      {
        text: '반쎄오',
        value: 13,
      },
      {
        text: '분짜',
        value: 16,
      },
      {
        text: '맛있',
        value: 23,
      },
    ];
    const options = {
      rotations: 0,
      rotationAngles: [0, 0],
      deterministic: true,
      spiral: 'archimedean',
      fontSizes: [30,100],
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
    const expandRatio = 50;
    const expandedWords = [];
    words.forEach((keyword) => {
      expandedWords.push({
        text: keyword.text,
        value: Math.log(keyword.value),
      });
      console.log(keyword);
    });
    console.log(expandedWords);
    return (
      <div id='keywords'>
        <WordCloud
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
