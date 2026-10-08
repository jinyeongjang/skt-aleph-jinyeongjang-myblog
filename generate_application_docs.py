# generate_application_docs.py
# SKT ALEPH 1기 장진영 — 이력서, 자기소개서, 경력기술서(12개 과제 STAR) 문서 생성기 (DOCX, MD, TXT)

import os
import docx
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "public", "downloads")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1. 문서 데이터 정의
NAME = "장진영 (Jinyeong Jang)"
EMAIL = "jinyeongjang@users.noreply.github.com"
GITHUB = "https://github.com/jinyeongjang"
PORTFOLIO = "https://skt-aleph-jinyeongjang-myblog.vercel.app"
COURSE = "SKT ALEPH 1기 기업 현장 중심 보안 & 네트워크 인프라 트랙 (2026.07 ~ 2026.10)"

ONE_LINER = "2024년 11월 마감 3분 전 서버 다운의 절망을 딛고, 원리를 파고드는 집요함과 따뜻한 책임감으로 팀의 신뢰를 짓는 사람"

COVER_LETTER_TEXT = """2024년 11월 늦가을 새벽, 마감 시연 3분을 남겨두고 502 Bad Gateway 에러와 함께 서버가 완전히 멈췄을 때 나는 얕은 기본기가 팀을 곤경에 빠뜨렸다는 참담한 무력감에 짓눌렸습니다.

부트캠프 최종 캡스톤 프로젝트 시연을 코앞에 둔 실습실 모니터에는 붉은 에러 로그가 쉴 새 없이 쏟아져 내렸고, 인터넷 블로그에서 주워 모은 정체불명의 Docker와 Nginx 설정은 닫히지 않은 28,492개의 소켓을 남긴 채 시스템을 침묵시켰습니다. 팀원들의 수개월 치 노력이 내 미숙한 손끝에서 한순간에 수포로 돌아간 그날 밤, 나는 차가운 실습실 바닥에서 주먹을 쥐며 다시는 원리를 모르는 코드를 쓰지 않겠다고 결심했습니다.

실패는 뼈아팠지만 도망치지 않았습니다. 시립 도서관에서 네트워크 전공 서적을 펼치고 시스템 로그와 와이어샤크 패킷 덤프를 한 줄씩 대조하며 꼬박 밤을 새웠습니다. TCP FIN 패킷 이후 2MSL 동안 머무는 TIME_WAIT 소켓의 생명주기와 에페머럴 포트 고갈의 원리를 파헤친 끝에 마침내 장애를 완전히 규명해 냈습니다. 그 새벽, 나는 내 개발 인생을 지탱할 두 가지 철칙을 세웠습니다. "원리를 모르는 블랙박스 코드는 단 한 줄도 쓰지 않는다", 그리고 "배포 전 3단계 사전 점검 루틴을 반드시 거친다". 이 뼈아픈 고난은 훗날 외적 보상에 기대지 않고 시스템의 본질을 끝까지 파고드는 단단한 [자기동기력]의 씨앗이 되었습니다.

이 다짐은 SKT ALEPH 1기 13주 과정에서 세 가지 핵심 역량으로 만개했습니다. 첫째는 일상의 기복을 통제하는 [자기조절력]입니다. 2026년 8월 24일, 경남 양산에서 부산 교육장까지 왕복 3시간이 넘는 장거리 통학과 자격증 시험이 겹치는 피로 속에서도 나는 새벽 5시 40분 첫 버스에 올랐습니다. 감정이나 컨디션 대신 정해진 시간에 몸을 움직이는 루틴을 지키며, 13주 동안 단 한 번의 지각이나 결석 없이 매일 1등으로 도착해 예습과 당일 복습을 완주했습니다.

둘째는 동료와 보폭을 맞추는 [대인관계력]입니다. 2026년 8월 11일 첫 수업에서 자원하여 조장을 맡아 서먹한 분위기를 풀고 심리적 안전감을 다졌으며, Kali Linux 설치 충돌로 고전하던 동료의 곁을 지키며 환경 셋팅을 마쳤습니다. 2026년 9월 17일 네트워크 조별 발표에서는 복잡한 3-Way Handshake를 부담스러워하던 팀원을 위해 직관적인 흐름도를 설계해 "대본 없이도 자신 있게 발표할 수 있었다"는 감사를 받았습니다. 과거 2년간 디지털 배움터에서 어르신과 아이들의 눈높이에 맞추어 기술을 나누던 온기는 팀의 성장을 돕는 조력 리더십으로 이어졌습니다.

셋째는 바닥까지 규명하는 집요한 [자기동기력]입니다. 2026년 8월 26일 복잡한 코드 에러 앞에서 포기하지 않고 밑단 로그를 추적해 해결했고, 과제 8 WebAuthn 패스키 인증 구현 시 브라우저 서명 포맷과 Web Crypto API 간 바이트 불일치 문제를 W3C 공식 RFC 명세를 분석해 직접 바이트 파서를 구현하여 해결했습니다.

어떤 복잡한 장애 앞에서도 바닥부터 원리를 파고드는 집요함과 사람을 향한 따뜻한 책임감으로, 팀이 믿고 맡길 수 있는 가장 견고한 보안·인프라 환경을 완성하겠습니다."""

