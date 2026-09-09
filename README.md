# 나를 소개하는 한 페이지 (Starter Blank Template)

React, Tailwind CSS, Framer Motion이 세팅된 깔끔한 1페이지 빈 템플릿입니다.

---

## 📂 파일 구성

- [`src/App.tsx`](src/App.tsx): 메인 자기소개 페이지 코드 (이 파일 하나에서 바로 수정 시작)
- [`src/index.css`](src/index.css): Tailwind CSS 설정

---

## 🚀 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속 후 `src/App.tsx`를 자유롭게 수정하시면 실시간으로 반영(HMR)됩니다.

---

## 🎨 코드 포맷팅 (Prettier)

Tailwind CSS 클래스 자동 정렬 플러그인이 적용되어 있습니다.

```bash
# 코드 포맷팅 검사
npm run format:check

# 전체 코드 자동 포맷팅
npm run format
```

---

## 💬 Gitmoji 커밋 컨벤션

본 프로젝트는 Gitmoji와 Notion Develop-commit 컨벤션을 준수합니다. 상세 규격은 [`GITMOJI.md`](GITMOJI.md)를 참고하세요.

### Git 커밋 템플릿 사용 방법

로컬 환경에 `.gitmessage.txt` 템플릿이 연동되어 있어 `git commit` 실행 시 템플릿 가이드가 자동으로 표시됩니다:

```bash
# 1. 변경 사항 스테이징
git add .

# 2. 커밋 실행 (에디터에 .gitmessage.txt 템플릿 자동 로드)
git commit
```

> 최초 1회 수동 등록이 필요한 경우:
>
> ```bash
> git config --local commit.template .gitmessage.txt
> ```
