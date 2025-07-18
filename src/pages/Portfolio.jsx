import React, { useState, useEffect } from 'react';
import { Github, Mail, ExternalLink, Calendar, Code, Server, AlertTriangle, GraduationCap, Phone, Globe, MapPin, User, Menu, X } from 'lucide-react';
import profilePhoto from '../assets/KakaoTalk_Photo_2025-07-14-05-20-43.jpeg';
import profilePhotoSmall from '../assets/진소희증명사진.JPG';
import alertmanagerImage from '../assets/alertmanager.png';
import woorizipDiagramDark from '../assets/woorizip-dark.png';
import woorizipDiagramLight from '../assets/woorizip-light.png';

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [isDarkDiagram, setIsDarkDiagram] = useState(false);

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
          ]
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
          ]
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
          ]
        }
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
    },
    {
      title: "StudyGround",
      subtitle: "다양한 기능을 통합한 스터디 플랫폼",
      description: "온라인 스터디를 위한 종합 협업 플랫폼으로, Express.js + React 기반의 풀스택 웹 서비스와 WebRTC 화상회의 시스템을 통합한 실시간 협업 솔루션 서비스",
      tech: ["Node.js", "Express.js", "Sequelize ORM", "MySQL", "Socket.io", "React 18", "Styled-Components", "Ant Design", "WebRTC", "STUN/TURN 서버", "Multer", "Passport.js"],
      role: "백엔드 전담 개발",
      features: [
        "실시간 화상회의 시스템: WebRTC 기반 P2P 영상 통화 및 화면 공유",
        "실시간 채팅방: Socket.io 기반 메시지 전송 및 룸 관리",
        "종합 스터디 관리: 통합 일정 관리, 스터디 생성/관리, 과제 시스템, 공지사항, 자료 공유"
      ],
      troubleshooting: [
        {
          title: "Socket.io Room 데이터 누수 해결",
          difficulty: "⭐⭐⭐⭐",
          timeSpent: "2일",
          problem: {
            description: "Socket.io 연결 종료 후 Room 데이터가 메모리에서 정리되지 않는 문제",
            situations: [
              "사용자가 브라우저를 갑자기 닫을 때",
              "네트워크 연결이 불안정한 상황",
              "화상회의 중 강제 종료"
            ],
            impact: "Room 데이터 누적으로 메모리 사용량 지속 증가"
          },
          solution: {
            steps: [
              {
                step: "연결 해제 이벤트 처리",
                code: `socket.on('disconnect', () => {
  // 사용자가 속한 모든 룸에서 제거
  const rooms = Object.keys(socket.rooms);
  rooms.forEach(room => {
    socket.leave(room);
    // 룸에 남은 사용자가 없으면 룸 데이터 삭제
    if (io.sockets.adapter.rooms.get(room)?.size === 0) {
      delete roomData[room];
    }
  });
});`
              },
              {
                step: "주기적 룸 정리 스케줄러",
                code: `setInterval(() => {
  Object.keys(roomData).forEach(roomId => {
    if (!io.sockets.adapter.rooms.get(roomId)) {
      delete roomData[roomId];
    }
  });
}, 60000); // 1분마다 실행`
              },
              {
                step: "안전한 룸 생성/삭제 로직",
                detail: "룸 입장/퇴장 시 데이터 일관성 보장"
              }
            ]
          },
          results: [
            { metric: "메모리 누수", value: "100% 해결" },
            { metric: "룸 관리 안정성", value: "99.5% 향상" },
            { metric: "서버 안정성", value: "24시간 무중단 운영" }
          ]
        },
        {
          title: "파일 업로드 동시성 문제 해결",
          difficulty: "⭐⭐⭐",
          timeSpent: "1일",
          problem: {
            description: "여러 사용자가 동시에 파일을 업로드할 때 파일명 충돌 및 덮어쓰기 문제",
            situations: [
              "같은 파일명으로 동시 업로드",
              "파일 저장 중 다른 요청 간섭",
              "임시 파일 정리 실패"
            ],
            impact: "파일 손실 및 데이터 무결성 문제"
          },
          solution: {
            steps: [
              {
                step: "고유 파일명 생성",
                code: `const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueName + ext);
  }
});`
              },
              {
                step: "파일 업로드 mutex 구현",
                code: `const uploadMutex = new Map();

const fileUpload = async (req, res) => {
  const userId = req.user.id;
  
  if (uploadMutex.has(userId)) {
    return res.status(429).json({ error: '업로드 진행중' });
  }
  
  uploadMutex.set(userId, true);
  try {
    // 파일 업로드 처리
  } finally {
    uploadMutex.delete(userId);
  }
};`
              },
              {
                step: "임시 파일 정리 로직",
                detail: "업로드 실패 시 임시 파일 자동 삭제"
              }
            ]
          },
          results: [
            { metric: "파일 충돌", value: "0건" },
            { metric: "업로드 성공률", value: "85% → 99%" },
            { metric: "스토리지 효율성", value: "30% 개선" }
          ]
        },
        {
          title: "WebRTC 연결 안정성 최적화",
          difficulty: "⭐⭐⭐⭐⭐",
          timeSpent: "3일",
          problem: {
            description: "WebRTC P2P 연결 실패 및 화상회의 중 연결 끊김 문제",
            situations: [
              "NAT 환경에서 연결 실패",
              "네트워크 변경 시 연결 끊김",
              "다중 사용자 연결 시 성능 저하"
            ],
            impact: "화상회의 품질 저하 및 사용자 경험 악화"
          },
          solution: {
            steps: [
              {
                step: "STUN/TURN 서버 설정",
                code: `const iceServers = [
  { urls: 'stun:stun.l.google.com:19302' },
  {
    urls: 'turn:turnserver.com:3478',
    username: 'user',
    credential: 'pass'
  }
];

const peerConnection = new RTCPeerConnection({
  iceServers: iceServers
});`
              },
              {
                step: "연결 상태 모니터링 및 재연결",
                code: `peerConnection.oniceconnectionstatechange = () => {
  if (peerConnection.iceConnectionState === 'disconnected') {
    // 재연결 시도
    setTimeout(() => {
      if (peerConnection.iceConnectionState === 'disconnected') {
        reconnectPeer();
      }
    }, 5000);
  }
};`
              },
              {
                step: "대역폭 적응형 품질 조절",
                detail: "네트워크 상태에 따른 비디오 품질 동적 조절"
              }
            ]
          },
          results: [
            { metric: "연결 성공률", value: "60% → 95%" },
            { metric: "재연결 시간", value: "30초 → 5초" },
            { metric: "화상회의 안정성", value: "80% 향상" }
          ]
        }
      ],
      github: ["https://github.com/soheeGit/StudyGround", "https://github.com/soheeGit/WebRTC-backend"],
      period: "2024.07.01 ~ 2024.09.04",
      award: "🏆 2024년 한국공학대학교 공학대전 디지털 전시 우수작 선정"
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
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <img src={profilePhotoSmall} alt="진소희" className="w-full h-full object-cover rounded-full" />
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
          <section id="about" className="min-h-screen p-6 lg:p-12">
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

              <div className="space-y-8 border-t pt-12">
                <h2 className="text-2xl font-bold text-gray-900">개발 철학</h2>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-lg">🎯</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">문제의 본질 파악</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      기능 개발 전에 '왜 이 기능이 필요한가?'를 먼저 질문하는 습관을 가지고 있습니다.
                      우리.zip에서는 공동생활의 핵심 문제인 '정보 비대칭'을 해결하기 위해 실시간 알림에 집중했던 것처럼 사용자가 겪는 본질적인 문제를 먼저 파악하고, 그것을 해결할 수 있는 최소한의 핵심 기능에 집중하는 방식으로 개발합니다.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 text-lg">🔧</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">단순함의 가치</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      복잡한 구조보다는 읽기 쉽고 유지보수하기 쉬운 코드를 추구합니다.
                      SSE 메모리 누수 문제를 해결할 때도 복잡한 라이브러리 대신
                      단순한 스케줄러와 하트비트 검증으로 해결했듯이, 간단하면서도 효과적인 솔루션을 선호합니다.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 text-lg">📚</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">체계적 학습</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      새로운 기술을 배우는 것도 중요하지만, 배운 것을 체계적으로 정리하고
                      실무에서 안정적으로 사용할 수 있게 만드는 것을 더 중요하게 생각합니다.
                      매일 TIL 작성으로 데브코스 1위를 기록한 것처럼, 꾸준한 기록과 정리를 통해 지식을 내재화합니다.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">💭 개발에 대한 생각</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="text-gray-400 mt-1 text-2xl">"</span>
                        <div className="space-y-3">
                          <p className="text-gray-700 leading-relaxed font-medium text-lg">
                            완벽한 코드는 없지만, 더 나은 코드는 항상 존재한다
                          </p>
                          <p className="text-gray-600 leading-relaxed">
                            동시성 문제와 메모리 누수를 겪으면서 깨달은 것은 모든 상황을 예측할 수는 없지만,
                            발생할 수 있는 문제들을 미리 고려하고 대비책을 마련하는 것의 중요성입니다.
                            클린코드 스터디를 통해 배운 원칙들을 실제 프로젝트에 적용하며,
                            코드 리뷰와 테스트 코드 작성을 통해 더 안정적인 서비스를 만들어가고 있습니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-yellow-500">⚡</span>
                        실무에서의 접근법
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• <strong>우리.zip:</strong> 500명 동시 사용자 환경에서 안정성 확보</li>
                        <li>• <strong>PetTalk:</strong> 완전 자동화 CI/CD로 개발 효율성 극대화</li>
                        <li>• <strong>StudyGround:</strong> WebRTC + Socket.io로 실시간 협업 환경 구축</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-gray-200 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-green-500">🌱</span>
                        성장하는 개발자
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• <strong>기록 습관:</strong> TIL 작성량 1위로 체계적 학습 관리</li>
                        <li>• <strong>협업 문화:</strong> 클린코드 스터디를 통한 토론 기반 성장</li>
                        <li>• <strong>도전 정신:</strong> Seeds 커뮤니티에서 지속적인 프로젝트 참여</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-xl">💡</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">앞으로의 목표</h4>
                      <p className="text-gray-700 leading-relaxed">
                        <strong>'유연하게 사고하고, 단단하게 구현하는 개발자'</strong>가 되는 것이 저의 목표입니다.
                        새로운 기술에 열린 마음을 유지하면서도, 검증된 방법으로 안정적인 서비스를 구축하는
                        균형감을 갖춘 개발자로 성장해나가고 있습니다.
                      </p>
                    </div>
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

                {/* Tech Experience Summary */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 lg:p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">💼 실무 경험 요약</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">프로젝트 적용 경험</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• <strong>우리.zip:</strong> Spring Boot + PostgreSQL + Redis + AWS</li>
                        <li>• <strong>PetTalk:</strong> Spring Boot + MySQL + Docker</li>
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

                        {/* 트러블슈팅 섹션 */}
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

                                <div className="grid gap-6 max-w-none">
                                {project.troubleshooting.map((trouble, troubleIdx) => (
                                    <div key={troubleIdx} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow overflow-hidden">
                                      <div className="space-y-4">
                                        {/* 트러블슈팅 헤더 */}
                                        <div className="flex items-start gap-3">
                                          <div className="w-6 h-6 bg-gray-900 text-white rounded-md flex items-center justify-center flex-shrink-0 font-bold text-xs">
                                            {troubleIdx + 1}
                                          </div>
                                          <div className="flex-1">
                                            <h4 className="text-base font-bold text-gray-900 mb-1">{trouble.title}</h4>
                                            <div className="text-xs text-gray-500">
                                              난이도: {trouble.difficulty} | 소요시간: {trouble.timeSpent}
                                            </div>
                                          </div>
                                        </div>

                                        {/* 문제 & 해결과정 */}
                                        <div className="grid xl:grid-cols-2 gap-6">
                                          {/* 문제 상황 */}
                                          <div className="space-y-3 min-w-0">
                                            <div className="flex items-center gap-2">
                                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                              <h5 className="text-sm font-semibold text-red-600">문제 상황</h5>
                                            </div>
                                            <div className="bg-red-50 p-3 rounded-lg space-y-2 min-w-0">
                                              <p className="text-sm text-gray-800 font-medium">{trouble.problem.description}</p>
                                              {trouble.problem.situations && (
                                                  <ul className="text-xs text-gray-600 space-y-1 ml-3">
                                                    {trouble.problem.situations.map((situation, idx) => (
                                                        <li key={idx}>• {situation}</li>
                                                    ))}
                                                  </ul>
                                              )}
                                              {trouble.problem.impact && (
                                                  <div className="bg-red-100 p-2 rounded text-xs text-red-800">
                                                    <strong>영향:</strong> {trouble.problem.impact}
                                                  </div>
                                              )}
                                              {/* 기존 코드 표시 */}
                                              {trouble.problem.beforeCode && (
                                                  <div className="mt-3">
                                                    <p className="text-xs text-gray-600 mb-2">기존 코드:</p>
                                                    <div className="bg-gray-900 text-gray-300 p-3 rounded text-xs font-mono overflow-x-auto whitespace-pre min-w-0 w-full">
                                                      {trouble.problem.beforeCode}
                                                    </div>
                                                  </div>
                                              )}
                                              {/* SSE 메모리 누수 문제에만 모니터링 이미지 추가 */}
                                              {trouble.title === "SSE 메모리 누수 해결" && (
                                                  <div className="mt-3">
                                                    <p className="text-xs text-gray-600 mb-2">실제 모니터링 결과:</p>
                                                    <img 
                                                      src={alertmanagerImage} 
                                                      alt="메모리 사용률 모니터링 결과" 
                                                      className="w-full max-w-md mx-auto rounded border border-gray-200"
                                                    />
                                                    <p className="text-xs text-gray-500 text-center mt-1">
                                                      메모리 사용률 80% 이상 지속으로 경고 알림 발생
                                                    </p>
                                                  </div>
                                              )}
                                              {trouble.problem.before && (
                                                  <div className="bg-red-100 p-2 rounded text-xs text-red-800">
                                                    <strong>Before:</strong> {trouble.problem.before}
                                                    {trouble.problem.responseTime && (
                                                        <><br/><strong>응답시간:</strong> {trouble.problem.responseTime}</>
                                                    )}
                                                  </div>
                                              )}
                                            </div>
                                          </div>

                                          {/* 해결 과정 */}
                                          <div className="space-y-3 min-w-0">
                                            <div className="flex items-center gap-2">
                                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                              <h5 className="text-sm font-semibold text-green-600">해결 과정</h5>
                                            </div>
                                            <div className="space-y-2 min-w-0">
                                              {trouble.solution.steps.map((step, stepIdx) => (
                                                  <div key={stepIdx} className="bg-green-50 p-3 rounded-lg min-w-0">
                                                    <p className="text-sm font-medium text-gray-800 mb-1">{step.step}</p>
                                                    {step.detail && (
                                                        <p className="text-xs text-gray-700">{step.detail}</p>
                                                    )}
                                                    {step.code && (
                                                        <div className="bg-gray-900 text-green-400 p-2 rounded text-xs font-mono mt-2 overflow-x-auto whitespace-pre min-w-0 w-full">
                                                          {step.code}
                                                        </div>
                                                    )}
                                                  </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>

                                        {/* 결과 */}
                                        {trouble.results && (
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                              <h5 className="text-sm font-semibold text-gray-900 mb-2">📊 해결 결과</h5>
                                              <div className={`grid gap-3 ${trouble.results.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                                                {trouble.results.map((result, resultIdx) => (
                                                    <div key={resultIdx} className="text-center">
                                                      <div className="text-lg font-bold text-gray-900">{result.value}</div>
                                                      <div className="text-xs text-gray-600">{result.metric}</div>
                                                    </div>
                                                ))}
                                              </div>
                                            </div>
                                        )}
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
          </section>


        </main>
      </div>
  );
}