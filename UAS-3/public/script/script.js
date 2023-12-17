$(document).ready(function() {
    const socket = new WebSocket('ws://localhost:3001');

    function setupToggleButtons() {
        const toggleButtons = document.querySelectorAll('.show-button, .hide-button');
        const gauges = document.querySelectorAll('.gauge');
    
        toggleButtons.forEach((toggleButton, index) => {
            toggleButton.addEventListener('click', () => {
                if (gauges[index].style.display === 'grid') {
                    gauges[index].style.display = 'none';
                    toggleButton.textContent = 'Show';
                    toggleButton.classList.remove('btn-danger');
                    toggleButton.classList.add('btn-primary');
                } else {
                    gauges[index].style.display = 'grid';
                    toggleButton.textContent = 'Hide';
                    toggleButton.classList.remove('btn-primary');
                    toggleButton.classList.add('btn-danger');
                }
            });
        });
    }
    
    setupToggleButtons();
    
    let nextSensorNumber = 7;
    
    function addSensor() {
        const sensorTemplate = `
            <div class="col">
                Sensor ${nextSensorNumber}
                <div class="gauge">
                    50
                </div>
                <div class="button">
                    <button class="btn btn-danger hide-button">Hide</button>
                    <button class="btn btn-danger delete-button">Delete</button>
                </div>
            </div>
        `;
        nextSensorNumber++;
        $('.row').append(sensorTemplate);
        setupToggleButtons();
        setupDeleteButtons();
    }
    
    function setupDeleteButtons() {
        const deleteButtons = document.querySelectorAll('.delete-button');
        const gauges = document.querySelectorAll('.gauge');
    
        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                if (gauges.length > 1) {
                    gauges[index].parentNode.remove();
                }
            });
        });
    }
    
    setupDeleteButtons();
    
    $('.add-button').on('click', addSensor);
    
    // WebSocket setup
    socket.addEventListener('message', (event) => {
        const temperature = parseFloat(event.data);
        // Update UI with the latest temperature value
        updateTemperatureUI(temperature);
    });

    function updateTemperatureUI(temperature) {
        $('.gauge').each(function() {
            $(this).css('--percent', temperature);
            $(this).text(temperature + '°C');
        });
    }
});



