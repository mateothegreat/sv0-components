export type Score = 0 | 1 | 2 | 3 | 4;

/**
 * Calculates the password strength score based on various security criteria.
 *
 * This function evaluates password complexity using multiple factors including length,
 * character diversity, and common patterns. The scoring system provides progressive
 * feedback to help users create stronger passwords.
 *
 * ## Scoring Criteria
 *
 * - **Length**: Minimum 8 characters required for any positive score
 * - **Character Types**: Bonus points for uppercase, lowercase, numbers, and symbols
 * - **Patterns**: Penalties for common sequences and repetitive characters
 * - **Dictionary**: Penalties for common words (basic implementation)
 *
 * @param password The password string to evaluate for strength.
 *
 * @returns A score from 0-4 where:
 *
 *   - 0: Very weak (empty or too short)
 *   - 1: Weak (basic requirements met)
 *   - 2: Fair (some complexity)
 *   - 3: Good (strong complexity)
 *   - 4: Excellent (very strong)
 *
 * @example
 *
 * ```ts
 * const score1 = calculatePasswordScore("123"); // 0 - too short
 * const score2 = calculatePasswordScore("password123"); // 1 - weak
 * const score3 = calculatePasswordScore("MyP@ssw0rd!"); // 4 - excellent
 * ```
 *
 * @category Password Validation
 */
export const calculateStrengthScore = (password: string): Score => {
  if (!password || password.length < 8) {
    return 0;
  }

  let score = 1; // Base score for meeting minimum length

  // Character type bonuses
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  const characterTypes = [hasLowercase, hasUppercase, hasNumbers, hasSymbols].filter(
    Boolean
  ).length;

  // Length bonuses
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;

  // Character diversity bonus
  if (characterTypes >= 3) score += 1;
  if (characterTypes === 4) score += 1;

  // Pattern penalties
  const hasRepeatingChars = /(.)\1{2,}/.test(password); // 3+ same chars in a row
  const hasSequentialChars =
    /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789|890)/i.test(
      password
    );
  const hasCommonPatterns = /(password|123456|qwerty|admin|login|welcome)/i.test(password);

  if (hasRepeatingChars) score -= 1;
  if (hasSequentialChars) score -= 1;
  if (hasCommonPatterns) score -= 2;

  // Ensure score stays within bounds
  return Math.max(0, Math.min(4, score)) as Score;
};
