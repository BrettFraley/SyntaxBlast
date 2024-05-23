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


    setEl("player-stats", buildStatsDisplay(TEST_LEVEL_STATS))

    function detectCompletion() {
      return playerInput.value === currentChallenge.innerHTML
    }

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
                clearInterval()
            }

            currentChallenge.innerHTML = TESTS.INTRO_LEVEL_TEST[i] || "L e V e L C o M p L e T e"

            setInterval(() => {
              font++
              console.log(font)
              textEnemyEffects(font)

              if (font > 49 && !detectCompletion()) {
                  font = 1
                  TEST_LEVEL_STATS.health -= 25
                  setEl("player-stats", buildStatsDisplay(TEST_LEVEL_STATS))
                  clearInterval()
              }
            }, 400)

      }, 10000);
    } levelLooper();
}

const setEl = (id, val) => document.getElementById(id).innerHTML = val

SyntaxBlast('test - config')

