import type { AIMode } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const researchResponses = [
  `Based on my research, here are the key findings:

**Overview**
The topic you've asked about has been extensively studied in recent literature.

**Key Points**
1. Multiple peer-reviewed sources confirm the fundamental principles
2. Recent developments have expanded our understanding significantly
3. There are ongoing debates in the academic community about specific aspects

**Sources**
- Academic Journal of Research, 2024
- International Review of Studies, 2023
- Proceedings of the Annual Conference, 2024

Would you like me to dive deeper into any specific aspect?`,

  `Here's what I found in my research:

**Summary**
This is a complex topic with multiple dimensions to consider.

**Main Findings**
- Historical context shows evolution of thought on this subject
- Current consensus among experts points to several key factors
- Emerging research suggests new directions for exploration

**Relevant Studies**
1. Smith et al. (2024) - Comprehensive meta-analysis
2. Johnson & Lee (2023) - Empirical investigation
3. Williams Research Group (2024) - Theoretical framework

Let me know if you need more specific information.`,
];

const summarizationResponses = [
  `**Summary**

- The main argument centers on three core principles
- Supporting evidence is drawn from multiple domains
- Key takeaway: the conclusion is well-supported by data
- Action items: consider implementation in phases
- Next steps: validate with stakeholders`,

  `**Key Points**

- Central thesis: innovation drives progress
- Evidence: multiple case studies support this view
- Counterarguments exist but are addressed
- Conclusion: balanced approach recommended
- TL;DR: Start small, measure results, iterate`,
];

const factCheckingResponses = [
  `**Fact Check Result**

Verdict: **Mostly True**
Confidence: 85%

**Analysis**
The core claim is accurate based on available evidence. However, some nuances were omitted that provide important context.

**Evidence Found**
- Official records confirm the primary assertion
- Minor discrepancies noted in secondary details
- No evidence of intentional misrepresentation

**Context**
While technically accurate, the full picture requires understanding of broader circumstances.`,

  `**Fact Check Result**

Verdict: **Needs Context**
Confidence: 72%

**Analysis**
The statement contains elements of truth but is presented in a misleading way without proper context.

**Evidence Found**
- Primary claim is verifiable
- Statistics cited are from reliable sources
- Interpretation may be subject to bias

**Recommendation**
Consider additional sources before drawing conclusions.`,
];

function getRandomResponse(mode: AIMode): string {
  const responses = {
    research: researchResponses,
    summarization: summarizationResponses,
    'fact-checking': factCheckingResponses,
  };

  const modeResponses = responses[mode];
  return modeResponses[Math.floor(Math.random() * modeResponses.length)];
}

export async function* streamResponse(
  _query: string,
  mode: AIMode
): AsyncGenerator<string> {
  const fullResponse = getRandomResponse(mode);
  const words = fullResponse.split(' ');

  for (const word of words) {
    await delay(30 + Math.random() * 50);
    yield word + ' ';
  }
}

export async function sendMessage(
  query: string,
  mode: AIMode,
  onChunk: (chunk: string) => void,
  onComplete: () => void
): Promise<void> {
  const generator = streamResponse(query, mode);

  for await (const chunk of generator) {
    onChunk(chunk);
  }

  onComplete();
}
