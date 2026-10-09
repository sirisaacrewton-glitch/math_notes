# 進捗と作業キュー（毎回の作業の最後に更新する）

> 新しいトークで「次の記事を書いて」と言われたら、下の **「次の作業」** の先頭を実行する。
> 1 トークで書くのは 1〜2 ページ。書き終えたら、そのページの行を「完了」に移し、「次の作業」を更新する。

## 次の作業
0. **（2026-10-01 完了）** 補題 1.2 の書き直し、VIII-07 のコミット、全 99 ページのディスプレイ数式の横幅検査（690px 超を含む 111 か所を 56 ページで改行、全て 650px 以下を確認）。検査ツールは `_claude/mathwidth.py`（コンテナ側で Playwright＋KaTeX を使う。使い方は冒頭のコメント）。次は残りの記事の執筆（EX-02/03 → pt-sequent → モデル理論 → 計算可能性 → QU → 資料表）。
**ユーザーの指示（2026-09-29）：自律的に続ける。1 ページずつ書いて出力・ビルド確認してから次へ（並列にしない）。**
1. Boolos：EX-01〜EX-06 完了（EX-02・EX-03 は 2026-10-01）。**QU-01〜03（量化された証明可能性論理）は再帰理論（神託機械・算術的階層）の準備が要るので、計算論 03D を書いた後に回す**（2026-09-30 自律判断）。PL-01〜08 も完了。
2. 集合論 第 I〜VIII 章（Kunen）はすべて完了（2026-10-01）。VII-05 の補題 6.5 は Kunen の主張を修正して書いた（θ 自身の保存に正則性が要る）。OCR 欠落の復元箇所は各ページに明記。
3. 証明論 pt-sequent（参考書なし）：SQ-01 α 同値、SQ-02 LK、SQ-03 カット除去、SQ-04 体系の同値性、SQ-05 前原の補間定理（関係記号のみの言語）、SQ-06 ベートの定義可能性定理はすべて完了（2026-10-01）。SQ-07 エルブランの定理（2026-10-08、資料なし）。pt-sequent の系列はひとまず完了（順序数解析は 2026-10-02 に 03F/07 として OA-01〜05 を執筆）。モデル理論 MT-01〜10 は完了（2026-10-01、下の「モデル理論の割り当て」）。計算論 CA-01〜05, CT-01〜08 は完了（2026-10-01）。QU-01〜04 も完了（2026-10-01）。**次は新フォルダ（二階算術 → 逆数学、ラムダ計算 → カリー＝ハワード）の執筆。参考書の候補：田中一之『逆数学と2階算術』（`<和書>` にある）**。
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

9. **（2026-10-07）一般位相の割り当て表（TS・TC・TD・TE）はすべて完了。型理論の系列にランベック対応を追加した（TT-04 04-ccc-semantics、TT-05 05-lambek。2026-10-07 完了）。HoTT の入口 TT-06〜08（依存型・恒等型・一価性公理）を資料なしで書いた（2026-10-07）。Rijke のテキストが入ったら、高次帰納型・切り詰め・円周の基本群などを続ける。参考書 Rijke『Introduction to Homotopy Type Theory』は `math_books` にテキストがないので、まずテキスト化をユーザーに頼むか、資料なしで依存型理論（Π・Σ・恒等型）の基礎から書くかを確認する。予約ラベル logic:page-hott（01-simply-typed から参照）。一般位相の予定ラベルはすべて定義済み（2026-10-08）。** （以前の記述） その後の候補：圏論の続き（モナド、アーベル圏、カン拡張）、（03D/03 の 05・06 は完了）Halmos『Algebraic Logic』の補足（未着手）、または他分野（位相・代数など）の開始。どれにするかはユーザーに確認する。

11. **（2026-10-09 ユーザー確認）新しい分野は `_claude/SCOPE.md` の順で始める**：群論 → 環論（保存表と性質ごとの深掘り）→ 体論・ガロア理論 → 圏論の残り → 実解析 → 微分幾何 → 代数的位相幾何。進行中の系列を区切りのよい所まで終えたら、群論の準備（START.md §10）から始める。到達目標は下限で、足りないのは不可。並行して、SCOPE.md の「現状」に挙げた抜け（実閉体（2026-10-09 RC-01〜03 で完了）、ウォシュ–ヴォートの判定法（2026-10-09 完了）、フレイド＝ミッチェル（2026-10-09 HA-05 で主張と使い方を完了））を埋める。

## ユーザーの判断待ち（作業前に確認する）
- 圏論の訳語：codomain を「余域」とした（レンスター訳の「値域」は集合論の range と紛れるため）。基礎は ZFC＋宇宙一つ（Mac Lane 流）。圏論の割り当て表（ページの分け方）も未確認。
- 証明体系・カット除去（pt-sequent）の資料（一階述語論理と同じく参考書なしで自力で組み立てる方針でよいか。一階述語論理についてはユーザーがそう指示した）。
- 第 2 階層の MSC 3 文字分類のうち、推定で選んだもの（11M, 30A, 35A, 46B, 54D, 18A への「構造をもつ圏」の配置、16D への「非可換環論」の配置）。ユーザーから異論はまだない。まだページがないので変更は容易。
- 群論（交代群）の 3 文字分類：交代群・置換群は MSC では 20B。20B を新設するか、既存の 20A・20D に置くか（群論を始める前に確認）。
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
| II-14 | 02-infinitary-combinatorics/14-partition-relations | 分割関係・無限ラムゼー・シェルピンスキーの彩色・エルデシュ–ラドー（一般の指数を含む）・有限ラムゼー（資料なし） | — | — | 完了 |
| II-15 | 02-infinitary-combinatorics/15-luzin-sets | ルジンの集合（CH で存在、MA(ℵ₁) で非存在、独立性）（資料なし） | — | — | 完了 |
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
* **分野ごとの到達目標と参考書は `_claude/SCOPE.md`**（2026-10-08 ユーザー指定）。新しい分野を始めるときは、まずその節を読み、到達目標までの割り当て表をここに作る。
* 着手の順番（SCOPE.md 末尾。2026-10-09 ユーザーが承認）：群論 → 環論（保存表）→ 体論・ガロア理論 → 圏論の残り（アーベル圏・モノイダル圏）→ 実解析 → 微分幾何 → 代数的位相幾何。

## 群論の割り当て（2026-10-09 ユーザー承認。参考書のテキスト化待ち）

到達目標（SCOPE.md §8）：群の基礎から、n ≥ 5 の交代群 Aₙ の単純性まで（下限）。参考書 ★雪江『代数学 1』・★Lang『Algebra』はテキスト化されていない（`math_books` に無い）。接頭辞 `grp`。**ユーザーの決定（2026-10-09）**：(1) 対称群・交代群は 20B を新設せず、20A の作用の系列（20A/02-group-actions）の続きに置く。(2) 雪江『代数学 1』・Lang『Algebra』をローカルのセッションでテキスト化して `math_books` に push するまで、群論は書き始めない。それまでは既存分野の補充を続ける。(3) 割り当て表はこの案で承認。

| ID | フォルダ / ファイル | 題（案） | 主な内容 | 状態 |
|---|---|---|---|---|
| GB-01 | 20A/01-groups/01-groups-subgroups | 群と部分群 | 定義と例（巡回群・二面体群・行列群・置換群）、部分群の判定、生成された部分群、元の位数 | 予定 |
| GB-02 | 20A/01/02-cosets-lagrange | 剰余類とラグランジュの定理 | 剰余類・指数・ラグランジュ、フェルマー・オイラー、巡回群の部分群 | 予定 |
| GB-03 | 20A/01/03-normal-quotient | 正規部分群と剰余群 | 正規部分群・剰余群・中心・交換子部分群 | 予定 |
| GB-04 | 20A/01/04-homomorphism-theorems | 準同型定理 | 準同型・核と像、第一〜第三同型定理、対応定理 | 予定 |
| GB-05 | 20A/01/05-products | 直積と半直積 | 内部直積・外部直積、半直積、二面体群の構成 | 予定 |
| GA-01 | 20A/02-group-actions/01-actions | 群の作用 | 作用・軌道・固定部分群・軌道–固定部分群定理、ケイリーの定理 | 予定 |
| GA-02 | 20A/02/02-class-equation | 類等式と p 群 | 共役類・類等式、p 群の中心、位数 p² の群 | 予定 |
| GA-03 | 20A/02/03-burnside-counting | 軌道の数え上げ | バーンサイドの補題と応用 | 予定 |
| GA-04 | 20A/02/04-symmetric-groups | 対称群と巡回置換 | 巡回置換分解、互換による生成、共役類と型 | 予定 |
| GA-05 | 20A/02/05-sign-alternating | 置換の符号と交代群 | 符号の well-definedness、Aₙ、3 巡回置換による生成 | 予定 |
| GA-06 | 20A/02/06-simplicity-an | 交代群の単純性 | Aₙ（n ≥ 5）の単純性、A₄ は単純でない、Sₙ の正規部分群 | 予定（到達目標） |
| SY-01 | 20D/01-sylow/01-sylow-theorems | シローの定理 | 存在・共役・個数の条件 | 予定 |
| SY-02 | 20D/01/02-sylow-applications | シローの定理の応用 | 位数 pq の群、位数 60 未満の非可換単純群は無い、A₅ の特徴づけ | 予定 |
| SY-03 | 20D/01/03-jordan-holder | 組成列とジョルダン–ヘルダーの定理 | 組成列・組成因子の一意性 | 予定 |
| SY-04 | 20D/01/04-solvable-nilpotent | 可解群と冪零群 | 導来列・中心列、Sₙ（n ≥ 5）は可解でない | 予定 |
| AB-01 | 20K/01-finite-abelian/01-structure | 有限生成アーベル群の構造定理 | 単因子・初等因子 | 予定（発展） |
| FP-01 | 20F/01-presentations/01-free-groups | 自由群 | 構成と普遍性 | 予定（発展） |
| FP-02 | 20F/01/02-presentations | 群の表示 | 生成元と関係式、二面体群の表示 | 予定（発展） |

## 順序数解析の割り当て（2026-10-02 追加。資料：新井『数学基礎論』第 8 章 §8.4）

