import React, { useState, useEffect } from 'react';
import { Github, Mail, ExternalLink, Calendar, Code, Server, AlertTriangle, GraduationCap, Phone, Globe, MapPin, User, Menu, X } from 'lucide-react';
import profilePhoto from '../assets/KakaoTalk_Photo_2025-07-14-05-20-43.jpeg';
import profilePhotoSmall from '../assets/진소희증명사진.JPG';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false); // 모바일에서 메뉴 선택 시 사이드바 닫기
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
            <div className="space-y-12 py-8 lg:py-16">
              {/* Hero Section with Photo */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                {/* Profile Photo */}
                <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
                  <div className="w-64 h-64 lg:w-80 lg:h-80 bg-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                    <img src={profilePhoto} className="w-full h-full object-cover rounded-2xl" alt="진소희" />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                  <div className="space-y-4">
                    <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                      진소희
                    </h1>
                    <div className="space-y-3">
                      <p className="text-lg lg:text-xl xl:text-2xl text-gray-700 font-light leading-relaxed">
                        문제의 본질을 정확히 파악하고,<br />
                        <span className="text-black font-medium">본질에 집중한 해결책</span>을 만드는 개발자
                      </p>
                      <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                        기능을 무분별하게 확장하기보다, 사용자에게 진짜 도움이 되는 핵심 기능을
                        안정적으로 제공하는 데 가치를 둡니다.
                      </p>
                    </div>
                  </div>

                  {/* Contact Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {contactInfo.map((contact, index) => (
                        <a key={index} href={contact.href}
                          target={contact.href.startsWith('http') ? '_blank' : undefined}
                          rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group justify-center lg:justify-start"
                          >
                          <contact.icon className="text-gray-600 group-hover:text-gray-900 transition-colors" size={20} />
                          <span className="text-gray-900 font-medium">{contact.label}</span>
                        </a>
                    ))}
                  </div>
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
            <div className="space-y-8 py-8">
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">Projects</h1>
                <p className="text-lg lg:text-xl text-gray-600">실무에서 활용 가능한 기술들을 적용한 프로젝트</p>
                <div className="w-20 h-1 bg-gray-900 rounded-full"></div>
              </div>

              <div className="space-y-16">
                {projects.map((project, index) => (
                    <div key={index} className="group">
                      {/* Project Number & Header */}
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8 mb-8">
                        <div className="flex-shrink-0 flex justify-center lg:justify-start">
                          <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                            <div className="space-y-3">
                              <div className="flex flex-col lg:flex-row lg:items-center gap-3 text-center lg:text-left">
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                                  {project.title}
                                </h2>
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium w-fit mx-auto lg:mx-0">
                              Complete
                            </span>
                              </div>
                              <p className="text-lg lg:text-xl text-gray-600 font-medium text-center lg:text-left">{project.subtitle}</p>
                              <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={16} />
                              {project.period}
                            </span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                              {project.github.map((githubLink, idx) => (
                                <a key={idx}
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                                >
                                <Github size={16} />
                              {idx === 0 ? 'Frontend' : 'Backend'}
                                </a>
                                ))}
                              {project.demo && (
                                  <a
                                      href={project.demo}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors text-sm font-medium"
                                  >
                                    <ExternalLink size={16} />
                                    Live Demo
                                  </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Project Content Grid */}
                      <div className="lg:ml-8 space-y-8">
                        {/* Description */}
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">프로젝트 개요</h3>
                          <p className="text-gray-700 leading-relaxed">{project.description}</p>
                        </div>

                        {/* Role & Features Grid */}
                        <div className="grid lg:grid-cols-2 gap-8">
                          {/* Role */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                              <User size={20} className="text-gray-600" />
                              담당 영역
                            </h3>
                            <div className="bg-gray-100 p-4 rounded-lg">
                              <p className="text-gray-800 font-medium">{project.role}</p>
                            </div>
                          </div>

                          {/* Key Features */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                              <Code size={20} className="text-gray-600" />
                              핵심 기능
                            </h3>
                            <ul className="space-y-3">
                              {project.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <span className="text-xs font-bold">{idx + 1}</span>
                                    </div>
                                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                                  </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Server size={20} className="text-gray-600" />
                            기술 스택
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {project.tech.map((tech, idx) => (
                                <div
                                    key={idx}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-center hover:border-gray-300 hover:shadow-sm transition-all"
                                >
                                  <span className="text-gray-800 font-medium text-sm">{tech}</span>
                                </div>
                            ))}
                          </div>
                        </div>

                        {/* Project Stats (추가적인 디테일) */}
                        {index === 0 && (
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl">
                              <h3 className="text-lg font-semibold text-gray-900 mb-4">프로젝트 성과</h3>
                              <div className="grid grid-cols-3 gap-6">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-gray-900">500+</div>
                                  <div className="text-sm text-gray-600">동시 사용자 지원</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-gray-900">100%</div>
                                  <div className="text-sm text-gray-600">무중단 배포</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-gray-900">5분</div>
                                  <div className="text-sm text-gray-600">배포 시간</div>
                                </div>
                              </div>
                            </div>
                        )}
                      </div>

                      {/* Divider */}
                      {index < projects.length - 1 && (
                      <div className="mt-16 border-b border-gray-200"></div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
        );

      case 'troubleshooting':
        return (
            <div className="space-y-8 py-8">
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">Problem Solving</h1>
                <p className="text-lg lg:text-xl text-gray-600">프로젝트에서 마주한 주요 문제들과 해결 과정</p>
                <div className="w-20 h-1 bg-gray-900 rounded-full"></div>
              </div>

              <div className="space-y-16">
                {/* 우리.zip 트러블슈팅 */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="text-red-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">우리.zip 트러블슈팅</h2>
                      <p className="text-gray-600">실시간 서비스 운영 중 발생한 핵심 기술적 문제들</p>
                    </div>
                  </div>

                  <div className="grid gap-8">
                    {/* 1. SSE 메모리 누수 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-shadow">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm">
                            01
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">SSE 메모리 누수 해결</h3>
                            <div className="text-sm text-gray-500 mb-4">난이도: ⭐⭐⭐⭐⭐ | 소요시간: 3일</div>
                          </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                          {/* 문제 상황 */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <h4 className="text-lg font-semibold text-red-600">문제 상황</h4>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg space-y-3">
                              <p className="text-gray-800 font-medium">Server-Sent Events 연결이 비정상 종료될 때 메모리에서 정리되지 않는 문제</p>
                              <div className="space-y-2">
                                <p className="text-sm text-gray-700"><strong>발생 상황:</strong></p>
                                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                                  <li>• 클라이언트가 브라우저를 강제 종료</li>
                                  <li>• 네트워크 연결이 불안정한 환경</li>
                                  <li>• 모바일에서 앱 백그라운드 전환</li>
                                </ul>
                              </div>
                              <div className="bg-red-100 p-3 rounded border-l-4 border-red-500">
                                <p className="text-sm text-red-800"><strong>영향:</strong> 30분 후 메모리 사용량 200MB → 800MB 증가</p>
                              </div>
                            </div>
                          </div>

                          {/* 해결 과정 */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <h4 className="text-lg font-semibold text-green-600">해결 과정</h4>
                            </div>
                            <div className="space-y-4">
                              <div className="bg-green-50 p-4 rounded-lg">
                                <p className="font-medium text-gray-800 mb-2">1. 문제 분석</p>
                                <p className="text-sm text-gray-700">JProfiler로 메모리 덤프 분석 → SSE 연결 객체 누수 발견</p>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <p className="font-medium text-gray-800 mb-2">2. 스케줄러 구현</p>
                                <div className="bg-gray-900 text-green-400 p-3 rounded text-sm font-mono overflow-x-auto">
                                  @Scheduled(fixedRate = 300000) // 5분<br/>
                                  public void cleanupDeadConnections()
                                </div>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <p className="font-medium text-gray-800 mb-2">3. 연결 상태 검증</p>
                                <p className="text-sm text-gray-700">Heartbeat 메커니즘으로 비활성 연결 감지</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 결과 */}
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <h4 className="font-semibold text-gray-900 mb-3">📊 해결 결과</h4>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-xl lg:text-2xl font-bold text-gray-900">95%</div>
                              <div className="text-xs lg:text-sm text-gray-600">메모리 사용량 감소</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl lg:text-2xl font-bold text-gray-900">0건</div>
                              <div className="text-xs lg:text-sm text-gray-600">메모리 누수 재발생</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl lg:text-2xl font-bold text-gray-900">500+</div>
                              <div className="text-xs lg:text-sm text-gray-600">안정적 동시 사용자</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. 동시성 문제 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-shadow">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm">
                            02
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">동시성 문제 해결</h3>
                            <div className="text-sm text-gray-500 mb-4">난이도: ⭐⭐⭐⭐ | 소요시간: 2일</div>
                          </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <h4 className="text-lg font-semibold text-red-600">문제 상황</h4>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg space-y-3">
                              <p className="text-gray-800 font-medium">다중 사용자가 동시에 같은 리소스에 접근할 때 Race Condition 발생</p>
                              <div className="space-y-2">
                                <p className="text-sm text-gray-700"><strong>주요 증상:</strong></p>
                                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                                  <li>• 일정 생성 시 중복 ID 발생</li>
                                  <li>• 지출 계산 결과 불일치</li>
                                  <li>• 간헐적 데이터 무결성 오류</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <h4 className="text-lg font-semibold text-green-600">해결 방법</h4>
                            </div>
                            <div className="space-y-4">
                              <div className="bg-green-50 p-4 rounded-lg">
                                <p className="font-medium text-gray-800 mb-2">Redis 분산 락 구현</p>
                                <div className="bg-gray-900 text-green-400 p-3 rounded text-sm font-mono overflow-x-auto">
                                  @RedisLock(key = "user:#{'${userId}'}")<br/>
                                  public void createSchedule()
                                </div>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <p className="font-medium text-gray-800 mb-2">Synchronized 블록 적용</p>
                                <p className="text-sm text-gray-700">핵심 비즈니스 로직에 동기화 처리</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                          <h4 className="font-semibold text-gray-900 mb-3">📈 성능 개선</h4>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">동시 요청 처리</p>
                              <div className="text-lg font-bold text-gray-900">100개/초 → 500개/초</div>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">데이터 무결성</p>
                              <div className="text-lg font-bold text-gray-900">99.9% → 100%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. N+1 쿼리 최적화 */}
                    <div className="bg-white border border-gray200 rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-shadow">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm">
                            03
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">N+1 쿼리 최적화</h3>
                            <div className="text-sm text-gray-500 mb-4">난이도: ⭐⭐⭐ | 소요시간: 1일</div>
                          </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <h4 className="text-lg font-semibold text-red-600">성능 이슈</h4>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg space-y-3">
                              <p className="text-gray-800 font-medium">사용자 목록 조회 시 각 사용자마다 추가 쿼리 실행</p>
                              <div className="bg-red-100 p-3 rounded">
                                <p className="text-sm text-red-800"><strong>Before:</strong> 100명 조회 = 101개 쿼리 (1 + 100)</p>
                                <p className="text-sm text-red-800"><strong>응답시간:</strong> 3.2초</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <h4 className="text-lg font-semibold text-green-600">최적화 결과</h4>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg space-y-3">
                              <p className="text-gray-800 font-medium">Fetch Join과 복합 서브쿼리 활용</p>
                              <div className="bg-green-100 p-3 rounded">
                                <p className="text-sm text-green-800"><strong>After:</strong> 100명 조회 = 2개 쿼리</p>
                                <p className="text-sm text-green-800"><strong>응답시간:</strong> 0.3초</p>
                              </div>
                              <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
                                @Query("SELECT u FROM User u<br/>
                                LEFT JOIN FETCH u.schedules")
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* StudyGround 트러블슈팅 */}
                <div className="space-y-8 border-t pt-16">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">StudyGround 트러블슈팅</h2>
                      <p className="text-gray-600">실시간 통신 및 파일 시스템 관련 문제 해결</p>
                    </div>
                  </div>

                  <div className="grid gap-8">
                    {/* Socket.io 메모리 누수 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-shadow">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm">
                            01
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Socket.io Room 데이터 누수</h3>
                            <div className="text-sm text-gray-500 mb-4">난이도: ⭐⭐⭐⭐ | 소요시간: 2일</div>
                          </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <h4 className="text-lg font-semibold text-red-600">문제 발견</h4>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg space-y-3">
                              <p className="text-gray-800 font-medium">사용자가 화상회의를 강제 종료할 때 Room 정보가 서버에 남아있는 현상</p>
                              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                                <li>• 빈 방이 계속 메모리에 존재</li>
                                <li>• 새로운 사용자가 빈 방에 입장하는 오류</li>
                                <li>• 서버 재시작 전까지 문제 지속</li>
                              </ul>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <h4 className="text-lg font-semibold text-green-600">해결 방안</h4>
                            </div>
                            <div className="space-y-4">
                              <div className="bg-green-50 p-4 rounded-lg">
                                <p className="font-medium text-gray-800 mb-2">연결 해제 감지 로직</p>
                                <div className="bg-gray-900 text-green-400 p-3 rounded text-sm font-mono overflow-x-auto">
                                  socket.on('disconnect', () => {'{'}<br/>
                                  cleanupRoom(roomId);<br/>
                                  {'}'});
                                </div>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <p className="font-medium text-gray-800 mb-2">주기적 정리 스케줄러</p>
                                <p className="text-sm text-gray-700">10분마다 빈 방 자동 정리</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 파일 업로드 동시성 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-shadow">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm">
                            02
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">파일 업로드 동시성 문제</h3>
                            <div className="text-sm text-gray-500 mb-4">난이도: ⭐⭐⭐ | 소요시간: 1일</div>
                          </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <h4 className="text-lg font-semibold text-red-600">문제 현상</h4>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg space-y-3">
                              <p className="text-gray-800 font-medium">여러 사용자가 동시에 같은 이름의 파일을 업로드할 때 파일 덮어쓰기 발생</p>
                              <div className="bg-red-100 p-3 rounded">
                                <p className="text-sm text-red-800">결과: 일부 사용자의 파일이 손실</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <h4 className="text-lg font-semibold text-green-600">해결책</h4>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg space-y-3">
                              <p className="text-gray-800 font-medium">UUID 기반 고유 파일명 생성 + 업로드 큐 시스템</p>
                              <div className="bg-gray-900 text-green-400 p-3 rounded text-sm font-mono overflow-x-auto">
                                const uniqueName = <br/>
                                `${'${Date.now()}_${uuidv4()}_${filename}'}`;
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 학습 포인트 */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 lg:p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 핵심 학습 포인트</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">모니터링의 중요성</h4>
                      <p className="text-sm text-gray-600">실시간 서비스에서는 사전 모니터링과 알림 시스템이 필수적임을 깨달았습니다.</p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">동시성 처리</h4>
                      <p className="text-sm text-gray-600">다중 사용자 환경에서의 동시성 처리는 설계 단계부터 고려해야 할 핵심 요소입니다.</p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">성능 최적화</h4>
                      <p className="text-sm text-gray-600">N+1 쿼리 같은 성능 이슈는 초기에 발견하기 어렵지만 사용자 증가 시 치명적입니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );

      case 'learning':
        return (
            <div className="space-y-8 py-8">
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">Learning Journey</h1>
                <p className="text-lg lg:text-xl text-gray-600">지속적인 학습과 성장의 여정</p>
                <div className="w-20 h-1 bg-gray-900 rounded-full"></div>
              </div>

              <div className="space-y-8">
                {/* 프로그래머스 데브코스 */}
                <div className="space-y-4 border-b border-gray-100 pb-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-gray-900">프로그래머스 AI 백엔드 엔지니어링 데브코스 1기</h2>
                      <p className="text-lg text-gray-600">Spring 기반 실전 프로젝트 중심의 백엔드 집중 교육 과정</p>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar size={16} />
                      <span className="text-sm font-medium">2025.01.15 ~ 2025.07.18</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">주요 성과</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3 text-gray-700">
                        <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                        <span>모든 학습 내역을 깃허브 레포지토리에 기록</span>
                      </li>
                      <li className="flex items-start space-x-3 text-gray-700">
                        <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                        <span>하루 동안 학습한 개념, 기술, 트러블슈팅 등을 짧게 정리하는 기록 습관인 TIL을 작성해, 데브코스 1기 수강생들 중 1위 차지</span>
                      </li>
                      <li className="flex items-start space-x-3 text-gray-700">
                        <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                        <span>우리.zip, PetTalk 등 실전 프로젝트 개발 완료</span>
                      </li>
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <a
                          href="https://github.com/soheeGit/Programmers_AI_BackEnd"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        <ExternalLink size={12} />
                        <span>GitHub 레포지토리</span>
                      </a>
                      <a
                          href="https://soheegit.github.io/Programmers_AI_BackEnd/index.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        <ExternalLink size={12} />
                        <span>학습 기록</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 한국공학대학교 */}
                <div className="space-y-4 border-b border-gray-100 pb-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-gray-900">한국공학대학교</h2>
                      <p className="text-lg text-gray-600">IT경영학과/컴퓨터공학 졸업예정</p>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar size={16} />
                      <span className="text-sm font-medium">2020.03 ~ 2026.02</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">주요 성과</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3 text-gray-700">
                        <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                        <span>학점 3.99/4.5</span>
                      </li>
                      <li className="flex items-start space-x-3 text-gray-700">
                        <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                        <span>성적장학금 5회 수상</span>
                      </li>
                      <li className="flex items-start space-x-3 text-gray-700">
                        <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                        <span>2024년 졸업작품 디지털 전시 추천작 선정</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Seeds */}
                <div className="space-y-4 border-b border-gray-100 pb-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-gray-900">Seeds</h2>
                      <p className="text-lg text-gray-600">개발자 성장 커뮤니티 및 프로젝트 활동</p>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar size={16} />
                      <span className="text-sm font-medium">2025.01.08 ~ 진행중</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">주요 활동</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3 text-gray-700">
                        <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                        <span>월 1회 콘테스트(팀간/학교간 대회, 해커톤), 피드백, 정기 세미나(특강) 등 필요한 모임활동 수행</span>
                      </li>
                      <li className="flex items-start space-x-3 text-gray-700">
                        <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                        <span>크록스: 학생들을 위한 공부 플래닝, 뽀모도로 타이머, 피드백 제공 서비스(2025.06. ~ 진행중)</span>
                      </li>
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <a
                          href="https://github.com/seeds-hotpack"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        <ExternalLink size={12} />
                        <span>Organization</span>
                      </a>
                      <a
                          href="https://github.com/seeds-hotpack/team-blog"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        <ExternalLink size={12} />
                        <span>팀 블로그</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 클린코드 스터디 */}
                <div className="space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-gray-900">클린코드 스터디</h2>
                      <p className="text-lg text-gray-600">클린 코드(로버트 C. 마틴) 기반 코드 품질 향상 스터디</p>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar size={16} />
                      <span className="text-sm font-medium">2025.02.28 ~ 2025.04.18</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">스터디 진행 방식</h3>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">📅 정기 모임</h4>
                          <p className="text-sm text-gray-600">매주 월, 금 16:00 ~ 18:00</p>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-700"><strong>금요일:</strong> 학습 내용 발표 및 토론</p>
                            <p className="text-sm text-gray-700"><strong>월요일:</strong> 코드 적용 및 피드백</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">🎯 목표</h4>
                          <p className="text-sm text-gray-600">각자 준비한 초안을 하나로 합쳐 토론 과정에서 나온 내용을 반영해 한 권의 책을 완성</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900">주요 성과</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-3 text-gray-700">
                          <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                          <span>클린 코드의 원칙과 중요성을 학습하여 개인 프로젝트에 직접 적용</span>
                        </li>
                        <li className="flex items-start space-x-3 text-gray-700">
                          <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                          <span>매주 학습한 내용을 자신의 코드에 직접 적용하고 서로 피드백을 주고받으며 코드 품질 개선</span>
                        </li>
                        <li className="flex items-start space-x-3 text-gray-700">
                          <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                          <span>토론 기반 협업 문화 체득 및 코드 리뷰 역량 향상</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <a
                          href="https://cleancodearchive.site/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        <ExternalLink size={12} />
                        <span>아카이브 사이트</span>
                      </a>
                      <a
                          href="https://github.com/aibe-clean-code-study/clean-code"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        <ExternalLink size={12} />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );

      case 'tech':
        return (
            <div className="space-y-8 py-8">
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">Tech Stack</h1>
                <p className="text-lg lg:text-xl text-gray-600">다양한 프로젝트를 통해 경험하고 학습한 기술들</p>
                <div className="w-20 h-1 bg-gray-900 rounded-full"></div>
              </div>

              <div className="grid gap-8">
                {/* Backend */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Server className="text-gray-700" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Backend Development</h2>
                      <p className="text-gray-600">서버 사이드 애플리케이션 개발</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Main Stack</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">Java 17</span>
                          <span className="text-sm text-gray-600">Primary Language</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">Spring Boot 3.5</span>
                          <span className="text-sm text-gray-600">Framework</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">Spring Security</span>
                          <span className="text-sm text-gray-600">Authentication</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">JPA/Hibernate</span>
                          <span className="text-sm text-gray-600">ORM</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Additional</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">Node.js</span>
                          <span className="text-sm text-gray-600">Runtime</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">Express.js</span>
                          <span className="text-sm text-gray-600">Web Framework</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">Socket.io</span>
                          <span className="text-sm text-gray-600">Real-time</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Database */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-blue-600 text-xl">🗄️</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Database & Storage</h2>
                      <p className="text-gray-600">데이터 저장 및 관리</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900">RDBMS</h3>
                      <div className="space-y-2">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">PostgreSQL</div>
                          <div className="text-sm text-gray-600">우리.zip 메인 DB</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">MySQL</div>
                          <div className="text-sm text-gray-600">PetTalk, StudyGround</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900">Cache</h3>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900">Redis</div>
                        <div className="text-sm text-gray-600">캐싱, 세션, 분산 락</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900">ORM</h3>
                      <div className="space-y-2">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">JPA/Hibernate</div>
                          <div className="text-sm text-gray-600">Java 기반</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">Sequelize</div>
                          <div className="text-sm text-gray-600">Node.js 기반</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DevOps & Infrastructure */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <span className="text-green-600 text-xl">☁️</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">DevOps & Infrastructure</h2>
                      <p className="text-gray-600">배포 및 인프라 관리</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900">Cloud Platform</h3>
                      <div className="space-y-2">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">AWS EC2</div>
                          <div className="text-sm text-gray-600">서버 호스팅</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">AWS RDS</div>
                          <div className="text-sm text-gray-600">관리형 DB</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">AWS S3</div>
                          <div className="text-sm text-gray-600">파일 저장소</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900">Containerization</h3>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900">Docker</div>
                        <div className="text-sm text-gray-600">컨테이너화, 배포</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900">CI/CD</h3>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900">GitHub Actions</div>
                        <div className="text-sm text-gray-600">자동화 배포</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Frontend & Others */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <span className="text-purple-600 text-xl">🎨</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Frontend & Tools</h2>
                      <p className="text-gray-600">프론트엔드 및 개발 도구</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900">Frontend</h3>
                      <div className="space-y-2">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">React 18</div>
                          <div className="text-sm text-gray-600">컴포넌트 기반 UI</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">JavaScript</div>
                          <div className="text-sm text-gray-600">Vanilla JS</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">HTML/CSS</div>
                          <div className="text-sm text-gray-600">마크업, 스타일링</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900">AI Integration</h3>
                      <div className="space-y-2">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">LangChain4j</div>
                          <div className="text-sm text-gray-600">AI 챗봇 구현</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">Google Gemini</div>
                          <div className="text-sm text-gray-600">LLM API</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900">Development</h3>
                      <div className="space-y-2">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">Git</div>
                          <div className="text-sm text-gray-600">버전 관리</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-gray-900">JUnit5</div>
                          <div className="text-sm text-gray-600">테스트 프레임워크</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Experience Summary */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 lg:p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">💼 실무 경험 요약</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">프로젝트 적용 경험</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• <strong>우리.zip:</strong> Spring Boot + PostgreSQL + Redis + AWS</li>
                        <li>• <strong>PetTalk:</strong> Spring Boot + MySQL + LangChain4j + Docker</li>
                        <li>• <strong>StudyGround:</strong> Express.js + React + WebRTC + Socket.io</li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">핵심 역량</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• RESTful API 설계 및 구현</li>
                        <li>• 데이터베이스 설계 및 성능 최적화</li>
                        <li>• 실시간 통신 시스템 구축 (SSE, WebRTC)</li>
                        <li>• CI/CD 파이프라인 구축 및 자동화 배포</li>
                      </ul>
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
      <div className={`min-h-screen bg-white transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <img src={profilePhotoSmall} alt="진소희" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">진소희</h1>
                <p className="text-sm text-gray-600">Backend Developer</p>
              </div>
            </div>
            <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className={`
         lg:w-96 w-full h-screen bg-gray-50 border-r border-gray-200 p-6 lg:p-8 
         fixed top-0 left-0 overflow-y-auto z-40 transition-transform duration-300
         ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
       `}>
            <div className="space-y-8">
              {/* Profile - Hidden on mobile (shown in header) */}
              <div className="space-y-4 hidden lg:block">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                  <img src={profilePhotoSmall} alt="진소희" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">진소희</h1>
                  <p className="text-gray-600">Backend Developer</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2 mt-8 lg:mt-0">
                {navigationItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleSectionChange(item.id)}
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

                  <a href="mailto:63wlsthgml@gmail.com"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                  <Mail size={16} />
                  <span className="text-sm">Email</span>
                </a>

                <a href="https://github.com/soheeGit"
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
        </div>

  {/* Overlay for mobile */}
  {sidebarOpen && (
      <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
      />
  )}

  {/* Main Content */}
  <main className="flex-1 lg:ml-96">
    <div className="p-6 lg:p-12">
      {renderContent()}
    </div>
  </main>
</div>
);
}