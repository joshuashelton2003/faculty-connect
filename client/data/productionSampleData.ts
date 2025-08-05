// ==========================================
// FacultyConnect - Production Sample Data
// Comprehensive data for 1000+ jobs, 10000+ applications
// Tamil Nadu & South India Focus
// ==========================================

import { Job, Institute, Application, Candidate, Employer } from '@/types';

// Helper function to generate random dates between July 1, 2025 and now
const getRandomRecentDate = (): string => {
  const start = new Date('2025-07-01');
  const end = new Date();
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime).toISOString();
};

// Tamil Nadu cities and districts
const tamilNaduLocations = [
  { city: 'Chennai', district: 'Chennai', state: 'Tamil Nadu' },
  { city: 'Coimbatore', district: 'Coimbatore', state: 'Tamil Nadu' },
  { city: 'Madurai', district: 'Madurai', state: 'Tamil Nadu' },
  { city: 'Tiruchirappalli', district: 'Tiruchirappalli', state: 'Tamil Nadu' },
  { city: 'Salem', district: 'Salem', state: 'Tamil Nadu' },
  { city: 'Tirunelveli', district: 'Tirunelveli', state: 'Tamil Nadu' },
  { city: 'Erode', district: 'Erode', state: 'Tamil Nadu' },
  { city: 'Vellore', district: 'Vellore', state: 'Tamil Nadu' },
  { city: 'Thanjavur', district: 'Thanjavur', state: 'Tamil Nadu' },
  { city: 'Kancheepuram', district: 'Kancheepuram', state: 'Tamil Nadu' },
  { city: 'Karur', district: 'Karur', state: 'Tamil Nadu' },
  { city: 'Sivakasi', district: 'Virudhunagar', state: 'Tamil Nadu' },
  { city: 'Dindigul', district: 'Dindigul', state: 'Tamil Nadu' },
  { city: 'Cuddalore', district: 'Cuddalore', state: 'Tamil Nadu' },
  { city: 'Nagercoil', district: 'Kanyakumari', state: 'Tamil Nadu' },
  { city: 'Hosur', district: 'Krishnagiri', state: 'Tamil Nadu' },
  { city: 'Pollachi', district: 'Coimbatore', state: 'Tamil Nadu' },
  { city: 'Tuticorin', district: 'Thoothukudi', state: 'Tamil Nadu' },
  { city: 'Kumbakonam', district: 'Thanjavur', state: 'Tamil Nadu' },
  { city: 'Tirupur', district: 'Tirupur', state: 'Tamil Nadu' }
];

