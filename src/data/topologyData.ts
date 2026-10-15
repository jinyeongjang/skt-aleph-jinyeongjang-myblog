// 10번 연구 논문 실증 데이터 및 토폴로지 시뮬레이터 데이터 모델 (BR-B)
// 논문: "알고리즘 문제 해결 및 단위 테스트 검증에서 다중 에이전트 협업 토폴로지(순차형 vs 중앙 조율형 vs 토론형 vs 계층형)의 테스트 통과율 및 실행 지연시간 비교 실증"
// 저자: 장진영 (SKT ALEPH 1기)

export interface TopologyMetric {
  id: 'linear' | 'star' | 'debate' | 'hierarchy';
  nameKorean: string;
  nameEnglish: string;
  symbol: string;
  architecture: string;
  passRate: number; // 단위 테스트 통과율 (%)
  latencyMs: number; // 실행 지연시간 (ms)
  tokenUsage: number; // 평균 토큰 소모량
  communicationCount: number; // 에이전트 간 메시지 교환 횟수
  errorRecoveryRate: number; // 오류 발생 시 복구 성공률 (%)
  costEfficiency: number; // 비용 대비 통과율 점수 (1~100)
  pros: string[];
  cons: string[];
  bestFor: string;
  recommendedRole: string;
  description: string;
}

// 10번 논문 200회 실험 실측 데이터셋 (BRB-C04, BRB-C06)
export const TOPOLOGY_EMPIRICAL_DATA: Record<string, TopologyMetric> = {
  linear: {
    id: 'linear',
    nameKorean: '순차형 (Linear Pipeline)',
    nameEnglish: 'Sequential Linear Pipeline',
    symbol: 'A → B → C → D',
    architecture: '에이전트가 단방향으로 결과물을 전달하는 단선형 파이프라인',
    passRate: 68.0,
    latencyMs: 1950,
    tokenUsage: 4200,
    communicationCount: 3,
    errorRecoveryRate: 25.0,
    costEfficiency: 82,
    pros: [
      '가장 빠른 실행 속도 (1,950ms)',
      '통신 오버헤드 최소 (메시지 교환 3회)',
      '최소 토큰 소모량으로 단순 작업에 경제적',
    ],
    cons: [
      '중간 단계 오류가 후속 에이전트로 전파되는 캐스케이딩 실패',
      '단위 테스트 통과율이 가장 낮음 (68.0%)',
      '피드백 루프 부재로 자가 수정 불가',
    ],
    bestFor: '단순 포맷 변환, 단일 함수 추출, 1차 필터링 파이프라인',
    recommendedRole: '단순 전처리 및 저지연 작업',
    description:
      '각 에이전트가 이전 에이전트의 출력을 받아 순차적으로 처리합니다. 구조가 단순하여 지연시간은 1,950ms로 가장 낮으나, 앞선 에이전트의 실수를 뒤에서 바로잡지 못해 단위 테스트 통과율이 68%에 머뭅니다.',
  },
  star: {
    id: 'star',
    nameKorean: '중앙 조율형 (Star / Orchestrator)',
    nameEnglish: 'Central Orchestrator Topology',
    symbol: 'Orchestrator ↔ [Coder, Tester, Refactorer]',
    architecture: '중앙 오케스트레이터가 하위 에이전트를 조율하고 피드백 루프를 총괄하는 구조',
    passRate: 88.0,
    latencyMs: 3240,
    tokenUsage: 7800,
    communicationCount: 6,
    errorRecoveryRate: 89.0,
    costEfficiency: 95,
    pros: [
      '논문 최고 단위 테스트 통과율 달성 (88.0%, 순차형 대비 +20%p)',
      '오류 발생 시 테스터 피드백을 통한 자가 수정률 89% 달성',
      '토론형 대비 지연시간 44% 절감 (3,240ms vs 5,820ms)',
      '통신 오버헤드가 제어되어 토큰 비용 최적 균형',
    ],
    cons: [
      '중앙 오케스트레이터의 프롬프트 품질에 전체 성능이 의존',
      '에이전트 수가 10개 이상으로 증가 시 조율 병목 가능성',
    ],
    bestFor: '알고리즘 문제 해결, 단위 테스트 기반 TDD 개발, 복합 로직 구현 (논문 공식 추천 1위)',
    recommendedRole: '고신뢰 소프트웨어 엔지니어링 및 알고리즘 검증',
    description:
      '중앙 오케스트레이터가 문제 분할, 코더 지시, 테스터 검증을 조율합니다. 단위 테스트 실패 시 즉시 코더에게 실패 원인을 피드백하여 통과율 88.0%를 달성한 본 논문의 최고 추천 토폴로지입니다.',
  },
  debate: {
    id: 'debate',
    nameKorean: '완전 연결 토론형 (Debate / Full Mesh)',
    nameEnglish: 'Multi-Agent Multi-Turn Debate',
    symbol: 'All Agents ↔ All Agents',
    architecture: '모든 에이전트가 서로의 해법을 상호 비판하고 다수결/합의를 도출하는 완전 연결망',
    passRate: 84.5,
    latencyMs: 5820,
    tokenUsage: 15200,
    communicationCount: 12,
    errorRecoveryRate: 72.0,
    costEfficiency: 54,
    pros: [
      '다양한 관점 교차 검증으로 희귀한 엣지 케이스 발견 능력 우수',
      '오답에 대한 상호 반박으로 환각(Hallucination) 억제',
    ],
    cons: [
      '가장 높은 지연시간 (5,820ms, 중앙 조율형 대비 +80%)',
      '토큰 소모량 극심 (15,200 토큰)',
      '의견 불일치 시 무한 토론 핑퐁 위험',
    ],
    bestFor: '수학적 증명 검증, 윤리/정책 평가, 고난도 반례 탐색',
    recommendedRole: '크리티컬 보안 감사 및 엣지 케이스 검증',
    description:
      '3인 이상의 에이전트가 라운드별로 서로의 코드를 반박하고 합의합니다. 통과율은 84.5%로 우수하나, 메시지 교환(12회)과 지연시간(5,820ms) 및 토큰 소모가 매우 커서 실시간 파이프라인에는 비효율적입니다.',
  },
  hierarchy: {
    id: 'hierarchy',
    nameKorean: '계층형 (Hierarchy / Tree)',
    nameEnglish: 'Hierarchical Tree Structure',
    symbol: 'Lead Architect → Tech Leads → Worker Agents',
    architecture: '상위 리더가 하위 그룹으로 작업을 재귀 분할하여 취합하는 트리 계층망',
    passRate: 81.0,
    latencyMs: 4110,
    tokenUsage: 9400,
    communicationCount: 8,
    errorRecoveryRate: 76.0,
    costEfficiency: 79,
    pros: ['대규모 복합 시스템 분할 정복(Divide & Conquer) 탁월', '에이전트 수 확장 시(Scale-out) 구조적 안정성'],
    cons: ['깊은 계층에서 컨텍스트 누락 위험', '트리 상향 보고 지연으로 지연시간 다소 증가 (4,110ms)'],
    bestFor: '풀스택 애플리케이션 아키텍처 설계, 다중 모듈 패키지 생성',
    recommendedRole: '대규모 분할 정복 및 모듈형 시스템 개발',
    description:
      '아키텍트-테크리드-개발자-테스터 형태로 계층을 이룹니다. 알고리즘 단일 문제 해결에서는 조율 레이어가 과도하여 중앙 조율형(Star)보다 지연시간과 통과율 면에서 소폭 불리합니다.',
  },
};

