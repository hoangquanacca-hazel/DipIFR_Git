import { Flashcard, QuizQuestion, PracticeQuestion, MockExamDef, Module } from '../types';

// --- COMPREHENSIVE MOCK DATABASE FOR IAS STANDARDS ---

const SAMPLE_FLASHCARDS_DB: Flashcard[] = [
  // --- IAS 1: Presentation of Financial Statements (m_ias1) ---
  { id: 'fc_ias1_01', moduleId: 'm_ias1', taxonomy: 'Remember', front: 'What comprises a complete set of financial statements?', back: 'SOFP, SPLOCI, SOCE, Cash Flows, Notes, Comparative info, and a 3rd SOFP (if retrospective application/restatement occurs).' },
  { id: 'fc_ias1_02', moduleId: 'm_ias1', taxonomy: 'Understand', front: 'What is the "Going Concern" assumption?', back: 'FS are prepared assuming the entity will continue in operation for at least 12 months. If not, must use break-up basis.' },
  { id: 'fc_ias1_03', moduleId: 'm_ias1', taxonomy: 'Apply', front: 'When is a liability classified as "Current"?', back: '1. Settled in normal operating cycle.\n2. Held for trading.\n3. Due within 12 months.\n4. No unconditional right to defer >12 months.' },
  { id: 'fc_ias1_04', moduleId: 'm_ias1', taxonomy: 'Analyze', front: 'Treatment of long-term loan with covenant breach at year-end?', back: 'Classify as CURRENT. Even if lender waives breach *after* year-end, the right to defer did not exist *at* year-end.' },
  { id: 'fc_ias1_05', moduleId: 'm_ias1', taxonomy: 'Remember', front: 'List 3 OCI items that are NEVER reclassified to P&L.', back: '1. Revaluation Surplus (IAS 16/38).\n2. Remeasurement of Defined Benefit Plans (IAS 19).\n3. FV changes in Equity Instruments (IFRS 9).' },
  { id: 'fc_ias1_06', moduleId: 'm_ias1', taxonomy: 'Apply', front: 'How are dividends on Redeemable Preference Shares presented?', back: 'In P&L as FINANCE COST (Interest), because the instrument is a Liability.' },
  { id: 'fc_ias1_07', moduleId: 'm_ias1', taxonomy: 'Evaluate', front: 'When is the "True and Fair Override" used?', back: 'Extremely rare cases where IFRS compliance misleads. Must disclose: nature of departure, reason, and financial impact.' },
  { id: 'fc_ias1_08', moduleId: 'm_ias1', taxonomy: 'Understand', front: 'Rules for offsetting Assets and Liabilities?', back: 'Not permitted unless required by a specific standard or reflecting the substance of the transaction.' },
  { id: 'fc_ias1_09', moduleId: 'm_ias1', taxonomy: 'Apply', front: 'Treatment of refinancing agreed AFTER the reporting period?', back: 'Disclose as non-adjusting event. Liability remains CURRENT at year-end.' },
  { id: 'fc_ias1_10', moduleId: 'm_ias1', taxonomy: 'Remember', front: 'Definition of Materiality?', back: 'Information is material if omitting/obscuring it could influence decisions of primary users. Depends on size and nature.' },

  // --- IAS 2: Inventories (m_ias2) ---
  { id: 'fc_ias2_01', moduleId: 'm_ias2', taxonomy: 'Remember', front: 'Measurement rule for Inventory?', back: 'Lower of Cost and Net Realizable Value (NRV).' },
  { id: 'fc_ias2_02', moduleId: 'm_ias2', taxonomy: 'Understand', front: 'Components of Inventory Cost?', back: 'Purchase price + Import duties + Transport/Handling + Conversion costs (Direct labor/overheads). Excludes refundable taxes.' },
  { id: 'fc_ias2_03', moduleId: 'm_ias2', taxonomy: 'Apply', front: 'How to allocate Fixed Production Overheads?', back: 'Based on NORMAL capacity of production facilities. Unallocated overheads are expensed.' },
  { id: 'fc_ias2_04', moduleId: 'm_ias2', taxonomy: 'Remember', front: 'Permitted Cost Formulas?', back: 'FIFO (First-In, First-Out) or Weighted Average. LIFO is PROHIBITED.' },
  { id: 'fc_ias2_05', moduleId: 'm_ias2', taxonomy: 'Analyze', front: 'Inventory bought on deferred settlement terms (e.g., interest-free credit)?', back: 'Recognize at cash price. Difference between paid amount and cash price is Interest Expense over the period.' },
  { id: 'fc_ias2_06', moduleId: 'm_ias2', taxonomy: 'Understand', front: 'Definition of NRV?', back: 'Estimated Selling Price less Estimated Costs of Completion less Estimated Costs to Sell.' },
  { id: 'fc_ias2_07', moduleId: 'm_ias2', taxonomy: 'Apply', front: 'Treatment of Abnormal Waste?', back: 'Excluded from cost of inventory. Recognized as expense in the period incurred.' },
  { id: 'fc_ias2_08', moduleId: 'm_ias2', taxonomy: 'Apply', front: 'Treatment of Storage Costs?', back: 'Expensed. Capitalized ONLY if necessary for the production process (e.g., maturing whisky).' },
  { id: 'fc_ias2_09', moduleId: 'm_ias2', taxonomy: 'Evaluate', front: 'Joint Products allocation?', back: 'Allocate conversion costs on rational/consistent basis (e.g., relative sales value at split-off).' },
  { id: 'fc_ias2_10', moduleId: 'm_ias2', taxonomy: 'Remember', front: 'Definition of Inventory (Service Provider)?', back: 'Labor and other costs of personnel directly engaged in providing the service (WIP).' },

  // --- IAS 7: Statement of Cash Flows (m_ias7) ---
  { id: 'fc_ias7_01', moduleId: 'm_ias7', taxonomy: 'Remember', front: 'Definition of Cash Equivalents?', back: 'Short-term, highly liquid investments convertible to known cash, insignificant risk of value change (<3 months).' },
  { id: 'fc_ias7_02', moduleId: 'm_ias7', taxonomy: 'Understand', front: 'Classification of Bank Overdrafts?', back: 'Included in Cash & Cash Equivalents if repayable on demand and part of cash management.' },
  { id: 'fc_ias7_03', moduleId: 'm_ias7', taxonomy: 'Apply', front: 'Classification of Interest Paid?', back: 'Operating OR Financing (Must be consistent). DipIFR often treats as Financing.' },
  { id: 'fc_ias7_04', moduleId: 'm_ias7', taxonomy: 'Apply', front: 'Classification of Dividends Received?', back: 'Operating OR Investing.' },
  { id: 'fc_ias7_05', moduleId: 'm_ias7', taxonomy: 'Analyze', front: 'Depreciation in Indirect Method?', back: 'Added back to Profit Before Tax (Non-cash expense).' },
  { id: 'fc_ias7_06', moduleId: 'm_ias7', taxonomy: 'Analyze', front: 'Profit/Loss on Disposal of PPE?', back: 'Removed from Operating (Non-cash adjustment). Cash proceeds shown in Investing.' },
  { id: 'fc_ias7_07', moduleId: 'm_ias7', taxonomy: 'Remember', front: 'Three headings of Cash Flow Statement?', back: '1. Operating Activities\n2. Investing Activities\n3. Financing Activities.' },
  { id: 'fc_ias7_08', moduleId: 'm_ias7', taxonomy: 'Apply', front: 'Treatment of Non-Cash Transactions (e.g., Share exchange)?', back: 'Excluded from Statement of Cash Flows. Disclosed in Notes.' },
  { id: 'fc_ias7_09', moduleId: 'm_ias7', taxonomy: 'Evaluate', front: 'Foreign Currency Cash Flows?', back: 'Recorded at exchange rate at date of cash flow. Unrealized FX gains/losses are NOT cash flows.' },
  { id: 'fc_ias7_10', moduleId: 'm_ias7', taxonomy: 'Understand', front: 'Taxes Paid classification?', back: 'Operating, unless specifically identified with Investing/Financing activities.' },

  // --- IAS 8: Policies, Estimates & Errors (m_ias8) ---
  { id: 'fc_ias8_01', moduleId: 'm_ias8', taxonomy: 'Remember', front: 'Definition of Accounting Policy?', back: 'Principles, bases, conventions, rules, and practices applied in preparing FS.' },
  { id: 'fc_ias8_02', moduleId: 'm_ias8', taxonomy: 'Understand', front: 'Treatment of Change in Accounting Policy?', back: 'Retrospective application. Adjust opening equity of earliest comparative period.' },
  { id: 'fc_ias8_03', moduleId: 'm_ias8', taxonomy: 'Understand', front: 'Treatment of Change in Accounting Estimate?', back: 'Prospective application. Recognize in P&L in current and future periods.' },
  { id: 'fc_ias8_04', moduleId: 'm_ias8', taxonomy: 'Analyze', front: 'Is changing Depreciation Method a Policy or Estimate change?', back: 'Change in ESTIMATE (re-assessment of consumption pattern). Prospective.' },
  { id: 'fc_ias8_05', moduleId: 'm_ias8', taxonomy: 'Analyze', front: 'Is changing Inventory method (FIFO to AVCO) a Policy or Estimate change?', back: 'Change in POLICY. Retrospective.' },
  { id: 'fc_ias8_06', moduleId: 'm_ias8', taxonomy: 'Remember', front: 'Treatment of Prior Period Errors?', back: 'Retrospective restatement of comparative figures.' },
  { id: 'fc_ias8_07', moduleId: 'm_ias8', taxonomy: 'Evaluate', front: 'When is a Policy change permitted?', back: '1. Required by IFRS.\n2. Results in reliable and more relevant information.' },
  { id: 'fc_ias8_08', moduleId: 'm_ias8', taxonomy: 'Apply', front: 'Impracticable to determine period-specific effects?', back: 'Apply change to the earliest period for which it is practicable.' },
  { id: 'fc_ias8_09', moduleId: 'm_ias8', taxonomy: 'Understand', front: 'Hierarchy for selecting policies (if no IFRS applies)?', back: '1. IFRS on similar issues.\n2. Conceptual Framework.\n3. Other setters (if consistent).' },
  { id: 'fc_ias8_10', moduleId: 'm_ias8', taxonomy: 'Remember', front: 'Disclosure for new IFRS issued but not effective?', back: 'Fact that it\'s not applied, and known/estimable relevant information on impact.' },

  // --- IAS 10: Events After Reporting Period (m_ias10) ---
  { id: 'fc_ias10_01', moduleId: 'm_ias10', taxonomy: 'Remember', front: 'Definition of Adjusting Event?', back: 'Events providing evidence of conditions that EXISTED at the reporting date.' },
  { id: 'fc_ias10_02', moduleId: 'm_ias10', taxonomy: 'Remember', front: 'Definition of Non-adjusting Event?', back: 'Events indicative of conditions that arose AFTER the reporting date.' },
  { id: 'fc_ias10_03', moduleId: 'm_ias10', taxonomy: 'Apply', front: 'Dividend declared after year-end?', back: 'Non-adjusting. Do NOT recognize liability. Disclose in notes.' },
  { id: 'fc_ias10_04', moduleId: 'm_ias10', taxonomy: 'Analyze', front: 'Customer bankruptcy after year-end (balance overdue at YE)?', back: 'Adjusting. Confirms asset was impaired at reporting date.' },
  { id: 'fc_ias10_05', moduleId: 'm_ias10', taxonomy: 'Apply', front: 'Fire destroying inventory after year-end?', back: 'Non-adjusting. Disclose nature and financial effect.' },
  { id: 'fc_ias10_06', moduleId: 'm_ias10', taxonomy: 'Analyze', front: 'Sale of inventory below cost after year-end?', back: 'Adjusting. Provides evidence of NRV at reporting date.' },
  { id: 'fc_ias10_07', moduleId: 'm_ias10', taxonomy: 'Evaluate', front: 'Going Concern deterioration after year-end?', back: 'Adjusting. If not Going Concern, restate FS to break-up basis.' },
  { id: 'fc_ias10_08', moduleId: 'm_ias10', taxonomy: 'Apply', front: 'Discovery of fraud/error showing incorrect FS?', back: 'Adjusting event.' },
  { id: 'fc_ias10_09', moduleId: 'm_ias10', taxonomy: 'Apply', front: 'Court case settlement after YE (confirming obligation)?', back: 'Adjusting event. Adjust provision.' },
  { id: 'fc_ias10_10', moduleId: 'm_ias10', taxonomy: 'Remember', front: 'What is the date of authorization?', back: 'The date FS are authorized for issue (Cut-off point for IAS 10 events).' },

  // --- IAS 12: Income Taxes (m_ias12) ---
  { id: 'fc_ias12_01', moduleId: 'm_ias12', taxonomy: 'Remember', front: 'Definition of Tax Base (Asset)?', back: 'Amount deductible for tax purposes against any future taxable economic benefits.' },
  { id: 'fc_ias12_02', moduleId: 'm_ias12', taxonomy: 'Remember', front: 'Definition of Tax Base (Liability)?', back: 'Carrying amount less any amount deductible for tax purposes in respect of that liability in future periods.' },
  { id: 'fc_ias12_03', moduleId: 'm_ias12', taxonomy: 'Understand', front: 'Taxable Temporary Difference leads to?', back: 'Deferred Tax Liability (DTL). (Rule: CA > TB for Asset).' },
  { id: 'fc_ias12_04', moduleId: 'm_ias12', taxonomy: 'Understand', front: 'Deductible Temporary Difference leads to?', back: 'Deferred Tax Asset (DTA). (Rule: CA < TB for Asset).' },
  { id: 'fc_ias12_05', moduleId: 'm_ias12', taxonomy: 'Apply', front: 'Accounting for DTL on Asset Revaluation?', back: 'Charge to OCI (Revaluation Surplus). Does not affect P&L.' },
  { id: 'fc_ias12_06', moduleId: 'm_ias12', taxonomy: 'Analyze', front: 'Recognition of DTA for unused tax losses?', back: 'Recognize only to the extent that it is PROBABLE future taxable profit will be available.' },
  { id: 'fc_ias12_07', moduleId: 'm_ias12', taxonomy: 'Remember', front: 'Initial Recognition Exemption?', back: 'No DTL/DTA on initial recognition of asset/liab if: Not a business combination AND affects neither accounting nor taxable profit.' },
  { id: 'fc_ias12_08', moduleId: 'm_ias12', taxonomy: 'Evaluate', front: 'Tax rate used for measurement?', back: 'Rates enacted or substantively enacted by the reporting date, expected to apply when asset is realized.' },
  { id: 'fc_ias12_09', moduleId: 'm_ias12', taxonomy: 'Understand', front: 'Conditions for offsetting current tax assets/liabilities?', back: 'Legally enforceable right to set off AND intention to settle net.' },
  { id: 'fc_ias12_10', moduleId: 'm_ias12', taxonomy: 'Apply', front: 'Tax consequence of dividends?', back: 'Recognized in P&L, OCI or Equity depending on where the past transaction that generated distributable profits was recognized.' },

  // --- IAS 16: Property, Plant and Equipment (m_ias16) ---
  { id: 'fc_ias16_01', moduleId: 'm_ias16', taxonomy: 'Remember', front: 'Elements of PPE Cost?', back: 'Purchase price + Import duties + Directly attributable costs (Site prep, Install, Testing) + Dismantling estimate.' },
  { id: 'fc_ias16_02', moduleId: 'm_ias16', taxonomy: 'Apply', front: 'Treatment of Staff Training costs for new machine?', back: 'Expense in P&L. Not an asset as entity cannot control staff.' },
  { id: 'fc_ias16_03', moduleId: 'm_ias16', taxonomy: 'Understand', front: 'Revaluation Model frequency?', back: 'Sufficient regularity so Carrying Amount does not differ materially from Fair Value.' },
  { id: 'fc_ias16_04', moduleId: 'm_ias16', taxonomy: 'Apply', front: 'Accounting for Revaluation Gain?', back: 'Credit OCI (Revaluation Surplus). Exception: Credit P&L if reversing previous reval loss on same asset.' },
  { id: 'fc_ias16_05', moduleId: 'm_ias16', taxonomy: 'Apply', front: 'Accounting for Revaluation Loss?', back: 'Debit P&L. Exception: Debit OCI if reversing previous surplus on same asset.' },
  { id: 'fc_ias16_06', moduleId: 'm_ias16', taxonomy: 'Analyze', front: 'Depreciation of Revalued Asset?', back: 'Depreciable amount is the Revalued Amount. Charge to P&L.' },
  { id: 'fc_ias16_07', moduleId: 'm_ias16', taxonomy: 'Evaluate', front: 'Componentization rule?', back: 'Each part of an item of PPE with a cost significant to total cost must be depreciated separately (e.g. Jet Engine vs Body).' },
  { id: 'fc_ias16_08', moduleId: 'm_ias16', taxonomy: 'Remember', front: 'When does depreciation start?', back: 'When asset is available for use (location and condition necessary for operation).' },
  { id: 'fc_ias16_09', moduleId: 'm_ias16', taxonomy: 'Apply', front: 'Subsequent expenditure (e.g. Overhaul)?', back: 'Capitalize if it enhances economic benefits. Derecognize carrying amount of replaced parts.' },
  { id: 'fc_ias16_10', moduleId: 'm_ias16', taxonomy: 'Understand', front: 'Measurement of asset exchange?', back: 'Fair Value, unless transaction lacks commercial substance (then use Carrying Amount of asset given up).' },

  // --- IAS 19: Employee Benefits (m_ias19) ---
  { id: 'fc_ias19_01', moduleId: 'm_ias19', taxonomy: 'Remember', front: 'Measurement of Short-term benefits?', back: 'Undiscounted basis (e.g. Wages, Annual Leave).' },
  { id: 'fc_ias19_02', moduleId: 'm_ias19', taxonomy: 'Understand', front: 'Key difference: DC vs DB Plan?', back: 'DC: Risk with employee (Entity pays fixed contrib). DB: Risk with entity (Entity promises specific benefit).' },
  { id: 'fc_ias19_03', moduleId: 'm_ias19', taxonomy: 'Apply', front: 'Net Defined Benefit Liability formula?', back: 'PV of Defined Benefit Obligation minus Fair Value of Plan Assets.' },
  { id: 'fc_ias19_04', moduleId: 'm_ias19', taxonomy: 'Apply', front: 'Accounting for Past Service Cost?', back: 'Expense in P&L immediately (Change in obligation due to plan amendment).' },
  { id: 'fc_ias19_05', moduleId: 'm_ias19', taxonomy: 'Remember', front: 'Accounting for Actuarial Gains/Losses?', back: 'Recognize in OCI (Remeasurements). Never recycled to P&L.' },
  { id: 'fc_ias19_06', moduleId: 'm_ias19', taxonomy: 'Analyze', front: 'Net Interest component?', back: 'Net Liability/Asset * Discount Rate. Recognized in P&L.' },
  { id: 'fc_ias19_07', moduleId: 'm_ias19', taxonomy: 'Evaluate', front: 'Asset Ceiling test?', back: 'Net Asset is limited to PV of economic benefits available (refunds/reductions in contributions).' },
  { id: 'fc_ias19_08', moduleId: 'm_ias19', taxonomy: 'Understand', front: 'Termination Benefits recognition?', back: 'Earlier of: When entity can no longer withdraw offer OR When restructuring provision is recognized.' },
  { id: 'fc_ias19_09', moduleId: 'm_ias19', taxonomy: 'Apply', front: 'Settlement of DB Plan?', back: 'Difference between Settlement Price and PV of Obligation is Gain/Loss in P&L.' },
  { id: 'fc_ias19_10', moduleId: 'm_ias19', taxonomy: 'Remember', front: 'Discount rate basis?', back: 'Market yields on High Quality Corporate Bonds (or Govt bonds if no deep market) at reporting date.' },

  // --- IAS 20: Government Grants (m_ias20) ---
  { id: 'fc_ias20_01', moduleId: 'm_ias20', taxonomy: 'Remember', front: 'Recognition Criteria?', back: 'Reasonable assurance that: 1. Entity will comply with conditions. 2. Grant will be received.' },
  { id: 'fc_ias20_02', moduleId: 'm_ias20', taxonomy: 'Apply', front: 'Presentation of Grant related to Assets?', back: 'Either: 1. Deduct from Cost of Asset. 2. Recognize as Deferred Income and amortize.' },
  { id: 'fc_ias20_03', moduleId: 'm_ias20', taxonomy: 'Apply', front: 'Presentation of Grant related to Income?', back: 'Either: 1. Other Income. 2. Deduct from related expense.' },
  { id: 'fc_ias20_04', moduleId: 'm_ias20', taxonomy: 'Understand', front: 'Non-monetary grant (e.g. Land)?', back: 'Usually measured at Fair Value.' },
  { id: 'fc_ias20_05', moduleId: 'm_ias20', taxonomy: 'Apply', front: 'Grant for past expenses (financial support)?', back: 'Recognize in P&L immediately when receivable.' },
  { id: 'fc_ias20_06', moduleId: 'm_ias20', taxonomy: 'Analyze', front: 'Repayment of Grant?', back: 'Change in Accounting Estimate. Adjust Deferred Income balance or Asset Carrying Amount. Excess to P&L.' },
  { id: 'fc_ias20_07', moduleId: 'm_ias20', taxonomy: 'Evaluate', front: 'Forgivable Loans?', back: 'Treated as government grant when there is reasonable assurance terms for forgiveness will be met.' },
  { id: 'fc_ias20_08', moduleId: 'm_ias20', taxonomy: 'Analyze', front: 'Below-market interest rate loan?', back: 'Benefit is a grant. Measured as difference between Cash Received and Fair Value of loan (PV of future payments).' },
  { id: 'fc_ias20_09', moduleId: 'm_ias20', taxonomy: 'Remember', front: 'Required Disclosures?', back: 'Accounting policy adopted, nature and extent of grants, unfulfilled conditions.' },
  { id: 'fc_ias20_10', moduleId: 'm_ias20', taxonomy: 'Apply', front: 'Grant conditional on 5-year operation?', back: 'Match grant income in P&L over the 5-year period (matching costs).' },
];

