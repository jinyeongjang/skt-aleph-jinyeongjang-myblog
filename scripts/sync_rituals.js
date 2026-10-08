// scripts/sync_rituals.js
// SKT ALEPH 1기 장진영 — ritual-history.json (40일치) 동기화 파서

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const rawPath = path.join(rootDir, 'ritual-history.json');
const rawData = JSON.parse(fs.readFileSync(rawPath, 'utf8'));

const prPath = path.join(rootDir, '11_skt_aleph-jinyeong-myritual-novel', 'src', 'data', 'parsedRituals.json');
let existingParsed = [];
if (fs.existsSync(prPath)) {
  existingParsed = JSON.parse(fs.readFileSync(prPath, 'utf8'));
}

const dayOfWeekMap = ['일', '월', '화', '수', '목', '금', '토'];

function parseItem(prefix, arr) {
  if (!arr) return '';
  const item = arr.find((s) => s.startsWith(prefix));
  return item ? item.slice(prefix.length).trim() : '';
}

const parsedAll = rawData.days.map((d) => {
  const existing = existingParsed.find((p) => p.date === d.date);

  const dateObj = new Date(d.date + 'T00:00:00+09:00');
  const dow = dayOfWeekMap[dateObj.getDay()];

  const comfortable = parseItem('편안했던 장면:', d.open) || parseItem('덜 힘들었던 장면:', d.open);
  const myStr = parseItem('내 강점:', d.open);
  const strEp = parseItem('강점이 드러난 일화:', d.open);
  const resLearn = parseItem('그 결과·알게 된 점:', d.open);

  const p1Adv = parseItem('동료 1가 말해 준 내 장점:', d.open);
  const p2Adv = parseItem('동료 2가 말해 준 내 장점:', d.open);
  let peerFb = '';
  if (p1Adv && p2Adv) peerFb = '[동료 1]: ' + p1Adv + ' / [동료 2]: ' + p2Adv;
  else if (p1Adv) peerFb = '[동료 1]: ' + p1Adv;
  else if (p2Adv) peerFb = '[동료 2]: ' + p2Adv;

  const val = parseItem('오늘 지킬 강점·가치:', d.open);
  const act = parseItem('오늘의 첫 행동:', d.open);

  const effort = parseItem('강점을 위해 노력하고 생각한 것:', d.close);
  const note = parseItem('나에게 남기는 말:', d.close);
  const refl = parseItem('내가 나눈 감사:', d.close);

  const p1Thx = parseItem('동료 1가 나눈 감사:', d.close);
  const p2Thx = parseItem('동료 2가 나눈 감사:', d.close);
  let gratitude = '';
  if (p1Thx && p2Thx) gratitude = '[동료 1]: ' + p1Thx + ' / [동료 2]: ' + p2Thx;
  else if (p1Thx) gratitude = '[동료 1]: ' + p1Thx;
  else if (p2Thx) gratitude = '[동료 2]: ' + p2Thx;

  const overcome = parseItem('감사일기:', d.close);

  let highlightExcerpt = existing ? existing.highlightExcerpt : '';
  let highlightCategory = existing ? existing.highlightCategory : '원리탐구';

  if (!highlightExcerpt) {
    if (d.date === '2026-09-23') {
      highlightExcerpt = '추석 연휴 전날에도 흐트러짐 없이 컨디션을 유지하며 학습 내용을 복기하고 기록한 날.';
      highlightCategory = '루틴회복';
    } else if (d.date === '2026-09-25') {
      highlightExcerpt = '추석 연휴 기간 가족과의 시간을 알차게 보내며 재충전과 섬김을 실천한 일상.';
      highlightCategory = '배움나눔';
    } else if (d.date === '2026-09-28') {
      highlightExcerpt = '기나긴 연휴 후에도 정해진 시간에 복습을 시작하며 커리어 성장을 향해 집중력을 회복한 순간.';
      highlightCategory = '루틴회복';
    } else if (d.date === '2026-09-29') {
      highlightExcerpt = '팀원들과 활발히 소통하며 복잡한 과제 요구사항을 해결하고 수업 내용을 내 것으로 만든 협업.';
      highlightCategory = '조력리더십';
    } else if (d.date === '2026-09-30') {
      highlightExcerpt = '새벽까지 무리하지 않고 정돈된 루틴으로 발표 준비를 완결하여 좋은 성과를 이끌어낸 날.';
      highlightCategory = '조력리더십';
    } else if (d.date === '2026-10-01') {
      highlightExcerpt = 'SKT 실무진 라이브세션에서 적극적으로 질문하고 진로 커리어의 구체적 방향을 설정한 성취.';
      highlightCategory = '원리탐구';
    } else if (d.date === '2026-10-02') {
      highlightExcerpt = '난도 높은 실습 내용 앞에서도 포기하지 않고 질문을 통해 원리를 이해하려 몰입한 태도.';
      highlightCategory = '원리탐구';
    } else if (d.date === '2026-10-06') {
      highlightExcerpt = '연휴 직후 방어전 실습에서 동료들과 함께 빠르게 집중하여 과제를 돌파한 협력.';
      highlightCategory = '기술문제해결';
    } else if (d.date === '2026-10-07') {
      highlightExcerpt = '과제 수행과 방어전 앞에서 매 순간 최선을 다하며 스스로의 성장을 입증한 하루.';
      highlightCategory = '루틴회복';
    } else if (d.date === '2026-10-08') {
      highlightExcerpt = '13주 전 과정을 돌아보며 마지막 과제 BR-A 완주를 향해 최상의 컨디션으로 몰입하는 결실.';
      highlightCategory = '원리탐구';
    }
  }

  return {
    id: 'ritual-' + d.date,
    date: d.date,
    dayOfWeek: dow,
    morning: {
      comfortableScene: comfortable,
      myStrength: myStr,
      strengthEpisode: strEp,
      resultOrLearned: resLearn,
      peerFeedback: peerFb,
      todayValue: val,
      smallAction: act,
    },
    evening: {
      strengthEffort: effort,
      noteToSelf: note,
      reflection: refl,
      gratitude: gratitude,
      overcomeMoment: overcome,
    },
    highlightExcerpt,
    highlightCategory,
  };
});

// 1. Save to portfolio-updater/inputs/rituals.json
const updaterRitualsTarget = path.join(rootDir, 'portfolio-updater', 'inputs', 'rituals.json');
fs.writeFileSync(updaterRitualsTarget, JSON.stringify(parsedAll, null, 2), 'utf8');
console.log('Saved 40 rituals to:', updaterRitualsTarget);

// 2. Also save to 11_skt_aleph-jinyeong-myritual-novel/src/data/parsedRituals.json if present
if (fs.existsSync(path.dirname(prPath))) {
  fs.writeFileSync(prPath, JSON.stringify(parsedAll, null, 2), 'utf8');
  console.log('Saved 40 rituals to:', prPath);
}

console.log('Sync complete! Total days:', parsedAll.length);
