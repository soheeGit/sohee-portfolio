import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Github, Mail, ExternalLink, Calendar, MapPin, Code, Server, Database, User } from 'lucide-react';

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: "E-Commerce REST API",
      description: "Spring Boot 기반의 완전한 전자상거래 백엔드 시스템",
      tech: ["Spring Boot", "JPA/Hibernate", "MySQL", "JWT", "Redis"],
      features: [
        "사용자 인증 및 권한 관리",
        "상품 관리 CRUD API",
        "주문 처리 및 결제 연동",
        "Redis를 활용한 캐싱 시스템"
      ],
      github: "https://github.com/soheejin/ecommerce-api",
      demo: null,
      status: "완료",
      period: "2024.01 - 2024.03"
    },
    {
      title: "실시간 채팅 웹 애플리케이션",
      description: "WebSocket을 활용한 실시간 멀티룸 채팅 서비스",
      tech: ["Spring Boot", "WebSocket", "STOMP", "React", "PostgreSQL"],
      features: [
        "실시간 메시지 송수신",
        "다중 채팅방 지원",
        "온라인 사용자 상태 표시",
        "메시지 히스토리 저장"
      ],
      github: "https://github.com/soheejin/realtime-chat",
      demo: "https://chat-demo.soheejin.dev",
      status: "완료",
      period: "2024.04 - 2024.05"
    },
    {
      title: "마이크로서비스 아키텍처 프로젝트",
      description: "MSA 패턴을 적용한 블로그 플랫폼",
      tech: ["Spring Cloud", "Docker", "K8s", "MongoDB", "RabbitMQ"],
      features: [
        "서비스 간 통신 (Feign Client)",
        "API Gateway 구현",
        "분산 트레이싱 (Zipkin)",
        "CI/CD 파이프라인 구축"
      ],
      github: "https://github.com/soheejin/blog-microservices",
      demo: null,
      status: "진행중",
      period: "2024.06 - 현재"
    }
  ];

  const experiences = [
    {
      company: "스타트업 A",
      position: "백엔드 개발 인턴",
      period: "2024.07 - 2024.09",
      description: "Spring Boot 기반 API 개발 및 데이터베이스 최적화 업무 담당",
      achievements: [
        "API 응답 속도 30% 개선",
        "데이터베이스 쿼리 최적화",
        "단위 테스트 코드 작성"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <header className={`relative overflow-hidden bg-white shadow-sm transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div className="relative container mx-auto px-4 py-16 max-w-7xl">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                안녕하세요, 진소희입니다 👋
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                <span className="font-semibold text-blue-600">백엔드 개발자</span>로 성장하며, 
                Java와 Spring을 중심으로 안정적이고 확장 가능한 서비스를 만들어갑니다.
              </p>
              <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
                협업을 통한 문제 해결과 지속적인 학습을 통해 더 나은 개발자가 되고자 합니다.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-4">
              <a 
                href="https://63wlsthgml.tistory.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
              >
                <span>📝</span>
                <span>기술 블로그</span>
              </a>
              <a 
                href="mailto:63wlsthgml@gmail.com"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl"
              >
                <Mail size={18} />
                <span>이메일</span>
              </a>
              <a 
                href="https://github.com/soheeGit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <Tabs defaultValue="projects" className="w-full space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 bg-white/70 backdrop-blur-sm rounded-2xl p-1 shadow-lg">
            <TabsTrigger value="projects" className="flex items-center space-x-2 rounded-xl">
              <Code size={18} />
              <span className="hidden sm:inline">프로젝트</span>
            </TabsTrigger>
            <TabsTrigger value="tech" className="flex items-center space-x-2 rounded-xl">
              <Server size={18} />
              <span className="hidden sm:inline">기술스택</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center space-x-2 rounded-xl">
              <Database size={18} />
              <span className="hidden sm:inline">경험</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center space-x-2 rounded-xl">
              <User size={18} />
              <span className="hidden sm:inline">소개</span>
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">주요 프로젝트</h2>
              <p className="text-gray-600">실무에서 활용 가능한 기술들을 적용한 프로젝트들입니다</p>
            </div>
            
            <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1 text-sm text-gray-500 space-y-1 sm:space-y-0">
                          <span className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{project.period}</span>
                          </span>
                          <span className={`self-start px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === '완료' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        {project.github && (
                          <a 
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {project.demo && (
                          <a 
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">주요 기능</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tech Stack Tab */}
          <TabsContent value="tech" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">기술 스택</h2>
              <p className="text-gray-600">현재 사용하고 있는 기술들과 학습 중인 기술들입니다</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <span className="text-red-600 text-xl">☕</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Java</span>
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        ))}
                        <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">JavaScript</span>
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        ))}
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-gray-200 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <span className="text-green-600 text-xl">🌱</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Backend</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Spring Boot", "Spring Security", "JPA/Hibernate", "Node.js", "Express"].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <span className="text-blue-600 text-xl">🗄️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Database</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["MySQL", "PostgreSQL", "Redis", "MongoDB"].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <span className="text-purple-600 text-xl">☁️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">DevOps & Cloud</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["AWS", "Docker", "GitHub Actions", "Jenkins"].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <span className="text-gray-600 text-xl">🛠️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Tools</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "IntelliJ IDEA", "VS Code", "Postman"].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <span className="text-orange-600 text-xl">📚</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Learning</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Kubernetes", "MSA", "GraphQL", "Apache Kafka"].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">경험</h2>
              <p className="text-gray-600">실무 경험과 학습 과정입니다</p>
            </div>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2 md:mt-0">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{exp.description}</p>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">주요 성과</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <span className="text-blue-600 text-2xl">🎓</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">지속적인 학습</h3>
                    <p className="text-gray-600">
                      온라인 강의, 기술 블로그 작성, 개인 프로젝트를 통해 꾸준히 성장하고 있습니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">About Me</h2>
              <p className="text-gray-600">개발자로서의 철학과 목표</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <span className="text-blue-600 text-xl">💡</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">개발 철학</h3>
                  </div>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• <strong>사용자 중심</strong>의 개발을 지향합니다</li>
                    <li>• <strong>코드 품질</strong>과 유지보수성을 중시합니다</li>
                    <li>• <strong>지속적인 학습</strong>을 통해 성장합니다</li>
                    <li>• <strong>협업과 소통</strong>을 중요하게 생각합니다</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <span className="text-green-600 text-xl">🎯</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">목표</h3>
                  </div>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• <strong>시니어 백엔드 개발자</strong>로 성장</li>
                    <li>• <strong>대용량 트래픽</strong> 처리 경험 쌓기</li>
                    <li>• <strong>오픈소스</strong> 프로젝트 기여</li>
                    <li>• <strong>기술 공유</strong>를 통한 커뮤니티 기여</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <span className="text-purple-600 text-xl">🌟</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">관심사</h3>
                  </div>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• 마이크로서비스 아키텍처</li>
                    <li>• 클라우드 네이티브 기술</li>
                    <li>• 성능 최적화 및 모니터링</li>
                    <li>• 개발 문화와 프로세스 개선</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-r from-pink-50 to-rose-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-pink-100 rounded-lg">
                      <span className="text-pink-600 text-xl">☕</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">취미</h3>
                  </div>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• 기술 블로그 포스팅</li>
                    <li>• 새로운 프레임워크 학습</li>
                    <li>• 개발 관련 도서 읽기</li>
                    <li>• 커피와 함께하는 코딩</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">함께 성장할 기회를 찾고 있습니다!</h3>
                <p className="text-blue-100 mb-6">
                  새로운 도전과 학습을 통해 더 나은 개발자가 되고 싶습니다. 
                  협업할 수 있는 기회가 있다면 언제든 연락주세요.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a 
                    href="mailto:63wlsthgml@gmail.com"
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Mail size={18} />
                    <span>이메일 보내기</span>
                  </a>
                  <a 
                    href="https://63wlsthgml.tistory.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <span>📝</span>
                    <span>블로그 방문</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}