# 進捗と作業キュー（毎回の作業の最後に更新する）

> 新しいトークで「次の記事を書いて」と言われたら、下の **「次の作業」** の先頭を実行する。
> 1 トークで書くのは 1〜2 ページ。書き終えたら、そのページの行を「完了」に移し、「次の作業」を更新する。

## 次の作業
0. **（2026-10-01 完了）** 補題 1.2 の書き直し、VIII-07 のコミット、全 99 ページのディスプレイ数式の横幅検査（690px 超を含む 111 か所を 56 ページで改行、全て 650px 以下を確認）。検査ツールは `_claude/mathwidth.py`（コンテナ側で Playwright＋KaTeX を使う。使い方は冒頭のコメント）。次は残りの記事の執筆（EX-02/03 → pt-sequent → モデル理論 → 計算可能性 → QU → 資料表）。
**ユーザーの指示（2026-09-29）：自律的に続ける。1 ページずつ書いて出力・ビルド確認してから次へ（並列にしない）。**
1. Boolos：EX-01〜EX-06 完了（EX-02・EX-03 は 2026-10-01）。**QU-01〜03（量化された証明可能性論理）は再帰理論（神託機械・算術的階層）の準備が要るので、計算論 03D を書いた後に回す**（2026-09-30 自律判断）。PL-01〜08 も完了。
2. 集合論 第 I〜VIII 章（Kunen）はすべて完了（2026-10-01）。VII-05 の補題 6.5 は Kunen の主張を修正して書いた（θ 自身の保存に正則性が要る）。OCR 欠落の復元箇所は各ページに明記。
3. 証明論 pt-sequent（参考書なし）：SQ-01 α 同値、SQ-02 LK、SQ-03 カット除去、SQ-04 体系の同値性、SQ-05 前原の補間定理（関係記号のみの言語）、SQ-06 ベートの定義可能性定理はすべて完了（2026-10-01）。pt-sequent の系列はひとまず完了（順序数解析は 2026-10-02 に 03F/07 として OA-01〜05 を執筆）。モデル理論 MT-01〜10 は完了（2026-10-01、下の「モデル理論の割り当て」）。計算論 CA-01〜05, CT-01〜08 は完了（2026-10-01）。QU-01〜04 も完了（2026-10-01）。**次は新フォルダ（二階算術 → 逆数学、ラムダ計算 → カリー＝ハワード）の執筆。参考書の候補：田中一之『逆数学と2階算術』（`<和書>` にある）**。
4. 以上（集合論・証明論・一般論理）が終わったら、モデル理論（03C）と計算論（03D）。
   * モデル理論：Chang–Keisler『Model Theory』の章立てをオンラインで調べて使う（ユーザーの指示）。`_claude/drafts/model-theory/` の超積・初等部分構造のページをここで使う。
   * 計算論：Sipser『Introduction to the Theory of Computation』（資料フォルダにあるはず）を参考にする。
   * 資料フォルダから使える参考書を探し、この表の「資料（本）」に追加してから書く。
5. 完了済み：命題論理 P-01〜03、一階述語論理 F-01〜F-09（旧 F-09・F-10 を統合）、様相論理 MO-01〜MO-07（様相論理の系列は完了）、不完全性 IN-01〜IN-09、証明可能性論理 PL-01〜PL-08（pt-provability の系列は完了）。

* **commit の注意**：Write/Edit の直後に device_commit_files すると古い版が書き込まれることがある。編集後は少し待ってから commit し、デバイス上で grep して反映を確かめる。

10. **（2026-10-07 ユーザー指示）論理のフォルダ再編（完了）**：旧 `03B/04-lambda-calculus` → `03D-computability-theory/06-lambda-calculus`（表示名「型なしラムダ計算」、id logic-lambda のまま）。旧 `03B/06-reverse-mathematics` → `03F-proof-theory/07-reverse-mathematics`（二階算術 06 の隣。id logic-reverse-math のまま）。旧 `03F/07-ordinal-analysis` → `03F/08-ordinal-analysis`。旧 `03B/05-curry-howard` → `03F/09-type-theory`（表示名「型理論」、id を pt-type-theory に変更）。ラベル（logic: 接頭辞）は変えていない。型理論の系列には今後、**ランベック対応（デカルト閉圏と単純型付きラムダ計算）**と**ホモトピー型理論（HoTT）**を加える（ユーザー指示）。型理論は `_meta.json` の `"also": ["18A"]` で圏論のメニューと概要ページにも表示される。二階算術（pt）と逆数学（logic）の内容の重複を確認した：逆数学は二階算術の定義（\ref{pt:wkl-atr-axioms}, \ref{pt:omega-rca0}）を参照しており、重複はない（2026-10-07）。下の割り当て表のフォルダ名は旧名のまま。
6. **（2026-10-01 ユーザー指示）** 新しい系列フォルダ（まだ空）：`03B-general-logic/04-lambda-calculus`（logic-lambda）、`05-curry-howard`（logic-curry-howard）、`06-reverse-mathematics`（logic-reverse-math）、`03F-proof-theory/06-second-order-arithmetic`（pt-second-order-arithmetic）。参考書は未定（資料フォルダから探す）。書く順は pt-sequent → … の後、二階算術 → 逆数学、ラムダ計算 → カリー＝ハワード。
8. **（2026-10-02 ユーザー指示）計算論の再編（最優先。二階算術・逆数学より先に行う）**：計算の定義はまずプログラミング言語 L（逐次実行・while・for・簡単な基本命令）で行い、後から一般再帰関数・レジスタ機械・チューリング機械との同値性を示す。表現可能性定理、原始再帰関数＝L から while を除いた体系（for プログラム）で計算できる関数、原始再帰関数が逆関数で閉じないこと（問題）、smn 定理、チューリング完全性。計算複雑性（時間・領域、量子計算にも触れる）、コルモゴロフ複雑性とランダムネス。クリーネの定理（DFA→正規表現）はアーデンの補題と言語方程式で示し直す（添字を減らす）。言語方程式に関わる不動点定理も紹介する。03D（表示名「計算理論」）の系列は、ユーザーの指示（2026-10-02）で **01-automata / 02-computability「計算可能性理論」（01 L, 02 原始再帰, 03 アッカーマン, 04 一般再帰関数, 05 レジスタ機械, 06 TM, 07 同値性とチューリング完全性, 08 決定可能性, 09 還元, 10 写像還元, 11 万能プログラム・smn・停止問題 K・指数の再帰定理, 12 再帰定理（TM 版）） / 03-advanced-computability（01 論理的理論, 02 チューリング還元と算術的階層） / 04-complexity / 05-algorithmic-randomness（01 コルモゴロフ複雑性, 02 接頭辞なし, 03 マルチン＝レーフ）** とした。表現可能性定理は不完全性の系列の 4 ページ目（03F/02-incompleteness/04-representability。ロビンソン算術 Q で証明し、PRA・IΣ₁ も説明）に入れ、旧 04〜09 を 05〜10 に送った（2026-10-02 ユーザー指示）。参考書の追加：Soare（次数・算術的階層）、Girard『Proofs and Types』（ラムダ計算）、Pohlers と新井（順序数解析）。資料フォルダにあるのは新井だけ。下の割り当て表のフォルダ名は旧名のまま。割り当ては下の「計算論（L）の割り当て」。**（2026-10-02 完了）** CL-01〜08、CA-02 の書き直し（アーデンの補題と消去法）、CA-06（不動点定理）、CC-01〜07、KR-01・02 を執筆。CT-01 のチャーチ–チューリングの注意に同値性への参照を追加。**次は二階算術 → 逆数学（田中一之『逆数学と2階算術』）**。（2026-10-02 追加）ラムダ計算 LC-01（型なしラムダ計算と合流性）・LC-02（チャーチ数とラムダ定義可能性）、カリー＝ハワード CH-01（単純型付きラムダ計算と強正規化）も執筆。
7. **（2026-10-01 ユーザー指示）** クラス（V, L, ON, WF, OD, HOD）を太字にし、Kunen の L(α) を L_α に直した（43 ページ、横幅検査済み）。今後の分野の参考書は START.md 第 10 節の一覧。Halmos『Algebraic Logic』の内容を論理の代数化のページに随所に足す（未着手）。

