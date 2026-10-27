const filterLocation = document.querySelector('#filter-location')
const filterExperienceLevel = document.querySelector('#filter-experience-level')
const filterTechnology = document.querySelector('#filter-technology')

function applyFilters () {
  document.dispatchEvent(new CustomEvent('job-filters-change'))
}

filterLocation.addEventListener('change', applyFilters)
filterExperienceLevel.addEventListener('change', applyFilters)
filterTechnology.addEventListener('change', applyFilters)