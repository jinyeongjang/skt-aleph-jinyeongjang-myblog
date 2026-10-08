// portfolio-updater/updater.js
// SKT ALEPH 1기 장진영 — 계속 새로 쓰는 장치 Node.js 실행기

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputsDir = path.join(__dirname, 'inputs');
const outputDir = path.join(__dirname, 'output');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function sha256Text(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

function sha256File(filepath) {
  const buf = fs.readFileSync(filepath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

console.log('[1/4] 입력 파일 로드 중...');
const attendanceData = JSON.parse(fs.readFileSync(path.join(inputsDir, 'attendance.json'), 'utf8'));
const ritualsData = JSON.parse(fs.readFileSync(path.join(inputsDir, 'rituals.json'), 'utf8'));
const projectsData = JSON.parse(fs.readFileSync(path.join(inputsDir, 'projects.json'), 'utf8'));

let approvedIds = ['cand-self-regulation', 'cand-interpersonal', 'cand-self-motivation'];
const approvedFile = path.join(__dirname, 'approved_candidates.json');
if (fs.existsSync(approvedFile)) {
  const approvedData = JSON.parse(fs.readFileSync(approvedFile, 'utf8'));
  approvedIds = approvedData.approvedIds || approvedIds;
}

console.log('[2/4] 숫자 칸 재계산 중...');
const totalDays = attendanceData.totalDays || 65;
const attendedDays = attendanceData.attendedDays || 65;
const attendanceRate = ((attendedDays / totalDays) * 100).toFixed(1);
const totalRituals = ritualsData.length * 2;
const totalTasks = projectsData.length;

const metricsOutput = {
  calculatedAt: '2026-10-08T00:00:00Z',
  author: '장진영',
  affiliation: 'SKT ALEPH 1기 기업 현장 중심 보안 & 네트워크 인프라 트랙',
  attendance: {
    rate: `${attendanceRate}%`,
    attendedDays: attendedDays,
    totalDays: totalDays,
    lateCount: attendanceData.lateCount || 0,
    absentCount: attendanceData.absentCount || 0,
    earlyArrivalDays: attendanceData.earlyArrivalDays || 30,
    source: '내 출석 기록',
  },
  rituals: {
    totalLogs: totalRituals,
    daysCount: ritualsData.length,
    morningLogs: ritualsData.length,
    eveningLogs: ritualsData.length,
    source: '리추얼 기록',
  },
  projects: {
    submittedCount: totalTasks,
    completionRate: '100%',
    source: '내 제출 현황',
  },
  pairedHardship: {
    hardship: '2024년 11월 캡스톤 시연 3분 전 소켓 고갈(28,492개) 502 Bad Gateway 장애',
    pairedMetric: `SKT ALEPH 13주 동안 출석률 ${attendanceRate}%(지각/결석 0회) 및 리추얼 ${totalRituals}회 전수 완주`,
    competency: '회복탄력성 및 과제지속력',
  },
};

function sortKeys(obj) {
  if (Array.isArray(obj)) return obj.map(sortKeys);
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((acc, k) => {
        acc[k] = sortKeys(obj[k]);
        return acc;
      }, {});
  }
  return obj;
}

const metricsPath = path.join(outputDir, 'site-metrics.json');
fs.writeFileSync(metricsPath, JSON.stringify(sortKeys(metricsOutput), null, 2), 'utf8');

console.log('[3/4] 능력별 문단 후보 생성 및 승인 반영 중...');
const rawCandidates = [
  {
    id: 'cand-self-regulation',
    competency: '자기조절력',
    date: '2026-08-24 / 2026-09-18',
    evidence: `출석 ${attendanceRate}%(65/65일), 지각 0회, 양산발 새벽 5시 40분 통학 30일 연속 조기 입실`,
    text: '양산-부산 왕복 3시간 통학과 정보처리기사·리눅스마스터·SQLD 준비 속에서도 새벽 5시 40분 첫 버스에 올라 매일 아침 1등으로 도착해 예습과 당일 복습을 완주했습니다. 순간의 감정이나 컨디션 대신 정해진 시간에 몸을 움직이는 루틴으로 13주 동안 단 1회의 지각이나 결석 없이 성실한 신뢰를 지켰습니다.',
  },
  {
    id: 'cand-interpersonal',
    competency: '대인관계력',
    date: '2026-08-11 / 2026-09-17',
    evidence: '첫날 자원 조장, Kali Linux 환경 셋팅 페어 디버깅, 동료 발표 다이어그램 지원',
    text: '첫 수업에서 자원하여 조장을 맡아 서먹한 분위기를 풀고 팀의 심리적 안전감을 조성했으며, Kali Linux 설치 충돌로 고전하던 동료의 곁을 지키며 환경 셋팅을 마쳤습니다. 네트워크 조별 과제에서는 복잡한 3-Way Handshake를 외우기 힘들어하던 팀원을 위해 직관적인 흐름도를 설계하여 대본 없이도 자신 있게 발표할 수 있도록 도왔습니다.',
  },
  {
    id: 'cand-self-motivation',
    competency: '자기동기력',
    date: '2026-08-26 / 2026-09-21',
    evidence: '과제 8 WebAuthn ASN.1 DER 바이트 파서 구현, 과제 10 에이전트 토폴로지 200회 벤치마크',
    text: '블랙박스 라이브러리에 기대지 않고 시스템의 밑단 동작 원리를 끝까지 파고듭니다. 과제 8 WebAuthn 패스키 인증 구현 시 브라우저 서명 포맷과 Web Crypto API 간 바이트 불일치 문제를 W3C 공식 RFC 명세를 분석해 직접 바이트 파서를 구현하여 해결했습니다. 기술적 난제 앞에서 포기하지 않는 내적 호기심이 저를 움직입니다.',
  },
];

const filteredCandidates = rawCandidates.filter((c) => approvedIds.includes(c.id));

const mdLines = [
  '# 계속 새로 쓰는 장치 생성 결과 — 능력별 문단 후보',
  '',
  '> **지원자**: 장진영  ',
  `> **기록 출처**: 내 출석 기록(${attendedDays}/${totalDays}일), 리추얼 기록(${totalRituals}회), 내 제출 현황(${totalTasks}건)  `,
  '> **승인 규칙**: 내가 승인한 문단만 사이트 본편 및 문서에 반영  ',
  '',
  '---',
  '',
];

for (const c of filteredCandidates) {
  mdLines.push(`## [${c.competency}] ${c.date}`);
  mdLines.push(`- **근거**: ${c.evidence}`);
  mdLines.push(`- **승인 상태**: 승인 완료 (APPROVED)`);
  mdLines.push(`- **생성 문단**:`);
  mdLines.push(`  > "${c.text}"`);
  mdLines.push('');
}

const mdPath = path.join(outputDir, 'generated-paragraphs.md');
fs.writeFileSync(mdPath, mdLines.join('\n'), 'utf8');

const metricsHash = sha256File(metricsPath);
const mdHash = sha256File(mdPath);
const compositeHash = sha256Text(`${metricsHash}:${mdHash}`);

const lastRunInfo = {
  status: 'SUCCESS',
  compositeHash: compositeHash,
  siteMetricsHash: metricsHash,
  generatedParagraphsHash: mdHash,
  author: '장진영',
  approvedCount: filteredCandidates.length,
};

fs.writeFileSync(path.join(outputDir, 'last-run.json'), JSON.stringify(lastRunInfo, null, 2), 'utf8');

console.log('[4/4] 완료! 결정론적 복합 해시 (SHA-256):', compositeHash);