9. **（2026-10-07）一般位相の割り当て表（TS・TC・TD・TE）はすべて完了。型理論の系列にランベック対応を追加した（TT-04 04-ccc-semantics、TT-05 05-lambek。2026-10-07 完了）。次の作業：HoTT（ユーザー指示 2026-10-07）。参考書 Rijke『Introduction to Homotopy Type Theory』は `math_books` にテキストがないので、まずテキスト化をユーザーに頼むか、資料なしで依存型理論（Π・Σ・恒等型）の基礎から書くかを確認する。予約ラベル logic:page-hott（01-simply-typed から参照）。残りの予定ラベル top:niemytzki-plane, top:stone-representation。** （以前の記述） その後の候補：圏論の続き（モナド、アーベル圏、カン拡張）、（03D/03 の 05・06 は完了）Halmos『Algebraic Logic』の補足（未着手）、または他分野（位相・代数など）の開始。どれにするかはユーザーに確認する。

## ユーザーの判断待ち（作業前に確認する）
- 圏論の訳語：codomain を「余域」とした（レンスター訳の「値域」は集合論の range と紛れるため）。基礎は ZFC＋宇宙一つ（Mac Lane 流）。圏論の割り当て表（ページの分け方）も未確認。
- 証明体系・カット除去（pt-sequent）の資料（一階述語論理と同じく参考書なしで自力で組み立てる方針でよいか。一階述語論理についてはユーザーがそう指示した）。
- 第 2 階層の MSC 3 文字分類のうち、推定で選んだもの（11M, 30A, 35A, 46B, 54D, 18A への「構造をもつ圏」の配置、16D への「非可換環論」の配置）。ユーザーから異論はまだない。まだページがないので変更は容易。
- 訳語の未確定：converse well-founded、modalized、modal degree、Grzegorczyk の表記、tree method（TERMS.md に「未確定」とあるもの）。

---

## 資料（本）

| 略称 | 本 | PDF の場所 | 本文テキスト（索引は同名の .index.txt） |
|---|---|---|---|
| Kunen | K. Kunen, *Set Theory: An Introduction to Independence Proofs* (1980) | （非公開） | <洋書>/_text/kunen1980.txt |
| Kunen訳 | 藤田博司訳『集合論―独立性証明への案内』（上の日本語訳。**訳語の確認用**。本文は写さない） | （非公開） | <和書>/_text/kunen1980-ja.txt |

| Boolos | G. Boolos, *The Logic of Provability* (Cambridge, 1993) | （非公開） | <洋書>/_text/boolos1993.txt（OCR 由来。□ が O、⊢ が F- などに化けている。章の開始行は割り当て表を参照） |
| 田中編 | 田中一之編『ゲーデルと 20 世紀の論理学 3 不完全性定理と算術の体系』（第 I 部 鹿島亮）。算術化・導出可能性条件の証明の補完用。本文は写さない | （非公開） | <和書>/_text/tanaka-godel3-ja.txt |
| 菊池編 | 菊池誠編『数学における証明と真理―様相論理と数学基礎論』（**訳語の確認用**。画像 PDF を tesseract で OCR。`=== [PDF p.N]` がページ区切り） | （非公開） | <和書>/_text/kikuchi-provability-ja.txt |

* 訳語確認用の日本語テキスト（`_claude/bin/terms.py` の検索対象）：
  * `kikuchi-provability-ja.txt`（菊池編。様相論理・証明可能性論理の訳語はこれを最も重く見る）
  * `tanaka-godel3-ja.txt`（田中編。算術・不完全性定理の訳語）
  * `kunen1980-ja.txt`（藤田訳 Kunen）
  * `kunen-foundations-ja.txt`（藤田訳『キューネン数学基礎論講義』）
  * `kurata-shinoda-axiomatic-set-theory-ja.txt`（倉田・篠田『公理論的集合論』）
  * `arai-foundations-ja.txt`（新井『数学基礎論』）
* 別の分野を始めるときは、その分野の英語の教科書と日本語の教科書を 1 冊ずつ `booktext.sh` でテキスト化し、この表に追加する。
  * 日本語の本は `<和書>` の下に分野別にある。

## 集合論（Kunen）の割り当て

「本文の行」は `kunen1980.txt` の行番号で、その節の始まりの目安（索引 `kunen1980.index.txt` で細かく確認する）。
フォルダは `03-mathematical-logic/03E-set-theory/` の下。接頭辞は `set:`。

| ID | フォルダ / ファイル | 題（案） | Kunen | 本文の行 | 状態 |
|---|---|---|---|---|---|
| I-01〜13 | 01-basics/01〜13 | 基礎事項 | 第 I 章 | 459– | 完了 |
| II-01〜13 | 02-infinitary-combinatorics/01〜13 | 無限組合せ論 | 第 II 章 | 2508– | 完了 |
| III-01〜06 | 03-well-founded-sets/01〜06 | 整礎集合 | 第 III 章 | 4642– | 完了 |
| IV-01 | 04-consistency-proofs/01-relativization.html | 素朴な無矛盾性証明と相対化 | IV §1–2 | 5359–5677 | 完了 |
| IV-02 | 04-consistency-proofs/02-absoluteness.html | 絶対性 | IV §3 | 5678–5960 | 完了 |
| IV-03 | 04-consistency-proofs/03-more-absoluteness.html | 基礎の公理再論とさらなる絶対性 | IV §4–5 | 5961–6241 | 完了 |
| IV-04 | 04-consistency-proofs/04-h-kappa.html | H(κ)：遺伝的に濃度 κ 未満の集合 | IV §6 | 6242–6381 | 完了 |
| IV-05 | 04-consistency-proofs/05-reflection.html | 反映定理 | IV §7 | 6382–6719 | 完了 |
| IV-06 | 04-consistency-proofs/06-appendices.html | 相対化とモデル論（補遺） | IV §8–10 | 6720–6955 | 完了 |
| V-01 | 05-definability/01-formalizing-definability.html | 定義可能性の形式化 | V §1 | 7208–7414 | 完了 |
| V-02 | 05-definability/02-ordinal-definable.html | 順序数定義可能集合 OD と HOD | V §2 | 7415–7663 | 完了 |
| VI-01 | 06-constructible-sets/01-basic-properties-of-l.html | L の基本性質 | VI §1 | 7742–7908 | 完了 |
| VI-02 | 06-constructible-sets/02-zf-in-l.html | L における ZF と構成可能性公理 | VI §2–3 | 7909–8085 | 完了 |
| VI-03 | 06-constructible-sets/03-ac-gch-in-l.html | L における AC と GCH | VI §4 | 8086–8284 | 完了 |
| VI-04 | 06-constructible-sets/04-diamond-in-l.html | L における ◇ と ◇⁺ | VI §5 | 8285–8400 | 完了 |
| VII-01 | 07-forcing/01-generic-extensions.html | 概観とジェネリック拡大 | VII §1–2 | 8554–8916 | 完了 |
| VII-02 | 07-forcing/02-forcing-relation.html | 強制関係 | VII §3 | 8917–9308 | 完了 |
| VII-03 | 07-forcing/03-zfc-in-mg.html | M[G] における ZFC | VII §4 | 9309–9439 | 完了 |
| VII-04 | 07-forcing/04-finite-partial-functions.html | 有限部分関数による強制 | VII §5 | 9440–9754 | 完了 |
| VII-05 | 07-forcing/05-larger-partial-functions.html | 大きい部分関数による強制 | VII §6 | 9755–10044 | 完了 |
| VII-06 | 07-forcing/06-boolean-valued-models.html | 埋め込み・同型・ブール値モデル | VII §7 | 10045–10435 | 完了 |
| VII-07 | 07-forcing/07-further-results.html | 強制法のさらなる結果 | VII §8 | 10436–10756 | 完了 |
| VII-08 | 07-forcing/08-other-approaches.html | 強制法の他の方法と歴史 | VII §9 | 10757–10973 | 完了 |
| VIII-01 | 08-iterated-forcing/01-products.html | 半順序の積 | VIII §1 | 11657–11789 | 完了 |
| VIII-02 | 08-iterated-forcing/02-cohen-model.html | コーエンモデル再論 | VIII §2 | 11790–11952 | 完了 |
| VIII-03 | 08-iterated-forcing/03-kurepa-independence.html | クレパ仮説の独立性 | VIII §3 | 11953–12108 | 完了 |
| VIII-04 | 08-iterated-forcing/04-easton-forcing.html | イーストン式強制 | VIII §4 | 12109–12374 | 完了 |
| VIII-05 | 08-iterated-forcing/05-iterated-forcing.html | 反復強制法の一般論 | VIII §5 | 12375–12826 | 完了 |
| VIII-06 | 08-iterated-forcing/06-ma-consistency.html | MA + ¬CH の無矛盾性 | VIII §6 | 12827–12982 | 完了 |
| VIII-07 | 08-iterated-forcing/07-countable-iterations.html | 可算サポート反復 | VIII §7 | 12983–13235 | 完了 |