CAREER_TASKS = [
    {
        "num": "과제 1",
        "title": "무로그인 반응형 포트폴리오 웹",
        "period": "2026.08",
        "comp": "대인관계력",
        "star": "[대인관계력] (S) 처음 온 평가자가 3분 안에 프로필을 읽어야 하는 상황에서 (A) 대상·목적 1문장 및 공개/비공개 3대 범위를 투명하게 분리 설계하여 (R) 시크릿 창 무로그인 즉시 열람 및 WCAG AA 4.5:1 웹 표준을 100% 충족함."
    },
    {
        "num": "과제 2",
        "title": "CYBER DODGER 30s 레이싱 아케이드",
        "period": "2026.08",
        "comp": "자기동기력",
        "star": "[자기동기력] (S) 무거운 3D 라이브러리 없이 30초 내 몰입하는 고성능 웹 인터랙션 개발 과제에서 (A) 순수 CSS 3D와 Canvas 하이브리드 물리 엔진을 자체 설계하여 (R) 60FPS 프레임 유지 및 로컬스토리지 자가 치유(Self-Healing) 복구율 100%를 달성함."
    },
    {
        "num": "과제 3",
        "title": "ToonsCard 다중 화면비 스튜디오",
        "period": "2026.09",
        "comp": "자기조절력",
        "star": "[자기조절력] (S) 초장문 텍스트 입력 시 캔버스 바깥으로 글자가 삐져나가는 렌더링 결함 발생 시 (A) grapheme 단위 지능형 break-word 줄바꿈 알고리즘을 설계하고 극단 입력 12건을 전수 검증하여 (R) 다중 화면비(1:1, 4:5, 9:16)에서 미리보기와 다운로드 이미지 좌표를 100% 일치시킴."
    },
    {
        "num": "과제 4",
        "title": "오늘의 진짜 정보판 실시간 대시보드",
        "period": "2026.09",
        "comp": "자기조절력",
        "star": "[자기조절력] (S) 외부 기온 API 단절 및 지연 시 사용자 화면 백화 위험 앞에서 (A) Keyless Open-Meteo API 연동과 5종 장애 시뮬레이터 및 직전 정상값(Stale) 불변 보존 엔진을 구축하여 (R) 네트워크 단절 시에도 데이터 유실 0건 및 KST 원자적 갱신을 보장함."
    },
    {
        "num": "과제 5",
        "title": "LLM 인수인계 벤치마크 시스템",
        "period": "2026.09",
        "comp": "자기동기력",
        "star": "[자기동기력] (S) 대화 전문 없이 서로 다른 모델(Claude ➔ Gemini) 간 작업 연속성 단절 문제에서 (A) 7칸 인수인계 계약 문서 규격을 정립하고 10대 사전 고정 검사 자동화 스위트를 구축하여 (R) 컨텍스트 0건 인수인계 후 10대 검사 10/10 PASS를 달성함."
    },
    {
        "num": "과제 6·7",
        "title": "플랜두씨 다이어리 1 & 2",
        "period": "2026.09",
        "comp": "자기조절력",
        "star": "[자기조절력] (S) 멀티테넌트 사용자 간 데이터 침범(IDOR) 위험 및 실패 후 복구 난제에서 (A) PBKDF2 10만 회 솔트 해싱, Bearer JWT, RLS 정책 구축 및 5일 연속 관찰 루틴을 실천하여 (R) 평문 비밀번호 노출 0건, 타인 데이터 침범 HTTP 403 차단, 20대 자동화 검사 전수 PASS를 달성함."
    },
    {
        "num": "과제 8",
        "title": "WebAuthn 무암호화 패스키 금고",
        "period": "2026.09",
        "comp": "자기동기력",
        "star": "[자기동기력] (S) 비밀번호 없이 생체 인증 비공개 금고 구축 시 ASN.1 DER 서명 바이트 불일치 난관에서 (A) W3C RFC 공식 명세를 분석하여 순수 JavaScript 바이트 파서를 직접 구현하고 (R) 비밀번호 입력 필드 0개, 0.04초 Windows Hello 생체 서명 검증 및 4대 거절 보안 랩을 완결함."
    },
    {
        "num": "과제 9",
        "title": "리추얼 에이전트 서사 및 강점 지도",
        "period": "2026.09",
        "comp": "대인관계력",
        "star": "[대인관계력] (S) 30일간의 리추얼 일지에서 나만의 실제 모습을 왜곡 없이 객관적으로 추출해야 하는 상황에서 (A) 에이전트 5대 규칙 수립, 과장된 AI 제안 직접 삭제, 동료 2인 피드백 검증을 수행하여 (R) 3대 강점 지도 확립, 동료 검증 일치도 100%, 익명화 안전을 보장함."
    },
    {
        "num": "과제 10",
        "title": "다중 에이전트 토폴로지 연구 논문",
        "period": "2026.10",
        "comp": "자기동기력",
        "star": "[자기동기력] (S) LLM 다중 에이전트 협업 시 통신 오버헤드와 단위 테스트 통과율 간의 과학적 검증 필요에서 (A) 4개 토폴로지 200회 실험 데이터셋 구축, pandas 통계 분석, 학술 논문 및 재현 ZIP을 제작하여 (R) 중앙 조율형의 통과율 +20%p 및 오버헤드 40% 절감을 실측 입증함."
    },
    {
        "num": "과제 11",
        "title": "성장 서사 소설 (열쇠 없는 문을 지키는 법)",
        "period": "2026.10",
        "comp": "자기조절력",
        "star": "[자기조절력] (S) 셧다운 고난부터 패스키 금고 완결까지 3만 자 11개 장 인과 소설 완결 도전에서 (A) 장별 갈등-해결 인과표를 설계하고 사실과 은유의 경계를 정제하여 (R) 30,508자 완결 소설을 탈고하고 감정 대신 루틴으로 일어서는 회복탄력성 서사를 확립함."
    },
    {
        "num": "과제 12",
        "title": "자기소개 사이트 & 계속 새로 쓰는 장치",
        "period": "2026.10",
        "comp": "대인관계력",
        "star": "[대인관계력] (S) 3분 안에 읽고 신뢰할 수 있는 자기소개 및 영구 갱신 체계 구축 요구에서 (A) 소설을 사실로 환원한 1,500자 본편 작성, 13주 기록 숫자 매핑, 결정론적 갱신 장치 및 지원 문서 3종을 완성하여 (R) 동일 입력 동일 결과 100% 재현, 지원 문서 완비, 무로그인 공개 웹을 완결함."
    }
]

