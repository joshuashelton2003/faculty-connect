// ==========================================
// FacultyConnect - Sample Applications Data
// Tamil Nadu Candidate Profiles
// ==========================================

import { Application, Candidate, ApplicationStatus } from '@/types';

// Tamil Nadu Sample Candidates with Realistic Profiles
export const tamilNaduCandidates: Candidate[] = [
  {
    id: 'cand_001',
    email: 'aravind.kumar@email.com',
    name: 'Dr. Aravind Kumar S',
    phone: '+91 9876543210',
    role: 'candidate',
    profileImage: '',
    isVerified: true,
    createdAt: '2023-08-15T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
    profile: {
      firstName: 'Aravind',
      lastName: 'Kumar S',
      bio: 'Experienced mechanical engineering professional with expertise in thermal systems and manufacturing. Passionate about research in renewable energy applications and sustainable manufacturing processes.',
      location: {
        country: 'India',
        state: 'Tamil Nadu',
        district: 'Chennai',
        city: 'Chennai',
        pincode: '600028',
        address: 'T. Nagar, Chennai'
      },
      qualifications: ['Ph.D Mechanical Engineering', 'M.E Thermal Engineering', 'B.E Mechanical Engineering'],
      experience: [
        {
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
          description: 'Taught thermal engineering subjects and supervised student projects in renewable energy systems.',
          achievements: ['Published 8 research papers', 'Guided 15 M.E projects', 'Received Best Faculty Award 2022'],
          skills: ['Thermal Systems', 'Heat Transfer', 'Manufacturing', 'Research']
        }
      ],
      education: [
        {
          id: 'edu_001',
          degree: 'Ph.D',
          field: 'Mechanical Engineering',
          institution: 'Anna University',
          university: 'Anna University',
          location: {
            country: 'India',
            state: 'Tamil Nadu',
            district: 'Chennai',
            city: 'Chennai',
            pincode: '600025'
          },
          startDate: '2016-08-01',
          endDate: '2020-05-31',
          grade: '8.9',
          gradeType: 'cgpa',
          achievements: ['University Gold Medal', 'Best Thesis Award'],
          specialization: 'Thermal Engineering and Renewable Energy'
        },
        {
          id: 'edu_002',
          degree: 'M.E',
          field: 'Thermal Engineering',
          institution: 'PSG College of Technology',
          university: 'Anna University',
          location: {
            country: 'India',
            state: 'Tamil Nadu',
            district: 'Coimbatore',
            city: 'Coimbatore',
            pincode: '641004'
          },
          startDate: '2014-08-01',
          endDate: '2016-05-31',
          grade: '9.2',
          gradeType: 'cgpa',
          achievements: ['First Class with Distinction'],
          specialization: 'Heat Transfer and Thermal Systems'
        }
      ],
      skills: ['Thermal Engineering', 'Heat Transfer', 'Manufacturing Technology', 'CAD/CAM', 'Research Methodology', 'Project Management'],
      certifications: [
        {
          id: 'cert_001',
          name: 'UGC NET',
          issuingOrganization: 'National Testing Agency',
          issueDate: '2020-01-15',
          credentialId: 'NET2020ME001',
          skills: ['Teaching Eligibility', 'Research Aptitude']
        }
      ],
      resume: {
        id: 'resume_001',
        originalName: 'Aravind_Kumar_Resume.pdf',
        fileName: 'aravind_kumar_resume_20240110.pdf',
        size: 245760,
        mimeType: 'application/pdf',
        url: '/uploads/resumes/aravind_kumar_resume_20240110.pdf',
        uploadedAt: '2024-01-10T10:00:00Z'
      },
      expectedSalary: {
        min: 70000,
        max: 90000,
        currency: 'INR'
      },
      availability: '1-month',
      references: [
        {
          id: 'ref_001',
          name: 'Dr. Rajesh Kannan',
          designation: 'Professor and Head',
          organization: 'PSG College of Technology',
          email: 'rajesh.kannan@psgtech.edu',
          phone: '+91 9876543211',
          relationship: 'Former Supervisor',
          yearsKnown: 4
        }
      ],
      languages: ['English', 'Tamil', 'Hindi']
    }
  },
  {
    id: 'cand_002',
    email: 'meena.priya@email.com',
    name: 'Dr. Meena Priya R',
    phone: '+91 9876543211',
    role: 'candidate',
    profileImage: '',
    isVerified: true,
    createdAt: '2023-09-20T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z',
    profile: {
      firstName: 'Meena',
      lastName: 'Priya R',
      bio: 'Chemistry educator and researcher with specialization in organic chemistry and environmental chemistry. Committed to innovative teaching methods and sustainable chemical processes.',
      location: {
        country: 'India',
        state: 'Tamil Nadu',
        district: 'Madurai',
        city: 'Madurai',
        pincode: '625002',
        address: 'Anna Nagar, Madurai'
      },
      qualifications: ['Ph.D Chemistry', 'M.Sc Chemistry', 'B.Sc Chemistry'],
      experience: [
        {
          id: 'exp_002',
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
          startDate: '2021-07-01',
          endDate: '2024-01-31',
          isCurrent: false,
          description: 'Taught organic chemistry and environmental chemistry to undergraduate students.',
          achievements: ['Student feedback rating: 4.8/5', 'Organized chemistry workshop'],
          skills: ['Organic Chemistry', 'Environmental Chemistry', 'Teaching', 'Laboratory Management']
        }
      ],
      education: [
        {
          id: 'edu_003',
          degree: 'Ph.D',
          field: 'Chemistry',
          institution: 'Madurai Kamaraj University',
          university: 'Madurai Kamaraj University',
          location: {
            country: 'India',
            state: 'Tamil Nadu',
            district: 'Madurai',
            city: 'Madurai',
            pincode: '625021'
          },
          startDate: '2017-08-01',
          endDate: '2021-06-30',
          grade: '8.7',
          gradeType: 'cgpa',
          achievements: ['Research Excellence Award'],
          specialization: 'Organic and Environmental Chemistry'
        }
      ],
      skills: ['Organic Chemistry', 'Environmental Chemistry', 'Analytical Chemistry', 'Research Methodology', 'Laboratory Techniques'],
      certifications: [
        {
          id: 'cert_002',
          name: 'UGC NET',
          issuingOrganization: 'National Testing Agency',
          issueDate: '2021-03-20',
          credentialId: 'NET2021CH002',
          skills: ['Teaching Eligibility', 'Research Aptitude']
        }
      ],
      resume: {
        id: 'resume_002',
        originalName: 'Meena_Priya_Resume.pdf',
        fileName: 'meena_priya_resume_20240108.pdf',
        size: 198432,
        mimeType: 'application/pdf',
        url: '/uploads/resumes/meena_priya_resume_20240108.pdf',
        uploadedAt: '2024-01-08T10:00:00Z'
      },
      expectedSalary: {
        min: 45000,
        max: 65000,
        currency: 'INR'
      },
      availability: 'immediate',
      references: [
        {
          id: 'ref_002',
          name: 'Dr. Kamala Devi',
          designation: 'Professor',
          organization: 'Madurai Kamaraj University',
          email: 'kamala.devi@mkuniversity.org',
          phone: '+91 9876543212',
          relationship: 'Ph.D Supervisor',
          yearsKnown: 4
        }
      ],
      languages: ['English', 'Tamil']
    }
  },
  {
    id: 'cand_003',
    email: 'vasanth.kannan@email.com',
    name: 'Vasanth Kannan M',
    phone: '+91 9876543212',
    role: 'candidate',
    profileImage: '',
    isVerified: true,
    createdAt: '2023-07-10T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z',
    profile: {
      firstName: 'Vasanth',
      lastName: 'Kannan M',
      bio: 'Electronics and Communication Engineering graduate with industry experience in embedded systems and IoT. Passionate about bridging the gap between academia and industry.',
      location: {
        country: 'India',
        state: 'Tamil Nadu',
        district: 'Coimbatore',
        city: 'Coimbatore',
        pincode: '641014',
        address: 'Saravanampatti, Coimbatore'
      },
      qualifications: ['M.E Electronics and Communication', 'B.E Electronics and Communication'],
      experience: [
        {
          id: 'exp_003',
          designation: 'Senior Electronics Engineer',
          organization: 'Tata Consultancy Services',
          organizationType: 'training-center',
          location: {
            country: 'India',
            state: 'Tamil Nadu',
            district: 'Chennai',
            city: 'Chennai',
            pincode: '600113'
          },
          startDate: '2018-07-01',
          endDate: '2023-12-31',
          isCurrent: false,
          description: 'Worked on embedded systems projects and IoT solutions for industrial automation.',
          achievements: ['Led 5 successful projects', 'Patent filed for IoT device', 'Team Lead for 2 years'],
          skills: ['Embedded Systems', 'IoT', 'C/C++', 'Python', 'Project Management']
        }
      ],
      education: [
        {
          id: 'edu_004',
          degree: 'M.E',
          field: 'Electronics and Communication Engineering',
          institution: 'Coimbatore Institute of Technology',
          university: 'Anna University',
          location: {
            country: 'India',
            state: 'Tamil Nadu',
            district: 'Coimbatore',
            city: 'Coimbatore',
            pincode: '641014'
          },
          startDate: '2016-08-01',
          endDate: '2018-05-31',
          grade: '8.8',
          gradeType: 'cgpa',
          achievements: ['Department Rank 2'],
          specialization: 'VLSI and Embedded Systems'
        }
      ],
      skills: ['Embedded Systems', 'VLSI Design', 'IoT', 'C/C++', 'Python', 'PCB Design', 'Teaching'],
      certifications: [
        {
          id: 'cert_003',
          name: 'Certified Embedded Systems Professional',
          issuingOrganization: 'IETE',
          issueDate: '2019-09-15',
          credentialId: 'CESP2019003',
          skills: ['Embedded Systems', 'Microcontrollers']
        }
      ],
      resume: {
        id: 'resume_003',
        originalName: 'Vasanth_Kannan_Resume.pdf',
        fileName: 'vasanth_kannan_resume_20240112.pdf',
        size: 287654,
        mimeType: 'application/pdf',
        url: '/uploads/resumes/vasanth_kannan_resume_20240112.pdf',
        uploadedAt: '2024-01-12T10:00:00Z'
      },
      expectedSalary: {
        min: 55000,
        max: 75000,
        currency: 'INR'
      },
      availability: '2-months',
      references: [
        {
          id: 'ref_003',
          name: 'Mr. Senthil Kumar',
          designation: 'Project Manager',
          organization: 'Tata Consultancy Services',
          email: 'senthil.kumar@tcs.com',
          phone: '+91 9876543213',
          relationship: 'Former Manager',
          yearsKnown: 3
        }
      ],
      languages: ['English', 'Tamil', 'Hindi']
    }
  },
  {
    id: 'cand_004',
    email: 'lakshmi.narayanan@email.com',
    name: 'Dr. Lakshmi Narayanan K',
    phone: '+91 9876543213',
    role: 'candidate',
    profileImage: '',
    isVerified: true,
    createdAt: '2023-11-05T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    profile: {
      firstName: 'Lakshmi',
      lastName: 'Narayanan K',
      bio: 'English literature scholar with research interests in postcolonial literature and Tamil literary traditions. Experienced in comparative literature and cultural studies.',
      location: {
        country: 'India',
        state: 'Tamil Nadu',
        district: 'Thanjavur',
        city: 'Thanjavur',
        pincode: '613005',
        address: 'Medical College Road, Thanjavur'
      },
      qualifications: ['Ph.D English Literature', 'M.A English Literature', 'B.A English Literature'],
      experience: [
        {
          id: 'exp_004',
          designation: 'Assistant Professor',
          organization: 'Bharathidasan University',
          organizationType: 'university',
          location: {
            country: 'India',
            state: 'Tamil Nadu',
            district: 'Tiruchirappalli',
            city: 'Tiruchirappalli',
            pincode: '620024'
          },
          startDate: '2019-08-01',
          endDate: '2023-12-31',
          isCurrent: false,
          description: 'Taught English literature courses and supervised research scholars in postcolonial studies.',
          achievements: ['Published 12 research papers', 'Organized international conference', 'Ph.D guide for 3 scholars'],
          skills: ['Literary Criticism', 'Postcolonial Studies', 'Research', 'Academic Writing']
        }
      ],
      education: [
        {
          id: 'edu_005',
          degree: 'Ph.D',
          field: 'English Literature',
          institution: 'University of Madras',
          university: 'University of Madras',
          location: {
            country: 'India',
            state: 'Tamil Nadu',
            district: 'Chennai',
            city: 'Chennai',
            pincode: '600005'
          },
          startDate: '2015-08-01',
          endDate: '2019-07-31',
          grade: '8.6',
          gradeType: 'cgpa',
          achievements: ['University Research Fellowship'],
          specialization: 'Postcolonial Literature and Cultural Studies'
        }
      ],
      skills: ['English Literature', 'Literary Criticism', 'Postcolonial Studies', 'Research Methodology', 'Academic Writing', 'Comparative Literature'],
      certifications: [
        {
          id: 'cert_004',
          name: 'UGC NET',
          issuingOrganization: 'National Testing Agency',
          issueDate: '2019-01-20',
          credentialId: 'NET2019EN004',
          skills: ['Teaching Eligibility', 'Research Aptitude']
        }
      ],
      resume: {
        id: 'resume_004',
        originalName: 'Lakshmi_Narayanan_Resume.pdf',
        fileName: 'lakshmi_narayanan_resume_20240115.pdf',
        size: 312456,
        mimeType: 'application/pdf',
        url: '/uploads/resumes/lakshmi_narayanan_resume_20240115.pdf',
        uploadedAt: '2024-01-15T10:00:00Z'
      },
      expectedSalary: {
        min: 60000,
        max: 80000,
        currency: 'INR'
      },
      availability: '1-month',
      references: [
        {
          id: 'ref_004',
          name: 'Dr. Chitra Sankaran',
          designation: 'Professor',
          organization: 'University of Madras',
          email: 'chitra.sankaran@unom.ac.in',
          phone: '+91 9876543214',
          relationship: 'Ph.D Supervisor',
          yearsKnown: 5
        }
      ],
      languages: ['English', 'Tamil', 'Hindi']
    }
  },
  {
    id: 'cand_005',
    email: 'shankar.mathematics@email.com',
    name: 'Shankar Raman P',
    phone: '+91 9876543214',
    role: 'candidate',
    profileImage: '',
    isVerified: true,
    createdAt: '2023-06-15T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z',
    profile: {
      firstName: 'Shankar',
      lastName: 'Raman P',
      bio: 'Mathematics educator with expertise in advanced calculus, discrete mathematics, and mathematical modeling. Passionate about making mathematics accessible and engaging for students.',
      location: {
        country: 'India',
        state: 'Tamil Nadu',
        district: 'Salem',
        city: 'Salem',
        pincode: '636005',
        address: 'Five Roads, Salem'
      },
      qualifications: ['M.Sc Mathematics', 'B.Sc Mathematics', 'B.Ed'],
      experience: [
        {
          id: 'exp_005',
          designation: 'Mathematics Teacher',
          organization: 'DAV Boys Senior Secondary School',
          organizationType: 'school',
          location: {
            country: 'India',
            state: 'Tamil Nadu',
            district: 'Chennai',
            city: 'Chennai',
            pincode: '600028'
          },
          startDate: '2017-06-01',
          endDate: '2023-12-31',
          isCurrent: false,
          description: 'Taught mathematics to higher secondary students and prepared them for competitive exams.',
          achievements: ['100% pass rate in board exams', 'Best Teacher Award 2022', 'JEE coaching expertise'],
          skills: ['Advanced Mathematics', 'Problem Solving', 'Exam Preparation', 'Student Counseling']
        }
      ],
      education: [
        {
          id: 'edu_006',
          degree: 'M.Sc',
          field: 'Mathematics',
          institution: 'Periyar University',
          university: 'Periyar University',
          location: {
            country: 'India',
            state: 'Tamil Nadu',
            district: 'Salem',
            city: 'Salem',
            pincode: '636011'
          },
          startDate: '2015-08-01',
          endDate: '2017-05-31',
          grade: '89',
          gradeType: 'percentage',
          achievements: ['First Class with Distinction'],
          specialization: 'Pure Mathematics'
        }
      ],
      skills: ['Advanced Mathematics', 'Calculus', 'Discrete Mathematics', 'Problem Solving', 'Teaching Methodology', 'Student Assessment'],
      certifications: [
        {
          id: 'cert_005',
          name: 'TET',
          issuingOrganization: 'Tamil Nadu Government',
          issueDate: '2017-08-15',
          credentialId: 'TET2017MT005',
          skills: ['Teaching Eligibility']
        }
      ],
      resume: {
        id: 'resume_005',
        originalName: 'Shankar_Raman_Resume.pdf',
        fileName: 'shankar_raman_resume_20240118.pdf',
        size: 245890,
        mimeType: 'application/pdf',
        url: '/uploads/resumes/shankar_raman_resume_20240118.pdf',
        uploadedAt: '2024-01-18T10:00:00Z'
      },
      expectedSalary: {
        min: 40000,
        max: 55000,
        currency: 'INR'
      },
      availability: 'immediate',
      references: [
        {
          id: 'ref_005',
          name: 'Mr. Karthik Selvan',
          designation: 'Principal',
          organization: 'DAV Boys Senior Secondary School',
          email: 'principal@davchennai.edu',
          phone: '+91 9876543215',
          relationship: 'Former Principal',
          yearsKnown: 6
        }
      ],
      languages: ['English', 'Tamil', 'Hindi']
    }
  }
];