* 章末の演習（IV: 6956–, V: 7664–, VI: 8401–, VII: 10974–, VIII: 13236–）は、関係する節のページで取り込む。
* 節が長くて 1 ページに収まらないときは、ページを分けてよい。ファイル番号を詰め直し、この表を直す。

## 一階述語論理の割り当て

フォルダは `03-mathematical-logic/03B-general-logic/02-first-order-logic/`（id `logic-fol`）、接頭辞は `logic:`。
**参考書はない**（ユーザーの指示：自力で理論を組み立てる）。完全性定理の証明はユーザー自身のノート（自作のノート2026-05-26。テキストは `<和書>/_text/completeness-note.md`）を参考にし、その怪しい部分（特に構文論）を補強して厳密にする。
方針：
* 原始記号は ⊥, →, ∀, =（¬, ∧, ∨, ↔, ∃ は略記）。
* 代入は記号列の置き換えとして全域的に定義し、「代入可能」を再帰的に定義する（推論規則の側で代入可能性を要求する）。
* 自然演繹は仮定に印を付けた木で定義する。固有変数条件は、その推論の上の部分木の未解消の仮定について課す。これにより弱化とカットが証明の書き換えなしに成り立つ。
* ノートの補題 2.9–2.10（証明図の二系列アルファ変換）は使わず、「新しい定数を新しい変数に置き換える」補題と →I・∀I・∀E による閉包の議論で置き換える。

| ID | ファイル | 題（案） | 内容 | 状態 |
|---|---|---|---|---|
| F-01 | 01-syntax.html | 言語・項・論理式 | 言語、項と論理式、読み方の一意性、構造的再帰、自由変数と束縛変数、文 | 完了 |
| F-02 | 02-substitution.html | 代入と代入可能性 | 代入の定義、代入可能性、代入の基本補題（自由変数・合成・交換）、定数の置き換え | 完了 |
| F-03 | 03-semantics.html | 構造と充足関係 | 構造・割り当て・項の値・充足、一致補題、意味論的代入補題、論理的帰結（局所的な意味）、略記の意味 | 完了 |
| F-04 | 04-natural-deduction.html | 形式的証明（自然演繹） | 導出木、推論規則（→, ⊥, ∀, =）、固有変数条件、Σ ⊢ φ、弱化・カット・演繹定理 | 完了 |
| F-05 | 05-soundness.html | 健全性定理 | 導出に関する帰納法による健全性、規則の条件が必要な理由の反例 | 完了 |
| F-06 | 06-derived-rules.html | 派生規則と定数の置き換え | ¬, ∧, ∨, ∃ と等号の派生規則、定数を新しい変数に置き換える定理、定数の一般化、保存性、自由変数と定数の交換 | 完了 |
| F-07 | 07-completeness.html | 完全性定理とコンパクト性定理 | 任意の言語：段階的ヘンキン拡大、リンデンバウムの補題（ツォルン）、項モデル定理、モデル存在定理（濃度 ≤ |L|+ℵ₀）、完全性定理。系：コンパクト性定理（構文論的コンパクト性から）、弱い形の下降・上昇 LS、スコーレムのパラドックス | 完了 |
| F-08 | 08-completeness-alternative.html | 完全性定理の別証明 | 可算言語・選択公理なし：素文を命題変数とみる、全称型ヘンキン公理、命題論理への帰着（ゲーデルの方法）、ケーニッヒの補題による証明、タブロー（事実として） | 完了 |
| F-09 | 09-craig-robinson.html | クレイグの補間定理とロビンソンの統合無矛盾性定理 | 前半：分離不能な組の拡大・共通の定数によるヘンキン構成・分離不能性の補題（可算言語）。後半：補間定理・統合無矛盾性定理・両者の同値性 | 完了（2026-09-30 旧 09-inseparability と 10-craig-robinson を統合。旧ファイルは _to_delete/merge-inseparability/） |

* 予約ラベル `logic:completeness`・`logic:compactness`（F-07）、`logic:deduction-system`（F-04）は定義済み。
* **ユーザーの決定（2026-09-29）**：超積・ウォシュの定理と強い形の LS（初等部分構造）はモデル理論に回す。一階述語論理には弱い形の LS だけを置き、完全性定理は最初から任意の濃度の言語で示す（可算に落とすのはケーニッヒの証明だけ）。コンパクト性・弱い LS は完全性定理のページに系としてまとめる。導出の有限性は「構文論的コンパクト性」と呼ぶ。
* 書いた超積のページと初等部分構造のページは `_claude/drafts/model-theory/`（ビルド対象外。ラベルは `model:` に付け替え済み）に置いてあり、モデル理論の系列（03C）を作るときに使う。旧 09-compactness は 07 に統合し `_to_delete/09-compactness-merged-into-07.html` に移した。
* F-09 前半の主張は定理名を付けず補題（「共通言語で分離できない理論の組の合併はモデルをもつ」）とした（ユーザーの決定 2026-09-29）。計算論の recursive inseparability とは別物。

## 命題論理の割り当て

フォルダは `03-mathematical-logic/03B-general-logic/01-propositional-logic/`（id `logic-prop`）、接頭辞は `logic:`。参考書なし。

| ID | ファイル | 題 | 内容 | 状態 |
|---|---|---|---|---|
| P-01 | 01-syntax-semantics.html | 命題論理の構文と意味論 | 論理式、付値、トートロジー、関数的完全性 | 完了 |
| P-02 | 02-natural-deduction-completeness.html | 自然演繹と完全性定理 | 演繹定理、健全性、完全性（リンデンバウム）、カルマールの補題による弱完全性 | 完了 |
| P-03 | 03-compactness.html | 命題論理のコンパクト性定理 | 完全性から・二分木のケーニッヒの補題から（AC なし）・超フィルターから、ド・ブラーン–エルデシュ | 完了 |
* **α 同値と導出図の付け替え（ノートの第 2 章）は証明論の側に回す**（ユーザーの決定 2026-09-28）。完全性定理は厳密な最小限の補題で行う。証明体系とカット除去の系列（pt-sequent）の最初に「α 同値」（ラベル `pt:page-alpha-equivalence`）と「導出図の固有変数・束縛変数の一斉付け替え（高さとカットのない形を保つ代入）」を置く。ノートの定理 2.8 の証明には循環があり（退避した代表元への取り替え）、退避を使わない証明で直す（2026-09-28 のトークで方針を記録）。
* 集合論 01-basics/01-axioms-overview は証明をヒルベルト流の有限列で説明し、「S ⊢ φ（φ が文でない）は全称閉包の証明」という約束をとっている。本系列は自然演繹・局所的な帰結関係なので、F-04 でその違いを注意に書く。

