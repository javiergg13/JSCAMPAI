const container = document.querySelector(".jobs-listings")
const pagination = document.querySelector(".pagination")

const RESULTS_PER_PAGE = 3
let jobs = []
let currentPage = 1

function getFilteredJobs() {
  const modalidadSelected = document.querySelector("#filter-location").value
  const nivelSelected = document.querySelector("#filter-experience-level").value
  const technologySelected = document.querySelector("#filter-technology").value

  return jobs.filter((job) => {
    const technologies = job.data.technology

    return (
      (modalidadSelected === "" || modalidadSelected === job.data.modalidad) &&
      (nivelSelected === "" || nivelSelected === job.data.nivel) &&
      (technologySelected === "" || technologies.includes(technologySelected))
    )
  })
}

function createJobCard(job) {
  const article = document.createElement("article")
  article.className = "job-listing-card"

  article.dataset.modalidad = job.data.modalidad
  article.dataset.nivel = job.data.nivel
  article.dataset.technology = job.data.technology.join(",")

  article.innerHTML = `<div>
      <h3>${job.titulo}</h3>
      <small>${job.empresa} | ${job.ubicacion}</small>
      <p>${job.descripcion}</p>
    </div>
    <button class="button-apply-job">Aplicar</button>`

  return article
}

function renderPagination(totalPages) {
  pagination.replaceChildren()
  pagination.hidden = totalPages === 0

  if (totalPages === 0) return

  const firstPage = document.createElement("a")
  firstPage.href = "#"
  firstPage.dataset.page = 1
  firstPage.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>`
  firstPage.setAttribute("aria-label", "Primera página")
  pagination.appendChild(firstPage)

  const previousPage = document.createElement("a")
  previousPage.href = "#"
  previousPage.dataset.page = Math.max(1, currentPage - 1)
  previousPage.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6"/></svg>`
  previousPage.setAttribute("aria-label", "Página anterior")
  pagination.appendChild(previousPage)

  for (let page = 1; page <= totalPages; page++) {
    const pageLink = document.createElement("a")
    pageLink.href = "#"
    pageLink.dataset.page = page
    pageLink.textContent = page

    if (page === currentPage) {
      pageLink.classList.add("is-active")
      pageLink.setAttribute("aria-current", "page")
    }

    pagination.appendChild(pageLink)
  }

  const nextPage = document.createElement("a")
  nextPage.href = "#"
  nextPage.dataset.page = Math.min(totalPages, currentPage + 1)
  nextPage.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>`
  nextPage.setAttribute("aria-label", "Página siguiente")
  pagination.appendChild(nextPage)

  const lastPage = document.createElement("a")
  lastPage.href = "#"
  lastPage.dataset.page = totalPages
  lastPage.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m13 7 5 5-5 5"/><path d="m6 7 5 5-5 5"/></svg>`
  lastPage.setAttribute("aria-label", "Última página")
  pagination.appendChild(lastPage)
}

function renderJobs() {
  const filteredJobs = getFilteredJobs()
  const totalPages = Math.ceil(filteredJobs.length / RESULTS_PER_PAGE)
  currentPage = Math.min(currentPage, Math.max(totalPages, 1))

  const start = (currentPage - 1) * RESULTS_PER_PAGE
  const jobsForPage = filteredJobs.slice(start, start + RESULTS_PER_PAGE)

  container.replaceChildren(...jobsForPage.map(createJobCard))
  renderPagination(totalPages)
}

pagination.addEventListener("click", (event) => {
  const pageLink = event.target.closest("[data-page]")

  if (!pageLink) return

  event.preventDefault()
  currentPage = Number(pageLink.dataset.page)
  renderJobs()
})

document.addEventListener("job-filters-change", () => {
  currentPage = 1
  renderJobs()
})

fetch("./data.json")
  .then((response) => {
    return response.json()
  })
  .then((loadedJobs) => {
    jobs = loadedJobs
    renderJobs()
  })
