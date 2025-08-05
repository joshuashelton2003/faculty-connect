// ==========================================
// FacultyConnect - Sample Institutes Data
// 20+ Realistic Institute Profiles
// ==========================================

import { Institute } from '@/types';

export const sampleInstitutes: Institute[] = [
  {
    id: 'inst_001',
    name: 'Anna University',
    type: 'university',
    description: 'Anna University is a premier technical university in Tamil Nadu, established in 1978. It offers undergraduate, postgraduate and doctoral programs in Engineering, Technology, Architecture, and Applied Sciences. The university is known for its academic excellence, research contributions, and industry partnerships.',
    location: {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Chennai',
      city: 'Chennai',
      pincode: '600025',
      address: 'Sardar Patel Road, Guindy, Chennai - 600025'
    },
    established: 1978,
    affiliation: 'State University',
    accreditation: ['NAAC A++', 'NBA', 'AICTE', 'UGC'],
    website: 'https://www.annauniv.edu',
    logo: '/institutes/anna-university-logo.png',
    images: [
      '/institutes/anna-university-1.jpg',
      '/institutes/anna-university-2.jpg',
      '/institutes/anna-university-3.jpg'
    ],
    contact: {
      email: 'registrar@annauniv.edu',
      phone: '+91 44 2235 0449',
      fax: '+91 44 2235 2642'
    },
    departments: [
      'Computer Science Engineering',
      'Electronics and Communication Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Electrical and Electronics Engineering',
      'Chemical Engineering',
      'Biotechnology',
      'Information Technology',
      'Aerospace Engineering',
      'Automobile Engineering'
    ],
    courses: [
      'B.E./B.Tech',
      'M.E./M.Tech',
      'MBA',
      'MCA',
      'Ph.D',
      'M.S. (By Research)'
    ],
    facilities: [
      'Central Library',
      'Research Labs',
      'Hostels',
      'Sports Complex',
      'Auditorium',
      'Medical Center',
      'Cafeteria',
      'Computer Center',
      'Incubation Center',
      'Placement Cell'
    ],
    rankings: [
      {
        organization: 'NIRF',
        rank: 15,
        year: 2023,
        category: 'Engineering',
        description: 'National Institutional Ranking Framework'
      },
      {
        organization: 'India Today',
        rank: 12,
        year: 2023,
        category: 'Engineering Colleges',
        description: 'Best Engineering Colleges in India'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/annauniversity',
      twitter: 'https://twitter.com/annauniv',
      linkedin: 'https://linkedin.com/school/anna-university',
      instagram: 'https://instagram.com/annauniversity'
    },
    isVerified: true,
    isFeatured: true,
    employerId: 'emp_001',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'inst_002',
    name: 'PSG College of Technology',
    type: 'engineering-college',
    description: 'PSG College of Technology is one of the foremost institutions of higher technical education in South India. Established in 1951, the college has been at the forefront of technical education and has produced thousands of engineers who have made significant contributions to society.',
    location: {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Coimbatore',
      city: 'Coimbatore',
      pincode: '641004',
      address: 'Peelamedu, Coimbatore - 641004'
    },
    established: 1951,
    affiliation: 'Anna University',
    accreditation: ['NAAC A+', 'NBA', 'AICTE', 'NIRF'],
    website: 'https://www.psgtech.edu',
    logo: '/institutes/psg-logo.png',
    images: [
      '/institutes/psg-1.jpg',
      '/institutes/psg-2.jpg',
      '/institutes/psg-3.jpg'
    ],
    contact: {
      email: 'principal@psgtech.edu',
      phone: '+91 422 2572177',
      fax: '+91 422 2573833'
    },
    departments: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Electrical and Electronics Engineering',
      'Production Engineering',
      'Textile Technology',
      'Applied Mathematics and Computational Sciences'
    ],
    courses: [
      'B.E.',
      'M.E.',
      'M.Tech',
      'Ph.D'
    ],
    facilities: [
      'Central Library',
      'Hostels',
      'Sports Facilities',
      'Medical Center',
      'Cafeteria',
      'Research Centers',
      'Innovation Lab',
      'Placement Cell'
    ],
    rankings: [
      {
        organization: 'NIRF',
        rank: 45,
        year: 2023,
        category: 'Engineering'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/psgtech',
      linkedin: 'https://linkedin.com/school/psg-college-of-technology'
    },
    isVerified: true,
    isFeatured: true,
    employerId: 'emp_002',
    createdAt: '2023-02-01T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 'inst_003',
    name: 'Indian Institute of Science, Bangalore',
    type: 'research-institute',
    description: 'The Indian Institute of Science (IISc) is a premier institute for advanced scientific and technological research and education in India. Established in 1909, IISc has been ranked as the top university in India and offers undergraduate, postgraduate and doctoral programs.',
    location: {
      country: 'India',
      state: 'Karnataka',
      district: 'Bangalore Urban',
      city: 'Bangalore',
      pincode: '560012',
      address: 'CV Raman Avenue, Bangalore - 560012'
    },
    established: 1909,
    affiliation: 'Deemed University',
    accreditation: ['NAAC A++', 'UGC', 'NIRF Rank 1'],
    website: 'https://www.iisc.ac.in',
    logo: '/institutes/iisc-logo.png',
    images: [
      '/institutes/iisc-1.jpg',
      '/institutes/iisc-2.jpg'
    ],
    contact: {
      email: 'registrar@iisc.ac.in',
      phone: '+91 80 2293 2001'
    },
    departments: [
      'Computer Science and Automation',
      'Electrical Communication Engineering',
      'Electronic Systems Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Aerospace Engineering',
      'Materials Engineering',
      'Physics',
      'Chemistry',
      'Mathematics',
      'Biological Sciences'
    ],
    courses: [
      'B.S.',
      'M.Tech',
      'M.S.',
      'Ph.D'
    ],
    facilities: [
      'J.R.D. Tata Memorial Library',
      'Supercomputing Facility',
      'Central Research Facilities',
      'Hostels',
      'Sports Complex',
      'Medical Center',
      'Guest House'
    ],
    rankings: [
      {
        organization: 'NIRF',
        rank: 1,
        year: 2023,
        category: 'University'
      },
      {
        organization: 'QS World University Rankings',
        rank: 155,
        year: 2023,
        category: 'Global'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/iisc.ac.in',
      twitter: 'https://twitter.com/iiscbangalore',
      linkedin: 'https://linkedin.com/school/indian-institute-of-science'
    },
    isVerified: true,
    isFeatured: true,
    employerId: 'emp_003',
    createdAt: '2023-01-01T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 'inst_004',
    name: 'Government Polytechnic College, Thiruvananthapuram',
    type: 'polytechnic',
    description: 'One of the oldest polytechnic institutions in Kerala, offering diploma courses in various engineering disciplines. Known for quality technical education and excellent placement record.',
    location: {
      country: 'India',
      state: 'Kerala',
      district: 'Thiruvananthapuram',
      city: 'Thiruvananthapuram',
      pincode: '695013',
      address: 'Pattom, Thiruvananthapuram - 695013'
    },
    established: 1946,
    affiliation: 'State Technical Education Board',
    accreditation: ['AICTE', 'NBA'],
    website: 'https://www.gptvm.ac.in',
    contact: {
      email: 'principal@gptvm.ac.in',
      phone: '+91 471 2447178'
    },
    departments: [
      'Civil Engineering',
      'Mechanical Engineering',
      'Electrical and Electronics Engineering',
      'Electronics and Communication Engineering',
      'Computer Engineering',
      'Automobile Engineering'
    ],
    courses: [
      'Diploma in Engineering'
    ],
    facilities: [
      'Library',
      'Workshops',
      'Computer Lab',
      'Sports Ground',
      'Canteen'
    ],
    rankings: [],
    socialMedia: {},
    isVerified: true,
    isFeatured: false,
    employerId: 'emp_004',
    createdAt: '2023-03-01T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z'
  },
  {
    id: 'inst_005',
    name: 'Indian Institute of Technology Bombay',
    type: 'university',
    description: 'IIT Bombay is one of the premier engineering and technology institutes in India. Established in 1958, it has consistently been ranked among the top engineering institutes globally and is known for its academic excellence and research contributions.',
    location: {
      country: 'India',
      state: 'Maharashtra',
      district: 'Mumbai City',
      city: 'Mumbai',
      pincode: '400076',
      address: 'Powai, Mumbai - 400076'
    },
    established: 1958,
    affiliation: 'Institute of National Importance',
    accreditation: ['NAAC A++', 'NBA', 'NIRF Rank 3'],
    website: 'https://www.iitb.ac.in',
    logo: '/institutes/iitb-logo.png',
    images: [
      '/institutes/iitb-1.jpg',
      '/institutes/iitb-2.jpg'
    ],
    contact: {
      email: 'registrar@iitb.ac.in',
      phone: '+91 22 2572 2545'
    },
    departments: [
      'Computer Science and Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Aerospace Engineering',
      'Metallurgical Engineering and Materials Science',
      'Physics',
      'Chemistry',
      'Mathematics',
      'Management Studies'
    ],
    courses: [
      'B.Tech',
      'M.Tech',
      'Ph.D',
      'MBA',
      'M.Sc.',
      'Dual Degree'
    ],
    facilities: [
      'Central Library',
      'Hostels',
      'Sports Complex',
      'Medical Center',
      'Shopping Complex',
      'Guest House',
      'Conference Hall',
      'Research Parks'
    ],
    rankings: [
      {
        organization: 'NIRF',
        rank: 3,
        year: 2023,
        category: 'Engineering'
      },
      {
        organization: 'QS World University Rankings',
        rank: 177,
        year: 2023,
        category: 'Global'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/IITBombay',
      twitter: 'https://twitter.com/iitbombay',
      linkedin: 'https://linkedin.com/school/iit-bombay'
    },
    isVerified: true,
    isFeatured: true,
    employerId: 'emp_005',
    createdAt: '2023-01-08T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z'
  },
  {
    id: 'inst_006',
    name: 'Delhi Public School, Ahmedabad',
    type: 'school',
    description: 'Part of the prestigious Delhi Public School Society, DPS Ahmedabad is committed to providing quality education from kindergarten to senior secondary. The school follows CBSE curriculum and focuses on holistic development of students.',
    location: {
      country: 'India',
      state: 'Gujarat',
      district: 'Ahmedabad',
      city: 'Ahmedabad',
      pincode: '380009',
      address: 'Navrangpura, Ahmedabad - 380009'
    },
    established: 1998,
    affiliation: 'CBSE',
    accreditation: ['ISO 9001:2015', 'CBSE Affiliation'],
    website: 'https://www.dpsahmedabad.com',
    contact: {
      email: 'info@dpsahmedabad.com',
      phone: '+91 79 2630 9000'
    },
    departments: [
      'Primary Section',
      'Middle Section',
      'Secondary Section',
      'Senior Secondary Section'
    ],
    courses: [
      'Class I to XII (CBSE)'
    ],
    facilities: [
      'Library',
      'Computer Labs',
      'Science Labs',
      'Sports Complex',
      'Auditorium',
      'Medical Room',
      'Cafeteria',
      'Transportation'
    ],
    rankings: [],
    socialMedia: {
      facebook: 'https://facebook.com/dpsahmedabad'
    },
    isVerified: true,
    isFeatured: false,
    employerId: 'emp_006',
    createdAt: '2023-04-01T10:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z'
  },
  {
    id: 'inst_007',
    name: 'Malaviya National Institute of Technology, Jaipur',
    type: 'university',
    description: 'MNIT Jaipur is an Institute of National Importance and one of the leading technical institutes in India. Established in 1963, it offers undergraduate, postgraduate and doctoral programs in engineering, science, and management.',
    location: {
      country: 'India',
      state: 'Rajasthan',
      district: 'Jaipur',
      city: 'Jaipur',
      pincode: '302017',
      address: 'Malaviya Nagar, Jaipur - 302017'
    },
    established: 1963,
    affiliation: 'Institute of National Importance',
    accreditation: ['NAAC A+', 'NBA', 'AICTE'],
    website: 'https://www.mnit.ac.in',
    contact: {
      email: 'registrar@mnit.ac.in',
      phone: '+91 141 252 9039'
    },
    departments: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Electrical Engineering',
      'Chemical Engineering',
      'Metallurgical and Materials Engineering',
      'Architecture and Planning',
      'Physics',
      'Chemistry',
      'Mathematics',
      'Management Studies'
    ],
    courses: [
      'B.Tech',
      'M.Tech',
      'Ph.D',
      'MBA',
      'M.Sc.',
      'M.Arch'
    ],
    facilities: [
      'Central Library',
      'Computer Center',
      'Hostels',
      'Sports Complex',
      'Medical Center',
      'Guest House',
      'Cafeteria'
    ],
    rankings: [
      {
        organization: 'NIRF',
        rank: 42,
        year: 2023,
        category: 'Engineering'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/mnitjaipur',
      linkedin: 'https://linkedin.com/school/mnit-jaipur'
    },
    isVerified: true,
    isFeatured: true,
    employerId: 'emp_007',
    createdAt: '2023-02-15T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z'
  },
  {
    id: 'inst_008',
    name: 'Jadavpur University',
    type: 'university',
    description: 'Jadavpur University is a premier state university in West Bengal, known for its excellence in engineering, arts, and sciences. Established in 1955, it has been consistently ranked among the top universities in India.',
    location: {
      country: 'India',
      state: 'West Bengal',
      district: 'Kolkata',
      city: 'Kolkata',
      pincode: '700032',
      address: '188, Raja S.C. Mallick Road, Kolkata - 700032'
    },
    established: 1955,
    affiliation: 'State University',
    accreditation: ['NAAC A+', 'UGC'],
    website: 'https://www.jaduniv.edu.in',
    contact: {
      email: 'registrar@jaduniv.edu.in',
      phone: '+91 33 2414 6161'
    },
    departments: [
      'Computer Science and Engineering',
      'Electronics and Telecommunication Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Electrical Engineering',
      'English',
      'Bengali',
      'History',
      'Philosophy',
      'Economics',
      'Physics',
      'Chemistry',
      'Mathematics'
    ],
    courses: [
      'B.E.',
      'M.E.',
      'B.A.',
      'M.A.',
      'Ph.D'
    ],
    facilities: [
      'Central Library',
      'Hostels',
      'Computer Center',
      'Sports Complex',
      'Health Center',
      'Auditorium'
    ],
    rankings: [
      {
        organization: 'NIRF',
        rank: 11,
        year: 2023,
        category: 'University'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/jadavpuruniversity'
    },
    isVerified: true,
    isFeatured: true,
    employerId: 'emp_008',
    createdAt: '2023-01-25T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z'
  },
  {
    id: 'inst_009',
    name: 'Andhra University College of Engineering',
    type: 'engineering-college',
    description: 'AUCE is one of the oldest engineering colleges in India, established in 1946. It is known for its quality education in engineering and technology and has produced many distinguished alumni.',
    location: {
      country: 'India',
      state: 'Andhra Pradesh',
      district: 'Visakhapatnam',
      city: 'Visakhapatnam',
      pincode: '530003',
      address: 'Andhra University Campus, Visakhapatnam - 530003'
    },
    established: 1946,
    affiliation: 'Andhra University',
    accreditation: ['NAAC A', 'NBA', 'AICTE'],
    website: 'https://www.andhrauniversity.edu.in',
    contact: {
      email: 'principal@auce.ac.in',
      phone: '+91 891 2844444'
    },
    departments: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Electrical and Electronics Engineering',
      'Chemical Engineering',
      'Metallurgical Engineering',
      'Marine Engineering',
      'Geo Engineering'
    ],
    courses: [
      'B.Tech',
      'M.Tech',
      'Ph.D'
    ],
    facilities: [
      'Library',
      'Laboratories',
      'Hostels',
      'Sports Facilities',
      'Computer Center'
    ],
    rankings: [],
    socialMedia: {},
    isVerified: true,
    isFeatured: false,
    employerId: 'emp_009',
    createdAt: '2023-03-10T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z'
  },
  {
    id: 'inst_010',
    name: 'International Institute of Information Technology, Hyderabad',
    type: 'university',
    description: 'IIIT Hyderabad is a premier institute focused on information technology and computer science education and research. Established in 1998, it is known for its innovative curriculum and strong industry connections.',
    location: {
      country: 'India',
      state: 'Telangana',
      district: 'Hyderabad',
      city: 'Hyderabad',
      pincode: '500032',
      address: 'Gachibowli, Hyderabad - 500032'
    },
    established: 1998,
    affiliation: 'Deemed University',
    accreditation: ['NAAC A++', 'UGC'],
    website: 'https://www.iiit.ac.in',
    contact: {
      email: 'admissions@iiit.ac.in',
      phone: '+91 40 6653 1000'
    },
    departments: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Computational Natural Sciences',
      'Language Technologies Research Center',
      'Center for Visual Information Technology'
    ],
    courses: [
      'B.Tech',
      'M.Tech',
      'MS by Research',
      'Ph.D'
    ],
    facilities: [
      'Library',
      'Research Labs',
      'Hostels',
      'Sports Complex',
      'Medical Center',
      'Cafeteria'
    ],
    rankings: [
      {
        organization: 'NIRF',
        rank: 48,
        year: 2023,
        category: 'Engineering'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/iiithyd',
      twitter: 'https://twitter.com/iiit_hyderabad'
    },
    isVerified: true,
    isFeatured: true,
    employerId: 'emp_010',
    createdAt: '2023-02-20T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  // Additional institutes to reach 20+
  {
    id: 'inst_011',
    name: 'National Institute of Technology, Tiruchirappalli',
    type: 'university',
    description: 'NIT Trichy is one of the premier engineering institutes in India and a National Institute of Technology. Known for its academic excellence and research contributions.',
    location: {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Tiruchirappalli',
      city: 'Tiruchirappalli',
      pincode: '620015',
      address: 'NIT Campus, Tiruchirappalli - 620015'
    },
    established: 1964,
    affiliation: 'Institute of National Importance',
    accreditation: ['NAAC A++', 'NBA'],
    website: 'https://www.nitt.edu',
    contact: {
      email: 'registrar@nitt.edu',
      phone: '+91 431 250 3000'
    },
    departments: [
      'Computer Science and Engineering',
      'Electronics and Communication Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Electrical and Electronics Engineering',
      'Chemical Engineering',
      'Instrumentation and Control Engineering',
      'Production Engineering'
    ],
    courses: ['B.Tech', 'M.Tech', 'Ph.D', 'MBA'],
    facilities: [
      'Central Library',
      'Computer Center',
      'Hostels',
      'Sports Complex',
      'Medical Center'
    ],
    rankings: [
      {
        organization: 'NIRF',
        rank: 9,
        year: 2023,
        category: 'Engineering'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/nittrichy'
    },
    isVerified: true,
    isFeatured: true,
    employerId: 'emp_011',
    createdAt: '2023-01-30T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z'
  },
  {
    id: 'inst_012',
    name: 'Indian Institute of Technology, Kanpur',
    type: 'university',
    description: 'IIT Kanpur is one of the premier engineering institutes in India, established in 1959. Known for its academic rigor and research excellence.',
    location: {
      country: 'India',
      state: 'Uttar Pradesh',
      district: 'Kanpur',
      city: 'Kanpur',
      pincode: '208016',
      address: 'IIT Kanpur, Kanpur - 208016'
    },
    established: 1959,
    affiliation: 'Institute of National Importance',
    accreditation: ['NAAC A++', 'NBA'],
    website: 'https://www.iitk.ac.in',
    contact: {
      email: 'registrar@iitk.ac.in',
      phone: '+91 512 259 0000'
    },
    departments: [
      'Computer Science and Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Aerospace Engineering',
      'Materials Science and Engineering'
    ],
    courses: ['B.Tech', 'M.Tech', 'Ph.D', 'MBA'],
    facilities: [
      'Library',
      'Computer Center',
      'Hostels',
      'Sports Complex',
      'Medical Center'
    ],
    rankings: [
      {
        organization: 'NIRF',
        rank: 5,
        year: 2023,
        category: 'Engineering'
      }
    ],
    socialMedia: {},
    isVerified: true,
    isFeatured: true,
    employerId: 'emp_012',
    createdAt: '2023-01-12T10:00:00Z',
    updatedAt: '2024-01-28T10:00:00Z'
  }
];

// Helper function to generate more institutes
export const generateAdditionalInstitutes = (): Institute[] => {
  const instituteTypes = ['engineering-college', 'arts-science-college', 'polytechnic', 'school', 'university'];
  const states = ['Tamil Nadu', 'Karnataka', 'Kerala', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'West Bengal'];
  const cities = ['Chennai', 'Bangalore', 'Mumbai', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kolkata'];
  
  const additionalInstitutes: Institute[] = [];
  
  for (let i = 13; i <= 25; i++) {
    const type = instituteTypes[Math.floor(Math.random() * instituteTypes.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    
    additionalInstitutes.push({
      id: `inst_${i.toString().padStart(3, '0')}`,
      name: `Sample ${type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} ${i}`,
      type: type as any,
      description: `A quality educational institution offering excellent academic programs and facilities.`,
      location: {
        country: 'India',
        state: state,
        district: city,
        city: city,
        pincode: `${Math.floor(Math.random() * 900000) + 100000}`,
        address: `${city} Campus`
      },
      established: 1950 + Math.floor(Math.random() * 70),
      affiliation: 'State University',
      accreditation: ['NAAC', 'AICTE'],
      website: `https://www.institute${i}.edu`,
      contact: {
        email: `info@institute${i}.edu`,
        phone: `+91 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000000) + 1000000}`
      },
      departments: ['General Studies', 'Applied Sciences'],
      courses: ['Undergraduate', 'Postgraduate'],
      facilities: ['Library', 'Computer Lab', 'Sports Ground'],
      rankings: [],
      socialMedia: {},
      isVerified: Math.random() > 0.3,
      isFeatured: Math.random() > 0.8,
      employerId: `emp_${i.toString().padStart(3, '0')}`,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return additionalInstitutes;
};

// Combine main institutes with generated ones
export const allSampleInstitutes = [...sampleInstitutes, ...generateAdditionalInstitutes()];
