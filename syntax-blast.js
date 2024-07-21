import { TESTS } from "/levels/levelTests.js";

// Helpers
const getEl = (id, val) => document.getElementById(id)
const setEl = (id, val) => { 
    const el = getEl(id)
    el.innerHTML = val
    return el
}

// Dialog
const dialog = {
    levelComplete: "L e V e L C o M p L e T e",
}

// Main game loop setup, accepts a config arg that is currently not used
const SyntaxBlast = config => {
    
    let levelComplete = false
    let currentChallenge = getEl('current-challenge')
    let playerInput = getEl('player-input')

    // Show message, wait timeInterval, clear it, show next message..NOTE: revisit
    const playMessage = (message, timeInterval) => {
            playerInput.value = message
            setTimeout(() => { playerInput.value = "" }, timeInterval)
    }

    const showStartButton = bool => {
        const startButton = getEl('start-button')
        startButton.style.display = bool ? 'block' : 'none'
    }

    const showPlayerInput = bool => playerInput.className = bool ? '' : 'hidden'
    const showCurrentChallenge = bool => currentChallenge.style.display = bool ? 'block' : 'none'

    const detectChallengeComplete = () => playerInput.value === currentChallenge.innerHTML
    
    const textEnemyEffects = (font, opacity, width) => {
        currentChallenge.style.fontSize = font + "px"
        currentChallenge.style.opacity = opacity
        currentChallenge.style.width = width + "vw"
    }

    const levelLooper = level => {
        let i = 0 // index of current 'challenge'
        let font = 1
        let opacity = 0
        let width = 5   // up to 45vw
        currentChallenge.innerHTML = level[i]

        showPlayerInput(true)
        showCurrentChallenge(true)
        playerInput.focus()

        let levelSequence = setInterval(() => {

            if (detectChallengeComplete()) {    
                playMessage("Get Ready...", 2000)
                PLAYER_STATS.kills += 1
                setEl("player-stats", updateStatsDisplay(PLAYER_STATS))

                font = 1
                opacity = 0
                width = 5
                // Level is complete
                if (i === level.length - 1) {                    
                    levelComplete = true
                    playMessage([dialog.levelComplete], 3000) //TODO: not working

                    // Load / Reset Next Level...
                    // Level Ends SyntaxBlast() gets called again on next Level Start
                    setTimeout(() => {
                        showCurrentChallenge(false)
                        showPlayerInput(false)
                        showStartButton(true)
                        clearInterval(levelSequence), 7000 })
                }
                else {
                    i++
                    currentChallenge.innerHTML = level[i]
                }
            }
            else {
                font++
                opacity += 0.05
                width += 1

                if (font > 59 && !detectChallengeComplete()) {
                    font = 1
                    opacity = 0.2
                    width = 5
                    PLAYER_STATS.health -= 25
                    setEl("player-stats", updateStatsDisplay(PLAYER_STATS))

                    // Stop this level sequence when health at zero
                    if (PLAYER_STATS.health === 0) {
                        clearInterval(levelSequence)

                        // TODO: FAILED | GAME OVER | LAST BREAKPOINT ???
                    }


                }
                textEnemyEffects(font, opacity, width)
            }
        }, 200)
    }

    levelLooper(TESTS.INTRO_LEVEL_TEST);
}

 // Stats
let PLAYER_STATS = {
    levelNumber: 0,
    levelName: "TESTS",
    kills: 0,
    health: 100
}

function updateStatsDisplay(stats) {
  return `<p>Level: ${stats.levelNumber}</br>
          Name: ${stats.levelName}</br>
          Kills: ${stats.kills}</br>
          Health: ${stats.health}</p>`
}

const startButtonClickInit = () => {
    const button = getEl('start-button')

    button.addEventListener('click', () => {
        
        button.style.display = "none" // Hide start button
        const logo = getEl('logo')    // Minimize logo
        logo.classList.add('mini')
        // Set and show stats
        const stats = setEl("player-stats", updateStatsDisplay(PLAYER_STATS))
        stats.classList.remove('hidden')
        
        SyntaxBlast('test - config')
    }, false)
}

startButtonClickInit();
