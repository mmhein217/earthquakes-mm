// Sample donor data - will be replaced with database connection later
const donorsData = [
    {
        id: 1,
        name: "International Red Cross",
        type: "Organization",
        amount: 500000,
        tier: "platinum",
        date: "2025-03-16",
        notes: "Emergency relief fund"
    },
    {
        id: 2,
        name: "United Nations",
        type: "Organization",
        amount: 350000,
        tier: "platinum",
        date: "2025-03-17",
        notes: "Humanitarian aid"
    },
    {
        id: 3,
        name: "Myanmar Government",
        type: "Government",
        amount: 1000000,
        tier: "platinum",
        date: "2025-03-15",
        notes: "National disaster fund"
    },
    {
        id: 4,
        name: "Save the Children",
        type: "Organization",
        amount: 75000,
        tier: "gold",
        date: "2025-03-18",
        notes: "Child welfare support"
    },
    {
        id: 5,
        name: "Doctors Without Borders",
        type: "Organization",
        amount: 60000,
        tier: "gold",
        date: "2025-03-19",
        notes: "Medical supplies"
    },
    {
        id: 6,
        name: "Local Business Association",
        type: "Organization",
        amount: 25000,
        tier: "silver",
        date: "2025-03-20",
        notes: "Local business coalition"
    },
    {
        id: 7,
        name: "Yangon Community Fund",
        type: "Community",
        amount: 15000,
        tier: "silver",
        date: "2025-03-21",
        notes: "Community donations"
    },
    {
        id: 8,
        name: "John Smith",
        type: "Individual",
        amount: 5000,
        tier: "bronze",
        date: "2025-03-22",
        notes: "Personal donation"
    }
];

// DOM elements
const donorsTable = document.getElementById('donors-data');
const searchInput = document.getElementById('search-input');
const tierFilter = document.getElementById('tier-filter');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

// Pagination variables
const itemsPerPage = 5;
let currentPage = 1;
let filteredData = [...donorsData];

// Format currency
function formatCurrency(amount) {
    return '$' + amount.toLocaleString();
}

// Initialize the table
function renderTable() {
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    // Clear existing rows
    donorsTable.innerHTML = '';
    
    // Add new rows
    paginatedData.forEach(donor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${donor.name}</td>
            <td>${donor.type}</td>
            <td>${formatCurrency(donor.amount)}</td>
            <td><span class="tier-badge tier-${donor.tier}">${donor.tier.charAt(0).toUpperCase() + donor.tier.slice(1)}</span></td>
            <td>${donor.date}</td>
            <td>${donor.notes}</td>
        `;
        donorsTable.appendChild(row);
    });
    
    // Update pagination info
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Update button states
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

// Filter data based on search and tier
function filterData() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedTier = tierFilter.value;
    
    filteredData = donorsData.filter(donor => {
        const matchesSearch = 
            donor.name.toLowerCase().includes(searchTerm) ||
            donor.type.toLowerCase().includes(searchTerm) ||
            donor.notes.toLowerCase().includes(searchTerm);
        
        const matchesTier = selectedTier === 'all' || donor.tier === selectedTier;
        
        return matchesSearch && matchesTier;
    });
    
    currentPage = 1; // Reset to first page when filters change
    renderTable();
}

// Event listeners
searchInput.addEventListener('input', filterData);
tierFilter.addEventListener('change', filterData);

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