| ID | フォルダ / ファイル | 題 | 新井 | 状態 |
|---|---|---|---|---|
| OA-01 | 03F/07-ordinal-analysis/01-epsilon0 | ε₀ とカントール標準形（標準的な ε₀ 順序） | 8.4.2 | 完了 |
| OA-02 | 03F/07/02-omega-logic | ω 規則と無限導出のカット除去 | 8.3, 8.4.1 | 完了 |
| OA-03 | 03F/07/03-gentzen-bound | PA の埋め込みとゲンツェンの限界定理 | 8.4.1–8.4.2 | 完了 |
| OA-04 | 03F/07/04-gentzen-wellordering | ゲンツェンの整列性証明と PA の証明論的順序数 | 8.4.2 | 完了 |
| OA-05 | 03F/07/05-goodstein | ハーディ関数とグッドスタイン列（証明可能な再帰関数の限界は引用） | 8.4.3 | 完了 |
| OA-06 | 03F/08/06-hydra | 自然な和、ヒドラゲームの停止（カービー–パリスの独立性は引用）（資料なし） | — | 完了 |

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
| CB-11 | 01-basics/11-adjoints-topology | 位相空間の圏と随伴 | V.9 | 6450–6620 | 完了 |
| CB-12 | 01-basics/12-special-aft | 部分対象・余生成集合と特殊随伴関手定理 | V.7–8 | 6154–6449 | 完了 |
| CS-01 | 02-structured-categories/01-cartesian-closed | デカルト閉圏とローヴェアの不動点定理（予約ラベル cat:lawvere-fixed-point, cat:cartesian-closed） | IV.6, IV.9–10 | 4816–4877, 5174–5362 | 完了 |
| CS-02 | 02-structured-categories/02-monoidal | モノイダル圏とマックレーンのコヒーレンス定理 | VII.1–2 | 7759–8159 | 完了 |
| CS-03 | 02-structured-categories/03-monoids-actions | モノイダル圏のモノイドと作用、自由モノイド | VII.3–4 | 8160–8375 | 完了 |
| CS-04 | 02-structured-categories/04-simplicial | 単体圏 Δ と普遍モノイド、単体的対象 | VII.5 | 8376–8635 | 完了 |
| CS-05 | 02-structured-categories/05-closed-categories | 閉圏とコンパクト生成空間 | VII.7–8 | 8775–8983 | 完了 |
| CS-06 | 02-structured-categories/06-monoidal-functors | モノイダル関手と厳密化定理（2026-10-08 追加。自律判断） | XI.2–3 | 12028–12265 | 完了 |
| CS-07 | 02-structured-categories/07-symmetric-coherence | 組紐・対称モノイダル圏、対称群の生成元と関係、対称コヒーレンス | XI.1 | 11857–12027 | 完了 |
| CS-08 | 02-structured-categories/08-braids | 組紐群と組紐圏、組紐のコヒーレンス | XI.4–6 | 12266–12539 | 完了 |
| CS-09 | 02-structured-categories/09-loops-suspensions | ループ空間と懸垂 | VII.9 | 8984–9050 | 完了 |
| CS-10 | 02-structured-categories/10-doctrinal-adjunction | 強モノイダルな左随伴の右随伴はモノイダル関手（転置による証明）（資料なし） | — | — | 完了 |

* **（2026-10-08 自律判断）** アーベル圏（Mac Lane 第 VIII 章）は、ホモロジー代数の土台なので `18G-homological-algebra/01-abelian-categories`（id ha-abelian、接頭辞 ha:）に置いた（MSC では 18E10 だが、表示上の「ホモロジー代数」の見出しに入れるため）。ユーザー未確認。

| ID | ファイル | 題 | CWM | 本文の行 | 状態 |
|---|---|---|---|---|---|
| HA-01 | 18G/01-abelian-categories/01-additive | 核・余核と加法圏 | VIII.1–2 | 9100–9365 | 完了 |
| HA-02 | 18G/01-abelian-categories/02-abelian | アーベル圏・像・完全列・完全関手 | VIII.3 | 9366–9600 | 完了 |
| HA-03 | 18G/01-abelian-categories/03-diagram-lemmas | 図式の補題（メンバー、五項補題、蛇の補題） | VIII.4 | 9600–9900 | 完了 |
| HA-04 | 18G/01-abelian-categories/04-chain-complexes | 鎖複体・ホモロジー・長完全列・鎖ホモトピー（資料なし。2026-10-08 自律判断） | — | — | 完了 |
| HA-05 | 18G/01-abelian-categories/05-freyd-mitchell | フレイド＝ミッチェルの埋め込み定理（主張、小さいアーベル部分圏、忠実な完全関手の反映、移行原理、米田埋め込みは左完全だが完全でない） | — | 完了 |
| HD-01 | 18G/02-derived-functors/01-projective-resolutions | 射影対象・射影分解・比較定理（資料なし。新フォルダ 18G/02-derived-functors, id ha-derived） | — | — | 完了 |
| HD-02 | 18G/02-derived-functors/02-derived-functors | 左導来関手、馬蹄補題と長完全列、Tor と Ext | — | — | 完了 |
| HD-03 | 18G/02-derived-functors/03-tor-ext | Tor と Ext、Z 上の計算、群のコホモロジーとの関係 | — | — | 完了 |
| HD-04 | 18G/02-derived-functors/04-injective-modules | 入射加群・ベールの判定法・可除群・十分な入射対象 | — | — | 完了 |
| HD-05 | 18G/02-derived-functors/05-extensions | Ext¹ と拡大（押し出しによる構成、分類定理、Z/p の拡大） | — | — | 完了 |
| HD-06 | 18G/02-derived-functors/06-tensor-tor | テンソル積（普遍性・hom との随伴・右完全性）、Tor、平坦加群 | — | — | 完了 |
| HD-07 | 18G/02-derived-functors/07-ext-injective | 入射分解による Ext、次元ずらしによる平衡性、入射性の Ext¹ による特徴づけ | — | — | 完了 |
| HD-08 | 18G/02-derived-functors/08-projective-dimension | シャヌエルの補題、第一変数の次元ずらし、射影次元の Ext による特徴づけ、Z 上の射影次元 | — | — | 完了 |
| HD-09 | 18G/02-derived-functors/09-delta-functors | δ 関手、馬蹄補題の射への拡張、導来関手の連結射の自然性、消去可能な δ 関手の普遍性、導来関手の特徴づけ、可換環上の Tor の平衡性 | — | 完了 |

特別な極限とカン拡張（18A/04-kan-extensions, id cat-kan。2026-10-08 自律判断）
| ID | ファイル | 題 | CWM | 本文の行 | 状態 |
|---|---|---|---|---|---|
| CK-01 | 04-kan-extensions/01-filtered-colimits | フィルター付き余極限と終関手 | IX.1–3 | 9964–10313 | 完了 |
| CK-02 | 04-kan-extensions/02-ends | エンドとコエンド | IX.4–8 | 10314–11026 | 完了 |
| CK-03 | 04-kan-extensions/03-kan | カン拡張 | X.1–3 | 11027–11364 | 完了 |
| CK-04 | 04-kan-extensions/04-pointwise-kan | コエンドによるカン拡張・各点カン拡張・稠密性 | X.4–7 | 11365–11856 | 完了 |
| CK-05 | 04-kan-extensions/05-category-of-elements | 元の圏と離散ファイブレーション（独自） | — | — | 完了 |
| CK-06 | 04-kan-extensions/06-nerve-realization | 神経と実現の随伴（元の圏上の余極限）、稠密性と神経の充満忠実性（独自） | — | — | 完了 |

圏の中の構造と 2 圏（18A/05-higher-structures, id cat-higher。2026-10-08 自律判断）
| ID | ファイル | 題 | CWM | 本文の行 | 状態 |
|---|---|---|---|---|---|
| C2-01 | 05-higher-structures/01-internal-categories | 内部圏・内部の図式・神経 | XII.1–2 | 12540–12989 | 完了 |
| C2-02 | 05-higher-structures/02-2-categories | 2 圏・2 圏の中の随伴とカン拡張・2 関手と変形・単一集合の圏 | XII.3–5 | 12990–13233 | 完了 |
| C2-03 | 05-higher-structures/03-bicategories | 双圏（モノイダル圏・両側加群・スパン） | XII.6–7 | 13234–13459 | 完了 |
| C2-04 | 05-higher-structures/04-crossed-modules | 交差加群と群の中の圏 | XII.8 | 13460–13560 | 完了 |
| C2-05 | 05-higher-structures/05-segal-condition | 神経の特徴づけ（辺の合成、セガール条件、神経関手の本質的な像）（資料なし） | — | — | 完了 |

| CM-01 | 03-monads/01-monads-algebras | モナドとアイレンバーグ–ムーア代数、比較関手 | VI.1–3 | 6675–6984 | 完了 |
| CM-02 | 03-monads/02-kleisli | クライスリ圏と比較の要約、語と自由半群 | VI.4–5 | 6985–7196 | 完了 |
| CM-03 | 03-monads/03-beck | 分裂余等化子とベックのモナド性定理 | VI.6–7 | 7197–7540 | 完了 |
| CM-04 | 03-monads/04-algebras-compact | 代数系とコンパクトハウスドルフ空間のモナド性 | VI.8–9 | 7540–7700 | 完了 |
| CM-05 | 03-monads/05-comonads-homology | 余モナドと標準分解、群のコホモロジー | VII.6 | 8636–8775 | 完了 |

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
| TD-09 | 54D/01/09-stone-duality | ブール代数とストーンの表現定理（top:stone-representation）、ストーン双対性 | — | 完了 |
| TD-10 | 54D/01/10-local-connectedness | 局所連結・櫛形空間・商写像による保存・局所弧状連結・カントール集合とペアノ曲線 | 小山 8.2, 9.3 | 完了 |
| TD-11 | 54D/01/11-cantor-set | 零次元性・カントール空間のレトラクト・アレクサンドロフ–ハウスドルフ・ブラウワーの特徴づけ | 小山 第 8 章発展 | 完了 |
| TD-12 | 54D/01/12-perfect-maps | 閉写像の特徴づけ・閉な同値関係・完全写像とその保つ性質・可分距離空間の完全像の距離化 | 小山 6.5 | 完了 |
| TD-13 | 54D/01/13-quotient-products | 完全写像×恒等の閉性、ホワイトヘッドの定理、商空間上のホモトピー、積が商写像にならない例、位相的錐 C N | 小山 6.5 | 完了 |
| TD-14 | 54D/01/14-countable-compactness | 可算コンパクト・点列コンパクト・擬コンパクトの関係と反例、ムルフカの Ψ 空間 | 独自 | 完了 |
| TD-15 | 54D/01/15-beta-n | βℕ の濃度 2^𝔠（独立な族）、交わらない閉包、自明でない収束列はない | 独自 | 完了 |
| TD-16 | 54D/01/16-rationals-characterization | シェルピンスキーの定理（閉開分割の辞書式順序とカントールの定理） | 独自 | 完了 |
| TD-17 | 54D/01/17-michael | マイケルの定理（σ 局所有限 → 局所有限 → 局所有限閉 → 局所有限開、正則リンデレーフ空間・ゾルゲンフライ直線のパラコンパクト性） | 独自 | 完了 |
| TD-18 | 54D/01/18-michael-selection | マイケルの選択定理（下半連続な多価写像、近似的な選択、パラコンパクト空間の閉集合からのバナッハ空間値写像の延長） | 独自 | 完了 |
| TG-01 | 54G/01-counterexamples/01-niemytzki-plane | ニェミツキ平面（top:niemytzki-plane）、ジョーンズの補題 | — | 完了 |
| TG-02 | 54G/01-counterexamples/02-sorgenfrey | ゾルゲンフライ直線（リンデレーフ・正規・コンパクト集合は可算）と平面（非リンデレーフ・非正規） | 小山 例 2.4 | 完了 |
| TG-03 | 54G/01-counterexamples/03-tychonoff-plank | 順序数の空間のコンパクト性、欠けたチコノフの板は完全正則だが正規でない（資料なし） | — | 完了 |
| TG-04 | 54G/01-counterexamples/04-double-arrow | 二重矢印空間（完備な全順序のコンパクト性、可分・第一可算・非距離化可能、ゾルゲンフライ部分空間、遺伝的リンデレーフ・遺伝的可分・完全正規）（資料なし） | — | 完了 |
| TE-01 | 54E/01-metric-spaces/01-completeness | 完備性と完備化 | §26 | 完了 |
| TE-02 | 54E/01/02-baire | ベールのカテゴリー定理（top:baire-category, top:first-category） | §26 | 完了 |
| TE-03 | 54E/01/03-compact-metric | 全有界性・点列コンパクト性・ハイネ＝ボレル（top:heine-borel） | §22, §27 | 完了 |
| TE-04 | 54E/01/04-metrization | ウリゾーンの距離化定理、ストーンの定理、長田–スミルノフ | §21, 小山 7 章 | 完了 |
| TE-05 | 54E/01/05-complete-metrizability | 完備距離化可能性（G_δ との同値、アレクサンドロフ、ポーランド空間） | — | 完了 |
| TE-06 | 54E/01/06-nagata-smirnov | 長田–スミルノフの距離化定理（σ 局所有限な開基、正規性、距離の直接構成） | — | 完了 |
| TE-07 | 54E/01/07-nowhere-differentiable | 至るところ微分不可能な連続関数（バナッハのカテゴリー論法） | — | 完了 |
| TE-08 | 54E/01/08-dugundji | デュグンジの拡張定理（距離関数による 1 の分割、影の点、線形拡張作用素、凸集合への延長） | — | 完了 |
| TE-09 | 54E/01/09-baire-space-nn | ℕ^ℕ の特徴づけ（閉開集合の無限分割、アレクサンドロフ–ウリゾーン、無理数 ≅ ℕ^ℕ、ポーランド空間は ℕ^ℕ の連続像） | — | 完了 |
| TE-10 | 54E/01/10-cech-completeness | チェック完備性（剰余の対応、コンパクト化によらないこと、局所コンパクト空間、ベール性、距離化可能空間では完備距離化可能と同値） | — | 完了 |
| TF-01 | 54C/01-function-spaces/01-function-space-topologies | 各点収束位相・コンパクト開位相・一様収束位相（2026-10-08 追加。自律判断） | 小山 10.1–10.2 | 完了 |
| TF-02 | 54C/01/02-exponential-law | 指数写像・評価写像・指数法則 | 小山 10.2 | 完了 |
| TF-03 | 54C/01/03-ascoli | 同等連続性とアスコリ–アルツェラの定理 | 小山 10.3 | 完了 |
| TF-04 | 54C/01/04-stone-weierstrass | ストーン–ワイエルシュトラスの定理とワイエルシュトラスの近似定理 | 独自 | 完了 |
| TF-05 | 54C/01/05-ascoli-general | 一般形のアスコリの定理（局所コンパクトな定義域、制限による埋め込み、σ コンパクトでの距離化と点列の形） | 独自 | 完了 |
| TH-01 | 54B/01/04-hyperspaces | 超空間（ヴィートリス位相とハウスドルフ距離、有界閉集合の超空間） | 小山 11.1–11.3 | 完了 |
| TH-02 | 54B/01/05-fractals | 和集合写像・縮小写像とフラクタル集合の存在 | 小山 11.2, 11.4 | 完了 |
| TU-01 | 54E/02/01-uniform-spaces | 一様構造・定める位相・一様連続写像・始一様構造（資料なし。2026-10-08 自律判断。新フォルダ 54E/02-uniform-spaces, id top-uniform） | — | 完了 |
| TU-02 | 54E/02/02-pseudometrics | 擬距離と一様構造、距離化補題、完全正則性との対応 | — | 完了 |
| TU-03 | 54E/02/03-uniform-completeness | 一様空間の完備性・全有界性・完備化 | — | 完了 |
| TP-01 | 54H/01/01-topological-groups | 位相群の定義・単位元の近傍・部分群・剰余空間と商群・分離性（資料なし。新フォルダ 54H-connections/01-topological-groups, id top-groups） | — | 完了 |
| TP-02 | 54H/01/02-group-uniformities | 左一様構造・完全正則性・一様連続な準同型・バーコフ–角谷の定理 | — | 完了 |