const SAMPLE_QUIZ_DB: QuizQuestion[] = [
  // --- IAS 1 (m_ias1) ---
  { id: 'q_ias1_01', moduleId: 'm_ias1', taxonomy: 'Analyze', question: 'Long-term loan covenant breached before year-end. Bank waives breach AFTER year-end. Classification?', options: ['Non-current', 'Current', 'Equity', 'Disclose only'], correctAnswer: 1, explanation: 'Current. The right to defer settlement must exist AT the reporting date. Post-year-end waiver is non-adjusting.' },
  { id: 'q_ias1_02', moduleId: 'm_ias1', taxonomy: 'Remember', question: 'Which item is recognized in Other Comprehensive Income (OCI)?', options: ['Investment Property Gain (FV Model)', 'Revaluation Gain on PPE', 'Trading Inventory Gain', 'Interest Income'], correctAnswer: 1, explanation: 'Revaluation gains on PPE (IAS 16) go to OCI. Investment Property FV gains (IAS 40) go to P&L.' },
  { id: 'q_ias1_03', moduleId: 'm_ias1', taxonomy: 'Apply', question: 'Entity A refinances a short-term loan into a long-term one AFTER the reporting date. Treatment?', options: ['Classify as Non-current', 'Classify as Current', 'Offset against assets', 'Recognize in Equity'], correctAnswer: 1, explanation: 'Current. The refinancing was not agreed at the reporting date.' },
  { id: 'q_ias1_04', moduleId: 'm_ias1', taxonomy: 'Apply', question: 'Dividends paid on Redeemable Preference Shares. How to present?', options: ['Deduction from Equity', 'Finance Cost in P&L', 'Expense in OCI', 'Reduction of Liability'], correctAnswer: 1, explanation: 'Redeemable shares are Liabilities. Dividends are Interest Expense (Finance Cost).' },
  { id: 'q_ias1_05', moduleId: 'm_ias1', taxonomy: 'Understand', question: 'Management is aware of material uncertainties regarding Going Concern. Requirement?', options: ['Adjust to break-up basis', 'Disclose uncertainties', 'Ignore if probability < 50%', 'Write off all assets'], correctAnswer: 1, explanation: 'If Going Concern is appropriate but uncertainties exist, those uncertainties must be disclosed.' },
  { id: 'q_ias1_06', moduleId: 'm_ias1', taxonomy: 'Analyze', question: 'Which is NOT part of a complete set of FS?', options: ['Notes', 'Operating and Financial Review (OFR)', 'Cash Flow Statement', 'SOFP'], correctAnswer: 1, explanation: 'OFR / Directors Report is not part of the mandatory IFRS financial statements.' },
  { id: 'q_ias1_07', moduleId: 'm_ias1', taxonomy: 'Apply', question: 'Retrospective restatement of error made. Presentation requirement?', options: ['Two SOFPs', 'Three SOFPs', 'Two P&Ls only', 'Note disclosure only'], correctAnswer: 1, explanation: 'A third Statement of Financial Position (beginning of earliest comparative period) is required.' },
  { id: 'q_ias1_08', moduleId: 'm_ias1', taxonomy: 'Evaluate', question: 'Departure from IFRS (True and Fair Override) is permitted when?', options: ['Management prefers it', 'Tax rules require it', 'Compliance would be misleading', 'Industry practice differs'], correctAnswer: 2, explanation: 'Only when compliance would be so misleading that it conflicts with the objective of FS.' },
  { id: 'q_ias1_09', moduleId: 'm_ias1', taxonomy: 'Understand', question: 'Frequency of reporting?', options: ['At least annually', 'Bi-annually', 'Quarterly', 'Management discretion'], correctAnswer: 0, explanation: 'IAS 1 requires FS at least annually.' },
  { id: 'q_ias1_10', moduleId: 'm_ias1', taxonomy: 'Apply', question: 'Offsetting a receivable and payable from the same client?', options: ['Always permitted', 'Never permitted', 'Permitted if legal right & intention to net', 'Permitted if material'], correctAnswer: 2, explanation: 'Requires currently enforceable legal right AND intention to settle net.' },
];

