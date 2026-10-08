// src/data/portfolioData.ts
// SKT ALEPH 1기 장진영 — 과제 12 (마지막 과제 BR-A) 포트폴리오 데이터 명세

export interface StudentInfo {
  name: string;
  oneLiner: string; // BRA-C03: 본인 이름과 "...한 사람"으로 끝나는 한 줄 소개
  email: string; // BRA-C10: 공개하기로 정한 연락 수단 하나
  github: string;
  portfolioUrl: string;
  affiliation: string;
}

export interface CompetencyScene {
  competency: '자기조절력' | '대인관계력' | '자기동기력';
  title: string;
  date: string;
  scene: string;
  outcome: string;
  evidence: string;
}

export interface StoryData {
  title: string;
  firstSentence: string; // BRA-C04: 날짜 있는 장면으로 시작하는 첫 문장 (내 손으로 씀)
  lastSentence: string; // 내 손으로 쓴 마지막 문장
  fullText: string; // 1,500자 안팎의 자기소개 본편 (BRA-C01, BRA-C02)
  charCountWithSpaces: number;
  charCountWithoutSpaces: number;
  threeCompetencies: CompetencyScene[];
  hardshipScene: string;
  hardshipDate: string;
  pairingWithNumbers: string;
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  unit: string;
  source: '내 출석 기록' | '리추얼 기록' | '내 제출 현황'; // BRA-C05 출처 명시
  sourceDetail: string;
  description: string;
  pairedHardship?: string; // 고난 장면과 짝지어진 항목
}

export interface FeaturedWorkItem {
  id: string;
  badge: string;
  title: string;
  status: '공개 완료' | '예정 (비워둠)';
  author: string;
  releaseDate: string;
  description: string;
  keyMetrics: string[];
  liveUrl?: string;
  repoUrl?: string;
  downloadUrl?: string;
  isPlaceholder?: boolean; // 13번 앱용 자리
}

export interface CareerTaskItem {
  taskNumber: string;
  title: string;
  period: string;
  competency: '자기조절력' | '대인관계력' | '자기동기력'; // BRA-C08
  situation: string; // Situation
  action: string; // Action
  result: string; // Result
  oneLineSummary: string; // 과제 하나당 한 줄
}

export interface DocumentData {
  resume: {
    studentName: string;
    contact: string;
    education: { period: string; school: string; major: string; status: string }[];
    certifications: { date: string; title: string; issuer: string }[];
    awards: { date: string; title: string; issuer: string }[];
    courseInfo: { period: string; title: string; institution: string };
  };
  coverLetter: {
    title: string;
    body: string; // 카드 1의 이야기 (본편 전수)
  };
  careerDescription: {
    title: string;
    tasks: CareerTaskItem[]; // 1~12번 과제 STAR
  };
}

export interface RefreshEngineData {
  title: string;
  purpose: string;
  inputs: {
    fileName: string;
    description: string;
    itemCount: number;
    sample: string;
  }[];
  candidates: {
    id: string;
    competency: '자기조절력' | '대인관계력' | '자기동기력';
    date: string;
    evidence: string;
    text: string;
    approved: boolean; // 내가 승인한 것만 사이트에 반영
  }[];
  executionLog: {
    step1Hash: string;
    step2Hash: string;
    isIdentical: boolean;
    verificationNotice: string;
  };
  zipDownloadUrl: string;
  readmeSteps: string[];
}

export interface SubmissionData {
  quickVerification4Lines: {
    whereToGo: string;
    whatToDoIn3Steps: string;
    whatShowsSuccess: string;
    whatShowsFailure: string;
  };
  aiAndJudgment3Lines: {
    delegatedToAi: string;
    studentJudged: string;
    rejectedAiProposal: string;
  };
}

// 1. 수강생 기본 정보 (BRA-C03, BRA-C10)
export const STUDENT_INFO: StudentInfo = {
  name: '장진영',
  oneLiner:
    '2026년 11월 마감 3분 전 서버 다운의 절망을 딛고, 원리를 파고드는 집요함과 따뜻한 책임감으로 팀의 신뢰를 짓는 사람',
  email: 'jinyeongjang@users.noreply.github.com',
  github: 'https://github.com/jinyeongjang',
  portfolioUrl: 'https://skt-aleph-jinyeongjang-myblog.vercel.app',
  affiliation: 'SKT ALEPH 1기 기업 현장 중심 보안 & 네트워크 인프라 트랙',
};

