import { TESTS } from "/levels/levelTests.js";

const getEl = (id, val) => document.getElementById(id)
const setEl = (id, val) => getEl.innerHTML = val

// Main game loop setup, accepts a config arg that is currently not used
const SyntaxBlast = config => {

    // Game level challenge elements
    let currentChallenge = getEl('current-challenge')

    // Keyboard input
    let playerInput = getEl('player-input')

    let detectCompletion = () => playerInput.value === currentChallenge.innerHTML
    
    function textEnemyEffects(font) {
      currentChallenge.style.fontSize = font + 1 + "px"
      currentChallenge.style.opacity += 3.0
    }

    function levelLooper() {
        let i = 0
        let font = 2

        setInterval(() => {

            if (detectCompletion()) {

                TEST_LEVEL_STATS.kills += 1
                font = 1
                i++
                currentChallenge.innerHTML = TESTS.INTRO_LEVEL_TEST[i] || "L e V e L C o M p L e T e"
                clearInterval()
            }

            setInterval(() => {
              font++
              textEnemyEffects(font)

              if (font > 49 && !detectCompletion()) {
                  font = 1
                  TEST_LEVEL_STATS.health -= 25
                  setEl("player-stats", buildStatsDisplay(TEST_LEVEL_STATS))
                  clearInterval()
              }
            }, 500)

        }, 10000);
    }

    levelLooper();
}

 // Stats
let TEST_LEVEL_STATS = {
    levelNumber: 0,
    levelName: "TESTS",
    kills: 0,
    health: 100
}

function buildStatsDisplay(stats) {

  return `<p>Level #: ${stats.levelNumber} -
          Level Name: ${stats.levelName}</br>
          Kills: ${stats.kills} -
          Health: ${stats.health}</p>`
}

// Start Button / Game Init

getEl('start-button').addEventListener('click', () => {
    console.log('started...')
    setEl("player-stats", buildStatsDisplay(TEST_LEVEL_STATS))
    SyntaxBlast('test - config')
}, false)

