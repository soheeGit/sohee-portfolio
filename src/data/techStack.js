import { Server } from 'lucide-react';

export const techStackData = {
    title: "Tech Stack",
    subtitle: "다양한 프로젝트를 통해 경험하고 학습한 기술들",
    categories: [
        {
            id: "backend",
            title: "Backend Development",
            subtitle: "서버 사이드 애플리케이션 개발",
            icon: Server,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-700",
            sections: [
                {
                    title: "Main Stack",
                    items: [
                        { name: "Java 17", detail: "Primary Language" },
                        { name: "Spring Boot 3.5", detail: "Framework" },
                        { name: "Spring Security", detail: "Authentication" },
                        { name: "JPA/Hibernate", detail: "ORM" }
                    ]
                },
                {
                    title: "Additional",
                    items: [
                        { name: "Node.js", detail: "Runtime" },
                        { name: "Express.js", detail: "Web Framework" },
                        { name: "Socket.io", detail: "Real-time" }
                    ]
                }
            ]
        },
        {
            id: "database",
            title: "Database & Storage",
            subtitle: "데이터 저장 및 관리",
            emoji: "🗄️",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            sections: [
                {
                    title: "RDBMS",
                    items: [
                        { name: "PostgreSQL", detail: "우리.zip 메인 DB" },
                        { name: "MySQL", detail: "PetTalk, StudyGround" }
                    ]
                },
                {
                    title: "Cache",
                    items: [
                        { name: "Redis", detail: "캐싱, 세션, 분산 락" }
                    ]
                },
                {
                    title: "ORM",
                    items: [
                        { name: "JPA/Hibernate", detail: "Java 기반" },
                        { name: "Sequelize", detail: "Node.js 기반" }
                    ]
                }
            ]
        },
        {
            id: "devops",
            title: "DevOps & Infrastructure",
            subtitle: "배포 및 인프라 관리",
            emoji: "☁️",
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            sections: [
                {
                    title: "Cloud Platform",
                    items: [
                        { name: "AWS EC2", detail: "서버 호스팅" },
                        { name: "AWS RDS", detail: "관리형 DB" },
                        { name: "AWS S3", detail: "파일 저장소" }
                    ]
                },
                {
                    title: "Containerization",
                    items: [
                        { name: "Docker", detail: "컨테이너화, 배포" }
                    ]
                },
                {
                    title: "CI/CD",
                    items: [
                        { name: "GitHub Actions", detail: "자동화 배포" }
                    ]
                }
            ]
        },
        {
            id: "frontend",
            title: "Frontend & Tools",
            subtitle: "프론트엔드 및 개발 도구",
            emoji: "🎨",
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            sections: [
                {
                    title: "Frontend",
                    items: [
                        { name: "JavaScript", detail: "Vanilla JS" },
                        { name: "HTML/CSS", detail: "마크업, 스타일링" }
                    ]
                },
                {
                    title: "AI Integration",
                    items: [
                        { name: "Google Gemini", detail: "LLM API" }
                    ]
                },
                {
                    title: "Development",
                    items: [
                        { name: "Git", detail: "버전 관리" },
                        { name: "JUnit5", detail: "테스트 프레임워크" }
                    ]
                }
            ]
        }
    ]
};