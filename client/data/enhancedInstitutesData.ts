// ==========================================
// FacultyConnect - Enhanced Institutes Data
// Comprehensive data for 200+ Educational Institutes
// Tamil Nadu & South India Focus with National Coverage
// ==========================================

import { Institute } from '@/types';

// Helper function to generate random dates
const getRandomDate = (startYear: number = 1850, endYear: number = 2020): number => {
  return startYear + Math.floor(Math.random() * (endYear - startYear));
};

// Comprehensive location data
const locations = [
  // Tamil Nadu
  { city: 'Chennai', district: 'Chennai', state: 'Tamil Nadu', pincode: '600001' },
  { city: 'Coimbatore', district: 'Coimbatore', state: 'Tamil Nadu', pincode: '641001' },
  { city: 'Madurai', district: 'Madurai', state: 'Tamil Nadu', pincode: '625001' },
  { city: 'Tiruchirappalli', district: 'Tiruchirappalli', state: 'Tamil Nadu', pincode: '620001' },
  { city: 'Salem', district: 'Salem', state: 'Tamil Nadu', pincode: '636001' },
  { city: 'Tirunelveli', district: 'Tirunelveli', state: 'Tamil Nadu', pincode: '627001' },
  { city: 'Erode', district: 'Erode', state: 'Tamil Nadu', pincode: '638001' },
  { city: 'Vellore', district: 'Vellore', state: 'Tamil Nadu', pincode: '632001' },
  { city: 'Thanjavur', district: 'Thanjavur', state: 'Tamil Nadu', pincode: '613001' },
  { city: 'Kancheepuram', district: 'Kancheepuram', state: 'Tamil Nadu', pincode: '631501' },
  { city: 'Dindigul', district: 'Dindigul', state: 'Tamil Nadu', pincode: '624001' },
  { city: 'Cuddalore', district: 'Cuddalore', state: 'Tamil Nadu', pincode: '607001' },
  { city: 'Tirupur', district: 'Tirupur', state: 'Tamil Nadu', pincode: '641601' },
  { city: 'Nagercoil', district: 'Kanyakumari', state: 'Tamil Nadu', pincode: '629001' },
  { city: 'Karur', district: 'Karur', state: 'Tamil Nadu', pincode: '639001' },
  { city: 'Tuticorin', district: 'Thoothukudi', state: 'Tamil Nadu', pincode: '628001' },
  { city: 'Tiruvannamalai', district: 'Tiruvannamalai', state: 'Tamil Nadu', pincode: '606601' },
  { city: 'Hosur', district: 'Krishnagiri', state: 'Tamil Nadu', pincode: '635109' },
  { city: 'Ambur', district: 'Tirupattur', state: 'Tamil Nadu', pincode: '635802' },
  { city: 'Kumbakonam', district: 'Thanjavur', state: 'Tamil Nadu', pincode: '612001' },
  
  // Karnataka
  { city: 'Bangalore', district: 'Bangalore Urban', state: 'Karnataka', pincode: '560001' },
  { city: 'Mysore', district: 'Mysore', state: 'Karnataka', pincode: '570001' },
  { city: 'Mangalore', district: 'Dakshina Kannada', state: 'Karnataka', pincode: '575001' },
  { city: 'Hubli', district: 'Dharwad', state: 'Karnataka', pincode: '580001' },
  { city: 'Belgaum', district: 'Belgaum', state: 'Karnataka', pincode: '590001' },
  { city: 'Gulbarga', district: 'Gulbarga', state: 'Karnataka', pincode: '585101' },
  { city: 'Davangere', district: 'Davangere', state: 'Karnataka', pincode: '577001' },
  { city: 'Bellary', district: 'Bellary', state: 'Karnataka', pincode: '583101' },
  { city: 'Bijapur', district: 'Bijapur', state: 'Karnataka', pincode: '586101' },
  { city: 'Shimoga', district: 'Shimoga', state: 'Karnataka', pincode: '577201' },
  
  // Kerala
  { city: 'Kochi', district: 'Ernakulam', state: 'Kerala', pincode: '682001' },
  { city: 'Thiruvananthapuram', district: 'Thiruvananthapuram', state: 'Kerala', pincode: '695001' },
  { city: 'Calicut', district: 'Kozhikode', state: 'Kerala', pincode: '673001' },
  { city: 'Thrissur', district: 'Thrissur', state: 'Kerala', pincode: '680001' },
  { city: 'Palakkad', district: 'Palakkad', state: 'Kerala', pincode: '678001' },
  { city: 'Kollam', district: 'Kollam', state: 'Kerala', pincode: '691001' },
  { city: 'Alappuzha', district: 'Alappuzha', state: 'Kerala', pincode: '688001' },
  { city: 'Kottayam', district: 'Kottayam', state: 'Kerala', pincode: '686001' },
  { city: 'Kannur', district: 'Kannur', state: 'Kerala', pincode: '670001' },
  { city: 'Malappuram', district: 'Malappuram', state: 'Kerala', pincode: '676505' },
  
  // Andhra Pradesh & Telangana
  { city: 'Hyderabad', district: 'Hyderabad', state: 'Telangana', pincode: '500001' },
  { city: 'Visakhapatnam', district: 'Visakhapatnam', state: 'Andhra Pradesh', pincode: '530001' },
  { city: 'Vijayawada', district: 'Krishna', state: 'Andhra Pradesh', pincode: '520001' },
  { city: 'Warangal', district: 'Warangal', state: 'Telangana', pincode: '506001' },
  { city: 'Guntur', district: 'Guntur', state: 'Andhra Pradesh', pincode: '522001' },
  { city: 'Nellore', district: 'Nellore', state: 'Andhra Pradesh', pincode: '524001' },
  { city: 'Tirupati', district: 'Chittoor', state: 'Andhra Pradesh', pincode: '517501' },
  { city: 'Nizamabad', district: 'Nizamabad', state: 'Telangana', pincode: '503001' },
  { city: 'Karimnagar', district: 'Karimnagar', state: 'Telangana', pincode: '505001' },
  { city: 'Rajahmundry', district: 'East Godavari', state: 'Andhra Pradesh', pincode: '533101' },
  
  // Maharashtra
  { city: 'Mumbai', district: 'Mumbai', state: 'Maharashtra', pincode: '400001' },
  { city: 'Pune', district: 'Pune', state: 'Maharashtra', pincode: '411001' },
  { city: 'Nagpur', district: 'Nagpur', state: 'Maharashtra', pincode: '440001' },
  { city: 'Nashik', district: 'Nashik', state: 'Maharashtra', pincode: '422001' },
  { city: 'Aurangabad', district: 'Aurangabad', state: 'Maharashtra', pincode: '431001' },
  { city: 'Solapur', district: 'Solapur', state: 'Maharashtra', pincode: '413001' },
  { city: 'Kolhapur', district: 'Kolhapur', state: 'Maharashtra', pincode: '416001' },
  { city: 'Amravati', district: 'Amravati', state: 'Maharashtra', pincode: '444601' },
  
  // Gujarat
  { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat', pincode: '380001' },
  { city: 'Surat', district: 'Surat', state: 'Gujarat', pincode: '395001' },
  { city: 'Vadodara', district: 'Vadodara', state: 'Gujarat', pincode: '390001' },
  { city: 'Rajkot', district: 'Rajkot', state: 'Gujarat', pincode: '360001' },
  { city: 'Bhavnagar', district: 'Bhavnagar', state: 'Gujarat', pincode: '364001' },
  { city: 'Jamnagar', district: 'Jamnagar', state: 'Gujarat', pincode: '361001' },
  
  // Rajasthan
  { city: 'Jaipur', district: 'Jaipur', state: 'Rajasthan', pincode: '302001' },
  { city: 'Jodhpur', district: 'Jodhpur', state: 'Rajasthan', pincode: '342001' },
  { city: 'Udaipur', district: 'Udaipur', state: 'Rajasthan', pincode: '313001' },
  { city: 'Kota', district: 'Kota', state: 'Rajasthan', pincode: '324001' },
  { city: 'Ajmer', district: 'Ajmer', state: 'Rajasthan', pincode: '305001' },
  
  // West Bengal
  { city: 'Kolkata', district: 'Kolkata', state: 'West Bengal', pincode: '700001' },
  { city: 'Howrah', district: 'Howrah', state: 'West Bengal', pincode: '711101' },
  { city: 'Durgapur', district: 'Paschim Bardhaman', state: 'West Bengal', pincode: '713201' },
  { city: 'Asansol', district: 'Paschim Bardhaman', state: 'West Bengal', pincode: '713301' },
  { city: 'Siliguri', district: 'Darjeeling', state: 'West Bengal', pincode: '734001' },
  
  // Other States
  { city: 'Bhubaneswar', district: 'Khordha', state: 'Odisha', pincode: '751001' },
  { city: 'Cuttack', district: 'Cuttack', state: 'Odisha', pincode: '753001' },
  { city: 'Bhopal', district: 'Bhopal', state: 'Madhya Pradesh', pincode: '462001' },
  { city: 'Indore', district: 'Indore', state: 'Madhya Pradesh', pincode: '452001' },
  { city: 'Ludhiana', district: 'Ludhiana', state: 'Punjab', pincode: '141001' },
  { city: 'Amritsar', district: 'Amritsar', state: 'Punjab', pincode: '143001' },
  { city: 'Gurgaon', district: 'Gurgaon', state: 'Haryana', pincode: '122001' },
  { city: 'Faridabad', district: 'Faridabad', state: 'Haryana', pincode: '121001' },
  { city: 'Puducherry', district: 'Puducherry', state: 'Puducherry', pincode: '605001' }
];

// Comprehensive institutes data (first 20 premium institutes)
export const enhancedInstitutesData: Institute[] = [
  // Premier IITs and NITs
  {
    id: 'inst-001',
    name: 'Indian Institute of Technology Madras',
    type: 'university',
    description: 'IIT Madras is a premier technical university and a leading center for engineering education and research in India. Established in 1959, it has consistently been ranked among the top engineering institutions globally. The institute offers undergraduate, postgraduate, and doctoral programs in various fields of engineering, science, and technology.',
    location: {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Chennai',
      city: 'Chennai',
      pincode: '600036',
      address: 'Sardar Patel Road, Adyar'
    },
    established: 1959,
    affiliation: 'Autonomous',
    accreditation: ['NAAC A++', 'NBA', 'ABET'],
    website: 'https://www.iitm.ac.in',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop',
    images: ['https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop'],
    contact: {
      email: 'info@iitm.ac.in',
      phone: '+91-44-2257-4801',
      fax: '+91-44-2257-0509'
    },
    departments: [
      'Computer Science and Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Aerospace Engineering',
      'Materials Science',
      'Ocean Engineering',
      'Mathematics',
      'Physics',
      'Chemistry',
      'Management Studies',
      'Humanities and Social Sciences',
      'Biotechnology',
      'Metallurgical and Materials Engineering'
    ],
    courses: ['B.Tech', 'M.Tech', 'M.S.', 'MBA', 'Ph.D', 'Dual Degree'],
    facilities: [
      'Central Library',
      'Research Labs',
      'Hostels',
      'Sports Complex',
      'Medical Center',
      'Internet Connectivity',
      'Auditorium',
      'Conference Halls',
      'Cafeterias',
      'Guest House',
      'Swimming Pool',
      'Gymnasium',
      'ATM',
      'Post Office',
      'Computer Centers'
    ],
    rankings: [
      { organization: 'NIRF', rank: 1, year: 2024, category: 'Engineering' },
      { organization: 'QS World Rankings', rank: 250, year: 2024, category: 'Engineering' }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/IITMadras',
      twitter: 'https://twitter.com/iitmadras',
      linkedin: 'https://linkedin.com/school/iit-madras',
      instagram: 'https://instagram.com/iitmadras'
    },
    isVerified: true,
    isFeatured: true,
    employerId: 'emp-001',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2025-01-15T10:30:00Z'
  },
  
  {
    id: 'inst-002',
    name: 'National Institute of Technology Tiruchirappalli',
    type: 'university',
    description: 'NIT Trichy is one of the premier technical institutions in India, known for excellence in engineering education and research. Established in 1964, it continues to be a leader in technological innovation and has produced numerous successful engineers and entrepreneurs.',
    location: {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Tiruchirappalli',
      city: 'Tiruchirappalli',
      pincode: '620015',
      address: 'National Highway 67, Tanjore Main Road'
    },
    established: 1964,
    affiliation: 'NIT System',
    accreditation: ['NAAC A++', 'NBA', 'ISO 9001:2015'],
    website: 'https://www.nitt.edu',
    logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=200&fit=crop',
    images: ['https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop'],
    contact: {
      email: 'info@nitt.edu',
      phone: '+91-431-250-3000',
      fax: '+91-431-250-0133'
    },
    departments: [
      'Computer Science and Engineering',
      'Information Technology',
      'Electronics and Communication Engineering',
      'Electrical and Electronics Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Instrumentation and Control Engineering',
      'Production Engineering',
      'Mathematics',
      'Physics',
      'Chemistry',
      'Management Studies',
      'Architecture'
    ],
    courses: ['B.Tech', 'M.Tech', 'MBA', 'MCA', 'Ph.D', 'B.Arch'],
    facilities: [
      'Central Library',
      'Computer Centers',
      'Laboratories',
      'Hostels',
      'Sports Facilities',
      'Medical Facility',
      'Bank',
      'Post Office',
      'Cafeterias',
      'Guest House',
      'Swimming Pool',
      'Gymnasium',
      'Auditorium',
      'Convention Center',
      'Shopping Complex'
    ],
    rankings: [
      { organization: 'NIRF', rank: 9, year: 2024, category: 'Engineering' },
      { organization: 'India Today', rank: 12, year: 2024, category: 'Engineering' }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/NITTrichy',
      linkedin: 'https://linkedin.com/school/nit-trichy'
    },
    isVerified: true,
    isFeatured: true,
    employerId: 'emp-002',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2025-01-15T10:30:00Z'
  },

  {
    id: 'inst-003',
    name: 'Anna University',
    type: 'university',
    description: 'Anna University is a state university located in Chennai, Tamil Nadu. It is one of the largest technical universities in India, offering a wide range of undergraduate and postgraduate programs in engineering and technology. The university has numerous affiliated colleges across Tamil Nadu.',
    location: {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Chennai',
      city: 'Chennai',
      pincode: '600025',
      address: 'Sardar Patel Road, Guindy'
    },
    established: 1978,
    affiliation: 'State University',
    accreditation: ['NAAC A+', 'NBA', 'UGC'],
    website: 'https://www.annauniv.edu',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop',
    images: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop'],
    contact: {
      email: 'info@annauniv.edu',
      phone: '+91-44-2235-8626',
      fax: '+91-44-2235-0397'
    },
    departments: [
      'Computer Science and Engineering',
      'Information Technology',
      'Electronics and Communication Engineering',
      'Electrical and Electronics Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Biotechnology',
      'Aerospace Engineering',
      'Automobile Engineering',
      'Mathematics',
      'Physics',
      'Chemistry',
      'Production Technology',
      'Printing Technology'
    ],
    courses: ['B.E.', 'B.Tech', 'M.E.', 'M.Tech', 'MBA', 'MCA', 'Ph.D'],
    facilities: [
      'Central Library',
      'Research Centers',
      'Computer Centers',
      'Laboratories',
      'Auditorium',
      'Sports Complex',
      'Cafeteria',
      'Guest House',
      'Medical Center',
      'Bank',
      'Post Office',
      'Hostels',
      'Transportation',
      'Placement Cell',
      'Innovation Center'
    ],
    rankings: [
      { organization: 'NIRF', rank: 15, year: 2024, category: 'Engineering' },
      { organization: 'NIRF', rank: 18, year: 2024, category: 'University' }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/AnnaUniversity',
      twitter: 'https://twitter.com/annauniv',
      linkedin: 'https://linkedin.com/school/anna-university'
    },
    isVerified: true,
    isFeatured: true,
    employerId: 'emp-003',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2025-01-15T10:30:00Z'
  },

  {
    id: 'inst-004',
    name: 'PSG College of Technology',
    type: 'engineering-college',
    description: 'PSG College of Technology is one of the premier engineering institutions in South India. Established in 1951, it is known for its academic excellence, industry partnerships, and high placement rates. The college is affiliated to Anna University and offers various undergraduate and postgraduate programs.',
    location: {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Coimbatore',
      city: 'Coimbatore',
      pincode: '641004',
      address: 'Peelamedu'
    },
    established: 1951,
    affiliation: 'Anna University',
    accreditation: ['NAAC A++', 'NBA', 'ISO 9001:2015'],
    website: 'https://www.psgtech.edu',
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'],
    contact: {
      email: 'info@psgtech.ac.in',
      phone: '+91-422-257-2177',
      fax: '+91-422-257-2053'
    },
    departments: [
      'Computer Science and Engineering',
      'Information Technology',
      'Electronics and Communication Engineering',
      'Electrical and Electronics Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Textile Technology',
      'Applied Mathematics and Computational Sciences',
      'Applied Science and Technology',
      'Biomedical Engineering',
      'Fashion Technology'
    ],
    courses: ['B.E.', 'M.E.', 'M.Tech', 'Ph.D'],
    facilities: [
      'Central Library',
      'Computer Centers',
      'Laboratories',
      'Hostels',
      'Sports Complex',
      'Medical Center',
      'Cafeterias',
      'Auditorium',
      'Placement Cell',
      'Research Centers',
      'Innovation Lab',
      'Industry Interface',
      'Transportation',
      'Banking',
      'Shopping Complex'
    ],
    rankings: [
      { organization: 'NIRF', rank: 35, year: 2024, category: 'Engineering' },
      { organization: 'India Today', rank: 28, year: 2024, category: 'Engineering' }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/PSGTech',
      linkedin: 'https://linkedin.com/school/psg-college-of-technology'
    },
    isVerified: true,
    isFeatured: true,
    employerId: 'emp-004',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2025-01-15T10:30:00Z'
  },

  {
    id: 'inst-005',
    name: 'VIT University',
    type: 'university',
    description: 'VIT is a premier technological university with a global outlook. Established in 1984, VIT has been consistently ranked among the top engineering institutions in India and has been making significant strides in research and development. The university has campuses in Vellore, Chennai, Bhopal, and Amravati.',
    location: {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Vellore',
      city: 'Vellore',
      pincode: '632014',
      address: 'Katpadi-Tiruvalam Road'
    },
    established: 1984,
    affiliation: 'Deemed University',
    accreditation: ['NAAC A++', 'NBA', 'ABET'],
    website: 'https://www.vit.ac.in',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop',
    images: ['https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop'],
    contact: {
      email: 'info@vit.ac.in',
      phone: '+91-416-220-2020',
      fax: '+91-416-224-3092'
    },
    departments: [
      'Computer Science and Engineering',
      'Information Technology',
      'Electronics and Communication Engineering',
      'Electrical and Electronics Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Biotechnology',
      'Biomedical Engineering',
      'Automobile Engineering',
      'Aerospace Engineering',
      'Fashion Technology',
      'School of Business',
      'School of Law',
      'Applied Sciences',
      'Architecture'
    ],
    courses: ['B.Tech', 'M.Tech', 'MBA', 'M.Sc', 'Ph.D', 'Integrated M.Tech', 'B.Arch', 'BBA LLB'],
    facilities: [
      'Central Library',
      'Research Centers',
      'Computer Labs',
      'Hostels',
      'Sports Complex',
      'Medical Center',
      'Banks',
      'Shopping Complex',
      'Cafeterias',
      'Auditoriums',
      'Conference Halls',
      'Swimming Pool',
      'Gymnasium',
      'ATM',
      'Post Office',
      'Transportation',
      'International Relations Office'
    ],
    rankings: [
      { organization: 'NIRF', rank: 16, year: 2024, category: 'Engineering' },
      { organization: 'QS World Rankings', rank: 801, year: 2024, category: 'Overall' }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/VITUniversity',
      twitter: 'https://twitter.com/vit_university',
      linkedin: 'https://linkedin.com/school/vit-university',
      instagram: 'https://instagram.com/vit_university'
    },
    isVerified: true,
    isFeatured: true,
    employerId: 'emp-005',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2025-01-15T10:30:00Z'
  },

  // Continue with more premium institutes...
  {
    id: 'inst-006',
    name: 'SRM Institute of Science and Technology',
    type: 'university',
    description: 'SRM Institute of Science and Technology is a leading private university known for its excellence in engineering, medicine, management, and research. It has a strong international presence and industry connections, offering diverse programs across multiple disciplines.',
    location: {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Kancheepuram',
      city: 'Kancheepuram',
      pincode: '603203',
      address: 'SRM Nagar, Kattankulathur'
    },
    established: 1985,
    affiliation: 'Deemed University',
    accreditation: ['NAAC A++', 'NBA', 'UGC'],
    website: 'https://www.srmist.edu.in',
    logo: 'https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=200&h=200&fit=crop',
    images: ['https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=800&h=600&fit=crop'],
    contact: {
      email: 'info@srmist.edu.in',
      phone: '+91-44-2741-7000',
      fax: '+91-44-2745-7422'
    },
    departments: [
      'Computer Science and Engineering',
      'Information Technology',
      'Electronics and Communication Engineering',
      'Electrical and Electronics Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Biotechnology',
      'Biomedical Engineering',
      'Aerospace Engineering',
      'Automobile Engineering',
      'School of Medicine',
      'School of Management',
      'School of Law',
      'School of Architecture',
      'School of Liberal Arts and Sciences'
    ],
    courses: ['B.Tech', 'M.Tech', 'MBA', 'MBBS', 'BDS', 'Ph.D', 'Integrated M.Tech', 'B.Arch', 'BBA LLB'],
    facilities: [
      'Central Library',
      'Research Centers',
      'Medical College and Hospital',
      'Hostels',
      'Sports Complex',
      'Cultural Center',
      'Shopping Complex',
      'Banks',
      'Cafeterias',
      'Auditoriums',
      'Conference Halls',
      'Swimming Pool',
      'Gymnasium',
      'Airport',
      'Railway Station',
      'Innovation Center'
    ],
    rankings: [
      { organization: 'NIRF', rank: 41, year: 2024, category: 'Engineering' },
      { organization: 'NIRF', rank: 46, year: 2024, category: 'University' }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/SRMIST',
      twitter: 'https://twitter.com/srmist',
      linkedin: 'https://linkedin.com/school/srm-institute-of-science-and-technology',
      instagram: 'https://instagram.com/srmist'
    },
    isVerified: true,
    isFeatured: true,
    employerId: 'emp-006',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2025-01-15T10:30:00Z'
  },

  // Arts and Science Colleges
  {
    id: 'inst-007',
    name: 'Loyola College Chennai',
    type: 'arts-science-college',
    description: 'Loyola College is an autonomous Jesuit institution of higher education. Founded in 1925, it has been at the forefront of academic excellence and holistic development of students. The college offers undergraduate and postgraduate programs in various disciplines.',
    location: {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Chennai',
      city: 'Chennai',
      pincode: '600034',
      address: 'Sterling Road, Nungambakkam'
    },
    established: 1925,
    affiliation: 'University of Madras',
    accreditation: ['NAAC A++', 'UGC'],
    website: 'https://www.loyolacollege.edu',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'],
    contact: {
      email: 'info@loyolacollege.edu',
      phone: '+91-44-2817-8200',
      fax: '+91-44-2817-5566'
    },
    departments: [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Computer Science',
      'Statistics',
      'Economics',
      'Commerce',
      'English Literature',
      'Tamil Literature',
      'History',
      'Philosophy',
      'Psychology',
      'Social Work',
      'Visual Communication',
      'Corporate Secretaryship',
      'Advanced Zoology and Biotechnology'
    ],
    courses: ['B.Sc', 'B.Com', 'B.A.', 'M.Sc', 'M.Com', 'M.A.', 'Ph.D', 'BCA', 'MCA'],
    facilities: [
      'Central Library',
      'Computer Labs',
      'Science Laboratories',
      'Auditorium',
      'Sports Complex',
      'Cafeteria',
      'Chapel',
      'Conference Halls',
      'Student Activity Center',
      'Career Guidance Cell',
      'Alumni Association',
      'Research Centers',
      'Language Lab',
      'Placement Cell',
      'Health Center'
    ],
    rankings: [
      { organization: 'NIRF', rank: 3, year: 2024, category: 'Colleges' },
      { organization: 'India Today', rank: 2, year: 2024, category: 'Arts and Science' }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/LoyolaCollegeChennai',
      linkedin: 'https://linkedin.com/school/loyola-college-chennai'
    },
    isVerified: true,
    isFeatured: true,
    employerId: 'emp-007',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2025-01-15T10:30:00Z'
  },

  {
    id: 'inst-008',
    name: 'Stella Maris College',
    type: 'arts-science-college',
    description: 'Stella Maris College is a premier women\'s college in Chennai, known for its academic excellence and emphasis on women\'s empowerment. Established in 1947, it offers a wide range of undergraduate and postgraduate programs with a focus on holistic development.',
    location: {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Chennai',
      city: 'Chennai',
      pincode: '600086',
      address: '17, Cathedral Road'
    },
    established: 1947,
    affiliation: 'University of Madras',
    accreditation: ['NAAC A++', 'UGC'],
    website: 'https://www.stellamariscollege.edu.in',
    logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=200&fit=crop',
    images: ['https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop'],
    contact: {
      email: 'info@stellamariscollege.edu.in',
      phone: '+91-44-2811-1611',
      fax: '+91-44-2811-2629'
    },
    departments: [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Computer Science',
      'Biotechnology',
      'Economics',
      'Commerce',
      'English Literature',
      'History',
      'Psychology',
      'Social Work',
      'Home Science',
      'Fine Arts',
      'International Business',
      'Plant Biology and Biotechnology',
      'Zoology'
    ],
    courses: ['B.Sc', 'B.Com', 'B.A.', 'M.Sc', 'M.Com', 'M.A.', 'Ph.D', 'BBA', 'MBA'],
    facilities: [
      'Central Library',
      'Computer Center',
      'Science Laboratories',
      'Auditorium',
      'Sports Facilities',
      'Hostel',
      'Cafeteria',
      'Chapel',
      'Art Gallery',
      'Museum',
      'Conference Hall',
      'Research Centers',
      'Career Counseling',
      'Alumni Network',
      'Student Services'
    ],
    rankings: [
      { organization: 'NIRF', rank: 5, year: 2024, category: 'Colleges' },
      { organization: 'India Today', rank: 4, year: 2024, category: 'Arts and Science' }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/StellaMarisCollege',
      linkedin: 'https://linkedin.com/school/stella-maris-college'
    },
    isVerified: true,
    isFeatured: false,
    employerId: 'emp-008',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2025-01-15T10:30:00Z'
  }
];

// Generate additional institutes programmatically to reach 200+
const generateAdditionalInstitutes = (): Institute[] => {
  const additionalInstitutes: Institute[] = [];
  
  const instituteTemplates = [
    { name: 'Government Arts College', type: 'arts-science-college', description: 'A government arts and science college providing quality education in various disciplines with focus on academic excellence and affordability.' },
    { name: 'Engineering College', type: 'engineering-college', description: 'A premier engineering institution offering undergraduate and postgraduate programs in engineering and technology with strong industry connections.' },
    { name: 'Polytechnic College', type: 'polytechnic', description: 'A technical education institution offering diploma courses in various engineering disciplines with emphasis on practical skills and industry readiness.' },
    { name: 'Medical College', type: 'university', description: 'A medical college providing undergraduate and postgraduate medical education and healthcare services with state-of-the-art facilities.' },
    { name: 'Teacher Training Institute', type: 'research-institute', description: 'An institute dedicated to training and developing quality teachers for the education sector with focus on modern pedagogy.' },
    { name: 'Technology Institute', type: 'engineering-college', description: 'An institute of technology offering advanced courses in engineering and applied sciences with research focus.' },
    { name: 'University', type: 'university', description: 'A comprehensive university offering diverse programs across multiple disciplines with research and innovation focus.' },
    { name: 'Arts and Science College', type: 'arts-science-college', description: 'A college offering undergraduate and postgraduate programs in arts, science, and commerce with holistic development approach.' },
    { name: 'Dental College', type: 'university', description: 'A dental college providing dental education and oral healthcare services with modern facilities and experienced faculty.' },
    { name: 'Management Institute', type: 'university', description: 'An institute specializing in management education with strong industry partnerships and placement support.' }
  ];

  for (let i = 9; i <= 210; i++) {
    const template = instituteTemplates[Math.floor(Math.random() * instituteTemplates.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const locationName = location.city !== location.district ? location.city : location.district;
    
    additionalInstitutes.push({
      id: `inst-${String(i).padStart(3, '0')}`,
      name: `${locationName} ${template.name}`,
      type: template.type as any,
      description: template.description,
      location: {
        country: 'India',
        state: location.state,
        district: location.district,
        city: location.city,
        pincode: location.pincode,
        address: `${Math.floor(Math.random() * 999) + 1}, ${['Main Road', 'College Road', 'University Road', 'Campus Road', 'Education District', 'Knowledge Park', 'Academic Zone'][Math.floor(Math.random() * 7)]}`
      },
      established: getRandomDate(1850, 2020),
      affiliation: ['Anna University', 'University of Madras', 'Bharathidasan University', 'State Government', 'UGC', 'AICTE', 'Autonomous', 'Deemed University'][Math.floor(Math.random() * 8)],
      accreditation: [
        Math.random() > 0.3 ? 'NAAC A+' : Math.random() > 0.5 ? 'NAAC A' : 'NAAC B+',
        ...(Math.random() > 0.4 ? ['NBA'] : []),
        ...(Math.random() > 0.7 ? ['ISO 9001:2015'] : []),
        ...(Math.random() > 0.8 ? ['UGC'] : [])
      ],
      website: `https://www.${locationName.toLowerCase().replace(/\s+/g, '')}${template.name.toLowerCase().replace(/\s+/g, '').replace('&', 'and')}.edu.in`,
      logo: `https://images.unsplash.com/photo-${[
        '1562774053-701939374585',
        '1580582932707-520aed937b7b',
        '1523050854058-8df90110c9f1',
        '1571019613454-1cb2f99b2d8b',
        '1541339907198-e08756dedf3f',
        '1568792923760-d70635a89fdc',
        '1507003211169-0a1dd7228f2d',
        '1523240795312-9a261bf042b4',
        '1564981797816-1043664bf78d',
        '1486312338219-ce68e2c6b696'
      ][Math.floor(Math.random() * 10)]}?w=200&h=200&fit=crop`,
      images: [`https://images.unsplash.com/photo-${[
        '1562774053-701939374585',
        '1580582932707-520aed937b7b',
        '1523050854058-8df90110c9f1',
        '1571019613454-1cb2f99b2d8b'
      ][Math.floor(Math.random() * 4)]}?w=800&h=600&fit=crop`],
      contact: {
        email: `info@${locationName.toLowerCase().replace(/\s+/g, '')}${template.name.toLowerCase().replace(/\s+/g, '').replace('&', 'and')}.edu.in`,
        phone: `+91-${getRandomPhoneCode(location.state)}-${Math.floor(Math.random() * 9000000) + 1000000}`,
        fax: `+91-${getRandomPhoneCode(location.state)}-${Math.floor(Math.random() * 9000000) + 1000000}`
      },
      departments: getDepartmentsByType(template.type as any),
      courses: getCoursesByType(template.type as any),
      facilities: getFacilitiesByType(template.type as any),
      rankings: Math.random() > 0.4 ? [
        {
          organization: ['NIRF', 'India Today', 'Outlook', 'The Week'][Math.floor(Math.random() * 4)],
          rank: Math.floor(Math.random() * 400) + 1,
          year: 2024,
          category: template.type === 'engineering-college' ? 'Engineering' : 
                   template.type === 'arts-science-college' ? 'Colleges' : 'Overall'
        }
      ] : [],
      socialMedia: {
        facebook: Math.random() > 0.3 ? `https://facebook.com/${locationName.replace(/\s+/g, '')}${template.name.replace(/\s+/g, '')}` : undefined,
        linkedin: Math.random() > 0.4 ? `https://linkedin.com/school/${locationName.toLowerCase().replace(/\s+/g, '-')}-${template.name.toLowerCase().replace(/\s+/g, '-')}` : undefined,
        twitter: Math.random() > 0.7 ? `https://twitter.com/${locationName.replace(/\s+/g, '')}${template.name.replace(/\s+/g, '')}` : undefined,
        instagram: Math.random() > 0.8 ? `https://instagram.com/${locationName.replace(/\s+/g, '')}${template.name.replace(/\s+/g, '')}` : undefined
      },
      isVerified: Math.random() > 0.25,
      isFeatured: Math.random() > 0.85,
      employerId: `emp-${String(i).padStart(3, '0')}`,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return additionalInstitutes;
};

const getRandomPhoneCode = (state: string): string => {
  const phoneCodes: { [key: string]: string[] } = {
    'Tamil Nadu': ['044', '0422', '0431', '0427', '0424', '04543', '04565'],
    'Karnataka': ['080', '0821', '0824', '0836', '0831'],
    'Kerala': ['0484', '0471', '0495', '0487', '0491'],
    'Andhra Pradesh': ['040', '0891', '0866', '0877', '0863'],
    'Telangana': ['040', '0870', '0878', '0879'],
    'Maharashtra': ['022', '020', '0712', '0253', '0240'],
    'Gujarat': ['079', '0261', '0265', '0281', '0278'],
    'Rajasthan': ['0141', '0291', '0294', '0744', '0145'],
    'West Bengal': ['033', '03322', '0343', '0341', '0353'],
    'Odisha': ['0674', '0671', '0663', '06764'],
    'Madhya Pradesh': ['0755', '0731', '0751', '07552'],
    'Punjab': ['0161', '0183', '01832', '01881'],
    'Haryana': ['0124', '0129', '01274', '01662'],
    'Puducherry': ['0413']
  };
  
  const codes = phoneCodes[state] || ['0123'];
  return codes[Math.floor(Math.random() * codes.length)];
};

const getDepartmentsByType = (type: string): string[] => {
  const departmentMap = {
    'engineering-college': [
      'Computer Science and Engineering',
      'Information Technology',
      'Electronics and Communication Engineering',
      'Electrical and Electronics Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Automobile Engineering',
      'Biomedical Engineering',
      'Aerospace Engineering',
      'Textile Engineering',
      'Food Technology',
      'Biotechnology',
      'Industrial Engineering',
      'Production Engineering'
    ],
    'arts-science-college': [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Computer Science',
      'Economics',
      'Commerce',
      'English Literature',
      'History',
      'Psychology',
      'Sociology',
      'Political Science',
      'Geography',
      'Philosophy',
      'Statistics',
      'Biotechnology',
      'Microbiology',
      'Zoology',
      'Botany',
      'Business Administration',
      'Visual Communication'
    ],
    'polytechnic': [
      'Computer Engineering',
      'Electronics Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Electrical Engineering',
      'Automobile Engineering',
      'Information Technology',
      'Instrumentation Engineering',
      'Chemical Engineering'
    ],
    'university': [
      'Engineering',
      'Arts and Science',
      'Medicine',
      'Management',
      'Law',
      'Education',
      'Agriculture',
      'Pharmacy',
      'Nursing',
      'Allied Health Sciences',
      'Architecture',
      'Fine Arts',
      'Social Sciences',
      'Commerce',
      'Computer Applications'
    ],
    'research-institute': [
      'Research and Development',
      'Training and Development',
      'Academic Research',
      'Applied Sciences',
      'Educational Technology',
      'Curriculum Development',
      'Teacher Training',
      'Educational Psychology'
    ]
  };

  const baseDepartments = departmentMap[type] || departmentMap['arts-science-college'];
  const numDepartments = Math.floor(Math.random() * (baseDepartments.length - 3)) + 4;
  return baseDepartments.slice(0, numDepartments);
};

const getCoursesByType = (type: string): string[] => {
  const courseMap = {
    'engineering-college': ['B.E.', 'B.Tech', 'M.E.', 'M.Tech', 'Ph.D'],
    'arts-science-college': ['B.Sc', 'B.Com', 'B.A.', 'M.Sc', 'M.Com', 'M.A.', 'Ph.D', 'BCA', 'MCA', 'BBA', 'MBA'],
    'polytechnic': ['Diploma', 'Advanced Diploma', 'Certificate Courses'],
    'university': ['UG', 'PG', 'Ph.D', 'Professional Courses', 'Diploma', 'Certificate'],
    'research-institute': ['Certificate', 'Diploma', 'Research Programs', 'Training Programs']
  };

  return courseMap[type] || courseMap['arts-science-college'];
};

const getFacilitiesByType = (type: string): string[] => {
  const baseFacilities = [
    'Library',
    'Computer Lab',
    'Laboratories',
    'Cafeteria',
    'Parking'
  ];

  const additionalFacilities = [
    'Sports Complex',
    'Hostel',
    'Auditorium',
    'Medical Center',
    'Transportation',
    'ATM',
    'Bank',
    'Post Office',
    'Conference Hall',
    'Seminar Hall',
    'Gymnasium',
    'Swimming Pool',
    'Placement Cell',
    'Career Counseling',
    'Alumni Association',
    'Research Centers',
    'Innovation Lab',
    'Entrepreneurship Cell',
    'Industry Interface',
    'International Relations',
    'Student Activity Center',
    'Cultural Center',
    'Language Lab',
    'Digital Library',
    'WiFi Campus',
    'Shopping Complex',
    'Guest House',
    'Security',
    'CCTV Surveillance',
    'Fire Safety',
    'Backup Power'
  ];

  const numAdditional = Math.floor(Math.random() * 15) + 5;
  const selectedAdditional = additionalFacilities.sort(() => 0.5 - Math.random()).slice(0, numAdditional);
  
  return [...baseFacilities, ...selectedAdditional];
};

// Institute jobs data - jobs available for each institute
export const instituteJobsData: { [instituteId: string]: number } = {};

// Generate random job counts for each institute (3-25 jobs per institute)
for (let i = 1; i <= 210; i++) {
  const instituteId = `inst-${String(i).padStart(3, '0')}`;
  instituteJobsData[instituteId] = Math.floor(Math.random() * 23) + 3; // 3-25 jobs
}

// Export complete institutes data
export const allInstitutesData: Institute[] = [
  ...enhancedInstitutesData,
  ...generateAdditionalInstitutes()
];

export default allInstitutesData;
