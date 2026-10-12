# 🌐 SKT ALEPH 장진영 포트폴리오 & 계속 새로 쓰는 장치

> **SKT ALEPH 1기 기업 현장 중심 보안 & 네트워크 인프라 트랙**  
> 개발자 장진영의 핵심 가치관, 실무 기술 역량, 프로젝트 및 학습 경험을 투명하게 공유하며, **과제 12(마지막 과제 BR-A: 1,500자 고난 극복 본편 서사 & 결정론적 자동 갱신 장치)** 및 **FIDO2 / WebAuthn 무암호화 패스키(Passkey) 비공개 금고**를 완비한 공개 반응형 포트폴리오 웹입니다.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-black?style=flat&logo=vercel)](https://skt-aleph-jinyeongjang-myblog.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github)](https://github.com/jinyeongjang/skt-aleph-jinyeongjang-myblog)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![Oxlint](https://img.shields.io/badge/Oxlint-Passing-00C7B7?style=flat)](https://oxc.rs)
[![Deterministic Updater](https://img.shields.io/badge/SHA--256-100%25%20Match-brightgreen?style=flat)](portfolio-updater/README.md)

---

## 📑 목차 (Table of Contents)

1. [🌟 핵심 특징 (Key Highlights)](#-핵심-특징-key-highlights)
2. [📂 프로젝트 구조 및 컴포넌트 아키텍처](#-프로젝트-구조-및-컴포넌트-아키텍처)
3. [🛠️ 기술 스택 (Tech Stack)](#️-기술-스택-tech-stack)
4. [💻 로컬 개발 및 품질 검증 스크립트](#-로컬-개발-및-품질-검증-스크립트)
5. [📋 과제 평가 기준 및 AI 에이전트 규칙 정의](#-과제-평가-기준-및-ai-에이전트-규칙-정의)
6. [📝 과제 12: 마지막 과제 BR-A — 나를 소개하는 사이트, 그리고 계속 새로 쓰는 장치 (Submission)](#-과제-12-마지막-과제-br-a--나를-소개하는-사이트-그리고-계속-새로-쓰는-장치-submission)
   - [1. 제출물 목록 (BRA-C20, BRA-C21)](#1-제출물-목록-bra-c20-bra-c21)
   - [2. 짧은 확인 방법 4줄 (BRA-C11)](#2-짧은-확인-방법-4줄-bra-c11)
   - [3. AI와 나의 판단 3줄 (BRA-C12)](#3-ai와-나의-판단-3줄-bra-c12)
   - [4. 과제 12 완주 체크리스트 7대 항목 (BRA-C01 ~ BRA-C10)](#4-과제-12-완주-체크리스트-7대-항목-bra-c01--bra-c10)
7. [📝 과제 8: 내 소개 페이지에 패스키 달기 — 제출서 (Submission)](#-과제-8-내-소개-페이지에-패스키-달기--제출서-submission)
   - [1. 제출 링크](#1-제출-링크)
   - [2. 짧은 확인 방법 4줄 (T08-C52)](#2-짧은-확인-방법-4줄-t08-c52)
   - [3. AI와 나의 판단 3줄 (T08-C53)](#3-ai와-나의-판단-3줄-t08-c53)
   - [4. 인증 구현 설명서 여섯 항목 (T08-C47 ~ T08-C51)](#4-인증-구현-설명서-여섯-항목-t08-c47--t08-c51)
   - [5. 완주 체크리스트 (T08)](#5-완주-체크리스트-t08)
8. [📝 과제 1: 나를 소개하는 한 페이지 — 제출서 (Submission)](#-과제-1-나를-소개하는-한-페이지--제출서-submission)
   - [1. 제출 링크](#1-제출-링크-1)
   - [2. 짧은 확인 방법 4줄 (T01-C25)](#2-짧은-확인-방법-4줄-t01-c25)
   - [3. AI와 나의 판단 3줄 (T01-C26)](#3-ai와-나의-판단-3줄-t01-c26)
   - [4. 실제 결함 3개 수정 기록 (T01-C17)](#4-실제-결함-3개-수정-기록-t01-c17)
   - [5. 완주 체크리스트 (T01)](#5-완주-체크리스트-t01)

---

## 🌟 핵심 특징 (Key Highlights)

- **과제 12: 나를 소개하는 사이트 & 계속 새로 쓰는 장치 (BRA-C01 ~ BRA-C21)**:
  - **1,500자 고난 극복 사실 환원 본편 (BRA-C01, BRA-C04)**: 11번 소설 이야기를 바탕으로 각색한 대목을 사실로 환원하여, 2024년 11월 프로젝트 진행 중 예기치 못한 치명적 오류 발생의 절망에서 출발해 문제 해결을 위해 끝까지 파고들며 ALEPH 인프라 트랙을 통해 성장한 울림 있는 서사 수록 (소설 텍스트 원문 배제).
  - **세 능력 성장 장면 매핑 (BRA-C02)**: 자기조절력(로그 역추적), 대인관계력(조별 발표 및 3-Way Handshake 도식화 지원), 자기동기력(양산-부산 통학 속 성실함 및 시스템 밑단 탐구 등 자기개발) 3대 능력이 구체적 날짜와 함께 증명.
  - **첫 화면 본인 이름과 한 줄 소개 및 4대 통합 입구 (BRA-C03)**: `장진영` 이름 및 `"SKT ALEPH 과정을 통해 네트워크와 보안 인프라의 깊이를 더하며 꾸준히 성장하는 사람"`(`…한 사람` 준수) 명시, 4대 필수 입구 카드(`01. 내 이야기`, `02. 13주 숫자`, `03. 대표작`, `04. 지원 문서`) 원클릭 스크롤 이동.
  - **13주 기록 6대 숫자와 고난 극복 지표 연계 (BRA-C05)**: 3대 출처(내 출석 기록, 리추얼 기록, 내 제출 현황)를 명시하고, 2024년 11월 프로젝트 진행 중 예기치 못한 오류 발생 고난과 13주 출석 100%(65일) 및 리추얼 80회(40일)를 연계하여 회복탄력성과 과제지속력 입증.
  - **대표작 2선 구성 (BRA-C06)**: 10번 다중 에이전트 협업 토폴로지 연구 논문 라이브 링크 및 13번 프로덕션 앱 슬롯 준비 완료(`2026년 10월 15일 공개 예정`).
  - **지원 문서 3종 완비 (BRA-C07, BRA-C08, BRA-C21)**: 이력서, 자기소개서, 12개 과제 STAR 경력기술서를 웹 뷰어 및 DOCX/Markdown/Text 파일로 비밀번호 없이 즉시 제공.
  - **결정론적 자동 갱신 장치 (BRA-C09)**: 새 기록(출석/리추얼/과제) 입력 시 사이트의 숫자 칸과 승인 문단 후보를 다시 생성하는 독립 장치(`portfolio-updater/`), 임시 폴더 2회 연속 실행 시 SHA-256 해시 100% 일치 보장.
- **무로그인 공개 정적 웹 (T01-C01, T01-C02, BRA-C13)**: 회원가입이나 인증 절차 없이 브라우저 시크릿 창에서 즉시 모든 공개 포트폴리오 열람 가능.
- **기준 해상도 첫 화면 3요소 노출 (T01-C10, T01-C11)**: 1366×768 및 1920×1080 해상도에서 스크롤 없이 **01 소개(Intro) · 02 활동(Activities) · 03 근거(Evidence)** 3대 요소가 첫 화면(Above the Fold)에 동시 노출.
- **무암호화 패스키 비공개 금고 (과제 8 · T08-C01 ~ T08-C53)**:
  - 비밀번호 입력창 **0개** (T08-C35) — Web Crypto API 기반 ECDSA P-256 비대칭 공개키 서명 인증.
  - 32바이트 암호학적 1회용 챌린지 생성 및 즉시 소모로 재전송 공격(Replay Attack) 방어 (T08-C19, T08-C31).
  - 다중 계정 격리(IDOR 차단 HTTP 403) 및 4대 실시간 보안 검증 랩 탑재.
- **보안 및 개인정보 보호 (BRA-C10, T01-C23, T01-C24)**: 장진영 본인 이름 및 공개 연락처 1건 외 타인 실명 0건, 개인 휴대전화 0건, 비밀번호 필드 0개, API 키 하드코딩 0건 전수 검증.

---

## 📂 프로젝트 구조 및 컴포넌트 아키텍처

```text
skt-aleph-jinyeongjang-myblog/
├── api/
│   └── passkey.ts                      # Vercel Serverless / Node HTTP Passkey API 엔드포인트 핸들러
├── condition/                          # 과제 평가 기준 공식 이미지 및 텍스트 (condi 12-1 ~ 12-7, condi 1 ~ 12)
├── portfolio-updater/                  # ⚙️ 과제 12 계속 새로 쓰는 장치 (결정론적 갱신 엔진)
│   ├── inputs/                         # 출석, 리추얼, 프로젝트 입력 JSON
│   ├── output/                         # 장치가 재생성한 숫자 칸(site-metrics.json) 및 승인 문단(md)
│   ├── updater.js                      # Node.js 독립 실행 스크립트
│   ├── updater.py                      # Python 독립 실행 스크립트
│   ├── test_reproducibility.py          # 새 임시 폴더 2회 실행 SHA-256 해시 일치 검증기 (BRA-C09)
│   └── README.md                       # 장치 실행 3단계 가이드
├── public/
│   └── downloads/                      # 비밀번호 없는 지원 문서 및 장치 ZIP 배포 폴더
│       ├── resume-coverletter-portfolio.docx # 지원 문서 합본 (DOCX)
│       ├── resume-coverletter-portfolio.md   # 지원 문서 합본 (Markdown)
│       ├── resume-coverletter-portfolio.txt  # 지원 문서 합본 (Text)
│       └── portfolio-updater.zip             # 장치 소스 + README + 마지막 결과 ZIP (BRA-C21)
├── src/
│   ├── components/                     # 리액트 UI 컴포넌트
│   │   ├── Header.tsx                  # 고정 상단 헤더, 네비게이션, 모션 및 다크모드 토글
│   │   ├── Hero.tsx                    # 🌟 첫 화면 이름, 한 줄 소개, 4대 통합 입구 카드 데크
│   │   ├── Story.tsx                   # 📖 과제 12 본편 1,500자 고난 극복 서사 & 3대 능력 장면
│   │   ├── Numbers.tsx                 # 📊 13주 기록 6대 숫자 칸, 출처 3곳 & 고난 페어링 배너
│   │   ├── FeaturedWorks.tsx           # 🏆 대표작 2선: 10번 연구 논문 & 13번 앱 예정 자리 슬롯
│   │   ├── Documents.tsx               # 📄 3대 문서 뷰어: 이력서, 자기소개서, 12대 과제 STAR
│   │   ├── RefreshEngine.tsx           # ⚙️ 새로 쓰는 장치 인터랙티브 시뮬레이터 & ZIP 다운로드
│   │   ├── SubmissionVerify.tsx        # 📋 4줄 확인 방법 & AI와 나의 판단 3줄 완주 검증기
│   │   ├── PasskeyVault.tsx            # 🔒 과제 8 WebAuthn 패스키 비공개 금고 & 보안 검증 랩
│   │   └── Footer.tsx                  # 저작권 및 표준 준수 푸터
│   ├── data/
│   │   └── portfolioData.ts            # 수강생 정보, 본편 서사, 13주 숫자, STAR 과제 데이터 명세
│   ├── lib/
│   │   └── passkey/                    # WebAuthn 비대칭 암호학 및 인증 엔진
│   ├── App.tsx                         # 최상위 레이아웃 및 가로 넘침 방지 (overflow-x-clip)
│   ├── index.css                       # Tailwind CSS v4 스타일시트
│   └── main.tsx                        # 진입점
├── generate_application_docs.py        # 지원 문서 3종(DOCX/MD/TXT) 자동 생성기
├── CRITERIA.md                         # 26개(과제1) + 53개(과제8) 세부 평가 기준 공식 명세서
├── GEMINI.md                           # 영구 품질 표준 및 AI 에이전트 지침서
├── GITMOJI.md                          # Gitmoji 커밋 컨벤션 가이드
├── package.json                        # 의존성 및 실행 스크립트
└── README.md                           # 프로젝트 종합 소개 및 과제 제출서 (본 문서)
```

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분                     | 기술 / 도구                     | 활용 목적                                                             |
| :----------------------- | :------------------------------ | :-------------------------------------------------------------------- |
| **Frontend Core**        | React 19, TypeScript 5.9        | 컴포넌트 기반 반응형 UI 및 엄격한 타입 안정성 보장                    |
| **Styling**              | Tailwind CSS v4                 | 모던 글래스모피즘, 앰비언트 글로우, 가독성 줄바꿈(`break-keep`)       |
| **Animation**            | Framer Motion                   | 부드러운 스크롤 인터랙션 및 `prefers-reduced-motion` 모션 감속        |
| **Deterministic Engine** | Python 3, Node.js               | 과제 12 결정론적 자동 갱신 장치 및 SHA-256 해시 재현성 검증           |
| **Authentication**       | WebAuthn, FIDO2, Web Crypto API | 비밀번호 없는 비대칭 공개키(ECDSA P-256) 기반 생체/보안키 패스키 인증 |
| **Code Quality**         | Prettier, Oxlint                | 코드 자동 정렬 및 Rust 기반 초고속 정적 린팅 (오류/경고 0건)          |
| **Deployment**           | Vercel                          | 무로그인 글로벌 CDN 정적 웹 및 서버리스 API 배포                      |

---

## 💻 로컬 개발 및 품질 검증 스크립트

```bash
# 1. 의존성 패키지 설치
npm install

# 2. 로컬 개발 서버 구동 (Passkey API 미들웨어 포함)
npm run dev

# 3. 코드 스타일 자동 포맷팅 (Prettier)
npm run format

# 4. 코드 품질 정적 분석 (Oxlint 오류/경고 0건)
npm run lint

# 5. TypeScript 컴파일 및 프로덕션 번들링 빌드
npm run build

# 6. 결정론적 갱신 장치 2회 실행 해시 일치 검증 (BRA-C09)
python portfolio-updater/test_reproducibility.py

# 7. 지원 문서 3종(DOCX, MD, TXT) 자동 재생성
python generate_application_docs.py
```

---

## 📋 과제 평가 기준 및 AI 에이전트 규칙 정의

- [`CRITERIA.md`](CRITERIA.md): 과제 1(`condi-1` ~ `condi-6`) 및 과제 8(`condi-7` ~ `condi-12`) 세부 평가 기준 공식 명세서
- [`GEMINI.md`](GEMINI.md): AI 코딩 어시스턴트 및 기여자를 위한 영구 품질 표준, 웹 접근성, 레이아웃 규격 명세서
- [`portfolio-updater/README.md`](portfolio-updater/README.md): 과제 12 새로 쓰는 장치 실행 3단계 가이드

---

## 📝 과제 12: 마지막 과제 BR-A — 나를 소개하는 사이트, 그리고 계속 새로 쓰는 장치 (Submission)

### 1. 제출물 목록 (BRA-C20, BRA-C21)

- **결과물 주소 (무로그인 공개 사이트)**: [https://skt-aleph-jinyeongjang-myblog.vercel.app](https://skt-aleph-jinyeongjang-myblog.vercel.app)
- **소스 주소 (GitHub 공개 레포지토리)**: [https://github.com/jinyeongjang/skt-aleph-jinyeongjang-myblog](https://github.com/jinyeongjang/skt-aleph-jinyeongjang-myblog)
- **지원 문서 모음 파일 (DOCX / MD / TXT · 비밀번호 없음)**:
  - DOCX 합본: [`/downloads/resume-coverletter-portfolio.docx`](https://skt-aleph-jinyeongjang-myblog.vercel.app/downloads/resume-coverletter-portfolio.docx)
  - MD 합본: [`/downloads/resume-coverletter-portfolio.md`](https://skt-aleph-jinyeongjang-myblog.vercel.app/downloads/resume-coverletter-portfolio.md)
  - TXT 합본: [`/downloads/resume-coverletter-portfolio.txt`](https://skt-aleph-jinyeongjang-myblog.vercel.app/downloads/resume-coverletter-portfolio.txt)
- **장치 ZIP (실행 소스 + README + 마지막 결과 · 비밀번호 없음)**:
  - ZIP 파일: [`/downloads/portfolio-updater.zip`](https://skt-aleph-jinyeongjang-myblog.vercel.app/downloads/portfolio-updater.zip)

#### 📄 제출한 지원 문서 파일 상세 내용 (DOCX / MD / TXT)

동일한 내용이 3대 포맷(`docx`, `md`, `txt`)으로 제공되며, 비밀번호 없이 즉시 열람 및 인쇄가 가능합니다:

| 문서 구분                               | 분량 / 형식                 | 주요 포함 내용 및 서술 규격                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :-------------------------------------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **01. 이력서 (Resume)**                 | 표준 이력서 서식            | • **기본 인적사항**: 성명(장진영), 공개 소통 이메일(`jinyeongjang@users.noreply.github.com`), 포트폴리오 라이브 URL, GitHub URL<br>• **한 줄 소개**: `"SKT ALEPH 과정을 통해 네트워크와 보안 인프라의 깊이를 더하며 꾸준히 성장하는 사람"` (BRA-C03)<br>• **학력**: 컴퓨터공학과 학사(학점 3.97/4.5, 대학교명 비식별화 마스킹 완료)<br>• **실무 경력 (2년 10개월)**: (주)블루커뮤니케이션 운영 매니저, (주)케이티씨에스 IT 전문 강사<br>• **교육 이력**: SKT ALEPH 1기 기업 현장 중심 보안 & 네트워크 인프라 트랙 (2026.07 ~ 2026.10, 65일 전수 출석)<br>• **자격 및 수상**: ITQ OA Master, ERP Master 국가공인 자격 및 사상구청장 표창장(구정 발전 유공) |
| **02. 자기소개서 (Cover Letter)**       | 1,602자 (공백 제외 1,233자) | • **제목**: `"열쇠 없는 문을 지키는 법 — 비밀번호 너머의 신뢰를 짓다"`<br>• **본편 서사 구조 (BRA-C01, BRA-C04)**: 2024년 11월 프로젝트 진행 중 예기치 못한 치명적 오류 발생 고난 ➔ 문제 해결을 위한 노력과 통신 흐름 규명 ➔ ALEPH 1기 지원 및 왕복 1시간 30분 성실한 통학 ➔ 네트워크·소켓·패킷 분석 학습 및 더 나아진 현재로 이어지는 울림 있는 사실 환원 서사 (소설 원문 배제)<br>• **세 능력 구체 장면 (BRA-C02)**: 일상의 기복을 통제하는 **자기조절력**(로그 역추적), 동료와 보폭을 맞추는 **대인관계력**(조별 발표 및 3-Way Handshake 도식화), 바닥까지 규명하는 집요한 **자기동기력**(WebAuthn RFC 바이트 파서 구현 및 시스템 밑단 자기개발)       |
| **03. 경력기술서 (Career Description)** | 12개 과제 전수 (12건 STAR)  | • **1~12번 과제 전수 수록 (BRA-C08)**: 과제 하나당 한 줄 요약 및 세 능력 매핑<br>• **STAR 4단계 서술**: 각 과제별 상황(Situation) · 행동(Action) · 결과(Result) 엄밀 기술<br> - 과제 1 (무로그인 포트폴리오 웹): [대인관계력] WCAG AA 웹 접근성 준수<br> - 과제 8 (WebAuthn 패스키 비공개 금고): [자기동기력] FIDO2 비대칭 암호 엔진 및 4대 보안 거절 랩 구축<br> - 과제 10 (다중 에이전트 협업 토폴로지 연구 논문): [자기조절력] 단위 테스트 검증 벤치마크 및 논문 완결<br> - 과제 12 (자기소개 사이트 & 새로 쓰는 장치): [자기동기력] 결정론적 자동 갱신 엔진 및 100% 해시 재현성 검증                                                                  |

#### ⚙️ 제출한 장치 파일 상세 내용 (`portfolio-updater.zip`)

새로운 리추얼 일지, 출석 일수, 과제 목록을 추가하고 실행하면 사이트의 숫자 칸과 승인 문단 후보를 결정론적으로 다시 생성해 주는 엔진입니다 (BRA-C09):

| 파일 / 폴더                          |   형식   | 역할 및 포함 내용                                                                                                                                                                         |
| :----------------------------------- | :------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`updater.py`**                     | Python 3 | 외부 서드파티 라이브러리 없이 표준 라이브러리(`json`, `hashlib`, `os`)만으로 동작하는 장치 독립 실행 엔진                                                                                 |
| **`updater.js`**                     | Node.js  | 동일한 로직을 Node.js 환경에서 구동할 수 있도록 구현된 JavaScript 실행 엔진                                                                                                               |
| **`test_reproducibility.py`**        | Python 3 | 임시 디렉터리(`tempfile`)를 생성하여 장치를 2회 연속 실행한 뒤, 1회차와 2회차 결과 파일의 SHA-256 해시가 **100% 일치(`01f8e1c4...` / `3c59cbc2...`)**하는지 검증하는 자동 테스트 스크립트 |
| **`inputs/attendance.json`**         |   JSON   | 13주 출석 65일, 지각/결석 0회, 새벽 30일 조기 입실 기록 데이터                                                                                                                            |
| **`inputs/rituals.json`**            |   JSON   | 40일 전수 80회 아침/저녁 리추얼 일지 및 동료 피드백 데이터                                                                                                                                |
| **`inputs/projects.json`**           |   JSON   | 12개 과제 메타데이터 및 세 능력 역량 분류 데이터                                                                                                                                          |
| **`approved_candidates.json`**       |   JSON   | 학생이 직접 검토하여 승인(Toggle)한 문단 후보 ID 목록 (`cand-self-regulation`, `cand-interpersonal`, `cand-self-motivation`)                                                              |
| **`output/site-metrics.json`**       |   JSON   | 장치가 재계산한 13주 출석률(100%), 리추얼(80회), 과제 완료(12개) 및 고난 극복 지표 연계 데이터                                                                                            |
| **`output/generated-paragraphs.md`** | Markdown | 날짜와 공인 근거가 바인딩된 능력별 승인 문단 후보 텍스트                                                                                                                                  |
| **`output/last-run.json`**           |   JSON   | 실행 타임스탬프, 성공 상태 플래그 및 SHA-256 무결성 검증 복합 해시                                                                                                                        |
| **`README.md`**                      | Markdown | 장치 실행 3단계 가이드, 입출력 포맷 명세 및 결정론적 재현성 보장 원리 설명서                                                                                                              |

---

### 2. 짧은 확인 방법 4줄 (BRA-C11)

1. **① 어디서 확인하나요**:
   - **공개 사이트 주소**: [https://skt-aleph-jinyeongjang-myblog.vercel.app](https://skt-aleph-jinyeongjang-myblog.vercel.app)
   - **사이트 내 이야기·숫자·대표작 위치**:
     - **이야기(Story) 위치**: 첫 화면 카드 `[01. 내 이야기]` 또는 `#story` 앵커 (1,602자 사실 환원 본편 서사 & 세 능력 성장 장면)
     - **숫자(Numbers) 위치**: 첫 화면 카드 `[02. 13주 숫자]` 또는 `#numbers` 앵커 (3대 출처 명시 6대 핵심 지표 & 고난 극복 페어링 배너)
     - **대표작(Works) 위치**: 첫 화면 카드 `[03. 대표작]` 또는 `#works` 앵커 (10번 다중 에이전트 연구 논문 라이브 링크 & 13번 앱 예정 자리 슬롯)
     - **완주 검증 위치**: `#submission` 앵커 (짧은 확인 방법 4줄 & AI와 나의 판단 3줄 검증기)
   - **지원 문서 파일 안 어디에 무엇이 있나** (`#documents` 뷰어 및 다운로드 [`resume-coverletter-portfolio.docx`](https://skt-aleph-jinyeongjang-myblog.vercel.app/downloads/resume-coverletter-portfolio.docx), [`.md`](https://skt-aleph-jinyeongjang-myblog.vercel.app/downloads/resume-coverletter-portfolio.md), [`.txt`](https://skt-aleph-jinyeongjang-myblog.vercel.app/downloads/resume-coverletter-portfolio.txt)):
     - `01. 이력서 (Resume)`: 기본 인적사항(장진영), 한 줄 소개, 학력(3.97/4.5), 실무 경력(2년 10개월), ALEPH 1기(65일 전수 출석), 자격/수상(ITQ·ERP 국가공인 자격, 사상구청장 표창)
     - `02. 자기소개서 (Cover Letter)`: 2024년 11월 오류 고난 극복에서 ALEPH 인프라 트랙 및 더 나아진 현재로 이어지는 1,602자 본편 전수
     - `03. 경력기술서 (Career Description)`: 1~12번 과제 전수(12건) 한 줄 요약, 세 능력 매핑 및 STAR 4단계(상황·행동·결과) 서술
   - **장치 ZIP 파일 안 어디에 무엇이 있나** ([`portfolio-updater.zip`](https://skt-aleph-jinyeongjang-myblog.vercel.app/downloads/portfolio-updater.zip) 압축 해제):
     - `updater.py` / `updater.js`: 의존성 없는 Python 3 및 Node.js 결정론적 자동 갱신 실행 소스
     - `README.md`: 장치 실행 3단계 가이드 및 입출력 명세
     - `inputs/`: 출석(65일), 리추얼(40일 80회), 과제(12개) 입력 원천 JSON 데이터
     - `output/`: 장치가 재생성한 숫자 칸(`site-metrics.json`), 승인 문단(`generated-paragraphs.md`), 검증 해시(`last-run.json`) 마지막 실행 결과
     - `test_reproducibility.py`: 새 임시 폴더 2회 연속 실행 SHA-256 해시 100% 일치 자동 검증기
2. **② 무엇을 하나요 (3단계 이내)**:
   - 1단계: 브라우저 시크릿 창에서 공개 URL로 접속하여 첫 화면 이름(`장진영`)과 한 줄 소개, `[01. 내 이야기]` 1,500자 본편, `[02. 13주 숫자]` 고난 극복 지표 연계, `[03. 대표작]` 10번 논문 및 13번 앱 슬롯을 확인합니다.
   - 2단계: `[04. 지원 문서]`에서 이력서·자소서·경력기술서 뷰어를 열람하고 문서 파일 3종과 장치 ZIP을 다운로드합니다.
   - 3단계: 새 임시 폴더에서 장치 2회 실행(`python test_reproducibility.py`) 또는 웹 시뮬레이터로 SHA-256 해시 일치를 확인합니다.
3. **③ 무엇이 보이면 통과인가요**: 로그인/비밀번호/인증 없이 첫 화면과 1,500자 본편 및 세 능력 장면, 출처 명시 13주 숫자와 고난 극복 지표 연계, 10번 논문 및 13번 앱 슬롯이 보이고, 문서 3종과 장치 ZIP이 암호 없이 열리며, 새 폴더 2회 실행 SHA-256 해시가 100% 일치하면 통과입니다.
4. **④ 안 될 때 무엇이 보이나요**: 로그인/비밀번호 입력창이 요구되거나, 본인 외 다른 사람 실명이 노출되거나, 13번 앱 자리가 누락되어 있거나, 장치를 두 번 돌려 결과나 해시가 달라지는 경우입니다.

---

### 3. AI와 나의 판단 3줄 (BRA-C12)

1. **① AI에게 맡긴 일**: 11번 소설(3만 자)에서 사실에 부합하는 핵심 갈등·극복 대목 발췌, 13주 기록 데이터 스키마화, 이력서/경력기술서 STAR 구조화 초안 작성, Oxlint/Prettier 코드 품질 자동화 환경 설정.
2. **② 학생이 직접 판단한 일**: 2024년 11월 프로젝트 진행 중 예기치 못한 오류 발생 및 문제 해결 노력 고난 일화 선정, 각색된 소설 문장을 엄밀한 사실로 환원, 첫 문장과 마지막 문장 직접 집필, 13주 출석 100%와 리추얼 80회를 고난 장면과 직접 짝지음, 장치 결정론적 검증 기준 수립.
3. **③ AI 제안을 따르지 않은 일**: AI가 소설 속 과장된 표현(예: "천재적인 직관으로 모든 트래픽을 장악한 개발자", "기록에 없는 글로벌 분산 클라우드 총괄 경력")을 본편에 넣자고 제안했으나, 채용 담당자가 3분 안에 읽는 실제 지원 사이트이므로 일체의 과장을 전면 기각하고 사실에 입각한 1,500자 담백한 서사로 정제함.

---

### 4. 과제 12 완주 체크리스트 7대 항목 (BRA-C01 ~ BRA-C10)

- [x] **소설에서 자기소개의 본편을 뽑고 각색한 대목을 사실로 되돌렸습니다 (BRA-C01, BRA-C02)**:
  - 11번 소설 이야기를 바탕으로 각색한 대목을 사실로 환원한 1,602자(공백 제외 1,233자) 자기소개 본편 작성 완료. 소설 텍스트 원문은 사이트에 넣지 않고 본편으로 정제함.
  - 고난(2024.11 프로젝트 진행 중 예기치 못한 오류 발생 및 문제 해결 노력)에서 시작해 ALEPH 교육과정을 통한 네트워크·소켓·패킷 덤프 원리 규명과 더 나아진 지금으로 이어지며, 자기조절력·대인관계력·자기동기력 세 능력이 날짜 있는 장면과 함께 드러남.
- [x] **첫 화면에 내 이름과 한 줄 소개를 내 손으로 썼습니다 (BRA-C03, BRA-C04)**:
  - 본인 이름(`장진영`) 및 `"SKT ALEPH 과정을 통해 네트워크와 보안 인프라의 깊이를 더하며 꾸준히 성장하는 사람"` 한 줄 소개 작성 완료.
  - 본편 첫 문장(`"2024년 11월 늦가을, 프로젝트를 진행하던 중 서비스에 예기치 못한 치명적인 오류가 발생했을 때..."`)과 마지막 문장을 직접 손으로 집필함.
- [x] **13주 기록의 숫자를 출처와 함께 넣고 하나를 고난 장면과 연계했습니다 (BRA-C05)**:
  - 3대 출처 명시: ① 「내 출석 기록」(65/65일 전수 출석 100%, 지각 0회, 결석 0회, 새벽 통학 30일 조기 입실), ② 「리추얼 기록」(40일 전수 80회 작성 100%), ③ 「내 제출 현황」(12개 과제 제출 100%, 자동화 테스트 전수 PASS).
  - 고난 장면(2024년 11월 프로젝트 진행 중 예기치 못한 오류 발생 및 문제 해결을 위한 노력)과 13주 출석 100% & 리추얼 80회를 연계하여 회복탄력성과 과제지속력을 증명함.
- [x] **대표작 자리에 논문을 넣고 앱 자리를 마련했습니다 (BRA-C06)**:
  - 10번 연구 논문(`알고리즘 문제 해결 및 단위 테스트 검증에서 다중 에이전트 협업 토폴로지...`) 라이브 데모, GitHub, DOCX 다운로드 완비.
  - 13번 앱 자리 마련(슬롯 보존) 및 예정일(`2026년 10월 15일 공개 예정`) 명시 완료.
- [x] **이력서·자기소개서·경력기술서를 문서로 만들었습니다 (BRA-C07, BRA-C08, BRA-C21)**:
  - 이력서(장진영, 연락처, 학력 3.97, 공인 자격증, 사상구청장 표창, ALEPH 1기), 자기소개서(본편 전수), 경력기술서(12대 과제 전수 한 줄 기술 & 세 능력 매핑 & STAR) 완비.
  - DOCX, Markdown, Text 단일 합본 및 개별 파일 제공, 비밀번호 없이 즉시 열람 및 다운로드 보장.
- [x] **장치를 두 번 돌려 같은 결과가 나오는 것을 새 폴더에서 확인했습니다 (BRA-C09)**:
  - `portfolio-updater/` 스크립트(`updater.py` / `updater.js`) 및 `test_reproducibility.py`를 통해 새 임시 폴더에서 2회 연속 실행 SHA-256 해시 100% 일치(`01f8e1c4...` / `3c59cbc2...`) 검증 완료.
  - `portfolio-updater.zip` 패키징 완료 및 웹 인터랙티브 시뮬레이터 탑재.
- [x] **다른 사람의 실명과 비밀값을 지웠습니다 (BRA-C10)**:
  - 장진영 본인 이름 및 공개하기로 정한 연락처(`jinyeongjang@users.noreply.github.com`) 하나만 남기고, 다른 사람의 실명 0건, 개인 휴대폰 번호 0건, 비밀번호 입력 필드 0개, API 키 하드코딩 0건 전수 검증 완료.

---

## 📝 과제 8: 내 소개 페이지에 패스키 달기 — 제출서 (Submission)

### 1. 제출 링크

- **결과물 주소 (HTTPS)**: [https://skt-aleph-jinyeongjang-myblog.vercel.app](https://skt-aleph-jinyeongjang-myblog.vercel.app)
- **소스 주소 (GitHub HTTPS)**: [https://github.com/jinyeongjang/skt-aleph-jinyeongjang-myblog](https://github.com/jinyeongjang/skt-aleph-jinyeongjang-myblog)

---

### 2. 짧은 확인 방법 4줄 (T08-C52)

1. **① 어디로 가나요**: 브라우저 새 시크릿 창을 열고 [https://skt-aleph-jinyeongjang-myblog.vercel.app](https://skt-aleph-jinyeongjang-myblog.vercel.app)에 접속하여 `#vault` (비공개 구역) 섹션으로 이동합니다.
2. **② 세 단계 안에 무엇을 하나요**:
   - 1단계: 계정 선택에서 `[장진영 (jinyeong)]`을 선택하고 `[장진영 패스키 스캔 & 금고 열기]` 또는 `[추가 패스키 등록]` 버튼을 클릭합니다.
   - 2단계: 인증 완료 후 열린 비공개 자료실(4건의 기획/회고 문서)과 `[02 // 패스키 기기 관리]` 탭(등록된 패스키 목록 조회/삭제/추가)을 확인합니다.
   - 3단계: `[03 // 보안 검증 랩]` 탭으로 이동하여 `[2. 타 계정 비공개 자료 무단 조회(IDOR)]` 버튼을 클릭합니다.
3. **③ 무엇이 보이면 통과인가요**: 패스키 서명 검증 성공 배너와 함께 비공개 문서 4건이 즉시 렌더링되고, 보안 검증 랩에서 HTTP 403 Forbidden 응답 및 데이터 건수 무결성(시도 전후 동일)이 터미널에 표시되면 통과입니다.
4. **④ 안 될 때는 무엇이 보이나요**: 비밀번호 입력창이 나타나거나, 인증 없이도 비공개 데이터가 화면/소스코드에 노출되거나, 타 계정 데이터 요청 시 403이 아닌 200으로 비인가 열람되는 현상이 발생합니다.

---

### 3. AI와 나의 판단 3줄 (T08-C53)

1. **① AI에게 맡긴 일**: W3C WebAuthn 레벨 3 표준 스펙 분석, SubtleCrypto ECDSA P-256 서명 검증 시 DER과 IEEE P1363(R||S 64바이트) 포맷 변환 보정 로직 작성, 실시간 보안 검증 랩 터미널 UI 스타일링.
2. **② 내가 직접 판단한 일**: 외부 서드파티 인증 서비스(Auth0, Firebase 등)에 종속되지 않고 자체 Web Crypto API 기반의 경량화된 FIDO2 엔진을 구축하기로 결정, 플랫폼 인증기 미지원 기기 대응을 위한 원클릭 즉시 생성/하드웨어 스캔 듀얼 등록 체계 수립, 4대 거절 시나리오(인증 없음 401, IDOR 403, 챌린지 재사용 401, 삭제키 401) 설계 및 다중 계정(`jinyeong`, `evaluator_test`) 격리 구조 수립, 비공개 구역 데이터의 교육용 모의 데이터(Mock Data) 정책 확정.
3. **③ AI 제안을 따르지 않은 일**: AI가 초기에 제안했던 복잡한 대형 외부 라이브러리(`@simplewebauthn`) 번들 임포트는 Vite 빌드 용량을 1MB 이상 급증시키고 번들링 오버헤드를 유발하여 채택하지 않고, 순수 Web Crypto API 기반의 제로 디펜던시(Zero Dependency) 인라인 암호 엔진으로 대체하여 번들 크기를 최적화했습니다.

---

### 4. 인증 구현 설명서 여섯 항목 (T08-C47 ~ T08-C51)

#### ① 무엇으로 붙였나 (T08-C48)

- **구현 방식**: 표준 **Web Crypto API (SubtleCrypto)** 및 브라우저 네이티브 **FIDO2 / WebAuthn API (`navigator.credentials`)** 기반 자체 구현 (Direct Implementation).
- **사용 기술 및 라이브러리**:
  - 클라이언트: `navigator.credentials.create()`, `navigator.credentials.get()`, `crypto.subtle`
  - 서버 및 암호 엔진: TypeScript 기반 자체 암호화 엔진 ([`src/lib/passkey/crypto.ts`](src/lib/passkey/crypto.ts), [`src/lib/passkey/server.ts`](src/lib/passkey/server.ts))
  - 암호화 알고리즘: **ECDSA P-256 with SHA-256 (ES256, COSE Alg -7)**
  - 세션 식별자: HMAC-SHA256 암호학적 서명 기반 세션 토큰 (JWT 포맷)

#### ② 왜 그걸 골랐나

- **보안성**: 비밀번호를 서버에 저장하지 않으므로 데이터베이스 유출 시에도 크리덴셜 스터핑(Credential Stuffing) 공격이 원천 불가능합니다.
- **피싱 방지**: Origin 바인딩(`rpId: localhost / skt-aleph-jinyeongjang-myblog.vercel.app`)으로 피싱 사이트에서의 위조 인증을 차단합니다.
- **경량성 및 통제성**: 무거운 외부 인증 SaaS에 의존하지 않고 소스코드 레벨에서 챌린지 수명 주기, 서명 검증, 401/403 인가 로직, 토큰 블랙리스트를 100% 투명하게 통제하고 검증하기 위함입니다.

#### ③ 어디를 어떻게 고쳤나 (T08-C49)

1. **등록 흐름 (Registration)**:
   - 클라이언트: [`src/lib/passkey/client.ts`](src/lib/passkey/client.ts) `PasskeyClient.register()` (원클릭 Web Crypto 및 플랫폼 스캔 분리)
   - 서버 챌린지 생성: [`src/lib/passkey/server.ts`](src/lib/passkey/server.ts) `PasskeyServerDatabase.createRegisterChallenge()`
   - 서버 공개키 검증 및 저장: [`src/lib/passkey/server.ts`](src/lib/passkey/server.ts) `PasskeyServerDatabase.verifyRegister()`
   - UI 모달: [`src/components/PasskeyVault.tsx`](src/components/PasskeyVault.tsx) `handleRegister()` (프리셋 칩 및 암호학 시각화)
2. **로그인 흐름 (Authentication)**:
   - 클라이언트 서명: [`src/lib/passkey/client.ts`](src/lib/passkey/client.ts) `PasskeyClient.login()`
   - 서버 1회용 챌린지 발급: [`src/lib/passkey/server.ts`](src/lib/passkey/server.ts) `PasskeyServerDatabase.createLoginChallenge()`
   - 서명 검증 및 세션 토큰 발급: [`src/lib/passkey/server.ts`](src/lib/passkey/server.ts) `PasskeyServerDatabase.verifyLogin()`
   - 암호학적 검증 엔진: [`src/lib/passkey/crypto.ts`](src/lib/passkey/crypto.ts) `verifyEs256Signature()`
3. **패스키 기기 관리 및 삭제 흐름 (Passkey Management & Revocation · T08-C42 ~ T08-C46)**:
   - 패스키 목록 조회: [`src/lib/passkey/server.ts`](src/lib/passkey/server.ts) `listPasskeys()` (토큰 및 비로그인 계정 동시 지원)
   - 패스키 삭제: [`src/lib/passkey/server.ts`](src/lib/passkey/server.ts) `deletePasskey()` (키 삭제 후 잔여 키 정상 로그인 및 0개 잔여 시 로그인 잠김 보장)
   - API 라우터 매핑: [`api/passkey.ts`](api/passkey.ts) `/api/passkey/list-keys`, `/api/passkey/delete-key`
4. **로그아웃 흐름 (Logout)**:
   - 토큰 무효화 및 블랙리스트 등록: [`src/lib/passkey/server.ts`](src/lib/passkey/server.ts) `PasskeyServerDatabase.logout()`
   - 클라이언트 세션 정리: [`src/components/PasskeyVault.tsx`](src/components/PasskeyVault.tsx) `handleLogout()`
5. **비공개 자료 조회 흐름 (Data Access & Authorization)**:
   - 토큰 검증 및 IDOR 인가 차단: [`src/lib/passkey/server.ts`](src/lib/passkey/server.ts) `PasskeyServerDatabase.getPrivateData()`
   - API 라우터 매핑: [`api/passkey.ts`](api/passkey.ts) `GET /api/passkey/private-data`

#### ④ 안 열리는 것을 확인한 기록 (T08-C50, T08-C41)

| 검증 시나리오                                   | 거절 생성 소스 위치 (T08-C41)                               | 요청 페이로드 (Request)                                                                                  | 서버 응답 (Response)                                                                                       | 판정 결과                     |
| :---------------------------------------------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :---------------------------- |
| **1. 로그인 없이 열기** (T08-C16, C17)          | [`server.ts`](src/lib/passkey/server.ts) `getPrivateData()` | `GET /api/passkey/private-data`<br>`Authorization: (None)`                                               | `HTTP/1.1 401 Unauthorized`<br>`{"statusCode":401,"error":"인증되지 않았습니다."}`                         | **성공 (차단됨)**             |
| **2. 남의 패스키로 열기 (IDOR)** (T08-C37, C38) | [`server.ts`](src/lib/passkey/server.ts) `getPrivateData()` | `GET /api/passkey/private-data?user=evaluator_test`<br>`Authorization: Bearer eyJhbGciOi...***MASKED***` | `HTTP/1.1 403 Forbidden`<br>`{"statusCode":403,"error":"타 계정의 비공개 자료에 접근할 권한이 없습니다."}` | **성공 (차단됨 · 건수 불변)** |
| **3. 이미 쓴 질문 재사용** (T08-C31)            | [`server.ts`](src/lib/passkey/server.ts) `verifyLogin()`    | `POST /api/passkey/login-verify`<br>`{"challenge":"Z3x...[USED]"}`                                       | `HTTP/1.1 401 Unauthorized`<br>`{"statusCode":401,"error":"이미 사용된 챌린지입니다. (재전송 공격 방어)"}` | **성공 (차단됨)**             |
| **4. 패스키 삭제 뒤 로그인** (T08-C44, C45)     | [`server.ts`](src/lib/passkey/server.ts) `verifyLogin()`    | `POST /api/passkey/login-verify`<br>`{"credentialId":"cred_deleted_key"}`                                | `HTTP/1.1 401 Unauthorized`<br>`{"statusCode":401,"error":"등록되지 않았거나 삭제된 패스키입니다."}`       | **성공 (차단됨)**             |

#### ⑤ AI와 나

- **AI의 기여**: 복잡한 WebAuthn 바이너리 인코딩/디코딩(Base64URL, DER Sequence) 수학적 구조 도식화 및 TypeScript 인터페이스 정의.
- **학생의 기여**: 보안 감사 관점에서 4대 공격 벡터(Replay Attack, IDOR, Unauthenticated Direct Access, Stale Key Re-use)를 방어 시나리오로 정의하고, 실시간 테스트 하네스와 마스킹 로그 뷰어를 설계.

#### ⑥ 아직 못 막은 것 (T08-C51)

- **클라이언트 측 XSS 공격 발생 시 메모리 내 토큰 탈취 위험**: 현재 구현은 브라우저 세션 메모리(`React State`) 및 `sessionStorage`에 서명 검증 세션 토큰을 보관합니다. 만약 악의적인 서드파티 스크립트나 XSS(Cross-Site Scripting) 취약점이 발생할 경우 클라이언트 메모리에 존재하는 토큰이 탈취될 잠재적 위험이 존재합니다.
- **향후 보안 개선 대책**:
  1. 세션 토큰을 JavaScript가 직접 읽을 수 없는 **`HttpOnly; Secure; SameSite=Strict` 쿠키**로 전환.
  2. 요청마다 클라이언트 공개키 지문(DPoP, Demonstrating Proof-of-Possession at Application Layer)을 세션 토큰과 암호학적으로 바인딩하여 토큰이 유출되더라도 타 기기에서의 재사용을 원천 봉쇄하는 아키텍처 도입 예정.

---

### 5. 완주 체크리스트 (T08)

- [x] **공개 영역과 비공개 영역을 화면에서 갈라 두었습니다 (T08-C13)**
- [x] **비공개 항목이 3개 이상 들어 있으며 미로그인 시 소스코드에 없습니다 (T08-C14, T08-C15, T08-C18)**
- [x] **패스키를 등록했고 서버에 저장된 것이 공개키임을 보였습니다 (T08-C19 ~ T08-C26)**
- [x] **매번 새 질문이 오고 이미 쓴 질문은 다시 통하지 않습니다 (T08-C27 ~ T08-C31)**
- [x] **비밀번호 입력칸이 전혀 없습니다 (T08-C35)**
- [x] **패스키를 2개 등록해 하나를 지운 뒤에도 남은 하나로 들어갔습니다 (T08-C42 ~ T08-C46)**
- [x] **남의 패스키로는 열리지 않는 것을 요청과 응답 로그로 남겼습니다 (T08-C36 ~ T08-C41)**
- [x] **제출물 어디에도 실제 개인정보와 비밀값이 없습니다 (T08-C12, T01-C23, T01-C24)**
- [x] **인증 구현 설명서 여섯 항목을 모두 충족하여 작성했습니다 (T08-C47 ~ T08-C51)**

---

## 📝 과제 1: 나를 소개하는 한 페이지 — 제출서 (Submission)

### 1. 제출 링크

- **결과물 주소 (무로그인 공개 화면)**: [https://skt-aleph-jinyeongjang-myblog.vercel.app](https://skt-aleph-jinyeongjang-myblog.vercel.app)
- **소스 주소 (GitHub 공개 레포지토리)**: [https://github.com/jinyeongjang/skt-aleph-jinyeongjang-myblog](https://github.com/jinyeongjang/skt-aleph-jinyeongjang-myblog)

---

### 2. 짧은 확인 방법 4줄 (T01-C25)

1. **① 어디로 가나요**: 브라우저 새 시크릿 창을 열고 [https://skt-aleph-jinyeongjang-myblog.vercel.app](https://skt-aleph-jinyeongjang-myblog.vercel.app) 주소로 접속합니다.
2. **② 세 단계 안에 무엇을 하나요**:
   - 1단계: 첫 화면(Above the Fold)에서 01 소개·02 대표 활동·03 검증 근거 3개 카드가 스크롤 없이 동시에 보이는지 확인합니다.
   - 2단계: 소개 섹션의 `[비공개 정보 점검표 (3개 항목)]` 탭을 마우스 클릭 또는 `Tab`+`Enter` 키로 전환합니다.
   - 3단계: 상단 헤더 우측의 `[애니메이션 토글]` 및 `[다크 모드 토글]` 버튼을 클릭하여 시각적 효과와 테마 변경을 확인합니다.
3. **③ 무엇이 보이면 통과인가요**: 로그인이나 인증 없이 전체 페이지가 즉시 열리고, 탭 전환 시 비공개 정보(민감 식별정보, 사적 연락처, 보안 키) 3개 항목이 즉시 표시되며 브라우저 콘솔 오류가 0건이면 통과입니다.
4. **④ 안 될 때 무엇이 보이나요**: 로그인/비밀번호 입력 창이 요구되거나, 탭 전환 시 화면 내용이 바뀌지 않거나, 브라우저 개발자 도구 콘솔에 빨간색 런타임 오류가 발생합니다.

---

### 3. AI와 나의 판단 3줄 (T01-C26)

1. **① AI에게 맡긴 일**: Tailwind CSS 기반 글래스모피즘 스타일링 및 반응형 그리드 레이아웃 구현, Prettier/Oxlint 코드 품질 자동화 환경 설정, WAI-ARIA 접근성 속성(`role="tab"`, `aria-selected`, `focus-visible`) 기본 템플릿 작성.
2. **② 학생이 직접 판단한 일**: 공개 정보(6대 프로젝트 라이브 데모, 2년 10개월 실무 경력, 직무 기술 스택, STAR 핵심 강점, 국가공인 자격)와 비공개 정보(민감 PII, 개인 연락처, API 시크릿)의 분류 기준 수립, STAR 모델 기반 실전 경험과 공인 근거 선정, 1366×768 해상도에서 첫 화면 3요소가 잘리지 않도록 Hero 높이 및 여백 최적화.
3. **③ AI 제안을 따르지 않은 일**: AI가 초기에 제안했던 무거운 대형 로드맵 타임라인 컴포넌트와 외부 웹폰트 임포트는 1366×768 첫 화면 세로 넘침을 유발하고 초기 렌더링 성능을 저하시킬 수 있어 채택하지 않고, 간결한 3분할 퀵 프리뷰 카드와 시스템 폰트 스택으로 변경 적용했습니다.

---

### 4. 실제 결함 3개 수정 기록 (T01-C17)

1. **결함 1 (더미 링크)**: 전: `https://example.com` ➔ 후: `https://skt-aleph-jinyeongjang-myblog.vercel.app` (T01-C13 준수)
2. **결함 2 (연락처 및 개인정보 보호)**: 전: 개인 연락처 노출 우려 또는 더미 이메일 ➔ 후: GitHub 공식 noreply 이메일(`jinyeongjang@users.noreply.github.com`) 및 클립보드 복사 (T01-C05, T01-C23 준수)
3. **결함 3 (웹 접근성 명암비 미달)**: 전: `text-neutral-400`(2.8:1) ➔ 후: `text-neutral-500`(4.6:1) 및 `text-neutral-600`(7.0:1) 이상 교체 (T01-C16 준수)

---

### 5. 완주 체크리스트 (T01)

- [x] **대상·공개 범위와 근거를 정했습니다 (T01-C03 ~ T01-C09)**: 대상/목적 1문장, 공개 정보 3건, 비공개 정보 3건, STAR 기반 강점 4건 및 공인 근거 명시 완료.
- [x] **두 기준 화면과 실제 결함을 검사했습니다 (T01-C10 ~ T01-C18)**: 1366×768 및 1920×1080 첫 화면 3요소(소개·활동·근거) 동시 노출, 가로 넘침 0건, 더미링크/명암비 등 3개 결함 수정 완료.
- [x] **상호작용을 마우스와 키보드로 확인했습니다 (T01-C19 ~ T01-C22)**: 공개/비공개 탭 전환(마우스 클릭 & Tab/Enter/Space), 헤더 고정, 애니메이션 끄기(Reduce Motion) 토글 확인 완료.
- [x] **공개 금지 정보와 비밀값이 없습니다 (T01-C23, T01-C24)**: 주민등록번호, 개인 휴대전화 번호, 상세 자택 주소 및 API 키/비밀번호 0건 전수 감사 완료.
- [x] **짧은 확인법과 AI/본인 판단을 제출합니다 (T01-C25, T01-C26)**: 4줄 확인 절차 및 3줄 판단 기록 작성 완료.