## 圏論とホモロジー代数（表示上の分割。2026-09-28）
* **（2026-10-07 ユーザー指示で再変更。これが現行）** 複数箇所への表示はやめた。`groups` で 18 を「圏論」（18A・18B）として基礎論に、「ホモロジー代数」（18G）として代数に入れる。型理論（03F/09）とラムダ計算（03D/06）の `also` も外した。
* （旧・2026-10-07 前半）圏論とホモロジー代数の抽象論は一つにまとめて見せる。ルートの `_meta.json` の `groups` で、18 を「基礎論」と「代数」の両方に入れた（同じものが二か所に出る）。幾何への応用など具体的な内容は、それぞれの分野に置く。
* （旧）MSC 18 のフォルダは 1 つのまま、トップとメニューでは「圏論」（18A・18B）と「ホモロジー代数」（18G）に分けて見せていた。
* 両者は参照し合うことが多いので、系列を作るときは互いを `prereq` に入れてよい（ユーザーの指示）。

## 証明可能性論理（Boolos）の割り当て

「本文の行」は `boolos1993.txt`（B）と `tanaka-godel3-ja.txt`（T）の行番号の目安。章の開始行：1 章 1186、2 章 1744、3 章 3160、4 章 3832、5 章 4236、6 章 4519、7 章 4767、8 章 5226、9 章 6037、10 章 6579、11 章 6979、12 章 7269、13 章 7650、14 章 8127、15 章 8507、16 章 9403、17 章 9837、18 章 10785、Notes 11352。
Boolos の章末には演習がない。IN 系列は Boolos の方針（再帰関数を経由せず Σ 論理式で直接 Bew を定義する）に従い、Boolos が概略で済ませた D1〜D3 の証明を田中編で補って**完全に証明する**（ユーザーの指定）。

| ID | 系列フォルダ（id）/ ファイル | 題（案） | 本の範囲 | 本文の行 | 状態 |
|---|---|---|---|---|---|
| MO-01 | 03B-general-logic/03-modal-logic（logic-modal）/ 01-normal-modal-logics.html | 正規様相論理の体系 | B 1 章前半（K, K4, T, B, S4, S5） | B 1186–1600 || 完了 |
| MO-02 | 同 / 02-gl-axioms.html | GL の公理系と基本定理 | B 1 章後半 | B 1600–1743 || 完了 |
| MO-03 | 同 / 03-kripke-semantics.html | クリプキ意味論 | B 4 章 | B 3832–4235 || 完了 |
| MO-04 | 同 / 04-completeness-decidability.html | 健全性・完全性・決定可能性 | B 5 章 | B 4236–4518 || 完了 |
| MO-05 | 同 / 05-canonical-models.html | カノニカルモデル | B 6 章 | B 4519–4766 || 完了 |
| MO-06 | 同 / 06-trees-for-gl.html | GL のタブロー | B 10 章 | B 6579–6978 || 完了 |
| MO-07 | 同 / 07-incomplete-modal-logic.html | 不完全な様相論理 | B 11 章 | B 6979–7268 || 完了 |
| IN-01 | 03F-proof-theory/02-incompleteness（pt-incompleteness）/ 01-peano-arithmetic.html | ペアノ算術と Σ 論理式 | B 2 章（PA, Σ 論理式, Σ₁ 完全性）; T 第 I 部 2 章 | B 1744–2244; T 3482–4148 || 完了 |
| IN-02 | 同 / 02-beta-function.html | 除法・最小公倍数と β 関数 | B 2 章; T 1 章（中国剰余定理・β 関数） | B 2245–2639; T 3020–3290 || 完了 |
| IN-03 | 同 / 03-sequence-coding.html | 有限列のコード化 | B 2 章; T 1.8 | B 2640–2794; T 3287–3330 || 完了 |
| IN-04 | 同 / 04-arithmetization.html | 構文の算術化と証明可能性述語 | B 2 章; T 5 章前半 | B 2795–3159; T 5583–5931 || 完了 |
| IN-05 | 同 / 05-derivability-d1-d2.html | 導出可能性条件 D1・D2 | T 5 章（定理 5.4–5.5）; B 2 章 | T 5910–6032 || 完了 |
| IN-06 | 同 / 06-formalized-sigma1-completeness.html | 形式化された Σ₁ 完全性と D3 | T 5 章（定理 5.6, 補題 5.7） | T 6033–6330 || 完了 |
| IN-07 | 同 / 07-diagonal-first-incompleteness.html | 対角化定理と第一不完全性定理 | B 3 章前半; T 3 章前半 | B 3160–3300; T 4413–5028 || 完了 |
| IN-08 | 同 / 08-rosser-tarski.html | ロッサーの定理とタルスキの定理 | T 3 章後半 | T 5029–5254 || 完了 |
| IN-09 | 同 / 09-second-incompleteness-lob.html | 第二不完全性定理とレーブの定理 | B 3 章; T 4 章 | B 3300–3485; T 5255–5582 || 完了 |
| PL-01 | 03F-proof-theory/03-provability-logic（pt-provability）/ 01-arithmetical-soundness.html | 算術的解釈と GL・GLS の健全性 | B 3 章後半 | B 3486–3831 || 完了 |
| PL-02 | 同 / 02-letterless-normal-form.html | 閉様相論理式の標準形 | B 7 章前半 | B 4767–5021 | 完了 |
| PL-03 | 同 / 03-reflection-incompactness.html | 反映原理・反復無矛盾性・非コンパクト性 | B 7 章後半 | B 5022–5225 | 完了 |
| PL-04 | 同 / 04-fixed-point-theorem.html | 不動点定理 | B 8 章（特殊な場合・第一証明） | B 5226–5644 | 完了 |
| PL-05 | 同 / 05-fixed-point-second-proof.html | 不動点定理の第二証明と様相化 | B 8 章 | B 5645–5842 | 完了 |
| PL-06 | 同 / 06-interpolation.html | GL の補間定理と不動点定理の第三証明 | B 8 章（クレイグ・ベート） | B 5843–6036 | 完了 |
| PL-07 | 同 / 07-solovay.html | ソロヴェイの算術的完全性定理 | B 9 章前半 | B 6037–6324 | 完了 |
| PL-08 | 同 / 08-gls-uniform-completeness.html | GLS の算術的完全性と一様完全性 | B 9 章後半（Σ 文の証明可能性論理も） | B 6325–6578 | 完了 |
| EX-01 | 03F-proof-theory/04-provability-logic-extensions（pt-provability-ext）/ 01-grz.html | Grz と S4 を保つ様相の解釈 | B 12 章 | B 7269–7649 | 完了 |
| EX-02 | 同 / 02-set-theory.html | 集合論における様相論理 | B 13 章 | B 7650–8126 | 完了（I・J の公理と (A)⇒(B) の文 S は OCR 欠損のため復元し明記。I の (B)⇒(C) と J の区分的連結性は自前の証明。Jensen–Karp は事実＋概略） |
| EX-03 | 同 / 03-analysis.html | 解析学における様相論理 | B 14 章 | B 8127–8506 | 完了（Θ 上の Π¹₁ 前整列は事実＋概略。真理の場合は主張のみ） |
| EX-04 | 同 / 04-glb-semantics.html | 結合証明可能性論理 GLB とその意味論 | B 15 章前半 | B 8507–8940 | 完了 |
| EX-05 | 同 / 05-glb-completeness.html | GLB の算術的完全性と決定可能性 | B 15 章後半 | B 8941–9402 | 完了 |
| EX-06 | 同 / 06-glb-fixed-point.html | GLB の不動点定理と閉様相論理式 | B 16 章 | B 9403–9836 | 完了（イグナチェフの標準形 Dα は OCR 欠損のため未収録。判定可能性だけ示した） |
| QU-01 | 03F-proof-theory/05-quantified-provability-logic（pt-quantified）/ 01-quantified-provability-logic.html | 量化された証明可能性論理（翻訳・上界・相対化された階層） | B 17 章 前半 | B 9837–10010 | 完了（2026-10-01） |
| QU-02 | 同 / 02-artemov.html | アルテモフの定理（算術の模型を強制する文） | B 17 章 | B 10150–10440 | 完了（2026-10-01） |
| QU-03 | 同 / 03-vardanyan.html | ヴァルダニャンの定理と常に真な文の完全性 | B 17 章 後半 | B 10440–10660 | 完了（2026-10-01。定理 4（K= の決定可能性）と定理 5（補間定理の不成立）は未収録） |
| QU-04 | 同 / 04-one-predicate-letter.html | 1 項述語 1 つの場合 | B 18 章 | B 10785–11351 | 完了（2026-10-01。C(j+10) の定義などを再構成、Σ 実現についてのアルテモフの補題は変更点のみ） |

