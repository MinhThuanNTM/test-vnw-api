const api = 'https://ms.vietnamworks.com/job-search/v1.0/search'



const bodyParams = {
    'userId': 0,
    'query': '',
    'filter': [
    ],
    'ranges': [],
    'order': [],
    'hitsPerPage': 30,
    'page': 0,
    'retrieveFields': [
        'address',
        'benefits',
        'jobTitle',
        'salaryMax',
        'isSalaryVisible',
        'jobLevelVI',
        'isShowLogo',
        'salaryMin',
        'companyLogo',
        'userId',
        'jobLevel',
        'jobLevelId',
        'jobId',
        'companyId',
        'approvedOn',
        'isAnonymous',
        'alias',
        'expiredOn',
        'industries',
        'workingLocations',
        'services',
        'companyName',
        'salary',
        'onlineOn',
        'simpleServices',
        'visibilityDisplay',
        'isShowLogoInSearch',
        'priorityOrder',
        'skills',
        'profilePublishedSiteMask',
        'jobDescription',
        'jobRequirement',
        'prettySalary',
        'requiredCoverLetter',
        'languageSelectedVI',
        'languageSelected',
        'languageSelectedId'
    ]
}

const headers = {
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Origin': 'https://www.vietnamworks.com',
    'Pragma': 'no-cache',
    'Referer': 'https://www.vietnamworks.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'X-Source': 'Page-Container',
    'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"'
}

const filterForm = {
    groupJob: [],
    jobs: [],
    locations: [],
}

var locationsRes = []
var groupJobRes = []
var jobsRes = []
let jobLevel

let currentJobsTotal = 0;
const filterBar = document.querySelector('.filter-bar').querySelector('.left-bar')
// filterBar.querySelector('.jobs').style.display = 'none';
!(() => {

    fetch("groupjob.json")
        .then(res => res.json())
        .then(res => {
            groupJobRes.push(res)
            return res
        })
        .then(res => {
            renderFilter('groupJob', res)
        })

    fetch("jobFunctionsV3.json")
        .then(res => res.json())
        .then(res => {
            jobsRes.push(res)
            return res
        })
        .then(res => renderFilter('jobs', res))

    fetch("workingLocations.json")
        .then(res => res.json())
        .then(res => {
            locationsRes.push(res)
            return res
        })
        .then(res => renderFilter('locations', res))

    

    document.querySelectorAll('.search-btn').forEach(btn =>
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            filterForm['groupJob'] = []
            filterForm['jobs'] = []
            filterForm['locations'] = []
            filterBar.querySelectorAll('[data-groupJob]').forEach(box => {
                box.checked === true ? filterForm['groupJob'].push(box.value) : filterForm['groupJob'].push()
            })
            filterBar.querySelectorAll('[data-jobs]').forEach(box => {
                box.checked === true ? filterForm['jobs'].push(box.value) : filterForm['jobs'].push()
            })
            filterBar.querySelectorAll('[data-locations]').forEach(box => {
                box.checked === true ? filterForm['locations'].push(box.value) : filterForm['locations'].push()
            })


            getJobs()
        })


    )
})()



const jobFunction = () => {

    let jobFunctionsValue = "["
    filterForm.groupJob.forEach((job, index) => {
        const jobChildren = groupJobRes[0].filter(data => data.groupJobFunctionV3Id === +job)[0].children
        index > 0 ? jobFunctionsValue += "," : jobFunctionsValue += ""
        jobFunctionsValue += filterForm['jobs'] && jobChildren.includes(+filterForm['jobs'][0])
            ? `{\"parentId\":${job},\"childrenIds\":[${+filterForm['jobs'][0]}]}`
            : `{\"parentId\":${job},\"childrenIds\":[-1]}`
    })
    jobFunctionsValue += ']';
    const jobFunctions = {
        "field": "jobFunction",
        "value": ""
    }
    jobFunctions["value"] = jobFunctionsValue

    return jobFunctions

}

const locations = () => {
    let locationsValue = ""
    filterForm.locations.forEach(location => {
        locationsValue += location
    })
    const locations = {
        "field": "workingLocations.cityId",
        "value": locationsValue
    }
    return locations
}