## 完了ログ（新しいものを上に。1 行ずつ）

- 2026-10-09 一般位相 TD-18（54D/01/18-michael-selection, top:page-michael-selection：下半連続な多価写像、近似的な選択（1 の分割）、近似の改良、マイケルの選択定理、パラコンパクト空間の閉集合からのバナッハ空間値写像の延長、下半連続性が外せない例。問題 2。SCOPE.md 一般位相の「発展」の最初の題材）
- 2026-10-09 ホモロジー代数 HA-05（18G/01/05-freyd-mitchell, ha:page-freyd-mitchell：定理の主張（証明はしない）、小さいアーベル部分圏、忠実な完全関手は完全性・モノ・エピ・同型を反映、図式の補題の移行原理、米田埋め込みは左完全だが完全でない。問題 2。SCOPE.md の抜けを解消）
- 2026-10-09 モデル理論 RC-03（03C/01/08-rcf-qe, model:page-rcf-qe：共通の部分構造の商体、リテラルの連言の整理、タルスキの量化子消去（場合 1 は根の個数の移行、場合 2 はロルの定理と根の上界）、RCF の完全性・モデル完全性・決定可能性、o 極小性。問題 3。量化子消去・ACF のページの言及に参照を追加。SCOPE.md の抜け「実閉体」を解消）
- 2026-10-09 モデル理論 RC-02（03C/01/07-sturm, model:page-sturm：符号付き剰余列、タルスキの問い合わせ、根の近くの符号、スツルム–シルヴェスターの定理、スツルムの定理、符号条件つきの根の個数、根の個数の移行（係数の順序体だけで決まる）。問題 3）
- 2026-10-09 モデル理論 RC-01（03C/01/06-ordered-fields, model:page-ordered-fields：順序体の基本性質、商体の順序、中間値の公理による実閉体、根の上界、符号の一定性、ロルと平均値の定理、代数的な元の部分体、相対的代数閉包は実閉体（実代数的数）。問題 3。実閉体の系列の第 1 回）
- 2026-10-09 モデル理論 MT-01 追記（model:kappa-categorical, model:los-vaught, model:prob-lv-divisible-groups：κ 範疇的で有限モデルのない理論は完全、DLO・ACF の例、有限モデルを許す反例、ねじれのない可除アーベル群の理論の完全性。SCOPE.md の抜けを一つ解消）
- 2026-10-09 圏論・ホモロジー代数 問題追加（cat:prob-tc-center-modules：R 加群の圏の中心は Z(R)、ha:prob-pr-finite-abelian：有限アーベル群の圏の射影対象は 0 だけ。それぞれ未証明の言及を参照に置換）
- 2026-10-09 計算可能性 AC-11 追記（comp:rice-shapiro-functions, comp:totality-not-ce：部分計算可能関数のクラスの指数集合が認識可能なら単調かつコンパクト、全域性の指数集合は認識不能。補足の未証明の言及を参照に置換）
- 2026-10-09 モデル理論 MT-16（03C/02/08-rational-urysohn, model:page-rational-urysohn：カテトフ関数、一点拡張、拡張性をもつ可算有理距離空間の存在・一意性・超均質性・普遍性。問題 3。フライッセ極限のページのウリゾーン空間の言及に参照を追加）
- 2026-10-09 モデル理論 MC-08 追記（model:morley-degree, model:morley-degree-exists, model:prob-mr-degree：階数が順序数ならモーリー次数は有限、次数 1 の部分への分解、次数 2 の例。補足の未証明の言及を参照に置換）
- 2026-10-09 圏論 随伴と位相 追記（cat:top-reflective-criterion, cat:prob-adt-kolmogorov：直積と部分空間で閉じた Top の充満部分圏は反射的（T₀・T₁・正則・T₃・チコノフ）、T₀ 反射はコルモゴロフ商。補足の未証明の言及を参照に置換）
- 2026-10-08 一般位相 TD-14 追記（top:mrowka-psi, top:mad-exists, top:mrowka-psi-properties：極大概素族、Ψ 空間はチコノフで擬コンパクトだが可算コンパクトでない。補足の未証明の言及を参照に置換）
- 2026-10-08 一般位相 TG-04 追記（top:double-arrow-half-nbhd, top:double-arrow-hereditary：近傍は一点と開区間の逆像、遺伝的リンデレーフ・遺伝的可分・完全正規。問題と補足の未証明の言及を参照に置換）
- 2026-10-08 集合論 II-14 追記（set:erdos-rado-general：exp_n(κ)⁺ → (κ⁺)^{n+1}_κ、とくに ℶ_n⁺ → (ℵ₁)^{n+1}_{ℵ₀}。端等質な列と帰納法。補足の未証明の言及を参照に置換）
- 2026-10-08 集合論 II-14 追記（set:finite-ramsey, set:prob-pr-r33：無限ラムゼーの定理からコンパクト性の議論で有限ラムゼーの定理、6→(3)²₂ と 5↛(3)²₂。補足の未証明の言及を参照に置換）
- 2026-10-08 ホモロジー代数 HD-09（18G/02-derived-functors/09-delta-functors, ha:page-delta-functors：δ 関手と消去可能性、馬蹄補題の射への拡張、導来関手の連結射の自然性、消去可能な δ 関手の普遍性（グロタンディーク）、導来関手の特徴づけ、可換環上の Tor の平衡性。問題 3。導来関手・Ext・Tor のページの未証明の言及を参照に置換）
- 2026-10-08 一般位相 TH-01 追記（top:hyperspace-closed-bounded：有界閉集合の超空間はハウスドルフ距離で距離空間、X が完備なら完備。補足の未証明の言及を参照に置換）
- 2026-10-08 計算可能性 AC-09 追記（comp:dekker-deficiency, comp:simple-t-complete：決定不能な認識可能集合は単純集合とチューリング同値、∅' と T 同値な単純集合。補足の未証明の言及を参照に置換）
- 2026-10-08 計算可能性 AC-10 追記（comp:smn-injective, comp:parametrized-recursion-injective, comp:injective-productive, comp:creative-one-complete, comp:creative-isomorphic-k：smn 関数の単射性（コードの長さ）、単射な生産関数、創造的 ⇔ m 完全 ⇔ 1 完全、創造的集合は K と計算可能同型。補足の未証明の言及を参照に置換）
- 2026-10-08 一般位相 TE-10（54E/01/10-cech-completeness, top:page-cech-complete：剰余は剰余へ写る、チェック完備性はコンパクト化によらない、局所コンパクト空間は βX で開、チェック完備空間はベール、完備距離空間は稠密に入るハウスドルフ空間の G_δ、距離化可能空間ではチェック完備 ⇔ 完備距離化可能。問題 3。完備距離化可能性のページの未証明の言及を参照に置換）
- 2026-10-08 一般位相 TE-09（54E/01/09-baire-space-nn, top:page-baire-space-nn：閉開集合の無限分割、アレクサンドロフ–ウリゾーンの定理、無理数 ≅ ℕ^ℕ、ポーランド空間は ℕ^ℕ の連続像。問題 3。完備距離化可能性・カントール集合のページの未証明の言及を参照に置換）
- 2026-10-08 一般位相 TD-17（54D/01/17-michael, top:page-michael：σ 局所有限な開細分 → 局所有限な細分 → （正則性）局所有限な閉細分 → 局所有限な開細分、マイケルの定理、正則リンデレーフ空間・ゾルゲンフライ直線はパラコンパクト。問題 3（R_K で正則性が必要など）。パラコンパクト性のページの未証明の言及を参照に置換）
- 2026-10-08 一般位相 TE-08（54E/01/08-dugundji, top:page-dugundji：距離関数による 1 の分割、影の点の評価 d(a_s,a)<4d(x,a)、デュグンジの拡張定理（ノルム空間値・凸包）、線形拡張作用素、凸集合への延長とレトラクト。問題 3。ティーツェのページの未証明の言及を参照に置換）
- 2026-10-08 ホモロジー代数 HD-05 に節「ベール和」（定義、拡大であること、Θ の加法性、同値類の上での群構造と Ext¹ との群同型）を追加し、補足の「確かめていない」を参照に変更。
- 2026-10-08 一様空間 TU-03 に命題「全有界な空間の完備化はコンパクト」と定理「ストーン–チェックのコンパクト化は C(X,[0,1]) による一様構造の完備化」を証明付きで追加し、補足の「確かめていない」を参照に変更。
- 2026-10-08 一般位相 TD-16（54D/01/16-rationals-characterization, top:page-rationals-characterization：可算距離空間の閉開基、閉開集合の入れ子の分割（子は 3 個以上、指定点は最初でも最後でもない）、分割による辞書式順序は端点のない稠密線形順序で順序位相が距離位相と一致、シェルピンスキーの定理、Q×Q と Q∩[0,1] の問題）。11-cantor-set から参照。独自構成。
- 2026-10-08 アルゴリズム的ランダムネス AR-05（03D/05/05-chaitin-incompleteness, comp:page-chaitin-incompleteness：健全な複雑さの公理系は大きい下界を証明できない（ベリー）、Ω の桁は有限個しか決定できない（ML 検定）、K の計算不能性の再導出と有限個の桁の問題）。01-kolmogorov から参照。資料なし。
- 2026-10-08 一般位相 TD-12 に問題「R/Z は閉写像の像だが第一可算でない」を解答付きで追加し、補足の「確かめていない」を参照に変更。
- 2026-10-08 一般位相 TF-02 に命題「C_c(Q,R)×Q→R の評価写像は連続でない」（Q のコンパクト集合は内部をもたない）を証明付きで追加し、補足の「確かめていない」を参照に変更。
- 2026-10-08 一般位相 TF-01 に命題「C_p(X,R) が第一可算 ⇔ X が可算（チコノフ空間）」を証明付きで追加し、補足の「確かめていない」を参照に変更。
- 2026-10-08 圏論 CK-06 に定理「前層の圏は自由余完備化」（余極限を保存する関手は米田への制限の実現と自然同型）を証明付きで追加し、補足の「知られている」を参照に変更。
- 2026-10-08 計算量 CC-16（03D/04-complexity/16-bpp-ph, comp:page-bpp-ph：アドルマンの定理（悪い組の数え上げ）、ラウテマンの被覆補題（確率的方法）、シプサー–ガーチ–ラウテマンの定理、NP⊆BPP なら PH=Σ₂、P=NP なら BPP=P と RP の問題）。資料なし。
- 2026-10-08 集合論 II-15（03E/02/15-luzin-sets, set:page-luzin-sets：ルジンの集合の定義と基本性質、CH のもとでの構成（疎な閉集合を ω₁ で並べて避ける）、MA(ℵ₁) のもとでの非存在、独立性、稠密なルジンの集合と閉包の問題）。05-ma-reals の補足から参照。資料なし。
- 2026-10-08 一般位相 TE-07（54E/01/07-nowhere-differentiable, top:page-nowhere-differentiable：E_n（一点でのリプシッツ評価）、微分可能なら E_n に属する、E_n は閉、折れ線近似と鋸歯で E_n は疎、バナッハの定理（至るところ微分不可能な関数は剰余集合）、単調関数と E_1 の問題）。02-baire の導入から参照。資料なし。
- 2026-10-08 証明論 SQ-07（03F/01-sequent-calculus/07-herbrand, pt:page-herbrand：全称論理式と開代入例、カットのない導出からのエルブランの補題、エルブランの定理（前件が全称論理式の場合）、エルブラン選言（∃ の形）、P(x)→P(f(x)) の二つの例と後件に量化子がある例の問題）。03-cut-elimination から参照。資料なし。
- 2026-10-08 ホモロジー代数 HD-08（18G/02-derived-functors/08-projective-dimension, ha:page-projective-dimension：シャヌエルの補題（引き戻しの分裂）、第一変数の次元ずらし Ext^{n+1}(M,N)≅Ext¹(K_n,N)、射影次元の特徴づけ（任意の分解のシジジー）、Z 加群の射影次元 ≤1 と自由アーベル群の部分群の射影性、Z/4 上の Z/2 と Z/6 の表示の問題）。資料なし。
- 2026-10-08 計算量 CC-15（03D/04-complexity/15-ladner, comp:page-ladner：詰め物をした SAT_H と遅延対角化による H、H の多項式時間計算可能性、SAT_H∈P なら H は有界で SAT∈P、SAT_H∉P なら H→∞、ラドナーの定理（NP 完全でないことは平方根ずつ縮む再帰で示す）、NP 中間の無限下降列と定数の詰め物の問題）。02-np から参照。資料なし。
- 2026-10-08 集合論 II-14 に節「色ごとに大きさの異なる等質集合」とダシュニク–ミラーの定理（正則な κ で κ→(κ,ω)²）を証明付きで追加。
- 2026-10-08 位相群 TP-02 に命題「両側不変な距離 ⇔ SIN 群」（バーコフ–角谷の構成を共役不変な近傍で行う）と問題「コンパクト群は SIN」を追加し、補足の「確かめていない」を参照に変更。
- 2026-10-08 一般位相 TD-13 に定理「クラトフスキの定理」（Y が T1 なら、f が完全 ⇔ すべての Z で f×1_Z が閉）を証明付きで追加し、補足の「確かめていない」を参照に変更。
- 2026-10-08 モデル理論 MT-15（03C/02/07-vaught-never-two, model:page-vaught-never-two：可算モデルが可算個なら型は可算、定数の追加と飽和、ヴォートの定理（非孤立型を実現する定数を加えた理論の素モデルが飽和になり ω 範疇性が戻る）、エーレンフォイヒトの例（引用）、1 個の場合と飽和な素モデルの問題）。02-countable-models の補足から参照。資料なし。
- 2026-10-08 計算論 AC-13（03D/03/13-low-basis, comp:page-low-basis：木の無限性は Π₁、計算可能な道をもたない木（再帰的に分離不能な集合）、低基底定理（受理・拒否の強制とカントール空間のコンパクト性）、0 と 0' の間の次数、孤立した道と PA の低い完全拡大の問題）。WKL₀ とハリントンのページから参照。資料なし。
- 2026-10-08 圏論 CK-06（18A/04-kan-extensions/06-nerve-realization, cat:page-nerve-realization：神経 N_K と元の圏上の余極限による実現、実現 ⊣ 神経（余錐と自然変換の一致）、実現は K の延長、K 稠密 ⇔ 神経が充満忠実 ⇔ 余単位が同型、圏の神経・幾何学的実現・米田の例、1 上の場合と余極限保存の問題）。独自構成。
- 2026-10-08 一般位相 TG-04（54G/01-counterexamples/04-double-arrow, top:page-double-arrow：完備な全順序の順序位相のコンパクト性、二重矢印空間はコンパクトハウスドルフ・可分・第一可算、部分空間がゾルゲンフライ直線と同相で距離化可能でない、射影と部分空間の可分性の問題）。54G の説明を更新。資料なし。
- 2026-10-08 一般位相 TD-15（54D/01/15-beta-n, top:page-beta-n：交わらない部分集合の閉包は交わらない（特性関数の延長）、自明でない収束列はない、濃度 𝔠 の独立な族、|βℕ|=2^𝔠、可分ハウスドルフ空間の濃度の上界と剰余の問題）。07-stone-cech と 14-countable-compactness から参照。独自構成。
- 2026-10-08 順序数解析 OA-06（03F/08-ordinal-analysis/06-hydra, pt:page-hydra：重複度による標準形の比較、自然な和とその性質、ヒドラゲームの規則と木の順序数、どの戦略でもヒドラは死ぬ（自然な和の狭義単調性）、カービー–パリスの独立性（引用）、小さいヒドラと自然な和の計算の問題）。資料なし。
- 2026-10-08 モデル理論 MC-08（03C/04-uncountable-categoricity/08-morley-rank, model:page-morley-rank：モデルごとのモーリー階数、単調性と選言の階数、階数 0（有限）と 1（極小）、ω 安定 ⇔ すべてのモデルで階数が順序数（二分木の補題と、大きい論理式の分割）、ACF と DLO の問題）。02-omega-stable の補足から参照。資料なし。
- 2026-10-08 ホモロジー代数 HD-06 に命題「射影加群は平坦」（テンソル積と直和の交換、自由・射影加群の平坦性）を追加。
- 2026-10-08 ホモロジー代数 HA-04 に命題「連結射のジグザグと自然性」（加群の場合）を追加し、補足の「確かめていない」を参照に変更。
- 2026-10-08 ホモロジー代数 HD-07（18G/02-derived-functors/07-ext-injective, ha:page-ext-injective：双対性による右導来関手、入射的な第二変数での Ext の消滅、次元ずらしによる Ext の平衡性（各 a,b ごとの同型。自然性は未確認と明記）、入射性の Ext¹ による特徴づけ、Q と Q/Z による計算と Z 上の Ext^n=0（n≥2）の問題）。01・03・04 の「確かめていない」を参照に変更。資料なし。
- 2026-10-08 圏論 CS-10（18A/02-structured-categories/10-doctrinal-adjunction, cat:page-doctrinal-adjunction：転置の規則、強モノイダルな左随伴の右随伴に緩いモノイダル構造（自然性・結合・単位を転置で F の公理に帰着）、Ab→Set の忘却関手の構造の再導出、積の場合と強でない例の問題）。06-monoidal-functors の補足から参照。資料なし。
- 2026-10-08 圏論 C2-05（18A/05-higher-structures/05-segal-condition, cat:page-segal-condition：単体の頂点・辺・背骨とセガール写像、辺の変換の補題、神経はセガール条件を満たす、辺の合成 x_ik=x_jk∘x_ij、神経の特徴づけ（圏の復元と自然な同型）、神経関手の本質的な像、中身のない三角形と特異単体の問題）。01-internal-categories の補足から参照。資料なし。
- 2026-10-08 一般位相 TF-05（54C/01/05-ascoli-general, top:page-ascoli-general：コンパクト集合への制限による C_c(X,Y) の閉埋め込み（局所コンパクト）、一般形のアスコリの定理、σ コンパクトな局所コンパクトハウスドルフ空間での距離化と点列の形、平行移動と sin(nx) の問題）。03-ascoli の補足から参照。資料なし。
- 2026-10-08 計算量 CC-14（03D/04-complexity/14-ph-karp-lipton, comp:page-ph-karp-lipton：量化子による特徴づけ（選択列を余りで読む）、神託による特徴づけ Σ_{k+1}^P=NP^{Σ_k^P}、P/poly、EXT と自己帰着、カープ–リプトンの定理）。09-alternation・08-circuits の「認めて」「ここでは証明しない」を参照に変更。資料なし。
- 2026-10-08 一般位相：01-separation-axioms（ゾルゲンフライ平面）・03-compact-metric（アレクサンドロフ–ハウスドルフ）・08-paracompactness（ω₁）の「ここでは証明しない」を本サイトの証明への参照に変更。TD-14 に問題「可算コンパクト＋パラコンパクト ⇒ コンパクト、[0,ω₁) はパラコンパクトでない」を追加。
- 2026-10-08 一般位相 TE-06（54E/01/06-nagata-smirnov, top:page-nagata-smirnov：σ 局所有限、開集合は F_σ、正則＋σ 局所有限な開基 ⇒ 正規、開集合の上でだけ正の関数、長田–スミルノフの定理（⇒ はストーンの定理、⇐ は距離を直接構成）、可分な空間の局所有限族とゾルゲンフライ直線・離散空間の問題）。04-metrization の補足から参照。資料なし。
- 2026-10-08 計算論 AC-12（03D/03/12-index-set-completeness, comp:page-index-set-completeness：Σn・Πn 完全と基本性質（階層定理から下の段に属さない）、FIN の Σ₂ 完全性と INF の一様な Π₂ 完全性、TOT の Π₂ 完全性、COF の Σ₃ 完全性（動く目印の構成）、REC は Σ₃・空集合の指数は Π₁ 完全の問題）。07-post-theorem と 02-turing-reducibility の「認めてよい」に参照を付けた。資料なし。
- 2026-10-08 集合論 II-14（03E/02/14-partition-relations, set:page-partition-relations：矢印記号、無限ラムゼーの定理（端等質化）、実数に単調な ω₁ 列はない、シェルピンスキーの彩色 2^ℵ₀↛(ℵ₁)²₂、エルデシュ–ラドーの定理 (2^κ)⁺→(κ⁺)²_κ、可算の場合の最良性、線形順序の単調部分列と ℵ₁↛(ℵ₁)²₂ の問題）。資料なし。
- 2026-10-08 ホモロジー代数 HD-06（18G/02-derived-functors/06-tensor-tor, ha:page-tensor-tor：平衡写像とテンソル積の普遍性、M⊗R≅M、テンソルと hom の随伴、hom による右完全性の判定、テンソル積の右完全性、Tor（第二変数の射影分解）の基本性質と Z 上の計算、平坦加群（Tor₁ による特徴づけ、Z/n は平坦でない）。03-tor-ext の補足から新ページと HD-05 へ参照を付けた）。資料なし。
- 2026-10-08 モデル理論 MT-14（03C/03-ultraproducts/03-ax-grothendieck, model:page-ax-grothendieck：主張を文 σ_{n,d} で書く、F_p の代数閉包の有限部分集合は有限部分体に入る、正標数での証明（鳩の巣）、レフシェッツの原理と超積による標数 0 への移行、Q 上の x^3 とフロベニウスの問題）。資料なし。
- 2026-10-08 一般位相 TF-04（54C/01/04-stone-weierstrass, top:page-stone-weierstrass：√t の多項式近似（明示的な誤差 2/n）、部分代数の閉包は束、二点での補間、ストーン–ワイエルシュトラスの定理（束による証明）、多項式・三角多項式の稠密性、偶多項式と積空間の問題）。独自構成。
- 2026-10-08 アルゴリズム的ランダムネス AR-04（03D/05-algorithmic-randomness/04-martingales, comp:page-martingales：マルチンゲールと優マルチンゲール、カントール空間上のコルモゴロフの不等式、シュノアの定理（ML ランダム ⇔ 左 c.e. マルチンゲールで勝てない。接頭辞なしの検定からマルチンゲールを構成）、計算可能な列・1 が有限個の列の例）。資料なし。
- 2026-10-08 ラムダ計算 LC-03（03D/06-lambda-calculus/03-combinatory-logic, logic:page-combinatory-logic：S, K と弱簡約、括弧抽象と組合せ完全性（同時代入、新しい変数を経由）、並行簡約と完全展開による弱簡約の合流性、ラムダ計算との翻訳（(M_CL)_λ =β M）、ξ 規則の破れ）。資料なし。
- 2026-10-08 ホモロジー代数 HD-05（18G/02-derived-functors/05-extensions, ha:page-extensions：拡大の射は同型、射影的な表示の押し出しによる拡大、Ext¹ による拡大の分類（両方向の構成）、分裂の判定、Z/p の Z/p による拡大 p 個（中央が同型でも同値でない例））。資料なし。
- 2026-10-08 一般位相 TD-14（54D/01/14-countable-compactness, top:page-countable-compactness：可算コンパクト性の言い換え（T1 の必要性の例つき）、コンパクト・可算コンパクト・点列コンパクト・擬コンパクトの含意（第一可算・リンデレーフ・T4 による逆）、{0,1}^P(N) と特定点位相の反例）。独自構成。
- 2026-10-08 圏論 CK-05（18A/04-kan-extensions/05-category-of-elements, cat:page-elements：元の圏とコンマ圏、表現可能性と終対象、離散ファイブレーションと前層の同値、前層の圏のスライス）。独自構成。
- 2026-10-08 一般位相 TG-03（54G/01/03-tychonoff-plank, top:page-tychonoff-plank：[0,α] のコンパクト性（整列性による）、チコノフの板と欠けた板、欠けた板は完全正則だが正規でない（cf ω₁ > ω を使う）、正規性は開部分空間に遺伝しない、[0,ω₁) の非コンパクト性と閉部分空間の正規性の問題）。資料なし。54G の説明を更新。
- 2026-10-08 一般位相 TG-02（54G/01/02-sorgenfrey, top:page-sorgenfrey：半開区間は閉開・零次元・正則、リンデレーフ性（通常の内部と残りの可算性）、正則リンデレーフ空間は正規、コンパクト集合は可算、ゾルゲンフライ平面は可分・正則だが非リンデレーフ・非正規（反対角線とジョーンズの補題）、直積で保たれない性質、非距離化と遺伝的可分性の問題）。小山 例 2.4。03-bases-countability から参照。PROGRESS の位相群の ID を TP-01・02 に修正（TG はニェミツキ平面と重複していた）。
- 2026-10-08 計算可能性 AC-11（03D/03/11-rice-shapiro, comp:page-rice-shapiro：指数集合、ライス–シャピロの定理（単調性とコンパクト性を K̄ の還元で）、その逆（有限集合の標準符号による特徴づけ）、無限・N・有限・空の指数集合が認識不能、ライスの定理を系として、補有限と 5∉W_e の問題）。資料なし。09-reducibility の補足から参照。
- 2026-10-08 03C/01・03C/02 の _meta の説明に EF ゲーム、ランダムグラフと 0–1 法則、フライッセ極限を追加。
- 2026-10-08 モデル理論 MT-13（03C/02/06-fraisse-limits, model:page-fraisse-limits：年齢と HP・JEP・AP、超均質と拡張性、拡張性からの往復、フライッセの定理（年齢の性質、極限の存在（課題の列）と一意性）、Q とランダムグラフ、極限の理論の ω 範疇性、同値関係のクラスと辺が一本以下のクラスの問題）。資料なし。
- 2026-10-08 モデル理論 MT-12（03C/02/05-random-graph, model:page-random-graph：拡張公理、ラドのグラフ（二進展開）、T_rg の ω 範疇性と完全性（往復とヴォートの判定法）、拡張公理の確率の評価、0–1 法則、偶奇の定義不能性と直径 2、三角形・孤立点と有限公理化不能の問題）。資料なし。
- 2026-10-08 モデル理論 MT-11（03C/01/05-ef-games, model:page-ef-games：量化子の深さと ≡_n、部分同型、有限関係言語での論理式の有限性、EF ゲームと EF の定理（⇐ で論理式の有限性を使う）、有限線形順序のゲーム（距離が 2^{n-i} について合う不変条件）、偶奇は一階で定義できない、無限集合と 2・3 元の順序の問題）。資料なし。
- 2026-10-08 AC-09 の補足から AC-10 の系（単純集合は m 完全でない）へ参照を追加。
- 2026-10-08 計算可能性 AC-10（03D/03/10-creative-sets, comp:page-creative-sets：生産的・創造的集合、K は創造的、全域な生産関数、生産的集合は認識可能な無限部分集合を含む、パラメータ付き再帰定理（再帰定理の証明を一様化）、創造的 ⇔ m 完全、単純集合は m 完全でない、マイヒルの同型定理（往復論法））。新井 §6.2.2（マイヒルの同型定理は資料なし）。
- 2026-10-08 TU-01・TU-02 の補足の位相群についての「確かめていない」記述を、TG-02 の定理への参照に置き換えた。
- 2026-10-08 一般位相 TP-01・TP-02（新フォルダ 54H-connections/01-topological-groups, id top-groups。01-topological-groups：定義と例、平行移動と単位元の近傍、部分群の閉包・開部分群・連結群の生成、剰余空間（射影は開、ハウスドルフ ⇔ H 閉）と商群、T0 ⇒ ハウスドルフかつ正則、離散部分群は閉・R/Z≅S¹。02-group-uniformities：左一様構造、完全正則性、準同型の一様連続性、バーコフ–角谷（距離化補題の左不変性）、GL₂ で左右の一様構造が異なる例）。資料なし。§8.2：メニュー・パンくず・検索の分野選択に「他の構造との関係」を確認（54G と同じく単一の子フォルダは折りたたみ表示）。
- 2026-10-08 一般位相 TE-05（54E/01/05-complete-metrizability, top:page-complete-metrizability：開集合上の完備な距離 d+|1/d(·,X∖U)の差|、G_δ 集合の完備距離化（アレクサンドロフ）、完備距離化可能な部分空間は G_δ（振動による）、無理数と有理数、ポーランド空間の閉性（G_δ・可算積・例・ベール性））。資料なし。01-completeness と 02-baire の補足から参照。
- 2026-10-08 一般位相 TD-13（54D/01/13-quotient-products, top:page-quotient-products：完全写像×恒等写像は閉、完全写像の積、ホワイトヘッドの定理（局所コンパクトハウスドルフな因子）、商空間上のホモトピー、R→R/Z と非局所コンパクトな Y の積が商写像にならない例（閉集合を明示）、位相的錐 C N が距離化不能、二つの商写像の積とトーラスの問題）。小山 §6.5。02-quotients の補足から参照。
- 2026-10-08 一般位相 TD-12（54D/01/12-perfect-maps, top:page-perfect-maps：閉写像の三つの言い換え（f_* による）、閉な同値関係と完全写像、コンパクト集合の逆像のコンパクト性、正則空間でのコンパクト集合と閉集合の分離、完全写像が保つ性質（ハウスドルフ・正則・正規・T1・局所コンパクト・第二可算）、可分距離空間の完全像の距離化とコンパクト距離空間の閉同値関係による商、錐と局所コンパクトでの判定の問題）。小山 §6.5（問題 6.11–6.14 を含む）。
- 2026-10-08 一般位相 TD-11（54D/01/11-cantor-set, top:page-cantor-set：完全不連結なコンパクトハウスドルフ空間の零次元性（準成分の連結性）、2^N の閉集合へのレトラクション（最左の道）、アレクサンドロフ–ハウスドルフの定理（ヒルベルト立方体への埋め込みとレトラクト）、ブラウワーの特徴づけ（閉開分割の二進木）、C≅C×C≅C^N≅{0..k}^N、局所連結でないことと Q∩[0,1] の問題）。小山 第 8 章の発展（問題 8.14 を含む）。
- 2026-10-08 一般位相 TD-10（54D/01/10-local-connectedness, top:page-local-connectedness：局所連結と開集合の連結成分、櫛形空間、商写像による局所連結性の保存（閉写像より一般）、局所弧状連結と弧状連結成分、カントール集合と C≅C×C、ペアノ曲線（区間への線形補間）、[0,∞) から櫛形空間への全射と Peano 連続体の必要条件の問題）。小山 §8.2・第 9 章の発展。
- 2026-10-08 計算可能性 AC-09（03D/03/09-low-simple, comp:page-low-simple：ポストの単純集合、極限補題（ポストの定理から）、低集合とジャンプの単調性、単純な低集合の有限損傷による構成（P_i は高々一回作用、N_e の損傷は高々 e 回、制限の極限、K^A の極限近似で低さ））。新井 §6.6 の演習を補って証明。
- 2026-10-08 ホモロジー代数 HD-04（18G/02/04-injective-modules, ha:page-injective-modules：ベールの判定法（ツォルンの補題）、アーベル群では入射 ⇔ 可除、Q・Q/Z、可除群への埋め込み、余誘導加群 Hom_Z(R,D) と随伴による R-Mod の十分な入射対象、Z は入射的でない・Q/Z は余生成対象の問題）。資料なし。
- 2026-10-08 計算可能性 AC-08（03D/03/08-friedberg-muchnik, comp:page-friedberg-muchnik：比較不能性の要求、クリーネ–ポストの定理（∅' による有限延長法）、フリードバーグ–ムチニクの定理（注意を要する条件・証人・制限・損傷を明示した有限損傷の優先論法、各要求が有限回しか作用しないことを優先度の帰納法で）、非決定可能な認識可能集合の構成と制限の必要性の問題）。新井 §6.4。02-turing-reducibility の補足から参照。
- 2026-10-08 計算可能性 AC-07（03D/03/07-post-theorem, comp:page-post-theorem：集合の神託についての使用の原理（有限表 D の形）、Σ_n・Π_n の有界量化子での閉性、ポストの定理（Σ_{n+1} ⇔ ∅^(n) で認識可能、∅^(n+1) は Σ_{n+1} 完全、Δ_{n+1} ⇔ ≤_T ∅^(n)）、∅^(n) は Σ_n だが Π_n でない、FIN と TOT の問題）。新井 §6.3。02-turing-reducibility の補足から参照。
- 2026-10-08 CM-05（余モナドとホモロジー）の hypcheck から比較定理と Ext のページへ参照を追加。
- 2026-10-08 ホモロジー代数 HD-03（18G/02/03-tor-ext, ha:page-tor-ext：Ext の定義と基本性質（Ext⁰=Hom、射影対象で消える）、両変数の長完全列（第二変数は入射分解なしで）、Ext_Z(Z/n,B)、Ext¹ と射影性、群のコホモロジー = Ext_{ZΠ}(Z,A)、Tor は補足で紹介）。資料なし。導来関手の系列 HD-01〜03 完了。
- 2026-10-08 ホモロジー代数 HD-02（18G/02/02-derived-functors, ha:page-derived-functors：左導来関手の定義と well-definedness（選び方によらない・加法関手・射影対象で消える）、右完全なら L_0F ≅ F、馬蹄補題（一段を蛇の補題で）、導来関手の長完全列、完全関手と L_1 の問題）。資料なし。
- 2026-10-08 ホモロジー代数 HD-01（新フォルダ 18G/02-derived-functors, id ha-derived。01-projective-resolutions, ha:page-projective-resolutions：射影対象と Hom の完全性、双積・直和因子、自由加群は射影的（選択公理）、十分な射影対象、射影分解の存在、比較定理（存在とホモトピーを除く一意性）、射影分解の一意性、Z/n の分解と分裂の問題）。資料なし。§8.2：メニュー・パンくず・検索の分野選択に「導来関手」を確認。
- 2026-10-08 ホモロジー代数 HA-04（18G/01/04-chain-complexes, ha:page-chain-complexes：鎖複体と鎖写像、サイクルと Coker(C_{n+1}→Z_n) としてのホモロジー（加法関手）、四項完全列 0→H_n→Q_n→Z_{n-1}→H_{n-1}→0、一般形の蛇の補題（短完全版から像で置き換えて導出）、長完全列、鎖ホモトピー不変性と可縮複体）。資料なし。
- 2026-10-08 一般位相 TU-03（54E/02/03-uniform-completeness, top:page-uniform-completeness：コーシーフィルターと完備性、距離空間との整合、閉集合・直積の完備性と完備部分空間の閉性、全有界、コンパクト ⇔ 完備かつ全有界（超フィルター補題）、コンパクトハウスドルフ空間の一様構造の一意性（対角線の近傍）と連続写像の一様連続性、一様連続写像の延長、完備化の存在（擬距離ごとの完備化の直積へ）と一意性）。資料なし。一様空間の系列 TU-01〜03 完了。
- 2026-10-08 一般位相 TU-02（54E/02/02-pseudometrics, top:page-uniform-pseudometrics：擬距離の族の一様構造、一様連続な擬距離、距離化補題（鎖の長さの帰納法で f ≤ 2Σf）、一様構造は一様連続な擬距離の族から作られる、可算基 ⇔ 擬距離化可能（ハウスドルフなら距離）、一様化可能 ⇔ 完全正則、f が三角不等式を満たさない例）。資料なし。
- 2026-10-08 一般位相 TU-01（新フォルダ 54E/02-uniform-spaces, id top-uniform。01-uniform-spaces, top:page-uniform-spaces：一様構造と近縁、基の条件、定める位相（U[x] が近傍基）、閉包と近縁（開・閉近縁の基）、正則性とハウスドルフ性、一様連続写像、arctan による同じ位相で異なる一様構造、始一様構造と直積・部分一様構造）。資料なし（Kelley は画像 PDF のみ）。§8.2 の確認：メニュー・パンくず・検索の分野選択に「一様空間」、54E の索引に表示を確認。
- 2026-10-08 オートマトン CA-07（01-automata/07-deterministic-cfl, comp:page-dcfl：DPDA（Hopcroft–Ullman 型）、走行、DCFL ⊆ CFL、ループする組とスタックの高さの最小値による特徴づけ、入力を最後まで読む DPDA への変換（存在として）、読む状態と旗による補集合の閉性、{aⁱbʲcᵏ : i≠j または j≠k} は DCFL でない、共通部分・和で閉じない問題）。Sipser 2.4（DCFG と LR は補足で fact）。04-context-free の補足を更新。
- 2026-10-08 計算複雑性 CC-13（13-primality-branching, comp:page-primality-branching：合成数の証人、素数には証人がない、奇数の合成数では証人が半数以上（素数べきでない場合と素数べきの場合。j の最大性と t の互いに素性を補った）、PRIMES ∈ coRP（一様な選択を有限回の引き直しで厳密化）、分岐プログラムと一回読み、節点の多項式は道の積の和、一回読みなら多重線形標準形、EQ_ROBP ∈ coRP、561 と一回読みでない反例の問題）。Sipser 10.2。07 の補足から参照。
- 2026-10-08 圏論 CB-12（01-basics/12-special-aft, cat:page-special-aft：部分対象とよく冪、モノ射の（族の）引き戻し、生成・余生成集合、特殊始対象定理（射の一意性を等化子の分裂から詳述）、引き戻しを保つ関手とコンマ圏のモノ射、SAFT（よく冪の形。コンマ圏のよく冪性を補った）、CHaus の反射性（[0,1] が余生成対象）、表現可能性と Set の余生成対象の問題）。Mac Lane V.7–8。10-adjoint-functor-theorem の補足から参照。
- 2026-10-08 圏論 CS-09（02-structured-categories/09-loops-suspensions, cat:page-loops-suspensions：ウェッジとスマッシュ積、局所コンパクトハウスドルフな Y についての −∧Y ⊣ Map_*(Y,−)（Top_* のまま、CG を使わずに）、I/{0,1} のコンパクトハウスドルフ性、Σ ⊣ Ω と単位・余単位、Σⁿ ⊣ Ωⁿ、Ω の積保存、ΩX を道の空間のファイバーとみなす埋め込み、Set_* のスマッシュ積）。Mac Lane VII.9。
- 2026-10-08 圏論 CB-11（01-basics/11-adjoints-topology, cat:page-adjoints-topology：D ⊣ U ⊣ D'、始位相をスライス圏の右随伴かつ右逆として、持ち上げから等化子を作る命題（一意性は随伴なしで）、Top の完備性・余完備性、X/A の左随伴性（A=∅ も込めて）、Haus の反射性（解集合条件、単位の全射性、余極限は H 経由）、D' と Haus→Top が右随伴をもたない問題）。Mac Lane V.9。
- 2026-10-08 圏論 CM-05（03-monads/05-comonads-homology, cat:page-comonads-homology：余モナド、添加単体的対象、普遍モノイドの双対による余モナドの標準構成、前加法圏での鎖複体、群環の余モナドと棒分解の面作用素（ε から計算）、可縮ホモトピーによる完全性（Mac Lane は引用のみ）、群のコホモロジーの具体形と H⁰・H¹）。Mac Lane VII.6。04-simplicial の補足から参照。
- 2026-10-08 計算複雑性 CC-12（12-approximation-cryptography, comp:page-approx-crypto：近似比、頂点被覆の 2 倍近似（極大マッチング）、最大カットの局所探索、完全秘匿とワンタイムパッド、完全秘匿には鍵の数が平文の数以上必要、一方向関数、一方向関数があれば P≠NP（接頭辞の言語で 1 ビットずつ逆算）、落とし戸関数、RSA の正しさ（w と N が互いに素でない場合も））。Sipser 10.1, 10.6。04-complexity の説明を更新。
- 2026-10-08 計算複雑性 CC-11（11-parallel, comp:page-parallel：一様な回路族、NC、行列積と推移閉包（繰り返し二乗）、NC¹⊆L（経路を 1 ビットずつ記録）、NL⊆NC²、NC⊆P、NC の対数領域還元についての閉性、CIRCUIT-VALUE の P 完全性）。Sipser 10.5。CC-10 の素数の選び方の記述を修正。
- 2026-10-08 計算複雑性 CC-10（10-interactive-proofs, comp:page-interactive-proofs：対話証明系と IP、グラフ非同型、IP⊆PSPACE（受理させる乱数の個数の最大値を整数で計算）、算術化、冠頭形、TQBF∈IP（素数の見つけ方・次数の上界・誤りの確率を具体的に）、シャミアの定理、#SAT と完全性 1 の問題）。Sipser 10.4。
- 2026-10-08 計算複雑性 CC-09（09-alternation, comp:page-alternation：交代チューリング機械（停止を仮定して受理を定義）、TAUT・MIN-FORMULA、ATIME⊆SPACE（道標の記録）、SPACE⊆ATIME(f²)、ASPACE⊆TIME(2^O(f))（グラフの無閉路性を確認）、TIME(2^O(f))⊆ASPACE（局所関数による表の検証）、AL=P・AP=PSPACE・APSPACE=EXPTIME、多項式階層とその基本性質、TQBF と階層の崩壊の問題）。Sipser 10.3。
- 2026-10-08 計算複雑性 CC-08（04-complexity/08-circuits, comp:page-circuits：ブール回路、任意の関数の回路、シャノンの下界（数え上げを具体的な不等式で）、決定性の機械の一段の局所関数、TIME(t)⊆SIZE(O(t²))、P/poly の注意、CIRCUIT-SAT の NP 完全性とクック–レヴィンの別証明）。Sipser 9.3。
- 2026-10-08 モデル理論 MC-07（07-morley, model:page-morley：強極小集合の上で素かつ極小、ボールドウィン–ラクランの定理（素モデルの一意性を使わない形で）、モーリーの範疇性定理と同値条件、可算モデルの個数、ACF・DLO・T_E・(Z,s) の例）。新井 §5.6。非可算範疇性の系列 MC-01〜07 完了。識別不能列のページの「扱わない」をこの系列への参照に変更。03C と基礎論のモデル理論の説明を更新。
- 2026-10-08 モデル理論 MC-06（06-dimension, model:page-dimension：交換法則（極小性だけで）、独立・基底の存在、シュタイニッツの交換、次元の一意性と非可算集合の次元、独立な組の型の一意性（強極小性の一様な上界がモデルをまたぐ比較に要ることを明示）、代数的閉包への初等写像の延長（全射まで））。新井 §5.6.3。
- 2026-10-08 モデル理論 MC-05（05-strongly-minimal, model:page-strongly-minimal：代数的閉包とその性質（同書の演習を証明）、極小・強極小、強極小性の一様性、ω 安定なら極小な論理式がある、ヴォート対がなければ ∃^∞ の消去と極小⇒強極小、T_E の問題）。新井 §5.6.3。
- 2026-10-08 モデル理論 MC-04（04-no-vaught-pairs, model:page-no-vaught-pairs：非可算な極小論理式と型 p_φ、可算な型を省く同じ濃度の真の初等拡大（下降 LS の段を補った）、ω 安定な理論の二基数モデルの移行、範疇的ならヴォート対なし、定義可能集合の大きさ）。新井 §5.6.2。
- 2026-10-08 モデル理論 MC-03（03-vaught-pairs, model:page-vaught-pairs：均質モデルと可算均質モデルの同型（組を固定して）、ヴォート対、二基数モデルからヴォート対、L∪{U} での組の初等性、可算な均質ヴォート対の構成、ヴォートの二基数定理（同型がパラメータを固定することを明示）、T_E と ACF の問題）。新井 §5.6.2。
- 2026-10-08 モデル理論 MC-02（02-omega-stable, model:page-omega-stable：二分木の補題、ω 安定なら κ 安定（モーリー階数を使わず大きい論理式で）、孤立型の稠密性、集合上の構成可能な素モデル、構成可能なら原子的、ℵ₁ 飽和モデル、範疇的なら (κ,ℵ₀) モデルなし）。新井 §5.6.1。
- 2026-10-08 モデル理論 MC-01（03C/04-uncountable-categoricity 新設、id model-categoricity。01-stability, model:page-stability：κ 安定・ω 安定、1 変数で十分（補った）、ACF の ω 安定性と DLO の非安定性、整列順序上の EM モデルは型を少ししか実現しない（等号も記録する同値関係で）、非可算範疇的なら ω 安定）。新井 §5.6.1。
- 2026-10-08 一般位相 TH-02（54B/01/05-fractals, top:page-fractals：誘導される写像の連続性とリプシッツ性、和集合写像（有限・コンパクト族）、ハッチンソンの定理、アトラクターと自己相似集合、カントール集合・シェルピンスキーの三角形の例、不動点と減少列の問題）。小山 11.2, 11.4。小山第 10・11 章の系列完了。54・54B の説明を更新。
- 2026-10-08 一般位相 TH-01（54B/01/04-hyperspaces, top:page-hyperspaces：ハウスドルフ距離とその表示、超空間の完備性（極限集合を直接構成）、コンパクト性、ヴィートリス位相との一致、一点集合の閉性と可分性の問題）。小山 11.1, 11.3。
- 2026-10-08 一般位相 TF-03（03-ascoli, top:page-ascoli：同等連続、一様同等連続（コンパクト距離空間）、アスコリ–アルツェラの定理（X は一般のコンパクト空間、Y の完備性は不要）、古典形、x^n とリプシッツ族の問題）。小山 10.3。関数空間の系列完了。
- 2026-10-08 一般位相 TF-02（02-exponential-law, top:page-exponential-law：コンパクト部分集合のチューブ補題、指数写像の連続性、一様収束位相・各点収束位相での反例、評価写像の連続性（局所コンパクトハウスドルフ）、評価写像を連続にする最弱の位相、指数法則（Φ の連続性を、小山の準開基による確認に要る補題を経由せず任意の開集合で直接示した）、合成の連続性と道の空間の問題）。小山 10.2。
- 2026-10-08 一般位相 TF-01（54C-maps-function-spaces/01-function-spaces 新設、id top-function-spaces。01-function-space-topologies, top:page-function-space-topologies：各点収束位相＝直積の部分空間、コンパクト開位相、一様収束位相、三つの比較、コンパクト開位相＝コンパクト集合上の一様収束、コンパクトな定義域での距離への非依存性と非コンパクトでの反例、完備性）。小山 10.1–10.2。メニュー・パンくず・検索の分野選択を確認。
- 2026-10-08 圏論 C2-04（04-crossed-modules, cat:page-crossed-modules：群の反射的グラフが圏になる条件 [ker s, ker t]=1 と合成の一意性（Mac Lane が計算に委ねた十分性を証明）、交差加群（Mac Lane の定義にはパイエルの等式が欠けていたので補い、前交差加群の反例を付けた）、交差加群と群の中の圏の圏同値（逆向きの構成も証明）、π0・π1 の問題）。Mac Lane XII.8。第 XII 章完了。
- 2026-10-08 圏論 C2-03（03-bicategories, cat:page-bicategories：双圏、対象一つの双圏＝モノイダル圏、両側加群の双圏、反復引き戻しはジグザグの極限、スパンの双圏（Mac Lane が読者に委ねた確かめを極限の一意性で一括）、双圏の中のモナド、スパンの中のモナド＝内部圏（ベナブー。補った）、双対と行列としてのスパンの問題）。Mac Lane XII.6–7。
- 2026-10-08 圏論 C2-02（02-2-categories, cat:page-2-categories：2 圏（hom 圏による定義）、中央四つの交換とひげ付け、Cat・厳密モノイダル圏・Ord の例、エックマン–ヒルトンの議論（補った）、2 圏の中の随伴と随伴の一意性（2 圏で証明し直した）、2 圏の中のカン拡張、2 関手・2 自然変換・変形、単一集合による圏と n 圏、始域・終域の合成規則、随伴の合成と Ord のカン拡張の問題）。Mac Lane XII.3–5。
- 2026-10-08 圏論 C2-01（18A/05-higher-structures 新設、id cat-higher。01-internal-categories, cat:page-internal-categories：内部圏・内部関手、群の中の圏＝圏の中の群（Mac Lane が略した対応を証明）、内部の図式と集合値関手の同値、神経関手の充満忠実性（補った）、Grp の内部圏の合成の公式と亜群性）。Mac Lane XII.1–2。メニュー・パンくず・検索の分野選択・フォルダ索引を確認。
- 2026-10-08 圏論 CS-08（08-braids, cat:page-braids：組紐群（表示で定義、次数準同型で無限性）、組紐圏の厳密モノイダル構造と組紐（Mac Lane が図で済ませた自然性・六角形を関係式から代数的に証明）、組紐圏の自由性（ジョイヤル–ストリート、厳密版）、組紐のコヒーレンス（Mac Lane が証明を書いていない定理 2 を CS-07 の議論で証明）、Z 次数つき空間の ζ 組紐。Mac Lane の配置空間の記述（順序つき→純組紐群）を注記）。Mac Lane XI.4–6。第 XI 章完了。
- 2026-10-08 圏論 CS-07（07-symmetric-coherence, cat:page-symmetric-coherence：組紐モノイダル圏、対称なら六角形一つ、符号つき対称、組紐モノイダル関手、ヤン–バクスター方程式、厳密化への組紐の移送、単位の公理が六角形から従うこと、対称群の生成元と関係（剰余類の数え上げで証明）、厳密・一般の対称コヒーレンス。Mac Lane が引用・略した対称群の表示、α を恒等とみなす還元、単位の場合を補った。CS-05 の fact から参照）。Mac Lane XI.1。
- 2026-10-08 圏論 CS-06（06-monoidal-functors, cat:page-monoidal-functors：モノイダル関手・合成・モノイダル自然変換、モノイドの保存、多変数のコヒーレンス、厳密化定理（Mac Lane が略した積の結合律・G の公理・GF≅1 のモノイダル性を確かめた）、ケイリー埋め込みの問題）。Mac Lane XI.2–3。
- 2026-10-08 圏論 CK-04（コエンドによるカン拡張・各点カン拡張・稠密性・随伴とカン拡張）。Mac Lane X.4–7。カン拡張の系列完了。
- 2026-10-08 圏論 CK-03（03-kan, cat:page-kan：右・左カン拡張、極限・像の例、右カン拡張の各点公式（コンマ圏上の極限）、存在、充満忠実な関手に沿ったカン拡張、表現可能関手の左カン拡張）。Mac Lane X.1–3。
- 2026-10-08 圏論 CK-02（02-ends, cat:page-ends：楔、エンドとコエンド、自然変換のエンド表示、米田の補題のエンド形と余米田の補題（本サイトで追加）、細分圏によるエンドの極限表示、加群のテンソル積、関手のテンソル積と幾何学的実現、パラメータ定理、フビニの定理）。Mac Lane IX.4–8。
- 2026-10-08 圏論 CK-01（18A/04-kan-extensions 新設、01-filtered-colimits, cat:page-filtered-colimits：フィルター付き圏、Set のフィルター付き余極限の具体的記述、有限極限との交換（無限積での反例）、群の忘却関手（Mac Lane が略した代表元によらないことを補った）、終関手と余極限）。Mac Lane IX.1–3。
- 2026-10-08 ホモロジー代数 HA-03（03-diagram-lemmas, ha:page-diagram-lemmas：エピ射の引き戻し、メンバーと同値、図式追跡の 6 規則、五項補題、連結射の構成とジグザグ、蛇の補題（Mac Lane が 1 か所だけ示した完全性を 6 か所すべて示した））。Mac Lane VIII.4。アーベル圏の系列 HA-01〜03 完了。
- 2026-10-08 ホモロジー代数 HA-02（02-abelian, ha:page-abelian：アーベル圏、自由アーベル群の反例、有限極限、モノかつエピは同型、像の分解とその関手性、完全列、短完全列の特徴づけ、左完全の言い換え、hom 関手の左完全性）。Mac Lane VIII.3。
- 2026-10-08 ホモロジー代数 HA-01（18G/01-abelian-categories 新設、01-additive, ha:page-additive：零射・核・余核、ガロア接続、標準的な分解、前加法圏と零対象、双積と積・余積の一致、加法圏、和の双積による表示、加法関手の特徴づけ）。Mac Lane VIII.1–2。ホモロジー代数（代数の下）に初めてページができ、8.2 の確認 6 か所を確認。
- 2026-10-08 圏論 CS-05（05-closed-categories, cat:page-closed-categories：対称モノイダル圏（コヒーレンスは fact）、閉圏と豊穣圏、コンパクト生成空間とケリー化、コンパクト集合上の位相の一致（Mac Lane のデカルト閉性の証明でチューブ補題の使い方に欠落があったのを補った）、余反射性と積、コンパクト開位相、CGHaus のデカルト閉性）。Mac Lane VII.7–8。
- 2026-10-08 圏論 CS-04（04-simplicial, cat:page-simplicial：単体圏 Δ と順序数の和、射は積の和、普遍モノイド、面と退化、標準形、単体的恒等式、生成と関係による表示（挿入による並べ替えを補った）、単体的対象・特異単体・神経、∂∂=0）。Mac Lane VII.5。
- 2026-10-08 圏論 CS-03（03-monoids-actions, cat:page-monoids-in-monoidal：モノイド対象と例の表、一般結合律、余積を保存するモノイダル圏の自由モノイド（結合律と普遍性をコヒーレンス定理で補った）、テンソル代数、作用と自由な作用の随伴）。Mac Lane VII.3–4。
- 2026-10-08 圏論 CS-02（02-structured-categories/02-monoidal, cat:page-monoidal：モノイダル圏、例、イズベルの議論、ケリーの単位の三角形、結合だけのコヒーレンス（階数と菱形）、単位を消す標準射（Mac Lane が略した単位の場合を 8 通りの場合分けで補った）、コヒーレンス定理、自由モノイダル圏、エックマン–ヒルトン）。Mac Lane VII.1–2。
- 2026-10-08 一般位相 TG-01（54G-peculiar-spaces/01-counterexamples 新設、01-niemytzki-plane, top:page-niemytzki：定義と開基、接円板の弦、完全正則性（明示的な分離関数）、可分性と閉離散な境界線、ジョーンズの補題、非正規性、非リンデレーフ・非距離化、有理点と無理点のベールによる非分離）。予約ラベル top:niemytzki-plane を定義。8.2 の確認リスト 6 か所を確認。
- 2026-10-08 一般位相 TD-09（54D/01/09-stone-duality, top:page-stone-duality：ストーン空間、超フィルター空間、表現定理（予約ラベル top:stone-representation を定義）、ストーン空間の復元、ストーン双対性、有限ブール代数・有限補有限代数の例）。資料なし。
- 2026-10-08 圏論 CM-04（04-algebras-compact, cat:page-monadic-examples：(Ω,E) 代数と自由代数、代数系の忘却関手のモナド性、CHaus のモナド性（閉包作用素による Paré の証明、持ち上げの一意性を補った）、超フィルターのモナド（fact））。Mac Lane VI.8–9。モナドの系列 CM-01〜04 完了。名前表示の参照 8 件を番号表示に（cat・model）。
- 2026-10-08 圏論 CM-03（03-beck, cat:page-beck：分裂フォークと絶対余等化子、商群の例、代数の標準的分裂フォーク、余等化子の創出、代数の忘却関手は絶対余等化子を創出、比較は余単位を保つ（転置で）、比較の存在と一意性、ベックの定理、Top の反例、可縮な対）。Mac Lane VI.6–7。
- 2026-10-07 圏論 CM-02（02-kleisli, cat:page-kleisli：クライスリ圏（圏であることの証明）、クライスリの随伴、部分写像と関係の例、クライスリ比較関手（一意性は転置で）、始と終の随伴、半群のモナド）。Mac Lane VI.4–5。
- 2026-10-07 圏論 CM-01（18A/03-monads 新設、01-monads-algebras, cat:page-monads：モナド、随伴が定めるモナド、閉包作用素、T 代数、アイレンバーグ–ムーアの随伴、比較定理（一意性を直接計算で）、モナド的、冪集合モナドの代数＝完備半束）。Mac Lane VI.1–3。
- 2026-10-07 型理論 TT-08（08-univalence, logic:page-hott：両側逆による同値、擬逆との同値、idtoeqv と一価性公理、0≠1、一価性から宇宙が集合でないこと、命題・集合・h レベル、ヘドベリの定理、2 は集合、円周（fact））を執筆。予約ラベル logic:page-hott を定義。
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
| MT-11 | 01-elementary-extensions/05-ef-games | エーレンフォイヒト–フライッセゲーム（資料なし。2026-10-08 自律判断） | — | 完了 |
| MT-05 | 02-types-and-countable-models/01-types-omitting | 型と型の省略定理 | 2 | 完了 |
| MT-06 | 02-types-and-countable-models/02-countable-models | 原子モデル・素モデル・可算範疇性 | 2 | 完了 |
| MT-07 | 02-types-and-countable-models/03-saturated-models | 飽和モデル | 5 | 完了 |
| MT-08 | 02-types-and-countable-models/04-indiscernibles | 識別不能列とEMモデル | 3 | 完了 |
| MT-09 | 03-ultraproducts/01-ultraproducts | 超積とウォシュの定理 | 4 | 完了（drafts/10 を移した） |
| MT-10 | 03-ultraproducts/02-ultrapower-saturation | 超積と飽和 | 4, 6 | 完了 |
| MT-14 | 03-ultraproducts/03-ax-grothendieck | アックス–グロタンディークの定理（レフシェッツの原理と超積による移行。資料なし） | — | 完了 |
| MT-15 | 02-types-and-countable-models/07-vaught-never-two | ヴォートの定理（可算モデルはちょうど 2 個にならない）（資料なし） | — | 完了 |
| MT-16 | 03C/02/08-rational-urysohn | 有理ウリゾーン空間（カテトフ関数、一点拡張、存在・一意性・超均質性・普遍性） | — | 完了 |
| RC-01 | 03C/01/06-ordered-fields | 順序体と実閉体（商体の順序、中間値の公理による RCF、根の上界、ロル・平均値、相対的代数閉包） | — | 完了 |
| RC-02 | 03C/01/07-sturm | スツルムの定理とタルスキの問い合わせ（符号条件つきの根の個数は順序体だけで決まる） | — | 完了 |
| RC-03 | 03C/01/08-rcf-qe | 実閉体の量化子消去と帰結（完全性・決定可能性・o 極小性） | — | 完了 |
| MT-12 | 02-types-and-countable-models/05-random-graph | ランダムグラフ・拡張公理・ω 範疇性・0–1 法則（資料なし） | — | 完了 |
| MT-13 | 02-types-and-countable-models/06-fraisse-limits | 年齢・HP/JEP/AP・超均質と拡張性・フライッセの定理・極限の理論の ω 範疇性（資料なし） | — | 完了 |