// South Indian cities (for broader reach)
const southIndianLocations = [
  ...tamilNaduLocations,
  { city: 'Bangalore', district: 'Bangalore Urban', state: 'Karnataka' },
  { city: 'Mysore', district: 'Mysore', state: 'Karnataka' },
  { city: 'Mangalore', district: 'Dakshina Kannada', state: 'Karnataka' },
  { city: 'Kochi', district: 'Ernakulam', state: 'Kerala' },
  { city: 'Thiruvananthapuram', district: 'Thiruvananthapuram', state: 'Kerala' },
  { city: 'Calicut', district: 'Kozhikode', state: 'Kerala' },
  { city: 'Hyderabad', district: 'Hyderabad', state: 'Telangana' },
  { city: 'Warangal', district: 'Warangal', state: 'Telangana' },
  { city: 'Visakhapatnam', district: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { city: 'Vijayawada', district: 'Krishna', state: 'Andhra Pradesh' },
  { city: 'Puducherry', district: 'Puducherry', state: 'Puducherry' }
];

// Tamil names for faculty candidates
const tamilNames = {
  male: [
    'Aravind Kumar', 'Senthil Kumar', 'Rajesh Kannan', 'Murugan Selvam', 'Karthik Raman',
    'Prasanth Kumar', 'Suresh Babu', 'Vinod Kumar', 'Ganesh Kumar', 'Ramesh Chandra',
    'Pradeep Kumar', 'Mahesh Kumar', 'Sanjay Kumar', 'Vijay Kumar', 'Dinesh Kumar',
    'Naveen Kumar', 'Ravi Kumar', 'Ashok Kumar', 'Anand Kumar', 'Mohan Kumar',
    'Selvam Murugan', 'Krishnan Raman', 'Balamurugan S', 'Parthiban Kumar', 'Selvakumar R',
    'Chandrasekhar K', 'Venkatesh Kumar', 'Ramanathan S', 'Shankar Kumar', 'Sundaram Ravi',
    'Gopinath Kumar', 'Murali Krishna', 'Srinivasan K', 'Jayakumar S', 'Balakrishnan R',
    'Pandian Kumar', 'Ganesan S', 'Saravanan Kumar', 'Kalaivani Raman', 'Thirumaran K',
    'Periyasamy S', 'Venkatesan Kumar', 'Kaliappan R', 'Muthukumar S', 'Selvam Raja',
    'Dhanasekar K', 'Prabakaran S', 'Kumaran Kumar', 'Manikandan R', 'Senthilkumar S'
  ],
  female: [
    'Christypunitha M', 'Mani Geetha', 'Priya Sharma', 'Meena Krishnan', 'Kavitha Raman',
    'Deepa Kumar', 'Shanti Devi', 'Lakshmi Priya', 'Revathi S', 'Janani Kumar',
    'Sangeetha R', 'Divya Priya', 'Nithya Kumar', 'Sujatha S', 'Bharathi Kumar',
    'Kalpana Devi', 'Radhika Priya', 'Vijaya Lakshmi', 'Geetha Rani', 'Prema Kumar',
    'Malathi S', 'Varalakshmi K', 'Padmavathi R', 'Saraswathi Kumar', 'Kamala Devi',
    'Pushpa Kumari', 'Sumathi S', 'Vasantha Kumar', 'Usha Rani', 'Shobha Devi',
    'Indira Priya', 'Sudha Kumar', 'Rohini S', 'Chitra Devi', 'Lalitha Kumar',
    'Asha Kumari', 'Radha Kumar', 'Sarita Devi', 'Anitha Priya', 'Rekha Kumar',
    'Selvi Murugan', 'Dhanalakshmi S', 'Karthika Devi', 'Pavithra Kumar', 'Thenmozhi S',
    'Priyadarshini K', 'Vimala Devi', 'Nandini Kumar', 'Gayathri S', 'Subashini Kumar'
  ]
};

// Institute names (Tamil Nadu focused)
const instituteNames = [
  // Government Universities
  'Anna University', 'University of Madras', 'Bharathidasan University', 'Bharathiar University',
  'Madurai Kamaraj University', 'Manonmaniam Sundaranar University', 'Tamil University',
  'Thiruvalluvar University', 'Mother Teresa Women\'s University', 'Tamil Nadu Agricultural University',
  
  // IITs and NITs
  'Indian Institute of Technology Madras', 'National Institute of Technology Tiruchirappalli',
  'Indian Institute of Information Technology Design and Manufacturing Kancheepuram',
  
  // Engineering Colleges
  'PSG College of Technology', 'Thiagarajar College of Engineering', 'SSN College of Engineering',
  'Velammal Engineering College', 'SRM Institute of Science and Technology', 'VIT University',
  'Kumaraguru College of Technology', 'Bannari Amman Institute of Technology',
  'Kongu Engineering College', 'SNS College of Technology', 'KSR Institute for Engineering and Technology',
  'Karpagam College of Engineering', 'Hindusthan College of Engineering and Technology',
  'R.M.K. Engineering College', 'Sri Sivasubramaniya Nadar College of Engineering',
  'CEG Campus Anna University', 'MIT Campus Anna University', 'ACT Campus Anna University',
  'Government College of Technology Coimbatore', 'Government College of Engineering Tirunelveli',
  'Government College of Engineering Salem', 'Annamalai University Faculty of Engineering',
  'Pondicherry Engineering College', 'National Engineering College Kovilpatti',
  'Sethu Institute of Technology', 'Mepco Schlenk Engineering College',
  'Kamaraj College of Engineering and Technology', 'P.A. College of Engineering and Technology',
  
  // Arts and Science Colleges
  'Loyola College Chennai', 'Stella Maris College', 'Women\'s Christian College',
  'Presidency College Chennai', 'Madras Christian College', 'St. Joseph\'s College Tiruchirappalli',
  'Bishop Heber College Tiruchirappalli', 'American College Madurai', 'Scott Christian College',
  'Lady Doak College Madurai', 'Sarah Tucker College Tirunelveli', 'St. Xavier\'s College Palayamkottai',
  'Holy Cross College Tiruchirappalli', 'Ethiraj College for Women', 'Queen Mary\'s College',
  'Government Arts College Coimbatore', 'Government Arts College Salem', 'Government Arts College Karur',
  'PSG College of Arts and Science', 'Sri Krishna Arts and Science College', 'Kongunadu Arts and Science College',
  'Hindusthan College of Arts and Science', 'Dr. N.G.P. Arts and Science College',
  
  // Polytechnics
  'Government Polytechnic College Chennai', 'Government Polytechnic College Coimbatore',
  'Government Polytechnic College Madurai', 'Government Polytechnic College Salem',
  'Anna University Polytechnic College', 'PSG Polytechnic College', 'Thanthai Periyar Government Institute of Technology',
  'Government Polytechnic College Krishnagiri', 'Government Polytechnic College Dindigul',
  'Government Polytechnic College Erode', 'Sri Krishna Polytechnic College',
  'SNS College of Technology Polytechnic', 'Kumaraguru Polytechnic College',
  
  // Schools
  'Kendriya Vidyalaya Chennai', 'Jawahar Navodaya Vidyalaya Coimbatore', 'DAV Public School Chennai',
  'Padma Seshadri Bala Bhavan', 'Sishya School', 'Chettinad Vidyashram', 'PSBB Millennium School',
  'Good Shepherd International School', 'Velammal Vidyalaya', 'SBOA School and Junior College',
  'Sir Sivaswami Kalalaya Senior Secondary School', 'Montfort Anglo Indian Higher Secondary School',
  'St. Patrick\'s Anglo Indian Higher Secondary School', 'Don Bosco Matriculation Higher Secondary School',
  'Schram Academy International', 'KRM Public School', 'Maharishi Vidya Mandir',
  
  // Professional Institutes
  'Indian Institute of Management Tiruchirappalli', 'National Institute of Technology Puducherry',
  'Indian Maritime University Chennai', 'Tamil Nadu Dr. M.G.R. Medical University',
  'Government Stanley Medical College', 'Madras Medical College', 'Kilpauk Medical College',
  'Coimbatore Medical College', 'Madurai Medical College', 'Thanjavur Medical College',
  'Tamil Nadu Veterinary and Animal Sciences University', 'Captain Srinivasa Murthy Regional Ayurveda Drug Development Institute',
  'Government Yoga and Naturopathy Medical College', 'Indian Statistical Institute Chennai',
  'Chennai Mathematical Institute', 'Institute of Mathematical Sciences'
];

// Subjects and departments
const subjects = [
  'Computer Science and Engineering', 'Information Technology', 'Electronics and Communication Engineering',
  'Electrical and Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering',
  'Chemical Engineering', 'Biotechnology', 'Automobile Engineering', 'Aeronautical Engineering',
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature', 'Tamil Literature',
  'History', 'Geography', 'Economics', 'Commerce', 'Business Administration', 'Management Studies',
  'Statistics', 'Microbiology', 'Biochemistry', 'Botany', 'Zoology', 'Environmental Science',
  'Computer Applications', 'Data Science', 'Artificial Intelligence', 'Machine Learning',
  'Cyber Security', 'Software Engineering', 'Web Technology', 'Mobile Application Development',
  'Digital Marketing', 'Fashion Technology', 'Textile Technology', 'Food Technology',
  'Agricultural Engineering', 'Forestry', 'Fisheries Science', 'Home Science',
  'Physical Education', 'Psychology', 'Sociology', 'Social Work', 'Library Science',
  'Mass Communication', 'Journalism', 'Fine Arts', 'Music', 'Dance', 'Theatre Arts'
];

// Generate random salary range
const getSalaryRange = (level: string) => {
  const ranges = {
    'Assistant Professor': { min: 35000, max: 65000 },
    'Associate Professor': { min: 60000, max: 90000 },
    'Professor': { min: 85000, max: 150000 },
    'Lecturer': { min: 25000, max: 45000 },
    'Senior Lecturer': { min: 40000, max: 70000 },
    'Principal': { min: 100000, max: 200000 },
    'HOD': { min: 70000, max: 120000 },
    'Dean': { min: 120000, max: 250000 },
    'Director': { min: 150000, max: 300000 },
    'Teacher': { min: 20000, max: 40000 },
    'PGT': { min: 30000, max: 55000 },
    'TGT': { min: 25000, max: 45000 },
    'Lab Assistant': { min: 18000, max: 35000 },
    'Research Scholar': { min: 31000, max: 50000 }
  };
  
  const baseRange = ranges[level] || ranges['Lecturer'];
  const variation = 0.2; // 20% variation
  
  return {
    min: Math.floor(baseRange.min * (1 - variation + Math.random() * variation * 2)),
    max: Math.floor(baseRange.max * (1 - variation + Math.random() * variation * 2)),
    currency: 'INR',
    negotiable: Math.random() > 0.7
  };
};

// Job titles based on subjects and levels
const generateJobTitle = (): { title: string; level: string } => {
  const levels = [
    'Assistant Professor', 'Associate Professor', 'Professor', 'Lecturer', 'Senior Lecturer',
    'Principal', 'HOD', 'Dean', 'Director', 'Teacher', 'PGT', 'TGT', 'Lab Assistant', 'Research Scholar'
  ];
  
  const level = levels[Math.floor(Math.random() * levels.length)];
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  
  if (level === 'HOD') {
    return { title: `Head of Department - ${subject}`, level };
  } else if (['Principal', 'Dean', 'Director'].includes(level)) {
    return { title: level, level };
  } else {
    return { title: `${level} - ${subject}`, level };
  }
};

// Generate comprehensive institutes data
export const generateInstitutes = (): Institute[] => {
  const institutes: Institute[] = [];
  
  instituteNames.forEach((name, index) => {
    const location = southIndianLocations[Math.floor(Math.random() * southIndianLocations.length)];
    const instituteTypes = ['engineering-college', 'arts-science-college', 'polytechnic', 'school', 'university', 'research-institute'];
    
    let type = 'arts-science-college';
    if (name.includes('Engineering') || name.includes('Technology') || name.includes('IIT') || name.includes('NIT')) {
      type = 'engineering-college';
    } else if (name.includes('Polytechnic')) {
      type = 'polytechnic';
    } else if (name.includes('School') || name.includes('Vidyalaya') || name.includes('Vidyashram')) {
      type = 'school';
    } else if (name.includes('University') || name.includes('Institute of Management')) {
      type = 'university';
    }
    
    institutes.push({
      id: `inst-${index + 1}`,
      name,
      type: type as any,
      description: `${name} is a premier educational institution located in ${location.city}, ${location.state}. Established with a vision to provide quality education and foster academic excellence.`,
      location: {
        country: 'India',
        state: location.state,
        district: location.district,
        city: location.city,
        pincode: `${600000 + Math.floor(Math.random() * 99999)}`,
        address: `${Math.floor(Math.random() * 999) + 1}, ${['Main Road', 'College Road', 'University Road', 'Campus Road'][Math.floor(Math.random() * 4)]}`
      },
      established: 1950 + Math.floor(Math.random() * 74),
      affiliation: ['Anna University', 'University of Madras', 'Bharathidasan University', 'AICTE', 'UGC', 'NAAC'][Math.floor(Math.random() * 6)],
      accreditation: ['NAAC A+', 'NAAC A', 'NBA', 'ISO 9001:2015'][Math.floor(Math.random() * 4)].split(','),
      website: `https://www.${name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.edu.in`,
      logo: `https://images.pexels.com/photos/${[8199625, 9489759, 2676888, 207732][Math.floor(Math.random() * 4)]}/pexels-photo-${[8199625, 9489759, 2676888, 207732][Math.floor(Math.random() * 4)]}.jpeg`,
      images: [`https://images.pexels.com/photos/2676888/pexels-photo-2676888.jpeg`],
      contact: {
        email: `info@${name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.edu.in`,
        phone: `+91-${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
      },
      departments: subjects.slice(0, Math.floor(Math.random() * 10) + 5),
      courses: ['UG', 'PG', 'PhD', 'Diploma', 'Certificate'].slice(0, Math.floor(Math.random() * 4) + 1),
      facilities: ['Library', 'Laboratory', 'Sports Complex', 'Hostel', 'Cafeteria', 'Transport', 'WiFi', 'Auditorium'].slice(0, Math.floor(Math.random() * 6) + 3),
      rankings: [{
        organization: 'NIRF',
        rank: Math.floor(Math.random() * 200) + 1,
        year: 2024,
        category: type === 'engineering-college' ? 'Engineering' : 'Overall'
      }],
      socialMedia: {
        facebook: `https://facebook.com/${name.toLowerCase().replace(/\s+/g, '')}`,
        linkedin: `https://linkedin.com/company/${name.toLowerCase().replace(/\s+/g, '')}`
      },
      isVerified: Math.random() > 0.1,
      isFeatured: Math.random() > 0.8,
      employerId: `emp-${index + 1}`,
      createdAt: getRandomRecentDate(),
      updatedAt: getRandomRecentDate()
    });
  });
  
  return institutes;
};

// Generate comprehensive jobs data (1000+ jobs)
export const generateJobs = (institutes: Institute[]): Job[] => {
  const jobs: Job[] = [];
  
  // Generate 1200 jobs
  for (let i = 0; i < 1200; i++) {
    const institute = institutes[Math.floor(Math.random() * institutes.length)];
    const jobInfo = generateJobTitle();
    const salary = getSalaryRange(jobInfo.level);
    
    jobs.push({
      id: `job-${i + 1}`,
      title: jobInfo.title,
      description: `We are seeking a qualified ${jobInfo.title} to join our ${institute.name}. The successful candidate will be responsible for teaching, research, and administrative duties as required. This is an excellent opportunity for professional growth in a dynamic academic environment.`,
      shortDescription: `${jobInfo.title} position at ${institute.name}. Join our team of dedicated educators and contribute to academic excellence.`,
      department: subjects[Math.floor(Math.random() * subjects.length)],
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      instituteId: institute.id,
      institute: institute,
      employerId: institute.employerId,
      employer: {} as Employer, // Will be populated separately
      location: institute.location,
      salary,
      requirements: {
        education: [
          ['PhD', 'M.Tech', 'M.E.', 'M.Sc', 'M.A', 'M.Com'][Math.floor(Math.random() * 6)],
          ['NET', 'SET', 'GATE', 'Ph.D'][Math.floor(Math.random() * 4)]
        ].slice(0, Math.floor(Math.random() * 2) + 1),
        experience: `${Math.floor(Math.random() * 10)} - ${Math.floor(Math.random() * 5) + 5} years`,
        skills: [
          'Teaching Excellence', 'Research Skills', 'Communication Skills', 'Subject Expertise',
          'Technology Integration', 'Student Mentoring', 'Academic Writing', 'Project Management'
        ].slice(0, Math.floor(Math.random() * 4) + 3),
        certifications: ['Teaching Excellence Certificate', 'Research Methodology', 'Digital Literacy'].slice(0, Math.floor(Math.random() * 2) + 1),
        languages: ['English', 'Tamil', 'Hindi'].slice(0, Math.floor(Math.random() * 2) + 1)
      },
      responsibilities: [
        'Conduct lectures and practical sessions',
        'Develop curriculum and course materials',
        'Guide student projects and research',
        'Participate in departmental activities',
        'Engage in research and publication',
        'Mentor students in academic and career development'
      ],
      benefits: [
        'Competitive salary package',
        'Health insurance coverage',
        'Professional development opportunities',
        'Research funding support',
        'Leave travel allowance',
        'Provident fund',
        'Gratuity benefits'
      ],
      employmentType: ['full-time', 'part-time', 'contract', 'visiting'][Math.floor(Math.random() * 4)] as any,
      workMode: ['on-site', 'hybrid'][Math.floor(Math.random() * 2)] as any,
      applicationTypes: ['online', 'email', 'walk-in'].slice(0, Math.floor(Math.random() * 2) + 1) as any,
      deadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      positions: Math.floor(Math.random() * 5) + 1,
      isActive: Math.random() > 0.05,
      isPremium: Math.random() > 0.7,
      isFeatured: Math.random() > 0.85,
      tags: ['faculty', 'teaching', 'research', 'academia', institute.type].slice(0, Math.floor(Math.random() * 3) + 2),
      createdAt: getRandomRecentDate(),
      updatedAt: getRandomRecentDate(),
      viewCount: Math.floor(Math.random() * 5000) + 100,
      applicationCount: Math.floor(Math.random() * 200) + 5
    });
  }
  
  return jobs;
};

// Generate candidate profiles (1000+)
export const generateCandidates = (): Candidate[] => {
  const candidates: Candidate[] = [];
  
  for (let i = 0; i < 1200; i++) {
    const isMale = Math.random() > 0.4; // 60% male, 40% female
    const firstName = isMale 
      ? tamilNames.male[Math.floor(Math.random() * tamilNames.male.length)]
      : tamilNames.female[Math.floor(Math.random() * tamilNames.female.length)];
    
    const location = tamilNaduLocations[Math.floor(Math.random() * tamilNaduLocations.length)];
    
    candidates.push({
      id: `cand-${i + 1}`,
      email: `${firstName.toLowerCase().replace(/\s+/g, '.')}${i + 1}@email.com`,
      name: firstName,
      phone: `+91-${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`,
      role: 'candidate',
      profileImage: isMale 
        ? 'https://images.pexels.com/photos/9663015/pexels-photo-9663015.jpeg'
        : 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg',
      isVerified: Math.random() > 0.2,
      createdAt: getRandomRecentDate(),
      updatedAt: getRandomRecentDate(),
      profile: {
        firstName: firstName.split(' ')[0],
        lastName: firstName.split(' ').slice(1).join(' ') || 'Kumar',
        bio: `Experienced educator with expertise in ${subjects[Math.floor(Math.random() * subjects.length)]}. Passionate about teaching and research with ${Math.floor(Math.random() * 15) + 1} years of experience in academic field.`,
        location: {
          country: 'India',
          state: location.state,
          district: location.district,
          city: location.city
        },
        qualifications: [
          ['PhD', 'M.Tech', 'M.E.', 'M.Sc', 'M.A', 'M.Com'][Math.floor(Math.random() * 6)],
          ['NET', 'SET', 'GATE'][Math.floor(Math.random() * 3)]
        ].slice(0, Math.floor(Math.random() * 2) + 1),
        experience: [],
        education: [],
        skills: [
          'Teaching', 'Research', 'Academic Writing', 'Student Mentoring', 'Curriculum Development',
          'Technology Integration', 'Project Management', 'Public Speaking'
        ].slice(0, Math.floor(Math.random() * 5) + 3),
        certifications: [],
        expectedSalary: {
          min: 30000 + Math.floor(Math.random() * 40000),
          max: 50000 + Math.floor(Math.random() * 100000),
          currency: 'INR'
        },
        availability: ['immediate', '1-month', '2-months'][Math.floor(Math.random() * 3)] as any,
        references: [],
        languages: ['English', 'Tamil', 'Hindi'].slice(0, Math.floor(Math.random() * 2) + 1)
      }
    });
  }
  
  return candidates;
};

// Generate applications (10000+)
export const generateApplications = (jobs: Job[], candidates: Candidate[]): Application[] => {
  const applications: Application[] = [];
  
  for (let i = 0; i < 12000; i++) {
    const job = jobs[Math.floor(Math.random() * jobs.length)];
    const candidate = candidates[Math.floor(Math.random() * candidates.length)];
    
    const statuses = ['submitted', 'under-review', 'shortlisted', 'interview-scheduled', 'interviewed', 'selected', 'rejected'];
    const status = statuses[Math.floor(Math.random() * statuses.length)] as any;
    
    applications.push({
      id: `app-${i + 1}`,
      jobId: job.id,
      job,
      candidateId: candidate.id,
      candidate,
      applicationDate: getRandomRecentDate(),
      status,
      coverLetter: `I am writing to express my strong interest in the ${job.title} position at ${job.institute.name}. With my background in ${job.subject} and passion for education, I am confident that I would be a valuable addition to your academic team.`,
      resume: {
        id: `resume-${i + 1}`,
        originalName: `${candidate.name.replace(/\s+/g, '_')}_Resume.pdf`,
        fileName: `resume_${i + 1}.pdf`,
        size: 1024 * (200 + Math.floor(Math.random() * 800)),
        mimeType: 'application/pdf',
        url: `/resumes/resume_${i + 1}.pdf`,
        uploadedAt: getRandomRecentDate()
      },
      additionalDocuments: [],
      answers: [],
      availabilityDate: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: getRandomRecentDate(),
      updatedAt: getRandomRecentDate()
    });
  }
  
  return applications;
};

// Analytics data for employer dashboard
export const getEmployerAnalytics = (jobs: Job[], applications: Application[]) => {
  const activeJobs = jobs.filter(job => job.isActive).length;
  const totalApplications = applications.length;
  const jobViews = jobs.reduce((sum, job) => sum + job.viewCount, 0);
  
  return {
    activeJobsCount: activeJobs,
    totalApplicationsCount: totalApplications,
    shortlistedCandidatesCount: applications.filter(app => app.status === 'shortlisted').length,
    hiredCandidatesCount: applications.filter(app => app.status === 'selected').length,
    jobViewsCount: jobViews,
    responseRate: Math.round((totalApplications / activeJobs) * 100) / 100,
    topPerformingJobs: jobs
      .sort((a, b) => b.applicationCount - a.applicationCount)
      .slice(0, 5)
      .map(job => ({
        jobId: job.id,
        title: job.title,
        applications: job.applicationCount,
        views: job.viewCount
      })),
    applicationTrends: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      applications: Math.floor(Math.random() * 50) + 10
    }))
  };
};

// Generate all production data
export const generateProductionData = () => {
  const institutes = generateInstitutes();
  const jobs = generateJobs(institutes);
  const candidates = generateCandidates();
  const applications = generateApplications(jobs, candidates);
  const employerAnalytics = getEmployerAnalytics(jobs, applications);
  
  return {
    institutes,
    jobs,
    candidates,
    applications,
    employerAnalytics,
    stats: {
      totalJobs: jobs.length,
      activeJobs: jobs.filter(job => job.isActive).length,
      totalApplications: applications.length,
      totalCandidates: candidates.length,
      totalInstitutes: institutes.length,
      totalViews: jobs.reduce((sum, job) => sum + job.viewCount, 0)
    }
  };
};

// Export production data
export const productionData = generateProductionData();
export const { institutes: productionInstitutes, jobs: productionJobs, candidates: productionCandidates, applications: productionApplications, employerAnalytics: productionEmployerAnalytics, stats: productionStats } = productionData;