const getJobs = async () => {

    const body = JSON.parse(JSON.stringify(bodyParams))
    filterForm.groupJob[0]
        ?body.filter.push(jobFunction()) : body.filter.push()

    filterForm.locations[0]
        ?body.filter.push(locations()): body.filter.push()
        
    const fetchData = (await fetch(api, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })).json()
    const jobs = (await fetchData).data
    currentJobsTotal = jobs.length
    renderJob(jobs)
}



const renderFilter = (filter, data) => {

    //     : filter === 'jobs' ? data.jobFunctionsV3 : data.workingLocations

    const filterName = filter === 'locations' ? 'city'
        : filter === 'groupJob' ? 'groupJobFunctionV3'
            : 'jobFunctionV3'
    const defaultTitle = filter === 'locations' ? 'Tỉnh thành'
        : filter === 'groupJob' ? 'Ngành nghề' : 'Lĩnh vực'
    let filterData = data.sort((a, b) => a[filterName + 'Id'] - b[filterName + 'Id'])
    let list = ``
    filterData.forEach((data) => {
        !list.includes(data[filterName + 'NameVI'])
            ? list += `<a class="dropdown-item" 
                            onclick="checkThis(this)"
                            href="#">
                            <input type="radio" class="form-check-input"
                                 value="${data[filterName + 'Id']}"
                                 name="check-${filterName}"
                                 data-${filter}="${data[filterName + 'Id']}"
                            />
                            ${data[filterName + 'NameVI']}
                        </a>`
            : list += ''
    })
    filterBar.querySelector('.' + filter).innerHTML = `

              <div
              style="height: 40px; padding: 0px 8px;"
                class="d-flex align-items-center"
                data-toggle="dropdown"
              >
            <div id="filter-${filter}" class="filter-title" > Tất cả ${defaultTitle}</div>
            <svg width="24" height="24" viewBox="0 0 24 24" version="1.1" 
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path d="M18.6585527,8 C18.5713629,8.00266306 18.4880768,8.03910071 18.4269136,8.10286651 L11.9995722,14.5302079 L5.57223085,8.10286651 C5.50976631,8.03779911 5.42387773,8.00266306 5.33408503,8.00136146 C5.19744359,8.00266306 5.07641862,8.08464752 5.02436484,8.20957661 C4.97361231,8.33580729 5.00354332,8.47895504 5.10114425,8.57395311 L11.7640289,15.2368378 C11.8941634,15.3669722 12.104981,15.3669722 12.2351155,15.2368378 L18.8980002,8.57395311 C18.9969023,8.47895504 19.0268334,8.33190317 18.9747796,8.20567282 C18.9214245,8.07944214 18.7964954,7.99745768 18.6585527,8 Z" id="Down-Arrow-Thin" stroke-width="1"></path></svg>
                
            </div>
              <div class="dropdown-menu" style="position: relative;" aria-labelledby="dropdownMenuButton">
                <h5>${defaultTitle}</h5>
                <div  class="search-option" class="d-flex ">
                    <div class="search-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0799 1.43994C5.56867 1.43994 1.91992 5.08869 1.91992 9.59994C1.91992 14.1112 5.56867 17.7599 10.0799 17.7599C11.6905 17.7599 13.1812 17.2874 14.4449 16.4849L20.3399 22.3799L22.3799 20.3399L16.5599 14.5349C17.6062 13.1624 18.2399 11.4618 18.2399 9.59994C18.2399 5.08869 14.5912 1.43994 10.0799 1.43994ZM10.0799 3.35994C13.5355 3.35994 16.3199 6.14432 16.3199 9.59994C16.3199 13.0556 13.5355 15.8399 10.0799 15.8399C6.6243 15.8399 3.83992 13.0556 3.83992 9.59994C3.83992 6.14432 6.6243 3.35994 10.0799 3.35994Z" fill="#888"></path></svg>
                    </div>
                    <input type="text" data-search="${filter}">
                </div>
                <div class="dropdown-list-items">
                    ${list}
                </div>
                <div class="button-group">
                    <button class="btn btn-primary cancel-btn">Hủy</button>
                    <button class="btn btn-primary search-btn">Tìm Kiếm</button>
                </div>
              </div>
              `
    createSearch()
}

const handleSearch = (e) => {
    const att = e.target.getAttribute('data-search')
    document.querySelectorAll(`[data-${att}]`).forEach(
        element => {
            element.parentNode.childNodes[2].textContent
                .toLocaleLowerCase().includes(
                    e.target.value.toLocaleLowerCase()
                )
                ? element.parentNode.style.display = ''
                : element.parentNode.style.display = 'none'
        }
    )
}

