// Sample data - will be replaced with database connection later
const victimsData = [
    {
        id: 1,
        name: "Aung Kyaw",
        age: 42,
        location: "Yangon",
        status: "deceased",
        lastSeen: "2025-03-15",
        details: "Construction worker, died in building collapse"
    },
    {
        id: 2,
        name: "Hla Hla",
        age: 28,
        location: "Mandalay",
        status: "injured",
        lastSeen: "2025-03-15",
        details: "Leg injuries from apartment collapse"
    },
    {
        id: 3,
        name: "Min Zaw",
        age: 35,
        location: "Bago",
        status: "missing",
        lastSeen: "2025-03-15",
        details: "Last seen near market area"
    },
    {
        id: 4,
        name: "Khin Khin",
        age: 56,
        location: "Yangon",
        status: "deceased",
        lastSeen: "2025-03-15",
        details: "School teacher, died in school collapse"
    },
    {
        id: 5,
        name: "Myo Myint",
        age: 31,
        location: "Naypyidaw",
        status: "injured",
        lastSeen: "2025-03-15",
        details: "Head injuries, hospitalized"
    },
    {
        id: 6,
        name: "Thida Win",
        age: 22,
        location: "Mandalay",
        status: "missing",
        lastSeen: "2025-03-15",
        details: "University student, last seen at dormitory"
    }
];

// DOM elements
const victimsTable = document.getElementById('victims-data');
const searchInput = document.getElementById('search-input');
const statusButtons = document.querySelectorAll('.status-btn');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

// Pagination variables
const itemsPerPage = 5;
let currentPage = 1;
let filteredData = [...victimsData];

// Initialize the table
function renderTable() {
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    // Clear existing rows
    victimsTable.innerHTML = '';
    
    // Add new rows
    paginatedData.forEach(victim => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${victim.name}</td>
            <td>${victim.age}</td>
            <td>${victim.location}</td>
            <td><span class="status-badge ${victim.status}">${victim.status.charAt(0).toUpperCase() + victim.status.slice(1)}</span></td>
            <td>${victim.lastSeen}</td>
            <td>${victim.details}</td>
        `;
        victimsTable.appendChild(row);
    });
    
    // Update pagination info
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Update button states
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

// Filter data based on search and status
function filterData() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeStatus = document.querySelector('.status-btn.active').dataset.status;
    
    filteredData = victimsData.filter(victim => {
        const matchesSearch = 
            victim.name.toLowerCase().includes(searchTerm) ||
            victim.location.toLowerCase().includes(searchTerm) ||
            victim.details.toLowerCase().includes(searchTerm);
        
        const matchesStatus = activeStatus === 'all' || victim.status === activeStatus;
        
        return matchesSearch && matchesStatus;
    });
    
    currentPage = 1; // Reset to first page when filters change
    renderTable();
}

// Event listeners
searchInput.addEventListener('input', filterData);

statusButtons.forEach(button => {
    button.addEventListener('click', () => {
        statusButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterData();
    });
});

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
});

nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    
    // Mobile menu toggle (matches home page)
    document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });
});