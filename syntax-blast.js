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

    // Game level challenge elements
    let currentChallenge = getEl('current-challenge')

    // Keyboard input
    let playerInput = getEl('player-input')

    // Show message, wait timeInterval, clear it, show next message
    const playPlayerInputMessage = (messages, timeInterval) => {
        for (let i = 0; i < messages.length; i++) {
            playerInput.value = messages[i]
            setTimeout(() => { playerInput.value = "" }, timeInterval)
        }
    }

    const showStartButton = bool => {
        getEl('start-button').display = 'block';
    }

    const showPlayerInput = bool => {
        if (bool) {
            playerInput.classList.remove('hidden')
            playerInput.focus()
        }
        else {
            playerInput.classList.add('hidden')
        }
    }

    const showCurrentChallenge = bool => {
        if (bool) {
            currentChallenge.classList.remove('hidden')
        }
        else {
            currentChallenge.classList.add('hidden')
        }
    }

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
        showCurrentChallenge(true)
        showPlayerInput(true)

        let levelSequence = setInterval(() => {
            if (detectChallengeComplete()) {
                
                playPlayerInputMessage(["Nice", "Get Ready..."], 2000)
                TEST_LEVEL_STATS.kills += 1
                setEl("player-stats", updateStatsDisplay(TEST_LEVEL_STATS))

                font = 1
                opacity = 0
                width = 5
                // Level is complete
                if (i === level.length - 1) {                    
                    levelComplete = true
                    playPlayerInputMessage([dialog.levelComplete], 3000)
                    showCurrentChallenge(false)
                    showPlayerInput(false)
                    // Load / Reset Next Level...
                    // Level Ends SyntaxBlast() gets called again on next Level Start
            
                    clearInterval(levelSequence)
                }
                else {
                    i++
                    currentChallenge.innerHTML = level[i]
                }

            } else {
                font++
                opacity += 0.02
                width += 1

                if (font > 49 && !detectChallengeComplete()) {
                    font = 1
                    opacity = 0.2
                    width = 5
                    TEST_LEVEL_STATS.health -= 25
                    setEl("player-stats", updateStatsDisplay(TEST_LEVEL_STATS))
                }
                textEnemyEffects(font, opacity, width)
            }
        }, 200)

    } // End level looper

    if (!levelComplete) {
        levelLooper(TESTS.INTRO_LEVEL_TEST);
    }

}

 // Stats
let TEST_LEVEL_STATS = {
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
        
        button.style.display = "none" // todo: add easein-out on display rule
    
        // Minimize landing logo
        const logo = getEl('logo')
        logo.classList.add('mini') // todo: ease here too
    
        // Set Stats
        const stats = setEl("player-stats", updateStatsDisplay(TEST_LEVEL_STATS))
        stats.classList.remove('hidden')
        
        SyntaxBlast('test - config')
    }, false)
}

startButtonClickInit();
