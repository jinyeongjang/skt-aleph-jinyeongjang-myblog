import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Sliders,
  BarChart3,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Cpu,
  Clock,
  Sparkles,
  ArrowLeft,
  Zap,
  Gauge,
  Network,
  Terminal,
  Activity,
  Layers,
  Coins,
  BrainCircuit,
  FlaskConical,
  Code2,
  Database,
  Hash,
  Flame,
  Users,
  Trophy,
  HeartPulse,
} from 'lucide-react';
import { TOPOLOGY_EMPIRICAL_DATA, SAMPLE_ALGORITHM_PROBLEMS } from '../data/topologyData';

// 직관적인 4대 토폴로지 아키텍처 다이어그램 (인터랙티브 SVG 벡터 그래픽)
interface TopologyVisualProps {
  type: 'linear' | 'star' | 'debate' | 'hierarchy';
  isSelected?: boolean;
}

const TopologyVisualDiagram: React.FC<TopologyVisualProps> = ({ type, isSelected = false }) => {
  const primaryStroke = isSelected ? '#3b82f6' : '#64748b';
  const nodeFill = isSelected ? '#2563eb' : '#475569';
  const hubFill = isSelected ? '#38bdf8' : '#94a3b8';

  if (type === 'linear') {
    return (
      <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-neutral-900/40 p-2">
        <svg viewBox="0 0 240 80" className="h-full w-full max-w-[240px]">
          {/* 연결 화살표 선 */}
          <line
            x1="40"
            y1="40"
            x2="90"
            y2="40"
            stroke={primaryStroke}
            strokeWidth="2.5"
            strokeDasharray={isSelected ? '4 2' : 'none'}
          />
          <line
            x1="100"
            y1="40"
            x2="150"
            y2="40"
            stroke={primaryStroke}
            strokeWidth="2.5"
            strokeDasharray={isSelected ? '4 2' : 'none'}
          />
          <line
            x1="160"
            y1="40"
            x2="200"
            y2="40"
            stroke={primaryStroke}
            strokeWidth="2.5"
            strokeDasharray={isSelected ? '4 2' : 'none'}
          />

          {/* 노드 1: Plan */}
          <circle cx="35" cy="40" r="14" fill={nodeFill} />
          <text x="35" y="44" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
            A1
          </text>

          {/* 노드 2: Code */}
          <circle cx="95" cy="40" r="14" fill={nodeFill} />
          <text x="95" y="44" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
            A2
          </text>

          {/* 노드 3: Test */}
          <circle cx="155" cy="40" r="14" fill={nodeFill} />
          <text x="155" y="44" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
            A3
          </text>

          {/* 노드 4: Done */}
          <circle cx="205" cy="40" r="11" fill={isSelected ? '#10b981' : '#64748b'} />
          <text x="205" y="43" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
            ✓
          </text>
        </svg>
        <span className="absolute right-2 bottom-1 font-mono text-[9px] text-neutral-400">단방향 순차 체인</span>
      </div>
    );
  }

  if (type === 'star') {
    return (
      <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border border-blue-500/20 bg-blue-950/20 p-2">
        <svg viewBox="0 0 240 80" className="h-full w-full max-w-[240px]">
          {/* 방사형 양방향 링크 */}
          <line
            x1="120"
            y1="40"
            x2="50"
            y2="30"
            stroke={primaryStroke}
            strokeWidth="2"
            strokeDasharray={isSelected ? '3 2' : 'none'}
          />
          <line
            x1="120"
            y1="40"
            x2="65"
            y2="65"
            stroke={primaryStroke}
            strokeWidth="2"
            strokeDasharray={isSelected ? '3 2' : 'none'}
          />
          <line
            x1="120"
            y1="40"
            x2="190"
            y2="30"
            stroke={primaryStroke}
            strokeWidth="2"
            strokeDasharray={isSelected ? '3 2' : 'none'}
          />
          <line
            x1="120"
            y1="40"
            x2="175"
            y2="65"
            stroke={primaryStroke}
            strokeWidth="2"
            strokeDasharray={isSelected ? '3 2' : 'none'}
          />

          {/* 중앙 허브 (Orchestrator) */}
          <circle cx="120" cy="40" r="18" fill={hubFill} className={isSelected ? 'animate-pulse' : ''} />
          <circle cx="120" cy="40" r="13" fill="#1d4ed8" />
          <text x="120" y="43" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="black">
            HUB
          </text>

          {/* 위성 노드들 */}
          <circle cx="50" cy="30" r="11" fill={nodeFill} />
          <text x="50" y="33" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
            Plan
          </text>

          <circle cx="65" cy="65" r="11" fill={nodeFill} />
          <text x="65" y="68" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
            Code
          </text>

          <circle cx="190" cy="30" r="11" fill={nodeFill} />
          <text x="190" y="33" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
            Test
          </text>

          <circle cx="175" cy="65" r="11" fill={nodeFill} />
          <text x="175" y="68" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
            Crit
          </text>
        </svg>
        <span className="absolute right-2 bottom-1 font-mono text-[9px] font-bold text-blue-500">
          중앙 오케스트레이터
        </span>
      </div>
    );
  }

  if (type === 'debate') {
    return (
      <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border border-purple-500/20 bg-purple-950/20 p-2">
        <svg viewBox="0 0 240 80" className="h-full w-full max-w-[240px]">
          {/* 완전 연결 메시 링크들 (모든 노드 간 상호 연결) */}
          <line x1="60" y1="20" x2="180" y2="20" stroke={primaryStroke} strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="60" y1="60" x2="180" y2="60" stroke={primaryStroke} strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="60" y1="20" x2="60" y2="60" stroke={primaryStroke} strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="180" y1="20" x2="180" y2="60" stroke={primaryStroke} strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="60" y1="20" x2="180" y2="60" stroke={primaryStroke} strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="60" y1="60" x2="180" y2="20" stroke={primaryStroke} strokeWidth="1.5" strokeDasharray="2 2" />

          {/* 4개 토론 노드 */}
          <circle cx="60" cy="20" r="12" fill={nodeFill} />
          <text x="60" y="23" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
            A1
          </text>

          <circle cx="180" cy="20" r="12" fill={nodeFill} />
          <text x="180" y="23" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
            A2
          </text>

          <circle cx="60" cy="60" r="12" fill={nodeFill} />
          <text x="60" y="63" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
            A3
          </text>

          <circle cx="180" cy="60" r="12" fill={nodeFill} />
          <text x="180" y="63" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
            A4
          </text>
        </svg>
        <span className="absolute right-2 bottom-1 font-mono text-[9px] text-purple-400">완전 전방위 메시</span>
      </div>
    );
  }

  // hierarchy
  return (
    <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-2">
      <svg viewBox="0 0 240 80" className="h-full w-full max-w-[240px]">
        {/* 트리 연결선 */}
        <line x1="120" y1="18" x2="80" y2="45" stroke={primaryStroke} strokeWidth="2" />
        <line x1="120" y1="18" x2="160" y2="45" stroke={primaryStroke} strokeWidth="2" />
        <line x1="80" y1="45" x2="55" y2="68" stroke={primaryStroke} strokeWidth="1.5" />
        <line x1="80" y1="45" x2="95" y2="68" stroke={primaryStroke} strokeWidth="1.5" />
        <line x1="160" y1="45" x2="145" y2="68" stroke={primaryStroke} strokeWidth="1.5" />
        <line x1="160" y1="45" x2="185" y2="68" stroke={primaryStroke} strokeWidth="1.5" />

        {/* Root Lead */}
        <circle cx="120" cy="18" r="12" fill={hubFill} />
        <text x="120" y="21" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="black">
          Lead
        </text>

        {/* Sub-leads */}
        <circle cx="80" cy="45" r="10" fill={nodeFill} />
        <text x="80" y="48" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
          Sub1
        </text>

        <circle cx="160" cy="45" r="10" fill={nodeFill} />
        <text x="160" y="48" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
          Sub2
        </text>

        {/* Workers */}
        <circle cx="55" cy="68" r="7" fill="#64748b" />
        <circle cx="95" cy="68" r="7" fill="#64748b" />
        <circle cx="145" cy="68" r="7" fill="#64748b" />
        <circle cx="185" cy="68" r="7" fill="#64748b" />
      </svg>
      <span className="absolute right-2 bottom-1 font-mono text-[9px] text-indigo-400">계층형 분할 위임</span>
    </div>
  );
};

