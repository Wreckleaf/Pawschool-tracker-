let dogs = []; // Array to store dog names and durations

// Function to add a dog to the list
function addDog() {
    const dogName = document.getElementById("dogName").value;
    const duration = parseInt(document.getElementById("duration").value);

    if (dogName && !isNaN(duration) && duration > 0) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + duration);

        dogs.push({ name: dogName, duration: duration, endDate: endDate });

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
        const timeLeft = calculateTimeLeft(dog.endDate);

        const dogElement = document.createElement("div");
        dogElement.classList.add("dog-item");
        dogElement.innerHTML = `${dog.name} - ${dog.duration} day(s) (${timeLeft}) 
            <button onclick="deleteDog(${index})" class="delete-btn"><i class="fas fa-trash-alt"></i></button>`;
        dogList.appendChild(dogElement);
    });
}

// Function to calculate the time remaining
function calculateTimeLeft(endDate) {
    const now = new Date();
    const timeDifference = endDate - now;

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

// Update the dog list every second to show the countdown
setInterval(displayDogs, 1000);
