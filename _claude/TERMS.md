# 採用訳語の一覧（サイト全体で統一する訳語）

* **使い方**：
  * 新しい用語を記事に出す前に、この表を `grep` する。
  * 表になければ `python3 _claude/bin/terms.py 候補1 候補2 …` で日本語の本での使用回数を調べてから決め、この表に 1 行足す。
  * 自分で直訳した語を使わない。例：almost disjoint を「概離散」と訳したのは誤りだった。
* **変更するとき**：全ページを一括置換し、索引の読みも直す。そのあとこの表を更新する。
* **根拠欄の略号**：
  * 藤田 ＝ 藤田訳 Kunen『集合論』
  * 藤田F ＝ 藤田訳『キューネン数学基礎論講義』
  * 倉田 ＝ 倉田・篠田『公理論的集合論』
  * 新井 ＝ 新井『数学基礎論』
  * 菊池 ＝ 菊池編『数学における証明と真理』（様相論理・証明可能性論理）
  * 田中 ＝ 田中編『不完全性定理と算術の体系』
  * 数字は OCR テキストでの出現回数（目安）

| 英語 | 採用訳（読み） | 別訳 | 根拠・メモ |
|---|---|---|---|
| almost disjoint | 概素（がいそ）。族は概素族 | ほとんど交わりがない（藤田） | ユーザーが確定（2026-09-28）。藤田は「ほとんど交わりがない」25 回 |
| Δ-system / quasi-disjoint family | Δ システム（でるたしすてむ）／準素族（じゅんそぞく） | 交わりが一定の集合族（藤田） | ユーザーが確定（2026-09-28）。藤田は「交わりが一定の集合族」8 回 |
| compatible / incompatible | 両立する／両立しない（りょうりつ） | 非両立 | 藤田 59、新井 26 |
| antichain | 反鎖（はんさ） | | 藤田 65、新井 32 |
| countable chain condition (c.c.c.) | 可算鎖条件（かさんさじょうけん） | c.c.c. | 新井 32、藤田 4 |
| generic filter | ジェネリックフィルター | 生成的 | 藤田 170 |
| Martin's axiom | マーティンの公理 | マーテインの公理（藤田） | |
| Suslin line / tree / hypothesis | ススリン線／ススリン木／ススリン仮説 | | 藤田 16／71 |
| Aronszajn tree | アロンシャイン木（あろんしゃいんぎ） | | 藤田 30 |
| Kurepa tree / family | クレパ木／クレパ族 | | 藤田 26／1 |
| well-pruned tree | 刈り込まれた木（かりこまれたき） | | 藤田 12（「刈り込」） |
| closed unbounded (club) | 閉非有界（へいひゆうかい） | | 藤田 10、新井 48 |
| stationary | 定常（ていじょう） | | 藤田 60、新井 26 |
| pressing-down lemma | 押し下げ補題（おしさげほだい） | フォドーの補題 | 藤田 6 |
| diagonal intersection | 対角共通部分（たいかくきょうつうぶぶん） | | 新井 8、藤田 1 |
| ◇ (diamond) | ダイヤモンド原理 ◇ | | |
| cofinality | 共終数（きょうしゅうすう） | | 藤田 40 |
| regular / singular cardinal | 正則基数／特異基数 | | 藤田 145 |
| inaccessible | 到達不能（とうたつふのう） | | 藤田 108 |
| cumulative hierarchy | 累積階層（るいせきかいそう） | | 倉田 5 |
| rank | ランク（らんく） | 階数（藤田 25） | サイトはランクで統一済み（113 回） |
| transitive closure | 推移閉包（すいいへいほう） | 推移的閉包（新井 18） | 藤田 6 |
| extensional | 外延的（がいえんてき） | | 藤田 16 |
| Mostowski collapse | モストフスキの崩壊（ほうかい） | つぶし（新井 34） | |
| set-like | 集合的（しゅうごうてき） | | 藤田F 5 |
| Axiom of Foundation | 基礎の公理（きそのこうり） | 正則性公理（倉田 55） | 藤田 49 |
| forcing relation | 強制関係（きょうせいかんけい） | | 新井 12、藤田 7 |
| provability logic | 証明可能性論理（しょうめいかのうせいろんり） | | 菊池 92 |
| modal logic / normal modal logic | 様相論理（ようそうろんり）／正規様相論理 | | 菊池 378／94 |
| Kripke frame / model | クリプキフレーム／クリプキモデル | | 菊池 22／28 |
| accessibility relation | 到達可能性関係（とうたつかのうせいかんけい） | | 菊池 7 |
| generated submodel | 生成部分モデル（せいせいぶぶんもでる） | | 菊池 11 |
| canonical model | カノニカルモデル | 正準モデル | 菊池 7。「標準モデル」は ℕ の意味と衝突するので使わない |
| finite frame property | 有限フレーム性（ゆうげんふれーむせい） | 有限モデル性 | 菊池 48 |
| propositional variable (sentence letter) | 命題変数（めいだいへんすう） | 文字 | 菊池 34 |
| letterless sentence | 閉様相論理式（へいようそうろんりしき） | 文字を含まない文 | 菊池（定義あり）。Boolos の letterless |
| valid / satisfy | 妥当／充足 | | 菊池 44／49 |
| irreflexive / transitive / euclidean | 非反射的／推移的／ユークリッド的 | | 菊池 15／83／6 |
| realization (arithmetical) | 算術的解釈（さんじゅつてきかいしゃく） | 実現 | 菊池 8、新井 10 |
| arithmetical soundness / completeness | 算術的健全性／算術的完全性 | | 菊池 11／55 |
| provability predicate | 証明可能性述語（しょうめいかのうせいじゅつご） | | 田中 31、菊池 23 |
| derivability conditions | 導出可能性条件（どうしゅつかのうせいじょうけん） | | 菊池 19、田中 18 |
| diagonal lemma | 対角化定理（たいかくかていり） | 対角化補題 | 菊池 12、田中 11 |
| fixed point theorem | 不動点定理（ふどうてんていり） | | 菊池 10 |
| Löb's theorem / Löb rule | レーブの定理／レーブ規則 | レープの定理 | 菊池 18（レープ 4） |
| Solovay | ソロヴェイ | ソロベイ | 菊池 60 |
| reflection principle | 反映原理（はんえいげんり） | | 菊池 12、新井 14 |
| ω-consistent | ω 無矛盾（おめがむむじゅん） | | 田中 16 |
| (Craig) interpolation | （クレイグの）補間定理（ほかんていり） | | 新井 10（「補間」） |
| converse well-founded | 逆整礎（ぎゃくせいそ） | 無限上昇列をもたない（菊池） | 本サイトの採用（2026-09-29、自律作業中に仮決定）。菊池は「無限上昇列がない」で表す |
| modalized | 未確定（候補「様相化された」） | | 未確認 |
| modal degree | 様相次数（ようそうじすう） | 様相深さ | 仮決定（未確認） |
| Grzegorczyk (Grz) | グジェゴルチク（仮。EX-01 で使用） | | 表記は未確認 |
| tree method (for GL) | 未確定（候補「タブロー」） | 木の方法 | 菊池は「意味論的タブロー」に言及 |
| necessitation / uniform substitution / distribution axiom | 必然化則／一様代入則／分配公理（公理 K） | | 菊池「必然化則」「一様代入則」「公理 K」。分配公理は Boolos の distribution axiom の訳（未確認） |
| modality | 様相（記号列） | モダリティ | 未確認 |
| numeral | 数項（すうこう） | | 田中 15、新井 9、菊池 9 |
| bounded quantifier / Σ formula / Δ formula | 有界量化／Σ 論理式／Δ 論理式 | Σ₁ 論理式 | 田中・新井 |
| pterm | PA で関数的な論理式 | 擬似項 | Boolos の用語の訳。本サイトの造語（未確認） |
| Gödel number / course-of-values recursion | ゲーデル数／累積再帰 | | 累積再帰は未確認 |
| Rosser sentence / realization | ロッサー文／算術的解釈 | | 田中「ロッサー文」 |
| always provable / always true | 常に証明可能／常に真 | | 未確認 |
| (first-order) language / signature | （一階の）言語（げんご） | 語彙 | 新井・藤田F で一般的 |
| arity | 項数（こうすう） | アリティ（藤田F 12） | 新井 17、菊池 13、田中 2 |
| relation symbol / predicate symbol | 関係記号（かんけいきごう） | 述語記号 | 新井 81。述語記号は藤田F 19、菊池 14 |
| function symbol | 関数記号（かんすうきごう） | 函数記号（藤田F） | 新井 90、田中 41 |
| sentence / closed formula | 文（ぶん） | 閉論理式 | 藤田F「文」。閉論理式は新井 166 |
| assignment | 割り当て（わりあて） | 付値 | 藤田F 35、菊池 25、田中 20。付値は新井 30、菊池 36 |
| unique readability | 読み方の一意性（よみかたのいちいせい） | 一意可読性 | 藤田F「読み方の一意性」 |
| substitutable / free for | 代入可能（だいにゅうかのう） | 自由に代入できる | 藤田F「代入される項が自由であれば」。本サイトは代入可能で統一 |
| natural deduction | 自然演繹（しぜんえんえき） | | 手元の日本語の本に 0 回（どの本も自然演繹を扱っていない）。訳語の出典確認は未了 |
| discharge (an assumption) | （仮定を）解消する（かいしょう） | 落とす | ユーザーが確定（2026-09-28）。「仮定を落とす」は新井 1・藤田 1 |
| eigenvariable condition | 固有変数条件（こゆうへんすうじょうけん） | | 新井 10（固有変数） |
| satisfaction / satisfy | 充足（じゅうそく）／充足する | | 新井 95、菊池 49 |
| logical consequence | 論理的帰結（ろんりてききけつ） | | |
| reduct / expansion | 縮小（しゅくしょう）／拡大（かくだい） | | 縮小は新井 16・藤田F 9（「M' の L への縮小」）。膨張は手元の本に 0 回なので使わない |
| consistent | 無矛盾（むむじゅん） | | |
| Robinson's (joint) consistency theorem | ロビンソンの統合無矛盾性定理（とうごうむむじゅんせいていり） | 結合無矛盾性定理 | ユーザーが確定（2026-09-28） |
| inseparable (pair of theories) | 分離不能（ぶんりふのう） | | 未確認。本サイトの約束 |
| Henkin axiom / witness | ヘンキン公理／証拠（しょうこ） | 証人 | 証拠はユーザーが確定（2026-09-28） |
| ultrafilter / principal / nonprincipal | 超フィルター／単項／非単項 | 自由超フィルター | 新井 69、藤田 12 |
| ultraproduct / ultrapower / reduced product | 超積／超冪（ちょうべき）／被約積 | | 超積：新井 20。超冪・被約積は本に例なし（未確認） |
| Łoś's theorem | ウォシュの定理 | | 藤田F の「ウォシュ–ヴォート条件」から表記を採った |
| elementary equivalence | 初等的同値 | 初等同値 | 新井 12、藤田F 9（「初等同値」は新井 3） |
| substructure / elementary substructure / elementary extension | 部分構造／初等部分構造／初等拡大 | 初等部分モデル（新井 17、藤田F 14。理論のモデルを指す文脈） | 初等部分構造：藤田F 3、初等拡大：新井 34 |
| (elementary) embedding | （初等）埋め込み | 初等的埋め込み | 本に例なし（未確認） |
| elementary diagram | 初等図式 | | 本に例なし（未確認） |
| Tarski–Vaught test | タルスキ–ヴォートの判定法 | | 本に例なし（未確認） |
| Skolem function | スコーレム関数 | | 藤田 5、田中 3 |
| prime formula / prime sentence | 素論理式／素文（そぶん） | | 素論理式：新井 18（命題変数の意味）。素文は類推（未確認） |
| term model | 項モデル（こうもでる） | | 藤田F 5、田中 2 |
| truth lemma | 真理補題（しんりほだい） | | 菊池 4 |
| maximal consistent | 極大無矛盾（きょくだいむむじゅん） | | 藤田F 10、新井 6 |
| soundness theorem | 健全性定理（けんぜんせいていり） | | |
| completeness theorem | 完全性定理（かんぜんせいていり） | | |
| compactness theorem | コンパクト性定理 | | 藤田 |
| trace (of a letterless sentence) | トレース（とれーす） | 跡 | 仮。Boolos 7 章 |
| constant sentence | 定数文（ていすうぶん） | | 仮。Boolos 7 章（Friedman） |
| rank of a world | （世界の）ランク | 高さ（height） | 集合論のランクと同じ語を使う |
| normal form (letterless) | 標準形（ひょうじゅんけい） | | |
| iterated consistency assertion | 反復無矛盾性（の主張）（はんぷくむむじゅんせい） | | 仮。Boolos 7 章 |
| modalized in p | p について様相化されている | | 仮。Boolos 8 章 |
| fixed point (GL) | 不動点（ふどうてん） | | |
| A-trace | A-トレース | | 仮。Boolos 8 章 |
| m-character | m-キャラクター | | 仮。Boolos 8 章 |
| inseparable (set) | 分離不能（ぶんりふのう） | | 仮。Boolos 8 章（補間定理の証明） |
| Solovay sentence | ソロヴェイ文 | | 仮 |
| Sigma realization | Σ 解釈 | | 仮。Boolos 9 章（Visser） |
| converse weakly well-founded | 逆弱整礎（ぎゃくじゃくせいそ） | | 仮。EX-01 |
| antisymmetric | 反対称的（はんたいしょうてき） | | |
| truth-translation | 真理付きの翻訳 | | 仮。EX-01 |
| boxdot translation | ⊡ 翻訳 | splitting translation | 仮。EX-01 |
| omega-provable | ω 証明可能（おめがしょうめいかのう） | | 仮。EX-04 |
| omega-axiom | ω 公理 | | 仮。EX-04（PA⁺ の公理） |
| Dzhaparidze | ジャパリゼ | | |
| Ignatiev | イグナチェフ | | |
| hereditarily of cardinality < κ | 遺伝的に濃度 κ 未満（いでんてきにのうどかっぱみまん） | | 藤田訳 IV §6。IV-04 |
| hereditarily finite / countable | 遺伝的に有限／遺伝的に可算 | | 藤田訳 IV §6 |
| Grothendieck universe | グロタンディーク宇宙 | | 仮。IV-04 補足 |
| relative interpretation | 相対解釈 | | 仮。IV-06 |
| finitistic | 有限的 | | 仮。IV-06 |
| omega-model | ω モデル | | 仮。IV-06 |
| subformula closed | 部分論理式で閉じた | | 仮。IV-05 |
| ordinal definable | 順序数定義可能（じゅんじょすうていぎかのう） | | 藤田訳 V §2 |
| hereditarily ordinal definable | 遺伝的に順序数定義可能 | | 藤田訳 V §2 |
| elementarily included / elementary submodel | 初等的に含まれる／初等部分構造 | | V-01 |
| elementarily equivalent | 初等的に同値 | | V-01 |
| definable power set | 定義可能な冪集合 | | VI-01 |
| constructible | 構成可能（こうせいかのう） | | 藤田訳 VI |
| axiom of constructibility | 構成可能性公理 | | 藤田訳 VI §3 |
| condensation | 凝縮 | | 仮。VI-03 |
| forcing | 強制法（きょうせいほう） | | 藤田訳 VII |
| generic | ジェネリック | | 藤田訳 VII |
| ground model | 基礎モデル | | 藤田訳 VII |
| name | 名前 | | 藤田訳 VII |
| nice name | よい名前 | | 仮。VII-04 |
| preserve cardinals / cofinalities | 基数を保つ／共終数を保つ | | VII-04 |
| collapse | 崩壊させる | | VII-04 |
| iterated forcing | 反復強制 | | 仮。VIII-05 |
| two-step iteration P * π | 二段階反復 | | 仮。VIII-05 |
| P-name for a partial order | p.o. の名前 | | 仮。VIII-05 |
| support (of a condition) | 台 | | VIII-05 |
| finite / countable support iteration | 有限台反復／可算台反復 | | 仮。VIII-05 |
| full limit | 完全極限 | | 仮。VIII-05 |
| reverse (backwards) Easton forcing | 逆イーストン強制 | | 仮。VIII-05 |
| bookkeeping (function) | 帳簿付け（の関数） | | 仮。VIII-06 |
| full for ≤ω-sequences (name) | ω 列について充満 | | 仮。VIII-07 |
| almost disjoint sets p.o. (on ω₁) | 概素集合の p.o. | | VIII-07 |
| transitive model (of ZF) | 推移的モデル | | EX-02 |
| universe (R(κ), κ inaccessible) | 宇宙 | | 仮。EX-02 |
| finite prewellordering | 有限前整列 | | 仮。EX-02 |
| finite strict linear ordering | 有限狭義全順序 | | 仮。EX-02 |
| piecewise connected | 区分的連結 | | 仮。EX-02 |
| analysis (second-order arithmetic) | 解析学（二階算術） | | EX-03 |
| ω-rule | ω 規則 | | EX-03 |
| constructive ordinal notations O | 構成的順序数の記法系 | | 仮。EX-03 |
| α-equivalence | α 同値（あるふぁどうち） | | 田中編（α同値）。SQ-01 |
| transposition (of variables), swap | 互換（変数の） | | SQ-01 |
| sequent | シーケント | | SQ-02 |
| antecedent / succedent | 前件 / 後件 | | SQ-02 |
| initial sequent | 初期シーケント | | 仮。菊池編は「始式」。SQ-02 |
| principal formula | 主論理式 | | 新井。SQ-02 |
| eigenvariable | 固有変数 | | 新井。SQ-02 |
| (height-preserving) admissible | （高さを保って）許容的 | | 仮。SQ-02 |
| weakening / contraction | 弱化 / 縮約 | | SQ-02 |
| inversion lemma | 反転補題 | | 仮。SQ-02 |
| cut, cut formula | カット、カット論理式 | | SQ-03 |
| cut elimination theorem (Hauptsatz) | カット除去定理（基本定理） | | SQ-03 |
| subformula property | 部分論理式性 | | SQ-03 |
| Hilbert-style system | ヒルベルト流の体系 | | 菊池編。SQ-04 |
| partition (split) of a sequent | シーケントの分割 | | 仮。SQ-05 |
| Maehara's method / lemma | 前原の方法 / 前原の補題 | | SQ-05 |
| derived rule | 派生規則 | | 仮。SQ-05 |
| amalgamation property | 融合性 | | 仮。SQ-05 |
| polyadic algebra / cylindric algebra | 多進代数 / 円柱代数 | | 仮。SQ-05（Halmos『Algebraic Logic』を扱うときに再検討） |
| implicitly / explicitly definable | 暗に定義される / 明示的に定義される | | 仮。SQ-06 |
| Padoa's method | パドアの方法 | | SQ-06 |
| diagram (atomic diagram) | 図式（原子図式） | | 仮。MT-02 |
| chain / elementary chain | 鎖 / 初等鎖 | | MT-02 |
| preservation theorem | 保存定理 | | MT-02 |
| universal / existential / ∀∃ sentence | 全称文 / 存在文 / 全称存在文 | | 仮。MT-02 |
| quantifier elimination | 量化子消去 | | 新井は「量化記号消去」。サイトは「量化子」で統一。MT-03 |
| model complete | モデル完全 | | MT-03 |
| dense linear order without endpoints | 端点のない稠密線形順序 | | MT-03 |
| literal | リテラル | | MT-03 |
| type / complete type / realize / omit | 型 / 完全型 / 実現する / 省略する | | 板井。MT-05 |
| isolated (principal) type | 孤立した型 | | MT-05 |
| omitting types theorem | 型の省略定理 | | MT-05 |
| atomic model / prime model | 原子モデル / 素モデル | | MT-06 |
| ω-categorical | ω 範疇的 | | 新井（κ-範疇的）。MT-06 |
| back-and-forth | 往復論法 | | MT-06 |
| κ-saturated / saturated model | κ 飽和 / 飽和モデル | | 新井。MT-07 |
| type over A | A 上の型 | | MT-07 |
| indiscernible sequence | 識別不能列 | | 仮。MT-08 |
| Skolemization / Skolem hull | スコーレム化 / スコーレム包 | | 仮。MT-08 |
| homogeneous set (Ramsey) | 等質集合 | | 仮。MT-08 |
| countably incomplete ultrafilter | 可算不完全な超フィルター | | 仮。MT-10 |
| alphabet / string / language | アルファベット / 文字列 / 言語 | | CA-01 |
| (deterministic / nondeterministic) finite automaton | （決定性 / 非決定性）有限オートマトン | | CA-01 |
| regular language / regular operations | 正規言語 / 正規演算 | | CA-01 |
| subset construction | 部分集合構成 | | 仮。CA-01 |
| accept / recognize | 受理する / 認識する | | CA-01 |
| regular expression / Kleene's theorem | 正規表現 / クリーネの定理 | | CA-02 |
| pumping lemma / pumping length | 反復補題 / 反復長 | | 仮（「ポンプの補題」とも）。CA-03 |
| context-free grammar / language | 文脈自由文法 / 文脈自由言語 | | CA-04 |
| variable / terminal / rule / derivation | 変数 / 終端記号 / 規則 / 導出 | | CA-04 |
| Chomsky normal form | チョムスキー標準形 | | CA-04 |
| pushdown automaton / stack | プッシュダウンオートマトン / スタック | | CA-04 |
| configuration (instantaneous description) | 時点表示 | | 仮。CA-04 |
| parse tree / yield | 導出木 / 収穫 | | 仮。CA-05 |
| Turing machine / configuration | チューリング機械 / 時点表示 | | CT-01 |
| Turing-recognizable / decidable / decider | チューリング認識可能 / 決定可能 / 判定機 | | 仮（Sipser 訳では「判定可能」も）。CT-01 |
| enumerator | 列挙機 | | 仮。CT-01 |
| Church–Turing thesis | チャーチ–チューリングの提唱 | | CT-01 |
| universal Turing machine | 万能チューリング機械 | | CT-02 |
| halting problem | 停止問題 | | CT-02 |
| diagonalization | 対角線論法 | | CT-02 |
| reducibility / reduction | 還元可能性 / 還元 | | CT-03 |
| Rice's theorem | ライスの定理 | | CT-03 |
| linear bounded automaton | 線形有界オートマトン | | CT-03 |
| computation history | 計算履歴 | | 仮。CT-03 |
| mapping reducibility / computable function | 写像還元 / 計算可能関数 | | 仮（多対一還元とも）。CT-04 |
| Post correspondence problem | ポストの対応問題 | | CT-04 |
| co-Turing-recognizable | 補認識可能 | | 仮。CT-04 |
| recursion theorem / fixed-point theorem | 再帰定理 / 不動点定理 | | CT-05 |
| decidable theory / Presburger arithmetic | 決定可能な理論 / プレスブルガー算術 | | CT-06 |
| oracle Turing machine / Turing reducibility / jump | 神託機械 / チューリング還元 / ジャンプ | | 仮。CT-07 |
| arithmetical hierarchy | 算術的階層 | | 新井。CT-07 |
| Kleene normal form | クリーネの標準形 | | CT-07 |
| Kolmogorov complexity / incompressible | 記述の複雑さ（コルモゴロフ複雑性）/ 非圧縮 | | 仮。CT-08 |
| quantified modal logic / realization | 量化様相論理 / 実現 | | 仮。QU-01 |
| always provable / always true | 常に証明可能 / 常に真 | | PL 系列と同じ。QU-01 |
| Barcan formula | バーカン式 | | QU-01 |
| truth set | 真理集合 | | 仮。QU-01 |
| programming language L / while program | プログラミング言語 L / while プログラム | | CL-01 |
| for program (LOOP program) | for プログラム | | CL-01 |
| primitive recursive function | 原始再帰関数 | | CL-02 |
| bounded minimization | 有界最小化 | | CL-02 |
| Ackermann function | アッカーマン関数 | | CL-03 |
| partial recursive / general recursive function | 部分再帰関数 / 一般再帰関数 | | CL-04 |
| minimization (μ-operator) | 最小化（μ 作用素） | | CL-04 |
| fuel (step-indexed) semantics | 燃料つきの実行 | 本サイトの用語 | CL-04 |
| register machine | レジスタ機械 | | CL-05 |
| program counter | プログラムカウンタ | | CL-05 |
| Kleene T predicate / normal form theorem | クリーネの T 述語 / 標準形定理 | | CL-06 |
| smn theorem | smn 定理 | | CL-06 |
| universal function / program | 万能関数 / 万能プログラム | | CL-06 |
| Turing complete / Turing equivalent | チューリング完全 / チューリング同値 | | CL-07 |
| representable (in PA) | 表現可能 | | CL-08 |
| semidecidable | 半決定可能 | | CL-08 |
| Arden's lemma | アーデンの補題 | | CA-02 |
| Knaster–Tarski theorem | クナスター–タルスキの定理 | | CA-06 |
| contraction (contracting map) | 縮小写像（縮小的） | | CA-06 |
| verifier / certificate | 検証機 / 証明書 | | CC-02 |
| NP-complete / NP-hard | NP 完全 / NP 困難 | | CC-02 |
| Tseitin transformation | ツァイティン変換 | | CC-02 |
| space constructible / time constructible | 領域構成可能 / 時間構成可能 | | CC-06 |
| relativization | 相対化 | | CC-06 |
| probabilistic Turing machine | 確率的チューリング機械 | | CC-07 |
| qubit / quantum circuit | 量子ビット / 量子回路 | | CC-07 |
| amplitude / interference | 振幅 / 干渉 | | CC-07 |
| prefix-free complexity | 接頭辞なし複雑性（記号 H） | 文献では K | KR-01 |
| Kraft inequality / Kraft–Chaitin theorem | クラフトの不等式 / クラフト–チャイティンの定理 | | KR-01 |
| Martin-Löf test / randomness | マルチン＝レーフ検定 / ランダムネス | | KR-02 |
| halting probability (Ω) | 停止確率（チャイティンの Ω） | | KR-02 |
| second-order arithmetic / RCA₀, WKL₀, ACA₀ | 二階算術 / RCA₀, WKL₀, ACA₀ | | SOA-01 |
| weak König's lemma / König's lemma | 弱ケーニッヒの補題 / ケーニッヒの補題 | 田中はケーニヒ | RM-02, RM-03 |
| Σ⁰₁ separation | Σ⁰₁ 分離原理 | | RM-02 |
| bounded Σ⁰₁ comprehension | 有界 Σ⁰₁ 内包公理 | | RM-03 |
| finitely branching tree | 有限分岐木 | | RM-03 |
| Bolzano–Weierstrass theorem | ボルツァーノ–ワイエルシュトラスの定理 | | RM-03 |
| homogeneous set | 等質集合 | | RM-04 |
| Ramsey's theorem (RTᵏₗ) | ラムゼーの定理 | 田中はラムゼイ | RM-04 |
| Erdős–Rado tree / pre-homogeneous | エルデシュ–ラドーの木 / 前等質 | | RM-04 |
| Cantor normal form | カントール標準形 | | OA-01 |
| epsilon number / ε₀ | ε 数 / ε₀ | | OA-01 |
| ordinal notation system | 順序数表記（系） | | OA-01 |
| omega-rule / omega-logic | ω 規則 / ω 論理 | | OA-02 |
| inversion lemma / reduction lemma | 反転補題 / 簡約補題 | | OA-02 |
| progressive | 前進的 | | OA-03 |
| boundedness lemma | 限界補題 | | OA-03 |
| proof-theoretic ordinal | 証明論的順序数 | | OA-04 |
| Gentzen's jump | ゲンツェンの跳躍（跳躍論理式 j[A]） | | OA-04 |
| fundamental sequence | 基本列 | | OA-05 |
| Hardy hierarchy | ハーディ関数（ハーディ階層） | | OA-05 |
| Goodstein sequence | グッドスタイン列 | | OA-05 |
| semi-regular cut | 半正則切断 | | SOA-05 |
| generic filter / generic path | ジェネリックなフィルター / ジェネリックな道 | | SOA-04 |
| computable (recursive) ordinal | 計算可能順序数（けいさんかのうじゅんじょすう） | 帰納的順序数（新井）、再帰的順序数 | サイトは computable＝計算可能で統一。別訳は index に入れた。comp:page-boundedness |
| Church–Kleene ordinal ω₁^CK | チャーチ–クリーネ順序数 | | 新井「Church-Kleene ω₁」 |
| Kleene–Brouwer order | クリーネ–ブラウワー順序 | ルジン–シェルピンスキー順序 | 仮 |
| (Spector's) boundedness theorem | （スペクターの）有界性定理 | | 新井「Σ¹₁‑整礎木の有界性定理」 |
| height of a well-founded tree | （木の）深さ | 高さ | 新井「深さ」。節点のランクはランク |
| category / object / morphism (arrow) | 圏 / 対象 / 射 | | レンスター訳 |
| domain / codomain (of a morphism) | 定義域 / 余域（よいき） | レンスター訳は「値域」 | 集合論の値域（range）と紛れるので余域とした。仮・ユーザー確認待ち。CB-01 |
| identity morphism | 恒等射 | | レンスター訳 |
| locally small | 局所小 | | レンスター訳 |
| groupoid | 亜群（あぐん） | | 仮 |
| isomorphism / inverse | 同型射 / 逆射 | | レンスター訳 |
| monic / epic | モノ射 / エピ射 | モノ、エピ | レンスター訳 |
| full / faithful / fully faithful | 充満 / 忠実 / 充満忠実 | | レンスター訳 |
| (Grothendieck) universe | 宇宙 | | |

| syntactic category / classifying category | 構文圏 | 分類圏 | 仮。日本語の本（terms.py の対象）に用例なし。logic:page-lambek |
| internal language | 内部言語 | | 仮。用例なし。logic:page-lambek |
| generic model | 標準モデル | 総称モデル | 仮。用例なし。logic:page-lambek |
| unit type / product type | 単位型 / 積型 | 直積型 | 仮。用例なし。logic:page-ccc-semantics |
| lambda theory / equation in context | λ 理論 / 文脈つき等式 | | 仮。用例なし。logic:page-ccc-semantics |
| strict cartesian closed functor | 厳密なデカルト閉関手 | | 仮。logic:page-lambek |
| dependent function type (Pi type) / dependent pair type (Sigma type) | Π 型（依存関数型） / Σ 型（依存対型） | 依存積 / 依存和 | 仮。日本語の本に用例なし。logic:page-dependent-types |
| judgmental (definitional) equality | 判断上の等しさ | 定義的等しさ | 仮。logic:page-dependent-types |
| type family / induction principle | 型の族 / 帰納原理 | | 仮。logic:page-dependent-types |
| universe (type theory) | 宇宙 | | 集合論・圏論の「宇宙」と同じ語。logic:page-dependent-types |
| identity type / path / path induction | 恒等型 / 道 / 道帰納法 | 同一性型 | 仮。日本語の本に用例なし。logic:page-identity-types |
| transport / homotopy / function extensionality | 輸送 / ホモトピー / 関数外延性 | | 仮。logic:page-identity-types |
| contractible / uniqueness of identity proofs | 可縮 / 恒等の証明の一意性（UIP） | | 可縮は位相の用語と同じ。logic:page-identity-types |
| equivalence (of types) / bi-invertible / quasi-inverse | 同値 / 両側逆 / 擬逆 | | 仮。logic:page-hott |
| univalence axiom | 一価性公理 | 単一性公理 | 仮。日本語の本に用例なし（日本語の文献では「一価性公理」が使われているとされる。未確認）。logic:page-hott |
| mere proposition / set / h-level | 命題 / 集合 / h レベル | ホモトピー段数 | 仮。logic:page-hott |
| higher inductive type | 高次帰納型 | | 仮。logic:page-hott |
| monad / comonad | モナド / 余モナド | トリプル | モナドはレンスター訳。余モナドはサイトの「余単位」「余極限」に合わせた（仮）。cat:page-monads |
| algebra for a monad / Eilenberg–Moore category | T 代数 / アイレンバーグ–ムーア圏 | | 仮。cat:page-monads |
| comparison functor / monadic | 比較関手 / モナド的 | | 仮。cat:page-monads |
| Kleisli category | クライスリ圏 | | 仮。cat:page-monads |
| fork / split fork / split coequalizer / absolute coequalizer | フォーク / 分裂フォーク / 分裂余等化子 / 絶対余等化子 | | 仮。cat:page-beck |
| create (co)limits | 創出する | | 既存（cat:create-limits） |
| variety / (Omega,E)-algebra / term algebra | 多様体 / (Ω,E) 代数 / 項代数 | 代数系 | 仮。cat:page-monadic-examples |
| ultrafilter monad | 超フィルターのモナド | | 仮。cat:page-monadic-examples |
| Stone space / clopen set / zero-dimensional / field of sets | ストーン空間 / 閉開集合 / 零次元 / 集合体 | 開閉集合 | 仮。top:page-stone-duality |
| Niemytzki plane (Moore plane) / Jones' lemma | ニェミツキ平面（ムーア平面） / ジョーンズの補題 | | 既存ページの予約ラベルの表記に合わせた。top:page-niemytzki |
| monoidal category / associator / unitor / coherence | モノイダル圏 / 結合子 / 単位子 / コヒーレンス | | 仮。cat:page-monoidal |
| monoid (object) in a monoidal category / tensor algebra / action | （モノイダル圏の）モノイド / テンソル代数 / 作用 | モノイド対象 | 仮。cat:page-monoids-in-monoidal |
| simplicial category / face / degeneracy / simplicial set / nerve | 単体圏 / 面写像 / 退化写像 / 単体的集合 / 神経 | | 仮。cat:page-simplicial |
| symmetric monoidal / closed category / internal hom / enriched category | 対称モノイダル圏 / 閉圏 / 内部 hom / 豊穣圏 | V 圏 | 仮。cat:page-closed-categories |
| compactly generated / k-ification / compact-open topology | コンパクト生成 / ケリー化 / コンパクト開位相 | | 仮。cat:page-closed-categories |
| zero arrow / kernel / cokernel / Ab-category (preadditive) / biproduct / additive category | 零射 / 核 / 余核 / 前加法圏（Ab 圏） / 双積 / 加法圏 | | 仮。ha:page-additive |
| abelian category / image / coimage / exact sequence / short exact / left exact | アーベル圏 / 像 / 余像 / 完全列 / 短完全列 / 左完全 | | 標準的な訳語。ha:page-abelian |
| member / five lemma / snake lemma / connecting morphism | メンバー / 五項補題 / 蛇の補題 / 連結射 | | 五項補題・蛇の補題は標準的。メンバーは仮。ha:page-diagram-lemmas |
| filtered category / filtered colimit / final functor | フィルター付き圏 / フィルター付き余極限 / 終関手 | 共終 | 仮。cat:page-filtered-colimits |
| wedge / end / coend / dinatural | 楔 / エンド / コエンド / 対角自然 | 超自然変換 | 仮。cat:page-ends |
| co-Yoneda lemma / geometric realization | 余米田の補題 / 幾何学的実現 | | 仮。cat:page-ends |
| Kan extension (right/left) / pointwise | カン拡張（右／左） / 各点 | | 標準的。cat:page-kan |
| copower / power / dense / absolute Kan extension | 余冪 / 冪 / 稠密 / 絶対カン拡張 | テンソル・コテンソル | 仮。cat:page-pointwise-kan |
| monoidal functor (lax / strong / strict) / monoidal natural transformation / strictification | モノイダル関手（緩い／強／厳密） / モノイダル自然変換 / 厳密化 | ラックス | 強・厳密は標準的。厳密化は仮。cat:page-monoidal-functors |
| braided monoidal category / braiding / hexagon / Yang–Baxter equation | 組紐モノイダル圏 / 組紐 / 六角形の等式 / ヤン–バクスター方程式 | 組みひも、ブレイド | 「組紐」で統一（既存ページの「組みひも」は補足中の表現）。cat:page-symmetric-coherence |
| Coxeter presentation / adjacent transposition / labelled word | 対称群の生成元と関係 / 隣接互換 / 番号つき語 | | 番号つき語は仮。cat:page-symmetric-coherence |
| braid group / pure braid group / braid category / underlying braid | 組紐群 / 純組紐群 / 組紐圏 / 道の組紐 | ブレイド群 | 組紐群・純組紐群は標準的。道の組紐は仮。cat:page-braids |
| internal category / internal functor / internal diagram (left C-object) / nerve | 内部圏 / 内部関手 / 内部の図式（左 C 対象） / 神経 | 圏対象 | 内部圏・神経は標準的。内部の図式は仮。cat:page-internal-categories |
| 2-category / 2-cell / whiskering / middle four interchange / 2-functor / 2-natural transformation / modification | 2 圏 / 2 射 / ひげ付け / 中央四つの交換 / 2 関手 / 2 自然変換 / 変形 | 2 セル | 2 射・変形・中央四つの交換は仮。cat:page-2-categories |
| bicategory / span / bimodule / monad in a bicategory / lax functor | 双圏 / スパン / 両側加群 / 双圏の中のモナド / 緩い関手 | 弱 2 圏 | 双圏・スパンは標準的。緩い関手は仮。cat:page-bicategories |
| crossed module / Peiffer identity / precrossed module / reflexive graph / cat-group | 交差加群 / パイエルの等式 / 前交差加群 / 反射的グラフ / 群の中の圏 | 厳密 2 群 | 交差加群は標準的。他は仮。cat:page-crossed-modules |
| topology of pointwise convergence / compact-open topology / topology of uniform convergence / uniform convergence on compacta | 各点収束位相 / コンパクト開位相 / 一様収束位相 / コンパクト集合上の一様収束（広義一様収束） | | 標準的。top:page-function-space-topologies |
| exponential map / evaluation map / exponential law | 指数写像 / 評価写像 / 指数法則 | カリー化 | 指数写像は小山の用語。top:page-exponential-law |
| equicontinuous / uniformly equicontinuous / relatively compact / Ascoli–Arzelà theorem | 同等連続 / 一様同等連続 / 相対コンパクト / アスコリ–アルツェラの定理 | | 標準的。top:page-ascoli |
| hyperspace / Hausdorff metric / Vietoris topology | 超空間 / ハウスドルフ距離 / ヴィートリス位相 | | 標準的。top:page-hyperspaces |
| iterated function system / attractor / self-similar set / Hutchinson operator | 反復関数系 / アトラクター / 自己相似集合 / ハッチンソンの定理 | | 標準的。top:page-fractals |
| kappa-stable / omega-stable / categorical in kappa | κ 安定 / ω 安定 / κ 範疇的 | | 標準的。model:page-stability |
| prime model over a set / constructible / atomic over A / (κ,λ)-model | （A 上の）素モデル / 構成可能 / A 上原子的 / (κ,λ) モデル（二基数モデル） | | 構成可能・二基数モデルは仮。model:page-omega-stable |
| Vaughtian pair / two-cardinal theorem / homogeneous model / relativization | ヴォート対 / 二基数定理 / 均質モデル / 相対化 | ヴォート的対 | 仮。model:page-vaught-pairs |
| algebraic closure / minimal formula / strongly minimal / elimination of ∃^∞ | 代数的閉包 / 極小な論理式 / 強極小 / ∃^∞ の消去（一様有限性） | | 強極小は標準的。model:page-strongly-minimal |
| exchange / independent / basis / dimension / pregeometry | 交換法則 / 独立 / 基底 / 次元 / 前幾何（マトロイド） | | 前幾何は仮。model:page-dimension |
| Baldwin–Lachlan theorem / Morley's categoricity theorem | ボールドウィン–ラクランの定理 / モーリーの範疇性定理 | | 標準的。model:page-morley |
| Boolean circuit / size / depth / CIRCUIT-SAT / P/poly | ブール回路 / 大きさ / 深さ / 回路の充足可能性 / P/poly | | 標準的。comp:page-circuits |
| alternating Turing machine / universal state / existential state / polynomial hierarchy | 交代チューリング機械 / 全称状態 / 存在状態 / 多項式階層 | 交替 | 「交代」で統一。comp:page-alternation |
| interactive proof / prover / verifier / arithmetization / IP = PSPACE | 対話証明系 / 証明者 / 検証者 / 算術化 / シャミアの定理 | 対話型証明 | 仮。comp:page-interactive-proofs |
| uniform circuit family / NC / P-complete / CIRCUIT-VALUE | 一様な回路族 / NC / P 完全 / 回路値問題 | | 標準的。comp:page-parallel |
| approximation algorithm / approximation ratio / one-time pad / perfect secrecy / one-way function / trapdoor function | 近似アルゴリズム / 近似比 / ワンタイムパッド / 完全秘匿 / 一方向関数 / 落とし戸関数 | k-optimal, 落とし扉関数 | 「落とし戸」で統一。comp:page-approx-crypto |
| comonad / augmented simplicial object / bar resolution / contracting homotopy / crossed homomorphism / group cohomology | 余モナド / 添加単体的対象 / 棒分解 / 可縮ホモトピー / 交叉準同型 / 群のコホモロジー | コモナド、拡大単体的対象、バー分解 | 仮。cat:page-comonads-homology |
| initial topology as right adjoint / Hausdorff reflection / collapsing a subspace | 始位相と随伴 / ハウスドルフ化 / 部分集合のつぶし | 最大ハウスドルフ商 | 仮。cat:page-adjoints-topology |
| smash product / wedge / reduced suspension / loop space | スマッシュ積 / ウェッジ和 / （被約）懸垂 / ループ空間 | | 標準的。cat:page-loops-suspensions |
| subobject / well-powered / generator (separator) / cogenerator / special adjoint functor theorem | 部分対象 / よく冪をもつ / 生成集合 / 余生成集合（余生成対象） / 特殊随伴関手定理 | 整冪、分離集合 | 仮。cat:page-special-aft |
| compositeness witness / Carmichael number / branching program / read-once branching program | 合成数の証人 / カーマイケル数 / 分岐プログラム / 一回読み分岐プログラム | 決定図 | 仮。comp:page-primality-branching |
| deterministic pushdown automaton / deterministic context-free language / looping pair | 決定性プッシュダウンオートマトン / 決定性文脈自由言語 / ループする組 | | 標準的（ループする組は仮）。comp:page-dcfl |
| uniformity / entourage / uniform space / uniformly continuous / initial uniformity | 一様構造 / 近縁 / 一様空間 / 一様連続 / 始一様構造 | 近縁＝エントラージュ、一様近傍 | 「近縁」は仮。top:page-uniform-spaces |
| pseudometric / metrization lemma / uniformizable | 擬距離 / 距離化補題 / 一様化可能 | | 標準的。top:page-uniform-pseudometrics |
| Cauchy filter / complete uniform space / totally bounded / completion | コーシーフィルター / 完備（一様空間） / 全有界 / 完備化 | | 標準的。top:page-uniform-completeness |
