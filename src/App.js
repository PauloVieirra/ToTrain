import React, { useState, useEffect } from 'react';
import './App.css';
import seedrandom from 'seedrandom';
import localforage from 'localforage';

const shuffleArray = (array, seed) => {
  const rng = seedrandom(seed);
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};


const hiraganaList = [
  { id: 0, character: 'あ', translation: 'a', errors: 0 },
  { id: 1, character: 'い', translation: 'i', errors: 0  },
  { id: 2, character: 'う', translation: 'u', errors: 0  },
  { id: 3, character: 'え', translation: 'e', errors: 0  },
  { id: 4, character: 'お', translation: 'o', errors: 0  },
  { id: 5, character: 'か', translation: 'ka', errors: 0  },
  { id: 6, character: 'き', translation: 'ki', errors: 0  },
  { id: 7, character: 'く', translation: 'ku', errors: 0  },
  { id: 8, character: 'け', translation: 'ke', errors: 0  },
  { id: 9, character: 'こ', translation: 'ko', errors: 0  },
  { id: 10, character: 'さ', translation: 'sa', errors: 0  },
  { id: 11, character: 'し', translation: 'shi', errors: 0  },
  { id: 12, character: 'す', translation: 'su', errors: 0  },
  { id: 13, character: 'せ', translation: 'se', errors: 0  },
  { id: 14, character: 'そ', translation: 'so', errors: 0  },
  { id: 15, character: 'た', translation: 'ta' , errors: 0 },
  { id: 16, character: 'ち', translation: 'chi', errors: 0  },
  { id: 17, character: 'つ', translation: 'tsu', errors: 0  },
  { id: 18, character: 'て', translation: 'te', errors: 0  },
  { id: 19, character: 'と', translation: 'to', errors: 0  },
  { id: 20, character: 'な', translation: 'na' , errors: 0 },
  { id: 21, character: 'に', translation: 'ni', errors: 0  },
  { id: 22, character: 'ぬ', translation: 'nu', errors: 0  },
  { id: 23, character: 'ね', translation: 'ne' , errors: 0 },
  { id: 24, character: 'の', translation: 'no', errors: 0  },
  { id: 25, character: 'は', translation: 'ha', errors: 0  },
  { id: 26, character: 'ひ', translation: 'hi', errors: 0  },
  { id: 27, character: 'ふ', translation: 'fu', errors: 0  },
  { id: 28, character: 'へ', translation: 'he' , errors: 0 },
  { id: 29, character: 'ほ', translation: 'ho' , errors: 0 },
  { id: 30, character: 'ま', translation: 'ma', errors: 0  },
  { id: 31, character: 'み', translation: 'mi' , errors: 0 },
  { id: 32, character: 'む', translation: 'mu' , errors: 0 },
  { id: 33, character: 'め', translation: 'me', errors: 0  },
  { id: 34, character: 'も', translation: 'mo' , errors: 0 },
  { id: 35, character: 'や', translation: 'ya', errors: 0  },
  { id: 36, character: 'ゆ', translation: 'yu', errors: 0  },
  { id: 37, character: 'よ', translation: 'yo', errors: 0  },
  { id: 38, character: 'ら', translation: 'ra', errors: 0  },
  { id: 39, character: 'り', translation: 'ri', errors: 0  },
  { id: 40, character: 'る', translation: 'ru', errors: 0  },
  { id: 41, character: 'れ', translation: 're', errors: 0  },
  { id: 42, character: 'ろ', translation: 'ro', errors: 0  },
  { id: 43, character: 'わ', translation: 'wa', errors: 0  },
  { id: 44, character: 'を', translation: 'wo' , errors: 0 },
  { id: 45, character: 'ん', translation: 'n' , errors: 0 },
  { id: 46, character: 'が', translation: 'ga' , errors: 0 },
  { id: 47, character: 'ぎ', translation: 'gi', errors: 0  },
  { id: 48, character: 'ぐ', translation: 'gu', errors: 0  },
  { id: 49, character: 'げ', translation: 'ge', errors: 0  },
  { id: 50, character: 'ご', translation: 'go', errors: 0  },
  { id: 51, character: 'ざ', translation: 'za' , errors: 0 },
  { id: 52, character: 'じ', translation: 'ji', errors: 0  },
  { id: 53, character: 'ず', translation: 'zu', errors: 0  },
  { id: 54, character: 'ぜ', translation: 'ze', errors: 0  },
  { id: 55, character: 'ぞ', translation: 'zo' , errors: 0 },
  { id: 56, character: 'だ', translation: 'da', errors: 0  },
  { id: 57, character: 'ぢ', translation: 'ji', errors: 0  }, // raramente usado
  { id: 58, character: 'づ', translation: 'zu', errors: 0  }, // raramente usado
  { id: 59, character: 'で', translation: 'de', errors: 0  },
  { id: 60, character: 'ど', translation: 'do', errors: 0 },
  { id: 61, character: 'ば', translation: 'ba', errors: 0  },
  { id: 62, character: 'び', translation: 'bi' , errors: 0 },
  { id: 63, character: 'ぶ', translation: 'bu', errors: 0  },
  { id: 64, character: 'べ', translation: 'be', errors: 0  },
  { id: 65, character: 'ぼ', translation: 'bo' , errors: 0 },
  { id: 66, character: 'ぱ', translation: 'pa', errors: 0  },
  { id: 67, character: 'ぴ', translation: 'pi', errors: 0  },
  { id: 68, character: 'ぷ', translation: 'pu', errors: 0  },
  { id: 69, character: 'ぺ', translation: 'pe', errors: 0  },
  { id: 70, character: 'ぽ', translation: 'po', errors: 0  },
];

