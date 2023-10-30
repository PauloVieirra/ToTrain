import React, { useState, useEffect } from 'react';
import'./App.css';

const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
const hiraganaList = [
  { id: 0, character: 'あ', translation: 'a' },
  { id: 1, character: 'い', translation: 'i' },
  { id: 2, character: 'う', translation: 'u' },
  { id: 3, character: 'え', translation: 'e' },
  { id: 4, character: 'お', translation: 'o' },
  { id: 5, character: 'か', translation: 'ka' },
  { id: 6, character: 'き', translation: 'ki' },
  { id: 7, character: 'く', translation: 'ku' },
  { id: 8, character: 'け', translation: 'ke' },
  { id: 9, character: 'こ', translation: 'ko' },
  { id: 10, character: 'さ', translation: 'sa' },
  { id: 11, character: 'し', translation: 'shi' },
  { id: 12, character: 'す', translation: 'su' },
  { id: 13, character: 'せ', translation: 'se' },
  { id: 14, character: 'そ', translation: 'so' },
  { id: 15, character: 'た', translation: 'ta' },
  { id: 16, character: 'ち', translation: 'chi' },
  { id: 17, character: 'つ', translation: 'tsu' },
  { id: 18, character: 'て', translation: 'te' },
  { id: 19, character: 'と', translation: 'to' },
  { id: 20, character: 'な', translation: 'na' },
  { id: 21, character: 'に', translation: 'ni' },
  { id: 22, character: 'ぬ', translation: 'nu' },
  { id: 23, character: 'ね', translation: 'ne' },
  { id: 24, character: 'の', translation: 'no' },
  { id: 25, character: 'は', translation: 'ha' },
  { id: 26, character: 'ひ', translation: 'hi' },
  { id: 27, character: 'ふ', translation: 'fu' },
  { id: 28, character: 'へ', translation: 'he' },
  { id: 29, character: 'ほ', translation: 'ho' },
  { id: 30, character: 'ま', translation: 'ma' },
  { id: 31, character: 'み', translation: 'mi' },
  { id: 32, character: 'む', translation: 'mu' },
  { id: 33, character: 'め', translation: 'me' },
  { id: 34, character: 'も', translation: 'mo' },
  { id: 35, character: 'や', translation: 'ya' },
  { id: 36, character: 'ゆ', translation: 'yu' },
  { id: 37, character: 'よ', translation: 'yo' },
  { id: 38, character: 'ら', translation: 'ra' },
  { id: 39, character: 'り', translation: 'ri' },
  { id: 40, character: 'る', translation: 'ru' },
  { id: 41, character: 'れ', translation: 're' },
  { id: 42, character: 'ろ', translation: 'ro' },
  { id: 43, character: 'わ', translation: 'wa' },
  { id: 44, character: 'を', translation: 'wo' },
  { id: 45, character: 'ん', translation: 'n' },
  { id: 46, character: 'が', translation: 'ga' },
  { id: 47, character: 'ぎ', translation: 'gi' },
  { id: 48, character: 'ぐ', translation: 'gu' },
  { id: 49, character: 'げ', translation: 'ge' },
  { id: 50, character: 'ご', translation: 'go' },
  { id: 51, character: 'ざ', translation: 'za' },
  { id: 52, character: 'じ', translation: 'ji' },
  { id: 53, character: 'ず', translation: 'zu' },
  { id: 54, character: 'ぜ', translation: 'ze' },
  { id: 55, character: 'ぞ', translation: 'zo' },
  { id: 56, character: 'だ', translation: 'da' },
  { id: 57, character: 'ぢ', translation: 'ji' }, // raramente usado
  { id: 58, character: 'づ', translation: 'zu' }, // raramente usado
  { id: 59, character: 'で', translation: 'de' },
  { id: 60, character: 'ど', translation: 'do' },
  { id: 61, character: 'ば', translation: 'ba' },
  { id: 62, character: 'び', translation: 'bi' },
  { id: 63, character: 'ぶ', translation: 'bu' },
  { id: 64, character: 'べ', translation: 'be' },
  { id: 65, character: 'ぼ', translation: 'bo' },
  { id: 66, character: 'ぱ', translation: 'pa' },
  { id: 67, character: 'ぴ', translation: 'pi' },
  { id: 68, character: 'ぷ', translation: 'pu' },
  { id: 69, character: 'ぺ', translation: 'pe' },
  { id: 70, character: 'ぽ', translation: 'po' },
];


const Modal = ({ playerName, score, highScore, onClose }) => {
  return (
    <div className='divmodal'>
      <h2>Estatísticas do Jogador</h2>
      <p>Nome: {playerName}</p>
      <p>Acertos: {score}</p>
      <p>Maior pontuação: {highScore}</p>
      <button className='btnclose' onClick={onClose}>
        Fechar
      </button>
    </div>
  );
};

const MemoryGame = () => {
  const [playerName, setPlayerName] = useState('');
  const [currentCard, setCurrentCard] = useState({});
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [acertoMessage, setAcertoMessage] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);


  const initializeGame = () => {
    // Limpar a mensagem de erro após 2 segundos
    setTimeout(() => {
      setErrorMessage('');
      setAcertoMessage('');
    }, 2000);
  
    const shuffledHiraganaList = shuffleArray(hiraganaList);
    const correctIndex = Math.floor(Math.random() * 6);
  
    const correctHiragana = shuffledHiraganaList[correctIndex];
    setCurrentCard(correctHiragana);
  
    const incorrectOptions = shuffledHiraganaList
      .filter((hiragana, index) => index !== correctIndex)
      .slice(0, 5);
  
    setOptions(shuffleArray([correctHiragana, ...incorrectOptions]));
  };
  

  const handleOptionClick = (selectedOption) => {
    if (selectedOption.id === currentCard.id) {
      setScore(score + 1);
      setAcertoMessage('Certo');
      const newProgress = (score + 1) / 100; // Altere 100 para o número total de acertos desejado
      setProgress(newProgress > 1 ? 1 : newProgress);
    } else {
      setErrorMessage('Errou');
    }

    if (score + 1 > highScore) {
      setHighScore(score + 1);
    }

    initializeGame();
  };

  useEffect(() => {
    const storedPlayerName = localStorage.getItem('playerName');
    if (storedPlayerName) {
      setPlayerName(storedPlayerName);
    } else {
      const name = prompt('Digite seu nome:');
      setPlayerName(name || 'Jogador');
      localStorage.setItem('playerName', name || 'Jogador');
    }

    initializeGame();
  }, [score]);

  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('highScore', highScore.toString());
  }, [highScore]);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className='container'>
      <div className='progress-bar-container'>
        <div
          className='progress-bar'
          style={{ width: `${progress * 100}%`, background: 'green', transition: 'width 0.5s ease' }}
        >
          <div style={{ position: 'absolute', left: '20px', top: '10px' }}>{score} Acertos</div>
        </div>
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
        <div style={{ fontSize: '2em', textAlign: 'center' }}>{currentCard.character}</div>
      </div>
      <div className='divbtns'>
        {options.map((option) => (
          <button className='btnchoses' key={option.id} onClick={() => handleOptionClick(option)}>
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

