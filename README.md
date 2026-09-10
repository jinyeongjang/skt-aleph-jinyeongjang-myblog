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
2. **학생이 직접 판단한 일**: 공개 정보(6대 프로젝트 라이브 데모, 직무 기술 스택, VIA 강점)와 비공개 정보(민감 PII, 개인 연락처, API 시크릿)의 분류 기준 수립, STAR 모델 기반 실전 경험(보이스피싱 예방 0건 피해, 부트캠프 전원 완주)과 공인 근거(사상구청장 표창장, KDT 과제상) 선정, 1366×768 해상도에서 첫 화면 3요소가 잘리지 않도록 Hero 높이 및 여백 최적화.
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

- [x] **대상·공개 범위와 근거를 정했습니다**: 대상/목적 1문장, 공개 정보 3건, 비공개 정보 3건, STAR 기반 강점 3건 및 공인 근거 명시 완료.
- [x] **두 기준 화면과 실제 결함을 검사했습니다**: 1366×768 및 1920×1080 첫 화면 3요소(소개·활동·근거) 동시 노출, 가로 넘침 0건, 더미링크/명암비 등 3개 결함 수정 완료.
- [x] **상호작용을 마우스와 키보드로 확인했습니다**: 공개/비공개 탭 전환(마우스 클릭 & Tab/Enter/Space), 헤더 고정, 애니메이션 끄기(Reduce Motion) 토글 확인 완료.
- [x] **공개 금지 정보와 비밀값이 없습니다**: 주민등록번호, 개인 휴대전화 번호, 상세 자택 주소 및 API 키/비밀번호 0건 전수 감사 완료.
- [x] **짧은 확인법과 AI/본인 판단을 제출합니다**: 4줄 확인 절차 및 3줄 판단 기록 작성 완료.
