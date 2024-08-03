/** A simple implementation of DOMTokenList for element CSS classes. */
export class TokenList {
  private tokens: string[];

  /**
   * Creates a new TokenList.
   *
   * @param element - The element to manage CSS classes for.
   */
  public constructor(readonly element: Element) {
    this.tokens = element.class.split(" ");
  }

  /**
   * Adds one or more tokens to the list.
   *
   * @param tokens - The tokens to add.
   */
  public add(...tokens: string[]) {
    this.tokens.push(...tokens);
    this.commit();
  }

  /**
   * Checks if a token exists in the list.
   *
   * @param token - The token to check.
   */
  public contains(token: string): boolean {
    return this.tokens.some((t, _, __) => t === token);
  }

  /**
   * Replaces an old token with a new token in the list.
   *
   * @param oldToken - The old token to replace.
   * @param newToken - The new token to replace with.
   * @returns True if the old token was replaced, otherwise false.
   */
  public replace(oldToken: string, newToken: string): boolean {
    var didReplace = false;

    for (var i = 0; i < this.tokens.length; i++) {
      if (this.tokens[i] == oldToken) {
        this.tokens[i] = newToken;
        didReplace = true;
      }
    }

    if (didReplace) {
      this.commit();
    }

    return didReplace;
  }

  /**
   * Removes one or more tokens from the list.
   *
   * @param tokens - The tokens to remove.
   */
  public remove(...tokens: string[]) {
    let set = {};
    for (let token of tokens) {
      set[token] = true;
    }

    this.tokens = this.tokens.filter((t, _, __) => !set[t]);
    this.commit();
  }

  private commit() {
    this.element.class = this.tokens.join(" ");
  }
}
