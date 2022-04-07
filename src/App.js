import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import './styles/styles.css'

import caeser from './images/caeser_landscape.jpg';
import baconImage from './images/bacon_landscape.jpg';
import atbashImage from './images/atbash_landscape.jpg';
import vigenereImage from './images/vigenere_landscape.jpg';
import playFairImage from './images/playfair_landscape.jpg';
import railFenceImage from './images/railfence_landscape.jpg'


const crypto = require('text-cryptography');
const playfair = require('crypto-classic-playfair');

function App() {
  const [vigenere, setVigenere] = useState("");
  const [fenceText, setFenceText] = useState("");
  const [fairText, setFairText] = useState("");
  const [atbashText, setatbashText] = useState("");
  const [baconian, setBaconian] = useState("");

  const [text, setText] = useState("");
  const [rotText, setRotText] = useState("");


  function Rot(rot, mode) {
    const dataAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    const textArray = [];
    var rotArray = [];

    //to convert input string to array
    for (let i = 0; i < text.length; i++) {
      textArray[i] = text[i].toLowerCase();
    }

    //rot algorithm
    for (let i = 0; i < textArray.length; i++) {
      if (dataAlphabet.includes(textArray[i])) {
        for (let j = 0; j < dataAlphabet.length; j++) {
          if (dataAlphabet[j] === textArray[i]) {
            //for encryption
            if (mode === "encrypt") {
              if (j >= (26 - Number(rot))) {
                rotArray[i] = dataAlphabet[(j + Number(rot)) - 26]
              } else {
                rotArray[i] = dataAlphabet[j + Number(rot)]
              }
            }
            //for decryption
            else {
              if (j < Number(rot)) {
                rotArray[i] = dataAlphabet[(26 - (Number(rot) - j))]
              } else {
                rotArray[i] = dataAlphabet[j - Number(rot)]
              }
            }
          }
        }
      }
      //for characters other than alphabet
      else {
        rotArray[i] = textArray[i];
      }
    }

    var finalText = rotArray[0];

    for (let i = 1; i < rotArray.length; i++) {
      finalText = finalText.concat(rotArray[i]);
    }
    setRotText(finalText);
  }

  function bacon(text, mode) {
    //Creating new Baconian Object
    let bacon = new crypto.Baconian();

    //Cipher Decipher
    if (mode === 'encrypt') {
      var ciperText = bacon.encrypt(text);
      setBaconian(ciperText);
    } else if (mode === 'decrypt') {
      var decipherText = bacon.decrypt(text);
      setBaconian(decipherText)
    }
  }
  function atbash(text, mode) {
    //Creating new Baconian Object
    let atbash = new crypto.Atbash();

    //Cipher Decipher
    if (mode === 'encrypt') {
      var ciperText = atbash.encrypt(text);
      setatbashText(ciperText);
    } else if (mode === 'decrypt') {
      var decipherText = atbash.decrypt(text);
      setatbashText(decipherText)
    }
  }
  function fair(text, mode, key) {

    if (mode === 'encrypt') {
      var ciperText = playfair.encipher(text, key);
      setFairText(ciperText);
    } else if (mode === 'decrypt') {
      var decipherText = playfair.decipher(text, key);
      setFairText(decipherText)
    }
  }


  function fence(text, mode, key) {

    var fenceArray = [];

    // creating a 2d array
    for (let i = 0; i < key; i++) {
      fenceArray[i] = [];
    }

    //filling array with null values
    for (let i = 0; i < key; i++) {
      for (let j = 0; j < text.length; j++) {
        fenceArray[i][j] = null;
      }
    }

    //FOR ENCRYPTION
    if (mode === "encrypt") {

      var j = 0;
      var min = true;
      var max = false;
      //Putting the characters in diagonal of the matrix
      for (let i = 0; i < text.length; i++) {
        if (min) {
          fenceArray[j][i] = text[i];
          j++;
          if (j >= key - 1) {
            min = false;
            max = true;
          }
        } else if (max) {
          fenceArray[j][i] = text[i];
          j--;
          if (j <= 0) {
            min = true;
            max = false;
          }
        }
      }

      console.log(fenceArray);

      // merging the arrays
      var merged = [].concat.apply([], fenceArray);
      //converting to string
      var str = "";

      for (let i = 0; i < merged.length; i++) {
        if (merged[i] != null) {
          str += merged[i]
        }
      }
      setFenceText(str);
    }

    //FOR DECRYPTION
    else if (mode === "decrypt") {

      j = 0;
      min = true;
      max = false;
      //Putting "1" at the diagonal of the matrix
      for (let i = 0; i < text.length; i++) {
        if (min) {
          fenceArray[j][i] = 1;
          j++;
          if (j >= key - 1) {
            min = false;
            max = true;
          }
        } else if (max) {
          fenceArray[j][i] = 1;
          j--;
          if (j <= 0) {
            min = true;
            max = false;
          }
        }
      }


      // merging the arrays
      merged = [].concat.apply([], fenceArray);

      //Adding the characters where "1"
      j = 0;
      for (let i = 0; i < merged.length; i++) {
        if (merged[i] === 1) {
          merged[i] = text[j]
          j++;
        }

      }

      //Unmerging the matrix
      function splitToChunks(array, parts) {
        let result = [];
        for (let i = parts; i > 0; i--) {
          result.push(array.splice(0, Math.ceil(array.length / i)));
        }
        return result;
      }

      merged = splitToChunks(merged, key);

      console.log(merged);

      str = " ";
      j = 0;
      min = true;
      max = false;
      //adding the diagonal characters to the str string.
      for (let i = 0; i < text.length; i++) {
        if (min) {
          str += merged[j][i];
          j++;
          if (j >= key - 1) {
            min = false;
            max = true;
          }
        } else if (max) {
          str += merged[j][i];
          j--;
          if (j <= 0) {
            min = true;
            max = false;
          }
        }
      }
      setFenceText(str); //Final Decrypted Text
    }
  }


  function vig(text, mode, key) {
    //Creating new Baconian Object
    let bacon = new crypto.Vigenere(key);

    //Cipher Decipher
    if (mode === 'encrypt') {
      var ciperText = bacon.encrypt(text);
      setVigenere(ciperText);
    } else if (mode === 'decrypt') {
      var decipherText = bacon.decrypt(text);
      setVigenere(decipherText)
    }
  }

  return (
    <main>

      {/* Caeser */}
      <main className="main">
        <img className="caeser-bg" src={caeser} alt="" />
        <form className="form" onSubmit={(e) => { e.preventDefault(); }} action="">
          <div className="user-input">
            <label htmlFor="userInput">Enter Text</label>
            <textarea onChange={() => { setText(document.getElementById("userInput").value); }} type="text" id="userInput" />
          </div>
          <div className="settings">
            <select defaultValue={"encrypt"} name="" id="mode">
              <option value="encrypt">Encrypt</option>
              <option value="decrypt">Decrypt</option>
            </select>
            <select defaultValue={13} name="Rot-13" id="rot">
              <option value="1">Rot-1</option>
              <option value="2">Rot-2</option>
              <option value="3">Rot-3</option>
              <option value="4">Rot-4</option>
              <option value="5">Rot-5</option>
              <option value="6">Rot-6</option>
              <option value="7">Rot-7</option>
              <option value="8">Rot-8</option>
              <option value="9">Rot-9</option>
              <option value="10">Rot-10</option>
              <option value="11">Rot-11</option>
              <option value="12">Rot-12</option>
              <option value="13">Rot-13</option>
              <option value="14">Rot-14</option>
              <option value="15">Rot-15</option>
              <option value="16">Rot-16</option>
              <option value="17">Rot-17</option>
              <option value="18">Rot-18</option>
              <option value="19">Rot-19</option>
              <option value="20">Rot-20</option>
              <option value="21">Rot-21</option>
              <option value="22">Rot-22</option>
              <option value="23">Rot-23</option>
              <option value="24">Rot-24</option>
              <option value="25">Rot-25</option>
            </select>
            <button onClick={() => { Rot(document.getElementById("rot").value, document.getElementById("mode").value) }} type="submit">Convert</button>
          </div>
          <div className="output">
            <label htmlFor="output">Output</label>
            <p id='output'>{rotText}</p>
          </div>
        </form>
        <div className="wiki">
          <h2>Caeser CIpher - ROT13 </h2>
          <h3>("rotate by 13 places", sometimes hyphenated ROT-13)</h3>
          <p>a simple letter substitution cipher that replaces a letter with the 13th letter after it in the alphabet. ROT13 is a special case of the Caesar cipher which was developed in ancient Rome by Julius Caesar (100 BC - 44 BC)</p>
        </div>
      </main>

      {/* Bacon */}
      <main className="main">
        <img className="caeser-bg" src={baconImage} alt="" />
        <form className="form" onSubmit={(e) => { e.preventDefault(); }} action="">
          <div className="user-input">
            <label htmlFor="userInput">Enter Text</label>
            <textarea type="text" id="userInput" />
          </div>
          <div className="settings">
            <select defaultValue={"encrypt"} name="" id="mode">
              <option value="encrypt">Encrypt</option>
              <option value="decrypt">Decrypt</option>
            </select>
            <button onClick={() => { bacon(document.getElementById("userInput").value, document.getElementById("mode").value) }} type="submit">Convert</button>
          </div>
          <div className="output">
            <label htmlFor="output">Output</label>
            <p id='output'>{baconian}</p>
          </div>
        </form>
        <div className="wiki">
          <h2>Baconian Cipher </h2>
          <h3>Francis Bacon</h3>
          <p>Bacon's cipher or the Baconian cipher is a method of steganographic message encoding devised by Francis Bacon in 1605</p>
        </div>
      </main>

      {/* Atbash */}
      <main className="main">
        <img className="caeser-bg" src={atbashImage} alt="" />
        <form className="form" onSubmit={(e) => { e.preventDefault(); }} action="">
          <div className="user-input">
            <label htmlFor="userInput">Enter Text</label>
            <textarea type="text" id="userInput" />
          </div>
          <div className="settings">
            <select defaultValue={"encrypt"} name="" id="mode">
              <option value="encrypt">Encrypt</option>
              <option value="decrypt">Decrypt</option>
            </select>
            <button onClick={() => { atbash(document.getElementById("userInput").value, document.getElementById("mode").value) }} type="submit">Convert</button>
          </div>
          <div className="output">
            <label htmlFor="output">Output</label>
            <p id='output'>{atbashText}</p>
          </div>
        </form>
        <div className="wiki">
          <h2>Atbash Cipher </h2>
          <h3>Hebrews</h3>
          <p>Atbash is a monoalphabetic substitution cipher originally used to encrypt the Hebrew alphabet.</p>
        </div>

      </main>

      {/* Playfair */}
      <main className="main">
        <img className="caeser-bg" src={playFairImage} alt="" />
        <form className="form" onSubmit={(e) => { e.preventDefault(); }} action="">
          <div className="user-input">
            <label htmlFor="userInput">Enter Text</label>
            <textarea type="text" id="userInput" />
          </div>
          <div className="settings">
            <div>
              <label htmlFor="#key">Enter Key (Word): </label>
              <input id='key' type="text" />
            </div>
            <select defaultValue={"encrypt"} name="" id="mode">
              <option value="encrypt">Encrypt</option>
              <option value="decrypt">Decrypt</option>
            </select>
            <button onClick={() => { fair(document.getElementById("userInput").value, document.getElementById("mode").value, document.getElementById("key").value) }} type="submit">Convert</button>
          </div>
          <div className="output">
            <label htmlFor="output">Output</label>
            <p id='output'>{fairText}</p>
          </div>
        </form>
        <div className="wiki">
          <h2>PlayFair Cipher </h2>
          <h3>Wheatstone-Playfair</h3>
          <p>The Playfair cipher or Playfair square or Wheatstone-Playfair cipher is a manual symmetric encryption technique and was the first literal digram substitution cipher.</p>
        </div>
      </main>

      {/* RailFence*/}
      <main className="main">
        <img className="caeser-bg" src={railFenceImage} alt="" />
        <form className="form" onSubmit={(e) => { e.preventDefault(); }} action="">
          <div className="user-input">
            <label htmlFor="userInput">Enter Text:</label>
            <textarea type="text" id="userInput" />
          </div>
          <div className="settings">
            <div>
              <label htmlFor="#key">Enter Key (Number): </label>
              <input id='key' type="text" />
            </div>
            <select defaultValue={"encrypt"} name="" id="mode">
              <option value="encrypt">Encrypt</option>
              <option value="decrypt">Decrypt</option>
            </select>
            <button onClick={() => { fence(document.getElementById("userInput").value, document.getElementById("mode").value, document.getElementById("key").value) }} type="submit">Convert</button>
          </div>
          <div className="output">
            <label htmlFor="output">Output:</label>
            <p id='output'>{fenceText}</p>
          </div>
        </form>
        <div className="wiki">
          <h2>RailFence Cipher </h2>
          <h3>Greeks</h3>
          <p>The rail fence cipher (also called a zigzag cipher) is a classical type of transposition cipher. It derives its name from the manner in which encryption is performed.</p>
        </div>
      </main>

      {/* Vigenere */}
      <main className="main">
        <img className="caeser-bg" src={vigenereImage} alt="" />
        <form className="form" onSubmit={(e) => { e.preventDefault(); }} action="">
          <div className="user-input">
            <label htmlFor="userInput">Enter Text</label>
            <textarea type="text" id="userInput" />
          </div>
          <div className="settings">
            <div>
              <label htmlFor="#key">Enter Key (Word): </label>
              <input id='key' type="text" />
            </div>
            <select defaultValue={"encrypt"} name="" id="mode">
              <option value="encrypt">Encrypt</option>
              <option value="decrypt">Decrypt</option>
            </select>
            <button onClick={() => { vig(document.getElementById("userInput").value, document.getElementById("mode").value, document.getElementById("key").value) }} type="submit">Convert</button>
          </div>
          <div className="output">
            <label htmlFor="output">Output</label>
            <p id='output'>{vigenere}</p>
          </div>
        </form>
        <div className="wiki">
          <h2>Vigenere Cipher </h2>
          <h3>Blaise de Vigenère</h3>
          <p>The Vigenère cipher is a method of encrypting alphabetic text by using a series of interwoven Caesar ciphers.</p>
        </div>
      </main>

    </main>
  );
}

export default App;