非可算範疇性（03C/04-uncountable-categoricity, id model-categoricity。2026-10-08 自律判断。資料：新井『数学基礎論』§5.6。本文は写さない）
| ID | ファイル | 題 | 新井 | 状態 |
|---|---|---|---|---|
| MC-01 | 04-uncountable-categoricity/01-stability | 安定性、EM モデルの型の少なさ、範疇的なら ω 安定 | 5.6.1–5.6.6 | 完了 |
| MC-02 | 04-uncountable-categoricity/02-omega-stable | ω 安定な理論：大きい論理式の木、κ 安定性、孤立型の稠密性、集合上の素モデル、(κ,ℵ₀) モデルの非存在 | 5.6.7–5.6.13 | 完了 |
| MC-03 | 04-uncountable-categoricity/03-vaught-pairs | 均質モデル、ヴォート対、ヴォートの二基数定理 | 5.6.14–5.6.21 | 完了 |
| MC-04 | 04-uncountable-categoricity/04-no-vaught-pairs | 型を省く真の初等拡大、範疇的ならヴォート対なし | 5.6.22–5.6.23 | 完了 |
| MC-05 | 04-uncountable-categoricity/05-strongly-minimal | 代数的閉包、極小・強極小な論理式、∃^∞ の消去、極小論理式の存在 | 5.6.24– | 完了 |
| MC-06 | 04-uncountable-categoricity/06-dimension | 交換法則、独立性と次元、独立な組の型の一意性 | 5.6.24– | 完了 |
| MC-07 | 04-uncountable-categoricity/07-morley | ボールドウィン–ラクランの定理とモーリーの範疇性定理 | 5.6.4, 5.6.1 | 完了 |
| MC-08 | 04-uncountable-categoricity/08-morley-rank | モーリー階数（基本性質、階数 0 と 1、ω 安定性との同値、モーリー次数）（資料なし） | — | 完了 |

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
| CA-07 | 01-automata/07-deterministic-cfl | 決定性文脈自由言語（DPDA、ループの除去、補集合についての閉性）（Sipser 2.4） | 完了 |
| CC-01 | 05-complexity/01-time-complexity | 時間計算量とクラス P | 完了 |
| CC-02 | 05-complexity/02-np | NP とクック–レヴィンの定理 | 完了 |
| CC-03 | 05-complexity/03-np-complete-problems | NP 完全問題 | 完了 |
| CC-04 | 05-complexity/04-space-complexity | 領域計算量とサヴィッチの定理、PSPACE 完全性 | 完了 |
| CC-05 | 05-complexity/05-logspace | L と NL、NL = coNL | 完了 |
| CC-06 | 05-complexity/06-hierarchy | 階層定理と相対化 | 完了 |
| CC-07 | 05-complexity/07-probabilistic-quantum | 確率的計算と量子計算（BPP, BQP） | 完了 |
| CC-08 | 04-complexity/08-circuits | ブール回路と回路計算量、シャノンの下界、TIME(t)⊆SIZE(t²)、CIRCUIT-SAT（2026-10-08 追加。Sipser 9.3） | 完了 |
| CC-09 | 04-complexity/09-alternation | 交代チューリング機械と多項式階層（Sipser 10.3） | 完了 |
| CC-10 | 04-complexity/10-interactive-proofs | 対話証明系、グラフ非同型、IP = PSPACE（Sipser 10.4） | 完了 |
| CC-11 | 04-complexity/11-parallel | 一様な回路族、NC、P 完全性（Sipser 10.5） | 完了 |
| CC-12 | 04-complexity/12-approximation-cryptography | 近似アルゴリズムと暗号（一方向関数・落とし戸関数）（Sipser 10.1, 10.6） | 完了 |
| CC-13 | 04-complexity/13-primality-branching | 素数判定と一回読み分岐プログラム（Sipser 10.2） | 完了 |
| CC-14 | 04-complexity/14-ph-karp-lipton | 多項式階層の量化子・神託による特徴づけ、P/poly とカープ–リプトンの定理（資料なし） | 完了 |
| CC-15 | 04-complexity/15-ladner | ラドナーの定理（詰め物をした SAT と遅延対角化）（資料なし） | 完了 |
| CC-16 | 04-complexity/16-bpp-ph | アドルマンの定理（BPP⊆P/poly）、ラウテマンの被覆補題、シプサー–ガーチ–ラウテマンの定理（資料なし） | 完了 |
| AC-07 | 03-advanced-computability/07-post-theorem | ポストの定理（使用の原理・有界量化子・Σ_{n+1}=∅^(n) で認識可能・Δ_{n+1}=≤_T ∅^(n)）（新井 §6.3） | 完了 |
| AC-08 | 03-advanced-computability/08-friedberg-muchnik | ポストの問題とフリードバーグ–ムチニクの定理（優先論法）（新井 §6.4） | 完了 |
| AC-09 | 03-advanced-computability/09-low-simple | 単純集合・極限補題・低集合・単純な低集合（新井 §6.6 演習）、デッカーの不足集合（T 完全な単純集合） | 完了 |
| AC-10 | 03-advanced-computability/10-creative-sets | 生産的・創造的集合、パラメータ付き再帰定理、創造的 ⇔ m 完全、単純集合は m 完全でない、単射な smn 関数・生産関数、創造的集合は 1 完全で K と計算可能同型、マイヒルの同型定理（新井 §6.2.2） | 完了 |
| AC-11 | 03-advanced-computability/11-rice-shapiro | 指数集合とライス–シャピロの定理（逆を含む）、ライスの定理を系として、関数版（資料なし） | 完了 |
| AC-12 | 03-advanced-computability/12-index-set-completeness | Σn/Πn 完全、FIN・INF・TOT・COF の完全性（動く目印）（資料なし） | 完了 |
| AC-13 | 03-advanced-computability/13-low-basis | 低基底定理（計算可能な道をもたない木、ジャンプの強制）（資料なし） | 完了 |
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
