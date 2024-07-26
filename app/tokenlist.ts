export class TokenList {
  private tokens: string[];

  public constructor(readonly element: Element) {
    this.tokens = element.class.split(" ");
  }

  public add(...tokens: string[]) {
    this.tokens.push(...tokens);
    this.commit();
  }

  public contains(token: string): boolean {
    return this.tokens.some((t, _, __) => t === token);
  }

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