const SAMPLE_PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'pq_01',
    title: 'Gamma Co (IFRS 15)',
    topic: 'Revenue',
    year: 'Dec 2023',
    marks: 10,
    scenario: 'Gamma Co entered into a contract to build a specialized asset for a customer. The contract price is $5m. Gamma cannot redirect the asset to another customer and has an enforceable right to payment for performance completed to date.',
    solution: 'This contract meets the criteria for revenue recognition OVER TIME under IFRS 15.\n\n1. The asset has no alternative use to Gamma.\n2. Gamma has an enforceable right to payment.\n\nRevenue should be recognized based on progress towards complete satisfaction of the performance obligation.',
    examinerComment: 'Many students failed to apply the criteria for over-time recognition specifically, assuming point in time.',
    taxonomy: 'Apply'
  },
  {
    id: 'pq_02',
    title: 'Delta Group (Consolidation)',
    topic: 'Group Accounting',
    year: 'June 2024',
    marks: 25,
    scenario: 'Delta acquired 80% of Epsilon on 1 Jan 2024. The consideration was $10m cash. The fair value of NCI at acquisition was $2m. Net assets of Epsilon were $8m.',
    solution: 'Goodwill Calculation:\nCost of Investment: $10.0m\nFair Value of NCI: $2.0m\nLess: Net Assets at Acq: ($8.0m)\nGoodwill at Acquisition: $4.0m',
    taxonomy: 'Create'
  },
  {
    id: 'pq_03',
    title: 'Omega Inc (Financial Instruments)',
    topic: 'Financial Instruments',
    year: 'June 2023',
    marks: 15,
    scenario: 'Omega Inc issued a convertible bond for $5m. The bond pays interest at 2%. Market rate for similar debt without conversion option is 6%.',
    solution: 'This is a compound financial instrument (IAS 32).\nIt must be split into Liability and Equity components.\n\n1. Liability = PV of future cash flows discounted at 6%.\n2. Equity = Proceeds ($5m) - Liability Component.',
    examinerComment: 'Good performance on the calculation, but presentation in the Statement of Changes in Equity was often omitted.',
    taxonomy: 'Analyze'
  }
];

