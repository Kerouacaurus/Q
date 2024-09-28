let selectedName = '';
let drawnName = '';
let availableNames = [];

// Fetch available names on page load
fetch('/api/available-names')
    .then(response => response.json())
    .then(names => {
        availableNames = names;
    });

function confirmSelection(option) {
    if (drawnName) {
        alert('Negalite pasirinkti kito vardo.');
        return;
    }
    selectedName = option;
    document.getElementById('selectedNameDisplay').textContent = selectedName;
    document.getElementById('confirmationBox').style.display = 'block';
}

document.getElementById('yesButton').onclick = function() {
    document.getElementById('selectedOption').innerHTML = 'Pasirinkta: <strong>' + selectedName + '</strong>';
    document.getElementById('confirmationBox').style.display = 'none';
    document.getElementById('drawButton').style.display = 'block';
};

document.getElementById('noButton').onclick = function() {
    document.getElementById('confirmationBox').style.display = 'none';
};

function drawRandomName() {
    if (drawnName) {
        return;
    }
    // Choose a random name from available names
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    drawnName = availableNames[randomIndex];
    document.getElementById('drawnName').innerHTML = 'Išsitraukėte: <strong>' + drawnName + '</strong>';

    // Log the drawn name on the server
    fetch('/api/log-drawn-name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: drawnName }),
    })
    .then(response => {
        if (!response.ok) {
            alert('This name has already been drawn.');
        }
    });

    // Disable the draw button after the first draw
    document.getElementById('drawButton').disabled = true;
}