* 証明体系・カット除去（03F/01-sequent-calculus, id `pt-sequent`）は系列フォルダだけ作ってある（資料は未定）。
* **決定事項（ユーザーが確定 2026-09-28）**：
  * logic-fol の証明体系は**自然演繹**。自然演繹についてだけ、健全性・完全性・コンパクト性・ロビンソンの統合無矛盾性定理・クレイグの補間定理まで示す（補間定理は意味論的に証明し、カット除去は使わない）。ロビンソンとクレイグは完全性定理のもとで互いに導けるので、片方を独立に証明し、もう片方をそこから導く（循環させない）。
  * pt-sequent に、LK・自然演繹・ヒルベルト流の同値性と、ゲンツェンのカット除去定理を置く。順序数解析の系列（03F/07）はテイト流の片側シーケント計算で独立に定式化し、ヒルベルト流は不完全性定理（算術化）と証明可能性論理で使う。
* 予約ラベル `pt:godel-first`・`pt:godel-second`（旧 `comp:` から改名）は IN-07・IN-09 で定義する。`logic:completeness` などの 4 件は logic-fol で定義する。

## 他の分野（未着手。始めるときに上と同じ形の表を作る）
* 当初の要望にあった題材：
  * 位相：パラコンパクト、チコノフ、ティーツェ
  * 微積：陰関数・逆関数定理、ストークス
  * 微分幾何：ストークス、ガウス＝ボネ、四頂点定理
  * 代数的位相：単体・特異・胞体ホモロジーの同値、チェック、相対ホモロジー、マイヤー＝ヴィートリス、領域不変性、ジョルダン
  * 圏論：ローヴェアまで
  * 計算可能性：不完全性、ライス、カリー＝ハワード＝ランベック
  * モデル理論：ヴォート、量化子消去、実閉体
  * 群：Aₙ の単純性
  * 環：性質の保存表と個別ページ
  * 体：ガロア理論と圏論的ガロア対応、アルティン、分解代数

## 順序数解析の割り当て（2026-10-02 追加。資料：新井『数学基礎論』第 8 章 §8.4）

| ID | フォルダ / ファイル | 題 | 新井 | 状態 |
|---|---|---|---|---|
| OA-01 | 03F/07-ordinal-analysis/01-epsilon0 | ε₀ とカントール標準形（標準的な ε₀ 順序） | 8.4.2 | 完了 |
| OA-02 | 03F/07/02-omega-logic | ω 規則と無限導出のカット除去 | 8.3, 8.4.1 | 完了 |
| OA-03 | 03F/07/03-gentzen-bound | PA の埋め込みとゲンツェンの限界定理 | 8.4.1–8.4.2 | 完了 |
| OA-04 | 03F/07/04-gentzen-wellordering | ゲンツェンの整列性証明と PA の証明論的順序数 | 8.4.2 | 完了 |
| OA-05 | 03F/07/05-goodstein | ハーディ関数とグッドスタイン列（証明可能な再帰関数の限界は引用） | 8.4.3 | 完了 |

## 圏論（Mac Lane）の割り当て（2026-10-02 作成。自律判断、ユーザー未確認）

* 資料：S. Mac Lane, *Categories for the Working Mathematician*, 2nd ed. 本文 `<洋書>/_text/maclane1998.txt`。訳語：T. レンスター『ベーシック圏論』（`<和書>/_text/leinster-basic-category-ja.txt`）。
* 基礎：ZFC＋宇宙を一つ（Mac Lane I.6 に従う）。接頭辞 `cat:`。フォルダ `18-category-theory/18A-general-theory/01-basics`（id `cat-basics`）、`02-structured-categories`。

| ID | ファイル | 題（案） | CWM | 本文の行 | 状態 |
|---|---|---|---|---|---|
| CB-01 | 01-basics/01-categories | 圏（定義・例・宇宙・同型射・hom 集合） | I.1–2, I.6–8 | 599–866, 1285–1705 | 完了 |
| CB-02 | 01-basics/02-functors | 関手と自然変換、圏同値、モノ射・エピ射、始対象 | I.3–5 | 868–1284 | 完了 |
| CB-03 | 01-basics/03-constructions | 双対・積・関手圏・横の合成 | II.1–5 | 1706–2415 | 完了 |
| CB-04 | 01-basics/04-comma-free-quotient | コンマ圏・自由圏・商圏 | II.6–8 | 2416–2818 | 完了 |
| CB-05 | 01-basics/05-yoneda | 普遍射と米田の補題 | III.1–2 | 2819–3166 | 完了 |
| CB-06 | 01-basics/06-limits | 極限と余極限、積と等化子による構成、Set の完備性 | III.3–4, V.1–2 | 3167–3671, 5363–5640 | 完了 |
| CB-07 | 01-basics/07-adjunctions | 随伴 | IV.1–2 | 3962–4499 | 完了 |
| CB-08 | 01-basics/08-equivalence | 反射部分圏と圏同値（予約 cat:equivalence-characterization） | IV.3–5 | 4500–4815 | 完了 |
| CB-09 | 01-basics/09-adjoints-limits | 随伴の合成と極限の保存 | IV.7–8, V.3–5 | 4878–5173, 5641–5895 | 完了 |
| CB-10 | 01-basics/10-adjoint-functor-theorem | フレイドの随伴関手定理 | V.6–8 | 5896–6449 | 完了 |
| CS-01 | 02-structured-categories/01-cartesian-closed | デカルト閉圏とローヴェアの不動点定理（予約ラベル cat:lawvere-fixed-point, cat:cartesian-closed） | IV.6, IV.9–10 | 4816–4877, 5174–5362 | 完了 |

## 一般位相の割り当て（2026-10-02 作成。自律判断、ユーザー未確認）

* 資料：内田伏一『集合と位相』（`<和書>/_text/uchida-settop-ja.txt`、基礎と訳語）、小山晃『位相空間論』（`_text/koyama-topology-ja.txt`、パラコンパクト・距離化）。Kelley『General Topology』（GTM 27）は画像 PDF で文字が取れない。本文は写さない。
* 接頭辞 `top:`。MSC：54A（一般論）、54B（基本的な構成）、54D（一般的な性質）、54E（豊かな構造）、54G（特異な空間。例の系列を作るとき）。3 文字分類は推定（ユーザー未確認）。
* 予約ラベル：top:topological-space（TS-01 で定義済み）、top:separable-space, top:product-topology, top:order-topology, top:hausdorff, top:compact, top:tychonoff, top:heine-borel, top:locally-compact, top:connected, top:baire-category, top:first-category, top:niemytzki-plane, top:stone-representation, top:kuratowski-closure。

