'use client';

import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { Star, Clock, Users, PlayCircle, CheckCircle, Lock, BookOpen, Award, Download } from 'lucide-react';
import { useState } from 'react';

// Course content database
const coursesContent: Record<string, any> = {};

// OSHA Course Content
coursesContent['5'] = {
  id: '5',
  title: 'OSHA Restaurant Employee Training - Missouri',
  description: 'Comprehensive OSHA-compliant training program for restaurant employees in Missouri. Covers workplace safety, food safety, and all required certifications for 2025 compliance.',
  category: 'Safety & Compliance',
  level: 'Beginner',
  instructor: 'Safety Department',
  duration: 40,
  enrolled: 0,
  rating: 4.9,
  thumbnail: '🏥',
  modules: [
    {
      id: 1,
      title: 'General Workplace Safety Training',
      duration: 600, // minutes
      lessonsCount: 9,
      lessons: [
        {
          id: 1,
          title: 'Introduction to OSHA & Employee Rights',
          description: 'Learn about OSHA regulations, employee rights, and workplace safety fundamentals.',
          duration: 60,
          completed: false,
          locked: false
        },
        {
          id: 2,
          title: 'OSHA 10-Hour General Industry Training - Part 1',
          description: 'First part covering walking surfaces, exit routes, and emergency procedures.',
          duration: 180,
          completed: false,
          locked: false
        },
        {
          id: 3,
          title: 'OSHA 10-Hour General Industry Training - Part 2',
          description: 'Continuation covering electrical safety, hazard communication, and PPE.',
          duration: 180,
          completed: false,
          locked: false
        },
        {
          id: 4,
          title: 'OSHA 10-Hour General Industry Training - Part 3',
          description: 'Final part covering machine guarding, ergonomics, and injury prevention.',
          duration: 240,
          completed: false,
          locked: false
        },
        {
          id: 5,
          title: 'Slip, Trip, and Fall Prevention',
          description: 'Learn proper cleaning procedures and identifying hazards in the workplace.',
          duration: 45,
          completed: false,
          locked: false
        },
        {
          id: 6,
          title: 'Fire Safety and Emergency Procedures',
          description: 'Master fire extinguisher use and emergency evacuation procedures.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 7,
          title: 'Personal Protective Equipment (PPE)',
          description: 'Learn about safety equipment and proper maintenance.',
          duration: 45,
          completed: false,
          locked: false
        },
        {
          id: 8,
          title: 'Electrical Safety in Restaurants',
          description: 'Identify electrical hazards and proper equipment use.',
          duration: 30,
          completed: false,
          locked: false
        },
        {
          id: 9,
          title: 'Hazard Communication (HazCom)',
          description: 'Understand Safety Data Sheets and chemical hazards.',
          duration: 90,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: 2,
      title: 'Food Safety Training',
      duration: 375,
      lessonsCount: 6,
      lessons: [
        {
          id: 10,
          title: 'ServSafe Food Handler Certification - Part 1',
          description: 'Begin your food handler certification covering foodborne illness prevention.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 11,
          title: 'ServSafe Food Handler Certification - Part 2',
          description: 'Continue certification with personal hygiene and allergen awareness.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 12,
          title: 'Personal Hygiene Standards',
          description: 'Master proper handwashing techniques and hygiene requirements.',
          duration: 30,
          completed: false,
          locked: false
        },
        {
          id: 13,
          title: 'Cross-Contamination Prevention',
          description: 'Learn food separation and allergen cross-contact prevention.',
          duration: 45,
          completed: false,
          locked: false
        },
        {
          id: 14,
          title: 'Time and Temperature Control',
          description: 'Understand temperature danger zones and proper cooking temps.',
          duration: 60,
          completed: false,
          locked: false
        },
        {
          id: 15,
          title: 'Cleaning and Sanitation',
          description: 'Master three-compartment sink procedures and cleaning schedules.',
          duration: 60,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: 3,
      title: 'Additional Required Training',
      duration: 420,
      lessonsCount: 5,
      lessons: [
        {
          id: 16,
          title: 'Bloodborne Pathogens',
          description: 'Learn universal precautions and proper cleanup procedures.',
          duration: 60,
          completed: false,
          locked: false
        },
        {
          id: 17,
          title: 'Workplace Violence Prevention',
          description: 'Recognize warning signs and de-escalation techniques.',
          duration: 60,
          completed: false,
          locked: false
        },
        {
          id: 18,
          title: 'Sexual Harassment Prevention',
          description: 'Understand harassment definitions and reporting procedures.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 19,
          title: 'Respiratory Protection Program',
          description: 'Learn when respiratory protection is needed and maintenance procedures.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 20,
          title: 'Confined Space Training',
          description: 'Identify permit-required confined spaces and entry procedures.',
          duration: 120,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: 4,
      title: 'Implementation & Compliance',
      duration: 240,
      lessonsCount: 4,
      lessons: [
        {
          id: 21,
          title: 'Recordkeeping and Documentation',
          description: 'Learn required training records and inspection preparedness.',
          duration: 45,
          completed: false,
          locked: false
        },
        {
          id: 22,
          title: 'Missouri-Specific Requirements',
          description: 'Understand Missouri Department of Labor requirements.',
          duration: 60,
          completed: false,
          locked: false
        },
        {
          id: 23,
          title: 'Creating Your Training Schedule',
          description: 'Develop onboarding plan and compliance schedule.',
          duration: 45,
          completed: false,
          locked: false
        },
        {
          id: 24,
          title: 'Final Assessment and Certification',
          description: 'Complete comprehensive final exam for certification.',
          duration: 90,
          completed: false,
          locked: false
        }
      ]
    }
  ]
};

// NIST CSF Course Content
coursesContent['6'] = {
  id: '6',
  title: 'NIST Cybersecurity Framework 2.0 Training',
  description: 'Comprehensive training on NIST CSF 2.0 covering all six core functions: Govern, Identify, Protect, Detect, Respond, and Recover. Master cybersecurity risk management and framework implementation.',
  category: 'Cybersecurity',
  level: 'Intermediate',
  instructor: 'Security Experts',
  duration: 44,
  enrolled: 0,
  rating: 4.9,
  thumbnail: '🔐',
  modules: [
    {
      id: 1,
      title: 'GOVERN (GV) - Cybersecurity Governance',
      duration: 360,
      lessonsCount: 4,
      lessons: [
        {
          id: 1,
          title: 'Cybersecurity Governance Fundamentals',
          description: 'Understand the role of governance in cybersecurity, establish organizational context, and align security objectives with business goals.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 2,
          title: 'Cybersecurity Supply Chain Risk Management',
          description: 'Manage cybersecurity risks in supply chains, establish third-party risk assessment processes.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 3,
          title: 'Cybersecurity Roles and Workforce Management',
          description: 'Define cybersecurity roles and responsibilities, establish accountability frameworks.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 4,
          title: 'Oversight and Continuous Improvement',
          description: 'Establish oversight mechanisms, monitor cybersecurity performance.',
          duration: 90,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: 2,
      title: 'IDENTIFY (ID) - Understanding Cybersecurity Risk',
      duration: 480,
      lessonsCount: 5,
      lessons: [
        {
          id: 5,
          title: 'Asset Management',
          description: 'Identify and document organizational assets, classify by criticality, and maintain accurate inventories.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 6,
          title: 'Business Environment Analysis',
          description: 'Understand organizational mission and objectives, identify critical business functions.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 7,
          title: 'Governance and Risk Management Strategy',
          description: 'Establish risk management policies, implement risk assessment processes.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 8,
          title: 'Risk Assessment Methodologies',
          description: 'Conduct comprehensive risk assessments, identify threats and vulnerabilities.',
          duration: 120,
          completed: false,
          locked: false
        },
        {
          id: 9,
          title: 'Supply Chain Risk Identification',
          description: 'Identify supply chain risks, establish supplier security requirements.',
          duration: 90,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: 3,
      title: 'PROTECT (PR) - Implementing Safeguards',
      duration: 600,
      lessonsCount: 6,
      lessons: [
        {
          id: 10,
          title: 'Identity Management and Access Control',
          description: 'Implement IAM solutions, establish authentication controls, and manage privileged access.',
          duration: 120,
          completed: false,
          locked: false
        },
        {
          id: 11,
          title: 'Security Awareness and Training Programs',
          description: 'Develop security awareness programs, train users on policies, and foster security culture.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 12,
          title: 'Data Security and Protection',
          description: 'Protect data at rest and in transit, implement data loss prevention, and manage encryption.',
          duration: 120,
          completed: false,
          locked: false
        },
        {
          id: 13,
          title: 'Information Protection Processes',
          description: 'Establish configuration management, implement change control, and manage backups.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 14,
          title: 'Maintenance and Protective Technology',
          description: 'Implement protective technologies, manage system maintenance, and deploy security tools.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 15,
          title: 'Secure Software Development Lifecycle',
          description: 'Integrate security into SDLC, implement secure coding practices, and conduct security testing.',
          duration: 90,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: 4,
      title: 'DETECT (DE) - Identifying Cybersecurity Events',
      duration: 300,
      lessonsCount: 3,
      lessons: [
        {
          id: 16,
          title: 'Anomalies and Events Detection',
          description: 'Establish baseline network behavior, detect anomalous activity, and analyze security events.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 17,
          title: 'Continuous Security Monitoring',
          description: 'Implement continuous monitoring solutions, monitor network environments, and track personnel activity.',
          duration: 120,
          completed: false,
          locked: false
        },
        {
          id: 18,
          title: 'Detection Processes and Procedures',
          description: 'Establish detection procedures, test detection capabilities, and communicate detection information.',
          duration: 90,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: 5,
      title: 'RESPOND (RS) - Taking Action on Incidents',
      duration: 480,
      lessonsCount: 5,
      lessons: [
        {
          id: 19,
          title: 'Incident Response Planning',
          description: 'Develop incident response plans, establish response procedures, and define roles.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 20,
          title: 'Incident Communications Management',
          description: 'Establish incident communication procedures, coordinate with stakeholders.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 21,
          title: 'Incident Analysis and Forensics',
          description: 'Analyze incident data, understand attack vectors, and conduct forensic investigations.',
          duration: 120,
          completed: false,
          locked: false
        },
        {
          id: 22,
          title: 'Incident Mitigation Techniques',
          description: 'Contain and eradicate incidents, prevent incident expansion, and mitigate vulnerabilities.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 23,
          title: 'Response Improvements and Lessons Learned',
          description: 'Incorporate lessons learned, update response plans, and enhance detection capabilities.',
          duration: 90,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: 6,
      title: 'RECOVER (RC) - Maintaining Resilience',
      duration: 300,
      lessonsCount: 3,
      lessons: [
        {
          id: 24,
          title: 'Recovery Planning and Strategies',
          description: 'Develop recovery plans, establish recovery priorities, and define recovery objectives (RTO/RPO).',
          duration: 120,
          completed: false,
          locked: false
        },
        {
          id: 25,
          title: 'Recovery Improvements and Testing',
          description: 'Incorporate recovery lessons learned, update recovery plans, and enhance resilience capabilities.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 26,
          title: 'Recovery Communications and Coordination',
          description: 'Manage recovery communications, coordinate with stakeholders, and provide status updates.',
          duration: 90,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: 7,
      title: 'Implementation & Certification',
      duration: 480,
      lessonsCount: 4,
      lessons: [
        {
          id: 27,
          title: 'NIST CSF Implementation Roadmap',
          description: 'Learn how to create a comprehensive implementation plan for your organization.',
          duration: 120,
          completed: false,
          locked: false
        },
        {
          id: 28,
          title: 'Framework Profiles and Maturity Assessment',
          description: 'Create current and target profiles, assess organizational maturity.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 29,
          title: 'Integration with Other Frameworks',
          description: 'Learn how to integrate NIST CSF with ISO 27001, CIS Controls, and other frameworks.',
          duration: 90,
          completed: false,
          locked: false
        },
        {
          id: 30,
          title: 'Final Comprehensive Assessment',
          description: 'Complete comprehensive exam covering all six core functions. Score 85% or higher to receive NIST CSF Professional certification.',
          duration: 180,
          completed: false,
          locked: false
        }
      ]
    }
  ]
};

// Phishing and Scam Alert Training Course Content
coursesContent['7'] = {
  id: '7',
  title: 'Phishing and Scam Alert Training - Food Service',
  description: 'Comprehensive phishing and scam awareness training designed specifically for food service businesses. Learn to recognize and prevent cyber threats, protect payment systems, and respond to social engineering attacks targeting restaurants and hospitality operations.',
  category: 'Cybersecurity',
  level: 'Beginner',
  instructor: 'Security Experts',
  duration: 12,
  enrolled: 0,
  rating: 4.9,
  thumbnail: '🎣',
  modules: [
    {
      id: 1,
      title: 'Phishing Fundamentals',
      duration: 45,
      lessonsCount: 4,
      lessons: [
        {
          id: 1,
          title: 'What is Phishing? Understanding the Threat',
          description: 'Learn what phishing is, why food service businesses are targeted, and the real costs of successful attacks.',
          duration: 10,
          completed: false,
          locked: false
        },
        {
          id: 2,
          title: 'Anatomy of a Phishing Email',
          description: 'Deconstruct real phishing examples to identify red flags and spot malicious content.',
          duration: 15,
          completed: false,
          locked: false
        },
        {
          id: 3,
          title: 'Beyond Email: SMS and Voice Phishing',
          description: 'Recognize smishing, vishing, and social media phishing attacks.',
          duration: 10,
          completed: false,
          locked: false
        },
        {
          id: 4,
          title: 'Stop, Verify, Report: Your Response Protocol',
          description: 'Master the critical steps to take when you encounter suspected phishing.',
          duration: 10,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: 2,
      title: 'Industry-Specific Threats',
      duration: 120,
      lessonsCount: 8,
      lessons: [
        {
          id: 5,
          title: 'Invoice and Vendor Fraud Schemes',
          description: 'Deep dive into how criminals impersonate suppliers and redirect payments.',
          duration: 15,
          completed: false,
          locked: false
        },
        {
          id: 6,
          title: 'POS System and Tech Support Scams',
          description: 'Understand how scammers impersonate POS providers and IT support.',
          duration: 15,
          completed: false,
          locked: false
        },
        {
          id: 7,
          title: 'Gift Card and Payment Scams',
          description: 'Recognize executive impersonation (CEO fraud) and gift card payment schemes.',
          duration: 15,
          completed: false,
          locked: false
        },
        {
          id: 8,
          title: 'Employment and Payroll Scams',
          description: 'Protect employee information from W-2 phishing and payroll fraud.',
          duration: 15,
          completed: false,
          locked: false
        },
        {
          id: 9,
          title: 'Delivery Platform and Online Order Scams',
          description: 'Recognize scams targeting DoorDash, Uber Eats, and Grubhub accounts.',
          duration: 15,
          completed: false,
          locked: false
        },
        {
          id: 10,
          title: 'Health Inspection and Compliance Scams',
          description: 'Identify fake health inspectors and regulatory scams.',
          duration: 10,
          completed: false,
          locked: false
        },
        {
          id: 11,
          title: 'Social Media and Review Scams',
          description: 'Recognize review extortion and social media account takeover attempts.',
          duration: 10,
          completed: false,
          locked: false
        },
        {
          id: 12,
          title: 'Utility and Business Services Scams',
          description: 'Understand disconnection threats and utility impersonation scams.',
          duration: 10,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: 3,
      title: 'Safe Digital Practices',
      duration: 45,
      lessonsCount: 3,
      lessons: [
        {
          id: 13,
          title: 'Email and Communication Security',
          description: 'Master safe email practices: verifying sender identities and handling links safely.',
          duration: 15,
          completed: false,
          locked: false
        },
        {
          id: 14,
          title: 'Password Security and Authentication',
          description: 'Create strong passwords and enable two-factor authentication (2FA).',
          duration: 15,
          completed: false,
          locked: false
        },
        {
          id: 15,
          title: 'Mobile Device and Wi-Fi Security',
          description: 'Secure smartphones and tablets used for business operations.',
          duration: 15,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: 4,
      title: 'Incident Response and Reporting',
      duration: 30,
      lessonsCount: 3,
      lessons: [
        {
          id: 16,
          title: "I've Been Phished - Immediate Actions",
          description: 'Step-by-step guide for what to do if you clicked a phishing link.',
          duration: 10,
          completed: false,
          locked: false
        },
        {
          id: 17,
          title: 'Reporting Procedures and Escalation',
          description: 'Learn who to contact for different types of security incidents.',
          duration: 10,
          completed: false,
          locked: false
        },
        {
          id: 18,
          title: 'Post-Incident Actions and Recovery',
          description: 'Understand post-incident procedures and learning from security events.',
          duration: 10,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: 5,
      title: 'Manager and Owner Advanced Training',
      duration: 90,
      lessonsCount: 4,
      lessons: [
        {
          id: 19,
          title: 'Building a Security-Aware Culture',
          description: 'Learn to lead by example and create a security-conscious workplace.',
          duration: 20,
          completed: false,
          locked: false
        },
        {
          id: 20,
          title: 'Technical Controls and Best Practices',
          description: 'Implement email filtering, 2FA, and network segmentation.',
          duration: 25,
          completed: false,
          locked: false
        },
        {
          id: 21,
          title: 'Security Policy Development',
          description: 'Create payment authorization and incident response policies.',
          duration: 25,
          completed: false,
          locked: false
        },
        {
          id: 22,
          title: 'Vendor and Third-Party Risk Management',
          description: 'Evaluate vendor security practices and establish secure communications.',
          duration: 20,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: 6,
      title: 'Practical Exercises and Certification',
      duration: 125,
      lessonsCount: 4,
      lessons: [
        {
          id: 23,
          title: 'Phishing Email Identification Exercise',
          description: 'Interactive exercise: Review 10 sample emails and identify phishing attempts.',
          duration: 20,
          completed: false,
          locked: false
        },
        {
          id: 24,
          title: 'Scenario-Based Response Training',
          description: 'Work through realistic food service security scenarios and practice decision-making.',
          duration: 30,
          completed: false,
          locked: false
        },
        {
          id: 25,
          title: 'Creating Your Security Action Plan',
          description: 'Develop a customized security action plan for your restaurant.',
          duration: 30,
          completed: false,
          locked: false
        },
        {
          id: 26,
          title: 'Final Assessment and Certification',
          description: 'Complete the comprehensive assessment. Score 80% or higher for certification.',
          duration: 45,
          completed: false,
          locked: false
        }
      ]
    }
  ]
};

export default function CourseDetailPage() {
  const params = useParams();
  const [expandedModule, setExpandedModule] = useState<number | null>(1);

  // Get course by ID from URL params
  const courseId = params.id as string;
  const course = coursesContent[courseId];

  // If course not found, show error
  if (!course) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600">The course you're looking for doesn't exist.</p>
        </div>
      </DashboardLayout>
    );
  }

  const toggleModule = (moduleId: number) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const totalLessons = course.modules.reduce((sum, module) => sum + module.lessonsCount, 0);
  const totalDuration = course.modules.reduce((sum, module) => sum + module.duration, 0);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Course Header */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                    {course.category}
                  </span>
                  <span className="px-4 py-1 bg-green-500/20 backdrop-blur-sm border border-green-300/30 rounded-full text-sm font-semibold">
                    {course.level}
                  </span>
                </div>
                
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-xl text-blue-100 mb-6 max-w-3xl">
                  {course.description}
                </p>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span>{totalLessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{Math.floor(totalDuration / 60)} hours {totalDuration % 60} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{course.enrolled} enrolled</span>
                  </div>
                </div>
              </div>

              <div className="text-8xl ml-8">
                {course.thumbnail}
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center gap-2">
                <PlayCircle className="h-5 w-5" />
                Start Course
              </button>
              <button className="px-8 py-3 bg-blue-500/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-blue-500/30 transition-colors font-semibold flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download Materials
              </button>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Content</h2>
                <p className="text-gray-600">
                  {course.modules.length} modules • {totalLessons} lessons • {Math.floor(totalDuration / 60)}h {totalDuration % 60}m total length
                </p>
              </div>

              {/* Modules */}
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <div
                    key={module.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                  >
                    {/* Module Header */}
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          {module.id}
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">{module.title}</h3>
                          <p className="text-sm text-gray-600">
                            {module.lessonsCount} lessons • {Math.floor(module.duration / 60)}h {module.duration % 60}m
                          </p>
                        </div>
                      </div>
                      <div className={`transform transition-transform ${expandedModule === module.id ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {/* Module Lessons */}
                    {expandedModule === module.id && (
                      <div className="border-t border-gray-200">
                        {module.lessons.map((lesson, index) => (
                          <div
                            key={lesson.id}
                            className={`px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                              index !== module.lessons.length - 1 ? 'border-b border-gray-100' : ''
                            }`}
                          >
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                {lesson.completed ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : lesson.locked ? (
                                  <Lock className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <PlayCircle className="h-5 w-5 text-blue-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                                <p className="text-sm text-gray-600">{lesson.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{lesson.duration} min</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Certification Info */}
              <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Award className="h-8 w-8 text-green-600 flex-shrink-0" />
                  <div>
                    {course.id === '5' ? (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Earn Your OSHA Certification
                        </h3>
                        <p className="text-gray-700 mb-4">
                          Upon successful completion of all modules and passing the final assessment with 80% or higher, 
                          you will receive your official OSHA Restaurant Employee Training certificate, valid for Missouri compliance.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            ServSafe® Food Handler Certification
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            OSHA 10-Hour General Industry Card
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Missouri State Compliance Certificate
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Continuing Education Credits (CECs)
                          </li>
                        </ul>
                      </>
                    ) : course.id === '6' ? (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Earn Your NIST CSF Professional Certification
                        </h3>
                        <p className="text-gray-700 mb-4">
                          Upon successful completion of all modules and passing the comprehensive final assessment with 85% or higher, 
                          you will receive your NIST Cybersecurity Framework 2.0 Professional Certificate.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            NIST CSF 2.0 Professional Certificate
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Complete Framework Implementation Knowledge
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            All Six Core Functions Mastery
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Valid for 3 Years with Continuing Education
                          </li>
                        </ul>
                      </>
                    ) : course.id === '7' ? (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Earn Your Phishing Awareness Certificate
                        </h3>
                        <p className="text-gray-700 mb-4">
                          Upon successful completion of all modules and passing the final assessment with 80% or higher, 
                          you will receive your Food Service Cyber Security Certificate, demonstrating phishing awareness competency.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Phishing Awareness Certificate
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Food Service Cyber Security Certificate
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Industry-Specific Scam Recognition
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Valid for 1 Year with Quarterly Refreshers
                          </li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Earn Your Certification
                        </h3>
                        <p className="text-gray-700 mb-4">
                          Upon successful completion of all modules and passing the final assessment, 
                          you will receive your certificate of completion.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Self-paced learning - study anytime</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{totalLessons} on-demand video lessons</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">24/7 access to all materials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Downloadable resources</span>
                  </li>
                  {course.id === '5' && (
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Missouri-specific compliance guide</span>
                    </li>
                  )}
                  {course.id === '7' && (
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Real phishing examples and scenarios</span>
                    </li>
                  )}
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Practice quizzes for each module</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Certificate of completion</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Lifetime access to course updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Mobile-friendly learning</span>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Instructor</h4>
                  <p className="text-sm text-gray-700 mb-2">{course.instructor}</p>
                  <p className="text-xs text-gray-600">
                    {course.id === '5' 
                      ? 'Certified OSHA trainers with extensive restaurant safety experience'
                      : course.id === '6'
                      ? 'Certified cybersecurity professionals with extensive NIST framework implementation experience'
                      : course.id === '7'
                      ? 'Cybersecurity experts specializing in food service industry threats and social engineering prevention'
                      : 'Industry experts with extensive teaching experience'
                    }
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Basic understanding of English</li>
                    <li>• Access to internet connection</li>
                    <li>• {course.id === '5' 
                      ? 'No prior safety training required'
                      : course.id === '6'
                      ? 'Basic IT/security knowledge helpful'
                      : 'No prior cybersecurity training required'
                    }</li>
                  </ul>
                </div>

                <button className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