const Modal = ({ playerName, score, highScore, onClose }) => {
  const [rankedErrors, setRankedErrors] = useState([]);

  const fetchRankedErrors = async () => {
    const storedHiraganaList = await localforage.getItem('hiraganaList');
    if (storedHiraganaList) {
      // Ordenar os erros com base na contagem (mais erros primeiro) e pegar os 30 primeiros
      const sortedErrors = storedHiraganaList.sort((a, b) => b.errors - a.errors).slice(0, 30);
      setRankedErrors(sortedErrors);
    }
  };
  
  fetchRankedErrors();

  return (
    <div className='divmodal'>
      <h2>Estatísticas do Jogador</h2>
      <p>Nome: {playerName}</p>
      <p>Acertos: {score}</p>
      <p>Maior pontuação: {highScore}</p>
      <h3>30 Símbolos mais Errados:</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)'}}>
        {rankedErrors.map((hiragana, index) => (
          <div key={index}>
            {hiragana.character} - {hiragana.errors} erros
          </div>
        ))}
      </div>
      <button className='btnclose' onClick={onClose}>
        Fechar
      </button>
      <button
      style={{width:'100px', height:'45px'}}
      onClick={() => console.log(hiraganaList)}
    >
      Ver Lista de Hiraganas
    </button>
    </div>
  );
};