// Sample Applications Data
export const sampleApplications: Application[] = [
  {
    id: 'app_001',
    jobId: 'job_001',
    job: {} as any, // Will be populated from jobs store
    candidateId: 'cand_001',
    candidate: tamilNaduCandidates[0],
    applicationDate: '2024-01-20T10:30:00Z',
    status: 'shortlisted',
    coverLetter: 'I am excited to apply for the Assistant Professor position in Computer Science. My research background in thermal engineering and renewable energy systems, combined with my teaching experience at PSG College of Technology, makes me a strong candidate for this role. I am particularly interested in contributing to the department\'s research initiatives in sustainable technologies.',
    resume: tamilNaduCandidates[0].profile.resume!,
    additionalDocuments: [
      {
        id: 'doc_001',
        originalName: 'Research_Publications.pdf',
        fileName: 'aravind_research_publications.pdf',
        size: 1024567,
        mimeType: 'application/pdf',
        url: '/uploads/documents/aravind_research_publications.pdf',
        uploadedAt: '2024-01-20T10:30:00Z'
      }
    ],
    answers: [
      {
        question: 'Why do you want to join our institution?',
        answer: 'Anna University has an excellent reputation for research and innovation in engineering. I believe my research interests align well with the department\'s focus areas.',
        type: 'text'
      }
    ],
    employerNotes: 'Strong candidate with good research background. Shortlisted for interview.',
    salaryExpectation: {
      amount: 80000,
      currency: 'INR'
    },
    availabilityDate: '2024-03-01',
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-22T14:20:00Z'
  },
  {
    id: 'app_002',
    jobId: 'job_002',
    job: {} as any,
    candidateId: 'cand_002',
    candidate: tamilNaduCandidates[1],
    applicationDate: '2024-01-22T09:15:00Z',
    status: 'under-review',
    coverLetter: 'I am writing to express my interest in the Mathematics Lecturer position. My Ph.D in Chemistry and teaching experience at Lady Doak College have prepared me well for interdisciplinary teaching roles. I am particularly interested in teaching mathematical concepts as they apply to chemical sciences.',
    resume: tamilNaduCandidates[1].profile.resume!,
    additionalDocuments: [],
    answers: [
      {
        question: 'How would you handle struggling students?',
        answer: 'I believe in personalized attention and multiple teaching approaches. I use visual aids, practical examples, and peer learning to help struggling students.',
        type: 'text'
      }
    ],
    salaryExpectation: {
      amount: 50000,
      currency: 'INR'
    },
    availabilityDate: '2024-02-15',
    createdAt: '2024-01-22T09:15:00Z',
    updatedAt: '2024-01-22T09:15:00Z'
  },
  {
    id: 'app_003',
    jobId: 'job_003',
    job: {} as any,
    candidateId: 'cand_003',
    candidate: tamilNaduCandidates[2],
    applicationDate: '2024-01-18T14:45:00Z',
    status: 'interviewed',
    coverLetter: 'As an experienced electronics engineer with both industry and academic exposure, I am excited about the opportunity to contribute as Principal. My leadership experience at TCS and technical expertise position me well to lead an engineering college.',
    resume: tamilNaduCandidates[2].profile.resume!,
    additionalDocuments: [
      {
        id: 'doc_002',
        originalName: 'Leadership_Portfolio.pdf',
        fileName: 'vasanth_leadership_portfolio.pdf',
        size: 2048567,
        mimeType: 'application/pdf',
        url: '/uploads/documents/vasanth_leadership_portfolio.pdf',
        uploadedAt: '2024-01-18T14:45:00Z'
      }
    ],
    answers: [
      {
        question: 'What is your vision for the college?',
        answer: 'I envision a college that bridges academia and industry, with strong research focus and excellent placement opportunities for students.',
        type: 'text'
      }
    ],
    employerNotes: 'Interviewed on 2024-01-25. Good leadership potential but lacks direct academic administrative experience.',
    interviewDate: '2024-01-25T10:00:00Z',
    interviewMode: 'in-person',
    salaryExpectation: {
      amount: 175000,
      currency: 'INR'
    },
    availabilityDate: '2024-04-01',
    createdAt: '2024-01-18T14:45:00Z',
    updatedAt: '2024-01-25T16:30:00Z'
  },
  {
    id: 'app_004',
    jobId: 'job_004',
    job: {} as any,
    candidateId: 'cand_004',
    candidate: tamilNaduCandidates[3],
    applicationDate: '2024-01-21T11:20:00Z',
    status: 'selected',
    coverLetter: 'I am delighted to apply for the Physics Faculty position at your polytechnic college. My background in English literature provides me with excellent communication skills, and I have always been fascinated by the intersection of sciences and humanities.',
    resume: tamilNaduCandidates[3].profile.resume!,
    additionalDocuments: [
      {
        id: 'doc_003',
        originalName: 'Teaching_Philosophy.pdf',
        fileName: 'lakshmi_teaching_philosophy.pdf',
        size: 567890,
        mimeType: 'application/pdf',
        url: '/uploads/documents/lakshmi_teaching_philosophy.pdf',
        uploadedAt: '2024-01-21T11:20:00Z'
      }
    ],
    answers: [
      {
        question: 'Why transition from literature to physics teaching?',
        answer: 'I believe education is about making complex concepts accessible. My literature background helps me explain scientific concepts through effective communication.',
        type: 'text'
      }
    ],
    employerNotes: 'Selected for the position. Unique background and excellent communication skills. Will start from March 1, 2024.',
    interviewDate: '2024-01-28T14:00:00Z',
    interviewMode: 'video',
    salaryExpectation: {
      amount: 40000,
      currency: 'INR'
    },
    availabilityDate: '2024-03-01',
    createdAt: '2024-01-21T11:20:00Z',
    updatedAt: '2024-01-28T18:00:00Z'
  },
  {
    id: 'app_005',
    jobId: 'job_005',
    job: {} as any,
    candidateId: 'cand_005',
    candidate: tamilNaduCandidates[4],
    applicationDate: '2024-01-19T16:30:00Z',
    status: 'submitted',
    coverLetter: 'I am applying for the Electrical Engineering Professor position. While my background is in mathematics, I have strong analytical skills and understanding of mathematical foundations that underpin electrical engineering concepts.',
    resume: tamilNaduCandidates[4].profile.resume!,
    additionalDocuments: [],
    answers: [
      {
        question: 'How do you plan to contribute to electrical engineering research?',
        answer: 'Mathematics is fundamental to electrical engineering. I can contribute to mathematical modeling and analysis of electrical systems.',
        type: 'text'
      }
    ],
    salaryExpectation: {
      amount: 140000,
      currency: 'INR'
    },
    availabilityDate: '2024-02-20',
    createdAt: '2024-01-19T16:30:00Z',
    updatedAt: '2024-01-19T16:30:00Z'
  }
];