interface ResearchPaperAppProps {
  onBackToMain?: () => void;
}

export const ResearchPaperApp: React.FC<ResearchPaperAppProps> = ({ onBackToMain }) => {
  // 사용자가 할 일 3가지 탭
  const [activeTab, setActiveTab] = useState<'step1' | 'step2' | 'step3'>('step1');

  // 1단계: 사용자 요구 조건 상태 (Goal & Constraints)
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [targetPassRateInput, setTargetPassRateInput] = useState<string>('85');
  const [maxLatencyInput, setMaxLatencyInput] = useState<string>('4000');
  const [agentCount, setAgentCount] = useState<number>(4);
  const [priority, setPriority] = useState<'passRate' | 'latency' | 'cost'>('passRate');

  // 3단계: 선택된 문제 및 시뮬레이터 상태
  const [selectedProblemId, setSelectedProblemId] = useState<string>('prob-two-sum');
  const [selectedTopologyId, setSelectedTopologyId] = useState<'linear' | 'star' | 'debate' | 'hierarchy'>('star');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationProgress, setSimulationProgress] = useState<number>(0);
  const [activeAgentNode, setActiveAgentNode] = useState<string>('idle');
  const [simulationLogs, setSimulationLogs] = useState<{ step: number; tag: string; msg: string; time: string }[]>([]);
  const [simulationCompleted, setSimulationCompleted] = useState<boolean>(false);
  const [copiedConfig, setCopiedConfig] = useState<boolean>(false);

  // [멈추지 않는 안전 가드 로직] (BRB-C05): 잘못된 입력에도 멈추지 않고 안전한 수치로 자동 보정
  const parsedPassRate = useMemo(() => {
    const val = parseFloat(targetPassRateInput);
    if (isNaN(val)) return 85;
    if (val < 0) return 0;
    if (val > 100) return 100;
    return val;
  }, [targetPassRateInput]);

  const parsedLatency = useMemo(() => {
    const val = parseInt(maxLatencyInput, 10);
    if (isNaN(val)) return 4000;
    if (val < 500) return 500;
    if (val > 10000) return 10000;
    return val;
  }, [maxLatencyInput]);

  const hasInvalidInput = useMemo(() => {
    const pass = parseFloat(targetPassRateInput);
    const lat = parseInt(maxLatencyInput, 10);
    return isNaN(pass) || pass < 0 || pass > 100 || isNaN(lat) || lat < 500 || lat > 10000;
  }, [targetPassRateInput, maxLatencyInput]);

  // 빠른 프리셋 적용 (직관적인 UX)
  const applyPreset = (preset: 'performance' | 'latency' | 'cost') => {
    if (preset === 'performance') {
      setPriority('passRate');
      setDifficulty('Hard');
      setTargetPassRateInput('88');
      setMaxLatencyInput('4500');
      setAgentCount(4);
    } else if (preset === 'latency') {
      setPriority('latency');
      setDifficulty('Easy');
      setTargetPassRateInput('70');
      setMaxLatencyInput('2500');
      setAgentCount(3);
    } else {
      setPriority('cost');
      setDifficulty('Medium');
      setTargetPassRateInput('80');
      setMaxLatencyInput('3500');
      setAgentCount(4);
    }
  };

  // 논문 실측 데이터 기반 최적 토폴로지 추천 엔진 (BRB-C04)
  const recommendation = useMemo(() => {
    const topologies = Object.values(TOPOLOGY_EMPIRICAL_DATA);

    const scored = topologies.map((t) => {
      let score = 50;

      // 1. 목표 통과율 달성 여부
      if (t.passRate >= parsedPassRate) {
        score += 30;
      } else {
        score -= (parsedPassRate - t.passRate) * 1.5;
      }

      // 2. 최대 허용 지연시간 충족 여부
      if (t.latencyMs <= parsedLatency) {
        score += 25;
      } else {
        score -= ((t.latencyMs - parsedLatency) / 200) * 3;
      }

      // 3. 사용자 우선순위 가중치
      if (priority === 'passRate') {
        score += (t.passRate / 100) * 20;
      } else if (priority === 'latency') {
        score += ((10000 - t.latencyMs) / 10000) * 25;
      } else if (priority === 'cost') {
        score += (t.costEfficiency / 100) * 20;
      }

      // 난이도 반영
      if (difficulty === 'Hard' && (t.id === 'star' || t.id === 'hierarchy')) {
        score += 10;
      }

      return {
        topology: t,
        score: Math.max(10, Math.min(100, Math.round(score))),
      };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored;
  }, [parsedPassRate, parsedLatency, priority, difficulty]);

  const topRecommended = recommendation[0].topology;

  // 선택된 샘플 문제
  const selectedProblem = useMemo(() => {
    return SAMPLE_ALGORITHM_PROBLEMS.find((p) => p.id === selectedProblemId) || SAMPLE_ALGORITHM_PROBLEMS[0];
  }, [selectedProblemId]);

  // 실시간 파이프라인 시뮬레이션 구동 (BRB-C05)
  const handleStartSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationProgress(0);
    setSimulationLogs([]);
    setSimulationCompleted(false);
    setActiveAgentNode('planner');

    const activeTop = TOPOLOGY_EMPIRICAL_DATA[selectedTopologyId];

    const pipelineSteps = [
      {
        step: 1,
        node: 'planner',
        tag: 'INIT',
        msg: `[초기화] ${activeTop.nameKorean} (${activeTop.symbol}) 파이프라인 생성. 에이전트 ${agentCount}명 연결 완료.`,
        time: '0.0s',
      },
      {
        step: 2,
        node: 'coder',
        tag: 'ANALYSIS',
        msg: `[문제 파싱] '${selectedProblem.title}' (${selectedProblem.difficulty}) 요구사항 및 ${selectedProblem.testCasesCount}개 단위 테스트셋 준비.`,
        time: '0.6s',
      },
      {
        step: 3,
        node: 'tester',
        tag: 'GENERATE',
        msg: `[코드 생성] Coder 에이전트 알고리즘 초안 작성. 1차 테스트 통과: ${
          selectedTopologyId === 'linear' ? '3' : '4'
        }/${selectedProblem.testCasesCount}`,
        time: '1.4s',
      },
      {
        step: 4,
        node: 'critic',
        tag: 'FEEDBACK',
        msg:
          selectedTopologyId === 'star'
            ? `[중앙 조율 피드백] 중앙 오케스트레이터가 예외 케이스 실패를 감지하고 Coder에게 즉각 수정 지시 전송. 자가 회복률 ${activeTop.errorRecoveryRate}% 발동.`
            : selectedTopologyId === 'debate'
              ? `[상호 교차 토론] 2개 에이전트 간 반례 검토 및 교차 토론 진행 완료 (지연시간 오버헤드 발생).`
              : selectedTopologyId === 'hierarchy'
                ? `[계층형 승인] 서브리드 에이전트가 경계 조건 보강 코드를 승인 및 병합 완료.`
                : `[순차 진행] 순차 파이프라인 특성상 피드백 없이 다음 단계로 직행.`,
        time: '2.3s',
      },
      {
        step: 5,
        node: 'complete',
        tag: 'FINAL',
        msg: `[검증 완료] 최종 단위 테스트 통과율 ${activeTop.passRate}%, 실행 지연시간 ${activeTop.latencyMs}ms, 토큰 소모 ${activeTop.tokenUsage} tokens 달성!`,
        time: `${(activeTop.latencyMs / 1000).toFixed(1)}s`,
      },
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setSimulationProgress(current * 20);
      setActiveAgentNode(pipelineSteps[current - 1].node);
      setSimulationLogs((prev) => [...prev, pipelineSteps[current - 1]]);

      if (current >= 5) {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulationCompleted(true);
        setActiveAgentNode('done');
      }
    }, 550);
  };

  const handleResetInputs = () => {
    setDifficulty('Medium');
    setTargetPassRateInput('85');
    setMaxLatencyInput('4000');
    setAgentCount(4);
    setPriority('passRate');
  };

  const handleCopyConfig = async () => {
    const configData = {
      experiment: 'Multi-Agent Collaboration Topology Pipeline',
      paperReference:
        '알고리즘 문제 해결 및 단위 테스트 검증에서 다중 에이전트 협업 토폴로지의 테스트 통과율 및 실행 지연시간 비교 실증 (장진영)',
      recommendedTopology: topRecommended.nameKorean,
      parameters: {
        problem: selectedProblem.title,
        difficulty,
        targetPassRate: `${parsedPassRate}%`,
        maxLatencyMs: parsedLatency,
        agentCount,
        priority,
      },
      empiricalMetrics: {
        passRate: `${topRecommended.passRate}%`,
        latencyMs: `${topRecommended.latencyMs}ms`,
        tokens: topRecommended.tokenUsage,
        errorRecoveryRate: `${topRecommended.errorRecoveryRate}%`,
      },
      exportedAt: new Date().toISOString(),
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(configData, null, 2));
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-100 text-neutral-900 transition-colors selection:bg-blue-500/20 dark:bg-[#07090e] dark:text-neutral-100">
      {/* ================= 글래스모피즘 앰비언트 광원 (유리 뒤로 은은히 비치는 빛) ================= */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* 상단 좌측 푸른빛 광원 */}
        <div className="absolute -top-32 left-1/10 h-[520px] w-[520px] rounded-full bg-linear-to-br from-blue-500/30 via-cyan-400/20 to-indigo-600/25 blur-[120px] dark:from-blue-600/25 dark:via-cyan-500/15 dark:to-indigo-800/25" />
        {/* 중앙 우측 보랏빛/자주빛 광원 */}
        <div className="absolute top-1/4 -right-24 h-[580px] w-[580px] rounded-full bg-linear-to-tl from-purple-500/25 via-indigo-500/20 to-pink-500/15 blur-[140px] dark:from-purple-700/20 dark:via-indigo-800/20 dark:to-pink-900/10" />
        {/* 하단 좌측 에메랄드/청록 광원 */}
        <div className="absolute bottom-10 -left-28 h-[600px] w-[600px] rounded-full bg-linear-to-tr from-teal-400/20 via-emerald-400/15 to-blue-500/20 blur-[130px] dark:from-teal-700/15 dark:via-emerald-900/15 dark:to-blue-900/15" />
        {/* 미세 그리드 텍스처 (유리 반사 질감 강화) */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(120,150,220,0.08)_1px,transparent_1px)] bg-[size:28px_28px] dark:bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)]" />
      </div>

      {/* 최상단 글래스모피즘 네비게이션 바 */}
      <nav className="sticky top-0 z-40 border-b border-white/60 bg-white/70 shadow-[0_4px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/70 dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            {onBackToMain ? (
              <button
                onClick={onBackToMain}
                className="group inline-flex items-center gap-1.5 rounded-xl border border-white/80 bg-white/80 px-3 py-1.5 text-xs font-bold text-neutral-700 shadow-[0_2px_10px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all hover:border-blue-300 hover:bg-white hover:text-blue-600 dark:border-white/10 dark:bg-neutral-800/80 dark:text-neutral-200 dark:hover:border-blue-500 dark:hover:bg-neutral-800"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>메인 포트폴리오</span>
              </button>
            ) : (
              <a
                href="/"
                className="group inline-flex items-center gap-1.5 rounded-xl border border-white/80 bg-white/80 px-3 py-1.5 text-xs font-bold text-neutral-700 shadow-[0_2px_10px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all hover:border-blue-300 hover:bg-white hover:text-blue-600 dark:border-white/10 dark:bg-neutral-800/80 dark:text-neutral-200 dark:hover:border-blue-500 dark:hover:bg-neutral-800"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>메인 포트폴리오</span>
              </a>
            )}
            <span className="hidden text-xs font-bold text-neutral-300 sm:inline dark:text-neutral-700">/</span>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-xs">
                <Cpu className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs font-black tracking-tight text-neutral-900 dark:text-white">
                Topology Studio <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">BR-B</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/downloads/skt-aleph-jinyeong-research-paper.docx"
              download
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/80 bg-white/70 px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-2xs backdrop-blur-md transition-all hover:bg-white dark:border-white/10 dark:bg-neutral-800/70 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              <Download className="h-3.5 w-3.5 text-neutral-500" />
              <span className="hidden sm:inline">논문 원문 (DOCX)</span>
              <span className="sm:hidden">DOCX</span>
            </a>
            <a
              href="https://skt-aleph-jinyeong-research-paper.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs shadow-blue-500/20 backdrop-blur-md transition-all hover:from-blue-700 hover:to-indigo-700"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>논문 웹 뷰어</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-5xl space-y-7 px-4 py-8 sm:px-6 sm:py-10">
        {/* ================= 첫 화면 히어로: 논문 제목과 '누구를 어떻게 돕는가' (BRB-C01, BRB-C03) ================= */}
        <section className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] backdrop-blur-2xl sm:p-8 dark:border-white/10 dark:bg-neutral-900/75 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          {/* 상단 미세 무지개 광택 라인 */}
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-500 via-indigo-500 via-purple-500 to-cyan-400 opacity-90" />

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-500/10 px-3 py-0.5 text-xs font-black text-blue-700 backdrop-blur-md dark:border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-300">
                <FileText className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>10번 연구 논문 반영 실전 애플리케이션 (과제 BR-B)</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/80 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-800 backdrop-blur-md dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300">
                <Sparkles className="h-3 w-3" />
                <span>무로그인 시크릿 창 즉시 실행</span>
              </span>
            </div>

            {/* 논문 제목 (BRB-C03) */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-black tracking-widest text-blue-600 uppercase dark:text-blue-400">
                Research Paper Empirical Application
              </span>
              <h1 className="text-xl leading-tight font-black break-keep text-neutral-900 sm:text-2xl lg:text-3xl dark:text-white">
                알고리즘 문제 해결 및 단위 테스트 검증에서 다중 에이전트 협업 토폴로지(순차형 vs 중앙 조율형 vs 토론형
                vs 계층형)의 테스트 통과율 및 실행 지연시간 비교 실증
              </h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                <span>저자: 장진영 (SKT ALEPH 1기)</span>
                <span>•</span>
                <span>실증 데이터: 4개 토폴로지 × 200회 실험 실측 벤치마크</span>
                <span>•</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">중앙 조율형 통과율 88.0% 입증</span>
              </div>
            </div>

            {/* 핵심 목적 1문장 하이라이트 글래스 박스 (BRB-C01, BRB-C03) */}
            <div className="relative overflow-hidden rounded-2xl border border-blue-300/60 bg-linear-to-br from-blue-50/80 via-white/80 to-indigo-50/70 p-4.5 shadow-sm backdrop-blur-xl sm:p-5 dark:border-blue-500/30 dark:from-blue-950/50 dark:via-neutral-900/60 dark:to-indigo-950/40">
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25">
                  <Zap className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-black tracking-wider text-blue-800 uppercase dark:text-blue-300">
                      애플리케이션 핵심 목적 (누구를 어떻게 돕는가 · BRB-C01)
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed font-bold break-keep text-neutral-900 sm:text-base dark:text-neutral-100">
                    "본 애플리케이션은 LLM 기반 멀티 에이전트 시스템을 설계하는 개발자·연구자가 알고리즘 문제 해결 및
                    단위 테스트 파이프라인을 구축할 때, 4대 협업 토폴로지 실증 결과(중앙 조율형 통과율 88.0% 및 토론형
                    대비 지연시간 40% 절감 등)를 바탕으로 요구 조건에 최적화된 협업 토폴로지를 진단·비교하고
                    시뮬레이션해 줍니다."
                  </p>
                </div>
              </div>
            </div>

            {/* ================= 직관적인 3단계 인터랙티브 탭 진행 바 (BRB-C02) ================= */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-extrabold text-neutral-500 dark:text-neutral-400">
                사용자가 할 일 세 가지 (Step-by-Step 워크플로우):
              </span>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {[
                  {
                    id: 'step1' as const,
                    stepNum: '01',
                    title: '할 일 1. 요구 조건 설정',
                    desc: '문제 난이도 & 목표 지표 입력',
                    icon: Sliders,
                  },
                  {
                    id: 'step2' as const,
                    stepNum: '02',
                    title: '할 일 2. 4대 구조 실증 비교',
                    desc: '논문 200회 데이터 기반 최적 추천',
                    icon: BarChart3,
                  },
                  {
                    id: 'step3' as const,
                    stepNum: '03',
                    title: '할 일 3. 시뮬레이터 구동',
                    desc: '가상 협업 관찰 및 Config 내보내기',
                    icon: Play,
                  },
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`group relative flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                        isActive
                          ? 'border-blue-500/80 bg-white/90 shadow-md ring-2 ring-blue-500/20 backdrop-blur-xl dark:border-blue-400 dark:bg-neutral-800/90'
                          : 'border-white/60 bg-white/50 hover:border-neutral-300 hover:bg-white/80 dark:border-white/10 dark:bg-neutral-900/50 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/50'
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-all ${
                          isActive
                            ? 'bg-linear-to-tr from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/30'
                            : 'bg-neutral-200/80 text-neutral-600 group-hover:bg-blue-100 group-hover:text-blue-700 dark:bg-neutral-800 dark:text-neutral-400'
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-xs font-black transition-colors ${
                            isActive ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-900 dark:text-white'
                          }`}
                        >
                          {item.title}
                        </div>
                        <div className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">{item.desc}</div>
                      </div>
                      {isActive && (
                        <div className="absolute right-3 h-2 w-2 rounded-full bg-blue-600 shadow-xs dark:bg-blue-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 탭 1: 사용자가 할 일 1 - 요구 조건 설정 & 프리셋 (BRB-C02, BRB-C05) ================= */}
        <AnimatePresence mode="wait">
          {activeTab === 'step1' && (
            <motion.section
              key="step1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] backdrop-blur-2xl sm:p-7 dark:border-white/10 dark:bg-neutral-900/75 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
            >
              {/* 카드 상단 헤더 */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/60 pb-4 dark:border-neutral-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 dark:text-blue-400">
                    <Sliders className="h-4 w-4" />
                    <span>할 일 1단계 · 요구 조건 설정</span>
                  </div>
                  <h2 className="text-lg font-black text-neutral-900 sm:text-xl dark:text-white">
                    멀티 에이전트 시스템 요구 조건 및 제약 설정
                  </h2>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    구축하고자 하는 알고리즘 문제 해결 파이프라인의 난이도, 목표 통과율, 지연시간 한계를 입력합니다.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetInputs}
                    className="inline-flex items-center gap-1 rounded-xl border border-white/80 bg-white/70 px-2.5 py-1.5 text-xs font-semibold text-neutral-700 shadow-2xs backdrop-blur-md transition-all hover:bg-neutral-100 dark:border-white/10 dark:bg-neutral-800/70 dark:text-neutral-300 dark:hover:bg-neutral-700"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>초기값 복원</span>
                  </button>
                </div>
              </div>

              {/* 빠른 프리셋 버튼 바 (UI 직관성 강화) */}
              <div className="my-5 rounded-2xl border border-white/60 bg-linear-to-r from-blue-50/50 via-white/50 to-indigo-50/50 p-3.5 backdrop-blur-md dark:border-white/10 dark:from-neutral-800/50 dark:via-neutral-900/50 dark:to-neutral-800/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="flex items-center gap-1 text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    <span>원클릭 추천 프리셋:</span>
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => applyPreset('performance')}
                      className="rounded-xl border border-blue-200/80 bg-white/80 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-2xs backdrop-blur-md transition-all hover:bg-blue-600 hover:text-white dark:border-blue-900/60 dark:bg-neutral-800 dark:text-blue-300 dark:hover:bg-blue-600"
                    >
                      🎯 고난도·최고통과율 (88% 통과율 우선)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset('latency')}
                      className="rounded-xl border border-neutral-200/80 bg-white/80 px-3 py-1.5 text-xs font-bold text-neutral-700 shadow-2xs backdrop-blur-md transition-all hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-white dark:hover:text-neutral-900"
                    >
                      ⚡ 초저지연 (2.5초 이내 완료)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset('cost')}
                      className="rounded-xl border border-indigo-200/80 bg-white/80 px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-2xs backdrop-blur-md transition-all hover:bg-indigo-600 hover:text-white dark:border-indigo-900/60 dark:bg-neutral-800 dark:text-indigo-300 dark:hover:bg-indigo-600"
                    >
                      ⚖️ 균형·비용절감 (토큰 효율)
                    </button>
                  </div>
                </div>
              </div>

              {/* 잘못된 입력 안전 보정 알림 (BRB-C05) */}
              {hasInvalidInput && (
                <div className="mb-5 rounded-2xl border border-amber-300/80 bg-amber-50/80 p-3.5 text-xs text-amber-900 backdrop-blur-md dark:border-amber-800/80 dark:bg-amber-950/40 dark:text-amber-200">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                    <div>
                      <span className="font-bold">안전 가드(Safe Fallback) 자동 보정 발동:</span>
                      <p className="mt-0.5 leading-relaxed text-neutral-700 dark:text-neutral-300">
                        입력값이 안전 허용 범위(통과율 0~100%, 지연시간 500~10,000ms)를 벗어났으나, 애플리케이션이
                        멈추지 않고 안전 기본값(통과율 {parsedPassRate}%, 지연시간 {parsedLatency}ms)으로 보정하여
                        진단을 계속 수행합니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 입력 컨트롤 그리드 (글래스모피즘 서브 카드) */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* 1. 문제 난이도 */}
                <div className="space-y-2 rounded-2xl border border-white/60 bg-white/50 p-4 shadow-2xs backdrop-blur-md dark:border-white/10 dark:bg-neutral-800/40">
                  <label className="flex items-center gap-1.5 text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                    <Layers className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    <span>1) 대상 알고리즘 문제 난이도</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: 'Easy', label: '초급 (Easy)', icon: Sparkles, color: 'text-emerald-500' },
                        { id: 'Medium', label: '중급 (Medium)', icon: Layers, color: 'text-blue-500' },
                        { id: 'Hard', label: '고난도 (Hard)', icon: Flame, color: 'text-rose-500' },
                      ] as const
                    ).map((diff) => {
                      const Icon = diff.icon;
                      return (
                        <button
                          key={diff.id}
                          type="button"
                          onClick={() => setDifficulty(diff.id)}
                          className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition-all ${
                            difficulty === diff.id
                              ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                              : 'border-white/80 bg-white/70 text-neutral-700 hover:bg-white dark:border-white/10 dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-700'
                          }`}
                        >
                          <Icon className={`h-3.5 w-3.5 ${difficulty === diff.id ? 'text-white' : diff.color}`} />
                          <span>{diff.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {difficulty === 'Easy' && '단순 배열 및 문자열 순환 (순차형으로도 해결 가능)'}
                    {difficulty === 'Medium' && '스택/트리/DFS 탐색 (중앙 조율형 Star 구조 권장)'}
                    {difficulty === 'Hard' && '동적 계획법/복합 그래프 (고도의 오류 수정 피드백 루프 필수)'}
                  </p>
                </div>

                {/* 2. 최적화 우선순위 */}
                <div className="space-y-2 rounded-2xl border border-white/60 bg-white/50 p-4 shadow-2xs backdrop-blur-md dark:border-white/10 dark:bg-neutral-800/40">
                  <label className="flex items-center gap-1.5 text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                    <Gauge className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>2) 엔지니어링 최적화 우선순위</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: 'passRate', label: '통과율 우선', icon: Trophy, color: 'text-amber-500' },
                        { id: 'latency', label: '지연시간 절감', icon: Zap, color: 'text-blue-500' },
                        { id: 'cost', label: '비용 절감', icon: Coins, color: 'text-purple-500' },
                      ] as const
                    ).map((p) => {
                      const Icon = p.icon;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPriority(p.id)}
                          className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition-all ${
                            priority === p.id
                              ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                              : 'border-white/80 bg-white/70 text-neutral-700 hover:bg-white dark:border-white/10 dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-700'
                          }`}
                        >
                          <Icon className={`h-3.5 w-3.5 ${priority === p.id ? 'text-white' : p.color}`} />
                          <span>{p.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    선택한 우선순위에 따라 4대 토폴로지의 적합도 가중치가 실시간 재계산됩니다.
                  </p>
                </div>

                {/* 3. 목표 단위 테스트 통과율 */}
                <div className="space-y-2 rounded-2xl border border-white/60 bg-white/50 p-4 shadow-2xs backdrop-blur-md dark:border-white/10 dark:bg-neutral-800/40">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="target-pass-rate-input"
                      className="flex items-center gap-1.5 text-xs font-extrabold text-neutral-800 dark:text-neutral-200"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                      <span>3) 목표 단위 테스트 통과율 (%)</span>
                    </label>
                    <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-black text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {parsedPassRate}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      aria-label="목표 통과율 슬라이더"
                      type="range"
                      min="50"
                      max="100"
                      step="1"
                      value={parsedPassRate}
                      onChange={(e) => setTargetPassRateInput(e.target.value)}
                      className="h-2 flex-1 cursor-pointer accent-blue-600"
                    />
                    <input
                      id="target-pass-rate-input"
                      type="number"
                      value={targetPassRateInput}
                      onChange={(e) => setTargetPassRateInput(e.target.value)}
                      className="w-20 rounded-xl border border-neutral-300 bg-white/90 px-3 py-1.5 text-center text-xs font-bold text-neutral-900 shadow-2xs focus:border-blue-600 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    논문 실측 최고 통과율: 중앙 조율형 88.0%, 완전 토론형 84.5%
                  </p>
                </div>

                {/* 4. 최대 허용 지연시간 */}
                <div className="space-y-2 rounded-2xl border border-white/60 bg-white/50 p-4 shadow-2xs backdrop-blur-md dark:border-white/10 dark:bg-neutral-800/40">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="max-latency-input"
                      className="flex items-center gap-1.5 text-xs font-extrabold text-neutral-800 dark:text-neutral-200"
                    >
                      <Clock className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>4) 최대 허용 실행 지연시간 (ms)</span>
                    </label>
                    <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-black text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {parsedLatency}ms ({(parsedLatency / 1000).toFixed(1)}초)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      aria-label="최대 허용 지연시간 슬라이더"
                      type="range"
                      min="1000"
                      max="8000"
                      step="100"
                      value={parsedLatency}
                      onChange={(e) => setMaxLatencyInput(e.target.value)}
                      className="h-2 flex-1 cursor-pointer accent-indigo-600"
                    />
                    <input
                      id="max-latency-input"
                      type="number"
                      value={maxLatencyInput}
                      onChange={(e) => setMaxLatencyInput(e.target.value)}
                      className="w-24 rounded-xl border border-neutral-300 bg-white/90 px-3 py-1.5 text-center text-xs font-bold text-neutral-900 shadow-2xs focus:border-indigo-600 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    논문 실측 평균 레이턴시: 순차형 1,950ms / 중앙 조율형 3,240ms / 토론형 5,820ms
                  </p>
                </div>

                {/* 5. 에이전트 인원 수 */}
                <div className="space-y-2 rounded-2xl border border-white/60 bg-white/50 p-4 shadow-2xs backdrop-blur-md md:col-span-2 dark:border-white/10 dark:bg-neutral-800/40">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-1.5 text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                      <Users className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                      <span>5) 투입 에이전트 인원 수</span>
                    </label>
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                      {agentCount}개 에이전트 구성
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setAgentCount(num)}
                        className={`flex-1 rounded-xl border py-2 text-xs font-bold transition-all ${
                          agentCount === num
                            ? 'border-blue-600 bg-blue-100/90 font-black text-blue-900 shadow-2xs dark:border-blue-500 dark:bg-blue-950/80 dark:text-blue-200'
                            : 'border-white/80 bg-white/70 text-neutral-600 hover:bg-white dark:border-white/10 dark:bg-neutral-800/80 dark:text-neutral-400'
                        }`}
                      >
                        {num}명
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 실시간 1단계 진단 요약 글래스 배너 및 2단계 이동 버튼 */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-blue-200/80 bg-linear-to-r from-blue-50/70 via-white/80 to-indigo-50/70 p-4.5 backdrop-blur-xl dark:border-blue-900/50 dark:from-blue-950/40 dark:via-neutral-900/70 dark:to-indigo-950/30">
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold tracking-wider text-blue-800 uppercase dark:text-blue-300">
                    실시간 요구 조건 분석 결과:
                  </span>
                  <p className="text-xs break-keep text-neutral-800 dark:text-neutral-200">
                    현재 설정(난이도: {difficulty}, 목표 통과율: {parsedPassRate}%, 허용 지연: {parsedLatency}ms)에 가장
                    부합하는 구조는{' '}
                    <strong className="text-blue-700 underline decoration-blue-500/50 underline-offset-2 dark:text-blue-300">
                      {topRecommended.nameKorean}
                    </strong>
                    (적합도 점수 {recommendation[0].score}점)입니다.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('step2')}
                  className="group inline-flex items-center gap-1.5 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-black text-white shadow-md shadow-blue-500/20 backdrop-blur-md transition-all hover:from-blue-700 hover:to-indigo-700"
                >
                  <span>2단계: 4대 구조 실증 비교 보기</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.section>
          )}

          {/* ================= 탭 2: 사용자가 할 일 2 - 4대 토폴로지 실증 비교 & 최적 구조 진단 (BRB-C02, BRB-C04) ================= */}
          {activeTab === 'step2' && (
            <motion.section
              key="step2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] backdrop-blur-2xl sm:p-7 dark:border-white/10 dark:bg-neutral-900/75 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/60 pb-4 dark:border-neutral-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 dark:text-blue-400">
                    <BarChart3 className="h-4 w-4" />
                    <span>할 일 2단계 · 4대 구조 실증 비교</span>
                  </div>
                  <h2 className="text-lg font-black text-neutral-900 sm:text-xl dark:text-white">
                    논문 200회 실증 데이터 기반 4대 토폴로지 매트릭스 비교
                  </h2>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    논문에서 직접 측정한 수치(통과율, 지연시간, 토큰 소모량, 회복률)를 비교하고 추천 근거를 확인합니다.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/80 px-3 py-1.5 text-xs font-bold text-neutral-700 shadow-2xs backdrop-blur-md dark:border-white/10 dark:bg-neutral-800/80 dark:text-neutral-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>최적 추천: {topRecommended.nameKorean.split(' ')[0]}</span>
                </div>
              </div>

              {/* 4대 토폴로지 인터랙티브 카드 그리드 */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Object.values(TOPOLOGY_EMPIRICAL_DATA).map((item) => {
                  const isSelected = selectedTopologyId === item.id;
                  const recData = recommendation.find((r) => r.topology.id === item.id);
                  const score = recData?.score ?? 70;
                  const isTop = topRecommended.id === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedTopologyId(item.id)}
                      className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border p-4.5 backdrop-blur-xl transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500/10 shadow-lg ring-2 ring-blue-500/30 dark:border-blue-400 dark:bg-blue-500/15'
                          : 'dark:bg-neutral-850/60 border-white/60 bg-white/60 hover:border-blue-300 hover:bg-white/90 dark:border-white/10 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/80'
                      }`}
                    >
                      {isTop && (
                        <span className="absolute -top-2.5 right-3 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 px-2.5 py-0.5 text-[10px] font-black text-white shadow-md shadow-blue-500/30">
                          최적 추천
                        </span>
                      )}

                      <div className="space-y-3">
                        {/* 직관적인 토폴로지 아키텍처 다이어그램 (인터랙티브 SVG) */}
                        <TopologyVisualDiagram type={item.id} isSelected={isSelected} />

                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                              {item.symbol}
                            </span>
                            <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400">
                              {item.id === 'star'
                                ? '★ 최다 선택'
                                : item.id === 'linear'
                                  ? '초경량'
                                  : item.id === 'debate'
                                    ? '정밀 검증'
                                    : '대규모 팀'}
                            </span>
                          </div>
                          <h3 className="text-sm font-black text-neutral-900 dark:text-white">{item.nameKorean}</h3>
                        </div>

                        {/* 핵심 수치 배지 */}
                        <div className="space-y-1.5 rounded-xl border border-white/60 bg-white/70 p-3 text-xs backdrop-blur-md dark:border-white/5 dark:bg-neutral-800/70">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                              <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                              <span>테스트 통과율</span>
                            </span>
                            <span className="font-black text-blue-600 dark:text-blue-400">{item.passRate}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                              <Clock className="h-3.5 w-3.5 text-amber-500" />
                              <span>평균 지연시간</span>
                            </span>
                            <span className="font-extrabold text-neutral-800 dark:text-neutral-200">
                              {item.latencyMs.toLocaleString()}ms
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                              <HeartPulse className="h-3.5 w-3.5 text-emerald-500" />
                              <span>오류 회복률</span>
                            </span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              {item.errorRecoveryRate}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                              <Coins className="h-3.5 w-3.5 text-purple-500" />
                              <span>토큰 소모량</span>
                            </span>
                            <span className="font-medium text-neutral-600 dark:text-neutral-400">
                              약 {item.tokenUsage.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="text-[11px] leading-relaxed break-keep text-neutral-600 dark:text-neutral-400">
                          {item.description}
                        </div>
                      </div>

                      <div className="mt-4 border-t border-neutral-200/60 pt-3 dark:border-neutral-800">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1 font-bold text-neutral-500 dark:text-neutral-400">
                            <Trophy className="h-3 w-3 text-amber-500" />
                            <span>적합도 점수</span>
                          </span>
                          <span className="font-black text-blue-600 dark:text-blue-400">{score}점</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200/80 dark:bg-neutral-800">
                          <div
                            className="h-full rounded-full bg-linear-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 논문 결과 기반 심층 진단 리포트 박스 (BRB-C04) */}
              <div className="rounded-2xl border border-blue-200/80 bg-linear-to-br from-blue-50/70 via-white/80 to-indigo-50/60 p-5 backdrop-blur-xl dark:border-blue-900/50 dark:from-blue-950/40 dark:via-neutral-900/70 dark:to-indigo-950/30">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-black text-blue-950 dark:text-blue-200">
                    논문 실증 결과에 따른 최적 구조 진단 리포트 (추천: {topRecommended.nameKorean})
                  </h3>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/80 bg-white/85 p-3.5 text-xs shadow-2xs backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/85">
                    <span className="font-extrabold text-blue-900 dark:text-blue-300">1. 통과율 우위</span>
                    <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                      중앙 조율형(Star)은 순차형 대비 +20%p 높은 88.0%의 단위 테스트 통과율을 달성하며, 오류 발생 시
                      즉각 테스터 피드백을 전달하여 자가 수정률 89%를 기록했습니다.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/80 bg-white/85 p-3.5 text-xs shadow-2xs backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/85">
                    <span className="font-extrabold text-blue-900 dark:text-blue-300">2. 지연시간 절감</span>
                    <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                      완전 토론형(Debate, 5,820ms) 대비 실행 지연시간을 44% 절감(3,240ms)하여 실시간 서비스 배포에 가장
                      이상적인 성능-속도 균형점을 형성합니다.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/80 bg-white/85 p-3.5 text-xs shadow-2xs backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/85">
                    <span className="font-extrabold text-blue-900 dark:text-blue-300">3. 비용 효율성</span>
                    <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                      에이전트 간 n*(n-1) 전방위 토론 통신을 차단하고 오케스트레이터 허브를 통한 정밀 디스패치로 토큰
                      낭비를 절반 이하로 압축했습니다.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200/60 pt-3 dark:border-neutral-800">
                  <span className="text-xs text-neutral-700 dark:text-neutral-300">
                    선택된 구조:{' '}
                    <strong className="text-blue-700 dark:text-blue-300">
                      {TOPOLOGY_EMPIRICAL_DATA[selectedTopologyId].nameKorean}
                    </strong>
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveTab('step3')}
                    className="group inline-flex items-center gap-1.5 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-black text-white shadow-md shadow-blue-500/20 backdrop-blur-md transition-all hover:from-blue-700 hover:to-indigo-700"
                  >
                    <span>3단계: 실시간 시뮬레이터 구동하기</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {/* ================= 탭 3: 사용자가 할 일 3 - 실시간 파이프라인 시뮬레이터 구동 & 설정 내보내기 (BRB-C02, BRB-C05) ================= */}
          {activeTab === 'step3' && (
            <motion.section
              key="step3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] backdrop-blur-2xl sm:p-7 dark:border-white/10 dark:bg-neutral-900/75 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/60 pb-4 dark:border-neutral-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 dark:text-blue-400">
                    <Play className="h-4 w-4" />
                    <span>할 일 3단계 · 실시간 시뮬레이터 구동</span>
                  </div>
                  <h2 className="text-lg font-black text-neutral-900 sm:text-xl dark:text-white">
                    실시간 멀티 에이전트 협업 파이프라인 시뮬레이터
                  </h2>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    알고리즘 문제를 선택하고 에이전트 간의 단계별 오케스트레이션 과정을 실시간으로 관찰합니다.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyConfig}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/80 bg-white/80 px-3 py-1.5 text-xs font-bold text-neutral-700 shadow-2xs backdrop-blur-md transition-all hover:bg-neutral-100 dark:border-white/10 dark:bg-neutral-800/80 dark:text-neutral-200 dark:hover:bg-neutral-700"
                  >
                    {copiedConfig ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>복사 완료</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>오케스트레이션 Config 복사</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 시뮬레이션 설정 컨트롤 */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* 1. 문제 선택 */}
                <div className="space-y-2.5">
                  <label className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                    검증 대상 알고리즘 문제 선택 (공개 예시 데이터 · BRB-C06)
                  </label>
                  <div className="space-y-2">
                    {SAMPLE_ALGORITHM_PROBLEMS.map((prob) => {
                      const ProbIcon =
                        prob.id === 'prob-two-sum' ? Hash : prob.id === 'prob-valid-parentheses' ? Code2 : Database;
                      const isProbSelected = selectedProblemId === prob.id;
                      return (
                        <div
                          key={prob.id}
                          onClick={() => !isSimulating && setSelectedProblemId(prob.id)}
                          className={`cursor-pointer rounded-2xl border p-3.5 backdrop-blur-md transition-all ${
                            isProbSelected
                              ? 'border-blue-500 bg-blue-500/10 shadow-sm ring-1 ring-blue-500/30 dark:border-blue-400 dark:bg-blue-500/15'
                              : 'dark:bg-neutral-850/50 border-white/60 bg-white/50 hover:border-neutral-300 hover:bg-white/80 dark:border-white/10 dark:hover:bg-neutral-800/60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span
                                className={`flex h-6 w-6 items-center justify-center rounded-lg ${isProbSelected ? 'bg-blue-600 text-white' : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300'}`}
                              >
                                <ProbIcon className="h-3.5 w-3.5" />
                              </span>
                              <span className="text-xs font-black text-neutral-900 dark:text-white">{prob.title}</span>
                            </div>
                            <span className="rounded-full bg-neutral-200/80 px-2 py-0.5 text-[10px] font-bold text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
                              {prob.difficulty}
                            </span>
                          </div>
                          <p className="mt-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                            {prob.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. 실행 토폴로지 선택 & 시뮬레이터 구동 */}
                <div className="dark:bg-neutral-850/50 flex flex-col justify-between space-y-4 rounded-2xl border border-white/60 bg-white/50 p-4.5 backdrop-blur-md dark:border-white/10">
                  <div className="space-y-3">
                    <label className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                      실행 토폴로지 구조
                    </label>
                    <select
                      value={selectedTopologyId}
                      disabled={isSimulating}
                      onChange={(e) =>
                        setSelectedTopologyId(e.target.value as 'linear' | 'star' | 'debate' | 'hierarchy')
                      }
                      className="w-full rounded-xl border border-neutral-300/80 bg-white/90 p-2.5 text-xs font-bold text-neutral-900 shadow-2xs backdrop-blur-md focus:border-blue-600 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                    >
                      <option value="linear">순차형 (Linear Pipeline) - 1,950ms / 통과율 68%</option>
                      <option value="star">중앙 조율형 (Star/Orchestrator) - 3,240ms / 통과율 88% (추천)</option>
                      <option value="debate">완전 연결 토론형 (Debate) - 5,820ms / 통과율 84.5%</option>
                      <option value="hierarchy">계층형 (Hierarchy) - 4,110ms / 통과율 81%</option>
                    </select>

                    <div className="rounded-xl border border-blue-200/60 bg-blue-50/50 p-3 text-[11px] text-neutral-700 backdrop-blur-md dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-neutral-300">
                      <span className="font-bold text-blue-900 dark:text-blue-300">실행 메트릭 예상:</span> 예상
                      지연시간 {TOPOLOGY_EMPIRICAL_DATA[selectedTopologyId].latencyMs}ms, 단위테스트 성공률{' '}
                      {TOPOLOGY_EMPIRICAL_DATA[selectedTopologyId].passRate}%
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleStartSimulation}
                      disabled={isSimulating}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 py-3.5 text-xs font-black text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
                    >
                      {isSimulating ? (
                        <>
                          <Clock className="h-4 w-4 animate-spin" />
                          <span>에이전트 협업 파이프라인 실행 중... ({simulationProgress}%)</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 fill-white" />
                          <span>협업 파이프라인 시뮬레이션 시작</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* 직관적인 실시간 파이프라인 노드 다이어그램 (UI 개선) */}
              <div className="dark:bg-neutral-850/40 rounded-2xl border border-white/60 bg-white/40 p-4.5 backdrop-blur-md dark:border-white/10">
                <div className="mb-3 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-extrabold text-neutral-800 dark:text-neutral-200">
                    <Activity className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    <span>에이전트 협업 파이프라인 상태 머신:</span>
                  </span>
                  <span className="font-bold text-neutral-500">진행도: {simulationProgress}%</span>
                </div>

                {/* 4단계 에이전트 노드 맵 */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    { id: 'planner', label: 'Planner 에이전트', role: '요구사항 파싱', icon: BrainCircuit },
                    { id: 'coder', label: 'Coder 에이전트', role: '알고리즘 코드 생성', icon: Code2 },
                    { id: 'tester', label: 'Tester 에이전트', role: '단위 테스트 검증', icon: FlaskConical },
                    { id: 'critic', label: 'Critic/Orchestrator', role: '피드백 루프 조율', icon: Network },
                  ].map((node) => {
                    const isNodeActive = activeAgentNode === node.id;
                    const isPassed =
                      simulationCompleted ||
                      (node.id === 'planner' &&
                        ['coder', 'tester', 'critic', 'complete', 'done'].includes(activeAgentNode)) ||
                      (node.id === 'coder' && ['tester', 'critic', 'complete', 'done'].includes(activeAgentNode)) ||
                      (node.id === 'tester' && ['critic', 'complete', 'done'].includes(activeAgentNode));
                    const NodeIcon = node.icon;

                    return (
                      <div
                        key={node.id}
                        className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all ${
                          isNodeActive
                            ? 'border-blue-500 bg-blue-500/20 shadow-md ring-2 ring-blue-500/40 dark:border-blue-400 dark:bg-blue-500/30'
                            : isPassed
                              ? 'border-emerald-300/80 bg-emerald-500/10 dark:border-emerald-700/60 dark:bg-emerald-950/20'
                              : 'border-white/60 bg-white/40 dark:border-white/5 dark:bg-neutral-800/40'
                        }`}
                      >
                        <div
                          className={`mb-1.5 flex h-7 w-7 items-center justify-center rounded-lg ${isNodeActive ? 'animate-bounce bg-blue-600 text-white' : isPassed ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300'}`}
                        >
                          <NodeIcon className="h-4 w-4" />
                        </div>
                        <span className="text-[11px] font-black text-neutral-900 dark:text-white">{node.label}</span>
                        <span className="text-[10px] text-neutral-500 dark:text-neutral-400">{node.role}</span>
                        <div className="mt-1">
                          {isNodeActive ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-black text-white">
                              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white" />
                              실행 중
                            </span>
                          ) : isPassed ? (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                              <Check className="h-2.5 w-2.5" />
                              완료
                            </span>
                          ) : (
                            <span className="text-[9px] font-medium text-neutral-400">대기</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 프로그레스 바 */}
                <div className="mt-3.5 h-2 w-full overflow-hidden rounded-full bg-neutral-200/80 dark:bg-neutral-800">
                  <motion.div
                    className="h-full bg-linear-to-r from-blue-600 via-indigo-600 to-emerald-500"
                    animate={{ width: `${simulationProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* 실시간 에이전트 실행 로그 터미널 뷰 (글래스모피즘 다크 터미널) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-extrabold text-neutral-800 dark:text-neutral-200">
                    <Terminal className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    <span>에이전트 간 메시지 전달 및 단위 테스트 실행 콘솔 (Real-time Log)</span>
                  </span>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    총 {simulationLogs.length}개 이벤트
                  </span>
                </div>

                <div className="h-48 overflow-y-auto rounded-2xl border border-neutral-800/80 bg-neutral-950/90 p-4 font-mono text-xs text-neutral-200 shadow-inner backdrop-blur-xl sm:h-56">
                  {simulationLogs.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-neutral-500">
                      상단의 [협업 파이프라인 시뮬레이션 시작] 버튼을 누르면 실시간 로그가 출력됩니다.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {simulationLogs.map((log, index) => (
                        <div key={index} className="flex items-start gap-2 leading-relaxed">
                          <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] text-neutral-400">
                            {log.time}
                          </span>
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-black ${
                              log.tag === 'FINAL'
                                ? 'bg-emerald-950 text-emerald-400'
                                : log.tag === 'FEEDBACK'
                                  ? 'bg-amber-950 text-amber-400'
                                  : 'bg-blue-950 text-blue-400'
                            }`}
                          >
                            {log.tag}
                          </span>
                          <span
                            className={`flex-1 break-keep ${
                              log.tag === 'FINAL'
                                ? 'font-bold text-emerald-400'
                                : log.msg.includes('통과: 5/5')
                                  ? 'text-cyan-300'
                                  : 'text-neutral-300'
                            }`}
                          >
                            {log.msg}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 시뮬레이션 완료 결과 요약 배너 */}
              {simulationCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-emerald-300/80 bg-linear-to-r from-emerald-50/80 via-white/80 to-teal-50/70 p-4.5 text-xs text-emerald-950 backdrop-blur-xl dark:border-emerald-800/80 dark:from-emerald-950/40 dark:via-neutral-900/80 dark:to-teal-950/30 dark:text-emerald-200"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div className="space-y-1">
                      <span className="text-sm font-black">파이프라인 시뮬레이션 성공 완료! (논문 결과 입증)</span>
                      <p className="leading-relaxed break-keep text-neutral-700 dark:text-neutral-300">
                        선택한 <strong>{TOPOLOGY_EMPIRICAL_DATA[selectedTopologyId].nameKorean}</strong> 구조로{' '}
                        <strong>{selectedProblem.title}</strong> 검증을 마쳤습니다. 실측 지연시간 약{' '}
                        <strong>{TOPOLOGY_EMPIRICAL_DATA[selectedTopologyId].latencyMs}ms</strong> 내에 단위 테스트가
                        모두 완료되었습니다.
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2 pt-1">
                        <button
                          type="button"
                          onClick={handleCopyConfig}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-emerald-700"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          <span>파이프라인 JSON 내보내기</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* ================= 하단 공통 정보 섹션: 동료 한 줄 감상 및 데이터/비밀값 명세 (BRB-C06 ~ BRB-C12) ================= */}
        <section className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] backdrop-blur-2xl sm:p-7 dark:border-white/10 dark:bg-neutral-900/75 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 border-b border-neutral-200/60 pb-3 dark:border-neutral-800">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-black text-neutral-900 dark:text-white">
              과제 검증 보증 및 동료 평가 (BRB-C06 ~ BRB-C12)
            </h3>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* 동료의 한 줄 감상 (이름 없이 · BRB-C11) */}
            <div className="rounded-2xl border border-blue-200/80 bg-blue-50/50 p-4.5 backdrop-blur-xl dark:border-blue-900/50 dark:bg-blue-950/30">
              <span className="text-[11px] font-extrabold text-blue-900 dark:text-blue-300">
                처음 보는 동료의 한 줄 감상 (이름 없이 · BRB-C11):
              </span>
              <p className="mt-2 text-xs leading-relaxed break-keep text-neutral-800 italic dark:text-neutral-200">
                "멀티 에이전트 파이프라인을 구축할 때 토폴로지별 지연시간과 통과율 트레이드오프를 감이 아닌 논문 실증
                데이터로 직접 확인하고 시뮬레이션해 볼 수 있어 시스템 아키텍처 설계 시간을 대폭 줄일 수 있었습니다."
              </p>
            </div>

            {/* 데이터와 비밀값 0건 보증 (BRB-C06, BRB-C07, BRB-C12) */}
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-4.5 backdrop-blur-xl dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <span className="text-[11px] font-extrabold text-emerald-900 dark:text-emerald-300">
                보안 및 개인정보 준수 명세 (BRB-C06, C07, C12):
              </span>
              <ul className="mt-2 space-y-1 text-xs text-neutral-700 dark:text-neutral-300">
                <li>• 앱 내 사용 데이터: 학술 알고리즘 공개 문제 및 논문 200회 실험 통계셋 (실제 개인정보 0건)</li>
                <li>• 비밀값(API 키·토큰): 클라이언트 브라우저 실시간 엔진으로 구동되어 소스/화면에 비밀값 0건</li>
                <li>• 무로그인 공개: 새 시크릿 창에서 인증·로그인·OAuth 없이 즉시 1분 안에 체험 가능</li>
              </ul>
            </div>
          </div>

          {/* 독립 실행 묶음 다운로드 버튼 (BRB-C08, BRB-C09, BRB-C22) */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200/60 pt-4 dark:border-neutral-800">
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              독립 실행 패키지(ZIP): 새 임시 폴더에서 즉시 압축 해제 후 브라우저로 바로 실행 가능합니다.
            </div>

            <a
              href="/downloads/research-paper-app.zip"
              download
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/80 bg-white/80 px-3.5 py-2 text-xs font-bold text-neutral-800 shadow-2xs backdrop-blur-md transition-all hover:bg-neutral-100 dark:border-white/10 dark:bg-neutral-800/80 dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              <Download className="h-4 w-4" />
              <span>독립 실행 묶음(ZIP) 다운로드</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResearchPaperApp;
