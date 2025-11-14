import { woorizipProject } from './woorizip';  // ← import 추가!
import { krocsProject } from './krocs';
import { miniProjects, miniProjectsSummary } from './miniProjects';

// 메인 프로젝트 배열
export const mainProjects = [
    woorizipProject,
    krocsProject
];

// 개별 export
export { woorizipProject, krocsProject, miniProjects, miniProjectsSummary };