// Additional sample applications for demonstration
export const additionalApplications: Application[] = [
  {
    id: 'app_006',
    jobId: 'job_001',
    job: {} as any,
    candidateId: 'cand_006',
    candidate: {
      id: 'cand_006',
      email: 'pradeep.cs@email.com',
      name: 'Pradeep Kumar V',
      phone: '+91 9876543215',
      role: 'candidate',
      profileImage: '',
      isVerified: true,
      createdAt: '2023-10-12T10:00:00Z',
      updatedAt: '2024-01-16T10:00:00Z'
    } as Candidate,
    applicationDate: '2024-01-23T08:45:00Z',
    status: 'under-review',
    coverLetter: 'I am excited to apply for the Computer Science Assistant Professor position. My recent Ph.D completion and industry experience in software development make me a well-rounded candidate.',
    resume: {
      id: 'resume_006',
      originalName: 'Pradeep_Kumar_Resume.pdf',
      fileName: 'pradeep_kumar_resume_20240116.pdf',
      size: 234567,
      mimeType: 'application/pdf',
      url: '/uploads/resumes/pradeep_kumar_resume_20240116.pdf',
      uploadedAt: '2024-01-16T10:00:00Z'
    },
    additionalDocuments: [],
    answers: [],
    salaryExpectation: {
      amount: 75000,
      currency: 'INR'
    },
    availabilityDate: '2024-03-15',
    createdAt: '2024-01-23T08:45:00Z',
    updatedAt: '2024-01-23T08:45:00Z'
  },
  {
    id: 'app_007',
    jobId: 'job_001',
    job: {} as any,
    candidateId: 'cand_007',
    candidate: {
      id: 'cand_007',
      email: 'divya.ml@email.com',
      name: 'Divya Bharathi S',
      phone: '+91 9876543216',
      role: 'candidate',
      profileImage: '',
      isVerified: true,
      createdAt: '2023-12-08T10:00:00Z',
      updatedAt: '2024-01-14T10:00:00Z'
    } as Candidate,
    applicationDate: '2024-01-24T13:20:00Z',
    status: 'submitted',
    coverLetter: 'I am applying for the Assistant Professor role in Computer Science with specialization in Machine Learning and Artificial Intelligence. My research work aligns perfectly with the department\'s focus areas.',
    resume: {
      id: 'resume_007',
      originalName: 'Divya_Bharathi_Resume.pdf',
      fileName: 'divya_bharathi_resume_20240114.pdf',
      size: 289123,
      mimeType: 'application/pdf',
      url: '/uploads/resumes/divya_bharathi_resume_20240114.pdf',
      uploadedAt: '2024-01-14T10:00:00Z'
    },
    additionalDocuments: [
      {
        id: 'doc_004',
        originalName: 'ML_Research_Papers.pdf',
        fileName: 'divya_ml_research_papers.pdf',
        size: 1567890,
        mimeType: 'application/pdf',
        url: '/uploads/documents/divya_ml_research_papers.pdf',
        uploadedAt: '2024-01-24T13:20:00Z'
      }
    ],
    answers: [],
    salaryExpectation: {
      amount: 82000,
      currency: 'INR'
    },
    availabilityDate: '2024-02-28',
    createdAt: '2024-01-24T13:20:00Z',
    updatedAt: '2024-01-24T13:20:00Z'
  }
];

