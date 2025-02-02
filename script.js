// Load saved dog data from local storage
window.onload = function() {
    if (localStorage.getItem('dogs')) {
        const dogs = JSON.parse(localStorage.getItem('dogs'));
        dogs.forEach(dog => {
            displayDog(dog.name, dog.daysLeft, dog.stayDuration);
        });
    }
};

// Function to add a dog
function addDog() {
    const dogName = document.getElementById('dogName').value;
    const stayDuration = parseInt(document.getElementById('stayDuration').value);

    if (dogName && !isNaN(stayDuration)) {
        const daysLeft = stayDuration;
        const dog = { name: dogName, daysLeft: daysLeft, stayDuration: stayDuration };
        
        // Save dog data to local storage
        let dogs = localStorage.getItem('dogs') ? JSON.parse(localStorage.getItem('dogs')) : [];
        dogs.push(dog);
        localStorage.setItem('dogs', JSON.stringify(dogs));

        // Display the dog
        displayDog(dogName, daysLeft, stayDuration);
    }
}

// Function to display a dog
function displayDog(name, daysLeft, stayDuration) {
    const dogList = document.getElementById('dogList');
    const dogItem = document.createElement('div');
    dogItem.className = 'dogItem';

    dogItem.innerHTML = `
        <div class="dogName">${name}</div>
        <div class="countdown">Days Left: ${daysLeft}</div>
    `;

    dogList.appendChild(dogItem);

    // Start countdown for each dog
    setInterval(() => {
        if (daysLeft > 0) {
            daysLeft--;
            dogItem.querySelector('.countdown').innerText = `Days Left: ${daysLeft}`;
            updateDogData(name, daysLeft);
        }
    }, 86400000); // Update every 24 hours
}

// Function to update dog data in local storage
function updateDogData(name, newDaysLeft) {
    const dogs = JSON.parse(localStorage.getItem('dogs'));
    const dogIndex = dogs.findIndex(dog => dog.name === name);
    if (dogIndex > -1) {
        dogs[dogIndex].daysLeft = newDaysLeft;
        localStorage.setItem('dogs', JSON.stringify(dogs));
    }
}