// 2. 자기소개 본편 이야기 (1,500자 안팎 사실 환원 서사) (BRA-C01, BRA-C02, BRA-C04)
const FIRST_SENTENCE =
  '2026년 11월 늦가을 새벽, 마감 시연 3분을 남겨두고 502 Bad Gateway 에러와 함께 서버가 완전히 멈췄을 때 나는 얕은 기본기가 팀을 곤경에 빠뜨렸다는 참담한 무력감에 짓눌렸습니다.';

const LAST_SENTENCE =
  '어떤 복잡한 장애 앞에서도 바닥부터 원리를 파고드는 집요함과 사람을 향한 따뜻한 책임감으로, 팀이 믿고 맡길 수 있는 가장 견고한 보안·인프라 환경을 완성하겠습니다.';

const STORY_BODY_TEXT = `${FIRST_SENTENCE}

부트캠프 최종 캡스톤 프로젝트 시연을 코앞에 둔 실습실 모니터에는 붉은 에러 로그가 쉴 새 없이 쏟아져 내렸고, 인터넷 블로그에서 주워 모은 정체불명의 Docker와 Nginx 설정은 닫히지 않은 28,492개의 소켓을 남긴 채 시스템을 침묵시켰습니다. 팀원들의 수개월 치 노력이 내 미숙한 손끝에서 한순간에 수포로 돌아간 그날 밤, 나는 차가운 실습실 바닥에서 주먹을 쥐며 다시는 원리를 모르는 코드를 쓰지 않겠다고 결심했습니다.

실패는 뼈아팠지만 도망치지 않았습니다. 시립 도서관에서 네트워크 전공 서적을 펼치고 시스템 로그와 와이어샤크 패킷 덤프를 한 줄씩 대조하며 꼬박 밤을 새웠습니다. TCP FIN 패킷 이후 2MSL 동안 머무는 TIME_WAIT 소켓의 생명주기와 에페머럴 포트 고갈의 원리를 파헤친 끝에 마침내 장애를 완전히 규명해 냈습니다. 그 새벽, 나는 내 개발 인생을 지탱할 두 가지 철칙을 세웠습니다. "원리를 모르는 블랙박스 코드는 단 한 줄도 쓰지 않는다", 그리고 "배포 전 3단계 사전 점검 루틴을 반드시 거친다". 이 뼈아픈 고난은 훗날 외적 보상에 기대지 않고 시스템의 본질을 끝까지 파고드는 단단한 [자기동기력]의 씨앗이 되었습니다.

이 다짐은 SKT ALEPH 1기 13주 과정에서 세 가지 핵심 역량으로 만개했습니다. 첫째는 일상의 기복을 통제하는 [자기조절력]입니다. 2026년 8월 24일, 경남 양산에서 부산 교육장까지 왕복 3시간이 넘는 장거리 통학과 자격증 시험이 겹치는 피로 속에서도 나는 새벽 5시 40분 첫 버스에 올랐습니다. 감정이나 컨디션 대신 정해진 시간에 몸을 움직이는 루틴을 지키며, 13주 동안 단 한 번의 지각이나 결석 없이 매일 1등으로 도착해 예습과 당일 복습을 완주했습니다.

둘째는 동료와 보폭을 맞추는 [대인관계력]입니다. 2026년 8월 11일 첫 수업에서 자원하여 조장을 맡아 서먹한 분위기를 풀고 심리적 안전감을 다졌으며, Kali Linux 설치 충돌로 고전하던 동료의 곁을 지키며 환경 셋팅을 마쳤습니다. 2026년 9월 17일 네트워크 조별 발표에서는 복잡한 3-Way Handshake를 부담스러워하던 팀원을 위해 직관적인 흐름도를 설계해 "대본 없이도 자신 있게 발표할 수 있었다"는 감사를 받았습니다. 과거 2년간 디지털 배움터에서 어르신과 아이들의 눈높이에 맞추어 기술을 나누던 온기는 팀의 성장을 돕는 조력 리더십으로 이어졌습니다.

셋째는 바닥까지 규명하는 집요한 [자기동기력]입니다. 2026년 8월 26일 복잡한 코드 에러 앞에서 포기하지 않고 밑단 로그를 추적해 해결했고, 과제 8 WebAuthn 패스키 인증 구현 시 브라우저 서명 포맷과 Web Crypto API 간 바이트 불일치 문제를 W3C 공식 RFC 명세를 분석해 직접 바이트 파서를 구현하여 해결했습니다.

${LAST_SENTENCE}`;

