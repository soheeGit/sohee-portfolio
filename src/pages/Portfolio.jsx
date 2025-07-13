import React, { useState, useEffect } from 'react';
import { Github, Mail, ExternalLink, Calendar, Code, Server, AlertTriangle, GraduationCap, Phone, Globe, MapPin, User } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: "우리.zip",
      subtitle: "하우스메이트 생활관리 플랫폼",
      description: "자취 및 공동생활을 위한 종합 생활관리 플랫폼으로, 일상 관리, 소비 분석, 공동 구매, 집안일 분담 등을 하나의 서비스로 통합하여 쾌적하고 공정한 공동 생활 환경을 조성하는 웹 기반 서비스",
      tech: ["Java 17", "Spring Boot 3.5", "Spring Security", "JPA/Hibernate", "PostgreSQL", "AWS EC2", "AWS RDS", "AWS S3", "Redis", "Docker", "GitHub Actions", "Google Gemini AI"],
      role: "백엔드 개발 (캘린더, 알림 시스템) + 프론트엔드 전반",
      features: [
        "실시간 알림 시스템: SSE + 이메일 구조로 다중 알림 지원",
        "스마트 일정/할일/지출 관리: 그룹별 일정, 할일, 지출 지원 및 중요 알림 자동 리마인드",
        "지출 분석 엔진: Google Gemini AI 연동으로 소비 패턴 분석"
      ],
      github: ["https://github.com/prgrms-aibe-devcourse/AIBE1_FinalProject_LastDance_FE", "https://github.com/prgrms-aibe-devcourse/AIBE1_FinalProject_LastDance_BE"],
      demo: "https://woori-zip.lastdance.store/",
      period: "2025.06.10 ~ 2025.07.17"
    },
    {
      title: "PetTalk",
      subtitle: "반려생활, 같이 고민해요",
      description: "반려인 전용 종합 플랫폼으로, Spring Boot + Express.js 기반의 풀스택 웹 서비스와 LangChain4j MCP 기반 AI 챗봇 시스템을 통합한 혁신적인 반려동물 관리 서비스",
      tech: ["Java 17", "Spring Boot 3.4", "Spring Security", "JPA/Hibernate", "MySQL", "Node.js", "Express.js", "LangChain4j", "Google Gemini", "Docker"],
      role: "프론트엔드 전반, 백엔드 리팩토링, DevOps 구축",
      features: [
        "다단계 훈련사 매칭: 자격증 인증 → 프로필 등록 → 사용자 신청 → 승인/거절 워크플로우",
        "실시간 신청 관리: 사용자/훈련사별 신청 현황 및 상태 추적 시스템",
        "완전 자동화 CI/CD: GitHub Actions → GHCR → Jenkins → 멀티 환경 자동 배포"
      ],
      github: ["https://github.com/Lucky-0111"],
      demo: "https://jinsohee.store/",
      period: "2025.04.28 ~ 2025.05.14"
    }
  ];

  const navigationItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'troubleshooting', label: 'Problem Solving', icon: AlertTriangle },
    { id: 'learning', label: 'Learning', icon: GraduationCap },
    { id: 'tech', label: 'Tech Stack', icon: Server },
  ];

  const contactInfo = [
    { icon: Mail, label: '63wlsthgml@gmail.com', href: 'mailto:63wlsthgml@gmail.com' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/soheeGit' },
    { icon: Globe, label: 'Blog', href: 'https://63wlsthgml.tistory.com' },
    { icon: Phone, label: '010-8847-4810', href: 'tel:010-8847-4810' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="space-y-12">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                진소희
              </h1>
              <div className="space-y-4">
                <p className="text-2xl md:text-3xl text-gray-700 font-light leading-relaxed">
                  문제의 본질을 정확히 파악하고,<br />
                  <span className="text-black font-medium">본질에 집중한 해결책</span>을 만드는 개발자
                </p>
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                  기능을 무분별하게 확장하기보다, 사용자에게 진짜 도움이 되는 핵심 기능을 
                  안정적으로 제공하는 데 가치를 둡니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <contact.icon className="text-gray-600 group-hover:text-gray-900 transition-colors" size={20} />
                    <span className="text-gray-900 font-medium">{contact.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6 border-t pt-12">
              <h2 className="text-2xl font-bold text-gray-900">개발 철학</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">코드 품질</h3>
                  <p className="text-gray-600 leading-relaxed">
                    단순함과 명확함, 그리고 유지보수의 용이성을 가장 중요하게 생각합니다. 
                    불필요한 추상화나 복잡한 구조보다는, 읽기 쉽고 예측 가능한 코드가 
                    협업과 확장성을 높인다고 믿습니다.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">성장 마인드</h3>
                  <p className="text-gray-600 leading-relaxed">
                    '유연하게 사고하고, 단단하게 구현하는 개발자'로 성장하기 위해 
                    꾸준히 학습하고, 다양한 도전을 이어가고 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Projects</h1>
              <p className="text-xl text-gray-600">실무에서 활용 가능한 기술들을 적용한 프로젝트</p>
            </div>
            
            <div className="space-y-12">
              {projects.map((project, index) => (
                <div key={index} className="space-y-6 border-b border-gray-100 pb-12 last:border-b-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{project.title}</h2>
                      <p className="text-lg text-gray-600 font-medium">{project.subtitle}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{project.period}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      {project.github.map((githubLink, idx) => (
                        <a
                          key={idx}
                          href={githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Github size={20} />
                        </a>
                      ))}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">담당 영역</h3>
                        <p className="text-gray-700">{project.role}</p>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">핵심 기능</h3>
                        <ul className="space-y-2">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-gray-700">
                              <span className="text-gray-400 mt-2">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900">기술 스택</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'troubleshooting':
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Problem Solving</h1>
              <p className="text-xl text-gray-600">프로젝트에서 마주한 주요 문제들과 해결 과정</p>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <AlertTriangle className="text-amber-500" size={24} />
                  <span>우리.zip 트러블슈팅</span>
                </h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-red-600">문제: SSE 메모리 누수</h3>
                      <p className="text-gray-700">비정상 종료된 SSE 연결이 정리되지 않아 메모리 누수 발생</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-green-600">해결</h3>
                      <p className="text-gray-700">비정상 종료 연결 정리를 위한 5분 주기 cleanup 스케줄러 구현</p>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-red-600">문제: 동시성 문제</h3>
                      <p className="text-gray-700">다중 사용자 환경에서 Race Condition 발생</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-green-600">해결</h3>
                      <p className="text-gray-700">synchronized 블록과 Redis 기반 토큰 검증으로 Race Condition 방지</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'learning':
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Learning Journey</h1>
              <p className="text-xl text-gray-600">지속적인 학습과 성장의 여정</p>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4 border-b border-gray-100 pb-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-gray-900">프로그래머스 AI 백엔드 데브코스 1기</h2>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Calendar size={16} />
                    <span className="text-sm font-medium">2025.01.15 ~ 2025.07.18</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">주요 성과</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2 text-gray-700">
                      <span className="text-green-500 mt-2">✓</span>
                      <span>TIL 기록 1위 달성 및 블로그 기반 학습 공유 문화 기여</span>
                    </li>
                    <li className="flex items-start space-x-2 text-gray-700">
                      <span className="text-green-500 mt-2">✓</span>
                      <span>우리.zip, PetTalk 등 실전 프로젝트 개발 완료</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 border-b border-gray-100 pb-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-gray-900">한국공학대학교</h2>
                    <p className="text-lg text-gray-600 font-medium">IT경영학과/컴퓨터공학 졸업예정</p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Calendar size={16} />
                    <span className="text-sm font-medium">2020.03 ~ 2026.02</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">주요 성과</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2 text-gray-700">
                      <span className="text-green-500 mt-2">✓</span>
                      <span>학점 3.99/4.5, 성적장학금 5회 수상</span>
                    </li>
                    <li className="flex items-start space-x-2 text-gray-700">
                      <span className="text-green-500 mt-2">✓</span>
                      <span>2024년 졸업작품 디지털 전시 추천작 선정</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tech':
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Tech Stack</h1>
              <p className="text-xl text-gray-600">다양한 프로젝트를 통해 경험하고 학습한 기술들</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Backend</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Core</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Java 17", "Spring Boot 3.5", "Spring Security", "JPA/Hibernate"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Database</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">RDBMS</h3>
                    <div className="flex flex-wrap gap-2">
                      {["PostgreSQL", "MySQL"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Cache</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">Redis</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Infrastructure</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">AWS</h3>
                    <div className="flex flex-wrap gap-2">
                      {["EC2", "RDS", "S3"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">DevOps</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">CI/CD</h3>
                    <div className="flex flex-wrap gap-2">
                      {["GitHub Actions", "Jenkins", "Docker"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-white flex transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Sidebar */}
      <aside className="w-80 min-h-screen bg-gray-50 border-r border-gray-200 p-8 sticky top-0">
        <div className="space-y-8">
          {/* Profile */}
          <div className="space-y-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={32} className="text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">진소희</h1>
              <p className="text-gray-600">Backend Developer</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Quick Contact */}
          <div className="space-y-3 pt-8 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Quick Contact</p>
            <div className="space-y-2">
              <a
                href="mailto:63wlsthgml@gmail.com"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Mail size={16} />
                <span className="text-sm">Email</span>
              </a>
              <a
                href="https://github.com/soheeGit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github size={16} />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 max-w-4xl">
        {renderContent()}
      </main>
    </div>
  );
}