// 샘플 알고리즘 문제셋 (시뮬레이터용 예시 데이터, 개인정보 0건)
export interface AlgorithmProblem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  inputExample: string;
  expectedOutput: string;
  testCasesCount: number;
}

export const SAMPLE_ALGORITHM_PROBLEMS: AlgorithmProblem[] = [
  {
    id: 'prob-two-sum',
    title: 'Two Sum (두 수의 합 해시 탐색)',
    category: 'Array / Hash Table',
    difficulty: 'Easy',
    description: '정수 배열 nums와 정수 target이 주어졌을 때, 합이 target이 되는 서로 다른 두 인덱스를 반환하시오.',
    inputExample: 'nums = [2, 7, 11, 15], target = 9',
    expectedOutput: '[0, 1]',
    testCasesCount: 5,
  },
  {
    id: 'prob-valid-parentheses',
    title: 'Valid Parentheses & Tree Depth (유효 괄호 검증 및 트리 순회)',
    category: 'Stack / Tree DFS',
    difficulty: 'Medium',
    description: '문자열 s에 열린/닫힌 괄호가 올바르게 닫혀 있는지 검증하고 중첩 깊이를 계산하시오.',
    inputExample: 's = "([{}])"',
    expectedOutput: 'true, maxDepth = 3',
    testCasesCount: 8,
  },
  {
    id: 'prob-lru-cache',
    title: 'LRU Cache & DP Knapsack (LRU 캐시 및 배낭 최적화)',
    category: 'Design / Dynamic Programming',
    difficulty: 'Hard',
    description: '용량 capacity를 갖는 Least Recently Used 캐시 연산(get/put)을 O(1) 시간 복잡도로 구현하시오.',
    inputExample: 'LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2);',
    expectedOutput: '[null, null, null, 1, null, -1]',
    testCasesCount: 12,
  },
];

// 시뮬레이션 로그 스텝 정의
export interface SimulationStep {
  stepIndex: number;
  phase: string;
  sender: string;
  receiver: string;
  message: string;
  durationMs: number;
  testPassCount: number;
  totalTestCases: number;
  tokensConsumed: number;
}