const MemoryGame = () => {
  const [playerName, setPlayerName] = useState('');
  const [currentCard, setCurrentCard] = useState({});
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [translationAnswer, setTranslationAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [scoreWrong, setScoreWrong] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [acertoMessage, setAcertoMessage] = useState('');
  const [correctColor, setCorrectColor] = useState('green');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const setHiraganaList = (newHiraganaList) => {
    localforage.setItem('hiraganaList', newHiraganaList);
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const storedPlayerName = await localforage.getItem('playerName');
      if (storedPlayerName) {
        setPlayerName(storedPlayerName);
      } else {
        const name = prompt('Digite seu nome:');
        setPlayerName(name || 'Jogador');
        await localforage.setItem('playerName', name || 'Jogador');
      }

      const storedHiraganaList = await localforage.getItem('hiraganaList');
      if (storedHiraganaList) {
        setHiraganaList(storedHiraganaList);
      }

      initializeGame();
    };

    fetchData();
  }, [score]);

  const initializeGame = () => {
    setTimeout(() => {
      setErrorMessage('');
      setAcertoMessage('');
      const seed = String(Math.random());
      const shuffledHiraganaList = shuffleArray(hiraganaList, seed);
      const correctIndex = Math.floor(Math.random() * 6);
      const correctHiragana = shuffledHiraganaList[correctIndex];
      setCurrentCard(correctHiragana);
      const incorrectOptions = shuffledHiraganaList
        .filter((hiragana, index) => index !== correctIndex)
        .slice(0, 5);
      setOptions(shuffleArray([correctHiragana, ...incorrectOptions]));
    }, 1000);
  };

  const updateErrors = async (updatedHiraganaList) => {
    setHiraganaList(updatedHiraganaList);
  
    // Atualize o armazenamento local com os novos erros
    await localforage.setItem('hiraganaList', updatedHiraganaList);
  };
  

  const handleOptionClick = (selectedOption) => {
    if (selectedOption.id === currentCard.id) {
      setScore(score + 1);
      setAcertoMessage('Certo');
      const newProgress = (score + 1) / 100;
      setProgress(newProgress > 1 ? 1 : newProgress);
    } else {
      setErrorMessage('Errou');
      setCorrectColor('red');
      setTranslationAnswer(currentCard.translation);
      setScoreWrong(scoreWrong + 1);
  
      const updatedHiraganaList = hiraganaList.map((hiragana) => {
        if (hiragana.id === selectedOption.id) {
          return {
            ...hiragana,
            errors: hiragana.errors + 1,
          };
        }
        return hiragana;
      });
  
      setOptions([]);
      setHiraganaList(updatedHiraganaList);
  
      setTimeout(() => {
        setErrorMessage('');
        setCorrectColor('green');
        setTranslationAnswer(null);
        initializeGame();
      }, 1000);
    }
  
    if (score + 1 > highScore) {
      setHighScore(score + 1);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const storedHighScore = await localforage.getItem('highScore');
      if (storedHighScore) {
        setHighScore(parseInt(storedHighScore, 10));
      }

      const storedHiraganaList = await localforage.getItem('hiraganaList');
      if (storedHiraganaList) {
        setHiraganaList(storedHiraganaList);
      }

      initializeGame();
    };

    fetchData();
  }, []);

  useEffect(() => {
    localforage.setItem('highScore', highScore.toString());
    localforage.setItem('hiraganaList', hiraganaList);
  }, [highScore, hiraganaList]);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };


  return (
    <div className='container'>
      <div className='progress-bar-container'>
        {/* ... (código anterior) */}
      </div>
      <div className='contalert'>
        {errorMessage && (
          <div className='error-message'>
            {errorMessage}
          </div>
        )}
        {acertoMessage && (
          <div className='acerto-message' style={{ color: 'green', marginTop: '10px' }}>
            {acertoMessage}
          </div>
        )}
      </div>
      <div className='contcaracter'>
        <div style={{ fontSize: '2em', textAlign: 'center', color: correctColor }}>
          {currentCard.character}

          {translationAnswer && (
            <div style={{ fontSize: '30px', textAlign: 'center', color: correctColor }}>{translationAnswer}</div>
          )}
        </div>
      </div>
      <div className='divbtns'>
        {options.map((option) => (
          <button
            className='btnchoses'
            key={option.id}
            onClick={() => handleOptionClick(option)}
            disabled={correctColor === 'red'}
          >
            {option.translation}
          </button>
        ))}
      </div>
      <div className='contbase'>
        <button className='btnopenmodal' onClick={handleOpenModal}>まとめ</button>
        {isOpenModal && (
          <Modal
            playerName={playerName}
            score={score}
            highScore={highScore}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default MemoryGame;

