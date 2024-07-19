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
    
    let levelSessionComplete = false

    // Game level challenge elements
    let currentChallenge = getEl('current-challenge')

    // Keyboard input
    let playerInput = getEl('player-input')

    let detectCompletion = () => playerInput.value === currentChallenge.innerHTML
    
    function textEnemyEffects(font, opacity, padding, width) {
        currentChallenge.style.fontSize = font + "px"
        currentChallenge.style.opacity = opacity
        currentChallenge.style.padding = padding + "px"
        currentChallenge.style.width = width + "vw"
    }

    function levelLooper(challenge_index) {
        let i = challenge_index || 0 // index of current 'challenge'
        let font = 1
        let opacity = 0
        let padding = 5 // up to 30px padding
        let width = 5   // up to 45vw  

        setInterval(() => {
            if (detectCompletion()) {
                TEST_LEVEL_STATS.kills += 1
                font = 1
                opacity = 0
                padding = 5
                width = 5
                i++

                currentChallenge.innerHTML = TESTS.INTRO_LEVEL_TEST[i] || dialog.levelComplete

                if (currentChallenge.innerHTML === dialog.levelComplete) {
                    levelSessionComplete = true
                }
                // Load / Reset Next Level...
                // Level Ends SyntaxBlast() gets called again on next Level Start
            }
            else {
                font++
                opacity += 0.02
                padding += 1
                width += 1

                if (font > 49 && !detectCompletion()) {
                    font = 1
                    opacity = 0
                    padding = "5px"
                    width = "5vw"
                    TEST_LEVEL_STATS.health -= 25
                    setEl("player-stats", buildStatsDisplay(TEST_LEVEL_STATS))
                }
                textEnemyEffects(font, opacity, padding, width)
            }
        }, 200)
    }

    if (!levelSessionComplete) {
        levelLooper(0);
    }
}

 // Stats
let TEST_LEVEL_STATS = {
    levelNumber: 0,
    levelName: "TESTS",
    kills: 0,
    health: 100
}

function buildStatsDisplay(stats) {

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
        const stats = setEl("player-stats", buildStatsDisplay(TEST_LEVEL_STATS))
        stats.classList.remove('hidden')
        
        SyntaxBlast('test - config')
    }, false)
}

startButtonClickInit();
