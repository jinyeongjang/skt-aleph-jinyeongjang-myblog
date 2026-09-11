# 🌐 SKT ALEPH 장진영 포트폴리오 — 나를 소개하는 한 페이지

> **SKT ALEPH 1기 기업 현장 중심 보안 & 네트워크 인프라 트랙**  
> 개발자 장진영의 핵심 가치관, 실무 기술 역량, 프로젝트 및 학습 경험을 투명하게 공유하는 반응형 포트폴리오 웹입니다.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-black?style=flat&logo=vercel)](https://skt-aleph-jinyeongjang-myblog.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github)](https://github.com/jinyeongjang/skt-aleph-jinyeongjang-myblog)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![Oxlint](https://img.shields.io/badge/Oxlint-Passing-00C7B7?style=flat)](https://oxc.rs)

---

## 🌟 핵심 특징 (Key Highlights)

- **무로그인 공개 정적 웹 (T01-C01, T01-C02)**: 별도의 회원가입이나 인증 절차 없이 브라우저 시크릿 창에서 즉시 모든 콘텐츠 열람 가능
- **기준 해상도 첫 화면 3요소 노출 (T01-C10, T01-C11)**: 1366×768 및 1920×1080 해상도에서 스크롤 없이 **01 소개(Intro) · 02 활동(Activities) · 03 근거(Evidence)** 3대 요소가 첫 화면(Above the Fold)에 동시 노출
- **STAR 기반 4대 핵심 강점 (T01-C06 ~ T01-C09)**: 현장 실무 경험을 바탕으로 **상황(Situation) · 행동(Action) · 결과(Result) · 공개 근거(Evidence)** 4단계 모델을 적용하여 객관적으로 입증
- **2년 10개월 실무 경력 및 5대 탭 분류 이력서**: (주)블루커뮤니케이션 매니저 실무, (주)케이티씨에스 IT 전문 강사, 컴퓨터공학 학사(3.97/4.5), 국가공인 자격 및 수상 이력
- **웹 접근성 & 모션 제어 (WCAG AA · T01-C13 ~ T01-C22)**:
  - 본문 바로가기(`Skip to content`) 링크 및 모든 대화형 요소 초점 링(`focus-visible:ring-2`)
  - 흰색/다크 배경 기준 명암비 4.5:1 이상 전수 준수 (`text-neutral-500` 이상)
  - 상단 헤더 '애니메이션 활성화/비활성화' 토글 및 `prefers-reduced-motion` 자동 연동
- **테마 시스템 (Light / Dark Mode)**: 모노크롬 & 글래스모피즘 기반 다크 모드 지원 및 `localStorage` 영구 보존
- **보안 및 개인정보 보호 (T01-C23, T01-C24)**: 법적 민감 식별정보(주민번호/자택주소) 및 사적 연락처, API 시크릿 0건 전수 감사 통과

---

## 📂 프로젝트 구조 및 컴포넌트 아키텍처

```text
skt-aleph-jinyeongjang-myblog/
├── condition/                  # 과제 평가 기준 공식 이미지 (condi-1 ~ condi-6)
├── public/                     # 정적 웹 에셋
├── src/
│   ├── assets/                 # 이미지 및 리소스
│   ├── components/
│   │   ├── Header.tsx          # 고정 헤더, 네비게이션, 테마 및 애니메이션 토글 (T01-C14, C22)
│   │   ├── Hero.tsx            # 히어로 타이틀, 태그, 첫 화면 3요소 퀵 프리뷰 (T01-C10, C11, C15)
│   │   ├── About.tsx           # 대상·목적 1문장, 공개/비공개 정보 점검표 탭 (T01-C03 ~ C05, C19 ~ C21)
│   │   ├── Skills.tsx          # 4대 기술 스택 분류 (Frontend, Backend, Cloud/Infra, Tools)
│   │   ├── Projects.tsx        # 6대 실전 프로젝트 라이브 데모 및 GitHub 저장소 (T01-C13)
│   │   ├── Education.tsx       # 2년 10개월 실무 경력, 학력, 자격, 수상 5대 탭 컴포넌트
│   │   ├── Strengths.tsx       # STAR 모델 기반 4대 실전 강점 및 공인 근거 (T01-C06 ~ C09)
│   │   ├── Values.tsx          # 3대 핵심 가치 및 직무 가치관
│   │   ├── WorkStyle.tsx       # 협업 사용설명서, 충전 요소 및 주의사항
│   │   ├── Contact.tsx         # 공식 소통 채널 (noreply 이메일, GitHub, 원클릭 복사)
│   │   └── Footer.tsx          # 푸터 및 저작권 명시
│   ├── lib/
│   │   └── utils.ts            # clsx / tailwind-merge 유틸리티
│   ├── App.tsx                 # 최상위 레이아웃 및 가로 넘침 방지 (T01-C12)
│   ├── index.css               # Tailwind CSS v4 스타일시트
│   └── main.tsx                # 애플리케이션 엔트리 포인트
├── CRITERIA.md                 # 26개 세부 평가 기준 공식 명세서 (T01-C01 ~ T01-C26)
├── GEMINI.md                   # 프로젝트 품질 표준 및 AI 가이드라인
├── GITMOJI.md                  # Gitmoji 커밋 컨벤션 가이드
├── package.json                # 의존성 및 스크립트 정의
└── README.md                   # 프로젝트 소개 및 과제 제출서
```

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분             | 기술 / 도구              | 활용 목적                                                   |
| :--------------- | :----------------------- | :---------------------------------------------------------- |
| **Core**         | React 19, TypeScript 5.9 | 모던 컴포넌트 기반 UI 개발 및 엄격한 타입 안정성 보장       |
| **Styling**      | Tailwind CSS v4          | 글래스모피즘, 반응형 그리드, 유틸리티 퍼스트 스타일링       |
| **Animation**    | Framer Motion            | 부드러운 진입/전환 애니메이션 및 `reduced-motion` 모션 감속 |
| **Icons**        | Lucide React             | 경량화된 고품질 벡터 아이콘                                 |
| **Tooling**      | Vite 8.2                 | 초고속 HMR 개발 환경 및 최적화된 프로덕션 번들링            |
| **Code Quality** | Prettier, Oxlint         | 자동 포맷팅 및 초고속 Rust 기반 정적 린팅 (오류 0건)        |
| **Deployment**   | Vercel                   | 무로그인 글로벌 CDN 정적 웹 배포                            |

---

## 💻 로컬 개발 및 품질 검증 스크립트

```bash
# 1. 의존성 패키지 설치
npm install

# 2. 로컬 개발 서버 구동 (HMR)
npm run dev

# 3. 코드 스타일 자동 포맷팅 (Prettier)
npm run format

# 4. 코드 품질 정적 분석 (Oxlint 오류 0건)
npm run lint

# 5. TypeScript 컴파일 및 프로덕션 번들링 빌드
npm run build
```

---

## 💬 Gitmoji 커밋 컨벤션

본 프로젝트는 **Gitmoji + Conventional Commits** 규칙을 엄격히 적용합니다. 상세 규격은 [`GITMOJI.md`](GITMOJI.md)를 참고하세요.

```bash
# Git 커밋 템플릿 로컬 설정
git config --local commit.template .gitmessage.txt

# 커밋 실행
git commit
```

---

## 📋 과제 평가 기준 및 AI 에이전트 규칙 정의

- [`CRITERIA.md`](CRITERIA.md): 과제 6대 요구조건 이미지(`condi-1` ~ `condi-6`) 및 26개 세부 평가 기준(`T01-C01` ~ `T01-C26`) 공식 명세서
- [`GEMINI.md`](GEMINI.md): AI 코딩 어시스턴트 및 기여자를 위한 프로젝트 품질 표준, 웹 접근성, 레이아웃 강제 규칙 정의 파일

---

## 📝 과제 1: 나를 소개하는 한 페이지 — 제출서 (Submission)

### 1. 제출 링크

- **결과물 주소 (무로그인 공개 화면)**: [https://skt-aleph-jinyeongjang-myblog.vercel.app](https://skt-aleph-jinyeongjang-myblog.vercel.app)
- **소스 주소 (GitHub 공개 레포지토리)**: [https://github.com/jinyeongjang/skt-aleph-jinyeongjang-myblog](https://github.com/jinyeongjang/skt-aleph-jinyeongjang-myblog)

### 2. 짧은 확인 방법 4줄 (T01-C25)

1. **어디로 가나요**: 브라우저 새 시크릿 창을 열고 [https://skt-aleph-jinyeongjang-myblog.vercel.app](https://skt-aleph-jinyeongjang-myblog.vercel.app) 주소로 접속합니다.
2. **3단계 이내 무엇을 하나요**:
   - ① 첫 화면(Above the Fold)에서 01 소개·02 대표 활동·03 검증 근거 3개 카드가 스크롤 없이 동시에 보이는지 확인합니다.
   - ② 소개 섹션의 `[비공개 정보 점검표 (3개 항목)]` 탭을 마우스 클릭 또는 `Tab`+`Enter` 키로 전환합니다.
   - ③ 상단 헤더 우측의 `[애니메이션 토글]` 및 `[다크 모드 토글]` 버튼을 클릭하여 시각적 효과와 테마 변경을 확인합니다.
3. **무엇이 보이면 통과인가요**: 로그인이나 인증 없이 전체 페이지가 즉시 열리고, 탭 전환 시 비공개 정보(민감 식별정보, 사적 연락처, 보안 키) 3개 항목이 즉시 표시되며 브라우저 콘솔 오류가 0건이면 통과입니다.
4. **안 될 때 무엇이 보이나요**: 로그인/비밀번호 입력 창이 요구되거나, 탭 전환 시 화면 내용이 바뀌지 않거나, 브라우저 개발자 도구 콘솔에 빨간색 런타임 오류가 발생합니다.

### 3. AI와 나의 판단 3줄 (T01-C26)

1. **AI에게 맡긴 일**: Tailwind CSS 기반 글래스모피즘 스타일링 및 반응형 그리드 레이아웃 구현, Prettier/Oxlint 코드 품질 자동화 환경 설정, WAI-ARIA 접근성 속성(`role="tab"`, `aria-selected`, `focus-visible`) 기본 템플릿 작성.
2. **학생이 직접 판단한 일**: 공개 정보(6대 프로젝트 라이브 데모, 2년 10개월 실무 경력, 직무 기술 스택, STAR 핵심 강점, 국가공인 자격)와 비공개 정보(민감 PII, 개인 연락처, API 시크릿)의 분류 기준 수립, STAR 모델 기반 실전 경험(맞춤형 코딩 실기 교육 및 부트캠프 완주, 지속적 기술 탐구, SW·AI 거점센터 실습 운영 및 안전 관리, 데이터 기반 문제 해결 및 학과대표 멘토링)과 공인 근거(동원종합사회복지관 우수강사상, KDT 과제상, AWS Jam 수료증, 거점센터 실무 경력) 선정, 1366×768 해상도에서 첫 화면 3요소가 잘리지 않도록 Hero 높이 및 여백 최적화.
3. **AI 제안을 따르지 않은 일**: AI가 초기에 제안했던 무거운 대형 로드맵 타임라인 컴포넌트와 외부 웹폰트 임포트는 1366×768 첫 화면 세로 넘침을 유발하고 초기 렌더링 성능을 저하시킬 수 있어 채택하지 않고, 간결한 3분할 퀵 프리뷰 카드와 시스템 폰트 스택으로 변경 적용했습니다.

### 4. 실제 결함 3개 수정 기록 (T01-C17)

1. **결함 1 (더미 링크)**:
   - **수정 전**: 외부 연결 링크에 `https://example.com` 더미 주소가 사용됨.
   - **수정 후**: 실제 배포된 기술 블로그([skt-aleph-jinyeongblog.vercel.app](https://skt-aleph-jinyeongblog.vercel.app)) 및 GitHub 실제 저장소 URL로 전면 교체 (T01-C13 준수).
2. **결함 2 (연락처 및 개인정보 보호)**:
   - **수정 전**: 개인 연락처 노출 우려 또는 임의의 더미 이메일(`user@example.com`) 방치 상태.
   - **수정 후**: GitHub 공식 연동 noreply 이메일(`jinyeongjang@users.noreply.github.com`)과 원클릭 클립보드 복사 인터랙션으로 교체하여 개인정보 보호 및 소통 창구 동시 확보 (T01-C05, T01-C23 준수).
3. **결함 3 (웹 접근성 명암비 미달)**:
   - **수정 전**: 부가 설명 텍스트에 `text-neutral-400`(#a3a3a3)이 적용되어 흰색 배경 기준 명암비 2.8:1로 WCAG AA(4.5:1) 기준에 미달.
   - **수정 후**: `text-neutral-500`(#737373, 4.61:1) 및 `text-neutral-600`(#525252, 7.0:1) 이상으로 교체하여 웹 접근성 명암비 100% 충족 (T01-C16 준수).

### 5. 완주 체크리스트 (Checklist)

- [x] **대상·공개 범위와 근거를 정했습니다**: 대상/목적 1문장, 공개 정보 3건, 비공개 정보 3건, STAR 기반 강점 4건 및 공인 근거 명시 완료.
- [x] **두 기준 화면과 실제 결함을 검사했습니다**: 1366×768 및 1920×1080 첫 화면 3요소(소개·활동·근거) 동시 노출, 가로 넘침 0건, 더미링크/명암비 등 3개 결함 수정 완료.
- [x] **상호작용을 마우스와 키보드로 확인했습니다**: 공개/비공개 탭 전환(마우스 클릭 & Tab/Enter/Space), 헤더 고정, 애니메이션 끄기(Reduce Motion) 토글 확인 완료.
- [x] **공개 금지 정보와 비밀값이 없습니다**: 주민등록번호, 개인 휴대전화 번호, 상세 자택 주소 및 API 키/비밀번호 0건 전수 감사 완료.
- [x] **짧은 확인법과 AI/본인 판단을 제출합니다**: 4줄 확인 절차 및 3줄 판단 기록 작성 완료.