const createSearch = () => {
    document.querySelectorAll('[data-search]').forEach(
        search => search.addEventListener('input', handleSearch)
    )
}

const renderJob = (jobs) => {
    const root = document.querySelector('.jobs__block')
    let data = ``
    jobs.forEach(job => {
        data +=

            `
    <div class="job__item">
      <div class="company__logo">
        <img
          src="${job.companyLogo}"
          data-src="${job.companyLogo}"
          alt="logo"/>
      </div>
      <div class="job__item__info">
        <div class="job__title">
          <a href="" target="_blank">${job.jobTitle}</a>
        </div>
        <div class="job__company__name">
          <a href="" target="_blank">${job.companyName}</a>
        </div>
        <div class="job__salary">${job.prettySalary}</div>
        <div class="job__location">${job.workingLocations[0].cityNameVI}</div>
      </div>
    </div>`
    })
    root.innerHTML = data


    document.querySelector('.sectionBlock__title').querySelector('strong')
        .innerText = filterForm['jobs'][0] ? jobsRes[0].filter(job => job.jobFunctionV3Id == filterForm['jobs'][0])[0].jobFunctionV3NameVI
            : filterForm['groupJob'][0] ? groupJobRes[0].filter(job => job.groupJobFunctionV3Id == filterForm['groupJob'][0])[0].groupJobFunctionV3NameVI
                : filterForm['locations'][0] ? locationsRes[0].filter(locations => locations.cityId == filterForm['locations'][0])[0].cityNameVI
                    : ''


    createDots()
}


getJobs()
const checkThis = (x) => {
    const checkBox = x.children[0]
    checkBox.checked = checkBox.checked === true ? false : true

    
    const isGroupJob = checkBox.getAttribute('data-groupJob') 
    const isJobs = checkBox.getAttribute('data-jobs') 
    const isLocations = checkBox.getAttribute('data-locations')


    isGroupJob ? filterForm.jobs = [] : []
    isGroupJob && document.querySelector('input[data-jobs]:checked')
        ? document.querySelector('input[data-jobs]:checked').checked = false : false
    const group = groupJobRes[0].filter(job => job.groupJobFunctionV3Id == checkBox.value)
    const jobs = jobsRes[0].filter(job => job.jobFunctionV3Id == checkBox.value)
    const location = locationsRes[0].filter(job => job.cityId == checkBox.value)
    isGroupJob && checkBox.checked
        ? document.querySelectorAll('[data-jobs]').forEach(
            jobs => {
                !group[0].children.includes(+jobs.getAttribute('data-jobs'))
                    ? jobs.parentElement.style.display = 'none'
                    : jobs.parentElement.style.display = ''
            }
        )
        : ''


    isGroupJob ? document.querySelector('#filter-groupJob').innerHTML = group[0].groupJobFunctionV3NameVI
    : isJobs ?  document.querySelector('#filter-jobs').innerHTML = jobs[0].jobFunctionV3NameVI
    : isLocations ? document.querySelector('#filter-locations').innerHTML = location[0].cityNameVI : ''
}


// const slider = ()=>{

const sliderBar = document.querySelector('.slider-bar')
const slide = document.querySelector('.jobs__block')
const dotsSlider = sliderBar.querySelector('.dots')



let curSlide = 0;
let maxSlide = 0
const createDots = function () {
    maxSlide = (currentJobsTotal / 3 ).toFixed(0);
    dotsSlider.innerHTML = ''
    for (let i = 0; i < maxSlide; i++) {
        dotsSlider.innerHTML +=
            `<button class="dots__dot" data-slide="${i}"></button>`
    }

    init();
};

const activateDot = function (slide) {
    document
        .querySelectorAll('.dots__dot')
        .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
};


const goToSlide = function (slideNum) {
    slide.style.transform = `translateX(${-(418 + 16) * slideNum}px)`
};

// Next slide
const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
        curSlide = 0;
    } else {
        curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
};

const prevSlide = function () {
    if (curSlide === 0) {
        curSlide = maxSlide - 1;
    } else {
        curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
};


const init = function () {
    goToSlide(0);
    currentJobsTotal
        ? activateDot(0)
        : ''
};
init();

// }

// slider()