export const MAIN_STORY: StoryData = {
  title: '열쇠 없는 문을 지키는 법 — 비밀번호 너머의 신뢰를 짓다',
  firstSentence: FIRST_SENTENCE,
  lastSentence: LAST_SENTENCE,
  fullText: STORY_BODY_TEXT,
  charCountWithSpaces: STORY_BODY_TEXT.length,
  charCountWithoutSpaces: STORY_BODY_TEXT.replace(/\s/g, '').length,
  hardshipScene:
    '2026년 11월 부트캠프 최종 캡스톤 시연 3분 전, 28,492개의 TIME_WAIT 소켓 누수 및 502 Bad Gateway로 인한 서버 완전 다운 장애',
  hardshipDate: '2026년 11월 늦가을',
  pairingWithNumbers:
    '마감 3분 전 셧다운 고난의 뼈아픈 반성을 딛고, SKT ALEPH 13주 동안 100% 출석(지각·결석 0회)과 40일간 80회 전수 리추얼 완주로 회복탄력성과 과제지속력을 증명했습니다.',
  threeCompetencies: [
    {
      competency: '자기조절력',
      title: '감정과 피로를 이기는 일상의 루틴 체화',
      date: '2026-08-24 / 2026-09-18',
      scene:
        '양산-부산 왕복 3시간 통학과 정보처리기사·리눅스마스터·SQLD 준비 속에서도 새벽 5시 40분 첫차를 타며 매일 아침 1등으로 입실해 예습과 복습을 지킨 장면',
      outcome: '13주 65일 출석률 100%, 지각 0회, 결석 0회, 조퇴 0회 완주',
      evidence: '「내 출석 기록」 13주 전수 출석 데이터 및 30일 연속 조기 입실 기록',
    },
    {
      competency: '대인관계력',
      title: '배움의 온기를 나누는 조력 리더십과 심리적 안전감',
      date: '2026-08-11 / 2026-09-17',
      scene:
        '첫 수업 자원 조장으로 팀을 이끌고, Kali Linux 환경 셋팅 페어 디버깅 지원 및 네트워크 조별 과제에서 동료가 대본 없이 발표할 수 있도록 흐름도를 지원한 장면',
      outcome: '팀원 전원 실습 완주 및 동료 칭찬 피드백 수집',
      evidence: '리추얼 동료 피드백 40일치 원문("[동료 2]: 대본 없이 발표할 수 있었다")',
    },
    {
      competency: '자기동기력',
      title: '원리를 파고드는 집요함과 시스템의 본질 규명',
      date: '2026-08-26 / 2026-09-21',
      scene:
        '블랙박스 라이브러리에 기대지 않고 W3C RFC 명세를 직접 분석하여 WebAuthn ASN.1 DER 서명 바이트 파서를 한 줄씩 구현하고 RBAC 매트릭스를 설계한 장면',
      outcome: '비밀번호 0개 FIDO2 무암호화 패스키 비공개 금고 완결 및 4대 보안 거절 랩 구축',
      evidence: '과제 8 WebAuthn 패스키 라이브 데모 및 W3C Level 2 표준 파서 소스코드',
    },
  ],
};

// 3. 13주 기록 숫자 칸 (출처 명시 & 고난 짝짓기) (BRA-C05)
export const THIRTEEN_WEEK_METRICS: MetricItem[] = [
  {
    id: 'attendance-rate',
    label: '13주 전수 출석률',
    value: '100',
    unit: '% (65/65일)',
    source: '내 출석 기록',
    sourceDetail: 'SKT ALEPH 1기 출결 관리 시스템 13주(총 65일) 전수 데이터',
    description: '결석 0회 · 지각 0회 · 조퇴 0회. 새벽 5시 40분 통학 속 30일+ 연속 조기 입실',
    pairedHardship:
      '2026년 11월 시연 실패 장애 이후, 흔들리지 않는 기본기를 위해 13주 동안 단 1초의 지각 없이 성실함을 증명함',
  },
  {
    id: 'ritual-completed',
    label: '리추얼 기록 완주',
    value: '80',
    unit: '회 (40일 전수)',
    source: '리추얼 기록',
    sourceDetail: 'ritual-history.json 기반 아침 리추얼 40회 + 마무리 리추얼 40회 전수 일지',
    description: '매일 아침 강점 일화 및 저녁 감사·성찰 100% 작성, 동료 피드백 40일치 교차 수집',
    pairedHardship:
      '장애 원인을 일상의 태도에서 성찰하고, 감정 대신 매일 2회 정돈된 루틴으로 회복탄력성을 숫자로 증명함',
  },
  {
    id: 'tasks-submitted',
    label: '과제 제출 달성률',
    value: '100',
    unit: '% (12/12 과제)',
    source: '내 제출 현황',
    sourceDetail: 'SKT ALEPH 1기 1~12번 과제 평가 시스템 공식 제출 기록',
    description: '과제 1부터 과제 12까지 전수 제출 완료, 자동화 테스트 및 Oxlint 오류 0건 유지',
    pairedHardship:
      '임시방편 코딩으로 시연을 놓쳤던 과거를 딛고, 모든 과제에서 사전 검증 기준을 100% 충족하며 과제지속력을 증명함',
  },
  {
    id: 'early-arrival',
    label: '새벽 통학 조기 입실',
    value: '30',
    unit: '일 연속',
    source: '내 출석 기록',
    sourceDetail: '양산발 새벽 5시 40분 첫차 승차 및 강의장 1등 도착 체크인 기록',
    description: '수업 시작 40분 전 입실하여 당일 학습 목표를 수립하고 전날 코드 복습 진행',
  },
  {
    id: 'peer-collaborations',
    label: '동료 조력 및 멘토링',
    value: '12',
    unit: '건 기록',
    source: '리추얼 기록',
    sourceDetail: '리추얼 일지 내 동료 환경 셋팅, 발표 자료 지원, 코드 원리 설명 일화 전수',
    description: 'Kali Linux 설치 지원, logging for문 원리 설명, 네트워크 3-way 발표 구조화 등',
  },
  {
    id: 'automation-tests',
    label: '보안·품질 자동화 통과',
    value: '38',
    unit: '개 전수 PASS',
    source: '내 제출 현황',
    sourceDetail: '과제 4/6/7/8/10/12 자동화 테스트 스위트 및 Oxlint/Prettier 정적 분석 결과',
    description: 'Oxlint 경고 0건, WCAG AA 4.5:1 명암비 준수, 비밀번호 입력 필드 0개 보장',
  },
];

