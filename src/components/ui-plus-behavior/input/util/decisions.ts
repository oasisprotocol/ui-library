/**
 * Sometimes we want to store a boolean decision
 * along with the reason why is it true/false.
 *
 * Like, this functionality is currently not available,
 * because ...reasons...
 */

import { MarkdownCode } from '../../../ui/markdown'

type SimpleDecision = boolean
type FullDecision = { verdict: boolean; reason?: MarkdownCode | undefined }
export type Decision = SimpleDecision | FullDecision
type FullPositiveDecision = { verdict: true; reason: MarkdownCode }
type FullNegativeDecision = { verdict: false; reason: MarkdownCode }
export type DecisionWithReason = true | FullPositiveDecision | FullNegativeDecision
export const expandDecision = (decision: Decision): FullDecision =>
  typeof decision === 'boolean' ? { verdict: decision } : decision

/**
 * Ways to read decisions
 */
export const getVerdict = (decision: Decision | undefined, defaultVerdict: boolean): boolean =>
  decision === undefined ? defaultVerdict : typeof decision === 'boolean' ? decision : decision.verdict

export const getReason = (decision: Decision | undefined): MarkdownCode | undefined =>
  decision === undefined ? undefined : typeof decision === 'boolean' ? undefined : decision.reason

export const getReasonForDenial = (decision: Decision | undefined): MarkdownCode | undefined =>
  decision === undefined
    ? undefined
    : typeof decision === 'boolean' || decision.verdict
      ? undefined
      : decision.reason

export const getReasonForAllowing = (decision: Decision | undefined): MarkdownCode | undefined =>
  decision === undefined
    ? undefined
    : typeof decision === 'boolean' || !decision.verdict
      ? undefined
      : decision.reason

/**
 * Ways to declare the decision
 */
export const allow = (reason?: MarkdownCode | undefined): Decision => ({ verdict: true, reason: reason })
export const deny = (reason?: MarkdownCode | undefined): Decision => ({ verdict: false, reason: reason })
export const denyWithReason = (reason: MarkdownCode): FullNegativeDecision => ({
  verdict: false,
  reason: reason,
})

/**
 * Boolean operations with decisions
 */

export const invertDecision = (decision: Decision): Decision => {
  const { verdict, reason } = expandDecision(decision)
  return {
    verdict: !verdict,
    reason,
  }
}

export const andDecisions = (a: Decision, b: Decision): Decision => {
  const aVerdict = getVerdict(a, false)
  const bVerdict = getVerdict(b, false)
  if (aVerdict) {
    if (bVerdict) {
      return {
        verdict: true,
        reason: `${getReason(a) as string}; ${getReason(b) as string}`,
      }
    } else {
      return b
    }
  } else {
    return a
  }
}
