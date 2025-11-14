import krocsDiagram from '../../assets/krocs아키텍처다이어그램.png';

export const krocsProject = {
    title: "Krocs",
    teamSize: 4,
    subtitle: "계획의 루프를 완성하는 시간 코치",
    description: "목표 설정부터 일정 관리, 시간 측정, 회고까지 계획의 전체 사이클을 지원하는 시간 관리 서비스",
    tech: [
        "Java 21",
        "Spring Boot 3.5.3",
        "Spring Security",
        "JPA/Hibernate",
        "PostgreSQL",
        "AWS EC2",
        "AWS RDS",
        "Redis",
        "GitHub Actions",
        "Docker"
    ],
    role: [
        "백엔드: Goal/Plan/Stopwatch 시스템 전체 구현, 데이터베이스 설계",
        "인프라: Docker, CI/CD, AWS 아키텍처 구축"
    ],
    features: [
        "목표(Goal) 관리 시스템: CRUD API 설계, 계층 구조, 진행률 계산, 검색/필터링, 데이터 정합성 보장",
        "일정(Plan) 관리 시스템: 캘린더 기반 일정 CRUD, 목표-일정 연동",
        "타이머(Stopwatch) 시스템: Redis 기반 실시간 세션 관리",
        "회고 시스템: 성공/실패 요인 분석 및 성장 과정 추적",
        "인프라: GitHub Actions CI/CD 자동 배포"
    ],
    diagram: krocsDiagram,
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
                        step: "GitHub Actions에서 환경변수 명시적 전달",
                        detail: "SSH 스크립트 내부에서 환경변수를 export로 재설정",
                        code: `# .github/workflows/backend-cicd.yml
- name: Deploy to EC2
  uses: appleboy/ssh-action@v1.0.3
  with:
    script: |
      # 환경변수 명시적 설정
      export DOCKER_HUB_USERNAME="\${{ secrets.DOCKER_HUB_USERNAME }}"
      export DOCKER_HUB_REPOSITORY="\${{ secrets.DOCKER_HUB_REPOSITORY }}"
      export DB_URL="\${{ secrets.DB_URL }}"
      export DB_USER="\${{ secrets.DB_USER }}"
      export DB_PASSWORD="\${{ secrets.DB_PASSWORD }}"
      
      cd /home/ubuntu/krocs-deploy
      docker pull $DOCKER_HUB_USERNAME/$DOCKER_HUB_REPOSITORY:latest
      docker compose -f docker-compose.prod.yml up -d`
                    },
                    {
                        step: "SSL 설정 순서 재구성: HTTP → SSL 발급 → HTTPS",
                        detail: "nginx를 HTTP 모드로 먼저 시작하고, SSL 인증서 발급 후 HTTPS 설정 적용",
                        code: `# deploy/scripts/setup-ssl.sh 수정
#!/bin/bash

echo "🔧 Step 1: HTTP 모드로 nginx 시작"
# HTTPS 설정 임시 비활성화
mv nginx/conf.d/default.conf nginx/conf.d/default.conf.backup
cat > nginx/conf.d/http-only.conf << 'HTTPCONF'
server {
    listen 80;
    server_name krocs.site;
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
}
HTTPCONF

docker compose -f docker-compose.prod.yml up -d nginx

echo "🔒 Step 2: SSL 인증서 발급"
docker compose -f docker-compose.prod.yml run --rm certbot certonly \\
  --webroot --webroot-path=/var/www/certbot \\
  --email admin@krocs.site \\
  --agree-tos --no-eff-email \\
  -d krocs.site

echo "✅ Step 3: HTTPS 설정 활성화"
rm nginx/conf.d/http-only.conf
mv nginx/conf.d/default.conf.backup nginx/conf.d/default.conf
docker exec krocs-nginx nginx -s reload`
                    },
                    {
                        step: "Docker 캐시 완전 정리 및 재시작",
                        detail: "손상된 Docker 캐시와 네트워크를 모두 제거하고 클린 상태에서 재배포",
                        code: `# EC2에서 실행
echo "🧹 Docker 캐시 완전 정리"
docker compose -f docker-compose.prod.yml down -v
docker system prune -a -f
docker volume prune -f
docker network prune -f

echo "🚀 클린 상태에서 재배포"
docker compose -f docker-compose.prod.yml up -d`
                    },
                    {
                        step: "docker-compose 명령어 통일",
                        detail: "모든 스크립트에서 docker compose (v2) 명령어로 통일",
                        code: `# 모든 스크립트 수정
# Before: docker-compose up -d
# After:  docker compose -f docker-compose.prod.yml up -d

# 버전 확인
docker compose version  # Docker Compose version v2.x.x`
                    }
                ]
            },
            results: [
                { metric: "nginx 재시작 문제", value: "완전 해결 (안정적 운영)" },
                { metric: "SSL 인증서 발급", value: "자동화 성공" }
            ],
            learnings: "인프라 구축 시 순서와 의존성 관리의 중요성을 배웠습니다. 특히 Docker 환경에서 환경변수 전달 방식과 SSL 설정 단계별 진행의 필요성을 깊이 이해하게 되었습니다."
        }
    ],
    github: [
        "https://github.com/seeds-hotpack/krocs-backend",
        "https://github.com/seeds-hotpack/krocs-frontend"
    ],
    demo: "https://www.krocs.life/",
    period: "2025.08.08 ~ 진행중"
};