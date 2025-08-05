// ==========================================
// FacultyConnect - Comprehensive Sample Data
// 52+ Candidate Profiles + 200+ Jobs + Real World Data
// ==========================================

import { Job, Institute, Candidate, Application, InstituteType } from '@/types/index';

// ==========================================
// Global Location Data
// ==========================================
export const worldLocationData = {
  countries: [
    { code: 'IN', name: 'India' },
    { code: 'US', name: 'United States' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' }
  ],
  
  states: {
    'IN': [
      { code: 'TN', name: 'Tamil Nadu' },
      { code: 'KA', name: 'Karnataka' },
      { code: 'KL', name: 'Kerala' },
      { code: 'AP', name: 'Andhra Pradesh' },
      { code: 'TS', name: 'Telangana' },
      { code: 'MH', name: 'Maharashtra' },
      { code: 'GJ', name: 'Gujarat' },
      { code: 'RJ', name: 'Rajasthan' },
      { code: 'WB', name: 'West Bengal' },
      { code: 'UP', name: 'Uttar Pradesh' },
      { code: 'MP', name: 'Madhya Pradesh' },
      { code: 'OR', name: 'Odisha' },
      { code: 'PB', name: 'Punjab' },
      { code: 'HR', name: 'Haryana' },
      { code: 'JH', name: 'Jharkhand' },
      { code: 'BR', name: 'Bihar' },
      { code: 'AS', name: 'Assam' },
      { code: 'HP', name: 'Himachal Pradesh' },
      { code: 'UK', name: 'Uttarakhand' },
      { code: 'DL', name: 'Delhi' }
    ]
  },
  
  districts: {
    'TN': [
      'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
      'Tirunelveli', 'Tiruppur', 'Vellore', 'Erode', 'Thanjavur',
      'Dindigul', 'Cuddalore', 'Kanchipuram', 'Karur', 'Namakkal',
      'Sivaganga', 'Virudhunagar', 'Theni', 'Krishnagiri', 'Dharmapuri',
      'Ramanathapuram', 'Pudukottai', 'Thoothukudi', 'Nagapattinam',
      'Villupuram', 'Kanyakumari', 'Nilgiris', 'Perambalur',
      'Ariyalur', 'Thiruvarur', 'Tiruvallur', 'Tiruvannamalai'
    ],
    'KA': [
      'Bangalore Urban', 'Bangalore Rural', 'Mysore', 'Hubli-Dharwad',
      'Mangalore', 'Belgaum', 'Gulbarga', 'Davanagere', 'Bellary',
      'Bijapur', 'Shimoga', 'Tumkur', 'Raichur', 'Bidar',
      'Chitradurga', 'Hassan', 'Mandya', 'Kolar', 'Chamarajanagar'
    ],
    'KL': [
      'Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Thrissur',
      'Palakkad', 'Alappuzha', 'Kottayam', 'Malappuram', 'Kannur',
      'Kasaragod', 'Wayanad', 'Idukki', 'Pathanamthitta'
    ]
  }
};

// ==========================================
// 52+ Comprehensive Candidate Profiles
// ==========================================
export const comprehensiveCandidates: Candidate[] = [
  // Tamil Nadu Candidates (20)
  {
    id: 'cand_001',
    email: 'mani.geetha@email.com',
    name: 'Mani Geetha',
    phone: '+91 9876543210',
    role: 'candidate',
    profileImage: '/avatars/mani-geetha.jpg',
    isVerified: true,
    createdAt: '2023-08-15T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
    profile: {
      firstName: 'Mani',
      lastName: 'Geetha',
      bio: 'Experienced computer science educator with specialization in artificial intelligence and machine learning. Passionate about innovative teaching methods and research in emerging technologies.',
      location: {
        country: 'India',
        state: 'Tamil Nadu',
        district: 'Chennai',
        city: 'Chennai',
        pincode: '600028',
        address: 'T. Nagar, Chennai'
      },
      qualifications: ['Ph.D Computer Science', 'M.Tech Computer Science', 'B.E Computer Science'],
      experience: [{
        id: 'exp_001',
        designation: 'Assistant Professor',
        organization: 'PSG College of Technology',
        organizationType: 'engineering-college',
        location: {
          country: 'India',
          state: 'Tamil Nadu',
          district: 'Coimbatore',
          city: 'Coimbatore',
          pincode: '641004'
        },
        startDate: '2020-06-01',
        endDate: '2023-12-31',
        isCurrent: false,
        description: 'Taught computer science subjects and supervised student projects in AI/ML.',
        achievements: ['Published 12 research papers', 'Guided 20 projects', 'Best Faculty Award 2022'],
        skills: ['Artificial Intelligence', 'Machine Learning', 'Python', 'Research']
      }],
      education: [{
        id: 'edu_001',
        degree: 'Ph.D',
        field: 'Computer Science',
        institution: 'Anna University',
        university: 'Anna University',
        location: {
          country: 'India',
          state: 'Tamil Nadu',
          district: 'Chennai',
          city: 'Chennai',
          pincode: '600025'
        },
        startDate: '2017-08-01',
        endDate: '2021-05-31',
        grade: '9.1',
        gradeType: 'cgpa',
        achievements: ['University Gold Medal', 'Best Thesis Award'],
        specialization: 'Artificial Intelligence and Machine Learning'
      }],
      skills: ['Artificial Intelligence', 'Machine Learning', 'Python', 'Java', 'Research Methodology', 'Teaching'],
      certifications: [{
        id: 'cert_001',
        name: 'UGC NET Computer Science',
        issuingOrganization: 'National Testing Agency',
        issueDate: '2021-01-15',
        credentialId: 'NET2021CS001',
        skills: ['Teaching Eligibility', 'Research Aptitude']
      }],
      resume: {
        id: 'resume_001',
        originalName: 'Mani_Geetha_Resume.pdf',
        fileName: 'mani-geetha-resume.pdf',
        size: 245760,
        mimeType: 'application/pdf',
        url: '/resumes/mani-geetha-resume.pdf',
        uploadedAt: '2024-01-10T10:00:00Z'
      },
      expectedSalary: { min: 70000, max: 90000, currency: 'INR' },
      availability: '1-month',
      references: [{
        id: 'ref_001',
        name: 'Dr. Rajesh Kannan',
        designation: 'Professor and Head',
        organization: 'PSG College of Technology',
        email: 'rajesh.kannan@psgtech.edu',
        phone: '+91 9876543211',
        relationship: 'Former Supervisor',
        yearsKnown: 4
      }],
      languages: ['English', 'Tamil', 'Hindi']
    }
  },
  {
    id: 'cand_002',
    email: 'aravind.kumar@email.com',
    name: 'Dr. Aravind Kumar S',
    phone: '+91 9876543211',
    role: 'candidate',
    profileImage: '/avatars/aravind-kumar.jpg',
    isVerified: true,
    createdAt: '2023-09-20T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z',
    profile: {
      firstName: 'Aravind',
      lastName: 'Kumar S',
      bio: 'Mechanical engineering professional with expertise in thermal systems and manufacturing. Strong research background in renewable energy applications.',
      location: {
        country: 'India',
        state: 'Tamil Nadu',
        district: 'Madurai',
        city: 'Madurai',
        pincode: '625002',
        address: 'Anna Nagar, Madurai'
      },
      qualifications: ['Ph.D Mechanical Engineering', 'M.E Thermal Engineering', 'B.E Mechanical Engineering'],
      experience: [{
        id: 'exp_002',
        designation: 'Assistant Professor',
        organization: 'Thiagarajar College of Engineering',
        organizationType: 'engineering-college',
        location: {
          country: 'India',
          state: 'Tamil Nadu',
          district: 'Madurai',
          city: 'Madurai',
          pincode: '625015'
        },
        startDate: '2019-07-01',
        endDate: '2024-01-31',
        isCurrent: false,
        description: 'Teaching thermal engineering and supervising research in renewable energy systems.',
        achievements: ['10 research publications', 'Research funding ₹15 lakhs', 'Best Teacher Award 2023'],
        skills: ['Thermal Engineering', 'Renewable Energy', 'Research', 'CAD']
      }],
      education: [{
        id: 'edu_002',
        degree: 'Ph.D',
        field: 'Mechanical Engineering',
        institution: 'NIT Tiruchirappalli',
        university: 'NIT Tiruchirappalli',
        location: {
          country: 'India',
          state: 'Tamil Nadu',
          district: 'Tiruchirappalli',
          city: 'Tiruchirappalli',
          pincode: '620015'
        },
        startDate: '2015-08-01',
        endDate: '2019-06-30',
        grade: '8.8',
        gradeType: 'cgpa',
        achievements: ['Research Excellence Award'],
        specialization: 'Thermal Engineering and Renewable Energy'
      }],
      skills: ['Thermal Engineering', 'Renewable Energy', 'CAD/CAM', 'Research Methodology', 'Project Management'],
      certifications: [{
        id: 'cert_002',
        name: 'UGC NET Mechanical Engineering',
        issuingOrganization: 'National Testing Agency',
        issueDate: '2019-03-20',
        credentialId: 'NET2019ME002',
        skills: ['Teaching Eligibility']
      }],
      resume: {
        id: 'resume_002',
        originalName: 'Aravind_Kumar_Resume.pdf',
        fileName: 'aravind-kumar-resume.pdf',
        size: 298432,
        mimeType: 'application/pdf',
        url: '/resumes/aravind-kumar-resume.pdf',
        uploadedAt: '2024-01-08T10:00:00Z'
      },
      expectedSalary: { min: 65000, max: 85000, currency: 'INR' },
      availability: '2-months',
      references: [{
        id: 'ref_002',
        name: 'Dr. Subramanian K',
        designation: 'Professor',
        organization: 'NIT Tiruchirappalli',
        email: 'subramanian@nitt.edu',
        phone: '+91 9876543212',
        relationship: 'Ph.D Supervisor',
        yearsKnown: 5
      }],
      languages: ['English', 'Tamil', 'Hindi']
    }
  },
  {
    id: 'cand_003',
    email: 'meena.priya@email.com',
    name: 'Dr. Meena Priya R',
    phone: '+91 9876543212',
    role: 'candidate',
    profileImage: '/avatars/meena-priya.jpg',
    isVerified: true,
    createdAt: '2023-07-10T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z',
    profile: {
      firstName: 'Meena',
      lastName: 'Priya R',
      bio: 'Chemistry educator with specialization in organic chemistry and environmental chemistry. Passionate about sustainable chemical processes and innovative teaching.',
      location: {
        country: 'India',
        state: 'Tamil Nadu',
        district: 'Coimbatore',
        city: 'Coimbatore',
        pincode: '641014',
        address: 'Saravanampatti, Coimbatore'
      },
      qualifications: ['Ph.D Chemistry', 'M.Sc Chemistry', 'B.Sc Chemistry'],
      experience: [{
        id: 'exp_003',
        designation: 'Lecturer',
        organization: 'Lady Doak College',
        organizationType: 'arts-science-college',
        location: {
          country: 'India',
          state: 'Tamil Nadu',
          district: 'Madurai',
          city: 'Madurai',
          pincode: '625002'
        },
        startDate: '2020-06-01',
        endDate: '2024-01-31',
        isCurrent: false,
        description: 'Teaching chemistry and conducting research in environmental chemistry.',
        achievements: ['8 research papers', 'Student excellence award 2023'],
        skills: ['Organic Chemistry', 'Environmental Chemistry', 'Teaching', 'Research']
      }],
      education: [{
        id: 'edu_003',
        degree: 'Ph.D',
        field: 'Chemistry',
        institution: 'Bharathiar University',
        university: 'Bharathiar University',
        location: {
          country: 'India',
          state: 'Tamil Nadu',
          district: 'Coimbatore',
          city: 'Coimbatore',
          pincode: '641046'
        },
        startDate: '2016-08-01',
        endDate: '2020-05-31',
        grade: '8.9',
        gradeType: 'cgpa',
        achievements: ['University Research Fellowship'],
        specialization: 'Organic and Environmental Chemistry'
      }],
      skills: ['Organic Chemistry', 'Environmental Chemistry', 'Analytical Chemistry', 'Research', 'Teaching'],
      certifications: [{
        id: 'cert_003',
        name: 'UGC NET Chemistry',
        issuingOrganization: 'National Testing Agency',
        issueDate: '2020-01-20',
        credentialId: 'NET2020CH003',
        skills: ['Teaching Eligibility']
      }],
      resume: {
        id: 'resume_003',
        originalName: 'Meena_Priya_Resume.pdf',
        fileName: 'meena-priya-resume.pdf',
        size: 287654,
        mimeType: 'application/pdf',
        url: '/resumes/meena-priya-resume.pdf',
        uploadedAt: '2024-01-12T10:00:00Z'
      },
      expectedSalary: { min: 55000, max: 75000, currency: 'INR' },
      availability: 'immediate',
      references: [{
        id: 'ref_003',
        name: 'Dr. Kamala Devi',
        designation: 'Professor',
        organization: 'Bharathiar University',
        email: 'kamala.devi@b-u.ac.in',
        phone: '+91 9876543213',
        relationship: 'Ph.D Supervisor',
        yearsKnown: 4
      }],
      languages: ['English', 'Tamil']
    }
  }
  // Additional 49 candidates would continue here with similar structure
  // covering different subjects, states, and qualifications
];

// Generate additional candidates programmatically
const generateAdditionalCandidates = (): Candidate[] => {
  const names = [
    'Vasanth Kannan', 'Lakshmi Narayanan', 'Pradeep Kumar', 'Divya Bharathi',
    'Ramesh Babu', 'Sangeetha Devi', 'Mukesh Sharma', 'Ravi Teja',
    'Nithya Shree', 'Gopal Krishna', 'Shalini Reddy', 'Arjun Pratap',
    'Kavitha Menon', 'Suresh Chandra', 'Anu Radha', 'Vijay Kumar',
    'Madhavi Latha', 'Kiran Raj', 'Sowmya Priya', 'Harish Babu',
    'Shweta Kumari', 'Deepak Singh', 'Pooja Sharma', 'Rohit Gupta',
    'Neha Agarwal', 'Amit Patel', 'Sneha Joshi', 'Rajeev Mehta',
    'Priya Singh', 'Anand Kumar', 'Rashmi Nair', 'Manoj Tiwari',
    'Sunita Rao', 'Prakash Jain', 'Rekha Verma', 'Sanjay Dubey',
    'Geeta Sharma', 'Vikas Pandey', 'Meera Gupta', 'Ashok Yadav',
    'Seema Malhotra', 'Rajat Khanna', 'Rina Shah', 'Pankaj Sinha',
    'Vandana Jha', 'Naveen Kumar', 'Komal Saxena', 'Yogesh Mishra',
    'Kavita Agarwal'
  ];

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature',
    'Economics', 'Psychology', 'Sociology', 'History', 'Geography',
    'Political Science', 'Business Administration', 'Marketing', 'Finance',
    'Information Technology', 'Electronics Engineering', 'Civil Engineering',
    'Electrical Engineering', 'Biotechnology', 'Environmental Science'
  ];

  const states = ['Tamil Nadu', 'Karnataka', 'Kerala', 'Andhra Pradesh', 'Telangana',
                  'Maharashtra', 'Gujarat', 'Rajasthan', 'West Bengal', 'Punjab'];

  const districts = {
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
    'Karnataka': ['Bangalore Urban', 'Mysore', 'Mangalore', 'Hubli-Dharwad'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot']
  };

  const additionalCandidates: Candidate[] = [];

  for (let i = 4; i <= 52; i++) {
    const name = names[i - 4] || `Candidate ${i}`;
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const stateDistricts = districts[state as keyof typeof districts] || ['District'];
    const district = stateDistricts[Math.floor(Math.random() * stateDistricts.length)];

    additionalCandidates.push({
      id: `cand_${i.toString().padStart(3, '0')}`,
      email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
      name: name,
      phone: `+91 98765432${i.toString().padStart(2, '0')}`,
      role: 'candidate',
      profileImage: `/avatars/candidate-${i}.jpg`,
      isVerified: Math.random() > 0.2,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      profile: {
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1] || '',
        bio: `Experienced ${subject} educator with strong teaching and research background. Passionate about innovative education methods.`,
        location: {
          country: 'India',
          state: state,
          district: district,
          city: district,
          pincode: `${Math.floor(Math.random() * 900000) + 100000}`,
          address: `${district}, ${state}`
        },
        qualifications: [
          `Ph.D ${subject}`,
          `M.Sc/M.A ${subject}`,
          `B.Sc/B.A ${subject}`
        ],
        experience: [{
          id: `exp_${i.toString().padStart(3, '0')}`,
          designation: ['Assistant Professor', 'Lecturer', 'Associate Professor'][Math.floor(Math.random() * 3)],
          organization: `${district} College`,
          organizationType: ['engineering-college', 'arts-science-college', 'university'][Math.floor(Math.random() * 3)] as any,
          location: {
            country: 'India',
            state: state,
            district: district,
            city: district,
            pincode: `${Math.floor(Math.random() * 900000) + 100000}`
          },
          startDate: new Date(Date.now() - Math.random() * 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          endDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          isCurrent: Math.random() > 0.3,
          description: `Teaching ${subject} and conducting research.`,
          achievements: [`${Math.floor(Math.random() * 20) + 1} research papers`, 'Teaching excellence award'],
          skills: [subject, 'Teaching', 'Research', 'Student Mentoring']
        }],
        education: [{
          id: `edu_${i.toString().padStart(3, '0')}`,
          degree: 'Ph.D',
          field: subject,
          institution: `${state} University`,
          university: `${state} University`,
          location: {
            country: 'India',
            state: state,
            district: district,
            city: district,
            pincode: `${Math.floor(Math.random() * 900000) + 100000}`
          },
          startDate: '2018-08-01',
          endDate: '2022-05-31',
          grade: `${(Math.random() * 2 + 7).toFixed(1)}`,
          gradeType: 'cgpa',
          achievements: ['Research Excellence'],
          specialization: subject
        }],
        skills: [subject, 'Teaching', 'Research', 'Academic Writing', 'Student Mentoring'],
        certifications: [{
          id: `cert_${i.toString().padStart(3, '0')}`,
          name: `UGC NET ${subject}`,
          issuingOrganization: 'National Testing Agency',
          issueDate: '2022-01-15',
          credentialId: `NET2022${i.toString().padStart(3, '0')}`,
          skills: ['Teaching Eligibility']
        }],
        resume: {
          id: `resume_${i.toString().padStart(3, '0')}`,
          originalName: `${name.replace(' ', '_')}_Resume.pdf`,
          fileName: `${name.toLowerCase().replace(' ', '-')}-resume.pdf`,
          size: Math.floor(Math.random() * 500000) + 200000,
          mimeType: 'application/pdf',
          url: `/resumes/${name.toLowerCase().replace(' ', '-')}-resume.pdf`,
          uploadedAt: new Date().toISOString()
        },
        expectedSalary: {
          min: Math.floor(Math.random() * 30000) + 40000,
          max: Math.floor(Math.random() * 40000) + 70000,
          currency: 'INR'
        },
        availability: ['immediate', '1-month', '2-months'][Math.floor(Math.random() * 3)] as any,
        references: [{
          id: `ref_${i.toString().padStart(3, '0')}`,
          name: `Dr. Reference ${i}`,
          designation: 'Professor',
          organization: `${state} University`,
          email: `reference${i}@university.edu`,
          phone: `+91 98765${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
          relationship: 'Former Supervisor',
          yearsKnown: Math.floor(Math.random() * 5) + 2
        }],
        languages: ['English', 'Hindi', state === 'Tamil Nadu' ? 'Tamil' : 'Regional Language']
      }
    });
  }

  return additionalCandidates;
};

export const allCandidates = [...comprehensiveCandidates, ...generateAdditionalCandidates()];

// ==========================================
// 200+ Comprehensive Job Postings
// ==========================================
export const generateComprehensiveJobs = (): Job[] => {
  const jobTitles = [
    'Assistant Professor - Computer Science', 'Professor - Mathematics', 'Lecturer - Physics',
    'Associate Professor - Chemistry', 'Assistant Professor - Biology', 'Principal - Engineering College',
    'Head of Department - Electronics', 'Lecturer - English Literature', 'Professor - Mechanical Engineering',
    'Assistant Professor - Civil Engineering', 'Lecturer - Economics', 'Professor - Psychology',
    'Assistant Professor - Sociology', 'Lecturer - History', 'Professor - Geography',
    'Assistant Professor - Political Science', 'Lecturer - Business Administration', 'Professor - Marketing',
    'Assistant Professor - Finance', 'Lecturer - Information Technology', 'Professor - Biotechnology',
    'Assistant Professor - Environmental Science', 'Lecturer - Agriculture', 'Professor - Food Technology',
    'Assistant Professor - Textile Engineering', 'Lecturer - Automobile Engineering', 'Professor - Aerospace Engineering',
    'Assistant Professor - Chemical Engineering', 'Lecturer - Petroleum Engineering', 'Professor - Mining Engineering'
  ];

  const instituteTypes: InstituteType[] = [
    'engineering-college', 'arts-science-college', 'polytechnic', 'iti', 'school', 'university', 'research-institute'
  ];

  const states = ['Tamil Nadu', 'Karnataka', 'Kerala', 'Andhra Pradesh', 'Telangana',
                  'Maharashtra', 'Gujarat', 'Rajasthan', 'West Bengal', 'Punjab'];

  const jobs: Job[] = [];

  for (let i = 1; i <= 200; i++) {
    const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const instituteType = instituteTypes[Math.floor(Math.random() * instituteTypes.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const subject = title.split(' - ')[1] || title.split(' ')[title.split(' ').length - 1];
    
    jobs.push({
      id: `job_${i.toString().padStart(3, '0')}`,
      title: title,
      description: `We are seeking a qualified ${title} to join our ${instituteType.replace('-', ' ')}. The candidate will be responsible for teaching, research, and academic development.

Key Responsibilities:
• Teach undergraduate and graduate courses
• Conduct cutting-edge research in ${subject}
• Supervise student projects and research
• Participate in academic committees and institutional development
• Collaborate with industry partners
• Publish research papers in reputed journals

Requirements:
• Ph.D in ${subject} or related field
• Prior teaching experience preferred
• Strong research background
• Excellent communication skills
• Commitment to academic excellence`,
      shortDescription: `Join our ${instituteType.replace('-', ' ')} as ${title}. Excellence in teaching, research, and student mentoring.`,
      department: subject,
      subject: subject,
      instituteId: `inst_${Math.floor(Math.random() * 50) + 1}`,
      institute: {
        id: `inst_${Math.floor(Math.random() * 50) + 1}`,
        name: `${state.split(' ')[0]} Institute of ${subject}`,
        type: instituteType,
        location: {
          country: 'India',
          state: state,
          district: state.split(' ')[0],
          city: state.split(' ')[0],
          pincode: `${Math.floor(Math.random() * 900000) + 100000}`,
          address: `${state.split(' ')[0]}, ${state}`
        }
      } as Institute,
      employerId: `emp_${Math.floor(Math.random() * 20) + 1}`,
      employer: {} as any,
      location: {
        country: 'India',
        state: state,
        district: state.split(' ')[0],
        city: state.split(' ')[0],
        pincode: `${Math.floor(Math.random() * 900000) + 100000}`,
        address: `${state.split(' ')[0]}, ${state}`
      },
      salary: {
        min: Math.floor(Math.random() * 40000) + 30000,
        max: Math.floor(Math.random() * 60000) + 60000,
        currency: 'INR',
        negotiable: Math.random() > 0.3
      },
      requirements: {
        education: [`Ph.D in ${subject}`, `M.Tech/M.E in ${subject} with NET`],
        experience: `${Math.floor(Math.random() * 8) + 2}-${Math.floor(Math.random() * 10) + 5} years`,
        skills: [subject, 'Teaching', 'Research', 'Academic Writing'],
        certifications: ['UGC NET', 'Ph.D'],
        languages: ['English', 'Hindi']
      },
      responsibilities: [
        `Teach ${subject} courses`,
        'Conduct research and publish papers',
        'Guide student projects',
        'Participate in academic committees',
        'Collaborate with industry'
      ],
      benefits: [
        'Competitive salary package',
        'Research funding support',
        'Health insurance',
        'Professional development',
        'Conference support'
      ],
      employmentType: ['full-time', 'part-time', 'contract', 'visiting'][Math.floor(Math.random() * 4)] as any,
      workMode: ['on-site', 'remote', 'hybrid'][Math.floor(Math.random() * 3)] as any,
      applicationTypes: ['online', 'email'],
      deadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      positions: Math.floor(Math.random() * 5) + 1,
      isActive: Math.random() > 0.1,
      isPremium: Math.random() > 0.7,
      isFeatured: Math.random() > 0.8,
      tags: [subject.toLowerCase().replace(' ', '-'), 'academic', 'research'],
      createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      viewCount: Math.floor(Math.random() * 1000) + 50,
      applicationCount: Math.floor(Math.random() * 50) + 5
    });
  }

  return jobs;
};

export const allJobs = generateComprehensiveJobs();

// ==========================================
// Analytics Data for Employer Dashboard
// ==========================================
export const employerAnalyticsData = {
  activeJobsCount: 200,
  totalApplicationsCount: 2000,
  shortlistedCandidatesCount: 250,
  hiredCandidatesCount: 45,
  jobViewsCount: 20000,
  averageApplicationsPerJob: 250,
  
  topPerformingJobs: [
    {
      jobId: 'job_001',
      title: 'Assistant Professor - Computer Science',
      applications: 45,
      views: 320
    },
    {
      jobId: 'job_002',
      title: 'Professor - Mathematics',
      applications: 38,
      views: 280
    },
    {
      jobId: 'job_003',
      title: 'Lecturer - Physics',
      applications: 42,
      views: 275
    },
    {
      jobId: 'job_004',
      title: 'Associate Professor - Chemistry',
      applications: 35,
      views: 250
    },
    {
      jobId: 'job_005',
      title: 'Assistant Professor - Biology',
      applications: 40,
      views: 240
    }
  ],
  
  applicationTrends: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    applications: Math.floor(Math.random() * 25) + 15
  })),
  
  applicationsByQualification: [
    { qualification: 'Ph.D', count: 800, percentage: 40 },
    { qualification: 'M.Tech/M.E', count: 600, percentage: 30 },
    { qualification: 'M.Sc/M.A', count: 400, percentage: 20 },
    { qualification: 'Others', count: 200, percentage: 10 }
  ],
  
  applicationsByLocation: [
    { location: 'Tamil Nadu', count: 500, percentage: 25 },
    { location: 'Karnataka', count: 400, percentage: 20 },
    { location: 'Kerala', count: 300, percentage: 15 },
    { location: 'Andhra Pradesh', count: 250, percentage: 12.5 },
    { location: 'Maharashtra', count: 200, percentage: 10 },
    { location: 'Others', count: 350, percentage: 17.5 }
  ]
};
