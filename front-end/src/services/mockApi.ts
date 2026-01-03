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

function getRandomResponse(): string {
  return researchResponses[Math.floor(Math.random() * researchResponses.length)];
}

export async function* streamResponse(
  _query: string,
): AsyncGenerator<string> {
  const fullResponse = getRandomResponse();
  const words = fullResponse.split(' ');

  for (const word of words) {
    await delay(30 + Math.random() * 50);
    yield word + ' ';
  }
}

export async function sendMessage(
  query: string,
  onChunk: (chunk: string) => void,
  onComplete: () => void
): Promise<void> {
  const generator = streamResponse(query);

  for await (const chunk of generator) {
    onChunk(chunk);
  }

  onComplete();
}
