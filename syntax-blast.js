import { TESTS } from "/levels/levelTests.js";


const SyntaxBlast = config => {

    // Wrappers and UI controls
    let levelArea = document.getElementById('level-area')
    let playerStats = document.getElementById('player-stats')
    let startButton = document.getElementById('start-button')

    // Game level cahllenge elements
    let currentChallenge = document.getElementById('current-challenge')


    // Keyboard input
    let playerInput = document.getElementById('player-input')


    startButton.addEventListener('click', () => {
        console.log(config)
    }, false)

    setEl("player-stats", "SET PLAYER STATS TEST")

    function detectCompletion() {
      return playerInput.value === currentChallenge.innerHTML
    }

    function textEnemyEffects(font) {
      currentChallenge.style.fontSize = font + 2 + "px"
      currentChallenge.opacity += 3
    }

    function levelLooper() {
        let i = 0
        let font = 2

        setInterval(() => {

            if (detectCompletion()) {
              i++
              clearInterval()
            }

            //i = i == TESTS.INTRO_LEVEL_TEST.length - 1 ? 0 : i + 1
            currentChallenge.innerHTML = TESTS.INTRO_LEVEL_TEST[i]

            setInterval(() => {
              font++
              console.log(font)
              textEnemyEffects(font)

              if (font > 49) {
                  font = 2
                  clearInterval()
              }
            }, 1000)




      }, 10000);
    } levelLooper();
}

const setEl = (id, val) => document.getElementById(id).innerHTML = val


SyntaxBlast('test - config')

/**
Give the illusion of paralax proportion using
opacity very light and font size very small
and increasing over the time limit and disipating
"collison" where the player loses health as they
did not complete the block acurately in time
*/
