#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SKT ALEPH 1기 장진영 — 과제 12 재현성 검증 테스트 스크립트
새 임시 폴더에서 updater.py를 두 번 실행하여 동일한 입력에 대해 100% 동일한 결과가 나오는지 검증합니다. (BRA-C09)
"""

import os
import shutil
import tempfile
import subprocess
import hashlib

def main():
    src_dir = os.path.dirname(os.path.abspath(__file__))
    
    with tempfile.TemporaryDirectory() as temp_dir:
        target_dir = os.path.join(temp_dir, "test_updater")
        print(f"[*] 새 임시 폴더 생성 및 소스 복사: {target_dir}")
        shutil.copytree(src_dir, target_dir)
        
        script_path = os.path.join(target_dir, "updater.py")
        
        # 1회차 실행
        print("[*] 1회차 실행 시작...")
        subprocess.run(["python", script_path], check=True, cwd=target_dir)
        
        out_metrics = os.path.join(target_dir, "output", "site-metrics.json")
        out_md = os.path.join(target_dir, "output", "generated-paragraphs.md")
        
        with open(out_metrics, "rb") as f:
            hash1_metrics = hashlib.sha256(f.read()).hexdigest()
        with open(out_md, "rb") as f:
            hash1_md = hashlib.sha256(f.read()).hexdigest()
            
        print(f"    1회차 metrics 해시: {hash1_metrics}")
        print(f"    1회차 md 해시:      {hash1_md}")
        
        # 2회차 실행
        print("[*] 2회차 실행 시작 (동일 폴더 재실행)...")
        subprocess.run(["python", script_path], check=True, cwd=target_dir)
        
        with open(out_metrics, "rb") as f:
            hash2_metrics = hashlib.sha256(f.read()).hexdigest()
        with open(out_md, "rb") as f:
            hash2_md = hashlib.sha256(f.read()).hexdigest()
            
        print(f"    2회차 metrics 해시: {hash2_metrics}")
        print(f"    2회차 md 해시:      {hash2_md}")
        
        assert hash1_metrics == hash2_metrics, "FAIL: 1회차와 2회차 metrics 결과가 다릅니다!"
        assert hash1_md == hash2_md, "FAIL: 1회차와 2회차 md 결과가 다릅니다!"
        
        print("\n=======================================================")
        print("  [PASS] BRA-C09 완주 통과: 1회차 == 2회차 해시 100% 일치!")
        print("=======================================================")

if __name__ == "__main__":
    main()
