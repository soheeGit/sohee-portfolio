import movieRecommend1 from '../../assets/영화추천1.png';
import movieRecommend2 from '../../assets/영화추천2.png';

export const miniProjects = [
    {
        title: "오늘의 영화 추천 서비스",
        tags: ["1일 개발", "AI 연동"],
        description: "영화진흥위원회 API를 기반으로 한국 박스오피스 순위와 AI 영화 추천 서비스를 제공",
        period: "2025.04.21 ~ 2025.04.21",
        teamSize: "개인 프로젝트",
        images: [
            { src: movieRecommend1, alt: "영화 추천 서비스 메인 화면", caption: "메인 화면 및 박스오피스" },
            { src: movieRecommend2, alt: "AI 영화 추천 화면", caption: "AI 기반 영화 추천" }
        ],
        features: [
            "일일 박스오피스 순위 제공",
            "Google Gemini AI 기반 개인화 영화 추천",
            "영화진흥위원회 API 연동"
        ],
        tech: [
            "Java 17/21",
            "Spring Framework",
            "Bootstrap 5",
            "JSP",
            "Google Gemini",
            "영화진흥위원회 API"
        ],
        github: "https://github.com/soheeGit/Today-Movie",
        demo: "https://today-movie-main.onrender.com"
    }
];

export const miniProjectsSummary = {
    title: "🚀 미니 프로젝트 특징",
    features: [
        {
            icon: "⚡",
            title: "빠른 개발",
            description: "각 프로젝트를 1일 만에 완성하여 빠른 아이디어 구현과 학습 효과 극대화",
            color: "blue"
        },
        {
            icon: "🔗",
            title: "API 연동",
            description: "다양한 외부 API (영화진흥위원회, 네이버, Google Gemini) 연동 경험",
            color: "green"
        },
        {
            icon: "🤖",
            title: "AI 활용",
            description: "Google Gemini AI를 활용한 개인화 추천 및 텍스트 변환 서비스 구현",
            color: "purple"
        }
    ]
};