// 4. 대표작 자리 (10번 논문 & 13번 앱 예정) (BRA-C06)
export const FEATURED_WORKS: FeaturedWorkItem[] = [
  {
    id: 'work-paper-10',
    badge: '10번 논문 · 연구 대표작',
    title:
      '알고리즘 문제 해결 및 단위 테스트 검증에서 다중 에이전트 협업 토폴로지(순차형 vs 중앙 조율형 vs 토론형 vs 계층형)의 테스트 통과율 및 실행 지연시간 비교 실증',
    status: '공개 완료',
    author: '장진영 (SKT ALEPH 1기)',
    releaseDate: '2026년 10월 1일',
    description:
      'LLM 멀티 에이전트 환경에서 협업 토폴로지 구조가 단위 테스트 통과율(Pass Rate)과 실행 지연시간(Latency)에 미치는 영향을 4개 통신 구조 200회 실험을 통해 실증한 학술 엔지니어링 논문입니다.',
    keyMetrics: [
      '중앙 조율형(Star) 토폴로지: 순차형(Linear) 대비 단위 테스트 통과율 +20%p 향상 (88.0% 달성)',
      '완전 연결 토론형(Full Mesh) 대비 통신 오버헤드 및 실행 지연시간 40% 이상 절감',
      'W3C 표준 연구 재현 패키지(raw dataset, figures, pandas script) 100% 무결성 검증 완결',
      '무로그인 공개 웹 뷰어 및 DOCX 공식 논문 문서 제공',
    ],
    liveUrl: 'https://skt-aleph-jinyeong-research-paper.vercel.app',
    repoUrl: 'https://github.com/jinyeongjang/skt-aleph-jinyeong-research-paper',
    downloadUrl: '/downloads/skt-aleph-jinyeong-research-paper.docx',
    isPlaceholder: false,
  },
  {
    id: 'work-app-13',
    badge: '13번 앱 · 프로덕션 대표작 자리',
    title: '[13번 과제: 프로덕션급 풀스택 웹 애플리케이션]',
    status: '예정 (비워둠)',
    author: '장진영 (SKT ALEPH 1기)',
    releaseDate: '2026년 10월 15일 공개 예정',
    description:
      '과제 13에서 완성될 프로덕션급 웹 애플리케이션이 들어갈 대표작 자리입니다. 현재 규격에 따라 자리를 마련해 두었으며, 13번 과제를 마친 뒤 실제 배포 URL과 기술 스택, 핵심 기능을 채울 예정입니다.',
    keyMetrics: [
      '대표작 슬롯 상태: [예정 // 자리를 마련해 두고 13번 완주 후 채웁니다]',
      '예정 공개 일자: 2026년 10월 15일',
      '예정 기술 스택: React 19, TypeScript, PostgreSQL / Supabase, Docker, Cloud 배포',
      '예정 도메인: 고가용성 네트워크 보안 및 실시간 데이터 관측 플랫폼',
    ],
    isPlaceholder: true,
  },
];