| ID | フォルダ / ファイル | 題（案） | 内田 | 状態 |
|---|---|---|---|---|
| TS-01 | 54A/01-topological-spaces/01-topologies | 位相空間（開集合・閉集合・距離位相・近傍系） | §13–§16 | 完了 |
| TS-02 | 54A/01/02-closure-interior | 閉包・内部・境界・稠密・可分、クラトフスキーの閉包公理 | §15 | 完了 |
| TS-03 | 54A/01/03-bases-countability | 開基・準開基・基本近傍系・可算公理 | §17–§18 | 完了 |
| TS-04 | 54A/01/04-continuous-maps | 連続写像・開写像・同相・始位相と終位相 | §16 | 完了 |
| TS-05 | 54A/01/05-nets-filters | ネットとフィルターによる収束 | — | 完了 |
| TC-01 | 54B/01-constructions/01-subspaces-products | 部分空間と直積位相（top:product-topology） | §19–§20 | 完了 |
| TC-02 | 54B/01/02-quotients | 商空間と接着 | §20 | 完了 |
| TC-03 | 54B/01/03-order-topology | 順序位相（top:order-topology）とゾルゲンフライ直線 | — | 完了 |
| TD-01 | 54D/01-separation-compactness/01-separation-axioms | 分離公理（top:hausdorff） | §21 | 完了 |
| TD-02 | 54D/01/02-compactness | コンパクト空間（top:compact）、有限交叉性 | §22–§23 | 完了 |
| TD-03 | 54D/01/03-tychonoff | チコノフの定理（top:tychonoff） | §23 | 完了 |
| TD-04 | 54D/01/04-local-compactness | 局所コンパクトと一点コンパクト化（top:locally-compact） | §24 | 完了 |
| TD-05 | 54D/01/05-connectedness | 連結性・弧状連結（top:connected） | §25 | 完了 |
| TD-06 | 54D/01/06-urysohn-tietze | ウリゾーンの補題とティーツェの拡張定理 | §21, §29 | 完了 |
| TD-07 | 54D/01/07-stone-cech | 完全正則空間とストーン–チェックのコンパクト化 | — | 完了 |
| TD-08 | 54D/01/08-paracompactness | パラコンパクト性と 1 の分割 | 小山 7 章 | 完了 |
| TE-01 | 54E/01-metric-spaces/01-completeness | 完備性と完備化 | §26 | 完了 |
| TE-02 | 54E/01/02-baire | ベールのカテゴリー定理（top:baire-category, top:first-category） | §26 | 完了 |
| TE-03 | 54E/01/03-compact-metric | 全有界性・点列コンパクト性・ハイネ＝ボレル（top:heine-borel） | §22, §27 | 完了 |
| TE-04 | 54E/01/04-metrization | ウリゾーンの距離化定理、ストーンの定理、長田–スミルノフ | §21, 小山 7 章 | 完了 |

## 完了ログ（新しいものを上に。1 行ずつ）

