document.getElementById('revealMessageButton').addEventListener('touchstart', function() {
    document.getElementById('revealMessageButton').classList.add('hidden');
    document.getElementById('birthdayQuestion').classList.remove('hidden');
});

document.getElementById('yesButton').addEventListener('touchstart', function() {
    handleBirthdayResponse(true);
});

document.getElementById('noButton').addEventListener('touchstart', function() {
    handleBirthdayResponse(false);
});

function handleBirthdayResponse(isBirthday) {
    const today = new Date();
    const birthday = new Date(today.getFullYear(), 6, 6); // July 6
    const responseElement = document.getElementById('birthdayResponse');
    const isTodayBirthday = today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate();
    const bday = document.getElementById('bday');
    bday.play();
    playCameraSound()
    if (isBirthday) {
        if (isTodayBirthday) {
            responseElement.textContent = "Happy bdayyy Amal!";
        } else {
            responseElement.textContent = "Why are you still here? Shoo, birthday over!";
        }
    } else {
        if (isTodayBirthday) {
            responseElement.textContent = "Nah, I know it's your birthday, Happy Birthdayy Amal";
        } else {
            responseElement.textContent = "Good. Honesty is the best policy";
        }
    }

    document.getElementById('birthdayQuestion').classList.add('hidden');
    responseElement.classList.remove('hidden');
    startConfetti();

    setTimeout(showSighAndJobMessage, 3000);
}

function showSighAndJobMessage() {
    const sighElement = document.getElementById('sigh');
    sighElement.classList.remove('hidden');
    sighElement.style.animation = 'sighAnimation 2s forwards';

    setTimeout(() => {
        sighElement.classList.add('hidden');
        document.getElementById('jobMessage').classList.remove('hidden');
        setTimeout(showCaughtSmilingMessage, 2000);
    }, 3000);
}

function showCaughtSmilingMessage() {
    const caughtSmilingElement = document.getElementById('caughtSmilingMessage');
    caughtSmilingElement.classList.remove('hidden');
    playCameraSound();
    flashEffect();
    setTimeout(clearMessages, 4000); 
}

function clearMessages() {
    const elementsToRemove = [
        'birthdayQuestion',
        'birthdayResponse',
        'message',
        'sigh',
        'jobMessage',
        'caughtSmilingMessage'
    ];

    elementsToRemove.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.remove();
        }
    });


    const confettiCanvas = document.getElementById('canvas');
    confettiCanvas.style.display = 'none'; 
    const helloHeader = document.querySelector('h1'); 

    if (helloHeader) { 
        helloHeader.remove(); 
    }
    const finalMessage = document.createElement('p');
    finalMessage.textContent = "Enjoy the day 👀 (that's it you can quit)";
    finalMessage.classList.add('final-message');
    finalMessage.style.fontSize = '4em'
    document.body.appendChild(finalMessage);
}


function flashEffect() {
    const flashOverlay = document.createElement('div');
    flashOverlay.classList.add('flash-overlay');
    document.body.appendChild(flashOverlay);

    setTimeout(() => {
        document.body.removeChild(flashOverlay);
    }, 300); 
}

function playCameraSound() {
    const cameraSound = document.getElementById('cameraSound');
    let boo = true;

    if (cameraSound.currentTime !== 0) {
        cameraSound.currentTime = 2;
        boo = false;
    }

    cameraSound.play();

    if (boo) {
        cameraSound.currentTime = 2.9;  // Ensure 3 seconds is within the audio's length
    }
}



function startConfetti() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiCount = 300;
    const confetti = [];

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createConfetti() {
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: randomRange(2, 6),
                d: (Math.random() * confettiCount) + 10,
                color: `rgba(${Math.floor(randomRange(0, 255))}, ${Math.floor(randomRange(0, 255))}, ${Math.floor(randomRange(0, 255))}, ${Math.random()})`,
                tilt: Math.floor(Math.random() * 10) - 10,
                tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
                tiltAngle: 0
            });
        }
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((conf, i) => {
            ctx.beginPath();
            ctx.lineWidth = conf.r;
            ctx.strokeStyle = conf.color;
            ctx.moveTo(conf.x + conf.tilt + (conf.r / 2), conf.y);
            ctx.lineTo(conf.x + conf.tilt, conf.y + conf.tilt + (conf.r / 2));
            ctx.stroke();
        });

        moveConfetti();
    }

    function moveConfetti() {
        confetti.forEach((conf, i) => {
            conf.tiltAngle += conf.tiltAngleIncremental;
            conf.y += (Math.cos(conf.d) + 3 + conf.r / 2) / 2;
            conf.tilt = Math.sin(conf.tiltAngle - (i / 3)) * 15;

            if (conf.y > canvas.height) {
                confetti[i] = {
                    x: Math.random() * canvas.width,
                    y: -10,
                    r: conf.r,
                    d: conf.d,
                    color: conf.color,
                    tilt: conf.tilt,
                    tiltAngleIncremental: conf.tiltAngleIncremental,
                    tiltAngle: conf.tiltAngle
                };
            }
        });
    }

    createConfetti();

    function loop() {
        drawConfetti();
        requestAnimationFrame(loop);
    }
    
    loop();
}

window.addEventListener('resize', () => {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

