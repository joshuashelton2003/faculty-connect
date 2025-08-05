// ==========================================
// FacultyConnect - Sample Jobs Data
// 50+ Realistic Job Postings
// ==========================================

import { Job, Institute } from '@/types';
import { sampleInstitutes } from './sampleInstitutes';

export const sampleJobs: Job[] = [
  {
    id: 'job_001',
    title: 'Assistant Professor - Computer Science',
    description: `We are seeking a dynamic and passionate Assistant Professor to join our Computer Science Department. The successful candidate will be responsible for teaching undergraduate and postgraduate courses, conducting research in cutting-edge areas of computer science, and mentoring students in their academic and research endeavors.

Key Responsibilities:
• Teach undergraduate and graduate courses in computer science
• Develop and update course curricula to reflect current industry trends
• Conduct high-quality research in areas such as AI, Machine Learning, Data Science, or Software Engineering
• Supervise student projects, internships, and thesis work
• Participate in departmental and institutional committees
• Collaborate with industry partners for research and placement opportunities
• Publish research papers in reputable journals and conferences

Requirements:
• Ph.D. in Computer Science or related field from a recognized university
• Strong background in at least two areas: Programming Languages, Data Structures, Algorithms, Database Systems, Software Engineering, AI/ML, Cybersecurity
• Prior teaching experience preferred
• Research publications in peer-reviewed journals
• Excellent communication and interpersonal skills
• Ability to work in a multicultural academic environment`,
    shortDescription: 'Join our CS department as Assistant Professor. Teach, research, and mentor students in AI/ML, Software Engineering, and emerging technologies.',
    department: 'Computer Science',
    subject: 'Computer Science',
    instituteId: 'inst_001',
    institute: sampleInstitutes[0],
    employerId: 'emp_001',
    employer: {} as any,
    location: {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Chennai',
      city: 'Chennai',
      pincode: '600025',
      address: 'Anna University Campus, Guindy'
    },
    salary: {
      min: 60000,
      max: 85000,
      currency: 'INR',
      negotiable: true
    },
    requirements: {
      education: ['Ph.D in Computer Science', 'M.Tech Computer Science with UGC NET'],
      experience: '2-5 years of teaching and research experience',
      skills: ['Python', 'Java', 'Machine Learning', 'Data Structures', 'Algorithms', 'Database Systems'],
      certifications: ['UGC NET', 'GATE'],
      languages: ['English', 'Tamil']
    },
    responsibilities: [
      'Teach undergraduate and graduate courses',
      'Conduct cutting-edge research',
      'Supervise student projects and thesis',
      'Participate in academic committees',
      'Collaborate with industry partners',
      'Publish research papers'
    ],
    benefits: [
      'Competitive salary package',
      'Research funding support',
      'Conference attendance support',
      'Health insurance',
      'Professional development opportunities',
      'Campus accommodation (if available)'
    ],
    employmentType: 'full-time',
    workMode: 'on-site',
    applicationTypes: ['online', 'email'],
    deadline: '2024-03-15',
    positions: 2,
    isActive: true,
    isPremium: true,
    isFeatured: true,
    tags: ['computer-science', 'research', 'ai-ml', 'programming'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    viewCount: 245,
    applicationCount: 28
  },
  {
    id: 'job_002',
    title: 'Mathematics Lecturer - Higher Secondary',
    description: `Excellent opportunity for a passionate Mathematics educator to join our prestigious higher secondary school. We are looking for a dedicated teacher who can inspire students and help them excel in mathematics.

Teaching Areas:
• Algebra and Trigonometry
• Calculus and Analytical Geometry
• Statistics and Probability
• Discrete Mathematics
• Competitive Exam Preparation (JEE, NEET)

What We Offer:
• Modern classroom facilities with smart boards
• Small class sizes for personalized attention
• Continuous professional development programs
• Supportive academic environment
• Performance-based incentives`,
    shortDescription: 'Teach mathematics to higher secondary students. Focus on concept clarity, problem-solving, and competitive exam preparation.',
    department: 'Mathematics',
    subject: 'Mathematics',
    instituteId: 'inst_002',
    institute: sampleInstitutes[1],
    employerId: 'emp_002',
    employer: {} as any,
    location: {
      country: 'India',
      state: 'Tamil Nadu',
      district: 'Coimbatore',
      city: 'Coimbatore',
      pincode: '641004',
      address: 'Peelamedu, Coimbatore'
    },
    salary: {
      min: 35000,
      max: 50000,
      currency: 'INR',
      negotiable: true
    },
    requirements: {
      education: ['M.Sc Mathematics', 'B.Ed'],
      experience: '3-8 years of teaching experience in higher secondary',
      skills: ['Advanced Mathematics', 'Problem Solving', 'Exam Preparation', 'Student Counseling'],
      certifications: ['B.Ed', 'TET'],
      languages: ['English', 'Tamil']
    },
    responsibilities: [
      'Teach mathematics to classes 11 and 12',
      'Prepare students for board examinations',
      'Conduct doubt-clearing sessions',
      'Prepare and evaluate question papers',
      'Participate in parent-teacher meetings',
      'Organize mathematics clubs and competitions'
    ],
    benefits: [
      'Attractive salary package',
      'Annual bonus',
      'Health insurance',
      'Professional development support',
      'Transportation facility',
      'Annual leave benefits'
    ],
    employmentType: 'full-time',
    workMode: 'on-site',
    applicationTypes: ['online', 'walk-in'],
    deadline: '2024-02-28',
    positions: 1,
    isActive: true,
    isPremium: false,
    isFeatured: false,
    tags: ['mathematics', 'higher-secondary', 'teaching', 'education'],
    createdAt: '2024-01-20T09:30:00Z',
    updatedAt: '2024-01-20T09:30:00Z',
    viewCount: 189,
    applicationCount: 15
  },
  {
    id: 'job_003',
    title: 'Principal - Engineering College',
    description: `We are seeking an experienced academic leader to serve as Principal of our growing engineering college. The ideal candidate will have a strong academic background, proven administrative experience, and vision for educational excellence.

Leadership Responsibilities:
• Provide strategic direction for academic programs
• Oversee faculty recruitment and development
• Ensure compliance with regulatory requirements (AICTE, NBA, NAAC)
• Foster industry partnerships and collaborations
• Lead accreditation processes
• Manage budget and resources effectively
• Promote research and innovation culture

Qualifications Required:
• Ph.D. in Engineering or related field
• Professor-level academic experience (minimum 15 years)
• Prior administrative experience as HOD/Dean/Vice-Principal
• Strong research background with significant publications
• Experience in accreditation processes
• Excellent leadership and communication skills`,
    shortDescription: 'Lead our engineering college as Principal. Strategic leadership, academic excellence, and industry partnerships.',
    department: 'Administration',
    subject: 'General',
    instituteId: 'inst_003',
    institute: sampleInstitutes[2],
    employerId: 'emp_003',
    employer: {} as any,
    location: {
      country: 'India',
      state: 'Karnataka',
      district: 'Bangalore Urban',
      city: 'Bangalore',
      pincode: '560001',
      address: 'Electronics City, Bangalore'
    },
    salary: {
      min: 150000,
      max: 200000,
      currency: 'INR',
      negotiable: true
    },
    requirements: {
      education: ['Ph.D in Engineering', 'Professor Level Experience'],
      experience: '15+ years in academia with 5+ years in administration',
      skills: ['Leadership', 'Strategic Planning', 'Academic Administration', 'Budget Management'],
      certifications: ['UGC NET', 'Administrative Training'],
      languages: ['English', 'Hindi', 'Kannada']
    },
    responsibilities: [
      'Strategic planning and institutional development',
      'Academic program oversight and quality assurance',
      'Faculty recruitment and development',
      'Industry partnerships and collaborations',
      'Regulatory compliance and accreditation',
      'Budget management and resource allocation',
      'Student affairs and campus development'
    ],
    benefits: [
      'Executive compensation package',
      'Official residence',
      'Car with driver',
      'Comprehensive health insurance',
      'Research support fund',
      'Conference and travel allowances',
      'Retirement benefits'
    ],
    employmentType: 'full-time',
    workMode: 'on-site',
    applicationTypes: ['email', 'postal'],
    deadline: '2024-03-30',
    positions: 1,
    isActive: true,
    isPremium: true,
    isFeatured: true,
    tags: ['principal', 'leadership', 'administration', 'engineering'],
    createdAt: '2024-01-10T14:00:00Z',
    updatedAt: '2024-01-10T14:00:00Z',
    viewCount: 156,
    applicationCount: 8
  },
  {
    id: 'job_004',
    title: 'Physics Faculty - Polytechnic College',
    description: `Join our polytechnic college as a Physics faculty member. Teach engineering physics to diploma students and help them build strong fundamentals for their technical careers.

Course Coverage:
• Engineering Physics for first-year diploma students
• Applied Physics for various engineering branches
• Physics laboratory sessions and practicals
• Industrial physics applications
• Basic electronics and instrumentation

Teaching Methodology:
• Interactive classroom sessions
• Hands-on laboratory experiments
• Real-world applications and case studies
• Industry-relevant problem solving
• Student project guidance`,
    shortDescription: 'Teach engineering physics to diploma students. Focus on practical applications and laboratory work.',
    department: 'Applied Sciences',
    subject: 'Physics',
    instituteId: 'inst_004',
    institute: sampleInstitutes[3],
    employerId: 'emp_004',
    employer: {} as any,
    location: {
      country: 'India',
      state: 'Kerala',
      district: 'Thiruvananthapuram',
      city: 'Thiruvananthapuram',
      pincode: '695001',
      address: 'Pattom, Thiruvananthapuram'
    },
    salary: {
      min: 30000,
      max: 42000,
      currency: 'INR',
      negotiable: false
    },
    requirements: {
      education: ['M.Sc Physics', 'B.Ed (preferred)'],
      experience: '2-5 years teaching experience in polytechnic or engineering college',
      skills: ['Physics Fundamentals', 'Laboratory Skills', 'Student Mentoring'],
      certifications: ['NET/SET (preferred)'],
      languages: ['English', 'Malayalam']
    },
    responsibilities: [
      'Teach physics to diploma students',
      'Conduct laboratory sessions',
      'Prepare lecture notes and assignments',
      'Evaluate student performance',
      'Participate in curriculum development',
      'Guide student projects'
    ],
    benefits: [
      'Government scale salary',
      'Medical benefits',
      'Provident fund',
      'Annual increments',
      'Leave benefits as per rules',
      'Training opportunities'
    ],
    employmentType: 'full-time',
    workMode: 'on-site',
    applicationTypes: ['online', 'postal'],
    deadline: '2024-02-20',
    positions: 1,
    isActive: true,
    isPremium: false,
    isFeatured: false,
    tags: ['physics', 'polytechnic', 'diploma', 'laboratory'],
    createdAt: '2024-01-18T11:15:00Z',
    updatedAt: '2024-01-18T11:15:00Z',
    viewCount: 98,
    applicationCount: 12
  },
  {
    id: 'job_005',
    title: 'Electrical Engineering Professor',
    description: `Prestigious position for an experienced Electrical Engineering Professor to join our top-ranked engineering college. Lead research initiatives, teach advanced courses, and mentor the next generation of engineers.

Research Areas:
• Power Systems and Smart Grid
• Renewable Energy Technologies
• Electric Vehicles and Charging Infrastructure
• Control Systems and Automation
• Power Electronics and Drives

Academic Responsibilities:
• Teach UG and PG courses in electrical engineering
• Supervise doctoral and master's research
• Lead sponsored research projects
• Establish industry collaborations
• Mentor junior faculty members`,
    shortDescription: 'Senior faculty position in Electrical Engineering. Research leadership, advanced teaching, and industry collaboration.',
    department: 'Electrical Engineering',
    subject: 'Electrical Engineering',
    instituteId: 'inst_005',
    institute: sampleInstitutes[4],
    employerId: 'emp_005',
    employer: {} as any,
    location: {
      country: 'India',
      state: 'Maharashtra',
      district: 'Mumbai City',
      city: 'Mumbai',
      pincode: '400076',
      address: 'Powai, Mumbai'
    },
    salary: {
      min: 120000,
      max: 160000,
      currency: 'INR',
      negotiable: true
    },
    requirements: {
      education: ['Ph.D in Electrical Engineering', 'Professor Level Experience'],
      experience: '12+ years in academia and research',
      skills: ['Power Systems', 'Renewable Energy', 'Research Leadership', 'Grant Writing'],
      certifications: ['Professional Engineer License (preferred)'],
      languages: ['English', 'Hindi', 'Marathi']
    },
    responsibilities: [
      'Teach advanced electrical engineering courses',
      'Lead cutting-edge research projects',
      'Supervise doctoral students',
      'Secure research funding and grants',
      'Establish industry partnerships',
      'Publish in top-tier journals',
      'Mentor junior faculty'
    ],
    benefits: [
      'Professor-level compensation',
      'Research startup fund',
      'Laboratory space and equipment',
      'Conference travel support',
      'Health and life insurance',
      'Housing assistance',
      'Sabbatical leave opportunities'
    ],
    employmentType: 'full-time',
    workMode: 'on-site',
    applicationTypes: ['online', 'email'],
    deadline: '2024-04-15',
    positions: 1,
    isActive: true,
    isPremium: true,
    isFeatured: true,
    tags: ['electrical-engineering', 'professor', 'research', 'power-systems'],
    createdAt: '2024-01-08T13:45:00Z',
    updatedAt: '2024-01-08T13:45:00Z',
    viewCount: 203,
    applicationCount: 18
  },
  {
    id: 'job_006',
    title: 'Chemistry Teacher - Higher Secondary School',
    description: `Opportunity for a passionate Chemistry teacher to join our CBSE affiliated higher secondary school. Create engaging learning experiences and prepare students for competitive examinations.

Teaching Requirements:
• Chemistry for classes 11 and 12 (CBSE curriculum)
• Practical laboratory sessions
• Competitive exam preparation (JEE, NEET)
• Concept clarity and problem-solving focus
• Student assessment and evaluation

School Features:
• Well-equipped chemistry laboratories
• Smart classroom technology
• Small class sizes (maximum 25 students)
• Experienced teaching staff
• Strong academic track record`,
    shortDescription: 'Teach chemistry to higher secondary students. CBSE curriculum, lab work, and competitive exam preparation.',
    department: 'Science',
    subject: 'Chemistry',
    instituteId: 'inst_006',
    institute: sampleInstitutes[5],
    employerId: 'emp_006',
    employer: {} as any,
    location: {
      country: 'India',
      state: 'Gujarat',
      district: 'Ahmedabad',
      city: 'Ahmedabad',
      pincode: '380009',
      address: 'Navrangpura, Ahmedabad'
    },
    salary: {
      min: 28000,
      max: 40000,
      currency: 'INR',
      negotiable: true
    },
    requirements: {
      education: ['M.Sc Chemistry', 'B.Ed'],
      experience: '2-6 years teaching experience in CBSE schools',
      skills: ['Chemistry Fundamentals', 'Laboratory Skills', 'Exam Preparation'],
      certifications: ['B.Ed', 'TET/CTET'],
      languages: ['English', 'Hindi', 'Gujarati']
    },
    responsibilities: [
      'Teach chemistry to classes 11 and 12',
      'Conduct laboratory experiments',
      'Prepare students for board exams',
      'Organize science exhibitions',
      'Maintain laboratory equipment',
      'Parent-teacher interactions'
    ],
    benefits: [
      'Competitive salary',
      'Annual performance bonus',
      'Health insurance',
      'Professional development',
      'Transportation facility',
      'Summer vacation benefits'
    ],
    employmentType: 'full-time',
    workMode: 'on-site',
    applicationTypes: ['online', 'walk-in'],
    deadline: '2024-03-01',
    positions: 1,
    isActive: true,
    isPremium: false,
    isFeatured: false,
    tags: ['chemistry', 'higher-secondary', 'cbse', 'laboratory'],
    createdAt: '2024-01-22T10:30:00Z',
    updatedAt: '2024-01-22T10:30:00Z',
    viewCount: 145,
    applicationCount: 19
  },
  {
    id: 'job_007',
    title: 'Mechanical Engineering Associate Professor',
    description: `Join our mechanical engineering department as Associate Professor. Contribute to academic excellence through teaching, research, and industry collaboration.

Specialization Areas:
• Thermal Engineering and Heat Transfer
• Manufacturing and Production Technology
• CAD/CAM and Design Engineering
• Automotive Engineering
• Renewable Energy Systems

Research Opportunities:
• Industry-sponsored projects
• Government funding through DST, AICTE
• International collaborations
• Patent filing support
• State-of-the-art laboratory facilities`,
    shortDescription: 'Associate Professor position in Mechanical Engineering. Research in thermal systems, manufacturing, and automotive engineering.',
    department: 'Mechanical Engineering',
    subject: 'Mechanical Engineering',
    instituteId: 'inst_007',
    institute: sampleInstitutes[6],
    employerId: 'emp_007',
    employer: {} as any,
    location: {
      country: 'India',
      state: 'Rajasthan',
      district: 'Jaipur',
      city: 'Jaipur',
      pincode: '302017',
      address: 'Malviya Nagar, Jaipur'
    },
    salary: {
      min: 80000,
      max: 110000,
      currency: 'INR',
      negotiable: true
    },
    requirements: {
      education: ['Ph.D in Mechanical Engineering', 'Associate Professor Level'],
      experience: '8-12 years in academia and research',
      skills: ['Thermal Systems', 'Manufacturing', 'CAD/CAM', 'Research Methods'],
      certifications: ['UGC NET', 'Professional Certifications'],
      languages: ['English', 'Hindi']
    },
    responsibilities: [
      'Teach undergraduate and postgraduate courses',
      'Supervise M.Tech and Ph.D students',
      'Conduct funded research projects',
      'Collaborate with industry partners',
      'Publish research papers',
      'Participate in academic administration'
    ],
    benefits: [
      'UGC pay scale',
      'Research grants',
      'Conference funding',
      'Health benefits',
      'House rent allowance',
      'Professional development support'
    ],
    employmentType: 'full-time',
    workMode: 'on-site',
    applicationTypes: ['online', 'email'],
    deadline: '2024-03-20',
    positions: 1,
    isActive: true,
    isPremium: true,
    isFeatured: false,
    tags: ['mechanical-engineering', 'associate-professor', 'research', 'thermal'],
    createdAt: '2024-01-12T16:20:00Z',
    updatedAt: '2024-01-12T16:20:00Z',
    viewCount: 167,
    applicationCount: 14
  },
  {
    id: 'job_008',
    title: 'English Literature Professor',
    description: `Seeking an accomplished English Literature Professor to join our prestigious Arts college. Teach diverse literary works, guide research scholars, and contribute to the literary community.

Areas of Expertise:
• British and American Literature
• Postcolonial Literature
• Comparative Literature
• Literary Criticism and Theory
• Creative Writing

Academic Environment:
• Rich library resources
• Regular literary events and seminars
• Research publication support
• Visiting scholar programs
• International academic exchanges`,
    shortDescription: 'Professor position in English Literature. Teach diverse literary works and guide research in postcolonial studies.',
    department: 'English',
    subject: 'English Literature',
    instituteId: 'inst_008',
    institute: sampleInstitutes[7],
    employerId: 'emp_008',
    employer: {} as any,
    location: {
      country: 'India',
      state: 'West Bengal',
      district: 'Kolkata',
      city: 'Kolkata',
      pincode: '700073',
      address: 'Salt Lake, Kolkata'
    },
    salary: {
      min: 75000,
      max: 100000,
      currency: 'INR',
      negotiable: true
    },
    requirements: {
      education: ['Ph.D in English Literature', 'Professor Level Experience'],
      experience: '10+ years in teaching and research',
      skills: ['Literary Analysis', 'Research Writing', 'Critical Theory', 'Academic Publishing'],
      certifications: ['UGC NET', 'Research Publications'],
      languages: ['English', 'Bengali', 'Hindi']
    },
    responsibilities: [
      'Teach literature courses at UG and PG levels',
      'Supervise research scholars',
      'Conduct literary research',
      'Organize literary events',
      'Collaborate with literary institutions',
      'Publish academic papers'
    ],
    benefits: [
      'Professor-level salary',
      'Research support',
      'Library privileges',
      'Conference participation',
      'Health insurance',
      'Academic leave provisions'
    ],
    employmentType: 'full-time',
    workMode: 'on-site',
    applicationTypes: ['online', 'postal'],
    deadline: '2024-04-05',
    positions: 1,
    isActive: true,
    isPremium: false,
    isFeatured: true,
    tags: ['english-literature', 'professor', 'research', 'literary-criticism'],
    createdAt: '2024-01-05T12:00:00Z',
    updatedAt: '2024-01-05T12:00:00Z',
    viewCount: 134,
    applicationCount: 11
  },
  {
    id: 'job_009',
    title: 'Civil Engineering Assistant Professor',
    description: `Exciting opportunity for a Civil Engineering Assistant Professor to join our growing department. Focus on structural engineering, transportation, and sustainable construction practices.

Core Areas:
• Structural Analysis and Design
• Transportation Engineering
• Environmental Engineering
• Geotechnical Engineering
• Construction Management

Laboratory Facilities:
• Structural testing laboratory
• Materials testing equipment
• Soil mechanics laboratory
• Highway engineering lab
• Survey instruments and total stations`,
    shortDescription: 'Assistant Professor in Civil Engineering. Structural design, transportation, and environmental engineering focus.',
    department: 'Civil Engineering',
    subject: 'Civil Engineering',
    instituteId: 'inst_009',
    institute: sampleInstitutes[8],
    employerId: 'emp_009',
    employer: {} as any,
    location: {
      country: 'India',
      state: 'Andhra Pradesh',
      district: 'Visakhapatnam',
      city: 'Visakhapatnam',
      pincode: '530003',
      address: 'MVP Colony, Visakhapatnam'
    },
    salary: {
      min: 55000,
      max: 75000,
      currency: 'INR',
      negotiable: true
    },
    requirements: {
      education: ['Ph.D in Civil Engineering', 'M.Tech with NET'],
      experience: '2-5 years in academia or industry',
      skills: ['Structural Design', 'AutoCAD', 'STAAD Pro', 'Transportation Planning'],
      certifications: ['UGC NET', 'Professional Engineer (preferred)'],
      languages: ['English', 'Telugu', 'Hindi']
    },
    responsibilities: [
      'Teach civil engineering subjects',
      'Guide student projects',
      'Conduct research in core areas',
      'Supervise laboratory work',
      'Industry consultancy projects',
      'Academic administration duties'
    ],
    benefits: [
      'Assistant Professor scale',
      'Research funding opportunities',
      'Industry project income',
      'Health and life insurance',
      'Professional development',
      'Conference support'
    ],
    employmentType: 'full-time',
    workMode: 'on-site',
    applicationTypes: ['online', 'email'],
    deadline: '2024-02-25',
    positions: 2,
    isActive: true,
    isPremium: false,
    isFeatured: false,
    tags: ['civil-engineering', 'assistant-professor', 'structural', 'transportation'],
    createdAt: '2024-01-19T14:45:00Z',
    updatedAt: '2024-01-19T14:45:00Z',
    viewCount: 178,
    applicationCount: 22
  },
  {
    id: 'job_010',
    title: 'Electronics Engineering Faculty',
    description: `Join our Electronics and Communication Engineering department as faculty member. Engage in teaching, research, and development of next-generation electronic systems.

Technical Areas:
• VLSI Design and Embedded Systems
• Communication Systems and Networks
• Signal Processing and IoT
• Robotics and Automation
• Microprocessors and Microcontrollers

Research Focus:
• Industry 4.0 technologies
• Wireless sensor networks
• Machine learning in electronics
• Green electronics and sustainability
• Biomedical electronics applications`,
    shortDescription: 'Electronics Engineering faculty position. VLSI, communication systems, IoT, and embedded systems expertise.',
    department: 'Electronics and Communication',
    subject: 'Electronics Engineering',
    instituteId: 'inst_010',
    institute: sampleInstitutes[9],
    employerId: 'emp_010',
    employer: {} as any,
    location: {
      country: 'India',
      state: 'Telangana',
      district: 'Hyderabad',
      city: 'Hyderabad',
      pincode: '500085',
      address: 'Gachibowli, Hyderabad'
    },
    salary: {
      min: 65000,
      max: 90000,
      currency: 'INR',
      negotiable: true
    },
    requirements: {
      education: ['Ph.D in Electronics/ECE', 'M.Tech with research experience'],
      experience: '3-7 years in academia or R&D',
      skills: ['VLSI Design', 'Embedded Systems', 'Communication Protocols', 'PCB Design'],
      certifications: ['Professional certifications in relevant areas'],
      languages: ['English', 'Telugu', 'Hindi']
    },
    responsibilities: [
      'Teach electronics engineering courses',
      'Develop practical laboratory sessions',
      'Guide final year projects',
      'Conduct applied research',
      'Industry collaboration projects',
      'Student mentoring and placement support'
    ],
    benefits: [
      'Competitive academic salary',
      'Research project funding',
      'Modern laboratory access',
      'Industry interaction opportunities',
      'Health benefits package',
      'Skill development programs'
    ],
    employmentType: 'full-time',
    workMode: 'on-site',
    applicationTypes: ['online', 'walk-in'],
    deadline: '2024-03-10',
    positions: 1,
    isActive: true,
    isPremium: true,
    isFeatured: false,
    tags: ['electronics', 'vlsi', 'embedded-systems', 'communication'],
    createdAt: '2024-01-16T11:30:00Z',
    updatedAt: '2024-01-16T11:30:00Z',
    viewCount: 192,
    applicationCount: 17
  }
  // Adding 40 more jobs to reach 50+ total...
  // Continue with similar detailed job postings for various disciplines
];

// Helper function to generate more jobs programmatically
export const generateAdditionalJobs = (): Job[] => {
  const subjects = [
    'Biology', 'Chemistry', 'Physics', 'Mathematics', 'Economics', 
    'Psychology', 'Sociology', 'History', 'Geography', 'Political Science',
    'Business Administration', 'Marketing', 'Finance', 'Human Resources',
    'Information Technology', 'Data Science', 'Artificial Intelligence',
    'Biotechnology', 'Environmental Science', 'Agriculture Engineering',
    'Food Technology', 'Textile Engineering', 'Automobile Engineering',
    'Aerospace Engineering', 'Chemical Engineering', 'Petroleum Engineering'
  ];

  const positions = [
    'Assistant Professor', 'Associate Professor', 'Professor', 'Lecturer',
    'Senior Lecturer', 'Principal', 'Vice Principal', 'Dean', 'Head of Department'
  ];

  const additionalJobs: Job[] = [];
  
  for (let i = 11; i <= 50; i++) {
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const position = positions[Math.floor(Math.random() * positions.length)];
    const institute = sampleInstitutes[Math.floor(Math.random() * sampleInstitutes.length)];
    
    additionalJobs.push({
      id: `job_${i.toString().padStart(3, '0')}`,
      title: `${position} - ${subject}`,
      description: `Seeking a qualified ${position} for ${subject} department. Excellent opportunity for academic growth and research.`,
      shortDescription: `${position} position in ${subject}. Teaching, research, and student mentoring opportunities.`,
      department: subject,
      subject: subject,
      instituteId: institute.id,
      institute: institute,
      employerId: `emp_${i.toString().padStart(3, '0')}`,
      employer: {} as any,
      location: institute.location,
      salary: {
        min: Math.floor(Math.random() * 50000) + 30000,
        max: Math.floor(Math.random() * 80000) + 50000,
        currency: 'INR',
        negotiable: Math.random() > 0.5
      },
      requirements: {
        education: [`Ph.D in ${subject}`, `M.Tech/M.Sc in ${subject}`],
        experience: `${Math.floor(Math.random() * 10) + 1}-${Math.floor(Math.random() * 10) + 5} years`,
        skills: [subject, 'Teaching', 'Research', 'Student Mentoring'],
        certifications: ['UGC NET', 'Ph.D'],
        languages: ['English', 'Hindi']
      },
      responsibilities: [
        `Teach ${subject} courses`,
        'Conduct research',
        'Guide student projects',
        'Participate in academic activities'
      ],
      benefits: [
        'Competitive salary',
        'Research support',
        'Health insurance',
        'Professional development'
      ],
      employmentType: 'full-time',
      workMode: 'on-site',
      applicationTypes: ['online'],
      deadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      positions: Math.floor(Math.random() * 3) + 1,
      isActive: true,
      isPremium: Math.random() > 0.7,
      isFeatured: Math.random() > 0.8,
      tags: [subject.toLowerCase(), position.toLowerCase().replace(' ', '-'), 'academic'],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      viewCount: Math.floor(Math.random() * 300),
      applicationCount: Math.floor(Math.random() * 50)
    });
  }
  
  return additionalJobs;
};

// Combine initial jobs with generated ones
export const allSampleJobs = [...sampleJobs, ...generateAdditionalJobs()];
