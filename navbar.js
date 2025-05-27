// Mobile menu toggle
document.getElementById("menuToggle").addEventListener("click", function () {
    document.querySelector(".nav-menu").classList.toggle("show");
});

// Handle mobile dropdown
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.classList.toggle('active');
        }
    });
});

// Search functionality
function searchVehicles() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchTerm = searchInput.value.toLowerCase().trim();

    // Clear previous results
    searchResults.innerHTML = '';
    searchResults.style.display = 'none';

    if (searchTerm.length < 2) {
        return;
    }

    // Vehicle categories to search through
    const vehicleCategories = [
        { name: 'Toyota Cars', url: 'toyota_car_section.html' },
        { name: 'Honda Cars', url: 'honda_car_section.html' },
        { name: 'BMW Cars', url: 'bmw_car_section.html' },
        { name: 'Honda Bikes', url: 'honda_bike_section.html' },
        { name: 'TVS Bikes', url: 'tvs_bike_section.html' },
        { name: 'Yamaha Bikes', url: 'yamaha_bike_section.html' },
        { name: 'Pickup Trucks', url: 'pickup_section.html' },
        { name: 'Minivans', url: 'minivan_section.html' }
    ];

    // Filter vehicles based on search term
    const results = vehicleCategories.filter(vehicle => 
        vehicle.name.toLowerCase().includes(searchTerm)
    );

    if (results.length > 0) {
        searchResults.style.display = 'block';
        const resultsList = document.createElement('ul');
        
        results.forEach(vehicle => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = vehicle.url;
            link.textContent = vehicle.name;
            listItem.appendChild(link);
            resultsList.appendChild(listItem);
        });

        searchResults.appendChild(resultsList);
    }
}

// Close search results when clicking outside
document.addEventListener('click', function(event) {
    const searchResults = document.getElementById('searchResults');
    const searchContainer = document.querySelector('.search');
    
    if (!searchContainer.contains(event.target)) {
        searchResults.style.display = 'none';
    }
}); 