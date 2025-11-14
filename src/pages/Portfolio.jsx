import React, { useState, useEffect } from 'react';
import { Github, Mail, ExternalLink, Calendar, Code, Server, AlertTriangle, GraduationCap, Phone, Globe, MapPin, User, Menu, X } from 'lucide-react';
import profilePhoto from '../assets/KakaoTalk_Photo_2025-07-14-05-20-43.jpeg';
import profilePhotoSmall from '../assets/진소희증명사진.jpeg';
import alertmanagerImage from '../assets/alertmanager.png';
import woorizipDiagramDark from '../assets/woorizip-dark.png';
import woorizipDiagramLight from '../assets/woorizip-light.png';
import krocsDiagram from '../assets/krocs아키텍처다이어그램.png';
// Mini Projects Images
import movieRecommend1 from '../assets/영화추천1.png';
import movieRecommend2 from '../assets/영화추천2.png';

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [isDarkDiagram, setIsDarkDiagram] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: "우리.zip",
      teamSize: 5,
      subtitle: "하우스메이트 생활관리 플랫폼",
      description: "자취 및 공동생활을 위한 종합 생활관리 플랫폼으로, 일상 관리, 소비 분석, 공동 구매, 집안일 분담 등을 하나의 서비스로 통합하여 쾌적하고 공정한 공동 생활 환경을 조성하는 웹 기반 서비스",
      tech: ["Java 17", "Spring Boot 3.5", "Spring Security", "JPA/Hibernate", "PostgreSQL", "AWS EC2", "AWS RDS", "AWS S3", "Redis", "Docker", "GitHub Actions", "Google Gemini AI"],
      role: "백엔드 개발 (캘린더, 알림 시스템) + 프론트엔드 전반",
      features: [
        "실시간 알림 시스템: SSE + 이메일 구조로 다중 알림 지원",
        "스마트 일정/할일/지출 관리: 그룹별 일정, 할일, 지출 지원 및 중요 알림 자동 리마인드",
        "지출 분석 엔진: Google Gemini AI 연동으로 소비 패턴 분석"
      ],
      troubleshooting: [
        {
          title: "SSE 메모리 누수 해결",
          difficulty: "⭐⭐⭐⭐⭐",
          timeSpent: "3일",
          problem: {
            description: "Server-Sent Events 연결이 비정상 종료될 때 메모리에서 정리되지 않는 문제",
            situations: [
              "클라이언트 강제 종료, 네트워크 불안정, 모바일 백그라운드 전환 시 발생"
            ],
            impact: "실제 모니터링 결과: 메모리 사용률이 80% 이상 지속되어 경고 알림 발생",
            before: "기본적인 SseEmitter 관리 (연결 정리 부족)",
            beforeCode: `// 기존 코드: 연결 해제 시 정리 로직 부족
private final Map<UUID, SseEmitter> connections = new ConcurrentHashMap<>();

public SseEmitter createConnection(UUID userId) {
    SseEmitter emitter = new SseEmitter(3 * 60 * 1000L); // 3분
    connections.put(userId, emitter);
    // 연결 해제 시 정리 로직 부족
    return emitter;
}`
          },
          solution: {
            steps: [
              {
                step: "연결 생명주기 이벤트 핸들러 추가",
                detail: "SseEmitter에 onCompletion, onTimeout, onError 핸들러 구현",
                code: `public SseEmitter createConnection(UUID userId) {
    synchronized (userId.toString().intern()) {
        disconnectUser(userId); // 기존 연결 정리

        SseEmitter emitter = new SseEmitter(3 * 60 * 1000L); // 3분
        connections.put(userId, emitter);

        emitter.onCompletion(() -> disconnectUser(userId));
        emitter.onTimeout(() -> {
            log.warn("SSE 연결 타임아웃: userId={}", userId);
            disconnectUser(userId);
        });
        emitter.onError(e -> {
            log.warn("SSE 연결 오류: userId={}, error={}", userId, e.getMessage());
            disconnectUser(userId);
        });

        scheduleHeartbeat(userId, emitter); // 하트비트 스케줄링
        return emitter;
    }
}`
              },
              {
                step: "스케줄러를 통한 주기적 연결 정리",
                detail: "5분마다 실행되는 스케줄러로 비활성 연결 감지 및 정리",
                code: `@Scheduled(fixedRate = 300000) // 5분마다 실행
public void cleanupSSEConnections() {
    try {
        sseService.cleanupInactiveConnections();
        log.debug("현재 활성 SSE 연결 수: {}", sseService.getActiveConnectionCount());
    } catch (Exception e) {
        log.error("SSE 연결 정리 중 오류 발생: {}", e.getMessage(), e);
    }
}

public void cleanupInactiveConnections() {
    connections.entrySet().removeIf(entry -> {
        UUID userId = entry.getKey();
        SseEmitter emitter = entry.getValue();
        try {
            emitter.send(SseEmitter.event()
                .name("heartbeat")
                .data(Map.of("timestamp", LocalDateTime.now())));
            return false;
        } catch (Exception e) {
            log.debug("비활성 SSE 연결 감지: userId={}", userId);
            onlineStatusService.setUserOffline(userId);
            return true;
        }
    });
}`
              },
              {
                step: "안전한 연결 해제 처리",
                detail: "하트비트 태스크 취소 및 사용자 오프라인 상태 업데이트",
                code: `public void disconnectUser(UUID userId) {
    ScheduledFuture<?> task = heartbeatTasks.remove(userId);
    if (task != null) {
        task.cancel(true);
    }
    SseEmitter emitter = connections.remove(userId);
    if (emitter != null) {
        try {
            emitter.complete();
            log.info("사용자 SSE 연결 정리: userId={}", userId);
        } catch (Exception e) {
            log.debug("SSE 연결 정리 중 오류(정상적): {}", e.getMessage());
        }
    }
    onlineStatusService.setUserOffline(userId);
}`
              }
            ]
          },
          results: [
            { metric: "메모리 사용량 감소", value: "80% → 45%" },
            { metric: "메모리 누수 재발생", value: "0건" }
          ],
          learnings: "SSE 연결 관리의 중요성을 깊이 이해하게 되었습니다. 특히 비정상 종료 상황에서의 리소스 정리와 주기적인 상태 점검의 필요성을 배웠습니다."
        },
        {
          title: "캘린더 일정 동시성 문제 해결",
          difficulty: "⭐⭐⭐⭐",
          timeSpent: "2일",
          problem: {
            description: "여러 룸메이트가 동시에 같은 시간대 일정을 생성할 때 중복 예약 발생",
            situations: [
              "일정 수정 중 다른 사용자가 동일 일정을 수정하여 데이터 일관성 문제",
              "그룹 일정에서 여러 사용자가 동시에 수정할 때 마지막 수정만 반영되는 문제"
            ],
            beforeCode: `// 기존 코드: 동시성 제어 없이 바로 수정
@Transactional
public Calendar updateCalendar(Long calendarId, UpdateCalendarRequestDTO request, UUID userId) {
    Calendar calendar = getCalendarById(calendarId, userId);

    if (!hasPermission(calendar, userId)) {
        throw new IllegalArgumentException("해당 일정을 수정할 권한이 없습니다.");
    }

    // 동시성 제어 없이 바로 수정
    if (request.getTitle() != null) {
        calendar.updateTitle(request.getTitle());
    }
    if (request.getStartDate() != null && request.getEndDate() != null) {
        calendar.updateDateTime(request.getStartDate(), request.getEndDate());
    }

    return calendarRepository.save(calendar);
}

@Transactional
public Calendar createCalendar(CreateCalendarRequestDTO request, UUID userId) {
    validateCalendarRequest(request);

    // 시간 충돌 검증 없이 바로 생성
    Calendar calendar = Calendar.builder()
            .title(request.getTitle())
            .startDate(request.getStartDate())
            .endDate(request.getEndDate())
            .userId(userId)
            .build();

    return calendarRepository.save(calendar);
}`
          },
          solution: {
            steps: [
              {
                step: "비관적 락과 충돌 검증 쿼리 추가",
                detail: "Repository에 비관적 락과 시간 충돌 검증 로직 구현",
                code: `@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT c FROM Calendar c WHERE c.calendarId = :calendarId")
Optional<Calendar> findByIdWithLock(@Param("calendarId") Long calendarId);

@Query("SELECT c FROM Calendar c WHERE c.groupId = :groupId " +
       "AND c.type = 'GROUP' " +
       "AND ((c.startDate <= :endDate AND c.endDate >= :startDate))")
List<Calendar> findConflictingGroupCalendars(@Param("groupId") UUID groupId,
                                            @Param("startDate") LocalDateTime startDate,
                                            @Param("endDate") LocalDateTime endDate);`
              },
              {
                step: "일정 생성 시 시간 충돌 검증 추가",
                detail: "동일 시간대 일정 충돌 검증 로직으로 중복 예약 방지",
                code: `@Transactional
public Calendar createCalendar(CreateCalendarRequestDTO request, UUID userId) {
    validateCalendarRequest(request);

    if (request.getType().equals(CalendarType.GROUP) && request.getGroupId() != null) {
        // 동일 시간대 일정 충돌 검증
        List<Calendar> conflictingCalendars = calendarRepository
            .findConflictingGroupCalendars(
                request.getGroupId(),
                request.getStartDate(),
                request.getEndDate()
            );

        if (!conflictingCalendars.isEmpty()) {
            throw new IllegalArgumentException(
                "해당 시간에 이미 그룹 일정이 있습니다: " +
                conflictingCalendars.get(0).getTitle()
            );
        }
    }

    Calendar calendar = Calendar.builder()
            .title(request.getTitle())
            .startDate(request.getStartDate())
            .endDate(request.getEndDate())
            .groupId(request.getGroupId())
            .userId(userId)
            .build();

    return calendarRepository.save(calendar);
}`
              },
              {
                step: "일정 수정 시 비관적 락 적용",
                detail: "비관적 락으로 조회하여 동시 수정 방지 및 시간 변경 시 충돌 검증",
                code: `@Transactional
public Calendar updateCalendar(Long calendarId, UpdateCalendarRequestDTO request, UUID userId) {
    // 비관적 락으로 조회하여 동시 수정 방지
    Calendar calendar = calendarRepository.findByIdWithLock(calendarId)
        .orElseThrow(() -> new IllegalArgumentException("일정을 찾을 수 없습니다."));

    if (!hasPermission(calendar, userId)) {
        throw new IllegalArgumentException("해당 일정을 수정할 권한이 없습니다.");
    }

    // 시간 변경 시 충돌 검증
    if (request.getStartDate() != null && request.getEndDate() != null) {
        validateTimeConflict(calendar, request.getStartDate(), request.getEndDate());
        calendar.updateDateTime(request.getStartDate(), request.getEndDate());
    }

    if (request.getTitle() != null) {
        calendar.updateTitle(request.getTitle());
    }

    return calendarRepository.save(calendar);
}`
              }
            ]
          },
          results: [
            { metric: "동시 일정 생성 시 충돌", value: "시간 충돌 검증으로 방지" },
            { metric: "데이터 일관성 보장", value: "비관적 락 적용" },
            { metric: "그룹 일정 충돌 방지", value: "동시 수정 방지" }
          ],
          learnings: "데이터베이스 트랜잭션과 락의 중요성을 실전에서 경험했습니다. 비관적 락을 통한 동시성 제어와 도메인 로직에서의 충돌 검증이 데이터 일관성을 보장하는 핵심임을 배웠습니다."
        },
        {
          title: "캘린더 데이터 조회 N+1 쿼리 최적화",
          difficulty: "⭐⭐⭐",
          timeSpent: "1일",
          problem: {
            description: "월별 캘린더 조회 시 각 일정마다 그룹 이름을 별도 조회",
            before: "30일 × 평균 3개 일정 = 91개 쿼리 실행 (1 + 90)",
            responseTime: "캘린더 렌더링 시간: 3.2초",
            beforeCode: `// 기존 코드: N+1 쿼리 발생 지점
public List<CalendarResponseDTO> getCalendarsByUser(UUID userId, String viewType, LocalDateTime dateTime, ...) {
    // 일정 목록 조회
    List<Calendar> allCalendars = new ArrayList<>(myCalendars);
    allCalendars.addAll(uniqueGroupCalendars);

    // N+1 쿼리 발생 지점
    return allInstances.stream()
        .map(calendar -> {
            String groupName = null;
            if (calendar.getGroupId() != null) {
                // 각 일정마다 그룹 이름 개별 조회
                groupName = groupRepository.findGroupNameByGroupId(calendar.getGroupId())
                        .orElse(null);
            }
            return CalendarResponseDTO.from(calendar, groupName);
        })
        .toList();
}`
          },
          solution: {
            steps: [
              {
                step: "그룹 ID 수집 및 일괄 조회로 N+1 해결",
                detail: "그룹 정보 한 번에 조회 후 메모리에서 매핑하여 응답 생성",
                code: `public List<CalendarResponseDTO> getCalendarsByUser(UUID userId, String viewType, LocalDateTime dateTime, ...) {
    DateRangeDTO dateRange = calculateDateRange(viewType, dateTime);

    // 1. 일정 목록 조회
    List<Calendar> myCalendars = calendarRepository.findByUserIdAndDateRange(userId, dateRange.start(), dateRange.end());
    List<Calendar> groupCalendars = calendarRepository.findGroupCalendarsForUser(userId, dateRange.start(), dateRange.end());

    List<Calendar> allCalendars = new ArrayList<>(myCalendars);
    allCalendars.addAll(groupCalendars.stream()
            .filter(calendar -> !calendar.getUserId().equals(userId))
            .toList());

    List<Calendar> allInstances = expandRecurringCalendars(allCalendars, dateRange.start(), dateRange.end());
    allInstances = applyFilters(allInstances, type, category, groupId);

    // 2. 그룹 ID 수집 및 일괄 조회로 N+1 해결
    Set<UUID> groupIds = allInstances.stream()
        .map(Calendar::getGroupId)
        .filter(Objects::nonNull)
        .collect(Collectors.toSet());

    // 그룹 정보 한 번에 조회
    Map<UUID, String> groupNameMap = new HashMap<>();
    if (!groupIds.isEmpty()) {
        List<GroupNameProjection> groupNames = groupRepository.findGroupNamesByGroupIds(groupIds);
        groupNameMap = groupNames.stream()
            .collect(Collectors.toMap(
                GroupNameProjection::getGroupId,
                GroupNameProjection::getGroupName
            ));
    }

    // 3. 메모리에서 매핑하여 응답 생성
    final Map<UUID, String> finalGroupNameMap = groupNameMap;
    return allInstances.stream()
        .map(calendar -> {
            String groupName = finalGroupNameMap.get(calendar.getGroupId());
            return CalendarResponseDTO.from(calendar, groupName);
        })
        .toList();
}

// Repository에 일괄 조회 메서드 추가
@Query("SELECT g.groupId as groupId, g.groupName as groupName " +
       "FROM Group g WHERE g.groupId IN :groupIds")
List<GroupNameProjection> findGroupNamesByGroupIds(@Param("groupIds") Set<UUID> groupIds);`
              }
            ]
          },
          results: [
            { metric: "쿼리 개수", value: "101개 → 3개" },
            { metric: "응답시간", value: "3.2초 → 0.3초" }
          ],
          learnings: "ORM 사용 시 쿼리 최적화의 중요성을 체감했습니다. 연관 데이터를 일괄 조회하고 메모리에서 매핑하는 패턴이 성능 개선에 얼마나 효과적인지 배웠습니다."
        }
      ],
      github: ["https://github.com/prgrms-aibe-devcourse/AIBE1_FinalProject_LastDance_FE", "https://github.com/prgrms-aibe-devcourse/AIBE1_FinalProject_LastDance_BE"],
      demo: "https://woori-zip.lastdance.store/",
      period: "2025.06.10 ~ 2025.07.17"
    },
    {
      title: "Krocs",
      teamSize: 4,
      subtitle: "계획의 루프를 완성하는 시간 코치",
      description: "목표 설정부터 일정 관리, 시간 측정, 회고까지 계획의 전체 사이클을 지원하는 시간 관리 서비스",
      tech: ["Java 21", "Spring Boot 3.5.3", "Spring Security", "JPA/Hibernate", "PostgreSQL", "AWS EC2", "AWS RDS", "Redis", "GitHub Actions", "Docker"],
      role: ["백엔드: Goal/Plan/Stopwatch 시스템 전체 구현, 데이터베이스 설계", "인프라: Docker, CI/CD, AWS 아키텍처 구축"],
      features: [
        "목표(Goal) 관리 시스템: CRUD API 설계, 계층 구조, 진행률 계산, 검색/필터링, 데이터 정합성 보장",
        "일정(Plan) 관리 시스템: 캘린더 기반 일정 CRUD, 목표-일정 연동",
        "타이머(Stopwatch) 시스템: Redis 기반 실시간 세션 관리",
        "회고 시스템: 성공/실패 요인 분석 및 성장 과정 추적",
        "인프라: GitHub Actions CI/CD 자동 배포"
      ],
      troubleshooting: [
        {
          title: "HTTPS 배포 시 환경변수 전달 및 SSL 설정 순서 문제",
          difficulty: "⭐⭐⭐⭐",
          timeSpent: "2일",
          problem: {
            description: "GitHub Actions를 통한 EC2 자동 배포 시 환경변수 미전달과 SSL 설정 오류로 nginx 컨테이너가 반복적으로 재시작되며 서비스 접속 불가",
            situations: [
              "GitHub Actions에서 설정한 환경변수(DB_URL, ECR_REGISTRY 등)가 EC2 SSH 접속 시 빈 문자열이 되어 Docker 이미지 참조 실패",
              "SSL 인증서가 없는 상태에서 nginx가 HTTPS 설정을 로드하려 해서 컨테이너가 계속 재시작됨",
              "초기 SSL 스크립트가 docker-compose.yml(개발용) 참조하여 /home/ubuntu/backend 경로 찾지 못해 빌드 실패",
              "Docker 캐시 손상으로 ContainerConfig 오류 발생 및 컨테이너 생성 실패"
            ],
            beforeCode: `# 문제 상황 1: GitHub Actions SSH 배포 스크립트
- name: Deploy to EC2
  uses: appleboy/ssh-action@v1.0.3
  with:
      script: |
            # 환경변수가 전달되지 않음
            docker pull $DOCKER_HUB_USERNAME/$DOCKER_HUB_REPOSITORY:latest
            # → $DOCKER_HUB_USERNAME이 빈 문자열
                          
# 문제 상황 2: SSL 스크립트가 잘못된 docker-compose 참조
# deploy/scripts/setup-ssl.sh
docker-compose up -d  # docker-compose.yml 참조 (X)
# → /home/ubuntu/backend 경로를 찾으려 시도

# 문제 상황 3: 인증서 없이 HTTPS 설정 먼저 로드
# nginx/nginx.conf
server {
    listen 443 ssl;
        ssl_certificate /etc/nginx/ssl/live/krocs.site/fullchain.pem;
            # → 파일이 없어서 nginx 시작 실패
}`
          },
          solution: {
            steps: [
              {
                "step": "GitHub Actions에서 환경변수 명시적 전달",
                "detail": "SSH 스크립트 내부에서 환경변수를 export로 재설정",
                "code": "# .github/workflows/backend-cicd.yml\n- name: Deploy to EC2\n  uses: appleboy/ssh-action@v1.0.3\n  with:\n    script: |\n      # 환경변수 명시적 설정\n      export DOCKER_HUB_USERNAME=\"${{ secrets.DOCKER_HUB_USERNAME }}\"\n      export DOCKER_HUB_REPOSITORY=\"${{ secrets.DOCKER_HUB_REPOSITORY }}\"\n      export DB_URL=\"${{ secrets.DB_URL }}\"\n      export DB_USER=\"${{ secrets.DB_USER }}\"\n      export DB_PASSWORD=\"${{ secrets.DB_PASSWORD }}\"\n      \n      cd /home/ubuntu/krocs-deploy\n      docker pull $DOCKER_HUB_USERNAME/$DOCKER_HUB_REPOSITORY:latest\n      docker compose -f docker-compose.prod.yml up -d"
              },
              {
                "step": "SSL 설정 순서 재구성: HTTP → SSL 발급 → HTTPS",
                "detail": "nginx를 HTTP 모드로 먼저 시작하고, SSL 인증서 발급 후 HTTPS 설정 적용",
                "code": "# deploy/scripts/setup-ssl.sh 수정\n#!/bin/bash\n\necho \"🔧 Step 1: HTTP 모드로 nginx 시작\"\n# HTTPS 설정 임시 비활성화\nmv nginx/conf.d/default.conf nginx/conf.d/default.conf.backup\ncat > nginx/conf.d/http-only.conf << 'HTTPCONF'\nserver {\n    listen 80;\n    server_name krocs.site;\n    location /.well-known/acme-challenge/ {\n        root /var/www/certbot;\n    }\n}\nHTTPCONF\n\ndocker compose -f docker-compose.prod.yml up -d nginx\n\necho \"🔒 Step 2: SSL 인증서 발급\"\ndocker compose -f docker-compose.prod.yml run --rm certbot certonly \\\n  --webroot --webroot-path=/var/www/certbot \\\n  --email admin@krocs.site \\\n  --agree-tos --no-eff-email \\\n  -d krocs.site\n\necho \"✅ Step 3: HTTPS 설정 활성화\"\nrm nginx/conf.d/http-only.conf\nmv nginx/conf.d/default.conf.backup nginx/conf.d/default.conf\ndocker exec krocs-nginx nginx -s reload"
              },
              {
                "step": "Docker 캐시 완전 정리 및 재시작",
                "detail": "손상된 Docker 캐시와 네트워크를 모두 제거하고 클린 상태에서 재배포",
                "code": "# EC2에서 실행\necho \"🧹 Docker 캐시 완전 정리\"\ndocker compose -f docker-compose.prod.yml down -v\ndocker system prune -a -f\ndocker volume prune -f\ndocker network prune -f\n\necho \"🚀 클린 상태에서 재배포\"\ndocker compose -f docker-compose.prod.yml up -d"
              },
              {
                "step": "docker-compose 명령어 통일",
                "detail": "모든 스크립트에서 docker compose (v2) 명령어로 통일",
                "code": "# 모든 스크립트 수정\n# Before: docker-compose up -d\n# After:  docker compose -f docker-compose.prod.yml up -d\n\n# 버전 확인\ndocker compose version  # Docker Compose version v2.x.x"
              }
            ]
          },
          results: [
            {
              "metric": "nginx 재시작 문제",
              "value": "완전 해결 (안정적 운영)"
            },
            {
              "metric": "SSL 인증서 발급",
              "value": "자동화 성공"
            }
          ],
          learnings: "인프라 구축 시 순서와 의존성 관리의 중요성을 배웠습니다. 특히 Docker 환경에서 환경변수 전달 방식과 SSL 설정 단계별 진행의 필요성을 깊이 이해하게 되었습니다."
        }
      ],
      github: ["https://github.com/seeds-hotpack/krocs-backend", "https://github.com/seeds-hotpack/krocs-frontend"],
      demo: "https://www.krocs.life/",
      period: "2025.08.08 ~ 진행중"
    }
  ];

  const navigationItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'tech', label: 'Tech Stack', icon: Server },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'learning', label: 'Learning', icon: GraduationCap },
  ];

  const contactInfo = [
    { icon: Mail, label: '63wlsthgml@gmail.com', href: 'mailto:63wlsthgml@gmail.com' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/soheeGit' },
    { icon: Globe, label: 'Blog', href: 'https://63wlsthgml.tistory.com' },
    { icon: Phone, label: '010-8847-4810', href: 'tel:010-8847-4810' },
  ];

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
                        alt="진소희"
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          console.error('Profile photo failed to load:', e);
                          console.error('Image source:', profilePhotoSmall);
                          e.target.style.display = 'none';
                        }}
                        onLoad={() => console.log('Profile photo loaded successfully')}
                    />
                ) : (
                    <User size={20} className="text-gray-600" />
                )}
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">진소희</h1>
                <p className="text-sm text-gray-600">Backend Developer</p>
              </div>
            </div>

            {/* 네비게이션 메뉴 */}
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

        {/* 메인 콘텐츠 - 모든 섹션을 세로로 배치 */}
        <main className="max-w-6xl mx-auto">
          {/* About Section */}
          <section id="about" className="p-6 lg:p-12">
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
            </div>
          </section>

          {/* Tech Stack Section */}
          <section id="tech" className="min-h-screen p-6 lg:p-12 border-t border-gray-200">
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
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="min-h-screen p-6 lg:p-12 border-t border-gray-200">
            <div className="space-y-8 py-8">
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">Projects</h1>
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
                                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium w-fit">
                                    Complete
                                  </span>
                                  {project.award && (
                                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium w-fit">
                                        {project.award}
                                      </span>
                                  )}
                                </div>
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
                                      <a key={idx}
                                         href={githubLink}
                                         target="_blank"
                                         rel="noopener noreferrer"
                                         className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                                      >
                                        <Github size={16} />
                                        {project.title === 'StudyGround' ? (idx === 0 ? 'GitHub' : '화상회의') : project.github.length > 1 ? (idx === 0 ? 'Frontend' : 'Backend') : 'GitHub'}
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

                        {/* 우리.zip 프로젝트에만 시스템 아키텍처 다이어그램 추가 */}
                        {project.title === "우리.zip" && (
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
                                    src={isDarkDiagram ? woorizipDiagramDark : woorizipDiagramLight}
                                    alt="우리.zip 시스템 아키텍처 다이어그램"
                                    className="w-full rounded-lg border border-gray-200 shadow-sm"
                                />
                                <p className="text-xs text-gray-500 text-center mt-2">
                                  Spring Boot + PostgreSQL + Redis + AWS 기반 마이크로서비스 아키텍처
                                </p>
                              </div>
                            </div>
                        )}

                        {project.title === "Krocs" && (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                  <span className="text-blue-600 text-xl">🏗️</span>
                                  시스템 아키텍처
                                </h3>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-xl">
                                <img
                                    src={krocsDiagram}
                                    alt="Krocs 시스템 아키텍처 다이어그램"
                                    className="w-full rounded-lg border border-gray-200 shadow-sm"
                                />
                                <p className="text-xs text-gray-500 text-center mt-2">
                                  krocs 시스템 아키텍처
                                </p>
                              </div>
                            </div>
                        )}

                        {/* Project Stats (추가적인 디테일) */}
                        {index === 0 && (
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl">
                              <h3 className="text-lg font-semibold text-gray-900 mb-4">프로젝트 성과</h3>
                              <div className="grid grid-cols-3 gap-6">
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

                        {/* 트러블슈팅 섹션 - 개선됨 */}
                        {project.troubleshooting && (
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

                                            {/* SSE 메모리 누수 문제에만 모니터링 이미지 추가 */}
                                            {trouble.title === "SSE 메모리 누수 해결" && (
                                                <div className="mt-4">
                                                  <p className="text-sm font-semibold text-gray-700 mb-3">실제 모니터링 결과:</p>
                                                  <img
                                                      src={alertmanagerImage}
                                                      alt="메모리 사용률 모니터링 결과"
                                                      className="w-full rounded-lg border-2 border-gray-200 shadow-sm"
                                                  />
                                                  <p className="text-xs text-gray-600 text-center mt-2">
                                                    메모리 사용률 80% 이상 지속으로 경고 알림 발생
                                                  </p>
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

                                                {/* 추가 학습 내용 */}
                                                <div className="mt-4 pt-4 border-t border-green-200">
                                                  <p className="text-sm text-gray-700 leading-relaxed">
                                                    {trouble.learnings}
                                                  </p>
                                                </div>
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

                      {/* Divider */}
                      {index < projects.length - 1 && (
                          <div className="mt-16 border-b border-gray-200"></div>
                      )}
                    </div>
                ))}
              </div>
            </div>
          </section>



          {/* Mini Projects Section */}
          <section id="mini-projects" className="min-h-screen p-6 lg:p-12 border-t border-gray-200">
            <div className="space-y-8 py-8">
              <div className="space-y-3">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">Mini Projects</h1>
                <div className="w-20 h-1 bg-gray-900 rounded-full"></div>
              </div>

              <div className="grid gap-8">
                {/* 오늘의 영화 추천 서비스 */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 hover:shadow-md transition-shadow">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                          <h2 className="text-2xl font-bold text-gray-900">오늘의 영화 추천 서비스</h2>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                              1일 개발
                            </span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                              AI 연동
                            </span>
                          </div>
                        </div>
                        <p className="text-lg text-gray-600">영화진흥위원회 API를 기반으로 한국 박스오피스 순위와 AI 영화 추천 서비스를 제공</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={16} />
                            2025.04.21 ~ 2025.04.21
                          </span>
                          <span className="flex items-center gap-1">
                            <User size={16} />
                            개인 프로젝트
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <a
                            href="https://github.com/soheeGit/Today-Movie"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                        >
                          <Github size={16} />
                          GitHub
                        </a>
                        <a
                            href="https://today-movie-main.onrender.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      {/* Images */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">프로젝트 미리보기</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <img
                                src={movieRecommend1}
                                alt="영화 추천 서비스 메인 화면"
                                className="w-full rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            />
                            <p className="text-xs text-gray-500 text-center">메인 화면 및 박스오피스</p>
                          </div>
                          <div className="space-y-2">
                            <img
                                src={movieRecommend2}
                                alt="AI 영화 추천 화면"
                                className="w-full rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                            />
                            <p className="text-xs text-gray-500 text-center">AI 기반 영화 추천</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900">핵심 기능</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold">1</span>
                              </div>
                              <span className="text-gray-700">일일 박스오피스 순위 제공</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold">2</span>
                              </div>
                              <span className="text-gray-700">Google Gemini AI 기반 개인화 영화 추천</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold">3</span>
                              </div>
                              <span className="text-gray-700">영화진흥위원회 API 연동</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-900">기술 스택</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {['Java 17/21', 'Spring Framework', 'Bootstrap 5', 'JSP', 'Google Gemini', '영화진흥위원회 API'].map((tech, idx) => (
                                <div key={idx} className="px-3 py-2 bg-gray-50 rounded-lg text-center">
                                  <span className="text-gray-800 font-medium text-sm">{tech}</span>
                                </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mini Projects Summary */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 lg:p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 미니 프로젝트 특징</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <span className="text-blue-600 text-xl">⚡</span>
                      </div>
                      <h4 className="font-semibold text-gray-900">빠른 개발</h4>
                      <p className="text-sm text-gray-600">각 프로젝트를 1일 만에 완성하여 빠른 아이디어 구현과 학습 효과 극대화</p>
                    </div>
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <span className="text-green-600 text-xl">🔗</span>
                      </div>
                      <h4 className="font-semibold text-gray-900">API 연동</h4>
                      <p className="text-sm text-gray-600">다양한 외부 API (영화진흥위원회, 네이버, Google Gemini) 연동 경험</p>
                    </div>
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <span className="text-purple-600 text-xl">🤖</span>
                      </div>
                      <h4 className="font-semibold text-gray-900">AI 활용</h4>
                      <p className="text-sm text-gray-600">Google Gemini AI를 활용한 개인화 추천 및 텍스트 변환 서비스 구현</p>
                    </div>
                  </div>
                </div>
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
                        <span className="green-500 mt-1 flex-shrink-0">✓</span>
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
          </section>
        </main>
      </div>
  );
}