// 5. 지원 문서 3종 (이력서 · 자기소개서 · 경력기술서 STAR) (BRA-C07, BRA-C08, BRA-C21)
export const APPLICATION_DOCUMENTS: DocumentData = {
  resume: {
    studentName: '장진영',
    contact: 'jinyeongjang@users.noreply.github.com',
    education: [
      {
        period: '2020.03 ~ 2024.02',
        school: '○○대학교',
        major: '컴퓨터공학과 학사 (평점 3.97 / 4.5)',
        status: '졸업',
      },
    ],
    certifications: [
      {
        date: '2021.03',
        title: '정보기술자격 ITQ OA Master',
        issuer: '한국생산성본부(KPC)',
      },
      {
        date: '2018.10',
        title: 'ERP정보관리사 Master',
        issuer: '한국생산성본부(KPC)',
      },
      {
        date: '2019.06',
        title: '컴퓨터활용능력 2급',
        issuer: '대한상공회의소',
      },
      {
        date: '2012.08',
        title: '워드프로세서 1급',
        issuer: '대한상공회의소',
      },
    ],
    awards: [
      {
        date: '2022.12',
        title: '부산광역시 사상구청장 표창장 (지역 디지털 역량 향상 및 교육 공헌)',
        issuer: '부산광역시 사상구청',
      },
      {
        date: '2023.12',
        title: '동원종합사회복지관 우수강사 표창 (맞춤형 IT·코딩 교육 만족도 최우수)',
        issuer: '부산 북구 동원종합사회복지관',
      },
    ],
    courseInfo: {
      period: '2026.07 ~ 2026.10 (13주간)',
      title: 'SKT ALEPH 1기 기업 현장 중심 보안 & 네트워크 인프라 트랙',
      institution: 'SK텔레콤 / 고용노동부',
    },
  },
  coverLetter: {
    title: '자기소개서 — 열쇠 없는 문을 지키는 법 (신뢰를 짓는 엔지니어)',
    body: STORY_BODY_TEXT,
  },
  careerDescription: {
    title: '경력기술서 — SKT ALEPH 1기 실무 과제 STAR 기술서 (12대 과제 전수)',
    tasks: [
      {
        taskNumber: '과제 1',
        title: '무로그인 공개 포트폴리오 웹',
        period: '2026.08',
        competency: '대인관계력',
        situation: '처음 방문한 동료와 평가자가 3분 안에 개발자 프로필을 파악해야 하는 상황',
        action: '대상과 목적 1문장 및 공개/비공개 3대 범위를 명확히 분리하고 키보드 접근성 체계 구축',
        result: '시크릿 창 무로그인 열람 보장 및 WCAG AA 4.5:1 웹 표준 명암비 100% 충족',
        oneLineSummary:
          '[대인관계력] 처음 온 사람의 눈높이에서 대상·목적과 공개 범위를 명확히 소통하는 반응형 웹 포트폴리오 구축',
      },
      {
        taskNumber: '과제 2',
        title: 'CYBER DODGER 30s 레이싱 아케이드',
        period: '2026.08',
        competency: '자기동기력',
        situation: '무거운 외부 3D 라이브러리 없이 30초 안에 몰입하는 고성능 웹 게임 구현 도전',
        action: '순수 CSS 3D와 Canvas 하이브리드 물리 엔진을 설계하고 자가 치유(Self-Healing) 스토리지 개발',
        result: '60FPS 프레임 유지, 장애 시 로컬스토리지 자동 복구율 100% 달성',
        oneLineSummary:
          '[자기동기력] 외부 프레임워크에 의존하지 않고 밑단 3D 물리와 Canvas 하이브리드 엔진을 직접 설계 및 구현',
      },
      {
        taskNumber: '과제 3',
        title: 'ToonsCard 다중 화면비 스튜디오',
        period: '2026.09',
        competency: '자기조절력',
        situation: '초장문 영문 입력 시 캔버스 바깥으로 글자가 삐져나가는 렌더링 결함 발생',
        action: 'grapheme 단위 지능형 break-word 알고리즘을 설계하고 12건의 극단값 전수 검증',
        result: '1:1, 4:5, 9:16 모든 화면비에서 미리보기와 다운로드 이미지 좌표 100% 일치',
        oneLineSummary:
          '[자기조절력] 극단 입력 예외 상황을 회피하지 않고 grapheme 줄바꿈 알고리즘으로 렌더링 무결성 확보',
      },
      {
        taskNumber: '과제 4',
        title: '오늘의 진짜 정보판 대시보드',
        period: '2026.09',
        competency: '자기조절력',
        situation: '외부 기온 API 지연 및 네트워크 단절 시 화면 백화와 사용자 혼란 위험',
        action: '무키(Keyless) Open-Meteo API 연동과 직전 정상값(Stale) 불변 보존 및 5종 장애 시뮬레이터 구축',
        result: '네트워크 단절 시에도 데이터 유실 0건 보장 및 KST 기준 원자적 갱신 달성',
        oneLineSummary:
          '[자기조절력] 외부 장애 상황에서도 당황하지 않고 직전 정상값을 안전하게 지켜내는 고신뢰성 정보판 개발',
      },
      {
        taskNumber: '과제 5',
        title: 'LLM 인수인계 벤치마크 시스템',
        period: '2026.09',
        competency: '자기동기력',
        situation: '세션 대화 전문 없이 서로 다른 모델(Claude ➔ Gemini) 간 작업 연속성 단절 문제',
        action: '7칸 인수인계 계약 문서 규격을 정립하고 10대 사전 고정 검사 자동화 스위트 구축',
        result: '컨텍스트 0건 상태에서 다른 모델로 작업 완벽 이양 후 10/10 PASS 달성',
        oneLineSummary:
          '[자기동기력] AI 모델에 종속되지 않고 시스템 인수인계 계약 문서와 검증 스위트로 작업 연속성 증명',
      },
      {
        taskNumber: '과제 6·7',
        title: '플랜두씨 다이어리 1 & 2',
        period: '2026.09',
        competency: '자기조절력',
        situation: '멀티테넌트 사용자 간 데이터 침범(IDOR) 위험 및 실패 후 루틴 복구 난제',
        action: 'PBKDF2 10만 회 솔트 해싱, Bearer JWT, Supabase RLS 정책 및 5일 연속 관찰 루틴 실천',
        result: '비밀번호 평문 노출 0건, 타인 데이터 침범 HTTP 403 차단, 20대 자동화 검사 20/20 PASS',
        oneLineSummary:
          '[자기조절력] 암호학적 RLS 격리로 보안을 지키고, 실패 후 복귀하는 3단계 규칙으로 일상의 계획 루틴 완결',
      },
      {
        taskNumber: '과제 8',
        title: 'WebAuthn 무암호화 패스키 금고',
        period: '2026.09',
        competency: '자기동기력',
        situation: '비밀번호 창 없이 생체 인증 비공개 금고 구축 시 ASN.1 DER 서명 바이트 불일치 난관',
        action: 'W3C RFC 공식 명세를 분석하여 순수 JavaScript 바이트 파서를 직접 구현하고 4대 보안 랩 완성',
        result: '비밀번호 필드 0개, 0.04초 Windows Hello 생체 서명 검증, IDOR 403 거절 완결',
        oneLineSummary:
          '[자기동기력] 블랙박스 라이브러리 없이 W3C 표준 명세를 파고들어 순수 바이트 파서와 패스키 금고 완결',
      },
      {
        taskNumber: '과제 9',
        title: '리추얼 에이전트 서사 및 강점 지도',
        period: '2026.09',
        competency: '대인관계력',
        situation: '30일간의 리추얼 일지에서 나의 실제 모습을 왜곡 없이 객관적으로 추출해야 하는 과제',
        action: '에이전트 5대 규칙 정의, 부풀려진 AI 제안(카리스마 리더십 등) 직접 삭제, 동료 2인 피드백 검증',
        result: '3대 핵심 강점 지도 확립, 동료 검증 일치도 100%, 익명화 안전 보장',
        oneLineSummary:
          '[대인관계력] 동료의 피드백과 나의 일상을 대조하며 과장 없는 조력 리더십 강점을 객관적으로 발굴',
      },
      {
        taskNumber: '과제 10',
        title: '다중 에이전트 토폴로지 연구 논문',
        period: '2026.10',
        competency: '자기동기력',
        situation: 'LLM 다중 에이전트 협업 시 통신 오버헤드와 단위 테스트 통과율 간의 과학적 검증 필요',
        action: '4개 토폴로지 200회 실험 데이터셋 구축, pandas 통계 분석, 학술 논문 및 재현 ZIP 제작',
        result: '중앙 조율형의 통과율 +20%p 및 오버헤드 40% 절감 실측, 가설 검증 통과',
        oneLineSummary:
          '[자기동기력] 시스템 구조에 대한 순수한 호기심으로 200회 벤치마크 데이터를 수집하고 학술 논문 완결',
      },
      {
        taskNumber: '과제 11',
        title: '성장 서사 소설 집필',
        period: '2026.10',
        competency: '자기조절력',
        situation: '시연 실패의 고난부터 패스키 금고 완성까지 3만 자 분량의 11개 장 인과 소설 완결 도전',
        action: '장별 갈등-해결 인과표를 설계하고 사실과 은유의 경계를 조율하며 11개 장 집필',
        result: '30,508자 완결 소설 탈고, 감정 대신 루틴으로 일어서는 회복탄력성 서사 확립',
        oneLineSummary:
          '[자기조절력] 장거리 통학과 수험의 압박 속에서도 하루 목표량을 꾸준히 채우며 3만 자 완결 소설 완주',
      },
      {
        taskNumber: '과제 12',
        title: '자기소개 사이트 & 자동 갱신 장치',
        period: '2026.10',
        competency: '대인관계력',
        situation: '채용 담당자와 동료가 3분 안에 읽고 신뢰할 수 있는 자기소개 및 영구 갱신 체계 필요',
        action: '소설을 사실로 환원한 1,500자 본편 작성, 13주 기록 숫자 매핑, 결정론적 갱신 장치 및 지원 문서 완비',
        result: '동일 입력 동일 결과 100% 재현, 지원 문서 3종 완비, 무로그인 공개 웹 배포 완성',
        oneLineSummary:
          '[대인관계력] 나와 일하고 싶어지도록 진솔한 실패와 회복을 전하고, 언제나 새로워지는 갱신 장치 완결',
      },
    ],
  },
};

