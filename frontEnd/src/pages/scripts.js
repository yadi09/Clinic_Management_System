document.addEventListener('DOMContentLoaded', () => {
    const dashboardLink = document.getElementById('dashboard-link');
    const patientsLink = document.getElementById('patients-link');
    const dashboardSection = document.getElementById('dashboard-section');
    const patientsSection = document.getElementById('patients-section');
    const searchBarSection = document.getElementById('search-bar-section');

    if (dashboardLink && patientsLink && dashboardSection && patientsSection && searchBarSection) {
        dashboardLink.addEventListener('click', () => {
            dashboardSection.classList.remove('hidden');
            patientsSection.classList.add('hidden');
            searchBarSection.classList.add('hidden');
        });

        patientsLink.addEventListener('click', () => {
            dashboardSection.classList.add('hidden');
            patientsSection.classList.remove('hidden');
            searchBarSection.classList.remove('hidden');
        });
    }
});
