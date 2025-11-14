import React, { useState, useEffect } from 'react';
import { Github, Mail, ExternalLink, Calendar, Code, Server, AlertTriangle, GraduationCap, User } from 'lucide-react';
import profilePhoto from '../assets/KakaoTalk_Photo_2025-07-14-05-20-43.jpeg';
import profilePhotoSmall from '../assets/진소희증명사진.jpeg';

// ✨ data 폴더에서 모든 데이터 import
import {
  profileInfo,
  contactInfo,
  navigationItems,
  techStackData,
  mainProjects,
  miniProjects,
  miniProjectsSummary,
  learningExperiences
} from '../data';

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [isDarkDiagram, setIsDarkDiagram] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
      <div className={`min-h-screen bg-white transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* 상단 네비게이션 바 */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                {profilePhotoSmall ? (
                    <img
                        src={profilePhotoSmall}
                        alt={profileInfo.name}
                        className="w-full h-full object-cover rounded-full"
                    />
                ) : (
                    <User size={20} className="text-gray-600" />
                )}
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{profileInfo.name}</h1>
                <p className="text-sm text-gray-600">{profileInfo.role}</p>
              </div>
            </div>

            <nav className="hidden md:flex space-x-6">
              {navigationItems.map((item) => (
                  <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <item.icon size={16} />
                    <span className="font-medium">{item.label}</span>
                  </a>
              ))}
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto">
          {/* About Section */}
          <section id="about" className="p-6 lg:p-12">
            <div className="space-y-12 py-8 lg:py-16">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
                  <div className="w-64 h-64 lg:w-80 lg:h-80 bg-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                    <img src={profilePhoto} className="w-full h-full object-cover rounded-2xl" alt={profileInfo.name} />
                  </div>
                </div>

                <div className="flex-1 space-y-6 text-center lg:text-left">
                  <div className="space-y-4">
                    <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                      {profileInfo.name}
                    </h1>
                    <div className="space-y-3">
                      <p className="text-lg lg:text-xl xl:text-2xl text-gray-700 font-light leading-relaxed">
                        {profileInfo.tagline}<br />
                        <span className="text-black font-medium">{profileInfo.taglineHighlight}</span>
                        {profileInfo.taglineEnd}
                      </p>
                      <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                        {profileInfo.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {contactInfo.map((contact, index) => (
                        <a
                            key={index}
                            href={contact.href}
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
            </div>
          </section>

          {/* Tech Stack Section */}
          <section id="tech" className="min-h-screen p-6 lg:p-12 border-t border-gray-200">
            <div className="space-y-8 py-8">
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">{techStackData.title}</h1>
                <p className="text-lg lg:text-xl text-gray-600">{techStackData.subtitle}</p>
                <div className="w-20 h-1 bg-gray-900 rounded-full"></div>
              </div>

              <div className="grid gap-8">
                {techStackData.categories.map((category) => (
                    <div key={category.id} className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-12 h-12 ${category.iconBg} rounded-xl flex items-center justify-center`}>
                          {category.icon ? (
                              <category.icon className={category.iconColor} size={24} />
                          ) : (
                              <span className={`${category.iconColor} text-xl`}>{category.emoji}</span>
                          )}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                          <p className="text-gray-600">{category.subtitle}</p>
                        </div>
                      </div>

                      <div className={`grid gap-6 ${category.sections.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                        {category.sections.map((section, idx) => (
                            <div key={idx} className="space-y-3">
                              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                              <div className="space-y-2">
                                {section.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                      <span className="font-medium text-gray-900">{item.name}</span>
                                      <span className="text-sm text-gray-600">{item.detail}</span>
                                    </div>
                                ))}
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="min-h-screen p-6 lg:p-12 border-t border-gray-200">
            <div className="space-y-8 py-8">
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">Projects</h1>
                <p className="text-lg lg:text-xl text-gray-600">실무에서 활용 가능한 기술들을 적용한 프로젝트</p>
                <div className="w-20 h-1 bg-gray-900 rounded-full"></div>
              </div>

              <div className="space-y-16">
                {mainProjects.map((project, index) => (
                    <div key={index} className="group">
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
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
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
                                <span className="flex items-center gap-1">
                              <User size={16} />
                              팀 {project.teamSize}명
                            </span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                              {Array.isArray(project.github) ? (
                                  project.github.map((githubLink, idx) => (
                                      <a
                                          key={idx}
                                          href={githubLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                                      >
                                        <Github size={16} />
                                        {project.github.length > 1 ? (idx === 0 ? 'Frontend' : 'Backend') : 'GitHub'}
                                      </a>
                                  ))
                              ) : (
                                  <a
                                      href={project.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                                  >
                                    <Github size={16} />
                                    GitHub
                                  </a>
                              )}
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

                      <div className="lg:ml-8 space-y-8">
                        {/* Description */}
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">프로젝트 개요</h3>
                          <p className="text-gray-700 leading-relaxed">{project.description}</p>
                        </div>

                        {/* Role & Features */}
                        <div className="grid lg:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                              <User size={20} className="text-gray-600" />
                              담당 영역
                            </h3>
                            <div className="bg-gray-100 p-4 rounded-lg">
                              {Array.isArray(project.role) ? (
                                  <ul className="space-y-2">
                                    {project.role.map((r, idx) => (
                                        <li key={idx} className="text-gray-800 font-medium">• {r}</li>
                                    ))}
                                  </ul>
                              ) : (
                                  <p className="text-gray-800 font-medium">{project.role}</p>
                              )}
                            </div>
                          </div>

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

                        {/* Diagram */}
                        {project.diagrams && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                  <span className="text-blue-600 text-xl">🏗️</span>
                                  시스템 아키텍처
                                </h3>
                                <button
                                    onClick={() => setIsDarkDiagram(!isDarkDiagram)}
                                    className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                                >
                                  {isDarkDiagram ? '🌙' : '☀️'}
                                  {isDarkDiagram ? 'Dark' : 'Light'}
                                </button>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-xl">
                                <img
                                    src={isDarkDiagram ? project.diagrams.dark : project.diagrams.light}
                                    alt={`${project.title} 시스템 아키텍처`}
                                    className="w-full rounded-lg border border-gray-200 shadow-sm"
                                />
                              </div>
                            </div>
                        )}

                        {project.diagram && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <span className="text-blue-600 text-xl">🏗️</span>
                                시스템 아키텍처
                              </h3>
                              <div className="bg-gray-50 p-4 rounded-xl">
                                <img
                                    src={project.diagram}
                                    alt={`${project.title} 시스템 아키텍처`}
                                    className="w-full rounded-lg border border-gray-200 shadow-sm"
                                />
                              </div>
                            </div>
                        )}

                        {/* ⭐ 트러블슈팅 섹션 - 여기가 핵심! */}
                        {project.troubleshooting && project.troubleshooting.length > 0 && (
                            <div className="space-y-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                  <AlertTriangle className="text-red-600" size={20} />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">주요 트러블슈팅</h3>
                                  <p className="text-sm text-gray-600">프로젝트 개발 중 해결한 핵심 기술적 문제들</p>
                                </div>
                              </div>

                              <div className="space-y-8">
                                {project.troubleshooting.map((trouble, troubleIdx) => (
                                    <div key={troubleIdx} className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                                      {/* 헤더 */}
                                      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
                                        <div className="flex items-start gap-4">
                                          <div className="w-10 h-10 bg-white text-gray-900 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-lg">
                                            {troubleIdx + 1}
                                          </div>
                                          <div className="flex-1">
                                            <h4 className="text-xl font-bold text-white mb-2">{trouble.title}</h4>
                                            <div className="flex flex-wrap gap-3 text-sm">
                                      <span className="px-3 py-1 bg-white/20 text-white rounded-full">
                                                난이도: {trouble.difficulty}
                                      </span>
                                              <span className="px-3 py-1 bg-white/20 text-white rounded-full">
                                        소요시간: {trouble.timeSpent}
                                      </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* 컨텐츠 */}
                                      <div className="p-6 space-y-8">
                                        {/* 1. 문제 배경 */}
                                        <div className="space-y-4">
                                          <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg">
                                              <span className="text-red-600 font-bold">1</span>
                                            </div>
                                            <h5 className="text-lg font-bold text-gray-900">문제 배경</h5>
                                          </div>
                                          <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg space-y-4">
                                            <p className="text-gray-800 leading-relaxed font-medium">
                                              {trouble.problem.description}
                                            </p>

                                            {trouble.problem.situations && (
                                                <div className="space-y-2">
                                                  <p className="text-sm font-semibold text-gray-700">발생 상황:</p>
                                                  <ul className="space-y-2">
                                                    {trouble.problem.situations.map((situation, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                          <span className="text-red-500 mt-0.5">▸</span>
                                                          <span>{situation}</span>
                                                        </li>
                                                    ))}
                                                  </ul>
                                                </div>
                                            )}

                                            {trouble.problem.impact && (
                                                <div className="bg-red-100 border border-red-300 p-4 rounded-lg">
                                                  <p className="text-sm font-semibold text-red-900 mb-1">영향도</p>
                                                  <p className="text-sm text-red-800">{trouble.problem.impact}</p>
                                                </div>
                                            )}

                                            {trouble.problem.monitoringImage && (
                                                <div className="mt-4">
                                                  <p className="text-sm font-semibold text-gray-700 mb-3">실제 모니터링 결과:</p>
                                                  <img
                                                      src={trouble.problem.monitoringImage}
                                                      alt="모니터링 결과"
                                                      className="w-full rounded-lg border-2 border-gray-200 shadow-sm"
                                                  />
                                                </div>
                                            )}
                                          </div>
                                        </div>

                                        {/* 2. 해결 방법 */}
                                        <div className="space-y-4">
                                          <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                                              <span className="text-blue-600 font-bold">2</span>
                                            </div>
                                            <h5 className="text-lg font-bold text-gray-900">해결 방법</h5>
                                          </div>
                                          <div className="space-y-4">
                                            {trouble.solution.steps.map((step, stepIdx) => (
                                                <div key={stepIdx} className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg space-y-3">
                                                  <div className="flex items-start gap-3">
                                                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                                      {stepIdx + 1}
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                      <p className="font-semibold text-gray-900">{step.step}</p>
                                                      {step.detail && (
                                                          <p className="text-sm text-gray-700 leading-relaxed">{step.detail}</p>
                                                      )}
                                                    </div>
                                                  </div>
                                                  {step.code && (
                                                      <div className="mt-3">
                                                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                              <pre className="text-xs text-green-400 font-mono leading-relaxed whitespace-pre">
                                                {step.code}
                                              </pre>
                                                        </div>
                                                      </div>
                                                  )}
                                                </div>
                                            ))}
                                          </div>
                                        </div>

                                        {/* 3. 이전 코드와 비교 */}
                                        {trouble.problem.beforeCode && (
                                            <div className="space-y-4">
                                              <div className="flex items-center gap-3">
                                                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                                                  <span className="text-purple-600 font-bold">3</span>
                                                </div>
                                                <h5 className="text-lg font-bold text-gray-900">이전 코드와 비교</h5>
                                              </div>
                                              <div className="grid lg:grid-cols-2 gap-4">
                                                {/* Before */}
                                                <div className="space-y-2">
                                                  <div className="flex items-center gap-2 px-3 py-2 bg-red-100 rounded-t-lg">
                                                    <span className="text-red-700 font-semibold text-sm">❌ Before</span>
                                                  </div>
                                                  <div className="bg-gray-900 rounded-b-lg p-4 overflow-x-auto border-2 border-red-200">
                                          <pre className="text-xs text-gray-300 font-mono leading-relaxed whitespace-pre">
                                            {trouble.problem.beforeCode}
                                          </pre>
                                                  </div>
                                                  {trouble.problem.before && (
                                                      <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                                                        <p className="text-xs text-red-800">
                                                          <strong>문제점:</strong> {trouble.problem.before}
                                                        </p>
                                                      </div>
                                                  )}
                                                </div>

                                                {/* After */}
                                                {trouble.solution.steps[0]?.code && (
                                                    <div className="space-y-2">
                                                      <div className="flex items-center gap-2 px-3 py-2 bg-green-100 rounded-t-lg">
                                                        <span className="text-green-700 font-semibold text-sm">✅ After</span>
                                                      </div>
                                                      <div className="bg-gray-900 rounded-b-lg p-4 overflow-x-auto border-2 border-green-200">
                                            <pre className="text-xs text-green-400 font-mono leading-relaxed whitespace-pre">
                                              {trouble.solution.steps[0].code}
                                            </pre>
                                                      </div>
                                                      <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                                                        <p className="text-xs text-green-800">
                                                          <strong>개선점:</strong> {trouble.solution.steps[0].detail}
                                                        </p>
                                                      </div>
                                                    </div>
                                                )}
                                              </div>
                                            </div>
                                        )}

                                        {/* 4. 배운 점 & 결과 */}
                                        <div className="space-y-4">
                                          <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                                              <span className="text-green-600 font-bold">4</span>
                                            </div>
                                            <h5 className="text-lg font-bold text-gray-900">해당 경험을 통해 알게된 점</h5>
                                          </div>

                                          {trouble.results && (
                                              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                  {trouble.results.map((result, resultIdx) => (
                                                      <div key={resultIdx} className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                                                        <div className="text-sm text-gray-600 mb-1">{result.metric}</div>
                                                        <div className="text-xl font-bold text-green-600">{result.value}</div>
                                                      </div>
                                                  ))}
                                                </div>

                                                {trouble.learnings && (
                                                    <div className="mt-4 pt-4 border-t border-green-200">
                                                      <p className="text-sm text-gray-700 leading-relaxed">
                                                        {trouble.learnings}
                                                      </p>
                                                    </div>
                                                )}
                                              </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                ))}
                              </div>
                            </div>
                        )}
                      </div>

                      {index < mainProjects.length - 1 && (
                          <div className="mt-16 border-b border-gray-200"></div>
                      )}
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Learning Section */}
          <section id="learning" className="min-h-screen p-6 lg:p-12 border-t border-gray-200">
            <div className="space-y-8 py-8">
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">Learning Journey</h1>
                <p className="text-lg lg:text-xl text-gray-600">지속적인 학습과 성장의 여정</p>
                <div className="w-20 h-1 bg-gray-900 rounded-full"></div>
              </div>

              <div className="space-y-8">
                {learningExperiences.map((experience, index) => (
                    <div key={experience.id} className={`space-y-4 ${index < learningExperiences.length - 1 ? 'border-b border-gray-100 pb-8' : ''}`}>
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="space-y-2">
                          <h2 className="text-2xl font-bold text-gray-900">{experience.title}</h2>
                          <p className="text-lg text-gray-600">{experience.subtitle}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Calendar size={16} />
                          <span className="text-sm font-medium">{experience.period}</span>
                        </div>
                      </div>

                      {experience.studyMethod && (
                          <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <h4 className="font-semibold text-gray-900">📅 정기 모임</h4>
                                <p className="text-sm text-gray-600">{experience.studyMethod.schedule}</p>
                                <div className="space-y-2">
                                  {experience.studyMethod.activities.map((activity, idx) => (
                                      <p key={idx} className="text-sm text-gray-700">
                                        <strong>{activity.day}:</strong> {activity.activity}
                                      </p>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-3">
                                <h4 className="font-semibold text-gray-900">🎯 목표</h4>
                                <p className="text-sm text-gray-600">{experience.studyMethod.goal}</p>
                              </div>
                            </div>
                          </div>
                      )}

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">주요 성과</h3>
                        <ul className="space-y-2">
                          {experience.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start space-x-3 text-gray-700">
                                <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                                <span>{achievement}</span>
                              </li>
                          ))}
                        </ul>

                        {experience.links && (
                            <div className="flex flex-wrap gap-2 pt-2">
                              {experience.links.map((link, idx) => (
                                  <a
                                      key={idx}
                                      href={link.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                                  >
                                    <ExternalLink size={12} />
                                    <span>{link.label}</span>
                                  </a>
                              ))}
                            </div>
                        )}
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
  );
}