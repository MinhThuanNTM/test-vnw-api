

const { log } = require('console');
const fs = require('fs');
const api = 'https://ms.vietnamworks.com/job-search/v1.0/search'
const header = {
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
const bodyParams = {
    'userId': 0,
    'query': '',
    'filter': [{
        "field": "jobFunction",
        "value": "[{\"parentId\":20,\"childrenIds\":[-1]}]"
    },
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
        "workingLocations",
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
const render = (selector, data) => {
    const root = document.querySelector(selector);
    root.innerHTML += data
};

const city = []

const jobLevel = []

let jobFunctionsV3 = []

// fetch(api, {
//     method: 'POST',
//     headers: {
//         'Accept': '*/*',
//         'Accept-Language': 'en-US,en;q=0.9',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive',
//         'Content-Type': 'application/json',
//         'Origin': 'https://www.vietnamworks.com',
//         'Pragma': 'no-cache',
//         'Referer': 'https://www.vietnamworks.com/',
//         'Sec-Fetch-Dest': 'empty',
//         'Sec-Fetch-Mode': 'cors',
//         'Sec-Fetch-Site': 'same-site',
//         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
//         'X-Source': 'Page-Container',
//         'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
//         'sec-ch-ua-mobile': '?0',
//         'sec-ch-ua-platform': '"macOS"'
//     },
//     body: JSON.stringify(bodyParams)
// })
//     .then(res => res.json())
//     .then(res => {
//         const data = res.data
//         data.forEach(job => {
//             // getCity(job.workingLocations)
//             // getJoblevel(job)
//             // getjobFunctionsV3(job)
//         })
//         console.log(jobFunctionsV3);
//         // fs.writeFileSync("./city.json", JSON.stringify(city))
//         // fs.writeFileSync("./jobLevel.json", JSON.stringify(jobLevel))
//         // fs.writeFileSync("./jobFunctionsV3Group1.json", JSON.stringify(jobFunctionsV3))
//     })

// const getCity = (location) => {
//     const item = {
//         cityId: location[0].cityId,
//         cityName: location[0].cityName,
//         cityNameVI: location[0].cityNameVI,
//     }
//     !city.filter(item => item.cityId === location[0].cityId)[0]
//         ? city.push(item)
//         : city.push()
// }
// const getJoblevel = (job) => {
//     const item = {
//         jobLevelId: job.jobLevelId,
//         jobLevel: job.jobLevel,
//         jobLevelVI: job.jobLevelVI,
//     }
//     !jobLevel.filter(item => item.jobLevelId === job.jobLevelId)[0]
//         ? jobLevel.push(item)
//         : jobLevel.push()
// }


// const jobFunctionsChild = (job) => {
// }









const jobFunctionGroups = []

function createJobFunctionsGroup() {
    const resz = [
        {
            "groupJobFunctionV3Id": 2,
            "groupJobFunctionV3Name": "Accounting/Auditing",
            "groupJobFunctionV3NameVI": "Kế Toán/Kiểm Toán"
        },
        {
            "groupJobFunctionV3Id": 5,
            "groupJobFunctionV3Name": "Information Technology/Telecommunications",
            "groupJobFunctionV3NameVI": "Công Nghệ Thông Tin/Viễn Thông"
        },
        {
            "groupJobFunctionV3Id": 29,
            "groupJobFunctionV3Name": "CEO & General Management",
            "groupJobFunctionV3NameVI": "CEO & General Management"
        },
        {
            "groupJobFunctionV3Id": 21,
            "groupJobFunctionV3Name": "Sales",
            "groupJobFunctionV3NameVI": "Kinh Doanh"
        },
        {
            "groupJobFunctionV3Id": 27,
            "groupJobFunctionV3Name": "Manufacturing",
            "groupJobFunctionV3NameVI": "Sản Xuất"
        },
        {
            "groupJobFunctionV3Id": 4,
            "groupJobFunctionV3Name": "Architecture/Construction",
            "groupJobFunctionV3NameVI": "Kiến Trúc/Xây Dựng"
        },
        {
            "groupJobFunctionV3Id": 12,
            "groupJobFunctionV3Name": "Human Resources/Recruitment",
            "groupJobFunctionV3NameVI": "Nhân Sự/Tuyển Dụng"
        },
        {
            "groupJobFunctionV3Id": 16,
            "groupJobFunctionV3Name": "Legal",
            "groupJobFunctionV3NameVI": "Pháp Lý"
        },
        {
            "groupJobFunctionV3Id": 10,
            "groupJobFunctionV3Name": "Banking & Financial Services",
            "groupJobFunctionV3NameVI": "Ngân Hàng & Dịch Vụ Tài Chính"
        },
        {
            "groupJobFunctionV3Id": 28,
            "groupJobFunctionV3Name": "Pharmacy",
            "groupJobFunctionV3NameVI": "Dược"
        },
        {
            "groupJobFunctionV3Id": 6,
            "groupJobFunctionV3Name": "Customer Service",
            "groupJobFunctionV3NameVI": "Dịch Vụ Khách Hàng"
        },
        {
            "groupJobFunctionV3Id": 20,
            "groupJobFunctionV3Name": "Administration/Office Support",
            "groupJobFunctionV3NameVI": "Hành Chính Văn Phòng"
        },
        {
            "groupJobFunctionV3Id": 1,
            "groupJobFunctionV3Name": "Academic/Education",
            "groupJobFunctionV3NameVI": "Giáo Dục"
        },
        {
            "groupJobFunctionV3Id": 22,
            "groupJobFunctionV3Name": "Technician",
            "groupJobFunctionV3NameVI": "Kỹ Thuật"
        },
        {
            "groupJobFunctionV3Id": 9,
            "groupJobFunctionV3Name": "Engineering & Sciences",
            "groupJobFunctionV3NameVI": "Khoa Học & Kỹ Thuật"
        },
        {
            "groupJobFunctionV3Id": 13,
            "groupJobFunctionV3Name": "Logistics/Import Export/Warehouse",
            "groupJobFunctionV3NameVI": "Hậu Cần/Xuất Nhập Khẩu/Kho Bãi"
        },
        {
            "groupJobFunctionV3Id": 24,
            "groupJobFunctionV3Name": "Retail/Consumer Products",
            "groupJobFunctionV3NameVI": "Bán Lẻ/Tiêu Dùng"
        },
        {
            "groupJobFunctionV3Id": 17,
            "groupJobFunctionV3Name": "Marketing, Advertising/Communications",
            "groupJobFunctionV3NameVI": "Tiếp Thị, Quảng Cáo/Truyền Thông"
        },
        {
            "groupJobFunctionV3Id": 7,
            "groupJobFunctionV3Name": "Design",
            "groupJobFunctionV3NameVI": "Thiết Kế"
        },
        {
            "groupJobFunctionV3Id": 26,
            "groupJobFunctionV3Name": "Textiles, Garments/Footwear",
            "groupJobFunctionV3NameVI": "Dệt May/Da Giày"
        },
        {
            "groupJobFunctionV3Id": 25,
            "groupJobFunctionV3Name": "Government/NGO",
            "groupJobFunctionV3NameVI": "Chính Phủ/Phi Lợi Nhuận"
        },
        {
            "groupJobFunctionV3Id": 15,
            "groupJobFunctionV3Name": "Hospitality/Tourism",
            "groupJobFunctionV3NameVI": "Nhà Hàng - Khách Sạn/Du Lịch"
        },
        {
            "groupJobFunctionV3Id": 30,
            "groupJobFunctionV3Name": "Others",
            "groupJobFunctionV3NameVI": "Khác"
        },
        {
            "groupJobFunctionV3Id": 23,
            "groupJobFunctionV3Name": "Real Estate",
            "groupJobFunctionV3NameVI": "Bất Động Sản"
        },
        {
            "groupJobFunctionV3Id": 19,
            "groupJobFunctionV3Name": "Healthcare/Medical Services",
            "groupJobFunctionV3NameVI": "Y Tế/Chăm Sóc Sức Khoẻ"
        },
        {
            "groupJobFunctionV3Id": 3,
            "groupJobFunctionV3Name": "Agriculture/Livestock/Fishery",
            "groupJobFunctionV3NameVI": "Nông/Lâm/Ngư Nghiệp"
        },
        {
            "groupJobFunctionV3Id": 14,
            "groupJobFunctionV3Name": "Insurance",
            "groupJobFunctionV3NameVI": "Bảo Hiểm"
        },
        {
            "groupJobFunctionV3Id": 18,
            "groupJobFunctionV3Name": "Art, Media & Printing/Publishing",
            "groupJobFunctionV3NameVI": "Nghệ thuật, Truyền thông/In ấn/Xuất bản"
        },
        {
            "groupJobFunctionV3Id": 8,
            "groupJobFunctionV3Name": "Transportation",
            "groupJobFunctionV3NameVI": "Vận Tải"
        },
        {
            "groupJobFunctionV3Id": 11,
            "groupJobFunctionV3Name": "Food and Beverage",
            "groupJobFunctionV3NameVI": "Dịch Vụ Ăn Uống"
        },
        {
            "groupJobFunctionV3Id": 0,
            "groupJobFunctionV3Name": "",
            "groupJobFunctionV3NameVI": ""
        }
    ]

    const body = {
        'userId': 0,
        'query': '',
        'filter': [
        ],
        'ranges': [],
        'order': [],
        'hitsPerPage': 10000,
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
            "workingLocations",
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
    const groupList = resz.map(group => group.groupJobFunctionV3Id)
    groupList.sort((a, b) => a - b )
    groupList.forEach(group => {
        body.filter = [
            {
                "field": "jobFunction",
                "value": `[{\"parentId\":${group},\"childrenIds\":[-1]}]`
            },
        ]
        fetch(api,{
            method: 'POST',
            headers: header,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res => {
            const data = res.data
            jobFunctionsV3 = []
        data.forEach(job => {
            getjobFunctionsV3(job)
        })
        jobFunctionsV3.sort((a, b) => a-b)
        const x = resz.findIndex(job => job.groupJobFunctionV3Id === group)
        jobFunctionGroups.push({
            groupJobFunctionV3Id: resz[x].groupJobFunctionV3Id,
            groupJobFunctionV3Name: resz[x].groupJobFunctionV3Name,
            groupJobFunctionV3NameVI: resz[x].groupJobFunctionV3NameVI,
            children: jobFunctionsV3
        })
        write()
        }
        )
        
    }
    )
    
}

const write = ()=>{
    console.log('group',jobFunctionGroups);
    const path = `./groupjob.json`
    fs.writeFileSync(path, JSON.stringify(jobFunctionGroups))
}

const getjobFunctionsV3 = (job) => {
    if (!jobFunctionsV3.filter(item => item === job.jobFunctionsV3.jobFunctionV3Id)[0]) {
        jobFunctionsV3.push(job.jobFunctionsV3.jobFunctionV3Id)
    }
}
createJobFunctionsGroup()