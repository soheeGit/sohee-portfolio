# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## 프로젝트 실행 및 배포 (GitHub Pages)
1. 이전 빌드 결과 제거
```bash
rm -rf dist
```
2. 의존성 설치
```bash
npm install
```
3. 프로덕션 빌드
```bash
npm run build
```
4. GitHub Pages 브랜치로 배포
```bash
npx gh-pages -d dist -b gh-pages -t
```
- dist 디렉토리를 gh-pages 브랜치로 배포