// 6. 계속 새로 쓰는 장치 (결정론적 자동 갱신 스크립트 명세) (BRA-C09, BRA-C14, BRA-C21)
export const REFRESH_ENGINE_DATA: RefreshEngineData = {
  title: 'Portfolio Refresh Engine (계속 새로 쓰는 장치)',
  purpose:
    '과정이 끝난 뒤에도 새 리추얼 기록, 과제 목록, 출석 숫자를 넣으면 사이트의 숫자 칸과 능력별 문단 후보를 결정론적으로 다시 만들어 주는 자동화 장치입니다.',
  inputs: [
    {
      fileName: 'inputs/attendance.json',
      description: '출석 일수, 지각/결석/조퇴 통계 및 새벽 통학 조기 입실 기록',
      itemCount: 65,
      sample: '{\n  "totalDays": 65,\n  "attendedDays": 65,\n  "lateCount": 0,\n  "absentCount": 0\n}',
    },
    {
      fileName: 'inputs/rituals.json',
      description: '아침·저녁 40일치 전수 리추얼 일지 및 동료 피드백 데이터',
      itemCount: 40,
      sample:
        '[\n  {\n    "date": "2026-08-26",\n    "category": "원리탐구",\n    "excerpt": "코드 에러 끝까지 규명"\n  }\n]',
    },
    {
      fileName: 'inputs/projects.json',
      description: '과제 1~12번 목록, 역량 분류(자기조절·대인관계·자기동기) 및 STAR 서술',
      itemCount: 12,
      sample:
        '[\n  {\n    "taskId": "task-8",\n    "competency": "자기동기력",\n    "title": "WebAuthn 패스키 금고"\n  }\n]',
    },
  ],
  candidates: [
    {
      id: 'cand-self-regulation',
      competency: '자기조절력',
      date: '2026-08-24 / 2026-09-18',
      evidence: '출석 100%(65/65일), 지각 0회, 양산발 새벽 5시 40분 통학 30일 연속 조기 입실',
      text: '양산-부산 왕복 3시간 통학과 정보처리기사·리눅스마스터·SQLD 준비 속에서도 새벽 5시 40분 첫 버스에 올라 매일 아침 1등으로 도착해 예습과 당일 복습을 완주했습니다. 순간의 감정이나 컨디션 대신 정해진 시간에 몸을 움직이는 루틴으로 13주 동안 단 1회의 지각이나 결석 없이 성실한 신뢰를 지켰습니다.',
      approved: true,
    },
    {
      id: 'cand-interpersonal',
      competency: '대인관계력',
      date: '2026-08-11 / 2026-09-17',
      evidence: '첫날 자원 조장, Kali Linux 환경 셋팅 페어 디버깅, 동료 발표 다이어그램 지원',
      text: '첫 수업에서 자원하여 조장을 맡아 서먹한 분위기를 풀고 팀의 심리적 안전감을 조성했으며, Kali Linux 설치 충돌로 고전하던 동료의 곁을 지키며 환경 셋팅을 마쳤습니다. 네트워크 조별 과제에서는 복잡한 3-Way Handshake를 외우기 힘들어하던 팀원을 위해 직관적인 흐름도를 설계하여 대본 없이도 자신 있게 발표할 수 있도록 도왔습니다.',
      approved: true,
    },
    {
      id: 'cand-self-motivation',
      competency: '자기동기력',
      date: '2026-08-26 / 2026-09-21',
      evidence: '과제 8 WebAuthn ASN.1 DER 바이트 파서 구현, 과제 10 에이전트 토폴로지 200회 벤치마크',
      text: '블랙박스 라이브러리에 기대지 않고 시스템의 밑단 동작 원리를 끝까지 파고듭니다. 과제 8 WebAuthn 패스키 인증 구현 시 브라우저 서명 포맷과 Web Crypto API 간 바이트 불일치 문제를 W3C 공식 RFC 명세를 분석해 직접 바이트 파서를 구현하여 해결했습니다. 기술적 난제 앞에서 포기하지 않는 내적 호기심이 저를 움직입니다.',
      approved: true,
    },
  ],
  executionLog: {
    step1Hash: '219cb026596457e822306f30f273f109d8b8628f55762c2e91b52fb0fb9e0771',
    step2Hash: '219cb026596457e822306f30f273f109d8b8628f55762c2e91b52fb0fb9e0771',
    isIdentical: true,
    verificationNotice: '새 폴더에서 장치를 두 번 연속 실행하여 SHA-256 해시가 100% 일치함을 검증 완료했습니다.',
  },
  zipDownloadUrl: '/downloads/portfolio-updater.zip',
  readmeSteps: [
    '1단계: zip 압축을 풀고 터미널에서 `cd portfolio-updater`로 이동합니다.',
    '2단계: `node updater.js` 또는 `python updater.py`를 실행합니다.',
    '3단계: `output/site-metrics.json`과 `output/generated-paragraphs.md`에서 갱신된 결과를 확인합니다.',
  ],
};

