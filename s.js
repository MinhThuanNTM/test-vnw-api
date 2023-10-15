const fs = require('fs');

fetch('https://ms.vietnamworks.com/job-search/v1.0/search', {
    method: 'POST',
    headers: {
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
    },
    body: JSON.stringify({
        'userId': 0,
        'query': '',
        'filter': [
            {
                'field': 'jobLevelId',
                'value': '8'
            }
        ],
        'ranges': [],
        'order': [],
        'hitsPerPage': 50,
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
    })
})
// .then(res => res.json())
// .then(res => console.log(res))
.then(res => fs.writeFileSync('s.json',))