export const allSampleApplications = [...sampleApplications, ...additionalApplications];

// Employer Analytics Data
export const employerAnalyticsData = {
  activeJobsCount: 150,
  totalApplicationsCount: 650,
  shortlistedCandidatesCount: 89,
  hiredCandidatesCount: 23,
  jobViewsCount: 6455,
  topPerformingJobs: [
    {
      jobId: 'job_001',
      title: 'Assistant Professor - Computer Science',
      applications: 28,
      views: 245
    },
    {
      jobId: 'job_005',
      title: 'Electrical Engineering Professor',
      applications: 18,
      views: 203
    },
    {
      jobId: 'job_009',
      title: 'Civil Engineering Assistant Professor',
      applications: 22,
      views: 178
    },
    {
      jobId: 'job_010',
      title: 'Electronics Engineering Faculty',
      applications: 17,
      views: 192
    },
    {
      jobId: 'job_007',
      title: 'Mechanical Engineering Associate Professor',
      applications: 14,
      views: 167
    }
  ],
  applicationTrends: [
    { date: '2024-01-15', applications: 12 },
    { date: '2024-01-16', applications: 8 },
    { date: '2024-01-17', applications: 15 },
    { date: '2024-01-18', applications: 10 },
    { date: '2024-01-19', applications: 18 },
    { date: '2024-01-20', applications: 22 },
    { date: '2024-01-21', applications: 14 },
    { date: '2024-01-22', applications: 19 },
    { date: '2024-01-23', applications: 16 },
    { date: '2024-01-24', applications: 11 }
  ],
  applicationsByQualification: [
    { qualification: 'Ph.D', count: 245, percentage: 38 },
    { qualification: 'M.Tech/M.E', count: 198, percentage: 30 },
    { qualification: 'M.Sc/M.A', count: 156, percentage: 24 },
    { qualification: 'Others', count: 51, percentage: 8 }
  ],
  applicationsByLocation: [
    { location: 'Chennai', count: 185, percentage: 28 },
    { location: 'Coimbatore', count: 132, percentage: 20 },
    { location: 'Madurai', count: 98, percentage: 15 },
    { location: 'Trichy', count: 76, percentage: 12 },
    { location: 'Salem', count: 65, percentage: 10 },
    { location: 'Others', count: 94, percentage: 15 }
  ]
};