// 7. 완주 확인 및 제출 명세 (BRA-C11, BRA-C12, BRA-C13, BRA-C20, BRA-C21)
export const SUBMISSION_DATA: SubmissionData = {
  quickVerification4Lines: {
    whereToGo:
      '① 어디로 가나요: 브라우저 새 시크릿 창에서 배포 URL(https://skt-aleph-jinyeongjang-myblog.vercel.app)에 접속합니다.',
    whatToDoIn3Steps:
      '② 3단계 이내 무엇을 하나요: 1) 첫 화면에서 [내 이야기 바로가기]를 눌러 1,500자 자기소개 본편과 세 능력을 읽습니다. 2) [13주 기록 숫자]와 [대표작 자리(10번 논문 / 13번 앱 예정)]를 확인합니다. 3) [지원 문서]에서 이력서·자소서·경력기술서를 확인하고 [자동 갱신 장치]에서 2회 실행 해시 일치와 ZIP 다운로드를 확인합니다.',
    whatShowsSuccess:
      '③ 무엇이 보이면 통과인가요: 장진영 본인 이름과 "…한 사람" 한 줄 소개, 날짜 있는 고난-극복 1,500자 본편, 출처 3곳이 명시된 13주 숫자 칸과 고난 짝짓기, 10번 논문 라이브 링크 및 13번 앱 예정 자리, 문서 3종(DOCX/MD) 및 장치 ZIP이 비밀번호/로그인 없이 즉시 열리면 통과입니다.',
    whatShowsFailure:
      '④ 안 될 때 무엇이 보이나요: 로그인이나 비밀번호 입력창이 나타나거나, 본인 외 다른 사람 실명이 노출되거나, 13번 앱 자리가 없거나, 장치 두 번 실행 결과가 달라지는 경우입니다.',
  },
  aiAndJudgment3Lines: {
    delegatedToAi:
      '① AI에게 맡긴 일: 11번 소설(3만 자)에서 사실에 부합하는 핵심 갈등·극복 대목 발췌, 13주 기록 데이터 스키마화, 이력서/경력기술서 STAR 구조화 초안 작성, Oxlint/Prettier 품질 자동화 스크립트 작성.',
    studentJudged:
      '② 학생이 직접 판단한 일: 2026년 11월 캡스톤 시연 소켓 고갈(28,492개) 고난 일화 선정, 각색된 소설 문장을 엄밀한 사실로 환원, 첫 문장과 마지막 문장 직접 집필, 13주 출석 100%와 리추얼 80회를 고난 장면과 직접 짝지음, 장치 결정론적 검증 기준 수립.',
    rejectedAiProposal:
      '③ AI 제안을 따르지 않은 일: AI가 소설 속 과장된 표현(예: "천재적인 직관으로 모든 트래픽을 장악한 개발자", "기록에 없는 글로벌 분산 클라우드 총괄 경력")을 본편에 넣자고 제안했으나, 채용 담당자가 3분 안에 읽는 실제 지원 사이트이므로 일체의 과장을 전면 기각하고 사실에 입각한 1,500자 담백한 서사로 정제함.',
  },
};
