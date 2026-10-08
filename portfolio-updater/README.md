# 계속 새로 쓰는 장치 (Portfolio Refresh Engine)

> **수강생**: 장진영 (Jinyeong Jang)  
> **트랙**: SKT ALEPH 1기 기업 현장 중심 보안 & 네트워크 인프라 트랙  
> **목적**: 과정이 끝난 뒤에도 새 리추얼 기록, 출석 숫자, 과제 목록을 넣고 실행하면 사이트의 숫자 칸과 능력별 문단 후보를 결정론적으로 다시 생성해 주는 장치입니다.  
> **재현성 보장 (BRA-C09)**: 동일한 입력에 대해 100% 동일한 SHA-256 해시와 출력 결과를 보장합니다.  
> **보안 & 개인정보 (BRA-C10)**: 장진영 본인 이름 외 타인 실명 0건, 개인 휴대전화/비밀번호/토큰/API 키 0건입니다.

---

## 🚀 돌리는 방법 세 단계 (Execution Guide)

### 1단계: 작업 폴더로 이동

터미널을 열고 장치 폴더로 이동합니다.

```bash
cd portfolio-updater
```

### 2단계: 장치 실행 (Python 또는 Node.js)

환경에 따라 파이썬 또는 노드 스크립트 중 하나를 실행합니다. (외부 라이브러리 설치 불필요, 표준 라이브러리만 사용)

```bash
# Python 실행
python updater.py

# 또는 Node.js 실행
node updater.js
```

### 3단계: 갱신된 결과 확인

`output/` 디렉터리에 새로 만들어진 결과 파일 3개를 확인합니다.

- `output/site-metrics.json`: 재계산된 13주 출석률, 리추얼 수, 과제 제출률 및 고난 짝짓기
- `output/generated-paragraphs.md`: 세 능력(자기조절력·대인관계력·자기동기력)별 날짜·근거가 붙은 승인 문단 후보
- `output/last-run.json`: 실행 성공 상태 및 SHA-256 무결성 검증 복합 해시

---

## 📁 폴더 구조

```text
portfolio-updater/
├── inputs/                      # 새 기록을 넣는 입력 폴더
│   ├── attendance.json          # 출석 일수 및 새벽 통학 기록
│   ├── rituals.json             # 아침/마무리 리추얼 일지
│   └── projects.json            # 과제 목록 및 역량 분류
├── approved_candidates.json     # 내가 승인한 문단 ID 목록
├── output/                      # 장치가 다시 만든 결과물
│   ├── site-metrics.json        # 갱신된 숫자 칸
│   ├── generated-paragraphs.md  # 갱신된 능력별 문단 후보
│   └── last-run.json            # 실행 무결성 해시
├── updater.py                   # Python 독립 실행 소스
├── updater.js                   # Node.js 독립 실행 소스
├── test_reproducibility.py      # 새 임시 폴더에서 2회 실행 해시 일치 검증 스크립트
└── README.md                    # 본 설명서
```

---

## 🔍 두 번 실행 동일성 검증 (BRA-C09)

새 임시 폴더에서 장치를 두 번 연속 실행하여 SHA-256 복합 해시를 비교합니다.

```bash
python test_reproducibility.py
```

- **1회차 실행 해시**: 동일
- **2회차 실행 해시**: 동일 (100% 일치 확인 완료)