- 2026-10-07 型理論 TT-07（07-identity-types, logic:page-identity-types：恒等型と道帰納法、逆・合成・ap・輸送、亜群の法則、ap の関手性、apd、Σ の η、ホモトピーと関数外延性（独立性は fact）、可縮性と基点付きの道の空間、UIP の非証明可能性（ホフマン–シュトライヒャー、fact））を執筆。資料なし。
- 2026-10-07 型理論 TT-06（06-dependent-types, logic:page-dependent-types：判断と構造規則、Π 型・Σ 型・射影、空型・単位型・和型・自然数型と帰納原理、述語論理との対応、型理論的選択公理）を執筆。資料なし（Rijke 未入手）。
- 2026-10-07 検索の分野選択を、メニュー（☰）と同じ表示上の階層（大分野 → 見出し）で作るように search.js を直した。START.md に第 8.2 節「階層・分野の見せ方を変えたときの確認リスト」（6 か所）を追加。
- 2026-10-07 基礎論の中で 03 の第 2 階層（一般論理・モデル理論・計算理論・集合論・証明論と型理論）を大分野の直下に出すようにした（groups の見出し。パンくずで同名が重ならないよう site.js を調整）。
- 2026-10-07 複数箇所表示（also・18 の二重掲載）をやめ、18 を圏論（基礎論）とホモロジー代数（代数）に分割。トップページの <title> の重複を解消。
- 2026-10-07 サイト名を「数学ノート」から「Summa Mathematica」（副題「数学大全」）に変更。リポジトリ名 math_notes → summa-mathematica（START.md・CLAUDE.md・AUTHORING.md・config.js・_meta.json・style.css・template.html）。過去の記録と drafts は旧名のまま。
- 2026-10-07 型理論 TT-04（04-ccc-semantics, logic:page-ccc-semantics：積と単位型をもつチャーチ流の型付きラムダ計算、λ 理論（文脈つき βη 等式）、デカルト閉圏での解釈、付け替え・代入の補題、健全性、パースの法則の型をもつ閉項がないこと）、TT-05（05-lambek, logic:page-lambek：構文圏 Cl(T)、そのデカルト閉性、標準モデル、完全性、構文圏の普遍性（モデル＝厳密なデカルト閉関手）、内部言語とランベックの定理、カリー＝ハワード＝ランベック対応の表）を執筆。参考書なし（Lambek–Scott の内容に当たる標準的な構成）。フリードマンの完全性定理とランベック–スコットの圏同値は fact。
- 2026-10-07 一般位相 TD-06（ウリゾーンの補題・ティーツェの拡張定理）、TD-07（完全正則空間・ストーン–チェック）、TD-08（パラコンパクト性・1 の分割）、TE-01（完備性・完備化・縮小写像の不動点定理）、TE-02（ベールのカテゴリー定理）、TE-03（距離空間のコンパクト性）、TE-04（距離化定理・ストーンの定理）を執筆。一般位相の割り当て表はすべて完了。論理の再編（λ→03D/06、逆数学→03F/07、順序数解析→03F/08、カリー＝ハワード→03F/09 型理論）。「also」による複数箇所表示を build.js・site.js・search.js・style.css に実装。18 を基礎論と代数の両方に表示。
- 2026-10-07 一般位相 TC-02, TC-03, TD-01〜TD-05 を執筆（商空間・順序位相・分離公理・コンパクト性・チコノフ・局所コンパクト・連結性）。
- 2026-10-02 圏論 CB-06（極限）〜CB-10（随伴関手定理）、CS-01（デカルト閉圏とローヴェアの不動点定理。予約ラベル cat:lawvere-fixed-point を定義し、集合論・計算論・不完全性のページからのリンクが有効に）を執筆。圏論の基礎の系列 cat-basics は完了。
- 2026-10-02 圏論 CB-02（関手と自然変換）〜CB-05（米田の補題）を執筆。
- 2026-10-02 圏論 CB-01（cat:page-categories）を執筆。系列 18A/01-basics の _meta.json に id cat-basics を付けた。
- 2026-10-02 03D/03 に 05-pi11-prewellordering（comp:page-pi11-prewellordering：WT の標準ノルム、前整列性、縮小性、Σ¹₁ 分離、被覆、分離不能な Π¹₁ 対、数の一様化、Δ¹₁ 選択、クリーネの基底定理）と 06-hyperarithmetic（comp:page-hyperarithmetic：整列順序に沿った H 集合（極限でもジャンプ）、HYP⊆Δ¹₁、実効的超限再帰による Δ¹₁⊆HYP、クリーネの定理）を執筆。
- 2026-10-02 03D/03-advanced-computability に 03-analytical-hierarchy（comp:page-analytical-hierarchy：解析的階層・Π¹₁ 標準形・WT の Π¹₁ 完全性）と 04-boundedness（comp:page-boundedness：木のランクと深さ、木の比較補題、計算可能順序数と ω₁^CK、クリーネ–ブラウワー順序と計算可能な整列順序、スペクターの有界性定理、WT_{<α} の Δ¹₁ 性、Π¹₁ 集合の層別と Δ¹₁ の判定）を執筆。資料は新井第 6 章 §6.5（有界性定理は新井と違い正の帰納的定義を使わず木の比較で証明）。
- 2026-10-02 CH-02 03B/05/02-system-t（logic:page-system-t）：体系 T、強正規化（再帰子の還元可能性）、原始再帰とアッカーマンの表現、対角線論法。CH-03 03B/05/03-system-f（logic:page-system-f）：System F（カリー流）、還元可能性候補による強正規化、データ型、表現可能な関数。参考書は手元になし（標準的な構成）。
- 2026-10-02 順序数解析 OA-01〜04（03F/07-ordinal-analysis 新設）：カントール標準形・ε₀・標準的 ε₀ 順序、Gω とカット除去、PA(X) の埋め込み・限界補題・ゲンツェンの限界定理、ゲンツェンの整列性証明と |PA|=ε₀。順序数表記の性質の PA での形式化は引用。
- 2026-10-02 SOA-05 03F/06/05-friedman（pt:page-soa-friedman）：M 有限集合、半正則切断、カービー–パリス、(I,S_I)⊨WKL₀、切断の存在、フリードマンの定理。g_n による評価は引用。
- 2026-10-02 SOA-04 03F/06/04-harrington-forcing（pt:page-soa-wkl0-conservation）：木による強制法、ジェネリックな道が Σ⁰₁ 帰納法を保つ、ハーリントンの定理、WKL₀/IΣ₁ 保存性、図あり。
- 2026-10-02 SOA-03 03F/06/03-choice-and-transfinite（pt:page-soa-choice）：AC/DC/SP/TI、包含関係、DC⇒帰納法、β モデル⇒ATR₀、一様化定理は引用。
- 2026-10-02 SOA-02 03F/06/02-aca0-conservativity（pt:page-soa-aca0）：算術的帰納法、Def(M) 拡張、PA 上の保存性、Con(PA) 非証明。
- 2026-10-02 RM-04 03B/06/04-ramsey（logic:page-rm-ramsey）：エルデシュ–ラドーの木、ACA₀⊢RTᵏ→RTᵏ⁺¹、RT³₂⇒ACA、標準 k≥3 で同値、図あり。
- 2026-10-02 RM-03 03B/06/03-aca0（logic:page-rm-aca0）：有界Σ⁰₁内包、単射の値域⇔ACA、完備性4定理⇔ACA、ケーニッヒの補題⇔ACA。RM-02 02-wkl0 も完了。
- 2026-10-02 03D を 01-automata/02-computability/03-advanced/04-complexity/05-randomness に再編（L と TM の系列を統合）。ラムダ計算 LC-01・02、カリー＝ハワード CH-01。
- 2026-10-02 計算論を L 中心に再編：03D を 01-programs/02-automata/03-turing-machines/04-advanced/05-complexity/06-algorithmic-randomness に改番。CL-01〜08、CA-02 書き直し、CA-06、CC-01〜07、KR-01〜02。量子計算・ランダムネスは資料なし（各ページに明記）。
- 2026-09-29 IN-02〜IN-09（β 関数／有限列のコード化／算術化（自然演繹を行の列として、付加情報に行の差を記録）／D1・D2／形式化された Σ 完全性と D3／対角化と第一不完全性／ロッサーとタルスキ／第二不完全性とレーブ）、PL-01（算術的解釈と GL・GLS の健全性）。
- 2026-09-29 様相論理 MO-01（正規様相論理の体系）・MO-02（GL の公理系と基本定理）・IN-01（ペアノ算術と Σ 論理式。PA の定理は完全性定理を使いモデルの中で示す方針）。一階述語論理を再編：完全性定理を任意の言語で（07 にコンパクト性・弱い LS を統合）、超積と初等部分構造は drafts へ、分離不能性・クレイグを 09・10 に番号変更。
- 2026-09-29 命題論理 P-01〜03 を新設。一階述語論理に F-08（完全性定理の別証明）・F-10（超積とウォシュの定理）・F-11（初等部分構造と LS）を追加し、コンパクト性・分離不能性・クレイグを F-09・F-12・F-13 に番号変更。フォルダを 01-propositional / 02-first-order / 03-modal に。
- 2026-09-28 一階述語論理 F-05〜F-10（健全性／派生規則と定数の置き換え／完全性定理（可算）／コンパクト性と LS・一般の言語での完全性／分離不能性定理／クレイグの補間定理とロビンソンの統合無矛盾性定理）。F-04 の題を「形式的証明（自然演繹）」に変更。代入の交換（F-02）の条件を「y∉BV(φ) または y∉var(s)」に弱めた。
- 2026-09-28 一階述語論理 F-01〜F-04（言語・項・論理式／代入と代入可能性／構造と充足関係／自然演繹）。予約ラベル logic:deduction-system を定義。表示で 18 を圏論とホモロジー代数に分割。
- 2026-09-28 表示の簡略化（トップとメニューを大分野 5 つでまとめる、ページのない分野を隠す、唯一の子フォルダをメニューとパンくずで飛ばす）。logic-fol は自然演繹、同値性とカット除去は pt-sequent と決定。
- 2026-09-28 フォルダ構成を MSC2020 準拠の 3 階層（2 桁／3 文字／系列）に移行（旧構成は `_to_delete/`、バックアップは `_claude/_archive/backup-before-msc-2026-09-28.tgz`）。build.js に系列の `id`・`prereq`（前提知識）を追加し、集合論の各系列に前提知識を記入。Boolos をテキスト化し、割り当て表と系列フォルダを作成。`comp:godel-*` を `pt:godel-*` に改名。
- 2026-09-28 訳語を確定：almost disjoint＝概素、quasi-disjoint＝準素（TERMS.md）。
- 2026-09-28 集合論 第 II 章 13 ページ・第 III 章 6 ページ（Kunen II・III）。almost disjoint を「概離散」から「概素」に置換。
- 2026-09-27 集合論 第 I 章 13 ページ（Kunen I）。
- 2026-09-30 F-09（分離不能性）と F-10（クレイグ／ロビンソン）を一ページに統合。F-07 の題名を「完全性定理とコンパクト性定理」に変更（ユーザーの指示）。
- 2026-09-30 集合論 IV-04〜06、V-01〜02、VI-01〜04、VII-01〜08 を執筆（Kunen IV §6〜VII §9）。


## モデル理論の割り当て（2026-10-01 作成。自律判断、ユーザー未確認）

* Chang–Keisler『Model Theory』(3rd ed., 1990) の PDF は資料フォルダにない。章立て（第 1 章 Introduction、第 2 章 Models constructed from constants、第 3 章 Further model-theoretic constructions、第 4 章 Ultraproducts、第 5 章 Saturated and special models、第 6 章 More about ultraproducts、第 7 章 Selected topics）は ScienceDirect の目次で確認した。節の細目は確認できていないので、ページの分け方は自分で決めた。
* 本文の補助資料：Henson と Hieronymi のモデル理論の講義ノート（PDF の場所は非公開資料）、訳語は『幾何的モデル理論入門』（板井）。本文は写さない。
* 接頭辞 `model:`。フォルダは `03-mathematical-logic/03C-model-theory/` の下。

| ID | フォルダ / ファイル | 題（案） | CK の章 | 状態 |
|---|---|---|---|---|
| MT-01 | 01-elementary-extensions/01-elementary-substructures | 初等部分構造とレーヴェンハイム–スコーレムの定理 | 3 | 完了（drafts/11 を移した） |
| MT-02 | 01-elementary-extensions/02-elementary-chains | 初等鎖と保存定理 | 3 | 完了 |
| MT-03 | 01-elementary-extensions/03-quantifier-elimination | 量化子消去とモデル完全性（DLO） | 1, 3 | 完了 |
| MT-04 | 01-elementary-extensions/04-acf | 代数的閉体の量化子消去 | 1, 3 | 完了 |
| MT-05 | 02-types-and-countable-models/01-types-omitting | 型と型の省略定理 | 2 | 完了 |
| MT-06 | 02-types-and-countable-models/02-countable-models | 原子モデル・素モデル・可算範疇性 | 2 | 完了 |
| MT-07 | 02-types-and-countable-models/03-saturated-models | 飽和モデル | 5 | 完了 |
| MT-08 | 02-types-and-countable-models/04-indiscernibles | 識別不能列とEMモデル | 3 | 完了 |
| MT-09 | 03-ultraproducts/01-ultraproducts | 超積とウォシュの定理 | 4 | 完了（drafts/10 を移した） |
| MT-10 | 03-ultraproducts/02-ultrapower-saturation | 超積と飽和 | 4, 6 | 完了 |

