let dogs = []; // Array to store dog names, durations, end times, and pause states

// Function to handle device selection
function selectDevice(device) {
    const devicePrompt = document.getElementById("devicePrompt");
    const mainContent = document.getElementById("mainContent");

    devicePrompt.style.display = 'none'; // Hide device prompt screen
    mainContent.style.display = 'block'; // Show main content

    if (device === 'mobile') {
        document.body.style.maxWidth = '390px';  // Adjust for iPhone 14 width
        document.body.style.margin = 'auto';
    }
}

// Function to add a dog to the list
function addDog() {
    const dogName = document.getElementById("dogName").value;
    const duration = parseInt(document.getElementById("duration").value);

    if (dogName && !isNaN(duration) && duration > 0) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + duration);

        dogs.push({ name: dogName, duration: duration, endDate: endDate, paused: false, pauseTime: 0 });

        // Clear inputs
        document.getElementById("dogName").value = '';
        document.getElementById("duration").value = '';

        displayDogs(); // Update the dog list display
    } else {
        alert("Please enter a valid dog name and duration.");
    }
}

// Function to display the dogs in the list
function displayDogs() {
    const dogList = document.getElementById("dogList");
    dogList.innerHTML = ''; // Clear previous dog list

    dogs.forEach((dog, index) => {
        const timeLeft = calculateTimeLeft(dog.endDate, dog.paused, dog.pauseTime);

        const dogElement = document.createElement("div");
        dogElement.classList.add("dog-item");
        dogElement.innerHTML = `${dog.name} - ${dog.duration} day(s) (${timeLeft}) 
            <button onclick="deleteDog(${index})" class="delete-btn"><i class="fas fa-trash-alt"></i></button>
            <button onclick="pauseDog(${index})" class="pause-btn">${dog.paused ? 'Resume' : 'Pause'}</button>`;
        dogList.appendChild(dogElement);
    });
}

// Function to calculate the time remaining
function calculateTimeLeft(endDate, paused, pauseTime) {
    const now = new Date();
    let timeDifference = endDate - now;

    if (paused) {
        // If paused, just return the time as is, no countdown happening.
        return `${Math.floor(pauseTime / (1000 * 60 * 60 * 24))}d ${Math.floor((pauseTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}h ${Math.floor((pauseTime % (1000 * 60 * 60)) / (1000 * 60))}m ${Math.floor((pauseTime % (1000 * 60)) / 1000)}s`;
    }

    if (timeDifference <= 0) {
        return "Time's up!";
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Function to delete a dog from the list
function deleteDog(index) {
    dogs.splice(index, 1); // Remove the dog at the given index
    displayDogs(); // Update the dog list display
}

// Function to pause a dog
function pauseDog(index) {
    const dog = dogs[index];
    const now = new Date();

    if (!dog.paused) {
        // Pause the countdown by storing the remaining time
        dog.paused = true;
        dog.pauseTime = dog.endDate - now; // Store the remaining time in pauseTime
        dog.endDate = now; // Set the endDate to now so it stops the countdown temporarily
    } else {
        // Resume the countdown from the paused time
        dog.paused = false;
        dog.endDate = new Date(); // Reset the endDate to the current time
        dog.endDate.setTime(now.getTime() + dog.pauseTime); // Add the remaining pause time back to the endDate
        dog.pauseTime = 0; // Reset pauseTime after resuming
    }

    displayDogs(); // Update the dog list display
}

// Update the dog list every second to show the countdown
setInterval(displayDogs, 1000);
