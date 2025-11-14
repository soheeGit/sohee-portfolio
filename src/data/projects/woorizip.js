import alertmanagerImage from '../../assets/alertmanager.png';
import woorizipDiagramDark from '../../assets/woorizip-dark.png';
import woorizipDiagramLight from '../../assets/woorizip-light.png';

export const woorizipProject = {
    title: "우리.zip",
    teamSize: 5,
    subtitle: "하우스메이트 생활관리 플랫폼",
    description: "자취 및 공동생활을 위한 종합 생활관리 플랫폼으로, 일상 관리, 소비 분석, 공동 구매, 집안일 분담 등을 하나의 서비스로 통합하여 쾌적하고 공정한 공동 생활 환경을 조성하는 웹 기반 서비스",
    tech: [
        "Java 17",
        "Spring Boot 3.5",
        "Spring Security",
        "JPA/Hibernate",
        "PostgreSQL",
        "AWS EC2",
        "AWS RDS",
        "AWS S3",
        "Redis",
        "Docker",
        "GitHub Actions",
        "Google Gemini AI"
    ],
    role: "백엔드 개발 (캘린더, 알림 시스템) + 프론트엔드 전반",
    features: [
        "실시간 알림 시스템: SSE + 이메일 구조로 다중 알림 지원",
        "스마트 일정/할일/지출 관리: 그룹별 일정, 할일, 지출 지원 및 중요 알림 자동 리마인드",
        "지출 분석 엔진: Google Gemini AI 연동으로 소비 패턴 분석"
    ],
    diagrams: {
        dark: woorizipDiagramDark,
        light: woorizipDiagramLight
    },
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
                monitoringImage: alertmanagerImage,
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
    github: [
        "https://github.com/prgrms-aibe-devcourse/AIBE1_FinalProject_LastDance_FE",
        "https://github.com/prgrms-aibe-devcourse/AIBE1_FinalProject_LastDance_BE"
    ],
    demo: "https://woori-zip.lastdance.store/",
    period: "2025.06.10 ~ 2025.07.17"
};