* 二階算術・逆数学には 田中一之『逆数学と2階算術』（`<和書>` にある）がある。

## 計算論（Sipser）の割り当て（2026-10-01 作成。自律判断、ユーザー未確認）

* 資料：M. Sipser, *Introduction to the Theory of Computation*, 3rd ed. (Cengage, 2012)。本文 `<洋書>/_text/sipser2012.txt`（目次は 104–340 行）。本文は写さない。日本語の教科書は資料フォルダになく、訳語は新井・藤田F（`terms.py`）と一般的な用語で決める。
* 接頭辞 `comp:`。フォルダは `03-mathematical-logic/03D-computability-theory/` の下。計算量（Sipser 第 7〜10 章）は 68Q で 03 の外なので、当面扱わない。

| ID | フォルダ / ファイル | 題（案） | Sipser | 状態 |
|---|---|---|---|---|
| CA-01 | 01-automata/01-finite-automata | 有限オートマトンと非決定性 | 1.1–1.2 | 完了 |
| CA-02 | 01-automata/02-regular-expressions | 正規表現 | 1.3 | 完了 |
| CA-03 | 01-automata/03-nonregular | 反復補題と非正規言語 | 1.4 | 完了 |
| CA-04 | 01-automata/04-context-free | 文脈自由文法とプッシュダウンオートマトン | 2.1–2.2 | 完了 |
| CA-05 | 01-automata/05-cfl-pumping | 文脈自由言語の反復補題 | 2.3 | 完了 |
| CT-01 | 02-turing-machines/01-turing-machines | チューリング機械とその変種 | 3.1–3.3 | 完了 |
| CT-02 | 02-turing-machines/02-decidability | 決定可能性と停止問題 | 4 | 完了 |
| CT-03 | 02-turing-machines/03-reducibility | 還元とライスの定理 | 5.1 | 完了 |
| CT-04 | 02-turing-machines/04-mapping-reducibility | 写像還元とポストの対応問題 | 5.2–5.3 | 完了 |
| CT-05 | 03-advanced-computability/01-recursion-theorem | 再帰定理 | 6.1 | 完了 |
| CT-06 | 03-advanced-computability/02-logical-theories | 論理的理論の決定可能性 | 6.2 | 完了 |
| CT-07 | 03-advanced-computability/03-turing-reducibility | チューリング還元と算術的階層 | 6.3＋補足 | 完了 |
| CT-08 | 03-advanced-computability/04-kolmogorov | 記述の長さと非圧縮性 | 6.4 | 完了 |


## 計算論（L）の割り当て（2026-10-02 作成。ユーザー指示に基づく。章立ては自律判断）

* 参考書：資料フォルダに L 型（while プログラム）の教科書はない。一般的な構成（Meyer–Ritchie の LOOP 言語、Shepherdson–Sturgis のレジスタ機械、Kleene の標準形）を自分で組み立てる。複雑性は Sipser 第 7〜10 章、量子計算とランダムネスは資料なし（一般的な知識。ページに明記）。
* 接頭辞 `comp:`。CT-08（コルモゴロフ）は 04 に残し、06 はその続き。

| ID | フォルダ / ファイル | 題（案） | 状態 |
|---|---|---|---|
| CL-01 | 01-programs/01-language-L | プログラミング言語 L と計算可能関数 | 完了 |
| CL-02 | 01-programs/02-primitive-recursive | 原始再帰関数と for プログラム | 完了 |
| CL-03 | 01-programs/03-ackermann | アッカーマン関数と while の必要性 | 完了 |
| CL-04 | 01-programs/04-recursive-functions | 一般再帰関数と L の同値性（標準形） | 完了 |
| CL-05 | 01-programs/05-register-machines | レジスタ機械 | 完了 |
| CL-06 | 01-programs/06-universal-smn | 万能プログラムと smn 定理、再帰定理（問題：原始再帰関数は逆関数で閉じない） | 完了 |
| CL-07 | 01-programs/07-turing-completeness | チューリング機械との同値性、停止問題、チューリング完全性 | 完了 |
| CL-08 | 01-programs/08-representability | 表現可能性定理 | 完了 |
| CA-02′ | 02-automata/02-regular-expressions | クリーネの定理をアーデンの補題で示し直す | 完了 |
| CA-06 | 02-automata/06-fixed-points | 言語方程式と不動点定理（クナスター–タルスキ、クリーネ、縮小写像、文脈自由言語） | 完了 |
| CC-01 | 05-complexity/01-time-complexity | 時間計算量とクラス P | 完了 |
| CC-02 | 05-complexity/02-np | NP とクック–レヴィンの定理 | 完了 |
| CC-03 | 05-complexity/03-np-complete-problems | NP 完全問題 | 完了 |
| CC-04 | 05-complexity/04-space-complexity | 領域計算量とサヴィッチの定理、PSPACE 完全性 | 完了 |
| CC-05 | 05-complexity/05-logspace | L と NL、NL = coNL | 完了 |
| CC-06 | 05-complexity/06-hierarchy | 階層定理と相対化 | 完了 |
| CC-07 | 05-complexity/07-probabilistic-quantum | 確率的計算と量子計算（BPP, BQP） | 完了 |
| KR-01 | 06-algorithmic-randomness/01-prefix-free-complexity | 接頭辞なし複雑性とクラフトの不等式 | 完了 |
| KR-02 | 06-algorithmic-randomness/02-martin-lof | マルチン＝レーフのランダムネスとレヴィン–シュノアの定理 | 完了 |

## 二階算術・逆数学の割り当て（2026-10-02 作成。資料：田中一之『逆数学と2階算術』、テキスト `<和書>/_text/tanaka-reverse-math-ja.txt`。記号は Simpson の標準に合わせる）

| ID | フォルダ / ファイル | 題（案） | 田中 | 状態 |
|---|---|---|---|---|
| SOA-01 | 03F/06-second-order-arithmetic/01-language-and-subsystems | 二階算術の言語と部分体系（ω モデル、REC・ARITH） | 2.1–2.2 冒頭, 3 | 完了 |
| SOA-02 | 03F/06/02-aca0-conservativity | ACA₀ と PA（保存性、算術的帰納法） | 2.4（定理 2.20–2.22） | 完了 |
| SOA-03 | 03F/06/03-choice-and-transfinite | 選択公理・従属選択・超限帰納法と ATR₀・β モデル | 3.1–3.2 | 完了 |
| SOA-04 | 03F/06/04-harrington-forcing | 強制法とハーリントンの定理（WKL₀ の Π¹₁ 保存性） | 3.3 | 完了 |
| SOA-05 | 03F/06/05-friedman | 半正則切断とフリードマンの定理（WKL₀ の PRA 上の Π⁰₂ 保存性） | 3.4 | 完了 |
| RM-01 | 03B/06-reverse-mathematics/01-rca0-analysis | RCA₀ と実数・連続関数（区間縮小、非可算性、中間値の定理） | 2.2 | 完了 |
| RM-02 | 03B/06/02-wkl0 | 弱ケーニッヒの補題と同値な定理（Σ⁰₁ 分離、ハイネ–ボレル、最大値、ブラウワー） | 2.3 | 完了 |
| RM-03 | 03B/06/03-aca0 | 算術的内包公理と同値な定理（ボルツァーノ–ワイエルシュトラス、ケーニッヒの補題） | 2.4 前半 | 完了 |
| RM-04 | 03B/06/04-ramsey | ラムゼーの定理と ACA₀ | 2.4 後半（定理 2.25–2.28） | 完了 |