# 2. Markdown 문서 생성
def generate_md():
    md_path = os.path.join(OUTPUT_DIR, "resume-coverletter-portfolio.md")
    content = f"""# 지원 문서 모음집 — 이력서 · 자기소개서 · 경력기술서

> **지원자 성명**: {NAME}  
> **공개 연락처**: {EMAIL}  
> **GitHub**: {GITHUB}  
> **포트폴리오 라이브**: {PORTFOLIO}  
> **한 줄 소개**: {ONE_LINER}  

---

## 1. 이력서 (Resume)

### [기본 정보]
- **성명**: {NAME}
- **연락처**: {EMAIL}
- **교육 트랙**: {COURSE}

### [학력 사항]
- **○○대학교** | 컴퓨터공학과 학사 (2020.03 ~ 2024.02, 졸업)
  - 평점: 3.97 / 4.5

### [자격증]
- **정보기술자격 ITQ OA Master** | 한국생산성본부 (2021.03)
- **ERP정보관리사 Master** | 한국생산성본부 (2018.10)
- **컴퓨터활용능력 2급** | 대한상공회의소 (2019.06)
- **워드프로세서 1급** | 대한상공회의소 (2012.08)

### [수상 및 표창]
- **부산광역시 사상구청장 표창장** (2022.12) | 지역 디지털 역량 향상 및 교육 공헌
- **동원종합사회복지관 우수강사 표창** (2023.12) | 맞춤형 IT·코딩 교육 만족도 최우수

### [실무 교육 및 프로젝트 활동]
- **SKT ALEPH 1기 과정** (2026.07 ~ 2026.10) | 13주간 12개 실전 프로젝트 완주, 출석률 100%(65/65일), 40일치 리추얼 80회 전수 완주 달성

---

## 2. 자기소개서 (Cover Letter)

### 제목: 열쇠 없는 문을 지키는 법 — 비밀번호 너머의 신뢰를 짓다

{COVER_LETTER_TEXT}

---

## 3. 경력기술서 (Career Description — STAR 모델 과제별 1줄 기술)

| 과제 구분 | 과제명 | 해당 핵심 능력 | STAR 실전 경험 및 성과 요약 (상황·행동·결과) |
| :--- | :--- | :--- | :--- |
"""
    for t in CAREER_TASKS:
        content += f"| **{t['num']}** | {t['title']} | **{t['comp']}** | {t['star']} |\n"

    with open(md_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Generated:", md_path)

# 3. Text 문서 생성
def generate_txt():
    txt_path = os.path.join(OUTPUT_DIR, "resume-coverletter-portfolio.txt")
    lines = [
        "=" * 80,
        f"지원 문서 모음집 — 이력서 · 자기소개서 · 경력기술서",
        f"지원자 성명: {NAME}",
        f"공개 연락처: {EMAIL}",
        f"포트폴리오: {PORTFOLIO}",
        f"한 줄 소개: {ONE_LINER}",
        "=" * 80,
        "",
        "[1. 이력서 (Resume)]",
        f"- 성명: {NAME}",
        f"- 연락처: {EMAIL}",
        f"- 교육 과정: {COURSE}",
        "- 학력: ○○대학교 컴퓨터공학과 학사 (2020.03 ~ 2024.02, 평점 3.97 / 4.5)",
        "- 자격증: 정보기술자격 ITQ OA Master(2021.03), ERP정보관리사 Master(2018.10), 컴퓨터활용능력 2급(2019.06), 워드프로세서 1급(2012.08)",
        "- 표창: 부산광역시 사상구청장 표창장(2022.12), 동원종합사회복지관 우수강사 표창(2023.12)",
        "",
        "=" * 80,
        "[2. 자기소개서 (Cover Letter)]",
        "제목: 열쇠 없는 문을 지키는 법 — 비밀번호 너머의 신뢰를 짓다",
        "",
        COVER_LETTER_TEXT,
        "",
        "=" * 80,
        "[3. 경력기술서 (Career Description — 과제당 1줄 STAR 기술)]",
        ""
    ]
    for t in CAREER_TASKS:
        lines.append(f"[{t['num']}] {t['title']} ({t['period']})")
        lines.append(f"  {t['star']}")
        lines.append("")

    with open(txt_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print("Generated:", txt_path)

# 4. DOCX 문서 생성
def generate_docx():
    doc = docx.Document()
    
    # Page Margins
    sections = doc.sections
    for s in sections:
        s.top_margin = Inches(1)
        s.bottom_margin = Inches(1)
        s.left_margin = Inches(1)
        s.right_margin = Inches(1)

    # Style helper
    def add_heading_with_color(text, level, color_rgb=(15, 23, 42)):
        h = doc.add_heading(text, level=level)
        h.paragraph_format.space_before = Pt(14)
        h.paragraph_format.space_after = Pt(6)
        for r in h.runs:
            r.font.name = "Malgun Gothic"
            r.font.color.rgb = RGBColor(*color_rgb)
        return h

    # Title
    p_title = doc.add_paragraph()
    r_title = p_title.add_run("입사지원 문서 — 이력서 · 자기소개서 · 경력기술서")
    r_title.font.name = "Malgun Gothic"
    r_title.font.size = Pt(22)
    r_title.font.bold = True
    r_title.font.color.rgb = RGBColor(15, 23, 42)
    p_title.paragraph_format.space_after = Pt(4)

    # Meta
    p_meta = doc.add_paragraph()
    r_meta = p_meta.add_run(f"지원자: {NAME} | 연락처: {EMAIL}\n포트폴리오: {PORTFOLIO} | GitHub: {GITHUB}\n{COURSE}")
    r_meta.font.name = "Malgun Gothic"
    r_meta.font.size = Pt(10)
    r_meta.font.color.rgb = RGBColor(100, 116, 139)
    p_meta.paragraph_format.space_after = Pt(18)

    # 1. Resume Heading
    add_heading_with_color("1. 이력서 (Resume)", 1, (30, 58, 138))
    
    p = doc.add_paragraph()
    p.add_run(f"■ 한 줄 소개: {ONE_LINER}\n").bold = True
    p.add_run("■ 학력: ○○대학교 컴퓨터공학과 학사 (2020.03 ~ 2024.02, 평점 3.97/4.5 졸업)\n")
    p.add_run("■ 자격증:\n  - 정보기술자격 ITQ OA Master (2021.03, 한국생산성본부)\n  - ERP정보관리사 Master (2018.10, 한국생산성본부)\n  - 컴퓨터활용능력 2급 (2019.06, 대한상공회의소)\n  - 워드프로세서 1급 (2012.08, 대한상공회의소)\n")
    p.add_run("■ 수상/표창:\n  - 부산광역시 사상구청장 표창장 (2022.12, 지역 디지털 역량 향상 및 교육 공헌)\n  - 동원종합사회복지관 우수강사 표창 (2023.12, 맞춤형 IT·코딩 교육 만족도 최우수)\n")
    p.add_run(f"■ 실무 교육: {COURSE}\n  - 13주간 65일 전수 출석(100%, 지각/결석 0회), 40일치 리추얼 80회 전수 완주 및 12개 프로젝트 완주\n")

    # 2. Cover Letter Heading
    doc.add_page_break()
    add_heading_with_color("2. 자기소개서 (Cover Letter)", 1, (30, 58, 138))
    
    p_cl_title = doc.add_paragraph()
    r_cl_title = p_cl_title.add_run("열쇠 없는 문을 지키는 법 — 비밀번호 너머의 신뢰를 짓다")
    r_cl_title.font.name = "Malgun Gothic"
    r_cl_title.font.size = Pt(14)
    r_cl_title.font.bold = True
    r_cl_title.font.color.rgb = RGBColor(30, 41, 59)
    p_cl_title.paragraph_format.space_after = Pt(12)

    for para in COVER_LETTER_TEXT.split("\n\n"):
        p_body = doc.add_paragraph()
        r_body = p_body.add_run(para)
        r_body.font.name = "Malgun Gothic"
        r_body.font.size = Pt(10.5)
        p_body.paragraph_format.line_spacing = 1.35
        p_body.paragraph_format.space_after = Pt(8)

    # 3. Career Description Heading
    doc.add_page_break()
    add_heading_with_color("3. 경력기술서 (Career Description — STAR 모델 1줄 기술)", 1, (30, 58, 138))
    
    p_desc = doc.add_paragraph()
    r_desc = p_desc.add_run("SKT ALEPH 1기 13주 동안 수행한 12개 실무 과제에 대해 과제별 해당 핵심 능력(자기조절력·대인관계력·자기동기력)과 STAR(상황·행동·결과)를 1줄로 명시한 기술서입니다.")
    r_desc.font.name = "Malgun Gothic"
    r_desc.font.size = Pt(10)
    p_desc.paragraph_format.space_after = Pt(12)

    # Table
    table = doc.add_table(rows=1, cols=4)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False

    hdr_cells = table.rows[0].cells
    hdr_titles = ["과제", "과제명", "핵심 능력", "STAR 실전 경험 및 성과 요약 (상황·행동·결과)"]
    col_widths = [Inches(0.9), Inches(1.8), Inches(1.1), Inches(3.7)]

    for idx, name in enumerate(hdr_titles):
        hdr_cells[idx].text = name
        hdr_cells[idx].paragraphs[0].runs[0].font.bold = True
        hdr_cells[idx].paragraphs[0].runs[0].font.size = Pt(9.5)
        hdr_cells[idx].width = col_widths[idx]
        shading = parse_xml(r'<w:shd {} w:fill="F1F5F9"/>'.format(nsdecls('w')))
        hdr_cells[idx]._tc.get_or_add_tcPr().append(shading)

    for t in CAREER_TASKS:
        row = table.add_row()
        cells = row.cells
        cells[0].text = t["num"]
        cells[1].text = f"{t['title']}\n({t['period']})"
        cells[2].text = t["comp"]
        cells[3].text = t["star"]

        for i, c in enumerate(cells):
            c.width = col_widths[i]
            for p in c.paragraphs:
                p.paragraph_format.space_after = Pt(4)
                p.paragraph_format.space_before = Pt(4)
                for r in p.runs:
                    r.font.name = "Malgun Gothic"
                    r.font.size = Pt(9)

    docx_path = os.path.join(OUTPUT_DIR, "resume-coverletter-portfolio.docx")
    doc.save(docx_path)
    print("Generated:", docx_path)

if __name__ == "__main__":
    generate_md()
    generate_txt()
    generate_docx()