const SAMPLE_MOCK_EXAMS: MockExamDef[] = [
  {
    id: 'mock_01',
    title: 'Mock Exam A (Dec 2024 Pattern)',
    durationMinutes: 180,
    questions: [
      {
        title: 'Question 1: Consolidation (Alpha Group)',
        marks: 25,
        scenario: 'Alpha acquired Beta on 1 July 20X5. Prepare the Consolidated Statement of Financial Position as at 31 December 20X5.',
        requirements: ['Calculate Goodwill', 'Calculate Non-controlling Interest', 'Prepare Consolidated SOFP']
      },
      {
        title: 'Question 2: Revenue & Provisions',
        marks: 25,
        scenario: 'Two distinct scenarios:\n1. A construction contract with variable consideration.\n2. A restructuring plan announced before year-end.',
        requirements: ['Advise on revenue recognition (IFRS 15)', 'Advise on provision for restructuring (IAS 37)']
      },
      {
        title: 'Question 3: Financial Assets & Leases',
        marks: 25,
        scenario: 'Purchase of equity investments and entering a 5-year lease for machinery.',
        requirements: ['Discuss classification of financial assets (IFRS 9)', 'Calculate Right-of-Use Asset and Lease Liability (IFRS 16)']
      },
      {
        title: 'Question 4: Ethics & Conceptual Framework',
        marks: 25,
        scenario: 'The Financial Controller is asked to delay recording an invoice to meet profit targets.',
        requirements: ['Identify ethical threats', 'Discuss "Faithful Representation"']
      }
    ]
  }
];

export const dataService = {
  getFlashcards: async (module: Module): Promise<Flashcard[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return SAMPLE_FLASHCARDS_DB.filter(fc => fc.moduleId === module.id);
  },

  getQuiz: async (module: Module): Promise<QuizQuestion[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return SAMPLE_QUIZ_DB.filter(q => q.moduleId === module.id);
  },

  getPracticeQuestions: async (): Promise<PracticeQuestion[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return SAMPLE_PRACTICE_QUESTIONS;
  },

  getMockExams: async (): Promise<MockExamDef[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return SAMPLE_MOCK_EXAMS;
  }
};